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
    const { pitfallIds, sessionId } = body as {
      pitfallIds?: string[];
      sessionId?: string;
    };

    // If a Stripe session ID is provided, verify payment and create/return key
    if (sessionId) {
      // Check if we already created a key for this session
      const existing = findKeyBySession(sessionId);
      if (existing) {
        return NextResponse.json(
          { key: existing.key, pitfallIds: existing.pitfallIds, createdAt: existing.createdAt },
          { headers: corsHeaders }
        );
      }

      // Verify payment with Stripe
      const stripe = getStripe();
      if (stripe) {
        try {
          const session = await stripe.checkout.sessions.retrieve(sessionId);
          if (session.payment_status === "paid" && session.metadata?.pitfallId) {
            const keyRecord = createApiKey([session.metadata.pitfallId], sessionId);
            return NextResponse.json(
              { key: keyRecord.key, pitfallIds: keyRecord.pitfallIds, createdAt: keyRecord.createdAt },
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

    if (!pitfallIds || pitfallIds.length === 0) {
      return NextResponse.json(
        { error: "pitfallIds array or sessionId is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const record = createApiKey(pitfallIds, sessionId);

    return NextResponse.json(
      { key: record.key, pitfallIds: record.pitfallIds, createdAt: record.createdAt },
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
