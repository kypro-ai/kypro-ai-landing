import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getPitfallById } from "@/lib/pitfalls-data";

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured. Set STRIPE_SECRET_KEY." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { pitfallId, returnUrl } = body as {
      pitfallId?: string;
      returnUrl?: string;
    };

    if (!pitfallId) {
      return NextResponse.json(
        { error: "pitfallId is required" },
        { status: 400 }
      );
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

    const origin = request.headers.get("origin") || returnUrl || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(pitfall.price * 100), // cents
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
      success_url: `${origin}/pitfalls/${pitfall.id}?paid=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pitfalls/${pitfall.id}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("[checkout] Error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
