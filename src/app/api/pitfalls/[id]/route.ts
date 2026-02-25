import { NextRequest, NextResponse } from "next/server";
import { getPitfallById } from "@/lib/pitfalls-data";
import { getApiKey } from "@/lib/api-keys";
import { trackRequest } from "@/lib/analytics";

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
  trackRequest(request);

  const pitfall = getPitfallById(params.id);

  if (!pitfall) {
    return NextResponse.json(
      { error: "Pitfall not found", id: params.id },
      { status: 404, headers: corsHeaders }
    );
  }

  // Check for API key — in query param or Authorization header
  const { searchParams } = new URL(request.url);
  const keyParam = searchParams.get("key");
  const authHeader = request.headers.get("authorization");
  const bearerKey = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const apiKey = keyParam || bearerKey;

  // Determine if user has access to full content
  let hasAccess = pitfall.price === 0; // free pitfalls always accessible

  if (apiKey && !hasAccess) {
    const keyRecord = getApiKey(apiKey);
    if (keyRecord && keyRecord.pitfallIds.includes(pitfall.id)) {
      hasAccess = true;
    }
  }

  const response: Record<string, unknown> = {
    id: pitfall.id,
    title: pitfall.title,
    summary: pitfall.summary,
    fullContent: hasAccess
      ? pitfall.fullContent
      : `Purchase required. $${pitfall.price} to unlock the full analysis, code examples, and detailed walkthrough.`,
    steps: pitfall.steps,
    gotchas: pitfall.gotchas,
    results: pitfall.results,
    tags: pitfall.tags,
    price: pitfall.price,
    confidence: pitfall.confidence,
    tier: hasAccess ? "premium" : "free",
    locked: !hasAccess,
  };

  // Add sales pitch fields for agents when content is locked
  if (!hasAccess && pitfall.price > 0) {
    response.estimatedTimeSaved = pitfall.estimatedTimeSaved;
    response.estimatedCostSaved = pitfall.estimatedCostSaved;
    response.unlockPrice = pitfall.price;
    response.valueProposition = `Pay $${pitfall.price} now, save ${pitfall.estimatedCostSaved} and ${pitfall.estimatedTimeSaved} of trial and error.`;
    response.unlockUrl = "https://www.tokenspy.ai/api/checkout";
    response.unlockMethod = `POST /api/checkout with {pitfallId: '${pitfall.id}'}`;
  }

  return NextResponse.json(response, { headers: corsHeaders });
}
