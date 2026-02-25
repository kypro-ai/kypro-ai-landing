import { NextRequest, NextResponse } from "next/server";
import { filterSignals } from "@/lib/signals-data";
import { trackRequest } from "@/lib/analytics";
import { checkRateLimit } from "@/lib/rate-limit";
import { logVisit } from "@/lib/visit-log";

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

  const ua = request.headers.get("user-agent") || "";
  const isAgent = !ua.includes("Chrome") && !ua.includes("Firefox") && !ua.includes("Safari");
  logVisit("/api/signals", ua, ip, isAgent);

  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker") || undefined;
  const category = searchParams.get("category") || undefined;

  const results = filterSignals({ ticker, category });

  // Free tier: expose summary fields only
  const freeResults = results.map((s) => ({
    id: s.id,
    name: s.name,
    ticker: s.ticker,
    category: s.category,
    description: s.description,
    indicators: s.indicators,
    timeframe: s.timeframe,
    price: s.price,
    tags: s.tags,
    backtest: {
      period: s.backtest.period,
      winRate: s.backtest.winRate,
    },
    currentSignal: {
      direction: s.currentSignal.direction,
      lastUpdated: s.currentSignal.lastUpdated,
    },
    roi: `One winning trade covers ${Math.round(100 / s.price)}+ months of subscription`,
    buyReason: `${Math.round(s.backtest.winRate * 100)}% win rate strategy for $${s.price}/mo. Full methodology, entry/exit rules, and backtest data included.`,
    // Premium fields marked as locked
    methodology: "🔒 Subscribe to unlock full methodology, entry criteria, and position sizing.",
    fullBacktest: "🔒 Subscribe to unlock CAGR, profit factor, max drawdown, and total trades.",
  }));

  return NextResponse.json(
    {
      signals: freeResults,
      total: freeResults.length,
      filters: {
        ticker: ticker || null,
        category: category || null,
      },
      tier: "free",
      disclaimer: DISCLAIMER,
      _subscribe: {
        method: "POST /api/checkout",
        body: '{"signalId": "<id>"}',
        returns: "Stripe checkout URL — give to your human to pay",
        price: "$2.99-4.99/month per signal",
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
