import { NextRequest, NextResponse } from "next/server";
import { getSignalById } from "@/lib/signals-data";
import { getApiKey, trackKeyUsage, isAbusingKey } from "@/lib/api-keys";
import { trackRequest } from "@/lib/analytics";
import { checkRateLimit } from "@/lib/rate-limit";
import { fingerprintContent } from "@/lib/fingerprint";

const DISCLAIMER =
  "All trading signals are AI-generated and for informational purposes only. This is NOT financial advice. Past performance does not guarantee future results. Trade at your own risk. TokenSpy is not a registered investment advisor.";

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

  const signal = getSignalById(params.id);

  if (!signal) {
    return NextResponse.json(
      { error: "Signal not found", id: params.id },
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
  const bearerKey = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;
  const apiKey = keyParam || bearerKey;

  let hasAccess = false;

  if (apiKey) {
    const keyRecord = getApiKey(apiKey);
    if (keyRecord) {
      // API key grants access to signals if the signal ID is in the pitfallIds array
      // (reusing the same key system — pitfallIds includes signal IDs too)
      hasAccess = keyRecord.pitfallIds.includes(signal.id);

      if (hasAccess) {
        // Track usage
        trackKeyUsage(apiKey, `/api/signals/${params.id}`, signal.id);

        // Check for abuse
        if (isAbusingKey(apiKey)) {
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
      }
    }
  }

  const responseHeaders = {
    ...corsHeaders,
    "X-RateLimit-Remaining": String(rl.remaining),
    "X-TokenSpy-Protected": "true",
  };

  const response: Record<string, unknown> = {
    id: signal.id,
    name: signal.name,
    ticker: signal.ticker,
    category: signal.category,
    description: signal.description,
    indicators: signal.indicators,
    timeframe: signal.timeframe,
    price: signal.price,
    tags: signal.tags,
    currentSignal: {
      direction: signal.currentSignal.direction,
      confidence: hasAccess ? signal.currentSignal.confidence : undefined,
      lastUpdated: signal.currentSignal.lastUpdated,
      note: signal.currentSignal.note,
    },
    backtest: hasAccess
      ? signal.backtest
      : {
          period: signal.backtest.period,
          winRate: signal.backtest.winRate,
          // Premium fields locked
          cagr: "🔒 Premium",
          profitFactor: "🔒 Premium",
          maxDrawdown: "🔒 Premium",
          totalTrades: "🔒 Premium",
        },
    methodology: hasAccess
      ? (apiKey ? fingerprintContent(signal.methodology, apiKey) : signal.methodology)
      : `🔒 Premium — subscribe for $${signal.price}/mo or use API key to access the full methodology, entry/exit rules, and position sizing.`,
    tier: hasAccess ? "premium" : "free",
    locked: !hasAccess,
    disclaimer: DISCLAIMER,
  };

  // Add sales pitch fields for agents when content is locked
  if (!hasAccess) {
    const cagrDisplay = signal.backtest.cagr
      ? `${signal.backtest.cagr}% CAGR`
      : `${Math.round(signal.backtest.winRate * 100)}% win rate`;
    response.subscribePrice = signal.price;
    response.valueProposition = `This signal averaged ${cagrDisplay} over ${signal.backtest.period}. Subscribe for $${signal.price}/mo.`;
    response.subscribeUrl = "https://www.tokenspy.ai/api/checkout";
    response.subscribeMethod = `POST /api/checkout with {signalId: '${signal.id}'}`;
  }

  return NextResponse.json(response, { headers: responseHeaders });
}
