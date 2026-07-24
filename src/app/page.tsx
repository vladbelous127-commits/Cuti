import Link from "next/link";
import { ArrowRight, Target, Eye, ShieldCheck, Quote } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SectionHeading, CTABand } from "@/components/ui";
import { ServiceCard, SolutionCard, CaseStudyCard } from "@/components/cards";
import {
  services,
  solutions,
  industries,
  caseStudies,
  stats,
  mission,
  vision,
} from "@/lib/content";
import { testimonials } from "@/lib/library";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats bar */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label} className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* About / Mission */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="About M.I Tech"
              title="An AI company built to move businesses forward"
              intro="M.I Tech NG is an AI-focused technology company helping businesses, organizations and entrepreneurs leverage Artificial Intelligence to improve productivity, automate repetitive work and unlock new opportunities."
            />
            <Reveal delay={0.15}>
              <Link href="/about" className="btn-outline mt-8">
                Learn more about us <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <RevealGroup className="grid gap-5">
            <RevealItem>
              <MissionCard
                icon={<Target className="h-5 w-5" />}
                title="Mission"
                body={mission}
              />
            </RevealItem>
            <RevealItem>
              <MissionCard
                icon={<Eye className="h-5 w-5" />}
                title="Vision"
                body={vision}
              />
            </RevealItem>
            <RevealItem>
              <MissionCard
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Core Values"
                body="Practical AI, trust & integrity, empowerment and excellence guide every engagement."
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Services */}
      <section className="section border-t border-white/5">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="What We Do"
              title="Services that turn AI into outcomes"
              intro="From strategy to deployment — M.I Tech delivers the full journey."
            />
            <Reveal>
              <Link href="/services" className="btn-outline">
                All services <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <RevealItem key={s.slug}>
                <ServiceCard service={s} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Industries marquee */}
      <section className="section border-t border-white/5">
        <div className="container">
          <SectionHeading
            eyebrow="Industries We Serve"
            title="Trusted across sectors"
            align="center"
          />
        </div>
        <div className="mt-12 space-y-4">
          <Marquee>
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <div
                  key={ind.name}
                  className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm text-muted"
                >
                  <Icon className="h-4 w-4 text-brand-400" />
                  {ind.name}
                </div>
              );
            })}
          </Marquee>
        </div>
      </section>

      {/* AI Solutions preview */}
      <section className="section border-t border-white/5">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="AI Solutions"
              title="Ready-to-deploy AI, built for business"
              intro="Practical solutions that plug into how you already work."
            />
            <Reveal>
              <Link href="/solutions" className="btn-outline">
                All solutions <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.slice(0, 6).map((s) => (
              <RevealItem key={s.title}>
                <SolutionCard solution={s} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Case studies */}
      <section className="section border-t border-white/5">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Case Studies"
              title="Real problems, measurable outcomes"
              intro="We don't just build tools — we solve business problems."
            />
            <Reveal>
              <Link href="/case-studies" className="btn-outline">
                All case studies <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {caseStudies.map((c) => (
              <RevealItem key={c.slug}>
                <CaseStudyCard study={c} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section border-t border-white/5">
        <div className="container">
          <SectionHeading
            eyebrow="Testimonials"
            title="What people say"
            align="center"
          />
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <RevealItem key={t.name}>
                <figure className="card flex h-full flex-col">
                  <Quote className="h-7 w-7 text-brand-500/60" />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6">
                    <div className="text-sm font-semibold text-white">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTABand />
    </>
  );
}

function MissionCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="card flex gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-300">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </div>
  );
}
