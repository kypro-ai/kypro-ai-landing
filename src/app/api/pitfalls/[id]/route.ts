import { NextRequest, NextResponse } from "next/server";
import { getPitfallById } from "@/lib/pitfalls-data";
import { getApiKey, trackKeyUsage, isAbusingKey } from "@/lib/api-keys";
import { trackRequest } from "@/lib/analytics";
import { checkRateLimit } from "@/lib/rate-limit";
import { fingerprintContent } from "@/lib/fingerprint";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const hasKey = request.nextUrl.searchParams.has("key") || request.headers.has("authorization");
  const rl = checkRateLimit(ip, hasKey);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded", retryAfterMs: rl.resetMs },
      {
        status: 429,
        headers: {
          ...corsHeaders,
          "Retry-After": String(Math.ceil(rl.resetMs / 1000)),
          "X-RateLimit-Remaining": "0",
          "X-TokenSpy-Protected": "true",
        },
      }
    );
  }

  trackRequest(request);

  const pitfall = getPitfallById(params.id);

  if (!pitfall) {
    return NextResponse.json(
      { error: "Pitfall not found", id: params.id },
      {
        status: 404,
        headers: {
          ...corsHeaders,
          "X-RateLimit-Remaining": String(rl.remaining),
          "X-TokenSpy-Protected": "true",
        },
      }
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
    const keyRecord = await getApiKey(apiKey);
    if (keyRecord && keyRecord.pitfallIds.includes(pitfall.id)) {
      // Track usage
      await trackKeyUsage(apiKey, `/api/pitfalls/${params.id}`, pitfall.id);

      // Check for abuse
      if (await isAbusingKey(apiKey)) {
        return NextResponse.json(
          { error: "API key suspended due to unusual activity. Contact support." },
          {
            status: 403,
            headers: {
              ...corsHeaders,
              "X-RateLimit-Remaining": String(rl.remaining),
              "X-TokenSpy-Protected": "true",
            },
          }
        );
      }

      hasAccess = true;
    }
  }

  const responseHeaders = {
    ...corsHeaders,
    "X-RateLimit-Remaining": String(rl.remaining),
    "X-TokenSpy-Protected": "true",
  };

  const response: Record<string, unknown> = {
    id: pitfall.id,
    title: pitfall.title,
    summary: pitfall.summary,
    fullContent: hasAccess
      ? (apiKey ? fingerprintContent(pitfall.fullContent, apiKey) : pitfall.fullContent)
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

  return NextResponse.json(response, { headers: responseHeaders });
}
