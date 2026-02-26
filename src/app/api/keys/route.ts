import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createApiKey, findKeyBySession } from "@/lib/api-keys";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Support both gadgetIds and legacy pitfallIds
    const { gadgetIds, pitfallIds, sessionId } = body as {
      gadgetIds?: string[];
      pitfallIds?: string[];
      sessionId?: string;
    };
    const resolvedIds = gadgetIds || pitfallIds;

    // If a Stripe session ID is provided, verify payment and create/return key
    if (sessionId) {
      // Check if we already created a key for this session
      const existing = await findKeyBySession(sessionId);
      if (existing) {
        return NextResponse.json(
          { key: existing.key, gadgetIds: existing.gadgetIds, createdAt: existing.createdAt },
          { headers: corsHeaders }
        );
      }

      // Verify payment with Stripe
      const stripe = getStripe();
      if (stripe) {
        try {
          const session = await stripe.checkout.sessions.retrieve(sessionId);
          const isPaid = session.payment_status === "paid";
          // Support both gadgetId and legacy pitfallId in metadata
          const gadgetId = session.metadata?.gadgetId || session.metadata?.pitfallId;
          const signalId = session.metadata?.signalId;

          if (isPaid && (gadgetId || signalId)) {
            const productIds = gadgetId ? [gadgetId] : signalId ? [signalId] : [];
            const keyRecord = await createApiKey(productIds, sessionId);
            return NextResponse.json(
              { key: keyRecord.key, gadgetIds: keyRecord.gadgetIds, createdAt: keyRecord.createdAt },
              { status: 201, headers: corsHeaders }
            );
          }
          return NextResponse.json(
            { error: "Payment not completed", paymentStatus: session.payment_status },
            { status: 402, headers: corsHeaders }
          );
        } catch (err: unknown) {
          console.error("[keys] Stripe session verify error:", err);
          return NextResponse.json(
            { error: "Invalid session ID" },
            { status: 400, headers: corsHeaders }
          );
        }
      }
    }

    if (!resolvedIds || resolvedIds.length === 0) {
      return NextResponse.json(
        { error: "gadgetIds array or sessionId is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const record = await createApiKey(resolvedIds, sessionId);

    return NextResponse.json(
      { key: record.key, gadgetIds: record.gadgetIds, createdAt: record.createdAt },
      { status: 201, headers: corsHeaders }
    );
  } catch (err: unknown) {
    console.error("[keys] Error:", err);
    return NextResponse.json(
      { error: "Failed to create API key" },
      { status: 500, headers: corsHeaders }
    );
  }
}
