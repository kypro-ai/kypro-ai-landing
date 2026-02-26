const projects = [
  {
    status: "completed",
    title: "0DTE Options AI Trading",
    desc: "Tested 1,944 parameter combinations for AI-powered 0DTE options buying strategies on TSLA. Every single one lost money.",
    result: "❌ Proven Unviable",
    resultColor: "text-red-400",
    tokens: "$2,400+",
    duration: "3 days",
    tags: ["Trading", "Options", "TSLA"],
    locked: false,
    link: "/blog/0dte-options-ai-guaranteed-loss",
  },
  {
    status: "completed",
    title: "AI Money-Making Methods Research",
    desc: "Analyzed 15 popular 'make money with AI' methods from 6+ sources including Reddit. Found 5 winners and 5 traps.",
    result: "✅ Report Published",
    resultColor: "text-brand-400",
    tokens: "$800+",
    duration: "1 week",
    tags: ["Research", "Side Hustle"],
    locked: false,
    link: "/blog/ai-money-methods-what-actually-works",
  },
  {
    status: "completed",
    title: "TSLA Intraday Short Strategy",
    desc: "Built and backtested intraday short-selling strategy with MA5 filter. Tested across 10 years of data with 37+ filter combinations.",
    result: "✅ 78.5% Win Rate",
    resultColor: "text-brand-400",
    tokens: "$1,200+",
    duration: "5 days",
    tags: ["Trading", "Backtesting", "TSLA"],
    locked: true,
  },
  {
    status: "completed",
    title: "Momentum Breakout Swing Trade",
    desc: "20-day breakout + MACD + RSI filter strategy. Optimized through v9 iterations with 10 years of data.",
    result: "✅ CAGR 21.2%",
    resultColor: "text-brand-400",
    tokens: "$900+",
    duration: "4 days",
    tags: ["Trading", "Swing", "Momentum"],
    locked: true,
  },
  {
    status: "completed",
    title: "Triple-Top Short Strategy",
    desc: "Original strategy: 3 touches at resistance + VWAP + RSI + rejection candle → short. Tested 30+ filter combos.",
    result: "✅ PF 1.80, $77K/2yr",
    resultColor: "text-brand-400",
    tokens: "$700+",
    duration: "3 days",
    tags: ["Trading", "Original", "Pattern"],
    locked: true,
  },
  {
    status: "completed",
    title: "Oversold Short vs Long",
    desc: "Tested both directions when TSLA is oversold. 28/30 short strategies profitable. Long strategies almost all lost money.",
    result: "✅ Short Wins, Long Fails",
    resultColor: "text-brand-400",
    tokens: "$500+",
    duration: "2 days",
    tags: ["Trading", "Contrarian", "TSLA"],
    locked: true,
  },
  {
    status: "completed",
    title: "Mean Reversion Swing Trade",
    desc: "RSI oversold → buy, RSI overbought → sell. Best result after optimization: only $7K over 10 years. TSLA doesn't mean-revert.",
    result: "❌ TSLA Not Suited",
    resultColor: "text-red-400",
    tokens: "$400+",
    duration: "2 days",
    tags: ["Trading", "Mean Reversion"],
    locked: false,
  },
  {
    status: "completed",
    title: "Weekly Credit Spread (5DTE)",
    desc: "Tested credit spread strategies with real Polygon.io options data. 2-year backtest with actual option prices.",
    result: "❌ Only +3.5%/2yr",
    resultColor: "text-red-400",
    tokens: "$600+",
    duration: "3 days",
    tags: ["Trading", "Options", "Spreads"],
    locked: true,
  },
  {
    status: "completed",
    title: "Real Estate Data Scraping",
    desc: "Attempted to scrape realtor.ca, zolo.ca, housesigma.com, rew.ca for property data. All blocked by anti-bot systems.",
    result: "❌ All Sites Blocked",
    resultColor: "text-red-400",
    tokens: "$150+",
    duration: "1 day",
    tags: ["Scraping", "Real Estate"],
    locked: false,
  },
  {
    status: "completed",
    title: "AI Content Farm Viability",
    desc: "Tested mass AI-generated blog content for SEO. Analyzed Google HCU update impact and detection patterns.",
    result: "⚠️ High Risk",
    resultColor: "text-yellow-400",
    tokens: "$300+",
    duration: "2 days",
    tags: ["SEO", "Content", "Google"],
    locked: false,
  },
  {
    status: "completed",
    title: "Polygon.io API Deep Review",
    desc: "Developer plan ($79/mo) for options data. Tested rate limits, data quality, historical coverage, and Canada availability.",
    result: "✅ Solid for Options",
    resultColor: "text-brand-400",
    tokens: "$200+",
    duration: "3 days",
    tags: ["API", "Data", "Review"],
    locked: false,
  },
  {
    status: "completed",
    title: "GPT-4 vs Claude vs Gemini: Coding",
    desc: "Compared all three models on real-world coding tasks: backtesting scripts, web scraping, API integration, data analysis.",
    result: "✅ Claude Wins Coding",
    resultColor: "text-brand-400",
    tokens: "$350+",
    duration: "2 days",
    tags: ["AI Tools", "Comparison"],
    locked: true,
  },
  {
    status: "in-progress",
    title: "Combo Strategy: Live Signals",
    desc: "Triple-top + oversold short combo. Built signal engine, backtested $93K-$147K/2yr. Now running paper trade validation.",
    result: "🔄 Paper Trading",
    resultColor: "text-blue-400",
    tokens: "$800+",
    duration: "Ongoing",
    tags: ["Trading", "Live", "Signals"],
    locked: true,
  },
  {
    status: "planned",
    title: "Moomoo OpenD API (Canada)",
    desc: "Automated trading via Moomoo's OpenD when it launches in Canada. Will test latency, reliability, and strategy execution.",
    result: "📋 Waiting for Launch",
    resultColor: "text-dark-400",
    tokens: "TBD",
    duration: "~1 month",
    tags: ["Trading", "Automation", "API"],
    locked: true,
  },
];

