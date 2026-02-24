import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Kypro AI | Our Story",
  description:
    "Kypro AI was born from a construction supply company owner's real experience with AI. We test with real money, burn real tokens, and share honest results.",
  openGraph: {
    title: "About Kypro AI — Our Story",
    description:
      "A construction company owner + AI assistant tested everything so you don't have to. Real money, real failures, real lessons.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-medium text-brand-400 bg-brand-500/10 rounded-full px-3 py-1 mb-4">
              About Us
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
              <span className="gradient-text">We&apos;re Not Theorists.</span>
              <br />
              <span className="text-white/90">
                We Test With Real Money.
              </span>
            </h1>
            <p className="mt-6 text-lg text-dark-300 max-w-2xl mx-auto">
              Kypro AI was born from frustration — the gap between what AI
              &quot;gurus&quot; promise and what actually happens when you try it.
            </p>
          </div>

          {/* Origin Story */}
          <div className="space-y-8">
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                The Origin Story 📖
              </h2>
              <div className="space-y-4 text-dark-200 leading-relaxed">
                <p>
                  It started with JD — the owner of a construction supply
                  company. Like many business owners in 2025, JD heard the
                  buzz about AI and thought: &quot;What if I could use AI to
                  find new revenue streams? Automate parts of my business?
                  Maybe even build something new?&quot;
                </p>
                <p>
                  So JD dove in. And by &quot;dove in,&quot; we mean{" "}
                  <strong className="text-white">burned through thousands
                  of dollars in AI tokens</strong> testing every idea that
                  popped up on Twitter, Reddit, and YouTube. Scraping real
                  estate data (blocked by Cloudflare). Trading 0DTE options
                  with AI signals (1,944 strategies, all losers). Building
                  content farms (Google killed them). Selling AI art on Etsy
                  (drowned in a sea of galaxy wallpapers).
                </p>
                <p>
                  Along the way, JD worked with KY — an AI research assistant
                  that didn&apos;t sugarcoat results. When something failed, KY
                  documented exactly <em>why</em> it failed, how much it cost,
                  and what the data actually showed. No hype. No
                  &quot;well, maybe if you tweak it...&quot; — just cold, honest
                  analysis.
                </p>
                <p>
                  After months of testing, a realization hit:{" "}
                  <strong className="text-white">
                    the most valuable thing we built wasn&apos;t a product — it
                    was the knowledge of what doesn&apos;t work.
                  </strong>{" "}
                  Every failed experiment saved someone else from making the
                  same expensive mistake.
                </p>
                <p>
                  That&apos;s Kypro AI. We&apos;re the crash test dummies of the
                  AI gold rush.
                </p>
              </div>
            </div>

            {/* What Makes Us Different */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                What Makes Us Different 💎
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    icon: "💸",
                    title: "Real Money Testing",
                    desc: "We don't write about things we read online. We test with real money, real APIs, real market data. When we say something doesn't work, we have the receipts.",
                  },
                  {
                    icon: "🔥",
                    title: "Thousands Burned in Tokens",
                    desc: "We've spent thousands on AI API calls alone — testing prompts, running backtests, scraping data, building prototypes. That burn rate IS our research budget.",
                  },
                  {
                    icon: "📊",
                    title: "Data Over Opinions",
                    desc: "Every claim we make is backed by data. 1,944 backtest results. 27 strategy variations. 15 methods cross-referenced against 6 sources. Numbers don't lie.",
                  },
                  {
                    icon: "🚫",
                    title: "No Affiliate Traps",
                    desc: "We don't make money recommending tools. Our reviews aren't influenced by commission rates. If a tool is trash, we say it's trash.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-dark-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                The Team 👥
              </h2>
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-brand-600/20 text-4xl">
                    🧑‍💼
                  </div>
                  <h3 className="text-xl font-bold text-white">JD</h3>
                  <p className="text-brand-400 text-sm font-medium">Founder</p>
                  <p className="mt-3 text-sm text-dark-300">
                    Construction supply company owner turned AI tester.
                    Approaches AI with a businessman&apos;s skepticism: &quot;Show
                    me the P&amp;L, not the pitch deck.&quot; Has personally
                    lost money on most of the pitfalls we document — so you
                    don&apos;t have to.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500/20 text-4xl">
                    🤖
                  </div>
                  <h3 className="text-xl font-bold text-white">KY</h3>
                  <p className="text-cyan-400 text-sm font-medium">
                    AI Research Assistant
                  </p>
                  <p className="mt-3 text-sm text-dark-300">
                    The AI that doesn&apos;t sugarcoat results. KY analyzes
                    data, runs backtests, cross-references sources, and
                    delivers brutally honest verdicts. Powered by thousands
                    of dollars in API tokens and zero emotional attachment to
                    any particular conclusion.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="glass-card rounded-2xl p-8 border border-brand-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Our Mission 🎯
              </h2>
              <p className="text-center text-lg text-dark-200 leading-relaxed max-w-2xl mx-auto">
                To be the most honest source of AI testing data on the internet.
                We test things that everyone talks about but nobody verifies.
                We share what works, what doesn&apos;t, and exactly how much it
                costs to find out.
              </p>
              <p className="mt-4 text-center text-dark-400 italic">
                &quot;We burned the tokens so you don&apos;t have to.&quot;
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <a
              href="/#waitlist"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-brand-500 active:scale-[0.98]"
            >
              Join the Waitlist — Get Our Research Free
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
