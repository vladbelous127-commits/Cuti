import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Check } from "lucide-react";
import { PageHero, SectionHeading, CTABand } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { mission, vision, coreValues, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "M.I Tech NG is an AI-focused technology company helping businesses, organizations and entrepreneurs leverage Artificial Intelligence.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About M.I Tech"
        title="We help businesses win with Artificial Intelligence"
        intro="M.I Tech NG is an AI-focused technology company helping businesses, organizations and entrepreneurs leverage Artificial Intelligence to improve productivity, automate repetitive work and unlock new opportunities."
      />

      {/* Stats */}
      <section className="border-b border-white/5 bg-white/[0.015]">
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

      {/* Mission & Vision */}
      <section className="section">
        <div className="container grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-300">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">Mission</h2>
              <p className="mt-3 leading-relaxed text-muted">{mission}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card h-full">
              <div className="grid h-12 w-12 place-items-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                <Eye className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">Vision</h2>
              <p className="mt-3 leading-relaxed text-muted">{vision}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core values */}
      <section className="section border-t border-white/5">
        <div className="container">
          <SectionHeading
            eyebrow="Core Values"
            title="What we stand for"
            align="center"
          />
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((v) => (
              <RevealItem key={v.title}>
                <div className="card card-hover h-full">
                  <Check className="h-6 w-6 text-brand-400" />
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {v.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10 flex justify-center">
            <Link href="/founder" className="btn-outline">
              Meet the founder <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
