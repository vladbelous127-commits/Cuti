"use client";

import * as React from "react";

/**
 * HeroSection — a hero-centric landing page hero.
 *
 * Self-contained: no external icon or animation dependencies, and no webfont
 * requests. Colours live in scoped CSS variables so the component themes itself
 * in light and dark without needing entries in your Tailwind config.
 */

type Bullet = {
  /** Short benefit, ideally under ~40 characters. */
  label: string;
};

type Avatar = {
  /** Full name — initials are derived from it and used as the a11y label. */
  name: string;
  /** Any CSS colour. Falls back to a palette entry when omitted. */
  color?: string;
};

export interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Small pill above the headline. Omit to hide it. */
  eyebrow?: string;
  /** Optional href — renders the pill as a link when provided. */
  eyebrowHref?: string;
  /** Tag inside the pill. Pass null to show the text alone. */
  eyebrowBadge?: string | null;
  headline?: string;
  /** Rendered in the accent colour directly after the headline. */
  headlineAccent?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Maximum of three — more than that dilutes a single-CTA hero. */
  bullets?: Bullet[];
  avatars?: Avatar[];
  /** Social-proof line beside the avatar stack. */
  proofText?: string;
  /** 0–5, rendered as stars. Set to 0 to hide the rating. */
  rating?: number;
}

const FALLBACK_AVATAR_COLORS = ["#1E3A5F", "#2563EB", "#A16207", "#0F766E", "#7C3AED"];

const DEFAULT_BULLETS: Bullet[] = [
  { label: "No credit card required" },
  { label: "Set up in under 5 minutes" },
  { label: "Cancel anytime" },
];

