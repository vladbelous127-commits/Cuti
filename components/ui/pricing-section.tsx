"use client";

import * as React from "react";

/**
 * PricingSection — three-tier pricing with a monthly/annual billing toggle.
 *
 * Self-contained: no external icon or animation dependencies. Colours live in
 * scoped CSS variables that mirror HeroSection's, so the two read as one system
 * while each stays independently publishable.
 */

export type PricingTier = {
  id: string;
  name: string;
  /** One line under the tier name. */
  tagline: string;
  /** Per-month price when billed monthly. Use null for "contact us" tiers. */
  monthly: number | null;
  /** Per-month price when billed annually. Use null for "contact us" tiers. */
  annual: number | null;
  /** Shown instead of a figure when monthly/annual are null. */
  customLabel?: string;
  features: string[];
  ctaLabel: string;
  ctaHref?: string;
  /** Exactly one tier should set this — it carries the section's primary CTA. */
  highlighted?: boolean;
  /** Ribbon on the highlighted tier. */
  badge?: string;
};

export interface PricingSectionProps extends React.HTMLAttributes<HTMLElement> {
  heading?: string;
  description?: string;
  tiers?: PricingTier[];
  /** Prefix for every figure. */
  currency?: string;
  /** Whole percent shown in the annual pill. Set to 0 to hide it. */
  annualSavingPercent?: number;
  /** Billing period selected on first render. */
  defaultPeriod?: "monthly" | "annual";
  /** Small print under the grid. */
  footnote?: string;
}

const DEFAULT_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For side projects and solo work.",
    monthly: 12,
    annual: 9,
    features: [
      "Up to 3 projects",
      "1 GB storage",
      "Community support",
      "Basic analytics",
    ],
    ctaLabel: "Start free trial",
    ctaHref: "#starter",
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For teams shipping every week.",
    monthly: 32,
    annual: 25,
    features: [
      "Unlimited projects",
      "100 GB storage",
      "Priority support",
      "Advanced analytics",
      "Custom domains",
      "Role-based access",
    ],
    ctaLabel: "Start free trial",
    ctaHref: "#pro",
    highlighted: true,
    badge: "Most popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For organisations with review cycles.",
    monthly: null,
    annual: null,
    customLabel: "Custom",
    features: [
      "Everything in Pro",
      "SSO and SCIM",
      "Audit logs",
      "99.9% uptime SLA",
      "Dedicated success manager",
    ],
    ctaLabel: "Contact sales",
    ctaHref: "#enterprise",
  },
];

/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */

