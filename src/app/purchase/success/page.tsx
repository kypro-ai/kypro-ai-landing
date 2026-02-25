"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PitfallContent {
  type: "pitfall";
  id: string;
  title: string;
  content: {
    summary: string;
    fullContent: string;
    steps: string[];
    gotchas: string[];
    results: { metric: string; before: string; after: string }[];
    tags: string[];
    estimatedTimeSaved: string;
    estimatedCostSaved: string;
  };
  customerEmail: string | null;
}

interface SignalContent {
  type: "signal";
  id: string;
  name: string;
  content: {
    description: string;
    methodology: string;
    indicators: string[];
    backtest: {
      period: string;
      winRate: number;
      cagr?: number;
      profitFactor?: number;
      maxDrawdown?: string;
      totalTrades?: number;
    };
    currentSignal: {
      direction: string;
      confidence: number;
      lastUpdated: string;
      note: string;
    };
    tags: string[];
    timeframe: string;
  };
  customerEmail: string | null;
}

type DeliveryData = PitfallContent | SignalContent;

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [data, setData] = useState<DeliveryData | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMsg("No session ID found.");
      return;
    }

    Promise.all([
      fetch("/api/deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      }).then((r) => r.json()),
      fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      }).then((r) => r.json()),
    ])
      .then(([deliverRes, keyRes]) => {
        if (deliverRes.error) {
          setStatus("error");
          setErrorMsg(deliverRes.error);
          return;
        }
        setData(deliverRes);
        if (keyRes.key) setApiKey(keyRes.key);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
        setErrorMsg("Failed to verify payment.");
      });
  }, [sessionId]);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-3xl">

          {/* LOADING */}
          {status === "loading" && (
            <div className="text-center">
              <div className="text-5xl mb-6 animate-pulse">⏳</div>
              <h1 className="text-3xl font-extrabold text-white font-mono">
                Verifying Payment...
              </h1>
              <p className="mt-4 text-dark-300">
                Confirming your purchase and unlocking content.
              </p>
            </div>
          )}

          {/* PITFALL DELIVERY */}
          {status === "success" && data?.type === "pitfall" && (
            <div>
              <div className="text-center mb-10">
                <div className="text-5xl mb-4">🎉</div>
                <h1 className="text-3xl font-extrabold text-white font-mono">
                  Purchase Complete!
                </h1>
                <p className="mt-2 text-dark-300">
                  Your full pitfall intel is below. Bookmark this page to access it later.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-8 border border-brand-500/30 mb-8">
                <h2 className="text-2xl font-bold text-white font-mono mb-2">
                  {data.title}
                </h2>
                <p className="text-dark-300 mb-6">{data.content.summary}</p>

                {/* Full Content (markdown-like) */}
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-sm text-dark-200 leading-relaxed font-mono bg-white/[0.02] rounded-xl p-6 border border-white/[0.06]">
                    {data.content.fullContent}
                  </div>
                </div>

                {/* Steps */}
                {data.content.steps.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-bold text-brand-400 font-mono mb-3">📋 Key Steps</h3>
                    <ol className="space-y-2">
                      {data.content.steps.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm text-dark-200">
                          <span className="text-brand-400 font-mono font-bold shrink-0">{i + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Gotchas */}
                {data.content.gotchas.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-bold text-red-400 font-mono mb-3">⚠️ Gotchas</h3>
                    <ul className="space-y-2">
                      {data.content.gotchas.map((gotcha, i) => (
                        <li key={i} className="flex gap-2 text-sm text-dark-200">
                          <span className="text-red-400 shrink-0">•</span>
                          {gotcha}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Results */}
                {data.content.results.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-sm font-bold text-brand-400 font-mono mb-3">📊 Results</h3>
                    <div className="bg-white/[0.04] rounded-xl overflow-hidden border border-white/[0.08]">
                      <table className="w-full text-sm font-mono">
                        <thead>
                          <tr className="border-b border-white/[0.08]">
                            <th className="px-4 py-2 text-left text-dark-400 font-normal">Metric</th>
                            <th className="px-4 py-2 text-left text-dark-400 font-normal">Before</th>
                            <th className="px-4 py-2 text-left text-dark-400 font-normal">After</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.content.results.map((r, i) => (
                            <tr key={i} className="border-b border-white/[0.06] last:border-0">
                              <td className="px-4 py-2 text-dark-300">{r.metric}</td>
                              <td className="px-4 py-2 text-red-400">{r.before}</td>
                              <td className="px-4 py-2 text-emerald-400 font-semibold">{r.after}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Savings */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="bg-brand-500/10 rounded-lg px-4 py-2 border border-brand-500/20">
                    <span className="text-xs text-dark-400 font-mono">Time Saved</span>
                    <p className="text-sm font-bold text-brand-400">{data.content.estimatedTimeSaved}</p>
                  </div>
                  <div className="bg-brand-500/10 rounded-lg px-4 py-2 border border-brand-500/20">
                    <span className="text-xs text-dark-400 font-mono">Cost Saved</span>
                    <p className="text-sm font-bold text-brand-400">{data.content.estimatedCostSaved}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {data.content.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono text-brand-400 bg-brand-500/10 rounded-full px-2.5 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* API Key */}
              {apiKey && <ApiKeyCard apiKey={apiKey} endpoint={`/api/pitfalls/${data.id}`} />}

              <NavLinks />
            </div>
          )}

          {/* SIGNAL DELIVERY */}
          {status === "success" && data?.type === "signal" && (
            <div>
              <div className="text-center mb-10">
                <div className="text-5xl mb-4">🎉</div>
                <h1 className="text-3xl font-extrabold text-white font-mono">
                  Subscription Active!
                </h1>
                <p className="mt-2 text-dark-300">
                  Full signal methodology unlocked. Bookmark this page for reference.
                </p>
              </div>

              <div className="glass-card rounded-2xl p-8 border border-brand-500/30 mb-8">
                <h2 className="text-2xl font-bold text-white font-mono mb-2">{data.name}</h2>
                <p className="text-dark-300 mb-6">{data.content.description}</p>

                <div className="space-y-6">
                  {/* Current Signal */}
                  <div className="bg-white/[0.04] rounded-xl p-5 border border-white/[0.08]">
                    <h3 className="text-sm font-bold text-brand-400 font-mono mb-3">📡 Current Signal</h3>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-sm font-bold font-mono rounded-full border px-4 py-1.5 ${
                        data.content.currentSignal.direction === "LONG" ? "text-emerald-400 bg-emerald-500/15 border-emerald-500/30" :
                        data.content.currentSignal.direction === "SHORT" ? "text-red-400 bg-red-500/15 border-red-500/30" :
                        "text-yellow-400 bg-yellow-500/15 border-yellow-500/30"
                      }`}>
                        {data.content.currentSignal.direction}
                      </span>
                      <span className="text-xs text-dark-500">{data.content.currentSignal.lastUpdated}</span>
                    </div>
                    <p className="text-sm text-dark-200">{data.content.currentSignal.note}</p>
                  </div>

                  {/* Full Methodology */}
                  <div>
                    <h3 className="text-sm font-bold text-brand-400 font-mono mb-3">📐 Full Methodology</h3>
                    <div className="bg-white/[0.04] rounded-xl p-5 border border-brand-500/20 whitespace-pre-wrap text-sm font-mono text-dark-200 leading-relaxed">
                      {data.content.methodology}
                    </div>
                  </div>

                  {/* Full Backtest */}
                  <div>
                    <h3 className="text-sm font-bold text-brand-400 font-mono mb-3">🧪 Full Backtest Results</h3>
                    <div className="bg-white/[0.04] rounded-xl overflow-hidden border border-white/[0.08]">
                      <table className="w-full text-sm font-mono">
                        <tbody>
                          {[
                            { label: "Period", value: data.content.backtest.period },
                            { label: "Win Rate", value: `${Math.round(data.content.backtest.winRate * 100)}%`, color: "text-emerald-400" },
                            ...(data.content.backtest.cagr !== undefined ? [{ label: "CAGR", value: `${data.content.backtest.cagr}%`, color: "text-emerald-400" }] : []),
                            ...(data.content.backtest.profitFactor !== undefined ? [{ label: "Profit Factor", value: `${data.content.backtest.profitFactor}×` }] : []),
                            ...(data.content.backtest.maxDrawdown !== undefined ? [{ label: "Max Drawdown", value: data.content.backtest.maxDrawdown, color: "text-red-400" }] : []),
                            ...(data.content.backtest.totalTrades !== undefined ? [{ label: "Total Trades", value: `${data.content.backtest.totalTrades}` }] : []),
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-white/[0.06] last:border-0">
                              <td className="px-5 py-3 text-dark-400">{row.label}</td>
                              <td className={`px-5 py-3 font-semibold ${row.color || "text-white"}`}>{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Indicators */}
                  <div>
                    <h3 className="text-sm font-bold text-brand-400 font-mono mb-3">📊 Indicators</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.content.indicators.map((ind) => (
                        <span key={ind} className="text-sm font-mono text-brand-400 bg-brand-500/10 rounded-lg px-3 py-1.5">{ind}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {data.content.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono text-brand-400 bg-brand-500/10 rounded-full px-2.5 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {apiKey && <ApiKeyCard apiKey={apiKey} endpoint={`/api/signals/${data.id}`} />}
              <NavLinks />
            </div>
          )}

          {/* ERROR */}
          {status === "error" && (
            <div className="text-center">
              <div className="text-5xl mb-6">❌</div>
              <h1 className="text-3xl font-extrabold text-white font-mono">
                Something Went Wrong
              </h1>
              <p className="mt-4 text-dark-300">
                {errorMsg || "We couldn't verify your payment."} If you were charged, contact{" "}
                <a href="mailto:contact@tokenspy.ai" className="text-brand-400 hover:underline">contact@tokenspy.ai</a>
              </p>
              {sessionId && <p className="mt-2 text-xs font-mono text-dark-500">Session: {sessionId}</p>}
              <NavLinks className="mt-8" />
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ApiKeyCard({ apiKey, endpoint }: { apiKey: string; endpoint: string }) {
  return (
    <div className="glass-card rounded-2xl p-6 border border-white/10 mb-8">
      <h3 className="text-sm font-bold text-white font-mono mb-3">🔑 Your API Key</h3>
      <code className="text-brand-400 font-mono text-xs break-all select-all block bg-white/[0.04] rounded-lg p-3">
        {apiKey}
      </code>
      <p className="mt-3 text-xs text-dark-500">
        Save this key — use it for programmatic access via API or MCP.
      </p>
      <pre className="mt-3 bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 overflow-x-auto text-xs font-mono text-emerald-300">
        <code>{`curl "https://www.tokenspy.ai${endpoint}?key=${apiKey}"`}</code>
      </pre>
    </div>
  );
}

function NavLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center ${className}`}>
      <Link href="/pitfalls" className="rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white font-mono text-sm text-center hover:bg-brand-500 transition-colors">
        Browse Pitfalls
      </Link>
      <Link href="/signals" className="rounded-xl bg-white/5 border border-white/10 px-6 py-3 font-semibold text-white font-mono text-sm text-center hover:bg-white/10 transition-colors">
        View Signals
      </Link>
    </div>
  );
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-white font-mono animate-pulse">Loading...</div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
