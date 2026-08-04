"use client";

import * as React from "react";

/**
 * SiteFooter — link columns, a newsletter form, and a legal bar.
 *
 * Self-contained: no icon package, no external images, no webfont request.
 * Colours live in scoped CSS variables that mirror the other sections, using a
 * slightly sunken background so the footer reads as distinct from the page.
 */

export type FooterLink = {
  label: string;
  href: string;
  /** Marks the link as leaving the site; adds rel and an accessible hint. */
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type SubscribeState = "idle" | "submitting" | "success" | "error";

export interface SiteFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Wordmark text. Pass `brandNode` instead for a real logo. */
  brand?: string;
  /** Overrides `brand` — use this to supply an actual logo element. */
  brandNode?: React.ReactNode;
  description?: string;
  columns?: FooterColumn[];
  /**
   * Social links render as text. Supply `icon` per link if you want marks —
   * the component ships no brand logos, since approximated marks breach most
   * brand guidelines.
   */
  socials?: (FooterLink & { icon?: React.ReactNode })[];
  legalLinks?: FooterLink[];
  /** Defaults to the current year. Pass a fixed value for deterministic tests. */
  year?: number;
  showNewsletter?: boolean;
  newsletterTitle?: string;
  newsletterHint?: string;
  /**
   * Called on valid submit. Reject to surface the error state. The default
   * resolves after a short delay so the states are visible in isolation.
   */
  onSubscribe?: (email: string) => Promise<void>;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "API reference", href: "#api" },
      { label: "Status", href: "#status", external: true },
      { label: "Support", href: "#support" },
    ],
  },
];

const DEFAULT_SOCIALS: FooterLink[] = [
  { label: "GitHub", href: "#github", external: true },
  { label: "LinkedIn", href: "#linkedin", external: true },
  { label: "Bluesky", href: "#bluesky", external: true },
];

const DEFAULT_LEGAL: FooterLink[] = [
  { label: "Privacy", href: "#privacy" },
  { label: "Terms", href: "#terms" },
  { label: "Cookies", href: "#cookies" },
];

/** Deliberately permissive — real validation belongs on the server. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* -------------------------------------------------------------------------- */

function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M10 15.833V4.167M5 9.167l5-5 5 5" />
    </svg>
  );
}

function ExternalIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M11.667 3.333H16.667V8.333M16.667 3.333 9.167 10.833" />
      <path d="M15.833 11.667v3.333a1.667 1.667 0 0 1-1.666 1.667H5A1.667 1.667 0 0 1 3.333 15V5.833A1.667 1.667 0 0 1 5 4.167h3.333" />
    </svg>
  );
}

function SpinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false" {...props}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path
        d="M17 10a7 7 0 0 0-7-7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

export function SiteFooter({
  brand = "Northwind",
  brandNode,
  description = "The workspace where teams plan, build, and launch together.",
  columns = DEFAULT_COLUMNS,
  socials = DEFAULT_SOCIALS,
  legalLinks = DEFAULT_LEGAL,
  year,
  showNewsletter = true,
  newsletterTitle = "Product updates",
  newsletterHint = "One email a month. No marketing, unsubscribe in a click.",
  onSubscribe,
  className = "",
  ...rest
}: SiteFooterProps) {
  const resolvedYear = year ?? new Date().getFullYear();

  return (
    <footer
      className={`footer-root w-full bg-[color:var(--ftr-bg)] px-5 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-10 ${className}`}
      {...rest}
    >
      <style>{css}</style>

      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="font-[family-name:var(--ftr-font-display)] text-lg font-bold tracking-[-0.01em] text-[color:var(--ftr-fg)]">
              {brandNode ?? brand}
            </div>
            {description ? (
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--ftr-muted-fg)]">
                {description}
              </p>
            ) : null}

            {socials.length > 0 ? (
              <nav aria-label="Social" className="mt-5">
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <FooterAnchor link={s} className="inline-flex items-center gap-1.5">
                        {s.icon}
                        {s.label}
                      </FooterAnchor>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-14">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-sm font-semibold text-[color:var(--ftr-fg)]">
                  {column.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterAnchor link={link} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {showNewsletter ? (
          <NewsletterForm
            title={newsletterTitle}
            hint={newsletterHint}
            onSubscribe={onSubscribe}
          />
        ) : null}

        {/* Legal bar */}
        <div className="mt-10 flex flex-col-reverse items-start gap-4 border-t border-[color:var(--ftr-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[color:var(--ftr-legal-fg)]">
            © <span className="tabular-nums">{resolvedYear}</span> {brand}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <FooterAnchor key={link.label} link={link} className="text-sm" />
            ))}
            <a
              href="#top"
              className="ftr-focus inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-sm text-[color:var(--ftr-muted-fg)] transition-colors duration-200 ease-out hover:text-[color:var(--ftr-fg)]"
            >
              Back to top
              <ArrowUpIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */

function FooterAnchor({
  link,
  className = "",
  children,
}: {
  link: FooterLink;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={link.href}
      {...(link.external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
      className={`ftr-focus inline-flex cursor-pointer items-center gap-1 text-sm text-[color:var(--ftr-muted-fg)] transition-colors duration-200 ease-out hover:text-[color:var(--ftr-fg)] ${className}`}
    >
      {children ?? link.label}
      {link.external ? (
        <>
          <ExternalIcon className="h-3 w-3 opacity-70" />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      ) : null}
    </a>
  );
}

function NewsletterForm({
  title,
  hint,
  onSubscribe,
}: {
  title: string;
  hint: string;
  onSubscribe?: (email: string) => Promise<void>;
}) {
  const inputId = React.useId();
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<SubscribeState>("idle");
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const invalid = state === "error";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();

    if (!value) {
      setState("error");
      setMessage("Enter your email address to subscribe.");
      inputRef.current?.focus();
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setState("error");
      setMessage("That doesn't look like an email address — check for a typo.");
      inputRef.current?.focus();
      return;
    }

    setState("submitting");
    setMessage("");
    try {
      if (onSubscribe) {
        await onSubscribe(value);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
      setState("success");
      setMessage("You're subscribed. Check your inbox to confirm.");
      setEmail("");
    } catch {
      setState("error");
      setMessage("Something went wrong. Try again in a moment.");
      inputRef.current?.focus();
    }
  }

  return (
    <section
      aria-labelledby={`${inputId}-title`}
      className="mt-12 rounded-2xl border border-[color:var(--ftr-border)] bg-[color:var(--ftr-surface)] p-6 sm:p-7"
    >
      {/* items-start, not items-end: the form column is taller because of the
          reserved status line, which would otherwise push the heading down. */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md">
          <h2
            id={`${inputId}-title`}
            className="text-base font-semibold text-[color:var(--ftr-fg)]"
          >
            {title}
          </h2>
          <p id={hintId} className="mt-1.5 text-sm text-[color:var(--ftr-muted-fg)]">
            {hint}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="w-full lg:max-w-md">
          {/* A real label, not a placeholder — placeholder-only inputs lose their
              name as soon as the field has content. */}
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[color:var(--ftr-fg)]"
          >
            Email address
          </label>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              ref={inputRef}
              id={inputId}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") {
                  setState("idle");
                  setMessage("");
                }
              }}
              aria-invalid={invalid || undefined}
              aria-describedby={invalid ? `${hintId} ${errorId}` : hintId}
              placeholder="you@company.com"
              className="ftr-focus min-h-[48px] w-full flex-1 rounded-xl border bg-[color:var(--ftr-input-bg)] px-4 text-sm text-[color:var(--ftr-fg)] placeholder:text-[color:var(--ftr-placeholder-fg)]"
              style={{
                borderColor: invalid
                  ? "var(--ftr-error-fg)"
                  : "var(--ftr-control-border)",
              }}
            />
            <button
              type="submit"
              disabled={state === "submitting"}
              className="ftr-focus inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[color:var(--ftr-primary)] px-5 text-sm font-semibold text-[color:var(--ftr-on-primary)] transition-[background-color,opacity] duration-200 ease-out hover:bg-[color:var(--ftr-primary-hover)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state === "submitting" ? (
                <>
                  <SpinnerIcon className="ftr-spin h-4 w-4" />
                  Subscribing
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>

          {/* Status is announced politely; errors are also tied to the input via
              aria-describedby so they are read when the field takes focus. */}
          <p
            id={errorId}
            role="status"
            aria-live="polite"
            className={`mt-2 min-h-[20px] text-sm ${
              state === "error"
                ? "text-[color:var(--ftr-error-fg)]"
                : "text-[color:var(--ftr-success-fg)]"
            }`}
          >
            {message}
          </p>
        </form>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const themeLight = `
  --ftr-font-display: "Outfit", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;

  --ftr-bg: #EFF3F8;
  --ftr-fg: #0F172A;
  --ftr-muted-fg: #475569;
  --ftr-legal-fg: #5A6A80;
  --ftr-surface: #FFFFFF;
  --ftr-input-bg: #FFFFFF;
  --ftr-placeholder-fg: #64748B;
  --ftr-border: #CFD9E6;
  --ftr-control-border: #7C8CA5;

  --ftr-primary: #1E3A5F;
  --ftr-primary-hover: #17304F;
  --ftr-on-primary: #FFFFFF;

  --ftr-error-fg: #B91C1C;
  --ftr-success-fg: #166534;
`;

const themeDark = `
  --ftr-bg: #080E1A;
  --ftr-fg: #E8EEF7;
  --ftr-muted-fg: #A9B6CC;
  --ftr-legal-fg: #93A1B8;
  --ftr-surface: #131C2E;
  --ftr-input-bg: #131C2E;
  --ftr-placeholder-fg: #8494AD;
  --ftr-border: #1F2A3E;
  --ftr-control-border: #5A6B8C;

  --ftr-primary: #3B82F6;
  --ftr-primary-hover: #2F72E0;
  --ftr-on-primary: #06101F;

  --ftr-error-fg: #FCA5A5;
  --ftr-success-fg: #86EFAC;
`;

const css = `
.footer-root { ${themeLight} }

@media (prefers-color-scheme: dark) {
  .footer-root:not(.light .footer-root) { ${themeDark} }
}

.dark .footer-root { ${themeDark} }

.ftr-focus:focus-visible {
  outline: 2px solid var(--ftr-fg);
  outline-offset: 2px;
}

@keyframes ftr-spin { to { transform: rotate(360deg); } }
.ftr-spin { animation: ftr-spin 700ms linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .ftr-spin { animation-duration: 2.4s; }
  .footer-root * { transition-duration: 0.01ms !important; }
}
`;

export default SiteFooter;
