import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getPitfallById } from "@/lib/pitfalls-data";
import { getSignalById } from "@/lib/signals-data";
import { logVisit } from "@/lib/visit-log";

/* ── Service definitions (for /services page) ─────────────── */
const services: Record<string, { name: string; price: number; description: string; mode: "payment" | "subscription"; interval?: "month" }> = {
  "full-setup": {
    name: "Full AI Assistant Setup",
    price: 99,
    description: "Complete OpenClaw installation + Telegram/Signal connection + custom personality + memory system + 3 skills. Ready in 24h.",
    mode: "payment",
  },
  "custom-skill": {
    name: "Custom Skill Development",
    price: 149,
    description: "Custom skill built for your AI assistant. Web scraping, API integrations, automated workflows. Includes testing + docs.",
    mode: "payment",
  },
  "node-connection": {
    name: "Node Connection (Mac/Phone)",
    price: 39,
    description: "Connect your MacBook or phone to your AI assistant. Remote access, camera, screen, file management.",
    mode: "payment",
  },
  "trading-signals": {
    name: "Trading Signal Setup",
    price: 79,
    description: "Automated TSLA/SPY/QQQ trading signals to Telegram. Backtested strategies + cron scheduling.",
    mode: "payment",
  },
  "memory-personality": {
    name: "Agent Memory & Personality",
    price: 49,
    description: "Professional SOUL.md, AGENTS.md, and MEMORY.md configuration. Custom personality + workflows.",
    mode: "payment",
  },
  "monthly-maintenance": {
    name: "Monthly AI Maintenance",
    price: 29,
    description: "Ongoing: skill updates, memory cleanup, config optimization, priority Telegram support.",
    mode: "subscription",
    interval: "month",
  },
};

async function handleCheckout(request: NextRequest, pitfallId?: string, signalId?: string, serviceId?: string) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set STRIPE_SECRET_KEY." },
      { status: 503 }
    );
  }

  const origin = request.headers.get("origin") || "https://www.tokenspy.ai";

  // Service checkout (one-time payment or subscription)
  if (serviceId) {
    const service = services[serviceId];
    if (!service) {
      return NextResponse.json(
        { error: "Service not found", id: serviceId },
        { status: 404 }
      );
    }

    const isSubscription = service.mode === "subscription";

    const lineItem: Record<string, unknown> = {
      price_data: {
        currency: "usd",
        unit_amount: Math.round(service.price * 100),
        product_data: {
          name: service.name,
          description: service.description.slice(0, 500),
        },
        ...(isSubscription && service.interval ? { recurring: { interval: service.interval } } : {}),
      },
      quantity: 1,
    };

    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? "subscription" : "payment",
      payment_method_types: ["card"],
      line_items: [lineItem as Stripe.Checkout.SessionCreateParams.LineItem],
      metadata: {
        serviceId: serviceId,
        type: "service",
      },
      success_url: `${origin}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/services`,
    });

    return session.url;
  }

  // Signal subscription checkout
  if (signalId) {
    const signal = getSignalById(signalId);
    if (!signal) {
      return NextResponse.json(
        { error: "Signal not found", id: signalId },
        { status: 404 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(signal.price * 100),
            recurring: { interval: "month" },
            product_data: {
              name: signal.name,
              description: signal.description.slice(0, 500),
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        signalId: signal.id,
        type: "signal_subscription",
      },
      success_url: `${origin}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/signals/${signal.id}`,
    });

    return session.url;
  }

  // Pitfall one-time checkout
  if (!pitfallId) {
    return NextResponse.json({ error: "pitfallId, signalId, or serviceId is required" }, { status: 400 });
  }

  const pitfall = getPitfallById(pitfallId);
  if (!pitfall) {
    return NextResponse.json(
      { error: "Pitfall not found", id: pitfallId },
      { status: 404 }
    );
  }

  if (pitfall.price === 0) {
    return NextResponse.json(
      { error: "This pitfall is free — no purchase needed" },
      { status: 400 }
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(pitfall.price * 100),
          product_data: {
            name: pitfall.title,
            description: pitfall.summary.slice(0, 500),
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      pitfallId: pitfall.id,
    },
    success_url: `${origin}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pitfalls/${pitfall.id}`,
  });

  return session.url;
}

export async function GET(request: NextRequest) {
  try {
    const ua = request.headers.get("user-agent") || "";
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    logVisit("/api/checkout", ua, ip, true);

    const pitfallId = request.nextUrl.searchParams.get("pitfallId");
    const signalId = request.nextUrl.searchParams.get("signalId");
    const serviceId = request.nextUrl.searchParams.get("serviceId");
    if (!pitfallId && !signalId && !serviceId) {
      return NextResponse.json({ error: "pitfallId, signalId, or serviceId is required" }, { status: 400 });
    }
    const url = await handleCheckout(request, pitfallId || undefined, signalId || undefined, serviceId || undefined);
    if (url && typeof url === "string") {
      return NextResponse.redirect(url);
    }
    return url as NextResponse;
  } catch (err: unknown) {
    console.error("[checkout] Error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const ua = request.headers.get("user-agent") || "";
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    logVisit("/api/checkout", ua, ip, true);

    const body = await request.json();
    const { pitfallId, signalId, serviceId } = body as { pitfallId?: string; signalId?: string; serviceId?: string };
    if (!pitfallId && !signalId && !serviceId) {
      return NextResponse.json({ error: "pitfallId, signalId, or serviceId is required" }, { status: 400 });
    }
    const url = await handleCheckout(request, pitfallId, signalId, serviceId);
    if (typeof url === "string") {
      return NextResponse.json({ url });
    }
    return url as NextResponse;
  } catch (err: unknown) {
    console.error("[checkout] Error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
