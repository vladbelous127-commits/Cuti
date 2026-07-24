import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl"
      }
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function CTABand({
  title = "Ready to put AI to work in your business?",
  body = "Book a free consultation and we'll show you exactly where AI can save time, cut costs and grow revenue.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-ink-900 to-ink-850 p-10 text-center md:p-16">
            <div className="pointer-events-none absolute inset-0 bg-radial-brand opacity-70" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted md:text-lg">{body}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/discovery" className="btn-primary">
                  Book Free Consultation <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/portfolio" className="btn-outline">
                  View Our Work
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-muted">
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-radial-brand" />
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:56px_56px] opacity-40" />
      <div className="container relative py-20 md:py-28">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {intro}
            </p>
          </Reveal>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
