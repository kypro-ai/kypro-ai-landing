import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pitfalls, getPitfallById } from "@/lib/pitfalls-data";

/* ── Static params for pre-rendering ─────────────────────── */
export function generateStaticParams() {
  return pitfalls.map((p) => ({ id: p.id }));
}

/* ── SEO metadata ─────────────────────────────────────────── */
export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const p = getPitfallById(params.id);
  if (!p) return {};

  return {
    title: `${p.title} — TokenSpy Pitfalls`,
    description: p.summary,
    openGraph: {
      title: p.title,
      description: p.summary,
      type: "article",
      tags: p.tags,
    },
  };
}

/* ── Confidence bar colour ────────────────────────────────── */
function barColor(c: number) {
  if (c >= 0.95) return "bg-emerald-500";
  if (c >= 0.9) return "bg-green-500";
  if (c >= 0.8) return "bg-yellow-500";
  return "bg-orange-500";
}

/* ── Very small markdown → HTML renderer (no deps) ────────── */
function renderMarkdown(md: string): string {
  return md
    .split("\n")
    .map((line) => {
      // code blocks (fenced) – accumulate later; handle inline first
      if (line.startsWith("```")) return line; // passthrough for accumulation
      // headings
      if (line.startsWith("### "))
        return `<h3 class="text-lg font-bold text-white font-mono mt-8 mb-3">${line.slice(4)}</h3>`;
      if (line.startsWith("## "))
        return `<h2 class="text-xl font-bold text-white font-mono mt-10 mb-4">${line.slice(3)}</h2>`;
      if (line.startsWith("# "))
        return `<h1 class="text-2xl font-extrabold text-white font-mono mt-10 mb-4">${line.slice(2)}</h1>`;
      // unordered list
      if (/^[-*] /.test(line))
        return `<li class="ml-4 list-disc text-dark-200 leading-relaxed">${inlineFormat(line.slice(2))}</li>`;
      // table rows (simple) – render as-is wrapped in code style
      if (line.startsWith("|"))
        return `<div class="font-mono text-sm text-dark-300 whitespace-pre">${escapeHtml(line)}</div>`;
      // blank line
      if (line.trim() === "") return "<br/>";
      // paragraph
      return `<p class="text-dark-200 leading-relaxed mb-2">${inlineFormat(line)}</p>`;
    })
    .join("\n")
    // fenced code blocks
    .replace(
      /```(\w*)\n([\s\S]*?)```/g,
      '<pre class="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 overflow-x-auto my-4 text-sm font-mono text-emerald-300 leading-relaxed"><code>$2</code></pre>'
    );
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inlineFormat(s: string) {
  return s
    .replace(/`([^`]+)`/g, '<code class="bg-white/[0.06] text-brand-400 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
}

/* ── Page ──────────────────────────────────────────────────── */
export default function PitfallDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const p = getPitfallById(params.id);
  if (!p) notFound();

  const contentHtml = renderMarkdown(p.fullContent);
  const isPaid = p.price > 0;

  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-3xl">
          {/* ── Back link ──────────────────────────────────── */}
          <div className="mb-8">
            <Link
              href="/pitfalls"
              className="text-sm font-mono text-dark-400 hover:text-brand-400 transition-colors"
            >
              ← Back to Pitfalls
            </Link>
          </div>

          {/* ── Tags ───────────────────────────────────────── */}
          <div className="flex flex-wrap gap-2 mb-4">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-2.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* ── Title ──────────────────────────────────────── */}
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl leading-tight font-mono">
            {p.title}
          </h1>

          {/* ── Meta row ───────────────────────────────────── */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1.5 text-emerald-400 font-semibold">
              {p.price === 0 ? "Free" : `$${p.price}`}
            </span>

            {/* confidence bar */}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 text-dark-300">
              <span className="w-16 h-2 rounded-full bg-white/10 overflow-hidden">
                <span
                  className={`block h-full rounded-full ${barColor(p.confidence)}`}
                  style={{ width: `${p.confidence * 100}%` }}
                />
              </span>
              {Math.round(p.confidence * 100)}%
            </span>

            {isPaid && (
              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-3 py-1.5 text-yellow-400 font-semibold">
                🔒 Premium
              </span>
            )}
          </div>

          {/* ── Summary ────────────────────────────────────── */}
          <p className="mt-6 text-dark-300 text-lg leading-relaxed">
            {p.summary}
          </p>

          <div className="my-10 border-t border-emerald-500/10" />

          {/* ── Full content — paywalled or free ────────────── */}
          {isPaid ? (
            <div className="relative">
              {/* Blurred preview */}
              <div
                className="prose-custom blur-sm select-none pointer-events-none max-h-[300px] overflow-hidden"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/80 to-[#0a0a0a] flex flex-col items-center justify-end pb-8">
                <div className="glass-card rounded-2xl p-8 text-center max-w-md border border-brand-500/20">
                  <span className="text-3xl mb-3 block">🔒</span>
                  <h3 className="text-xl font-bold text-white font-mono mb-2">
                    Unlock Full Playbook
                  </h3>
                  <p className="text-dark-300 text-sm mb-1">
                    {p.estimatedTimeSaved && `Save ${p.estimatedTimeSaved} of trial and error.`}
                  </p>
                  <p className="text-dark-400 text-xs mb-4">
                    {p.estimatedCostSaved && `Estimated savings: ${p.estimatedCostSaved}`}
                  </p>
                  <a
                    href={`/api/checkout?pitfallId=${p.id}`}
                    className="inline-block rounded-full bg-brand-500 hover:bg-brand-400 text-black font-bold font-mono px-8 py-3 text-sm transition-colors"
                  >
                    Unlock for ${p.price}
                  </a>
                  <p className="text-dark-500 text-xs mt-3">
                    One-time purchase · Instant access · API key included
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          )}

          <div className="my-10 border-t border-emerald-500/10" />

          {/* ── Steps ──────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white font-mono mb-5">
              Steps
            </h2>
            <ol className="space-y-3">
              {p.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-dark-200 leading-relaxed">
                  <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold font-mono">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Gotchas ────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white font-mono mb-5">
              ⚠️ Gotchas
            </h2>
            <div className="space-y-3">
              {p.gotchas.map((g, i) => (
                <div
                  key={i}
                  className="flex gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04] px-5 py-4"
                >
                  <span className="shrink-0 text-yellow-400 text-lg">!</span>
                  <p className="text-yellow-200/90 text-sm leading-relaxed">
                    {g}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Results ────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white font-mono mb-5">
              Results
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-5">
                <div className="text-xs font-mono text-dark-500 uppercase tracking-wide mb-2">
                  Before
                </div>
                <p className="text-dark-200 text-sm leading-relaxed">
                  {p.results.before}
                </p>
              </div>
              <div className="rounded-xl border border-brand-500/20 bg-brand-500/[0.04] p-5">
                <div className="text-xs font-mono text-brand-400 uppercase tracking-wide mb-2">
                  After
                </div>
                <p className="text-dark-200 text-sm leading-relaxed">
                  {p.results.after}
                </p>
              </div>
            </div>
          </section>

          <div className="my-10 border-t border-emerald-500/10" />

          {/* ── API section ────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white font-mono mb-3">
              Get via API
            </h2>
            <p className="text-sm text-dark-400 mb-4">
              Fetch this pitfall programmatically:
            </p>
            <pre className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 overflow-x-auto text-sm font-mono text-emerald-300 leading-relaxed">
              <code>{`curl -X GET "https://api.tokenspy.com/v1/pitfalls/${p.id}" \\
  -H "Authorization: Bearer YOUR_API_KEY"`}</code>
            </pre>
          </section>

          {/* ── Back link (bottom) ─────────────────────────── */}
          <div className="pt-4">
            <Link
              href="/pitfalls"
              className="text-sm font-mono text-dark-400 hover:text-brand-400 transition-colors"
            >
              ← Back to Pitfalls
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
