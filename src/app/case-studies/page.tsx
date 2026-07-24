import type { Metadata } from "next";
import { AlertCircle, Wrench, Cpu, TrendingUp } from "lucide-react";
import { PageHero, CTABand } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "How M.I Tech NG solves real business problems with AI — client problem, what we did, the technology used, and measurable outcomes.",
};

const steps = [
  { key: "problem", label: "Client Problem", icon: AlertCircle, color: "text-red-400 border-red-400/20 bg-red-400/10" },
  { key: "action", label: "What M.I Tech Did", icon: Wrench, color: "text-brand-300 border-brand-500/20 bg-brand-500/10" },
  { key: "tech", label: "Technology Used", icon: Cpu, color: "text-blue-300 border-blue-400/20 bg-blue-400/10" },
  { key: "outcome", label: "Outcome", icon: TrendingUp, color: "text-gold border-gold/20 bg-gold/10" },
] as const;

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Problems solved, outcomes delivered"
        intro="We don't say &lsquo;we built a chatbot.&rsquo; We show the problem, what M.I Tech did, the technology used, and the measurable result."
      />

      <section className="section">
        <div className="container space-y-12">
          {caseStudies.map((study, idx) => (
            <Reveal key={study.slug}>
              <article
                id={study.slug}
                className="scroll-mt-24 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-6 md:p-8">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-brand-300">
                      Case Study {String(idx + 1).padStart(2, "0")} · {study.industry}
                    </span>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      {study.title}
                    </h2>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-gold">
                      {study.metric.value}
                    </div>
                    <div className="text-sm text-muted">
                      {study.metric.label}
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
                  {steps.map((step) => {
                    const Icon = step.icon;
                    const value = study[step.key];
                    return (
                      <div key={step.key} className="flex gap-4">
                        <div
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg border ${step.color}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
                            {step.label}
                          </h3>
                          {Array.isArray(value) ? (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {value.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-1.5 text-sm leading-relaxed text-muted">
                              {value}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand
        title="Your business could be the next case study"
        body="Tell us your biggest bottleneck and we'll show you how AI can fix it."
      />
    </>
  );
}
