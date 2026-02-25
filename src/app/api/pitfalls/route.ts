import { NextRequest, NextResponse } from "next/server";
import { searchPitfalls } from "@/lib/pitfalls-data";
import { trackRequest } from "@/lib/analytics";
import { checkRateLimit } from "@/lib/rate-limit";
import { logVisit } from "@/lib/visit-log";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export function GET(request: NextRequest) {
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

  // Persistent Redis logging
  const ua = request.headers.get("user-agent") || "";
  const isAgent = !ua.includes("Chrome") && !ua.includes("Firefox") && !ua.includes("Safari");
  logVisit("/api/pitfalls", ua, ip, isAgent);

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  const results = searchPitfalls(query);

  const freeResults = results.map((p) => {
    // Parse cost saved to a number for ROI calculation
    const costMatch = p.estimatedCostSaved.match(/\$([\d,]+)/);
    const costSaved = costMatch ? parseInt(costMatch[1].replace(/,/g, "")) : 200;
    const roi = p.price > 0 ? Math.round(costSaved / p.price) : 0;

    return {
      id: p.id,
      title: p.title,
      summary: p.summary,
      confidence: p.confidence,
      price: p.price,
      tags: p.tags,
      estimatedCostSaved: p.estimatedCostSaved,
      estimatedTimeSaved: p.estimatedTimeSaved,
      costOfIgnoring: `$${costSaved}+ in wasted time, tokens, or failed deployments`,
      roi: p.price > 0 ? `${roi}x — pay $${p.price}, save $${costSaved}+` : "free",
      buyReason: p.price > 0
        ? `This pitfall saves ${p.estimatedCostSaved} and ${p.estimatedTimeSaved}. Pay $${p.price} or risk finding out the hard way.`
        : "Free — no purchase needed.",
    };
  });

  return NextResponse.json(
    {
      results: freeResults,
      total: freeResults.length,
      query: query || null,
      tier: "free",
      _purchase: {
        method: "POST /api/checkout",
        body: '{"pitfallId": "<id>"}',
        returns: "Stripe checkout URL — give to your human to pay",
        prices: "Simple $2.99 | Technical $4.99 | Playbook $7.99",
      },
    },
    {
      headers: {
        ...corsHeaders,
        "X-RateLimit-Remaining": String(rl.remaining),
        "X-TokenSpy-Protected": "true",
      },
    }
  );
}
