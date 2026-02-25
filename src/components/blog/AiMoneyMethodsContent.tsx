export default function AiMoneyMethodsContent() {
  return (
    <div className="prose-custom">
      <p className="text-lg text-dark-200 leading-relaxed">
        Last weekend, I sat down with a pot of coffee, 6 browser tabs full of
        &quot;how to make money with AI&quot; guides, and a spreadsheet. I
        cross-referenced everything against Reddit community data, real
        earnings reports, and our own testing at TokenSpy. Here&apos;s the
        unfiltered truth.
      </p>

      <div className="my-10 glass-card rounded-2xl p-6 border-yellow-500/20 bg-yellow-500/5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="text-lg font-semibold text-yellow-300 font-mono">
              The #1 Brutal Truth
            </h3>
            <p className="mt-1 text-dark-200">
              AI is an <strong className="text-white">efficiency multiplier</strong>,
              not a money printer. The formula:{" "}
              <strong className="text-white">
                Existing Skill + AI Speed = Income
              </strong>
              . Zero skills + AI = zero income, faster.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 font-mono">
        Three Things Nobody Tells You
      </h2>

      <div className="space-y-6">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2 font-mono">
            1. &quot;Passive Income&quot; is a Lie
          </h3>
          <p className="text-dark-300">
            Every so-called &quot;passive&quot; AI method requires 10-40 hours of
            setup and 2-5 hours per week of maintenance. There is no
            set-it-and-forget-it with AI. The tools update, the platforms
            change policies, and your competitors catch up.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2 font-mono">
            2. The Income Screenshots are Survivorship Bias
          </h3>
          <p className="text-dark-300">
            Articles love quoting &quot;$15,000/month in 8 months!&quot; stories.
            Reddit community data tells a different story: most people make{" "}
            <strong className="text-white">$200-$800 in their first 60 days</strong>.
            That&apos;s the realistic number. The $15K stories are outliers, not
            the norm.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2 font-mono">
            3. AI Can&apos;t Replace Skills You Don&apos;t Have
          </h3>
          <p className="text-dark-300">
            AI makes a good writer 5x faster. It doesn&apos;t make a non-writer
            into a writer. If you have zero marketable skills, AI won&apos;t
            create them from nothing — it&apos;ll just help you fail faster. You
            need at least one: writing, marketing, design, coding, or deep
            industry knowledge.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 font-mono">
        15 Methods We Tested — Overview
      </h2>

      <p className="text-dark-300 mb-6">
        We scored each method on five dimensions: startup cost, time-to-first-dollar,
        income ceiling, competition level, and longevity. Here are the categories
        and our high-level take:
      </p>

      {/* Top 5 — names and general direction only, no income ranges or detailed reasoning */}
      <h3 className="text-xl font-semibold text-white mt-8 mb-4 font-mono">
        The Top 5 That Actually Work 🏆
      </h3>

      <div className="space-y-4">
        {[
          {
            rank: "🥇",
            name: "AI Chatbot Building for Small Businesses",
            teaser: "Competition is still low — most small businesses haven't implemented AI yet. Pick one vertical and go deep.",
          },
          {
            rank: "🥈",
            name: "AI-Assisted Content Writing",
            teaser: "Lowest barrier to entry and fastest to monetize. But generic content is dead — you need industry expertise combined with AI speed.",
          },
          {
            rank: "🥉",
            name: "AI Video Editing / Content Repurposing",
            teaser: "Short-form demand is exploding. Every podcaster and YouTuber wants Reels and Shorts but doesn't have time.",
          },
          {
            rank: "4️⃣",
            name: "AI Social Media Management",
            teaser: "Monthly retainer model = real recurring income. Go vertical, not horizontal.",
          },
          {
            rank: "5️⃣",
            name: "AI Resume Writing Service",
            teaser: "Not glamorous, but evergreen demand. Low risk, stable income.",
          },
        ].map((method) => (
          <div key={method.name} className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{method.rank}</span>
              <h3 className="text-lg font-semibold text-white font-mono">{method.name}</h3>
            </div>
            <p className="text-dark-300 text-sm">{method.teaser}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold text-white mt-10 mb-4 font-mono">
        The Top 5 Traps to Avoid ⛔
      </h3>

      <div className="space-y-4">
        {[
          {
            icon: "⛔",
            name: "AI Blog Farms / Content Sites",
            reason: "Google is actively hunting AI content farms. The HCU update wiped out thousands of sites overnight.",
          },
          {
            icon: "⛔",
            name: "Prompt Engineering as a Career",
            reason: "AI tools are getting smarter — complex prompts are becoming unnecessary. This job title is dying.",
          },
          {
            icon: "⛔",
            name: "Generic AI Art on Etsy",
            reason: "Tens of thousands of sellers already. It's a race to the bottom.",
          },
          {
            icon: "⛔",
            name: "AI eBook Mass Publishing (KDP)",
            reason: "Amazon KDP is cracking down on AI-generated low-quality books. The gold rush is over.",
          },
          {
            icon: "💀",
            name: '"Make $10K in 7 Days with AI" Courses',
            reason: "The only person making money is the one selling the course to YOU.",
          },
        ].map((trap) => (
          <div
            key={trap.name}
            className="glass-card rounded-xl p-6 border-red-500/10"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{trap.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-white font-mono">{trap.name}</h3>
                <p className="mt-1 text-dark-300 text-sm">{trap.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-dark-300 mt-8">
        ...plus 5 more methods in the middle — some surprising, some disappointing.
        But the real value isn&apos;t the list — it&apos;s the <strong className="text-white">detailed scores,
        exact income ranges, Reddit-verified earnings data, and step-by-step
        playbooks</strong> for each method.
      </p>

      {/* BLUR LOCK — hides detailed scores, income data, step-by-step guides */}
      <div className="relative rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 overflow-hidden mt-8">
        <div className="blur-sm select-none pointer-events-none text-dark-200 text-sm leading-relaxed space-y-2 max-h-48 overflow-hidden">
          <p>Method 1 Score: Startup Cost 2/10, Time-to-Dollar 8/10, Income Ceiling 9/10, Competition 6/10...</p>
          <p>Reddit verified: user hit $7K/mo in 8 months specializing in dental chatbots. Here&apos;s the exact niche selection framework...</p>
          <p>Method 2: Expect $200-$800 in first 60 days. The $15K stories are outliers. Exact pricing strategy...</p>
          <p>Method 4: Managing 7 dental offices at $1,200/mo each = $8,400/mo. Client acquisition script...</p>
          <p>Method 6-10: The &quot;middle tier&quot; — AI tutoring ($800-2K), AI data analysis ($1.5-4K), AI translation...</p>
          <p>Full comparison matrix with all 15 methods scored across 5 dimensions...</p>
          <p>Which 3 methods we recommend starting with based on your existing skills...</p>
          <p>Red flag checklist: 7 signs an &quot;AI money method&quot; is actually a scam...</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505] flex items-end justify-center pb-8">
          <div className="text-center">
            <p className="text-sm text-dark-300 font-mono mb-3">
              🔒 Detailed scores, income data, Reddit验证, and step-by-step playbooks for all 15 methods
            </p>
            <a href="/pitfalls" className="inline-block rounded-lg bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/20 active:scale-[0.98] font-mono">
              Browse All Pitfalls — From $2.99
            </a>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 font-mono">
        The Bottom Line
      </h2>

      <p className="text-dark-200 leading-relaxed">
        Making money with AI in 2026 is absolutely possible — but it requires
        the same things that making money has always required:{" "}
        <strong className="text-white">skills, patience, and market understanding</strong>.
        AI is an accelerator, not a shortcut. The people who succeed are those who
        already have a monetizable skill and use AI to deliver 3-5x faster.
      </p>

      <p className="mt-4 text-dark-200 leading-relaxed">
        If you want the full 15-method breakdown with detailed scores,
        real Reddit data, and source links, check out our pitfall database — we&apos;ve got
        the complete research with fix guides and code examples.
      </p>

      <div className="mt-10 text-center">
        <a
          href="/pitfalls"
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/20 active:scale-[0.98]"
        >
          Get Pitfall Intel — From $2.99
        </a>
      </div>
    </div>
  );
}
