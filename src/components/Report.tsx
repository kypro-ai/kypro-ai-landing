const methods = [
  {
    rank: '🥇',
    name: 'AI Chatbot Building',
    verdict: '✅',
    income: '$1.5K-$5K/mo',
    competition: '🟢 Low',
    auto: '70%',
    summary: 'Build customer service chatbots for small businesses using no-code platforms. Competition is still low — most small businesses haven\'t implemented AI yet.',
    tip: 'Pick ONE vertical (dental, restaurant, real estate) and go deep. Don\'t be a generalist.',
    realData: 'Reddit verified: one user hit $7K/mo in 8 months specializing in dental chatbots.',
  },
  {
    rank: '🥈',
    name: 'AI Content Writing',
    verdict: '✅',
    income: '$500-$3K/mo',
    competition: '🔴 High',
    auto: '60%',
    summary: 'Use AI for drafts, humans for polish. Serve businesses that need blog posts, email copy, and marketing content.',
    tip: 'Generic content is dead. You need industry expertise + AI speed to stand out.',
    realData: 'Reddit reality check: first 60 days expect $200-$800, not the "$15K/mo" stories online.',
  },
  {
    rank: '🥉',
    name: 'AI Video Editing Service',
    verdict: '✅',
    income: '$1K-$4K/mo',
    competition: '🟡 Medium',
    auto: '80%',
    summary: 'Turn long YouTube videos and podcasts into short-form content (Reels/Shorts) using AI tools like OpusClip.',
    tip: 'Position as a "Content Multiplication System" not "video editor" — sells 3x better.',
    realData: 'Reddit confirmed $800-$2,500/mo is realistic. Short-form demand is still exploding.',
  },
  {
    rank: '4',
    name: 'AI Social Media Management',
    verdict: '✅',
    income: '$2K-$8K/mo',
    competition: '🟡 Medium-High',
    auto: '50%',
    summary: 'Manage social media for small businesses using AI for content creation, scheduling, and analytics.',
    tip: 'Go vertical: managing 7 dental offices at $1,200/mo each = $8,400/mo recurring.',
    realData: 'Monthly retainer model = real recurring income. Best for people with marketing background.',
  },
  {
    rank: '5',
    name: 'AI Resume Writing',
    verdict: '✅',
    income: '$500-$2K/mo',
    competition: '🟡 Medium',
    auto: '50%',
    summary: 'AI-powered resume, cover letter, and LinkedIn optimization packages for job seekers.',
    tip: 'Bundle it: Resume + Cover Letter + Interview Script = $500-$700 package.',
    realData: 'Evergreen demand. Not glamorous but stable and low risk.',
  },
];

const avoidList = [
  {
    name: 'AI Blog Farms',
    icon: '⛔',
    reason: 'Google is actively hunting AI content farms. The HCU update wiped out thousands of sites. You could invest 6-12 months and lose everything overnight.',
    lossRisk: '$500-$5,000+',
  },
  {
    name: 'Prompt Engineering Consulting',
    icon: '⛔',
    reason: 'AI tools are getting smarter — complex prompts are becoming unnecessary. This job title is dying in 2026. GPT-5 and Claude auto-optimize better than any human.',
    lossRisk: '$200+ in wasted learning',
  },
  {
    name: 'Generic AI Art on Etsy',
    icon: '⛔',
    reason: 'Massively saturated. Tens of thousands of sellers already selling AI "inspirational quote posters" and "galaxy wallpapers". Race to the bottom.',
    lossRisk: '$100-$300',
  },
  {
    name: 'AI eBook Mass Publishing',
    icon: '⛔',
    reason: 'Amazon KDP is cracking down on AI-generated low-quality books. Mandatory AI disclosure, increased takedowns. The gold rush is over.',
    lossRisk: '$200-$1,000',
  },
  {
    name: '"Make $10K in 7 Days" Courses',
    icon: '💀',
    reason: 'The only person making money is the one selling the course to YOU. If the method actually worked, they\'d use it themselves instead of selling a $97 course about it.',
    lossRisk: '$97-$997',
  },
];

export default function Report() {
  return (
    <section id="report" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-4">
          <span className="inline-block text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-3 py-1 mb-4">
            Issue #001 — Feb 2026
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl font-mono">
            AI Money-Making Methods: Tested &amp; Rated
          </h2>
          <p className="mt-4 text-lg text-dark-300 max-w-2xl mx-auto">
            We analyzed 15 popular &quot;make money with AI&quot; methods from 6+ sources including Reddit community data. Here&apos;s what actually works.
          </p>
        </div>

        {/* Key Insight Banner */}
        <div className="my-12 glass-card rounded-2xl p-6 border-yellow-500/20 bg-yellow-500/5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="text-lg font-semibold text-yellow-300 font-mono">The Brutal Truth</h3>
              <p className="mt-1 text-dark-200">
                AI is an <strong className="text-white">efficiency multiplier</strong>, not a money printer. The formula is: <strong className="text-white">Existing Skill + AI Speed = Income</strong>. Zero skills + AI = zero income, faster.
              </p>
            </div>
          </div>
        </div>

        {/* Top 5 Recommended */}
        <h3 className="text-2xl font-bold text-white mb-6 font-mono">
          Top 5 Recommended ✅
        </h3>
        <div className="space-y-4 mb-16">
          {methods.map((m) => (
            <div key={m.name} className="glass-card rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{m.rank}</span>
                  <div>
                    <h4 className="text-lg font-semibold text-white font-mono">{m.name}</h4>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="px-2 py-1 rounded-lg bg-brand-500/10 text-brand-400 font-mono">{m.income}</span>
                  <span className="px-2 py-1 rounded-lg bg-white/5 text-dark-300">{m.competition}</span>
                  <span className="px-2 py-1 rounded-lg bg-brand-500/10 text-brand-300 font-mono">{m.auto} auto</span>
                </div>
              </div>
              <p className="text-sm text-dark-200 mb-2">{m.summary}</p>
              <div className="flex flex-col gap-1 text-sm">
                <p className="text-cyan-400">💡 Pro tip: {m.tip}</p>
                <p className="text-dark-400">📊 Real data: {m.realData}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Top 5 Avoid */}
        <h3 className="text-2xl font-bold text-white mb-6 font-mono">
          Top 5 to Avoid ⛔
        </h3>
        <div className="space-y-4 mb-12">
          {avoidList.map((a) => (
            <div key={a.name} className="glass-card rounded-xl p-6 border-red-500/10">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{a.icon}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-semibold text-white font-mono">{a.name}</h4>
                  </div>
                  <p className="text-sm text-dark-200 mb-2">{a.reason}</p>
                  <p className="text-xs text-red-400 font-mono">💸 Potential waste: {a.lossRisk}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center glass-card rounded-2xl p-8 border-brand-500/20">
          <h3 className="text-xl font-bold text-white mb-2 font-mono">Want the full 15-method report?</h3>
          <p className="text-dark-300 mb-6 text-sm">
            Detailed scores, real Reddit data, source links, and our 4-week testing plan.
          </p>
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/20 active:scale-[0.98]"
          >
            Get Full Report — Free
          </a>
        </div>
      </div>
    </section>
  );
}
