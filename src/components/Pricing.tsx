const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Get a taste of what we test',
    features: [
      '1 pitfall report per week',
      'Monthly "What Failed" digest',
      'Community Discord access',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Basic',
    price: '$19',
    period: '/mo',
    description: 'For AI hobbyists who want to save',
    features: [
      'Full pitfall database (13 and growing)',
      'Prompt optimization templates',
      'Weekly "What Works" report',
      'Token savings calculator',
    ],
    cta: 'Start Saving',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/mo',
    description: 'For builders shipping AI products',
    features: [
      'Everything in Basic',
      'API compatibility database',
      'Workflow optimization guides',
      'Priority new pitfall alerts',
      'Token cost benchmarks by model',
    ],
    cta: 'Go Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: '/mo',
    description: 'For teams burning serious tokens',
    features: [
      'Everything in Pro',
      'Custom pitfall testing on demand',
      'Dedicated token audit for your stack',
      'Private Slack channel',
      'API access to our database',
    ],
    cta: 'Contact Us',
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl font-mono">
            Invest Cents, Save Dollars
          </h2>
          <p className="mt-4 text-lg text-dark-300 max-w-xl mx-auto">
            One subscription saves you hundreds in wasted AI tokens every month.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`glass-card relative rounded-2xl p-8 transition-all hover:scale-[1.02] ${
                tier.highlight
                  ? 'border-brand-500/50 ring-1 ring-brand-500/20 glow-hover'
                  : ''
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold font-mono text-white shadow-lg shadow-brand-600/30">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-white font-mono">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold font-mono text-brand-400">{tier.price}</span>
                {tier.period && (
                  <span className="text-dark-400">{tier.period}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-dark-400">{tier.description}</p>

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-dark-200"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold font-mono transition-all active:scale-[0.98] ${
                  tier.highlight
                    ? 'bg-brand-600 text-white hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/20'
                    : 'bg-emerald-500/5 border border-emerald-500/20 text-white/80 hover:bg-emerald-500/10 hover:text-white hover:border-emerald-500/40'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
