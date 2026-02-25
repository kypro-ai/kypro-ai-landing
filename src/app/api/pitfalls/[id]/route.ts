import { NextRequest, NextResponse } from "next/server";
import { getPitfallById } from "@/lib/pitfalls-data";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const pitfall = getPitfallById(params.id);

  if (!pitfall) {
    return NextResponse.json(
      { error: "Pitfall not found", id: params.id },
      { status: 404, headers: corsHeaders }
    );
  }

  // Free tier: summary + steps + gotchas + results
  // Premium fields (fullContent with code examples) marked but included for now
  const response = {
    id: pitfall.id,
    title: pitfall.title,
    summary: pitfall.summary,
    fullContent: pitfall.fullContent, // Will be gated behind payment later
    steps: pitfall.steps,
    gotchas: pitfall.gotchas,
    results: pitfall.results,
    tags: pitfall.tags,
    price: pitfall.price,
    confidence: pitfall.confidence,
    tier: "free",
    _premium_fields: ["fullContent"], // Fields that will require payment
  };

  return NextResponse.json(response, { headers: corsHeaders });
}
