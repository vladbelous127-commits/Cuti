/**
 * Visual placeholders used until real photography / assets are supplied.
 * They keep the layout premium and intentional rather than showing broken
 * image icons. Swap these for <Image /> once real assets are available.
 */

export function PhotoPlaceholder({
  label,
  className = "",
  ratio = "aspect-[4/5]",
}: {
  label?: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 ${ratio} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-ink-800 via-ink-850 to-ink-950" />
      <div className="absolute inset-0 bg-grid-faint [background-size:32px_32px] opacity-30" />
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
      {label && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-soft">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

export function AvatarPlaceholder({
  initials,
  className = "",
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700/40 via-ink-850 to-ink-950" />
      <div className="absolute inset-0 bg-grid-faint [background-size:36px_36px] opacity-25" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="bg-gradient-to-br from-brand-200 to-gold bg-clip-text text-6xl font-bold text-transparent md:text-7xl">
          {initials}
        </span>
      </div>
    </div>
  );
}
