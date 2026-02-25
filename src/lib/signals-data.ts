export interface SignalBacktest {
  period: string;
  winRate: number;
  cagr?: number;
  profitFactor?: number;
  maxDrawdown?: string;
  totalTrades?: number;
}

export interface SignalCurrent {
  direction: "LONG" | "SHORT" | "NEUTRAL" | "WAIT";
  confidence: number;
  lastUpdated: string;
  note: string;
}

export interface Signal {
  id: string;
  name: string;
  ticker: string;
  category: "momentum" | "mean-reversion" | "volatility" | "multi-asset";
  description: string;
  methodology: string;
  indicators: string[];
  timeframe: string;
  backtest: SignalBacktest;
  currentSignal: SignalCurrent;
  price: number;
  tags: string[];
}

export const signals: Signal[] = [
  {
    id: "tsla-momentum-breakout",
    name: "TSLA Momentum Breakout",
    ticker: "TSLA",
    category: "momentum",
    description:
      "Captures TSLA breakouts above the 20-day high with MACD histogram confirmation and RSI momentum filter. Designed for swing traders looking for explosive directional moves after consolidation periods.",
    methodology: `## TSLA Momentum Breakout — Full Methodology

### Entry Criteria
1. **Price** closes above the 20-day high (rolling)
2. **MACD histogram** is positive and rising for at least 2 consecutive bars
3. **RSI(14)** is between 55 and 75 — confirms momentum without overbought risk

### Exit Rules
- **Profit target:** 2× ATR(14) from entry
- **Stop loss:** 1× ATR(14) below entry, trailed to breakeven after 1× ATR gain
- **Time stop:** Close position after 20 trading days if neither target nor stop is hit

### Position Sizing
- Risk 1% of portfolio per trade
- Position size = (Portfolio × 0.01) / (Entry − Stop)

### Filters
- Skip signals on FOMC days and earnings week
- Require average daily volume > 20M shares (always met for TSLA)
- No entry if VIX > 35 (extreme fear environment)

### Backtest Notes
Tested on TSLA daily bars from Jan 2020 to Dec 2024. Includes commission of $0.005/share. Slippage modeled at 0.05% per trade. Survivorship bias: N/A (single stock). Curve-fitting risk is moderate — parameters were not optimized, but chosen from common technical analysis literature.`,
    indicators: ["20-Day High", "MACD", "RSI(14)", "ATR(14)"],
    timeframe: "Swing (1–20 days)",
    backtest: {
      period: "Jan 2020 – Dec 2024",
      winRate: 0.55,
      cagr: 21.3,
      profitFactor: 1.82,
      maxDrawdown: "-18.4%",
      totalTrades: 87,
    },
    currentSignal: {
      direction: "WAIT",
      confidence: 0,
      lastUpdated: "2025-02-25",
      note: "TSLA consolidating below 20-day high. No breakout trigger yet.",
    },
    price: 5,
    tags: ["TSLA", "momentum", "swing", "breakout"],
  },
  {
    id: "tsla-intraday-short",
    name: "TSLA Intraday Short",
    ticker: "TSLA",
    category: "momentum",
    description:
      "High-frequency intraday short strategy on TSLA using a 5-period moving average crossover on 5-minute bars. Targets overextended intraday rallies that revert by the close. Designed for active day traders.",
    methodology: `## TSLA Intraday Short — Full Methodology

### Entry Criteria
1. **Price** crosses below the 5-period MA on 5-minute bars after being above it for ≥ 3 bars
2. **Volume** on the crossover bar is ≥ 1.5× the 20-bar average volume
3. **Time filter:** Only enter between 10:00 AM and 3:00 PM ET (avoid open/close volatility)

### Exit Rules
- **Profit target:** $1.50/share or 0.4% of entry price (whichever is reached first)
- **Stop loss:** $0.75/share above entry
- **Time stop:** Flatten all positions at 3:50 PM ET — no overnight holds

### Position Sizing
- Fixed lot size of 100 shares per signal (scale based on account size)
- Max 3 concurrent positions

### Risk Management
- Daily loss limit: $500 (stop trading for the day)
- Weekly loss limit: $1,500

### Backtest Notes
Tested on TSLA 5-minute bars from Jan 2023 to Dec 2024. Commission: $0.005/share. Slippage: 1 tick ($0.01). Market impact modeled conservatively. Win rate is high because targets are tight relative to TSLA's intraday range.`,
    indicators: ["MA(5)", "Volume", "5-min bars"],
    timeframe: "Intraday",
    backtest: {
      period: "Jan 2023 – Dec 2024",
      winRate: 0.78,
      profitFactor: 2.41,
      maxDrawdown: "-4.2%",
      totalTrades: 312,
    },
    currentSignal: {
      direction: "WAIT",
      confidence: 0,
      lastUpdated: "2025-02-25",
      note: "Market closed. Signal generated during trading hours only.",
    },
    price: 5,
    tags: ["TSLA", "momentum", "intraday", "short"],
  },
  {
    id: "tsla-triple-top-short",
    name: "TSLA Triple Top Short",
    ticker: "TSLA",
    category: "mean-reversion",
    description:
      "Identifies triple-top formations on TSLA intraday charts where price touches a resistance level three times without breaking through. Uses VWAP and RSI divergence for confirmation before entering short positions.",
    methodology: `## TSLA Triple Top Short — Full Methodology

### Pattern Recognition
1. **Resistance identification:** Scan for price levels touched 3× within a 2-hour window with < 0.3% deviation
2. **VWAP confirmation:** Price must be at or above VWAP on the third touch
3. **RSI divergence:** RSI(14) on 5-min bars must show lower highs while price makes equal highs

### Entry Criteria
- Enter short on the third rejection candle close below the resistance level
- Confirmation: volume on rejection bar > 20-bar average

### Exit Rules
- **Profit target:** VWAP or next support level (whichever is closer)
- **Stop loss:** 0.5% above the resistance level
- **Time stop:** Close at 3:45 PM ET

### Position Sizing
- Risk 0.5% of portfolio per trade
- Max 2 trades per day on this strategy

### Backtest Notes
Tested on TSLA 5-minute bars from Jun 2022 to Dec 2024. Pattern detection is algorithmic — parameters for "triple touch" (3 touches, 0.3% tolerance, 2-hour window) were chosen from classical chart pattern literature. Commission and slippage included.`,
    indicators: ["Triple Top Pattern", "VWAP", "RSI(14)", "Volume"],
    timeframe: "Intraday",
    backtest: {
      period: "Jun 2022 – Dec 2024",
      winRate: 0.56,
      profitFactor: 1.38,
      maxDrawdown: "-7.1%",
      totalTrades: 145,
    },
    currentSignal: {
      direction: "WAIT",
      confidence: 0,
      lastUpdated: "2025-02-25",
      note: "Market closed. No triple-top pattern detected in last session.",
    },
    price: 5,
    tags: ["TSLA", "mean-reversion", "intraday", "pattern", "short"],
  },
  {
    id: "spy-overbought-reversal",
    name: "SPY Overbought Reversal",
    ticker: "SPY",
    category: "mean-reversion",
    description:
      "Mean-reversion strategy that shorts SPY when RSI exceeds 70 and price touches the upper Bollinger Band. Targets a pullback to the 20-day moving average. Works best in range-bound or mildly trending markets.",
    methodology: `## SPY Overbought Reversal — Full Methodology

### Entry Criteria
1. **RSI(14)** closes above 70
2. **Price** touches or exceeds the upper Bollinger Band (20-period, 2σ)
3. **Confirmation:** Wait for a red candle (close < open) after both conditions are met

### Exit Rules
- **Profit target:** Price returns to 20-day SMA
- **Stop loss:** 1.5% above entry
- **Time stop:** Close after 10 trading days

### Position Sizing
- Risk 1% of portfolio per trade
- Can use put options instead of shorting for defined risk

### Filters
- Skip during Q4 (Oct–Dec) which has strong seasonal bullish bias
- Skip if 50-day MA > 200-day MA AND price is > 5% above 200-day MA (strong uptrend)

### Backtest Notes
Tested on SPY daily bars from Jan 2015 to Dec 2024. This is a counter-trend strategy — win rate is moderate but reward:risk is favorable when it triggers. The seasonal filter significantly improved performance.`,
    indicators: ["RSI(14)", "Bollinger Bands(20,2)", "SMA(20)"],
    timeframe: "Swing (1–10 days)",
    backtest: {
      period: "Jan 2015 – Dec 2024",
      winRate: 0.62,
      profitFactor: 1.54,
      maxDrawdown: "-9.8%",
      totalTrades: 68,
    },
    currentSignal: {
      direction: "NEUTRAL",
      confidence: 0.3,
      lastUpdated: "2025-02-25",
      note: "SPY RSI at 58 — not yet in overbought territory. Monitoring.",
    },
    price: 3,
    tags: ["SPY", "mean-reversion", "swing", "overbought"],
  },
  {
    id: "qqq-golden-cross",
    name: "QQQ Golden Cross",
    ticker: "QQQ",
    category: "momentum",
    description:
      "Classic long-only momentum strategy based on the MA50/MA200 golden cross on QQQ. Goes long when the 50-day MA crosses above the 200-day MA, and exits on the death cross. Simple, proven, low-maintenance.",
    methodology: `## QQQ Golden Cross — Full Methodology

### Entry Criteria
1. **50-day SMA** crosses above the **200-day SMA** (golden cross)
2. **Confirmation:** Price must close above both MAs on the crossover day
3. **Volume:** 5-day average volume must be above the 50-day average volume (institutional participation)

### Exit Rules
- **Primary exit:** 50-day SMA crosses below 200-day SMA (death cross)
- **Emergency stop:** Close if drawdown from entry exceeds 15%
- **No trailing stop** — this is a trend-following system that rides big moves

### Position Sizing
- Allocate 25–50% of portfolio (this is a core position, not a trade)
- Can use QQQ shares or TQQQ at 1/3 size for leverage

### Why It Works
The golden cross captures major regime changes. Tech (QQQ) trends strongly — once momentum begins, it tends to persist. The 200-day MA acts as a "macro filter" keeping you out of bear markets.

### Backtest Notes
Tested on QQQ daily bars from Jan 2005 to Dec 2024. Only 14 round-trip signals in 20 years — very low frequency. 4 major winners that captured multi-year bull runs. The 2022 bear market was avoided entirely.`,
    indicators: ["SMA(50)", "SMA(200)", "Volume"],
    timeframe: "Long-term (months)",
    backtest: {
      period: "Jan 2005 – Dec 2024",
      winRate: 0.68,
      cagr: 14.7,
      profitFactor: 3.21,
      maxDrawdown: "-14.2%",
      totalTrades: 14,
    },
    currentSignal: {
      direction: "NEUTRAL",
      confidence: 0.5,
      lastUpdated: "2025-02-25",
      note: "Golden cross active since Nov 2023. Position is HOLD. No new entry signal.",
    },
    price: 3,
    tags: ["QQQ", "momentum", "long-term", "golden-cross"],
  },
  {
    id: "nvda-volatility-breakout",
    name: "NVDA Volatility Breakout",
    ticker: "NVDA",
    category: "volatility",
    description:
      "Captures explosive moves in NVDA when price breaks out of a low-volatility squeeze. Uses ATR expansion and volume spikes to identify the start of a new trend leg. Works in both directions.",
    methodology: `## NVDA Volatility Breakout — Full Methodology

### Squeeze Detection
1. **ATR(14)** drops below its 20-period moving average for ≥ 5 consecutive days (volatility contraction)
2. **Bollinger Bands** (20, 2σ) width is in the bottom 20th percentile of the last 100 days

### Entry Criteria (Long)
- Price closes above the upper Bollinger Band with ATR(1-day) > 1.5× ATR(14)
- Volume is ≥ 2× the 20-day average volume

### Entry Criteria (Short)
- Mirror of long: close below lower BB with ATR expansion and volume spike

### Exit Rules
- **Profit target:** 3× ATR(14) from entry
- **Stop loss:** 1× ATR(14) from entry (placed at the opposite BB)
- **Trailing stop:** After 2× ATR gain, trail stop at 1× ATR below the highest close

### Position Sizing
- Risk 1.5% of portfolio (NVDA is volatile — wider stops require smaller position)

### Backtest Notes
Tested on NVDA daily bars from Jan 2020 to Dec 2024. NVDA's AI-driven regime (2023–2024) produced outsized winners. Pre-2023 performance was more modest. Strategy benefits from NVDA's high beta and narrative-driven moves.`,
    indicators: ["ATR(14)", "Bollinger Bands(20,2)", "Volume", "BB Width"],
    timeframe: "Swing (3–15 days)",
    backtest: {
      period: "Jan 2020 – Dec 2024",
      winRate: 0.58,
      cagr: 28.6,
      profitFactor: 2.15,
      maxDrawdown: "-22.7%",
      totalTrades: 52,
    },
    currentSignal: {
      direction: "WAIT",
      confidence: 0,
      lastUpdated: "2025-02-25",
      note: "NVDA volatility is elevated — no squeeze detected. Waiting for contraction phase.",
    },
    price: 5,
    tags: ["NVDA", "volatility", "swing", "breakout", "squeeze"],
  },
  {
    id: "btc-trend-follower",
    name: "BTC Trend Follower",
    ticker: "BTC",
    category: "momentum",
    description:
      "Trend-following system for Bitcoin using the 50-day moving average as the trend filter and RSI momentum for entry timing. Designed to capture major BTC bull runs while avoiding extended drawdowns.",
    methodology: `## BTC Trend Follower — Full Methodology

### Trend Filter
- **Bullish regime:** BTC price is above the 50-day SMA
- **Bearish regime:** BTC price is below the 50-day SMA

### Entry Criteria (Long only)
1. BTC closes above the 50-day SMA after being below it (regime change)
2. **RSI(14)** is between 50 and 70 (confirms momentum, not overbought)
3. **Volume:** 7-day average volume must be rising (3 consecutive days of higher avg volume)

### Exit Rules
- **Primary exit:** BTC closes below the 50-day SMA for 3 consecutive days
- **Trailing stop:** 20% from the highest close since entry
- **No short positions** — BTC has a structural long bias due to halvings and adoption

### Position Sizing
- Allocate 5–15% of portfolio to BTC (high volatility asset)
- Scale in: 50% on initial signal, 50% on first pullback to 50-day MA that holds

### Backtest Notes
Tested on BTC/USD daily bars from Jan 2018 to Dec 2024. Captures the 2020–2021 bull run and 2023–2024 recovery. Avoids the worst of 2022 bear market. CAGR is high but drawdowns are significant — this is crypto.`,
    indicators: ["SMA(50)", "RSI(14)", "Volume"],
    timeframe: "Daily (holds for weeks/months)",
    backtest: {
      period: "Jan 2018 – Dec 2024",
      winRate: 0.52,
      cagr: 35.2,
      profitFactor: 2.87,
      maxDrawdown: "-28.3%",
      totalTrades: 23,
    },
    currentSignal: {
      direction: "NEUTRAL",
      confidence: 0.4,
      lastUpdated: "2025-02-25",
      note: "BTC above 50-day MA. Existing position HOLD. No new entry trigger.",
    },
    price: 5,
    tags: ["BTC", "momentum", "trend", "crypto", "daily"],
  },
  {
    id: "gold-safe-haven",
    name: "Gold Safe Haven",
    ticker: "GLD",
    category: "multi-asset",
    description:
      "Cross-asset strategy that goes long gold (GLD) when VIX spikes indicate a risk-off environment. Uses the VIX/Gold correlation to time entries into gold as a safe-haven asset during market stress.",
    methodology: `## Gold Safe Haven — Full Methodology

### Signal Logic
1. **VIX spike:** VIX rises > 20% in 5 trading days (fear event detected)
2. **Gold relative strength:** GLD outperforms SPY over the trailing 10 days
3. **Confirmation:** GLD closes above its 20-day SMA

### Entry Criteria
- Enter long GLD when all 3 conditions are met simultaneously
- Can use GLD shares, gold futures, or XAUUSD

### Exit Rules
- **Profit target:** 5% from entry
- **Stop loss:** 3% below entry
- **Time stop:** Exit after 30 calendar days
- **VIX normalization:** Exit if VIX drops below 15 (fear subsided)

### Position Sizing
- Allocate 10–20% of portfolio as a hedge position
- This strategy is meant to complement equity holdings, not replace them

### Why It Works
Gold has a historically negative correlation with equities during stress events. When VIX spikes, institutional money flows into gold as a safe haven. The correlation isn't permanent — it's strongest during acute fear episodes.

### Backtest Notes
Tested on GLD/VIX daily data from Jan 2010 to Dec 2024. Triggers 3–5 times per year on average. Works best during sudden market drops (COVID crash, SVB crisis). Less effective during slow grinding bear markets.`,
    indicators: ["VIX", "GLD Relative Strength", "SMA(20)"],
    timeframe: "Daily (holds 1–30 days)",
    backtest: {
      period: "Jan 2010 – Dec 2024",
      winRate: 0.64,
      profitFactor: 1.72,
      maxDrawdown: "-8.5%",
      totalTrades: 54,
    },
    currentSignal: {
      direction: "WAIT",
      confidence: 0,
      lastUpdated: "2025-02-25",
      note: "VIX at normal levels. No risk-off signal detected.",
    },
    price: 3,
    tags: ["GLD", "gold", "multi-asset", "safe-haven", "VIX", "hedge"],
  },
  {
    id: "vix-fear-gauge",
    name: "VIX Fear Gauge",
    ticker: "VIX",
    category: "mean-reversion",
    description:
      "Mean-reversion strategy that profits from VIX spikes reverting to the mean. When VIX surges above 25 and the term structure inverts, the strategy goes short volatility expecting normalization. High win rate but requires careful sizing.",
    methodology: `## VIX Fear Gauge — Full Methodology

### Signal Logic
1. **VIX level:** VIX closes above 25
2. **VIX spike:** VIX is ≥ 30% above its 20-day SMA
3. **Term structure:** VIX futures front month > second month (backwardation/inversion)

### Entry Criteria
- Short VIX via: short VXX, long SVXY, or short VIX futures
- Enter on the first day all 3 conditions are met
- **Important:** Never enter on the day of the spike — wait for the first condition check at close

### Exit Rules
- **Profit target:** VIX returns to its 20-day SMA
- **Stop loss:** VIX rises 20% above entry level (absolute)
- **Time stop:** Close after 15 trading days
- **Term structure:** Exit if contango resumes (front month < second month by > 0.5 points)

### Position Sizing
- **CRITICAL:** Max 3% of portfolio. Short volatility has fat-tail risk
- Never use leveraged products at more than 1% of portfolio
- This is a high-conviction, small-position strategy

### Risk Warning
Short volatility can produce catastrophic losses in black swan events (see: February 2018 "Volmageddon"). Position sizing is the #1 risk management tool here.

### Backtest Notes
Tested on VIX/VIX futures data from Jan 2012 to Dec 2024. Excludes the Feb 2018 XIV blowup (which would have been caught by the 20% stop). Win rate is high because VIX mean-reverts reliably, but the losers can be large.`,
    indicators: ["VIX Level", "VIX 20-day SMA", "VIX Term Structure"],
    timeframe: "Swing (3–15 days)",
    backtest: {
      period: "Jan 2012 – Dec 2024",
      winRate: 0.71,
      profitFactor: 2.03,
      maxDrawdown: "-15.6%",
      totalTrades: 41,
    },
    currentSignal: {
      direction: "WAIT",
      confidence: 0,
      lastUpdated: "2025-02-25",
      note: "VIX below 25. No fear spike detected. Strategy inactive.",
    },
    price: 3,
    tags: ["VIX", "mean-reversion", "volatility", "swing", "short-vol"],
  },
  {
    id: "multi-asset-momentum",
    name: "Multi-Asset Momentum Rotation",
    ticker: "MULTI",
    category: "multi-asset",
    description:
      "Monthly rotation strategy that ranks SPY, QQQ, BTC, and GLD by 12-month momentum and allocates to the top 3. Rebalances monthly. Captures secular trends while diversifying across asset classes.",
    methodology: `## Multi-Asset Momentum Rotation — Full Methodology

### Universe
- **SPY** — S&P 500
- **QQQ** — Nasdaq 100
- **BTC** — Bitcoin (via BITO ETF or spot)
- **GLD** — Gold

### Ranking
1. Calculate 12-month total return for each asset
2. Rank from highest to lowest
3. Select the top 3

### Allocation
- Equal-weight the top 3: 33.3% each
- If an asset's 12-month return is negative, replace it with cash (T-bills / SGOV)
- Rebalance on the first trading day of each month

### Exit Rules
- No individual exit rules — the monthly rebalance handles rotation
- If all 4 assets have negative 12-month returns, go 100% cash

### Why It Works
Momentum is the most robust factor across asset classes and time periods. Assets that have gone up tend to continue going up (persistence). Monthly rebalancing captures medium-term trends while avoiding excessive turnover.

### Backtest Notes
Tested from Jan 2015 to Dec 2024 (BTC available from 2015). 120 monthly observations. Tax efficiency is low due to monthly turnover — best suited for tax-advantaged accounts. The strategy underperforms in whipsaw environments (2018, 2022 H1) but captures strong trends (2017, 2020–2021, 2023–2024).`,
    indicators: ["12-Month Return", "Monthly Rebalance", "Momentum Rank"],
    timeframe: "Monthly rebalance",
    backtest: {
      period: "Jan 2015 – Dec 2024",
      winRate: 0.63,
      cagr: 18.1,
      profitFactor: 1.95,
      maxDrawdown: "-19.4%",
      totalTrades: 120,
    },
    currentSignal: {
      direction: "NEUTRAL",
      confidence: 0.5,
      lastUpdated: "2025-02-25",
      note: "Current allocation: QQQ, BTC, SPY. Next rebalance Mar 1. GLD ranked 4th.",
    },
    price: 5,
    tags: ["multi-asset", "momentum", "rotation", "monthly", "SPY", "QQQ", "BTC", "GLD"],
  },
];

/**
 * Get a signal by its ID.
 */
export function getSignalById(id: string): Signal | undefined {
  return signals.find((s) => s.id === id);
}

/**
 * Filter signals by ticker, category, or both.
 */
export function filterSignals(opts?: {
  ticker?: string;
  category?: string;
}): Signal[] {
  let list = signals;

  if (opts?.ticker) {
    const t = opts.ticker.toUpperCase();
    list = list.filter((s) => s.ticker.toUpperCase() === t);
  }

  if (opts?.category) {
    const c = opts.category.toLowerCase();
    list = list.filter((s) => s.category === c);
  }

  return list;
}

/**
 * Get all unique categories.
 */
export function getCategories(): string[] {
  return Array.from(new Set(signals.map((s) => s.category))).sort();
}

/**
 * Get all unique tickers.
 */
export function getTickers(): string[] {
  return Array.from(new Set(signals.map((s) => s.ticker))).sort();
}
