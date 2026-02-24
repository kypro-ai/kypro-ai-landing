const features = [
  {
    icon: '🚫',
    title: 'AI Pitfall Database',
    description:
      'A growing library of verified failures — APIs that block AI, strategies that don\'t work, prompts that waste tokens. Learn from our mistakes, not yours.',
  },
  {
    icon: '⚡',
    title: 'Token Optimization',
    description:
      'Proven prompt templates and workflows that cut your AI spending by 80%. Same results, fraction of the cost. Updated weekly.',
  },
  {
    icon: '✅',
    title: 'Verified Results Library',
    description:
      'We run the experiments so you don\'t have to. Backtests, API tests, tool comparisons — all with real data and honest conclusions.',
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-24 sm:py-32 relative">
      {/* Subtle green grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(52,211,153,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.3) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl font-mono">
            Stop Burning Tokens on Dead Ends
          </h2>
          <p className="mt-4 text-lg text-dark-300 max-w-2xl mx-auto">
            Every week, millions of dollars in AI tokens are wasted on tasks that were already proven to fail. We&apos;re building the map of what works.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card group rounded-2xl p-8 transition-all"
            >
              <div className="mb-4 text-4xl">{f.icon}</div>
              <h3 className="text-xl font-semibold text-white font-mono">{f.title}</h3>
              <p className="mt-3 text-dark-300 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Example pitfalls */}
        <div className="mt-20">
          <h3 className="text-center text-2xl font-bold text-white mb-10 font-mono">
            Recent Pitfalls We&apos;ve Documented
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { tag: 'Web Scraping', pitfall: 'realtor.ca, zolo.ca, rew.ca — all blocked by Incapsula/Cloudflare from server IPs', saved: '$50+' },
              { tag: 'Trading', pitfall: '0DTE options buying: tested 1,944 parameter combos — 100% lost money. Mathematically unviable.', saved: '$200+' },
              { tag: 'Trading', pitfall: 'Oversold = Buy? Tested 27 strategies on TSLA. Almost ALL lost money. Oversold = Short is correct.', saved: '$150+' },
              { tag: 'API', pitfall: 'HouseSigma API endpoints return 404 — no public API despite having internal ones', saved: '$30+' },
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-xl p-6 flex gap-4">
                <div className="text-2xl">⚠️</div>
                <div>
                  <span className="inline-block text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-2 py-0.5 mb-2">{item.tag}</span>
                  <p className="text-sm text-dark-200">{item.pitfall}</p>
                  <p className="mt-2 text-xs text-brand-400 font-mono">Saved you: {item.saved} in tokens</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
