"use client";

import * as React from "react";

/**
 * SiteNavbar — sticky top navigation with a mobile disclosure menu.
 *
 * Sticky rather than fixed: sticky keeps the bar in normal flow, so the first
 * section below it is never overlapped and consumers do not have to offset the
 * page by the nav's height.
 *
 * Self-contained: no icon package, no external images, no webfont request.
 */

export type NavLink = {
  label: string;
  href: string;
  /** Marks the current page — renders aria-current and the active indicator. */
  current?: boolean;
};

export interface SiteNavbarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string;
  brandHref?: string;
  /** Overrides `brand` — use this to supply a real logo element. */
  brandNode?: React.ReactNode;
  links?: NavLink[];
  /** Subordinate action, e.g. sign in. Omit to hide. */
  secondaryLabel?: string;
  secondaryHref?: string;
  /** The bar's single primary action. Omit to hide. */
  ctaLabel?: string;
  ctaHref?: string;
  /**
   * Target for the skip link. Point it at your main landmark's id — the skip
   * link is the first focusable element, per the accessibility guidance for
   * nav-heavy pages.
   */
  skipToId?: string;
  /** Hides the skip link if the host page already provides one. */
  showSkipLink?: boolean;
}

const DEFAULT_LINKS: NavLink[] = [
  { label: "Product", href: "#product", current: true },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
  { label: "Docs", href: "#docs" },
];

/* -------------------------------------------------------------------------- */

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

