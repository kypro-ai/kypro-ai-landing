import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getGadgetById } from "@/lib/gadgets-data";
import { getSignalById } from "@/lib/signals-data";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

/**
 * POST /api/deliver
 * Body: { sessionId: string }
 * 
 * Verifies Stripe payment, then returns the full purchased content.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body as { sessionId?: string };

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 503, headers: corsHeaders }
      );
    }

    // Verify payment with Stripe
    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch {
      return NextResponse.json(
        { error: "Invalid session ID" },
        { status: 400, headers: corsHeaders }
      );
    }

    const isPaid = session.payment_status === "paid";
    if (!isPaid) {
      return NextResponse.json(
        { error: "Payment not completed", paymentStatus: session.payment_status },
        { status: 402, headers: corsHeaders }
      );
    }

    // Support both gadgetId and legacy pitfallId in metadata
    const gadgetId = session.metadata?.gadgetId || session.metadata?.pitfallId;
    const signalId = session.metadata?.signalId;
    const serviceId = session.metadata?.serviceId;
    const type = session.metadata?.type || "gadget";

    // Deliver service confirmation
    if (serviceId || type === "service") {
      return NextResponse.json({
        type: "service",
        serviceId: serviceId || "",
        customerEmail: session.customer_details?.email || null,
        message: "We'll reach out within 24h to start your setup. Contact: contact@tokenspy.ai",
      }, { headers: corsHeaders });
    }

    // Deliver gadget content
    if (gadgetId) {
      const gadget = getGadgetById(gadgetId);
      if (!gadget) {
        return NextResponse.json(
          { error: "Gadget not found" },
          { status: 404, headers: corsHeaders }
        );
      }

      return NextResponse.json({
        type: "gadget",
        id: gadget.id,
        title: gadget.title,
        content: {
          summary: gadget.summary,
          fullContent: gadget.fullContent,
          steps: gadget.steps,
          gotchas: gadget.gotchas,
          results: gadget.results,
          tags: gadget.tags,
          estimatedTimeSaved: gadget.estimatedTimeSaved,
          estimatedCostSaved: gadget.estimatedCostSaved,
        },
        customerEmail: session.customer_details?.email || null,
      }, { headers: corsHeaders });
    }

    // Deliver signal content
    if (signalId || type === "signal_subscription") {
      const sid = signalId || "";
      const signal = getSignalById(sid);
      if (!signal) {
        return NextResponse.json(
          { error: "Signal not found" },
          { status: 404, headers: corsHeaders }
        );
      }

      return NextResponse.json({
        type: "signal",
        id: signal.id,
        name: signal.name,
        content: {
          description: signal.description,
          methodology: signal.methodology,
          indicators: signal.indicators,
          backtest: signal.backtest,
          currentSignal: signal.currentSignal,
          tags: signal.tags,
          timeframe: signal.timeframe,
        },
        customerEmail: session.customer_details?.email || null,
      }, { headers: corsHeaders });
    }

    return NextResponse.json(
      { error: "No product found in this session" },
      { status: 404, headers: corsHeaders }
    );

  } catch (err: unknown) {
    console.error("[deliver] Error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: corsHeaders }
    );
  }
}
