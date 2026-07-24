import type { Metadata } from "next";
import { Camera, Award, Users, Star } from "lucide-react";
import { PageHero, CTABand } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { PhotoPlaceholder } from "@/components/Placeholder";
import { workshops } from "@/lib/library";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "AI Fluency Workshop and corporate training for businesses, schools, universities and government agencies — by M.I Tech NG.",
};

const statusStyles: Record<string, string> = {
  Delivered: "border-brand-500/30 bg-brand-500/10 text-brand-300",
  Upcoming: "border-gold/30 bg-gold/10 text-gold",
  Available: "border-white/15 bg-white/[0.03] text-muted",
};

const highlightIcons = [Camera, Award, Users, Star];
const highlights = [
  "Photos & certificates",
  "Recognized certificates",
  "Engaged audiences",
  "Testimonials & sponsors",
];

export default function WorkshopsPage() {
  return (
    <>
      <PageHero
        eyebrow="Workshops"
        title="AI training that sticks"
        intro="From the flagship AI Fluency Workshop to tailored corporate programs, M.I Tech runs hands-on sessions that turn teams into confident AI users."
      />

      {/* Feature banner */}
      <section className="section">
        <div className="container grid gap-8 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <PhotoPlaceholder label="AI Fluency Workshop" ratio="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Flagship program</span>
            <h2 className="mt-4 text-3xl font-semibold text-white">
              The AI Fluency Workshop
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              A practical, hands-on workshop that takes participants from
              curious to capable — covering AI tools, prompt writing and
              responsible use, with real exercises they can apply the very next
              day.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {highlights.map((h, i) => {
                const Icon = highlightIcons[i];
                return (
                  <div
                    key={h}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <Icon className="h-4 w-4 text-brand-400" /> {h}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Programs */}
      <section className="section border-t border-white/5">
        <div className="container">
          <h2 className="text-2xl font-semibold text-white">Programs</h2>
          <RevealGroup className="mt-8 grid gap-6 md:grid-cols-2">
            {workshops.map((w) => (
              <RevealItem key={w.title}>
                <div className="card card-hover h-full">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white">
                      {w.title}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-1 text-xs ${statusStyles[w.status]}`}
                    >
                      {w.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wider text-brand-300">
                    {w.audience}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {w.desc}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="section border-t border-white/5">
        <div className="container">
          <h2 className="text-2xl font-semibold text-white">From the room</h2>
          <RevealGroup className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {["Speaking", "Audience", "Certificates", "Networking"].map((l) => (
              <RevealItem key={l}>
                <PhotoPlaceholder label={l} ratio="aspect-square" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTABand
        title="Bring a workshop to your organization"
        body="Corporate teams, schools, universities and government agencies — let's design a session for your audience."
      />
    </>
  );
}
