"use client";

import * as React from "react";

/**
 * TestimonialsSection — attributed customer quotes with an aggregate rating.
 *
 * Self-contained: no icon package, no external images (avatars render as
 * initials), no webfont request. Colours live in scoped CSS variables that
 * mirror HeroSection and PricingSection, so the three read as one system.
 */

export type Testimonial = {
  id: string;
  /** The quote itself, without surrounding quotation marks. */
  quote: string;
  name: string;
  /** Role and company, e.g. "Head of Design, Northwind". */
  role: string;
  /** 0–5. Set to 0 to hide the stars on this card. */
  rating?: number;
  /** Shows a "Verified" chip — use only where the purchase really is verified. */
  verified?: boolean;
  /** Any CSS colour for the initials avatar. Falls back to a palette entry. */
  avatarColor?: string;
};

export interface TestimonialsSectionProps extends React.HTMLAttributes<HTMLElement> {
  heading?: string;
  description?: string;
  /** Three to five reads best; more than six dilutes the section. */
  testimonials?: Testimonial[];
  /** Aggregate score, e.g. 4.8. Set to null to hide the summary. */
  aggregateScore?: number | null;
  /** Number behind the aggregate score. */
  aggregateCount?: number;
  /** Label after the count, e.g. "reviews". */
  aggregateNoun?: string;
}

const FALLBACK_AVATAR_COLORS = ["#1E3A5F", "#2563EB", "#A16207", "#0F766E", "#7C3AED"];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "We replaced three tools with this in a single afternoon. The part I did not expect was how quickly the rest of the team picked it up — no training session, no internal docs.",
    name: "Amara Okafor",
    role: "Head of Design, Northwind",
    rating: 5,
    verified: true,
  },
  {
    id: "2",
    quote:
      "Support answered a schema question at 11pm on a Sunday with an actual fix, not a link to the docs. That is the whole review.",
    name: "Tomás Ferreira",
    role: "Staff Engineer, Lumen Labs",
    rating: 5,
    verified: true,
  },
  {
    id: "3",
    quote:
      "Migration was the thing I was dreading. It took two days instead of the quarter we had budgeted, and nothing broke on the way over.",
    name: "Priya Raman",
    role: "VP Engineering, Cadence",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "Our reporting used to take a full day each month. It is now a scheduled job nobody thinks about, which is the highest praise I can give a tool.",
    name: "Jonas Weber",
    role: "Finance Lead, Arbor",
    rating: 4,
    verified: true,
  },
  {
    id: "5",
    quote:
      "The API is boring in the best way. Predictable pagination, honest error messages, and it has not broken under us once in eighteen months.",
    name: "Mei-Ling Chen",
    role: "Platform Engineer, Sundial",
    rating: 5,
  },
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* -------------------------------------------------------------------------- */

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="m10 1.8 2.47 5.16 5.53.75-4.02 3.9.98 5.62L10 14.55l-4.96 2.68.98-5.62L2 7.71l5.53-.75L10 1.8Z" />
    </svg>
  );
}