export function PricingSection({
  heading = "Pricing that scales with you",
  description = "Start free. Upgrade when your team outgrows it — no rebuild, no migration.",
  tiers = DEFAULT_TIERS,
  currency = "$",
  annualSavingPercent = 20,
  defaultPeriod = "annual",
  footnote = "Prices in USD. Taxes calculated at checkout. Cancel anytime.",
  className = "",
  ...rest
}: PricingSectionProps) {
  const headingId = React.useId();
  const [period, setPeriod] = React.useState<"monthly" | "annual">(defaultPeriod);
  const annual = period === "annual";

  return (
    <section
      aria-labelledby={headingId}
      className={`pricing-root relative w-full bg-[color:var(--pricing-bg)] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 ${className}`}
      {...rest}
    >
      <style>{css}</style>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <h2
          id={headingId}
          className="text-balance text-center font-[family-name:var(--pricing-font-display)] text-[2rem] font-bold leading-[1.15] tracking-[-0.02em] text-[color:var(--pricing-fg)] sm:text-4xl lg:text-5xl"
        >
          {heading}
        </h2>

        {description ? (
          <p className="mt-4 max-w-[60ch] text-pretty text-center text-base leading-relaxed text-[color:var(--pricing-muted-fg)] sm:text-lg">
            {description}
          </p>
        ) : null}

        {/* Billing toggle. Two buttons rather than a switch, so each option is
            directly selectable and its state is announced via aria-pressed. */}
        <div
          role="group"
          aria-label="Billing period"
          className="mt-8 inline-flex items-center gap-1 rounded-full border border-[color:var(--pricing-border)] bg-[color:var(--pricing-surface-sunken)] p-1"
        >
          <PeriodButton pressed={!annual} onClick={() => setPeriod("monthly")}>
            Monthly
          </PeriodButton>
          <PeriodButton pressed={annual} onClick={() => setPeriod("annual")}>
            Annual
            {annualSavingPercent > 0 ? (
              <span
                className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                  annual
                    ? "bg-[color:var(--pricing-save-on-active-bg)] text-[color:var(--pricing-save-on-active-fg)]"
                    : "bg-[color:var(--pricing-save-bg)] text-[color:var(--pricing-save-fg)]"
                }`}
              >
                Save {annualSavingPercent}%
              </span>
            ) : null}
          </PeriodButton>
        </div>

        {/* Cards, not a comparison table — a wide table would need horizontal
            scroll on mobile, which the UX guidance flags as a layout break. */}
        {/* Three columns only from lg. At md the cards are narrow enough that
            CTA labels and prices wrap mid-phrase. */}
        <div className="mt-12 grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-6">
          {tiers.map((tier) => (
            <TierCard
              key={tier.id}
              tier={tier}
              annual={annual}
              currency={currency}
            />
          ))}
        </div>

        {footnote ? (
          <p className="mt-10 text-center text-sm text-[color:var(--pricing-muted-fg)]">{footnote}</p>
        ) : null}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function PeriodButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`pricing-focus inline-flex min-h-[44px] cursor-pointer items-center rounded-full px-4 text-sm font-semibold transition-colors duration-200 ease-out ${
        pressed
          ? "bg-[color:var(--pricing-primary)] text-[color:var(--pricing-on-primary)]"
          : "text-[color:var(--pricing-muted-fg)] hover:text-[color:var(--pricing-fg)]"
      }`}
    >
      {children}
    </button>
  );
}

function TierCard({
  tier,
  annual,
  currency,
}: {
  tier: PricingTier;
  annual: boolean;
  currency: string;
}) {
  const price = annual ? tier.annual : tier.monthly;
  const hasFigure = price !== null;
  const showStrikethrough = annual && tier.monthly !== null && tier.annual !== tier.monthly;

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl p-6 sm:p-7 ${
        tier.highlighted
          ? // The raised card grows 1rem past the row on each side. h-full alone would
            // keep it at row height and merely shift it up, so the height is stated
            // explicitly to match the negative margin.
            "bg-[color:var(--pricing-surface)] shadow-lg ring-2 ring-[color:var(--pricing-primary)] lg:-my-4 lg:h-[calc(100%+2rem)] lg:pb-9 lg:pt-9"
          : "border border-[color:var(--pricing-border)] bg-[color:var(--pricing-surface)]"
      }`}
    >
      {tier.highlighted && tier.badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[color:var(--pricing-primary)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--pricing-on-primary)]">
          {tier.badge}
        </span>
      ) : null}

      <h3 className="text-lg font-semibold text-[color:var(--pricing-fg)]">{tier.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--pricing-muted-fg)]">
        {tier.tagline}
      </p>

      <div className="mt-6 flex items-baseline gap-2">
        {hasFigure ? (
          <>
            <span className="font-[family-name:var(--pricing-font-display)] text-4xl font-bold tabular-nums tracking-[-0.02em] text-[color:var(--pricing-fg)]">
              {currency}
              {price}
            </span>
            <span className="text-sm text-[color:var(--pricing-muted-fg)]">
              /month
              {/* Keeps the figure unambiguous for screen readers. */}
              {annual ? <span className="sr-only"> , billed annually</span> : null}
            </span>
            {showStrikethrough ? (
              <span className="text-sm tabular-nums text-[color:var(--pricing-strike-fg)] line-through">
                {currency}
                {tier.monthly}
              </span>
            ) : null}
          </>
        ) : (
          <span className="font-[family-name:var(--pricing-font-display)] text-4xl font-bold tracking-[-0.02em] text-[color:var(--pricing-fg)]">
            {tier.customLabel ?? "Custom"}
          </span>
        )}
      </div>

      <a
        href={tier.ctaHref ?? "#"}
        className={`pricing-focus mt-6 inline-flex min-h-[48px] cursor-pointer items-center justify-center rounded-xl px-5 text-sm font-semibold transition-[background-color,box-shadow,transform] duration-200 ease-out active:scale-[0.98] ${
          tier.highlighted
            ? "bg-[color:var(--pricing-primary)] text-[color:var(--pricing-on-primary)] shadow-sm hover:bg-[color:var(--pricing-primary-hover)] hover:shadow-md"
            : "border border-[color:var(--pricing-control-border)] bg-[color:var(--pricing-surface)] text-[color:var(--pricing-fg)] hover:bg-[color:var(--pricing-surface-hover)]"
        }`}
      >
        {tier.ctaLabel}
      </a>

      <ul className="mt-7 flex flex-col gap-3">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-[color:var(--pricing-muted-fg)]"
          >
            <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[color:var(--pricing-check-bg)]">
              <CheckIcon className="h-2.5 w-2.5 text-[color:var(--pricing-check-fg)]" />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Scoped theme. Mirrors HeroSection's palette; dark mode responds to both     */
