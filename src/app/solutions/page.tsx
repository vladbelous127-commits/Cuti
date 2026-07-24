import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/ui";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { SolutionCard } from "@/components/cards";
import { solutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI Solutions",
  description:
    "Ready-to-deploy AI solutions: chatbots, WhatsApp automation, CRM, document AI, voice AI, and internal company assistants.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Solutions"
        title="A catalogue of AI that pays for itself"
        intro="These are the AI solutions M.I Tech deploys most often. Each one is tailored to your workflow, your brand and your data."
      />
      <section className="section">
        <div className="container">
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <RevealItem key={s.title}>
                <SolutionCard solution={s} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      <CTABand
        title="Not sure which solution fits?"
        body="Take the AI Discovery Session and get a personalized report on where AI can help your business most."
      />
    </>
  );
}
