export default function Waitlist() {
  return (
    <section id="waitlist" className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Join the Waitlist
        </h2>
        <p className="mt-4 text-lg text-dark-300">
          Be the first to access our AI pitfall database and token optimization toolkit. Free early access for waitlist members.
        </p>

        <form
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder:text-dark-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            required
          />
          <button
            type="submit"
            className="rounded-xl bg-brand-600 px-6 py-3.5 font-semibold text-white transition-all hover:bg-brand-500 active:scale-[0.98]"
          >
            Get Early Access
          </button>
        </form>

        <p className="mt-4 text-sm text-dark-400">
          No spam. Unsubscribe anytime. We respect your inbox (and your tokens).
        </p>
      </div>
    </section>
  );
}
