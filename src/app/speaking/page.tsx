import type { Metadata } from "next";
import Link from "next/link";
import { Mic, ArrowRight } from "lucide-react";
import { PageHero, CTABand } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { PhotoPlaceholder } from "@/components/Placeholder";
import { speakingTopics } from "@/lib/library";

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "Book Mustapha Ibrahim of M.I Tech NG to speak on AI fluency at schools, government, youth programs, corporate events and universities.",
};

export default function SpeakingPage() {
  return (
    <>
      <PageHero
        eyebrow="Speaking"
        title="A speaker who makes AI click"
        intro="Mustapha Ibrahim speaks on AI fluency and digital transformation — translating complex technology into practical action for any audience."
      />

      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <PhotoPlaceholder label="On stage" ratio="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-brand-400" />
              <span className="eyebrow">Speaking topics</span>
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              Talks &amp; sessions
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              From keynote-style talks to hands-on sessions, each engagement is
              tailored to the audience — students, professionals, public sector
              or youth programs.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {speakingTopics.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-white/5">
        <div className="container">
          <h2 className="text-2xl font-semibold text-white">Where he speaks</h2>
          <RevealGroup className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Schools", d: "Introducing students to AI and responsible use." },
              { t: "Government", d: "Briefings on AI for public service delivery." },
              { t: "Youth Programs", d: "Inspiring the next generation of AI talent." },
              { t: "Corporate Events", d: "Practical AI for teams and leadership." },
              { t: "Universities", d: "Deep dives on AI tooling and careers." },
              { t: "Conferences", d: "Keynotes on the future of AI in Africa." },
            ].map((x) => (
              <RevealItem key={x.t}>
                <div className="card card-hover h-full">
                  <h3 className="font-semibold text-white">{x.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {x.d}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10">
            <Link href="/contact" className="btn-primary">
              Invite M.I Tech to speak <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