function BadgeCheckIcon(props: React.SVGProps<SVGSVGElement>) {
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

const STAR_ROW = "flex items-center gap-0.5";

/**
 * Stars renders a fractional fill rather than rounding, so an aggregate of 4.6
 * does not display as five full stars. The filled row is clipped to the exact
 * ratio; because the gap is small relative to the glyph, the clip lands within
 * a pixel of a whole-star boundary for integer ratings.
 */
function Stars({ rating, label }: { rating: number; label: string }) {
  const ratio = Math.max(0, Math.min(5, rating)) / 5;
  const row = Array.from({ length: 5 }, (_, i) => (
    <StarIcon key={i} className="h-4 w-4 shrink-0" />
  ));

  return (
    <span className="relative inline-flex shrink-0" role="img" aria-label={label}>
      <span className={`${STAR_ROW} text-[color:var(--tst-star-empty)]`}>{row}</span>
      <span
        aria-hidden="true"
        className={`${STAR_ROW} absolute inset-y-0 left-0 overflow-hidden text-[color:var(--tst-star-fg)]`}
        style={{ width: `${ratio * 100}%` }}
      >
        {row}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */

export function TestimonialsSection({
  heading = "Teams don't switch back",
  description = "A sample of what customers say once they've been running on us for a while.",
  testimonials = DEFAULT_TESTIMONIALS,
  aggregateScore = 4.8,
  aggregateCount = 1284,
  aggregateNoun = "verified reviews",
  className = "",
  ...rest
}: TestimonialsSectionProps) {
  const headingId = React.useId();

  return (
    <section
      aria-labelledby={headingId}
      className={`tst-root w-full bg-[color:var(--tst-bg)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 ${className}`}
      {...rest}
    >
      <style>{css}</style>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <h2
          id={headingId}
          className="text-balance text-center font-[family-name:var(--tst-font-display)] text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-[color:var(--tst-fg)] sm:text-4xl lg:text-5xl"
        >
          {heading}
        </h2>

        {description ? (
          <p className="mt-4 max-w-[60ch] text-pretty text-center text-base leading-relaxed text-[color:var(--tst-muted-fg)] sm:text-lg">
            {description}
          </p>
        ) : null}

        {aggregateScore !== null ? (
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span className="font-[family-name:var(--tst-font-display)] text-3xl font-bold tabular-nums text-[color:var(--tst-fg)]">
              {aggregateScore.toFixed(1)}
            </span>
            <Stars
              rating={aggregateScore}
              label={`Average rating ${aggregateScore.toFixed(1)} out of 5`}
            />
            <span className="text-sm text-[color:var(--tst-muted-fg)]">
              <span className="tabular-nums">{aggregateCount.toLocaleString()}</span>{" "}
              {aggregateNoun}
            </span>
          </div>
        ) : null}

        <div className="mt-12 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  const color =
    t.avatarColor ??
    FALLBACK_AVATAR_COLORS[
      // Stable per id, so colours don't reshuffle between renders.
      Math.abs(hash(t.id)) % FALLBACK_AVATAR_COLORS.length
    ];

  return (
    // figure/blockquote/figcaption is the semantic structure for an attributed
    // quote — it ties the attribution to the quotation for assistive tech.
    <figure className="flex h-full flex-col rounded-2xl border border-[color:var(--tst-border)] bg-[color:var(--tst-surface)] p-6">
      {/* min-height keeps the quote's start aligned across cards whether or not
          the Verified chip is present — the chip is 2px taller than the stars. */}
      <div className="flex min-h-[22px] items-center justify-between gap-3">
        {t.rating ? <Stars rating={t.rating} label={`Rated ${t.rating} out of 5`} /> : <span />}
        {t.verified ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--tst-verified-bg)] px-2 py-0.5 text-[11px] font-semibold text-[color:var(--tst-verified-fg)]">
            <BadgeCheckIcon className="h-2.5 w-2.5" />
            Verified
          </span>
        ) : null}
      </div>

      {/* Not italic: the pattern guidance suggests it, but long italic runs
          measurably hurt readability, so weight and colour carry the emphasis. */}
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[color:var(--tst-quote-fg)]">
        {t.quote}
      </blockquote>

      <figcaption className="mt-5 flex items-center gap-3 border-t border-[color:var(--tst-border)] pt-4">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold tracking-tight text-white"
          style={{ backgroundColor: color }}
        >
          {initials(t.name)}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold text-[color:var(--tst-fg)]">
            {t.name}
          </span>
          <span className="truncate text-sm text-[color:var(--tst-role-fg)]">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Small deterministic string hash, so avatar colours are stable across renders. */
function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h << 5) - h + value.charCodeAt(i);
    h |= 0;
  }
  return h;
}

/* -------------------------------------------------------------------------- */

const themeLight = `
  --tst-font-display: "Outfit", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;

  --tst-bg: #F8FAFC;
  --tst-fg: #0F172A;
  --tst-muted-fg: #475569;
  --tst-quote-fg: #334155;
  --tst-role-fg: #64748B;
  --tst-surface: #FFFFFF;
  --tst-border: #DFE6EF;

  --tst-star-fg: #A16207;
  --tst-star-empty: #CBD5E1;

  --tst-verified-bg: #DCFCE7;
  --tst-verified-fg: #166534;
`;

const themeDark = `
  --tst-bg: #0B1220;
  --tst-fg: #E8EEF7;
  --tst-muted-fg: #A9B6CC;
  --tst-quote-fg: #CBD8EA;
  --tst-role-fg: #94A6C2;
  --tst-surface: #131C2E;
  --tst-border: #222E45;

  --tst-star-fg: #F5C445;
  --tst-star-empty: #38455E;

  --tst-verified-bg: #123524;
  --tst-verified-fg: #86EFAC;
`;

const css = `
.tst-root { ${themeLight} }

@media (prefers-color-scheme: dark) {
  .tst-root:not(.light .tst-root) { ${themeDark} }
}

.dark .tst-root { ${themeDark} }
`;

export default TestimonialsSection;