const statusStyles: Record<string, string> = {
  completed: "bg-brand-500/10 text-brand-400 border-brand-500/20",
  "in-progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  planned: "bg-dark-700/50 text-dark-400 border-dark-600/20",
};

const statusLabels: Record<string, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  planned: "Planned",
};

export default function Projects() {
  const completedCount = projects.filter((p) => p.status === "completed").length;
  const failCount = projects.filter((p) => p.result.includes("❌") || p.result.includes("⚠️")).length;
  const totalTokens = "$9,300+";

  return (
    <section id="projects" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-3 py-1 mb-4">
            Lab
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl font-mono">
            <span className="gradient-text">Project Lab</span>
            <span className="text-white/90"> — What We&apos;ve Tested</span>
          </h2>
          <p className="mt-4 text-lg text-dark-300 max-w-2xl mx-auto">
            Every project is a real experiment with real money. We document everything — the wins, the losses, and the exact cost.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { value: String(projects.length), label: "Projects Tested" },
            { value: totalTokens, label: "Total Tokens Burned" },
            { value: Math.round((failCount / completedCount) * 100) + "%", label: "Failure Rate" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
              <div className="text-xs text-dark-400 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Project Cards */}
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="glass-card rounded-xl p-5 transition-all hover:bg-white/[0.06] hover:border-brand-500/15"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`inline-block text-[10px] font-mono font-medium rounded-full px-2 py-0.5 border ${statusStyles[project.status]}`}
                    >
                      {statusLabels[project.status]}
                    </span>
                    {project.locked && (
                      <span className="text-[10px] font-mono text-yellow-500/70 bg-yellow-500/10 rounded-full px-2 py-0.5">
                        🔒 Members Only
                      </span>
                    )}
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-dark-500 bg-dark-800 rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-white font-mono">
                    {project.link ? (
                      <a href={project.link} className="hover:text-brand-400 transition-colors">
                        {project.title} →
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-dark-400">{project.desc}</p>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 shrink-0">
                  <span className={`text-sm font-mono font-bold ${project.resultColor}`}>
                    {project.result}
                  </span>
                  <div className="flex gap-3 text-xs text-dark-500 font-mono">
                    <span>🔥 {project.tokens}</span>
                    <span>⏱ {project.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Unlock CTA */}
        <div className="mt-10 glass-card rounded-2xl p-8 text-center border border-yellow-500/20 bg-yellow-500/5">
          <div className="text-3xl mb-3">🔓</div>
          <h3 className="text-xl font-bold text-white font-mono mb-2">
            Unlock Full Project Details
          </h3>
          <p className="text-dark-300 text-sm max-w-lg mx-auto mb-6">
            Members get access to complete data, code, parameters, and strategy details for all locked projects. Plus community discussion with other members.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition-all hover:bg-brand-500 active:scale-[0.98]"
          >
            Browse Gadgets — From $2.99
          </a>
        </div>

        {/* More Coming */}
        <div className="mt-6 text-center">
          <p className="text-sm text-dark-500 font-mono">
            New projects added weekly. Follow us on{" "}
            <a
              href="https://x.com/KyproAI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:underline"
            >
              𝕏
            </a>{" "}
            for real-time updates.
          </p>
        </div>
      </div>
    </section>
  );
}
