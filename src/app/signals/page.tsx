"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";
import { signals, getTickers } from "@/lib/signals-data";

/* ── direction badge styling ──────────────────────────────── */
function directionStyle(d: string) {
  switch (d) {
    case "LONG":
      return "text-emerald-400 bg-emerald-500/15 border-emerald-500/30";
    case "SHORT":
      return "text-red-400 bg-red-500/15 border-red-500/30";
    case "NEUTRAL":
      return "text-yellow-400 bg-yellow-500/15 border-yellow-500/30";
    default:
      return "text-dark-400 bg-white/[0.06] border-white/10";
  }
}

/* ── category display info ────────────────────────────────── */
const categoryInfo: Record<string, { emoji: string; label: string; desc: string }> = {
  momentum: { emoji: "🚀", label: "Momentum", desc: "Ride the trend — buy strength, sell weakness" },
  "mean-reversion": { emoji: "🔄", label: "Mean Reversion", desc: "Buy the dip, sell the rip — prices revert to the mean" },
  volatility: { emoji: "⚡", label: "Volatility", desc: "Profit from big moves regardless of direction" },
  "multi-asset": { emoji: "🌍", label: "Multi-Asset", desc: "Diversified strategies across asset classes" },
  "etf-strategy": { emoji: "📊", label: "ETF Strategies", desc: "Sector rotation, index tracking, and thematic plays" },
  "options-income": { emoji: "💰", label: "Options Income", desc: "Generate consistent income selling premium" },
  macro: { emoji: "🛡️", label: "Macro & Defensive", desc: "Hedge risk with bonds, gold, and dollar plays" },
  international: { emoji: "🗺️", label: "International", desc: "Capture opportunities in global markets" },
};

const categoryOrder = ["momentum", "mean-reversion", "etf-strategy", "volatility", "multi-asset", "options-income", "macro", "international"];

const tickers = ["all", ...getTickers()];

export default function SignalsPage() {
  const [activeTicker, setActiveTicker] = useState("all");

  const filtered = useMemo(() => {
    if (activeTicker === "all") return signals;
    return signals.filter((s) => s.ticker === activeTicker);
  }, [activeTicker]);

  // Group by category
  const grouped = useMemo(() => {
    const groups: Record<string, typeof signals> = {};
    for (const s of filtered) {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    }
    return groups;
  }, [filtered]);

  // Count per category for stats
  const totalCategories = Object.keys(grouped).length;

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          {/* ── Header ──────────────────────────────────────── */}
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-3 py-1 mb-4">
              Trading Signals
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl font-mono">
              <span className="gradient-text">AI Signals</span>
            </h1>
            <p className="mt-4 text-lg text-dark-300 max-w-2xl mx-auto">
              {signals.length} algorithmic strategies across {totalCategories} categories — backtested, documented, and ready to deploy.
            </p>
          </div>

          {/* ── Stats bar ───────────────────────────────────── */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              { value: `${signals.length}`, label: "Strategies" },
              { value: `${tickers.length - 1}`, label: "Tickers" },
              { value: `${totalCategories}`, label: "Categories" },
              { value: "$2.99", label: "From / month" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-bold font-mono text-brand-400">{stat.value}</div>
                <div className="text-xs text-dark-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ── Disclaimer ──────────────────────────────────── */}
          <div className="mb-10">
            <Disclaimer />
          </div>

          {/* ── Ticker filter ───────────────────────────────── */}
          <div className="mb-10">
            <div className="text-xs font-mono text-dark-500 uppercase tracking-wide mb-2">
              Filter by Ticker
            </div>
            <div className="flex flex-wrap gap-2">
              {tickers.map((ticker) => (
                <button
                  key={ticker}
                  onClick={() => setActiveTicker(ticker)}
                  className={`text-xs font-mono rounded-full px-3 py-1 transition ${
                    ticker === activeTicker
                      ? "bg-brand-600 text-white"
                      : "bg-white/[0.06] text-dark-400 hover:text-white hover:bg-white/[0.1]"
                  }`}
                >
                  {ticker === "all" ? "All Tickers" : ticker}
                </button>
              ))}
            </div>
          </div>

          {/* ── Grouped sections ────────────────────────────── */}
          {filtered.length === 0 ? (
            <p className="text-center text-dark-400 font-mono py-16">
              No signals match your filter.
            </p>
          ) : (
            <div className="space-y-14">
              {categoryOrder.filter((cat) => grouped[cat]).map((cat) => {
                const info = categoryInfo[cat] || { emoji: "📈", label: cat, desc: "" };
                const items = grouped[cat];

                return (
                  <div key={cat}>
                    {/* Section header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl">{info.emoji}</span>
                        <h2 className="text-xl font-bold text-white font-mono">
                          {info.label}
                        </h2>
                        <span className="text-xs font-mono text-dark-500 bg-white/[0.04] rounded-full px-2 py-0.5">
                          {items.length} {items.length === 1 ? "signal" : "signals"}
                        </span>
                      </div>
                      <p className="text-sm text-dark-400 ml-10">{info.desc}</p>
                    </div>

                    {/* Cards grid */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      {items.map((s) => (
                        <Link key={s.id} href={`/signals/${s.id}`}>
                          <div className="glass-card rounded-xl p-6 h-full flex flex-col transition-all hover:scale-[1.01] hover:border-brand-500/30 group cursor-pointer">
                            {/* top row */}
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold font-mono text-brand-400 bg-brand-500/10 rounded-full px-2.5 py-0.5">
                                {s.ticker}
                              </span>
                              <span
                                className={`text-[10px] font-bold font-mono rounded-full border px-2.5 py-0.5 ${directionStyle(
                                  s.currentSignal.direction
                                )}`}
                              >
                                {s.currentSignal.direction}
                              </span>
                            </div>

                            {/* name */}
                            <h3 className="text-base font-bold text-white font-mono group-hover:text-brand-400 transition-colors leading-snug">
                              {s.name}
                            </h3>

                            {/* description */}
                            <p className="mt-1.5 text-xs text-dark-400 leading-relaxed line-clamp-2 flex-1">
                              {s.description}
                            </p>

                            {/* footer badges */}
                            <div className="mt-4 flex items-center gap-2 text-[11px] font-mono">
                              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400 font-semibold">
                                {Math.round(s.backtest.winRate * 100)}% WR
                              </span>
                              <span className="inline-flex items-center rounded-full bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 text-dark-400">
                                {s.timeframe}
                              </span>
                              <span className="ml-auto inline-flex items-center rounded-full bg-brand-500/10 px-2 py-0.5 text-brand-400 font-semibold">
                                ${s.price}/mo
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
