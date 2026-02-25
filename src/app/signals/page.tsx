"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";
import { signals, getCategories, getTickers } from "@/lib/signals-data";

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

const categories = ["all", ...getCategories()];
const tickers = ["all", ...getTickers()];

export default function SignalsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTicker, setActiveTicker] = useState("all");

  const filtered = useMemo(() => {
    let list = signals;

    if (activeCategory !== "all") {
      list = list.filter((s) => s.category === activeCategory);
    }

    if (activeTicker !== "all") {
      list = list.filter((s) => s.ticker === activeTicker);
    }

    return list;
  }, [activeCategory, activeTicker]);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          {/* ── Header ──────────────────────────────────────── */}
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-3 py-1 mb-4">
              Trading Signals
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl font-mono">
              <span className="gradient-text">AI Signals</span>
            </h1>
            <p className="mt-4 text-lg text-dark-300 max-w-2xl mx-auto">
              {signals.length} algorithmic trading strategies — backtested,
              documented, and ready to deploy.
            </p>
          </div>

          {/* ── Disclaimer ──────────────────────────────────── */}
          <div className="mb-10">
            <Disclaimer />
          </div>

          {/* ── Category tabs ───────────────────────────────── */}
          <div className="mb-4">
            <div className="text-xs font-mono text-dark-500 uppercase tracking-wide mb-2">
              Category
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs font-mono rounded-full px-3 py-1 transition capitalize ${
                    cat === activeCategory
                      ? "bg-brand-600 text-white"
                      : "bg-white/[0.06] text-dark-400 hover:text-white hover:bg-white/[0.1]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Ticker filters ──────────────────────────────── */}
          <div className="mb-10">
            <div className="text-xs font-mono text-dark-500 uppercase tracking-wide mb-2">
              Ticker
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
                  {ticker === "all" ? "All" : ticker}
                </button>
              ))}
            </div>
          </div>

          {/* ── Cards grid ──────────────────────────────────── */}
          {filtered.length === 0 ? (
            <p className="text-center text-dark-400 font-mono py-16">
              No signals match your filters.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {filtered.map((s) => (
                <Link key={s.id} href={`/signals/${s.id}`}>
                  <div className="glass-card rounded-2xl p-7 h-full flex flex-col transition-all hover:scale-[1.02] hover:border-brand-500/30 group cursor-pointer">
                    {/* top row: ticker + direction */}
                    <div className="flex items-center justify-between mb-3">
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
                    <h2 className="text-lg font-bold text-white font-mono group-hover:text-brand-400 transition-colors leading-snug">
                      {s.name}
                    </h2>

                    {/* description */}
                    <p className="mt-2 text-sm text-dark-300 leading-relaxed line-clamp-3 flex-1">
                      {s.description}
                    </p>

                    {/* tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {s.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium font-mono text-dark-500 bg-white/[0.04] rounded-full px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                      {s.tags.length > 4 && (
                        <span className="text-[10px] font-mono text-dark-500">
                          +{s.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* footer badges */}
                    <div className="mt-5 flex items-center gap-3 text-xs font-mono">
                      {/* win rate */}
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-400 font-semibold">
                        {Math.round(s.backtest.winRate * 100)}% WR
                      </span>

                      {/* timeframe */}
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-dark-300">
                        {s.timeframe}
                      </span>

                      {/* price */}
                      <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-brand-500/10 px-2.5 py-1 text-brand-400 font-semibold">
                        ${s.price}/mo
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