const DEFAULT_AVATARS: Avatar[] = [
  { name: "Ada Lovelace" },
  { name: "Grace Hopper" },
  { name: "Alan Turing" },
  { name: "Katherine Johnson" },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* -------------------------------------------------------------------------- */
/* Icons — inlined so the component carries no icon-package dependency.        */
/* -------------------------------------------------------------------------- */

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.167 10h11.666M10.833 5l5 5-5 5" />
    </svg>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M7.25 4.66a.9.9 0 0 1 1.37-.77l6.4 4.34a.9.9 0 0 1 0 1.54l-6.4 4.34a.9.9 0 0 1-1.37-.77V4.66Z" />
    </svg>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="m4.5 10.5 3.5 3.5 7.5-8" />
    </svg>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="m10 1.8 2.47 5.16 5.53.75-4.02 3.9.98 5.62L10 14.55l-4.96 2.68.98-5.62L2 7.71l5.53-.75L10 1.8Z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

export function HeroSection({
  eyebrow = "Real-time collaboration is live",
  eyebrowHref,
  eyebrowBadge = "New",
  headline = "Ship your best work,",
  headlineAccent = "faster than ever.",
  description = "The all-in-one workspace where your team plans, builds, and launches together — without the busywork getting in the way.",
  primaryLabel = "Start building free",
  primaryHref = "#get-started",
  secondaryLabel = "Watch demo",
  secondaryHref = "#demo",
  bullets = DEFAULT_BULLETS,
  avatars = DEFAULT_AVATARS,
  proofText = "Trusted by 12,000+ teams",
  rating = 5,
  className = "",
  ...rest
}: HeroSectionProps) {
  const headingId = React.useId();
  const visibleBullets = bullets.slice(0, 3);
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <section
      aria-labelledby={headingId}
      className={`hero-root relative isolate flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-[color:var(--hero-bg)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 ${className}`}
      {...rest}
    >
      <style>{css}</style>

      {/* Decorative backdrop. aria-hidden so it is skipped by screen readers. */}
      <div aria-hidden="true" className="hero-backdrop pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {eyebrow ? (
          <EyebrowPill
            href={eyebrowHref}
            badge={eyebrowBadge}
            className="hero-enter"
            style={{ animationDelay: "0ms" }}
          >
            {eyebrow}
          </EyebrowPill>
        ) : null}

        <h1
          id={headingId}
          className="hero-enter mt-6 text-balance font-[family-name:var(--hero-font-display)] text-[2.25rem] font-bold leading-[1.1] tracking-[-0.02em] text-[color:var(--hero-fg)] sm:text-5xl lg:text-6xl"
          style={{ animationDelay: "60ms" }}
        >
          {headline}{" "}
          {headlineAccent ? (
            <span className="text-[color:var(--hero-accent-text)]">{headlineAccent}</span>
          ) : null}
        </h1>

        {description ? (
          <p
            className="hero-enter mt-5 max-w-[60ch] text-pretty text-base leading-relaxed text-[color:var(--hero-muted-fg)] sm:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            {description}
          </p>
        ) : null}

        {/* Actions. Only one primary CTA — the secondary stays visually subordinate. */}
        <div
          className="hero-enter mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
          style={{ animationDelay: "180ms" }}
        >
          <a
            href={primaryHref}
            className="hero-focus group inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[color:var(--hero-primary)] px-6 text-sm font-semibold text-[color:var(--hero-on-primary)] shadow-sm transition-[background-color,transform,box-shadow] duration-200 ease-out hover:bg-[color:var(--hero-primary-hover)] hover:shadow-md active:scale-[0.98] sm:text-base"
          >
            {primaryLabel}
            <ArrowRightIcon className="h-[18px] w-[18px] transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none" />
          </a>

          {secondaryLabel ? (
            <a
              href={secondaryHref}
              className="hero-focus inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl border border-[color:var(--hero-control-border)] bg-[color:var(--hero-surface)] px-6 text-sm font-semibold text-[color:var(--hero-fg)] transition-colors duration-200 ease-out hover:bg-[color:var(--hero-surface-hover)] active:scale-[0.98] sm:text-base"
            >
              <PlayIcon className="h-4 w-4 text-[color:var(--hero-accent-text)]" />
              {secondaryLabel}
            </a>
          ) : null}
        </div>

        {visibleBullets.length > 0 ? (
          <ul
            className="hero-enter mt-8 flex flex-col items-center gap-x-6 gap-y-2.5 sm:flex-row sm:flex-wrap sm:justify-center"
            style={{ animationDelay: "240ms" }}
          >
            {visibleBullets.map((bullet) => (
              <li
                key={bullet.label}
                className="flex items-center gap-2 text-sm text-[color:var(--hero-muted-fg)]"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--hero-check-bg)]">
                  <CheckIcon className="h-3 w-3 text-[color:var(--hero-check-fg)]" />
                </span>
                {bullet.label}
              </li>
            ))}
          </ul>
        ) : null}

        {(avatars.length > 0 || proofText) && (
          <div
            className="hero-enter mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
            style={{ animationDelay: "300ms" }}
          >
            {avatars.length > 0 ? <AvatarStack avatars={avatars} /> : null}

            <div className="flex flex-col items-center gap-1 sm:items-start">
              {roundedRating > 0 ? (
                <div
                  className="flex items-center gap-0.5"
                  role="img"
                  aria-label={`Rated ${roundedRating} out of 5`}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < roundedRating
                          ? "text-[color:var(--hero-accent-text)]"
                          : "text-[color:var(--hero-star-empty)]"
                      }`}
                    />
                  ))}
                </div>
              ) : null}
              {proofText ? (
                <p className="text-sm text-[color:var(--hero-muted-fg)]">{proofText}</p>
              ) : null}
            </div>
          </div>
        )}
      </div>

      {/* Product preview. aspect-ratio reserves the space, so no layout shift. */}
      <div
        className="hero-enter mt-16 w-full max-w-5xl"
        style={{ animationDelay: "360ms" }}
        aria-hidden="true"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[color:var(--hero-border)] bg-[color:var(--hero-surface)] shadow-xl sm:aspect-[16/9]">
          <div className="flex h-9 items-center gap-1.5 border-b border-[color:var(--hero-border)] bg-[color:var(--hero-surface-hover)] px-4">
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--hero-dot-1)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--hero-dot-2)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--hero-dot-3)]" />
          </div>
          <div className="grid h-[calc(100%-2.25rem)] grid-cols-1 gap-3 p-4 sm:grid-cols-[168px_1fr] sm:gap-4 sm:p-5">
            <div className="hidden flex-col gap-2 sm:flex">
              {[100, 72, 86, 64, 78].map((w, i) => (
                <div
                  key={i}
                  className="h-8 rounded-lg bg-[color:var(--hero-skeleton)]"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-24 rounded-xl bg-[color:var(--hero-skeleton-strong)] sm:h-28" />
              <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-[color:var(--hero-skeleton)]" />
                <div className="rounded-xl bg-[color:var(--hero-skeleton)]" />
                <div className="hidden rounded-xl bg-[color:var(--hero-skeleton)] sm:block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function EyebrowPill({
  href,
  badge,
  children,
  className = "",
  style,
}: {
  href?: string;
  badge?: string | null;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const shared = `inline-flex items-center gap-2 rounded-full border border-[color:var(--hero-border)] bg-[color:var(--hero-surface)] py-1.5 pr-3.5 text-xs font-medium text-[color:var(--hero-muted-fg)] sm:text-sm ${
    badge ? "pl-1.5" : "pl-3.5"
  }`;

  const content = (
    <>
      {badge ? (
        <span className="rounded-full bg-[color:var(--hero-accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[color:var(--hero-accent-on-soft)]">
          {badge}
        </span>
      ) : null}
      {children}
    </>
  );

  if (!href) {
    return (
      <span className={`${shared} ${className}`} style={style}>
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={`hero-focus group ${shared} min-h-[36px] cursor-pointer transition-colors duration-200 ease-out hover:bg-[color:var(--hero-surface-hover)] ${className}`}
      style={style}
    >
      {content}
      <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transform-none" />
    </a>
  );
}

function AvatarStack({ avatars }: { avatars: Avatar[] }) {
  return (
    // Overlap stays under ~20% so the initials are never clipped by the next avatar.
    <div className="flex -space-x-2">
      {avatars.slice(0, 5).map((avatar, i) => (
        <span
          key={avatar.name}
          title={avatar.name}
          className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold tracking-tight text-white ring-2 ring-[color:var(--hero-bg)]"
          style={{
            backgroundColor:
              avatar.color ?? FALLBACK_AVATAR_COLORS[i % FALLBACK_AVATAR_COLORS.length],
          }}
        >
          {initials(avatar.name)}
        </span>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Scoped theme + motion. Dark mode responds to `prefers-color-scheme` and to  */
/* a `.dark` class on any ancestor, so it works with next-themes and friends.  */
/* -------------------------------------------------------------------------- */

const css = `
.hero-root {
  --hero-font-display: "Outfit", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;

  --hero-bg: #F8FAFC;
  --hero-fg: #0F172A;
  --hero-muted-fg: #475569;
  --hero-surface: #FFFFFF;
  --hero-surface-hover: #EFF3F8;
  --hero-border: #DFE6EF;
  --hero-control-border: #7C8CA5;

  --hero-primary: #1E3A5F;
  --hero-primary-hover: #17304F;
  --hero-on-primary: #FFFFFF;

  --hero-accent-text: #A16207;
  --hero-accent-soft: #FDF0D5;
  --hero-accent-on-soft: #7C4A06;

  --hero-check-bg: #DCE7F3;
  --hero-check-fg: #1E3A5F;
  --hero-star-empty: #CBD5E1;

  --hero-glow-a: rgba(30, 58, 95, 0.13);
  --hero-glow-b: rgba(161, 98, 7, 0.10);
  --hero-grid-line: rgba(15, 23, 42, 0.055);

  --hero-skeleton: #EDF1F7;
  --hero-skeleton-strong: #DFE7F1;
  --hero-dot-1: #E4A8A8;
  --hero-dot-2: #E8CE9A;
  --hero-dot-3: #A9CDB0;
}

@media (prefers-color-scheme: dark) {
  .hero-root:not(.light .hero-root) {
    --hero-bg: #0B1220;
    --hero-fg: #E8EEF7;
    --hero-muted-fg: #A9B6CC;
    --hero-surface: #131C2E;
    --hero-surface-hover: #1A2438;
    --hero-border: #222E45;
    --hero-control-border: #5A6B8C;

    --hero-primary: #3B82F6;
    --hero-primary-hover: #2F72E0;
    --hero-on-primary: #06101F;

    --hero-accent-text: #F5C445;
    --hero-accent-soft: #3A2E0E;
    --hero-accent-on-soft: #F5C445;

    --hero-check-bg: #1B2C46;
    --hero-check-fg: #93B4E8;
    --hero-star-empty: #38455E;

    --hero-glow-a: rgba(59, 130, 246, 0.15);
    --hero-glow-b: rgba(245, 196, 69, 0.09);
    --hero-grid-line: rgba(232, 238, 247, 0.05);

    --hero-skeleton: #1A2436;
    --hero-skeleton-strong: #212D43;
    --hero-dot-1: #7A4A4A;
    --hero-dot-2: #7D6836;
    --hero-dot-3: #4C6B54;
  }
}

.dark .hero-root {
  --hero-bg: #0B1220;
  --hero-fg: #E8EEF7;
  --hero-muted-fg: #A9B6CC;
  --hero-surface: #131C2E;
  --hero-surface-hover: #1A2438;
  --hero-border: #222E45;
  --hero-control-border: #5A6B8C;

  --hero-primary: #3B82F6;
  --hero-primary-hover: #2F72E0;
  --hero-on-primary: #06101F;

  --hero-accent-text: #F5C445;
  --hero-accent-soft: #3A2E0E;
  --hero-accent-on-soft: #F5C445;

  --hero-check-bg: #1B2C46;
  --hero-check-fg: #93B4E8;
  --hero-star-empty: #38455E;

  --hero-glow-a: rgba(59, 130, 246, 0.15);
  --hero-glow-b: rgba(245, 196, 69, 0.09);
  --hero-grid-line: rgba(232, 238, 247, 0.05);

  --hero-skeleton: #1A2436;
  --hero-skeleton-strong: #212D43;
  --hero-dot-1: #7A4A4A;
  --hero-dot-2: #7D6836;
  --hero-dot-3: #4C6B54;
}

.hero-backdrop {
  background-image:
    radial-gradient(60% 50% at 50% 0%, var(--hero-glow-a) 0%, transparent 70%),
    radial-gradient(40% 35% at 85% 20%, var(--hero-glow-b) 0%, transparent 70%),
    linear-gradient(to right, var(--hero-grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--hero-grid-line) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 56px 56px, 56px 56px;
  -webkit-mask-image: radial-gradient(80% 60% at 50% 25%, #000 40%, transparent 100%);
  mask-image: radial-gradient(80% 60% at 50% 25%, #000 40%, transparent 100%);
}

.hero-focus:focus-visible {
  outline: 2px solid var(--hero-fg);
  outline-offset: 2px;
}

/* Entrance: transform + opacity only, so it never triggers layout. */
@keyframes hero-rise {
  from { opacity: 0; transform: translate3d(0, 14px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
}

.hero-enter {
  animation: hero-rise 480ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .hero-enter {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
`;

export default HeroSection;
