import { NextRequest, NextResponse } from "next/server";
import { filterSignals } from "@/lib/signals-data";

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
    // Premium fields marked as locked
    methodology: "🔒 Premium — subscribe or use API key to access full methodology.",
    fullBacktest: "🔒 Premium — subscribe or use API key to access detailed backtest data.",
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
    },
    { headers: corsHeaders }
  );
}
