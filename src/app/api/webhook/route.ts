import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createApiKey } from "@/lib/api-keys";

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured" },
        { status: 503 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("[webhook] STRIPE_WEBHOOK_SECRET not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 503 }
      );
    }

    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Signature verification failed";
      console.error("[webhook] Signature verification failed:", msg);
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const pitfallId = session.metadata?.pitfallId;

      console.log("[webhook] ✅ Payment completed:", {
        sessionId: session.id,
        pitfallId,
        amount: session.amount_total,
        customerEmail: session.customer_details?.email,
      });

      // Auto-generate an API key for this purchase
      if (pitfallId) {
        const keyRecord = createApiKey([pitfallId], session.id);
        console.log("[webhook] 🔑 API key created:", keyRecord.key, "for pitfall:", pitfallId);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: unknown) {
    console.error("[webhook] Error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
