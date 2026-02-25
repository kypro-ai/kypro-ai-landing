import { NextRequest, NextResponse } from "next/server";
import { searchPitfalls } from "@/lib/pitfalls-data";
import { trackRequest } from "@/lib/analytics";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export function GET(request: NextRequest) {
  trackRequest(request);

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  const results = searchPitfalls(query);

  const freeResults = results.map((p) => ({
    id: p.id,
    title: p.title,
    summary: p.summary,
    confidence: p.confidence,
    price: p.price,
    tags: p.tags,
    estimatedCostSaved: p.estimatedCostSaved,
    unlockPrice: p.price > 0 ? p.price : undefined,
  }));

  return NextResponse.json(
    {
      results: freeResults,
      total: freeResults.length,
      query: query || null,
      tier: "free",
    },
    { headers: corsHeaders }
  );
}
