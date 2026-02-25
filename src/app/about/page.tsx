import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — TokenSpy | Our Story & Team",
  description:
    "Meet the TokenSpy team — 9 specialists dedicated to testing AI methods with real money and delivering honest results.",
  openGraph: {
    title: "About TokenSpy — Our Story & Team",
    description:
      "Founded by a real business owner who burned thousands testing AI. Meet our 9-person team.",
    type: "website",
  },
};

const team = [
  {
    emoji: "🧑‍💼",
    name: "JD",
    role: "Founder & CEO",
    color: "brand",
    desc: "Business owner turned AI tester. Approaches AI with a businessman's skepticism: \"Show me the P&L, not the pitch deck.\" Has personally lost money on most of the pitfalls we document — so you don't have to.",
  },
  {
    emoji: "🛡️",
    name: "KY",
    role: "CTO & Lead Researcher",
    color: "cyan",
    desc: "Chief architect and lead researcher. Runs data analysis, backtests, and cross-references sources. Powered by thousands of dollars in API tokens and zero emotional attachment to any conclusion.",
  },
  {
    emoji: "📊",
    name: "Max",
    role: "Data Analyst",
    color: "emerald",
    desc: "The numbers guy. Runs backtests, statistical analysis, and data mining. If a strategy claims 80% win rate, Max will tell you it's actually 47% after accounting for survivorship bias.",
  },
  {
    emoji: "✍️",
    name: "Nova",
    role: "Content Director",
    color: "purple",
    desc: "Turns raw research data into readable reports, blog posts, and SEO content. Specializes in making complex AI topics accessible without dumbing them down.",
  },
  {
    emoji: "🎨",
    name: "Pixel",
    role: "Creative Lead",
    color: "pink",
    desc: "Brand identity, visual design, video production, and everything that makes TokenSpy look as sharp as its data. The Matrix green? That was Pixel.",
  },
  {
    emoji: "🔍",
    name: "Scout",
    role: "Market Researcher",
    color: "yellow",
    desc: "Scours Reddit, Twitter, forums, and dark corners of the internet for the latest AI money-making claims. If someone says they made $10K/mo with AI, Scout finds out if it's real.",
  },
  {
    emoji: "💰",
    name: "Vault",
    role: "Financial Strategist",
    color: "amber",
    desc: "Trading strategies, risk management, portfolio optimization. Tested 1,944 options parameter combos to prove 0DTE buying is mathematically unviable. Saves you from expensive mistakes.",
  },
  {
    emoji: "🤖",
    name: "Byte",
    role: "API & Automation Engineer",
    color: "teal",
    desc: "Tests every AI API, tool, and platform so you don't have to. Knows which APIs block automated access, which tools are overpriced, and which actually deliver on their promises.",
  },
  {
    emoji: "📣",
    name: "Echo",
    role: "Growth & Marketing",
    color: "orange",
    desc: "User acquisition, social media strategy, community building. Turns TokenSpy's research into content that reaches the people who need it most.",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  brand: { bg: "bg-brand-600/20", border: "border-brand-500/20", text: "text-brand-400" },
  cyan: { bg: "bg-cyan-500/20", border: "border-cyan-500/20", text: "text-cyan-400" },
  emerald: { bg: "bg-emerald-500/20", border: "border-emerald-500/20", text: "text-emerald-400" },
  purple: { bg: "bg-purple-500/20", border: "border-purple-500/20", text: "text-purple-400" },
  pink: { bg: "bg-pink-500/20", border: "border-pink-500/20", text: "text-pink-400" },
  yellow: { bg: "bg-yellow-500/20", border: "border-yellow-500/20", text: "text-yellow-400" },
  amber: { bg: "bg-amber-500/20", border: "border-amber-500/20", text: "text-amber-400" },
  teal: { bg: "bg-teal-500/20", border: "border-teal-500/20", text: "text-teal-400" },
  orange: { bg: "bg-orange-500/20", border: "border-orange-500/20", text: "text-orange-400" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-3 py-1 mb-4">
              About Us
            </span>
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl font-mono">
              <span className="gradient-text">We&apos;re Not Theorists.</span>
              <br />
              <span className="text-white/90">
                We Test With Real Money.
              </span>
            </h1>
            <p className="mt-6 text-lg text-dark-300 max-w-2xl mx-auto">
              TokenSpy was born from frustration — the gap between what AI
              &quot;gurus&quot; promise and what actually happens when you try it.
            </p>
          </div>

          {/* Origin Story */}
          <div className="space-y-8">
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4 font-mono">
                The Origin Story 📖
              </h2>
              <div className="space-y-4 text-dark-200 leading-relaxed">
                <p>
                  It started with JD — a real business owner who heard the
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
                  Along the way, JD assembled a team of AI specialists — each
                  focused on a different angle. Data analysis. Market research.
                  Content. Strategy. Together, they didn&apos;t sugarcoat results.
                  When something failed, the team documented exactly{" "}
                  <em>why</em> it failed, how much it cost, and what the data
                  actually showed.
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
                  That&apos;s TokenSpy. We&apos;re the crash test dummies of the
                  AI gold rush.
                </p>
              </div>
            </div>

            {/* What Makes Us Different */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-mono">
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
                      <h3 className="text-lg font-semibold text-white font-mono">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-dark-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team - 9 people */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4 text-center font-mono">
                The Team 👥
              </h2>
              <p className="text-center text-dark-400 mb-10 text-sm">
                9 specialists. One mission. No BS.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((member) => {
                  const c = colorMap[member.color] || colorMap.brand;
                  return (
                    <div key={member.name} className="text-center group">
                      <div
                        className={`mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full ${c.bg} border ${c.border} text-3xl transition-transform group-hover:scale-110`}
                      >
                        {member.emoji}
                      </div>
                      <h3 className="text-lg font-bold text-white font-mono">
                        {member.name}
                      </h3>
                      <p className={`${c.text} text-xs font-medium font-mono mb-2`}>
                        {member.role}
                      </p>
                      <p className="text-xs text-dark-400 leading-relaxed">
                        {member.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mission */}
            <div className="glass-card rounded-2xl p-8 border-brand-500/20">
              <h2 className="text-2xl font-bold text-white mb-4 text-center font-mono">
                Our Mission 🎯
              </h2>
              <p className="text-center text-lg text-dark-200 leading-relaxed max-w-2xl mx-auto">
                To be the most honest source of AI testing data on the internet.
                We test things that everyone talks about but nobody verifies.
                We share what works, what doesn&apos;t, and exactly how much it
                costs to find out.
              </p>
              <p className="mt-4 text-center text-dark-400 italic font-mono">
                &quot;We burned the tokens so you don&apos;t have to.&quot;
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <a
              href="/#pricing"
              className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/20 active:scale-[0.98]"
            >
              Get Pitfall Intel — From $2.99
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