/* prefers-color-scheme and a `.dark` ancestor class.                          */
/* -------------------------------------------------------------------------- */

const themeLight = `
  --pricing-font-display: "Outfit", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;

  --pricing-bg: #F8FAFC;
  --pricing-fg: #0F172A;
  --pricing-muted-fg: #475569;
  --pricing-surface: #FFFFFF;
  --pricing-surface-hover: #EFF3F8;
  --pricing-surface-sunken: #EFF3F8;
  --pricing-border: #DFE6EF;
  --pricing-control-border: #7C8CA5;

  --pricing-primary: #1E3A5F;
  --pricing-primary-hover: #17304F;
  --pricing-on-primary: #FFFFFF;

  --pricing-save-bg: #FDF0D5;
  --pricing-save-fg: #7C4A06;
  --pricing-save-on-active-bg: #FDF0D5;
  --pricing-save-on-active-fg: #7C4A06;

  --pricing-check-bg: #DCE7F3;
  --pricing-check-fg: #1E3A5F;
  --pricing-strike-fg: #64748B;
`;

const themeDark = `
  --pricing-bg: #0B1220;
  --pricing-fg: #E8EEF7;
  --pricing-muted-fg: #A9B6CC;
  --pricing-surface: #131C2E;
  --pricing-surface-hover: #1A2438;
  --pricing-surface-sunken: #1A2438;
  --pricing-border: #222E45;
  --pricing-control-border: #5A6B8C;

  --pricing-primary: #3B82F6;
  --pricing-primary-hover: #2F72E0;
  --pricing-on-primary: #06101F;

  --pricing-save-bg: #3A2E0E;
  --pricing-save-fg: #F5C445;
  --pricing-save-on-active-bg: #3A2E0E;
  --pricing-save-on-active-fg: #F5C445;

  --pricing-check-bg: #1B2C46;
  --pricing-check-fg: #93B4E8;
  --pricing-strike-fg: #8494AD;
`;

const css = `
.pricing-root { ${themeLight} }

@media (prefers-color-scheme: dark) {
  .pricing-root:not(.light .pricing-root) { ${themeDark} }
}

.dark .pricing-root { ${themeDark} }

.pricing-focus:focus-visible {
  outline: 2px solid var(--pricing-fg);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .pricing-root * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
`;

export default PricingSection;
