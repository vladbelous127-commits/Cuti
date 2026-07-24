import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/ui";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { industries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "M.I Tech NG delivers AI solutions across healthcare, education, government, finance, retail, agriculture and more.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        title="AI that adapts to your sector"
        intro="Every industry has different bottlenecks. M.I Tech tailors AI and automation to the realities of yours."
      />
      <section className="section">
        <div className="container">
          <RevealGroup className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <RevealItem key={ind.name}>
                  <div className="card card-hover group flex h-full flex-col items-center justify-center gap-3 py-8 text-center">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-300 transition group-hover:bg-brand-500/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-white">
                      {ind.name}
                    </span>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>
      <CTABand />
    </>
  );
}
