import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Disclaimer from "@/components/Disclaimer";
import { signals, getSignalById } from "@/lib/signals-data";

/* ── Static params for pre-rendering ─────────────────────── */
export function generateStaticParams() {
  return signals.map((s) => ({ id: s.id }));
}

/* ── SEO metadata ─────────────────────────────────────────── */
export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const s = getSignalById(params.id);
  if (!s) return {};

  return {
    title: `${s.name} — TokenSpy Trading Signals`,
    description: s.description,
    openGraph: {
      title: s.name,
      description: s.description,
      type: "article",
      tags: s.tags,
    },
  };
}

/* ── Direction badge color ────────────────────────────────── */
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

/* ── Confidence bar colour ────────────────────────────────── */
function barColor(c: number) {
  if (c >= 0.7) return "bg-emerald-500";
  if (c >= 0.5) return "bg-green-500";
  if (c >= 0.3) return "bg-yellow-500";
  return "bg-dark-500";
}

/* ── Page ──────────────────────────────────────────────────── */
export default function SignalDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const s = getSignalById(params.id);
  if (!s) notFound();

  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-3xl">
          {/* ── Back link ──────────────────────────────────── */}
          <div className="mb-8">
            <Link
              href="/signals"
              className="text-sm font-mono text-dark-400 hover:text-brand-400 transition-colors"
            >
              ← Back to Signals
            </Link>
          </div>

          {/* ── Hero section ───────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-sm font-bold font-mono text-brand-400 bg-brand-500/10 rounded-full px-3 py-1">
              {s.ticker}
            </span>
            <span className="text-xs font-mono text-dark-500 bg-white/[0.04] rounded-full px-3 py-1 capitalize">
              {s.category}
            </span>
            <span
              className={`text-xs font-bold font-mono rounded-full border px-3 py-1 ${directionStyle(
                s.currentSignal.direction
              )}`}
            >
              {s.currentSignal.direction}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight font-mono">
            {s.name}
          </h1>

          {/* ── Meta row ───────────────────────────────────── */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1.5 text-emerald-400 font-semibold">
              {Math.round(s.backtest.winRate * 100)}% Win Rate
            </span>

            {/* confidence bar */}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 text-dark-300">
              <span className="w-16 h-2 rounded-full bg-white/10 overflow-hidden">
                <span
                  className={`block h-full rounded-full ${barColor(
                    s.currentSignal.confidence
                  )}`}
                  style={{
                    width: `${Math.max(s.currentSignal.confidence * 100, 5)}%`,
                  }}
                />
              </span>
              {Math.round(s.currentSignal.confidence * 100)}% confidence
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 text-dark-300">
              {s.timeframe}
            </span>
          </div>

          {/* ── Description ────────────────────────────────── */}
          <p className="mt-6 text-dark-300 text-lg leading-relaxed">
            {s.description}
          </p>

          <div className="my-10 border-t border-emerald-500/10" />

          {/* ── Current Signal ─────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white font-mono mb-5">
              📡 Current Signal
            </h2>
            <div className="glass-card rounded-xl p-6">
              <div className="flex flex-wrap items-center gap-4 mb-3">
                <span
                  className={`text-sm font-bold font-mono rounded-full border px-4 py-1.5 ${directionStyle(
                    s.currentSignal.direction
                  )}`}
                >
                  {s.currentSignal.direction}
                </span>
                <span className="text-xs font-mono text-dark-500">
                  Updated: {s.currentSignal.lastUpdated}
                </span>
              </div>
              <p className="text-sm text-dark-200 leading-relaxed">
                {s.currentSignal.note}
              </p>
            </div>
          </section>

          {/* ── Indicators ─────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white font-mono mb-5">
              📊 Indicators
            </h2>
            <div className="flex flex-wrap gap-2">
              {s.indicators.map((ind) => (
                <span
                  key={ind}
                  className="text-sm font-mono text-brand-400 bg-brand-500/10 rounded-lg px-3 py-1.5"
                >
                  {ind}
                </span>
              ))}
            </div>
          </section>

          {/* ── Backtest Results ────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white font-mono mb-5">
              🧪 Backtest Results
            </h2>
            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full text-sm font-mono">
                <tbody>
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-5 py-3 text-dark-400">Period</td>
                    <td className="px-5 py-3 text-white font-semibold">
                      {s.backtest.period}
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-5 py-3 text-dark-400">Win Rate</td>
                    <td className="px-5 py-3 text-emerald-400 font-semibold">
                      {Math.round(s.backtest.winRate * 100)}%
                    </td>
                  </tr>
                  {s.backtest.cagr !== undefined && (
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-5 py-3 text-dark-400">CAGR</td>
                      <td className="px-5 py-3 text-white font-semibold">
                        <span className="blur-sm select-none">
                          {s.backtest.cagr}%
                        </span>
                        <span className="ml-2 text-xs text-dark-500">
                          🔒 Premium
                        </span>
                      </td>
                    </tr>
                  )}
                  {s.backtest.profitFactor !== undefined && (
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-5 py-3 text-dark-400">
                        Profit Factor
                      </td>
                      <td className="px-5 py-3 text-white font-semibold">
                        <span className="blur-sm select-none">
                          {s.backtest.profitFactor}×
                        </span>
                        <span className="ml-2 text-xs text-dark-500">
                          🔒 Premium
                        </span>
                      </td>
                    </tr>
                  )}
                  {s.backtest.maxDrawdown !== undefined && (
                    <tr className="border-b border-white/[0.06]">
                      <td className="px-5 py-3 text-dark-400">
                        Max Drawdown
                      </td>
                      <td className="px-5 py-3 text-white font-semibold">
                        <span className="blur-sm select-none">
                          {s.backtest.maxDrawdown}
                        </span>
                        <span className="ml-2 text-xs text-dark-500">
                          🔒 Premium
                        </span>
                      </td>
                    </tr>
                  )}
                  {s.backtest.totalTrades !== undefined && (
                    <tr>
                      <td className="px-5 py-3 text-dark-400">
                        Total Trades
                      </td>
                      <td className="px-5 py-3 text-white font-semibold">
                        <span className="blur-sm select-none">
                          {s.backtest.totalTrades}
                        </span>
                        <span className="ml-2 text-xs text-dark-500">
                          🔒 Premium
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Methodology (blurred/paywalled) ────────────── */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white font-mono mb-5">
              📐 Methodology
            </h2>
            <div className="relative rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 overflow-hidden">
              {/* blurred content preview */}
              <div className="blur-sm select-none pointer-events-none text-dark-200 text-sm leading-relaxed font-mono space-y-2 max-h-64 overflow-hidden">
                {s.methodology.split("\n").map((line, i) => (
                  <p key={i}>{line || "\u00A0"}</p>
                ))}
              </div>

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] flex items-end justify-center pb-8">
                <div className="text-center">
                  <p className="text-sm text-dark-300 font-mono mb-3">
                    🔒 Full methodology requires a subscription
                  </p>
                  <button className="rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/20 active:scale-[0.98] font-mono">
                    Subscribe for ${s.price}/mo
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── Tags ───────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white font-mono mb-5">
              🏷️ Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-2.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <div className="my-10 border-t border-emerald-500/10" />

          {/* ── API section ────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white font-mono mb-3">
              Get via API
            </h2>
            <p className="text-sm text-dark-400 mb-4">
              Fetch this signal programmatically:
            </p>
            <pre className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 overflow-x-auto text-sm font-mono text-emerald-300 leading-relaxed">
              <code>{`curl -X GET "https://www.tokenspy.ai/api/signals/${s.id}" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
            </pre>
          </section>

          {/* ── Disclaimer ─────────────────────────────────── */}
          <div className="mb-12">
            <Disclaimer />
          </div>

          {/* ── Back link (bottom) ─────────────────────────── */}
          <div className="pt-4">
            <Link
              href="/signals"
              className="text-sm font-mono text-dark-400 hover:text-brand-400 transition-colors"
            >
              ← Back to Signals
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
