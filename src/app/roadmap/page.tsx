import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { roadmap } from "@/lib/content";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "The M.I Tech NG roadmap — from AI consultancy in 2026 to a national AI academy and global expansion by 2030.",
};

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Future Vision"
        title="The M.I Tech Roadmap"
        intro="We're building something long-term. Here's the path from an AI consultancy today to a global African AI company."
      />

      <section className="section">
        <div className="container max-w-3xl">
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[19px] top-2 h-full w-px bg-gradient-to-b from-brand-500/60 via-white/10 to-transparent md:left-1/2" />

            <div className="space-y-10">
              {roadmap.map((item, i) => (
                <Reveal key={item.year}>
                  <div
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* dot */}
                    <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-500/40 bg-ink-900 text-xs font-bold text-brand-300 md:absolute md:left-1/2 md:-translate-x-1/2">
                      {item.year.slice(2)}
                    </div>

                    {/* card */}
                    <div
                      className={`card card-hover flex-1 md:w-[calc(50%-2.5rem)] md:flex-none ${
                        i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                      }`}
                    >
                      <div className="text-sm font-semibold text-gold">
                        {item.year}
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Be part of the journey"
        body="Partner with M.I Tech as we build the future of AI in Africa."
      />
    </>
  );
}
