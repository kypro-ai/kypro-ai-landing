import Link from "next/link";

const tiers = [
  {
    name: 'Per Gadget',
    price: '$2.99-7.99',
    period: '/each',
    description: 'Pay only for what you need',
    features: [
      'Full playbook + code examples',
      'Step-by-step fix guide',
      'Technical gotchas & workarounds',
      'API key for programmatic access',
      'One-time purchase, forever access',
    ],
    cta: 'Browse Gadgets',
    href: '/gadgets',
    highlight: false,
  },
  {
    name: 'Trading Signals',
    price: '$2.99-4.99',
    period: '/mo each',
    description: '43 AI-powered trading strategies',
    features: [
      'Full methodology & backtest data',
      'Daily signal updates',
      'Entry/exit rules & position sizing',
      'API access for agents',
      'Cancel anytime',
    ],
    cta: 'Browse Signals',
    href: '/signals',
    highlight: true,
  },
  {
    name: 'AI Setup Services',
    price: 'From $29',
    period: '',
    description: 'We set it up, you sit back',
    features: [
      'Full AI assistant setup',
      'Custom skill development',
      'Device & node connection',
      'Trading signal configuration',
      'Done-for-you, not DIY',
    ],
    cta: 'View Services',
    href: '/services',
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
            20 gadget playbooks · 43 trading signals · AI setup services. Skip the trial-and-error.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

              <Link
                href={tier.href}
                className={`mt-8 w-full rounded-xl py-3 text-sm font-semibold font-mono transition-all active:scale-[0.98] block text-center ${
                  tier.highlight
                    ? 'bg-brand-600 text-white hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/20'
                    : 'bg-emerald-500/5 border border-emerald-500/20 text-white/80 hover:bg-emerald-500/10 hover:text-white hover:border-emerald-500/40'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
