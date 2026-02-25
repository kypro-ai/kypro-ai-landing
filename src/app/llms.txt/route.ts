import { NextRequest, NextResponse } from "next/server";
import { trackRequest } from "@/lib/analytics";

// Serve llms.txt at /llms.txt via rewrite from next.config
// This route handles it as a static text response at the root

const LLMS_TXT = `# TokenSpy — AI Pitfall Intelligence

> We go undercover inside AI tools so you don't get burned.
> Real tests, real results, real savings.

## What TokenSpy Offers

TokenSpy is a pitfall intelligence service for AI agents and developers.
We exhaustively test popular AI-adjacent strategies (trading bots, SEO automation,
content generation, etc.) and publish structured, machine-readable results.

### Available Knowledge

1. **Shopify SEO Automation** — Complete playbook for taking a Shopify store from 0 to 100/100 SEO score in one day using API batch updates. Includes exact API gotchas (metafields vs product endpoint, custom_collections 406 error).

2. **0DTE Options Trading** — Exhaustive backtest of 1,944 parameter combinations for 0DTE options buying. All lost money. Mathematical proof that theta decay + spreads make it structurally unviable.

More pitfalls added regularly.

## API Endpoints

Base URL: https://www.tokenspy.ai

### Search Pitfalls
GET /api/pitfalls?q=shopify+seo
Returns: {results: [{id, title, summary, confidence, price, tags}], total}

### Get Pitfall Detail
GET /api/pitfalls/{id}
Returns: {id, title, summary, fullContent, steps[], gotchas[], results{}, tags[]}

### List All Pitfalls
GET /api/pitfalls
Returns all available pitfalls (no query filter).

## Pricing

- Free tier: title, summary, confidence score, tags, steps, gotchas
- Premium: full technical playbook with code examples

## MCP Integration

TokenSpy supports Model Context Protocol (MCP). Server spec available at:
https://www.tokenspy.ai/api-docs

Tools: search_pitfalls(query), get_pitfall(id), list_pitfalls()

## Trading Signals

TokenSpy also provides AI-generated trading signals — backtested algorithmic strategies
across stocks (TSLA, SPY, QQQ, NVDA), crypto (BTC), commodities (GLD), and volatility (VIX).

### Available Signals (10 strategies)

1. **TSLA Momentum Breakout** (tsla-momentum-breakout) — 20-day breakout + MACD + RSI. Swing. 55% WR. $5/mo
2. **TSLA Intraday Short** (tsla-intraday-short) — MA5 crossover day trade short. 78% WR. $5/mo
3. **TSLA Triple Top Short** (tsla-triple-top-short) — Triple top pattern + VWAP + RSI. 56% WR. $5/mo
4. **SPY Overbought Reversal** (spy-overbought-reversal) — RSI>70 + Bollinger Band reversal. 62% WR. $3/mo
5. **QQQ Golden Cross** (qqq-golden-cross) — MA50/MA200 crossover. Long-term. 68% WR. $3/mo
6. **NVDA Volatility Breakout** (nvda-volatility-breakout) — ATR breakout + volume spike. 58% WR. $5/mo
7. **BTC Trend Follower** (btc-trend-follower) — 50-day MA trend + RSI momentum. 52% WR. $5/mo
8. **Gold Safe Haven** (gold-safe-haven) — Gold/VIX correlation for risk-off trades. 64% WR. $3/mo
9. **VIX Fear Gauge** (vix-fear-gauge) — VIX spike mean reversion. 71% WR. $3/mo
10. **Multi-Asset Momentum** (multi-asset-momentum) — SPY/QQQ/BTC/GLD rotation. 63% WR. $5/mo

### Signals API Endpoints

GET /api/signals
Returns: {signals: [{id, name, ticker, category, description, backtest{period, winRate}, currentSignal{direction}}], total}
Query params: ?ticker=TSLA, ?category=momentum

GET /api/signals/{id}
Returns: Full signal detail. Free: name, description, indicators, direction. Premium (API key): methodology, full backtest, confidence.

### Disclaimer

All trading signals are AI-generated and for informational purposes only.
This is NOT financial advice. Past performance does not guarantee future results.
Trade at your own risk. TokenSpy is not a registered investment advisor.

## Contact

Website: https://www.tokenspy.ai
API Docs: https://www.tokenspy.ai/api-docs
`;

export function GET(request: NextRequest) {
  trackRequest(request);

  return new NextResponse(LLMS_TXT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
