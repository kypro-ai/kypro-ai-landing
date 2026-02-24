import MatrixRain from "./MatrixRain";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Matrix rain background */}
      <div className="absolute inset-0 -z-10">
        <MatrixRain />
      </div>

      {/* Radial glow overlays */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-emerald-600/15 blur-[128px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/8 blur-[96px]" />
      </div>

      {/* Grid lines in green */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(52,211,153,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.2) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 -z-[5] bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-60" />

      <div className="mx-auto max-w-4xl text-center relative z-10">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-mono text-brand-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
          </span>
          🕵️ Undercover AI Intelligence — We Test So You Don&apos;t Get Burned
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
          <span className="gradient-text font-mono">TokenSpy</span>
          <br />
          <span className="text-white/90">Undercover AI Testing &amp; Pitfall Intelligence</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-lg leading-relaxed text-dark-300 sm:text-xl max-w-2xl mx-auto">
          We go undercover inside AI tools so you don&apos;t get burned. Real tests, real results, and a growing database of what works — and what&apos;s a waste of money.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#waitlist"
            className="group relative inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]"
          >
            Join Waitlist — It&apos;s Free
            <svg
              className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-8 py-4 text-lg font-semibold text-white/80 transition-all hover:bg-emerald-500/10 hover:text-white hover:border-emerald-500/40 active:scale-[0.98]"
          >
            See What We&apos;ve Tested
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '$10K+', label: 'Spent Going Undercover' },
            { value: '200+', label: 'Pitfalls Exposed' },
            { value: '80%', label: 'Avg Token Savings' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold font-mono text-brand-400 sm:text-3xl">{stat.value}</div>
              <div className="mt-1 text-sm text-dark-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
