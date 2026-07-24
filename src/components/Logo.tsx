export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow">
        <span className="text-sm font-bold text-ink-950">MI</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-semibold tracking-tight text-white">
          M.I Tech
          <span className="text-brand-400"> NG</span>
        </span>
        <span className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-muted-soft">
          AI &amp; Automation
        </span>
      </span>
    </span>
  );
}
