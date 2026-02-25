export default function ZeroDteOptionsContent() {
  return (
    <div className="prose-custom">
      <p className="text-lg text-dark-200 leading-relaxed">
        This is the story of how we tested <strong className="text-white">1,944 parameter
        combinations</strong> for 0DTE (zero days to expiration) options buying
        strategies using AI — and every single one lost money. Not most.
        Not 95%. <strong className="text-red-400">All of them.</strong>
      </p>

      <div className="my-10 glass-card rounded-2xl p-6 border-red-500/20 bg-red-500/5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🚨</span>
          <div>
            <h3 className="text-lg font-semibold text-red-300 font-mono">
              TL;DR — Don&apos;t Do This
            </h3>
            <p className="mt-1 text-dark-200">
              0DTE options <em>buying</em> is mathematically designed to lose
              money for the buyer. No amount of AI, backtesting, or parameter
              tuning can overcome the structural disadvantage. The house
              always wins.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 font-mono">
        The Setup
      </h2>

      <p className="text-dark-200 leading-relaxed">
        Like many people in 2025-2026, we got excited about the idea of using
        AI to trade options. The pitch sounds compelling: AI analyzes market
        data, finds patterns humans miss, and executes trades with machine
        precision. What could go wrong?
      </p>

      <p className="mt-4 text-dark-200 leading-relaxed">
        We were specifically interested in 0DTE options — options that expire
        the same day you buy them. They&apos;re cheap, they move fast, and
        they&apos;re incredibly popular on Reddit. &quot;Buy a $1 option, sell it
        for $5 an hour later&quot; — that&apos;s the dream.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 font-mono">
        What We Tested
      </h2>

      <p className="text-dark-200 leading-relaxed mb-6">
        We built an AI-powered backtesting system and ran it across a massive
        parameter space:
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {[
          { label: "Underlying Assets", value: "SPY, QQQ, TSLA" },
          { label: "Strategy Types", value: "Momentum, Mean Reversion, Breakout, RSI, MACD, Bollinger" },
          { label: "Entry Timing Windows", value: "Market open, Mid-day, Power hour, All-day" },
          { label: "Strike Selection", value: "ATM, 1-5 strikes OTM, dynamic delta-based" },
          { label: "Position Sizing", value: "Fixed $, Kelly Criterion, volatility-scaled" },
          { label: "Stop-Loss / Take-Profit", value: "Dozens of ratio combinations" },
        ].map((param) => (
          <div key={param.label} className="glass-card rounded-xl p-4">
            <div className="text-sm font-medium font-mono text-brand-400">{param.label}</div>
            <div className="mt-1 text-sm text-dark-200">{param.value}</div>
          </div>
        ))}
      </div>

      <p className="text-dark-200 leading-relaxed">
        Total unique combinations tested:{" "}
        <strong className="text-brand-400 text-2xl font-mono">1,944</strong>
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 font-mono">
        The Results
      </h2>

      <div className="glass-card rounded-2xl p-8 my-8">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold font-mono text-red-400">1,944</div>
            <div className="mt-1 text-sm text-dark-400">Strategies Tested</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-mono text-red-400">0</div>
            <div className="mt-1 text-sm text-dark-400">Profitable Strategies</div>
          </div>
          <div>
            <div className="text-3xl font-bold font-mono text-red-400">100%</div>
            <div className="mt-1 text-sm text-dark-400">Loss Rate</div>
          </div>
        </div>
      </div>

      <p className="text-dark-200 leading-relaxed">
        You read that right. Across 1,944 different parameter combinations,
        not a single strategy produced consistent profits. The &quot;best&quot;
        strategies merely lost money more slowly.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 font-mono">
        Why It&apos;s Mathematically Impossible
      </h2>

      <div className="space-y-6">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2 font-mono">
            1. Theta Decay is a Buzz Saw
          </h3>
          <p className="text-dark-300">
            0DTE options lose value every second. On expiration day, theta
            decay accelerates exponentially. You&apos;re fighting a clock that&apos;s
            specifically designed to eat your premium. The option market
            maker has priced this in — you&apos;re paying for time you don&apos;t have.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2 font-mono">
            2. The Spread Kills You
          </h3>
          <p className="text-dark-300">
            Bid-ask spreads on 0DTE options are wide — often 10-30% of the
            option price. That means you lose 10-30% the moment you enter the
            trade. You need the stock to move significantly just to break even.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2 font-mono">
            3. Volatility is Already Priced In
          </h3>
          <p className="text-dark-300">
            Market makers use sophisticated models to price options. Any
            &quot;edge&quot; your AI finds in historical data is already reflected in
            the option price. You&apos;re not competing against retail traders —
            you&apos;re competing against billion-dollar market-making firms with
            better data, faster execution, and PhD-level models.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2 font-mono">
            4. Survivorship Bias in &quot;Success&quot; Stories
          </h3>
          <p className="text-dark-300">
            For every Reddit post showing a 500% gain on a 0DTE trade,
            there are hundreds of silent losers who blew up their accounts.
            The person who posts their $100→$500 win doesn&apos;t post the
            next 20 trades where they lost $100 each.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 font-mono">
        What About &quot;Oversold = Buy&quot;?
      </h2>

      <p className="text-dark-200 leading-relaxed">
        We also tested a popular related theory: that when a stock is
        &quot;oversold&quot; (RSI below 30, etc.), you should buy. We tested{" "}
        <strong className="text-white">27 variations of this strategy on TSLA</strong>.
      </p>

      <p className="mt-4 text-dark-200 leading-relaxed">
        Result? <strong className="text-white">Almost ALL lost money.</strong>{" "}
        The counterintuitive finding: &quot;Oversold = Short&quot; actually performed
        better. When a stock is getting hammered, it tends to keep getting
        hammered in the short term. Mean reversion takes longer than your
        options expiry.
      </p>

      <h2 className="text-2xl font-bold text-white mt-12 mb-6 font-mono">
        The Lesson
      </h2>

      <div className="glass-card rounded-2xl p-8 border-brand-500/20">
        <p className="text-lg text-dark-200 leading-relaxed">
          <strong className="text-white">AI doesn&apos;t create alpha where none exists.</strong>{" "}
          If the underlying math is against you, no amount of machine
          learning, parameter tuning, or backtesting will save you. AI is
          incredibly powerful for many things — but it can&apos;t turn a
          negative-expected-value game into a positive one.
        </p>
        <p className="mt-4 text-dark-200 leading-relaxed">
          We burned real money learning this so you don&apos;t have to. That&apos;s
          what TokenSpy is about — testing things with real stakes and
          sharing the honest results.
        </p>
      </div>

      <div className="mt-10 text-center">
        <a
          href="/#pricing"
          className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/20 active:scale-[0.98]"
        >
          Get Trading Signals — $4.99/mo
        </a>
      </div>
    </div>
  );
}
