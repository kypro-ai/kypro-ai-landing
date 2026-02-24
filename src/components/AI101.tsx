const lessons = [
  {
    number: "01",
    title: "What Is AI, Really?",
    subtitle: "Beyond the Buzzwords",
    desc: "Strip away the hype. Understand what AI actually does, what it can't do, and why 90% of \"AI products\" are just fancy wrappers around the same 3 APIs.",
    icon: "🧠",
    tag: "Fundamentals",
  },
  {
    number: "02",
    title: "Tokens, Models & Costs",
    subtitle: "The Hidden Economics",
    desc: "GPT-4, Claude, Gemini — what's the difference? Learn how tokens work, why costs spiral out of control, and how to cut your AI spending by 80%.",
    icon: "💰",
    tag: "Economics",
  },
  {
    number: "03",
    title: "Prompt Engineering: Dead or Alive?",
    subtitle: "What Actually Works in 2026",
    desc: "The truth about prompt engineering as a career, which techniques still matter, and why the best prompt is often the simplest one.",
    icon: "⚡",
    tag: "Skills",
  },
  {
    number: "04",
    title: "AI Tools That Actually Deliver",
    subtitle: "Tested & Verified",
    desc: "We spent thousands testing AI tools so you don't have to. Our honest tier list: what's worth paying for, what's free, and what's a scam.",
    icon: "🔧",
    tag: "Tools",
  },
  {
    number: "05",
    title: "Building Your First AI Workflow",
    subtitle: "From Zero to Automated",
    desc: "Step-by-step: connect APIs, automate repetitive tasks, and build something that actually saves you time. No coding PhD required.",
    icon: "🔄",
    tag: "Practical",
  },
  {
    number: "06",
    title: "Making Money with AI",
    subtitle: "The Honest Guide",
    desc: "15 methods tested with real money. 5 that work, 5 that don't, and 5 that will get you banned. Data-backed, hype-free.",
    icon: "📈",
    tag: "Income",
  },
];

export default function AI101() {
  return (
    <section id="ai101" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-3 py-1 mb-4">
            Education
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl font-mono">
            <span className="gradient-text">AI 101</span>
            <span className="text-white/90"> — Meet the Future</span>
          </h2>
          <p className="mt-4 text-lg text-dark-300 max-w-2xl mx-auto">
            No fluff. No jargon. Just what you need to know to use AI without burning money or getting scammed.
          </p>
        </div>

        {/* Lesson Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.number}
              className="glass-card group rounded-xl p-6 transition-all hover:bg-white/[0.06] hover:border-brand-500/20 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{lesson.icon}</span>
                <span className="font-mono text-2xl font-bold text-brand-500/30 group-hover:text-brand-500/60 transition-colors">
                  {lesson.number}
                </span>
              </div>
              <span className="inline-block text-[10px] font-mono font-medium text-brand-400 bg-brand-500/10 rounded-full px-2 py-0.5 mb-2">
                {lesson.tag}
              </span>
              <h3 className="text-lg font-bold text-white font-mono leading-tight">
                {lesson.title}
              </h3>
              <p className="text-sm text-brand-300/70 font-mono mb-2">
                {lesson.subtitle}
              </p>
              <p className="text-sm text-dark-400 leading-relaxed">
                {lesson.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Coming Soon Banner */}
        <div className="mt-12 glass-card rounded-2xl p-8 text-center border border-brand-500/20">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold text-white font-mono mb-2">
            Full Course Coming Soon
          </h3>
          <p className="text-dark-300 text-sm max-w-lg mx-auto mb-6">
            We&apos;re building the most practical AI course on the internet — no theory dumps, just real skills tested with real money. Join the waitlist to get early access.
          </p>
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition-all hover:bg-brand-500 active:scale-[0.98]"
          >
            Get Early Access — Free
          </a>
        </div>
      </div>
    </section>
  );
}
