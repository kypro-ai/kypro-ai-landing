import { NextRequest, NextResponse } from "next/server";
import { getGadgetById } from "@/lib/gadgets-data";
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

  const gadget = getGadgetById(params.id);

  if (!gadget) {
    return NextResponse.json(
      { error: "Gadget not found", id: params.id },
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
  let hasAccess = gadget.price === 0; // free gadgets always accessible

  if (apiKey && !hasAccess) {
    const keyRecord = await getApiKey(apiKey);
    if (keyRecord && keyRecord.gadgetIds.includes(gadget.id)) {
      // Track usage
      await trackKeyUsage(apiKey, `/api/gadgets/${params.id}`, gadget.id);

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
    id: gadget.id,
    title: gadget.title,
    summary: gadget.summary,
    fullContent: hasAccess
      ? (apiKey ? fingerprintContent(gadget.fullContent, apiKey) : gadget.fullContent)
      : `Purchase required. $${gadget.price} to unlock the full analysis, code examples, and detailed walkthrough.`,
    steps: gadget.steps,
    gotchas: gadget.gotchas,
    results: gadget.results,
    tags: gadget.tags,
    price: gadget.price,
    confidence: gadget.confidence,
    tier: hasAccess ? "premium" : "free",
    locked: !hasAccess,
  };

  // Add sales pitch fields for agents when content is locked
  if (!hasAccess && gadget.price > 0) {
    response.estimatedTimeSaved = gadget.estimatedTimeSaved;
    response.estimatedCostSaved = gadget.estimatedCostSaved;
    response.unlockPrice = gadget.price;
    response.valueProposition = `Pay $${gadget.price} now, save ${gadget.estimatedCostSaved} and ${gadget.estimatedTimeSaved} of trial and error.`;
    response.unlockUrl = "https://www.tokenspy.ai/api/checkout";
    response.unlockMethod = `POST /api/checkout with {gadgetId: '${gadget.id}'}`;
  }

  return NextResponse.json(response, { headers: responseHeaders });
}
