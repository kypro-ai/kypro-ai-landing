import { NextRequest, NextResponse } from "next/server";
import { getSignalById } from "@/lib/signals-data";
import { getApiKey } from "@/lib/api-keys";

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
  const signal = getSignalById(params.id);

  if (!signal) {
    return NextResponse.json(
      { error: "Signal not found", id: params.id },
      { status: 404, headers: corsHeaders }
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
    }
  }

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
      ? signal.methodology
      : `🔒 Premium — subscribe for $${signal.price}/mo or use API key to access the full methodology, entry/exit rules, and position sizing.`,
    tier: hasAccess ? "premium" : "free",
    locked: !hasAccess,
    disclaimer: DISCLAIMER,
  };

  return NextResponse.json(response, { headers: corsHeaders });
}
