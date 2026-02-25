const useCases = [
  {
    icon: "🏠",
    title: "Find Your Dream Home",
    problem: "Spending hours scrolling through hundreds of listings on Zillow and Realtor.ca?",
    solution: "Tell AI your criteria once — budget, location, schools, commute time — and it monitors listings 24/7, alerting you the moment a match appears.",
    tools: ["ChatGPT", "Custom Alerts", "Zapier"],
    difficulty: "Easy",
    timeToSetup: "30 min",
  },
  {
    icon: "✈️",
    title: "Plan the Perfect Trip",
    problem: "Planning a vacation takes days of research — flights, hotels, restaurants, itineraries...",
    solution: "Give AI your destination, dates, budget, and interests. Get a complete day-by-day itinerary with booking links, local tips, and backup plans for bad weather.",
    tools: ["ChatGPT", "Google Maps", "Perplexity"],
    difficulty: "Easy",
    timeToSetup: "15 min",
  },
  {
    icon: "⏰",
    title: "24/7 Personal Reminder",
    problem: "Forgot to pay a bill? Missed a medication? Lost track of your kid's school events?",
    solution: "Set up an AI assistant that tracks everything — medications, bills, appointments, birthdays — and sends you reminders via text, email, or voice call.",
    tools: ["Custom Bot", "Twilio", "Google Calendar"],
    difficulty: "Medium",
    timeToSetup: "1 hour",
  },
  {
    icon: "🍕",
    title: "Find the Best Restaurant",
    problem: "\"Where should we eat?\" — the eternal question that wastes 30 minutes every time.",
    solution: "AI considers your cuisine preference, budget, dietary needs, reviews, distance, and even current wait times to give you the perfect pick in seconds.",
    tools: ["ChatGPT", "Yelp API", "Google Maps"],
    difficulty: "Easy",
    timeToSetup: "10 min",
  },
  {
    icon: "💰",
    title: "Save Money Automatically",
    problem: "Overpaying for subscriptions you forgot about? Missing cashback and coupons?",
    solution: "AI scans your expenses, finds subscriptions to cancel, tracks price drops, applies coupon codes, and negotiates bills on your behalf.",
    tools: ["Trim", "Honey", "ChatGPT"],
    difficulty: "Easy",
    timeToSetup: "20 min",
  },
  {
    icon: "📄",
    title: "Write Emails & Documents",
    problem: "Staring at a blank email for 20 minutes trying to sound professional?",
    solution: "Tell AI the context and tone. Get a polished email, cover letter, complaint letter, or any document in seconds. Edit and send.",
    tools: ["ChatGPT", "Claude", "Grammarly"],
    difficulty: "Easy",
    timeToSetup: "5 min",
  },
  {
    icon: "📚",
    title: "Help Kids with Homework",
    problem: "Your kid asks for help with math and you haven't touched algebra in 20 years?",
    solution: "AI explains concepts step-by-step at the right level, creates practice problems, and even makes learning fun with games and stories.",
    tools: ["ChatGPT", "Khan Academy", "Photomath"],
    difficulty: "Easy",
    timeToSetup: "5 min",
  },
  {
    icon: "🏋️",
    title: "Personal Fitness Coach",
    problem: "Can't afford a personal trainer? Generic workout plans don't fit your schedule?",
    solution: "AI creates a custom workout and meal plan based on your goals, equipment, schedule, and dietary restrictions. Adjusts weekly based on your progress.",
    tools: ["ChatGPT", "MyFitnessPal", "Hevy"],
    difficulty: "Easy",
    timeToSetup: "15 min",
  },
];

const difficultyColors: Record<string, string> = {
  Easy: "text-brand-400 bg-brand-500/10",
  Medium: "text-yellow-400 bg-yellow-500/10",
  Hard: "text-red-400 bg-red-500/10",
};

export default function UseCases() {
  return (
    <section id="usecases" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-medium font-mono text-brand-400 bg-brand-500/10 rounded-full px-3 py-1 mb-4">
            For Everyone
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl font-mono">
            <span className="gradient-text">AI Can Do This</span>
            <span className="text-white/90"> For You</span>
          </h2>
          <p className="mt-4 text-lg text-dark-300 max-w-2xl mx-auto">
            You don&apos;t need to be a programmer. These are real things AI can help with today — set up in minutes, not months.
          </p>
        </div>

        {/* Use Case Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="glass-card group rounded-xl p-6 transition-all hover:bg-white/[0.06] hover:border-brand-500/20"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0 mt-1">{uc.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white font-mono leading-tight">
                      {uc.title}
                    </h3>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-sm text-red-400/70 mb-1.5">
                      <span className="font-mono text-xs text-red-400/50">PROBLEM:</span> {uc.problem}
                    </p>
                    <p className="text-sm text-brand-300/70">
                      <span className="font-mono text-xs text-brand-400/50">AI SOLUTION:</span> {uc.solution}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-mono rounded-full px-2 py-0.5 ${difficultyColors[uc.difficulty]}`}>
                      {uc.difficulty}
                    </span>
                    <span className="text-[10px] font-mono text-dark-500">
                      ⏱ {uc.timeToSetup} setup
                    </span>
                    <div className="flex gap-1">
                      {uc.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[10px] font-mono text-dark-500 bg-dark-800 rounded-full px-1.5 py-0.5"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 glass-card rounded-2xl p-8 text-center border border-brand-500/20">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold text-white font-mono mb-2">
            Step-by-Step Tutorials Coming Soon
          </h3>
          <p className="text-dark-300 text-sm max-w-lg mx-auto mb-6">
            We&apos;re building detailed guides for each use case — with screenshots, tool recommendations, and copy-paste templates. Zero tech skills required.
          </p>
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition-all hover:bg-brand-500 active:scale-[0.98]"
          >
            Get Notified When Ready
          </a>
        </div>
      </div>
    </section>
  );
}
