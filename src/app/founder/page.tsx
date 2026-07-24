import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Mic } from "lucide-react";
import { PageHero, CTABand } from "@/components/ui";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { AvatarPlaceholder } from "@/components/Placeholder";
import { founderRoles, certifications, skillGroups } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meet the Founder",
  description:
    "Mustapha Ibrahim — Founder & CEO of M.I Tech NG. AI consultant, prompt engineer, workshop speaker and digital transformation advocate.",
};

export default function FounderPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet the Founder"
        title="Mustapha Ibrahim"
        intro="Founder & CEO of M.I Tech NG — AI consultant, prompt engineer and workshop speaker on a mission to make AI practical for African businesses."
      />

      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <AvatarPlaceholder initials="MI" className="aspect-[4/5]" />
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="text-sm font-semibold text-white">
                  Mustapha Ibrahim
                </div>
                <div className="text-sm text-brand-300">Founder &amp; CEO</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {founderRoles.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="space-y-4 leading-relaxed text-muted">
                <p>
                  Mustapha Ibrahim is a Computer Science graduate and prompt
                  engineer who founded M.I Tech NG to help businesses and
                  institutions harness Artificial Intelligence in a practical,
                  results-driven way.
                </p>
                <p>
                  As an AI and automation consultant, he works with
                  organizations to identify where AI can save time, reduce costs
                  and open new opportunities — then leads the strategy, design
                  and delivery of solutions through M.I Tech.
                </p>
                <p>
                  A frequent workshop speaker and digital transformation
                  advocate, Mustapha has delivered AI fluency training to
                  corporate teams, schools and youth programs, helping people at
                  every level become confident, effective users of AI.
                </p>
              </div>
            </Reveal>

            {/* Expertise */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-white">Expertise</h2>
              <RevealGroup className="mt-6 space-y-5">
                {skillGroups.map((group) => {
                  const Icon = group.icon;
                  return (
                    <RevealItem key={group.title}>
                      <div className="card">
                        <div className="flex items-center gap-3">
                          <div className="grid h-9 w-9 place-items-center rounded-lg border border-brand-500/20 bg-brand-500/10 text-brand-300">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="font-semibold text-white">
                            {group.title}
                          </h3>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {group.skills.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-sm text-muted"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>

            {/* Certifications */}
            <div className="mt-12">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-gold" />
                <h2 className="text-xl font-semibold text-white">
                  Certifications
                </h2>
              </div>
              <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2">
                {certifications.map((c) => (
                  <RevealItem key={`${c.issuer}-${c.name}`}>
                    <div className="card card-hover flex items-center gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold/20 bg-gold/10 text-sm font-bold text-gold">
                        {c.issuer.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {c.issuer}
                        </div>
                        <div className="text-sm text-muted">{c.name}</div>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <Reveal className="mt-10 flex flex-wrap gap-4">
              <Link href="/speaking" className="btn-outline">
                <Mic className="h-4 w-4" /> Speaking engagements
              </Link>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Connect on LinkedIn <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        title="Bring M.I Tech to your team"
        body="Book a consultation to explore AI strategy, training or automation for your organization."
      />
    </>
  );
}
