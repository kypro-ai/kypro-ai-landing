export default function Disclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs text-amber-400/70 font-mono leading-relaxed">
        ⚠️ All trading signals are AI-generated and for informational purposes
        only. Not financial advice. Past performance ≠ future results. Trade at
        your own risk.
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.06] px-6 py-5">
      <p className="text-sm text-amber-300 leading-relaxed font-mono">
        <span className="font-bold text-amber-400">⚠️ DISCLAIMER:</span> All
        trading signals are AI-generated and for informational purposes only.
        This is <strong className="text-amber-200">NOT financial advice</strong>
        . Past performance does not guarantee future results. Trade at your own
        risk. TokenSpy is not a registered investment advisor.
      </p>
    </div>
  );
}
