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
    tags: ["Research", "Side Hustle", "AI Money"],
    link: "/blog/ai-money-methods-what-actually-works",
  },
  {
    status: "completed",
    title: "TSLA Day Trade Short Strategy",
    desc: "Built and backtested intraday short-selling strategy with MA5 filter. 78.5% win rate over 10 years, $251K profit.",
    result: "✅ Strategy Validated",
    resultColor: "text-brand-400",
    tokens: "$1,200+",
    duration: "5 days",
    tags: ["Trading", "Backtesting", "TSLA"],
  },
  {
    status: "completed",
    title: "Real Estate Data Scraping",
    desc: "Attempted to scrape realtor.ca, zolo.ca, housesigma.com, rew.ca for property data. All blocked by Cloudflare/Incapsula.",
    result: "❌ All Sites Blocked",
    resultColor: "text-red-400",
    tokens: "$150+",
    duration: "1 day",
    tags: ["Web Scraping", "Real Estate", "Anti-Bot"],
  },
  {
    status: "completed",
    title: "AI Content Farm Viability",
    desc: "Tested mass AI-generated blog content strategy. Google HCU update detection rate and potential penalties analyzed.",
    result: "⚠️ High Risk",
    resultColor: "text-yellow-400",
    tokens: "$300+",
    duration: "2 days",
    tags: ["SEO", "Content", "Google"],
  },
  {
    status: "in-progress",
    title: "Weekly Credit Spread Strategy",
    desc: "Testing 5DTE credit spread strategies on TSLA with real Polygon.io options data. Initial results: only +3.5% over 2 years.",
    result: "🔄 In Progress",
    resultColor: "text-blue-400",
    tokens: "$600+",
    duration: "Ongoing",
    tags: ["Trading", "Options", "Credit Spread"],
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
            { value: "$5,450+", label: "Total Tokens Burned" },
            { value: "67%", label: "Failure Rate" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
              <div className="text-xs text-dark-400 font-mono">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Project Cards */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.title}
              className="glass-card rounded-xl p-6 transition-all hover:bg-white/[0.06] hover:border-brand-500/15"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`inline-block text-[10px] font-mono font-medium rounded-full px-2 py-0.5 border ${statusStyles[project.status]}`}
                    >
                      {statusLabels[project.status]}
                    </span>
                    <div className="flex gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-dark-500 bg-dark-800 rounded-full px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono">
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
                <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
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

        {/* More Coming */}
        <div className="mt-8 text-center">
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
