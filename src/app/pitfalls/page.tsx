"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pitfalls } from "@/lib/pitfalls-data";

/* ── collect every unique tag ─────────────────────────────── */
const allTags = Array.from(new Set(pitfalls.flatMap((p) => p.tags))).sort();

/* ── confidence badge color ───────────────────────────────── */
function confidenceColor(c: number) {
  if (c >= 0.95) return "text-emerald-400 bg-emerald-500/10";
  if (c >= 0.9) return "text-green-400 bg-green-500/10";
  if (c >= 0.8) return "text-yellow-400 bg-yellow-500/10";
  return "text-orange-400 bg-orange-500/10";
}

export default function PitfallsPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = pitfalls;

    if (activeTag) {
      list = list.filter((p) => p.tags.includes(activeTag));
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    return list;
  }, [query, activeTag]);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          {/* ── Header ──────────────────────────────────────── */}
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-3 py-1 mb-4">
              Pitfall Database
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl font-mono">
              <span className="gradient-text">AI Pitfalls</span>
            </h1>
            <p className="mt-4 text-lg text-dark-300 max-w-2xl mx-auto">
              {pitfalls.length} real-world AI failures tested, documented, and
              priced — so you don&apos;t repeat them.
            </p>
          </div>

          {/* ── Search ──────────────────────────────────────── */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search pitfalls…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-white placeholder:text-dark-500 font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition"
            />
          </div>

          {/* ── Tag filters ─────────────────────────────────── */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs font-mono rounded-full px-3 py-1 transition ${
                activeTag === null
                  ? "bg-brand-600 text-white"
                  : "bg-white/[0.06] text-dark-400 hover:text-white hover:bg-white/[0.1]"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`text-xs font-mono rounded-full px-3 py-1 transition ${
                  tag === activeTag
                    ? "bg-brand-600 text-white"
                    : "bg-white/[0.06] text-dark-400 hover:text-white hover:bg-white/[0.1]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* ── Cards grid ──────────────────────────────────── */}
          {filtered.length === 0 ? (
            <p className="text-center text-dark-400 font-mono py-16">
              No pitfalls match your search.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {filtered.map((p) => (
                <Link key={p.id} href={`/pitfalls/${p.id}`}>
                  <div className="glass-card rounded-2xl p-7 h-full flex flex-col transition-all hover:scale-[1.02] hover:border-brand-500/30 group cursor-pointer">
                    {/* tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tags.length > 4 && (
                        <span className="text-[10px] font-mono text-dark-500">
                          +{p.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* title */}
                    <h2 className="text-lg font-bold text-white font-mono group-hover:text-brand-400 transition-colors leading-snug">
                      {p.title}
                    </h2>

                    {/* summary */}
                    <p className="mt-2 text-sm text-dark-300 leading-relaxed line-clamp-3 flex-1">
                      {p.summary}
                    </p>

                    {/* footer badges */}
                    <div className="mt-5 flex items-center gap-3 text-xs font-mono">
                      {/* price */}
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-emerald-400 font-semibold">
                        {p.price === 0 ? "Free" : `$${p.price}`}
                      </span>

                      {/* confidence */}
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold ${confidenceColor(
                          p.confidence
                        )}`}
                      >
                        {Math.round(p.confidence * 100)}% confidence
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