export function SiteNavbar({
  brand = "Northwind",
  brandHref = "#top",
  brandNode,
  links = DEFAULT_LINKS,
  secondaryLabel = "Sign in",
  secondaryHref = "#signin",
  ctaLabel = "Start free",
  ctaHref = "#get-started",
  skipToId = "main",
  showSkipLink = true,
  className = "",
  ...rest
}: SiteNavbarProps) {
  const panelId = React.useId();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const barRef = React.useRef<HTMLElement>(null);

  // Hairline appears only once the page has moved, so the bar sits flush with
  // the hero at rest.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes and returns focus to the toggle, so keyboard users are not
  // stranded inside a dismissed menu.
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  // Stop the page scrolling behind the open panel.
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      ref={barRef}
      // z-40 with isolate: `isolate` creates a stacking context on the header so
      // its z-index is compared against siblings rather than leaking into
      // whatever context the page happens to establish.
      className={`nav-root sticky top-0 isolate z-40 w-full bg-[color:var(--nav-bg)] ${
        scrolled ? "border-b border-[color:var(--nav-border)]" : "border-b border-transparent"
      } ${className}`}
      {...rest}
    >
      <style>{css}</style>

      {showSkipLink ? (
        <a href={`#${skipToId}`} className="nav-skip nav-focus">
          Skip to main content
        </a>
      ) : null}

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <a
          href={brandHref}
          className="nav-focus inline-flex min-h-[44px] shrink-0 cursor-pointer items-center font-[family-name:var(--nav-font-display)] text-lg font-bold tracking-[-0.01em] text-[color:var(--nav-fg)]"
        >
          {brandNode ?? brand}
        </a>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={link.current ? "page" : undefined}
                  className={`nav-focus relative inline-flex min-h-[44px] cursor-pointer items-center rounded-lg px-3 text-sm font-medium transition-colors duration-200 ease-out ${
                    link.current
                      ? "text-[color:var(--nav-fg)]"
                      : "text-[color:var(--nav-muted-fg)] hover:text-[color:var(--nav-fg)]"
                  }`}
                >
                  {link.label}
                  {link.current ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-2 h-0.5 rounded-full bg-[color:var(--nav-accent)]"
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {secondaryLabel ? (
            <a
              href={secondaryHref}
              className="nav-focus inline-flex min-h-[44px] cursor-pointer items-center rounded-lg px-3 text-sm font-medium text-[color:var(--nav-muted-fg)] transition-colors duration-200 ease-out hover:text-[color:var(--nav-fg)]"
            >
              {secondaryLabel}
            </a>
          ) : null}
          {ctaLabel ? (
            <a
              href={ctaHref}
              className="nav-focus inline-flex min-h-[44px] cursor-pointer items-center rounded-xl bg-[color:var(--nav-primary)] px-4 text-sm font-semibold text-[color:var(--nav-on-primary)] transition-[background-color,transform] duration-200 ease-out hover:bg-[color:var(--nav-primary-hover)] active:scale-[0.98]"
            >
              {ctaLabel}
            </a>
          ) : null}
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="nav-focus inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[color:var(--nav-fg)] transition-colors duration-200 ease-out hover:bg-[color:var(--nav-surface-hover)] md:hidden"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel. Kept after the toggle in DOM order so tabbing moves
          straight into it, which keeps focus order matching visual order. */}
      <div
        id={panelId}
        hidden={!open}
        className="border-t border-[color:var(--nav-border)] bg-[color:var(--nav-surface)] md:hidden"
      >
        <nav aria-label="Main" className="px-5 py-3 sm:px-8">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={link.current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`nav-focus flex min-h-[48px] cursor-pointer items-center rounded-lg px-2 text-sm font-medium ${
                    link.current
                      ? "text-[color:var(--nav-fg)]"
                      : "text-[color:var(--nav-muted-fg)]"
                  }`}
                >
                  {link.label}
                  {link.current ? (
                    <span
                      aria-hidden="true"
                      className="ml-2 h-1.5 w-1.5 rounded-full bg-[color:var(--nav-accent)]"
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-col gap-2 border-t border-[color:var(--nav-border)] pt-3">
            {secondaryLabel ? (
              <a
                href={secondaryHref}
                onClick={() => setOpen(false)}
                className="nav-focus inline-flex min-h-[48px] cursor-pointer items-center justify-center rounded-xl border border-[color:var(--nav-control-border)] px-4 text-sm font-semibold text-[color:var(--nav-fg)]"
              >
                {secondaryLabel}
              </a>
            ) : null}
            {ctaLabel ? (
              <a
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="nav-focus inline-flex min-h-[48px] cursor-pointer items-center justify-center rounded-xl bg-[color:var(--nav-primary)] px-4 text-sm font-semibold text-[color:var(--nav-on-primary)]"
              >
                {ctaLabel}
              </a>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */

const themeLight = `
  --nav-font-display: "Outfit", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;

  --nav-bg: #F8FAFC;
  --nav-fg: #0F172A;
  --nav-muted-fg: #475569;
  --nav-surface: #FFFFFF;
  --nav-surface-hover: #E7EDF5;
  --nav-border: #C3CEDD;
  --nav-control-border: #7C8CA5;

  --nav-primary: #1E3A5F;
  --nav-primary-hover: #17304F;
  --nav-on-primary: #FFFFFF;
  --nav-accent: #1E3A5F;
`;

const themeDark = `
  --nav-bg: #0B1220;
  --nav-fg: #E8EEF7;
  --nav-muted-fg: #A9B6CC;
  --nav-surface: #131C2E;
  --nav-surface-hover: #1A2438;
  --nav-border: #33415C;
  --nav-control-border: #5A6B8C;

  --nav-primary: #3B82F6;
  --nav-primary-hover: #2F72E0;
  --nav-on-primary: #06101F;
  --nav-accent: #3B82F6;
`;

const css = `
.nav-root { ${themeLight} }

@media (prefers-color-scheme: dark) {
  .nav-root:not(.light .nav-root) { ${themeDark} }
}

.dark .nav-root { ${themeDark} }

.nav-focus:focus-visible {
  outline: 2px solid var(--nav-fg);
  outline-offset: 2px;
}

/* Off-screen until focused, then pinned over the bar. */
.nav-skip {
  position: absolute;
  left: 1rem;
  top: 0.5rem;
  z-index: 50;
  transform: translateY(-200%);
  display: inline-flex;
  align-items: center;
  /* It is a real control, so it carries the same 44px minimum as the rest. */
  min-height: 44px;
  border-radius: 0.5rem;
  background: var(--nav-primary);
  color: var(--nav-on-primary);
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: transform 150ms ease-out;
}

.nav-skip:focus {
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .nav-root *, .nav-skip { transition-duration: 0.01ms !important; }
}
`;

export default SiteNavbar;
