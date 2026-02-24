export default function AiMoneyMethodsContent() {
  return (
    <div className="prose-custom">
      <p className="text-lg text-dark-200 leading-relaxed">
        Last weekend, I sat down with a pot of coffee, 6 browser tabs full of
        &quot;how to make money with AI&quot; guides, and a spreadsheet. I
        cross-referenced everything against Reddit community data, real
        earnings reports, and our own testing at Kypro AI. Here&apos;s the
        unfiltered truth.
      </p>

      <div className="my-10 glass-card rounded-2xl p-6 border border-yellow-500/20 bg-yellow-500/5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="text-lg font-semibold text-yellow-300">
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

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">
        Three Things Nobody Tells You
      </h2>

      <div className="space-y-6">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
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
          <h3 className="text-lg font-semibold text-white mb-2">
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
          <h3 className="text-lg font-semibold text-white mb-2">
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

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">
        The Top 5 That Actually Work 🏆
      </h2>

      <div className="space-y-4">
        {[
          {
            rank: "🥇",
            name: "AI Chatbot Building for Small Businesses",
            income: "$1,500-$5,000/mo",
            why: "Competition is still low — most small businesses haven't implemented AI yet. Pick one vertical (dental, restaurant) and go deep. Reddit verified: one user hit $7K/mo in 8 months specializing in dental chatbots.",
          },
          {
            rank: "🥈",
            name: "AI-Assisted Content Writing",
            income: "$500-$3,000/mo",
            why: "Lowest barrier to entry and fastest to monetize. But generic content is dead — you need industry expertise combined with AI speed. Expect $200-$800 in the first 60 days, not the $15K dream.",
          },
          {
            rank: "🥉",
            name: "AI Video Editing / Content Repurposing",
            income: "$1,000-$4,000/mo",
            why: "Short-form demand is exploding. Every podcaster and YouTuber wants Reels and Shorts but doesn't have time. AI tools like OpusClip let you deliver in 30 minutes what used to take 4-6 hours.",
          },
          {
            rank: "4️⃣",
            name: "AI Social Media Management",
            income: "$2,000-$8,000/mo",
            why: "Monthly retainer model = real recurring income. The sweet spot: managing 7 dental offices at $1,200/mo each = $8,400/mo. Go vertical, not horizontal.",
          },
          {
            rank: "5️⃣",
            name: "AI Resume Writing Service",
            income: "$500-$2,000/mo",
            why: "Not glamorous, but evergreen demand. Bundle it: Resume + Cover Letter + Interview Script = $500-$700 package. Low risk, stable income.",
          },
        ].map((method) => (
          <div key={method.name} className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{method.rank}</span>
              <h3 className="text-lg font-semibold text-white">{method.name}</h3>
              <span className="ml-auto px-2 py-1 rounded-lg bg-green-500/10 text-green-400 text-sm">
                {method.income}
              </span>
            </div>
            <p className="text-dark-300 text-sm">{method.why}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">
        The Top 5 Traps to Avoid ⛔
      </h2>

      <div className="space-y-4">
        {[
          {
            icon: "⛔",
            name: "AI Blog Farms / Content Sites",
            reason:
              "Google is actively hunting AI content farms. The HCU update wiped out thousands of sites overnight. You could invest 6-12 months and lose everything.",
          },
          {
            icon: "⛔",
            name: "Prompt Engineering as a Career",
            reason:
              "AI tools are getting smarter — complex prompts are becoming unnecessary. GPT-5 and Claude auto-optimize better than any human prompt engineer. This job title is dying.",
          },
          {
            icon: "⛔",
            name: "Generic AI Art on Etsy",
            reason:
              'Tens of thousands of sellers already hawking AI "inspirational quote posters" and "galaxy wallpapers." It\'s a race to the bottom.',
          },
          {
            icon: "⛔",
            name: "AI eBook Mass Publishing (KDP)",
            reason:
              "Amazon KDP is cracking down on AI-generated low-quality books. Mandatory AI disclosure, increased takedowns. The gold rush is over.",
          },
          {
            icon: "💀",
            name: '"Make $10K in 7 Days with AI" Courses',
            reason:
              "The only person making money is the one selling the course to YOU. If the method actually worked, they'd use it themselves.",
          },
        ].map((trap) => (
          <div
            key={trap.name}
            className="glass-card rounded-xl p-6 border border-red-500/10"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{trap.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{trap.name}</h3>
                <p className="mt-1 text-dark-300 text-sm">{trap.reason}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6">
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
        real Reddit data, and source links, join our waitlist — we&apos;ll
        send you the complete research report for free.
      </p>

      <div className="mt-10 text-center">
        <a
          href="/#waitlist"
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-brand-500 active:scale-[0.98]"
        >
          Get the Full Report — Free
        </a>
      </div>
    </div>
  );
}
