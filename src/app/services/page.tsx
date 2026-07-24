import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/ui";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { ServiceCard } from "@/components/cards";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI consulting, automation, prompt engineering, training, content, strategy and custom AI solutions — delivered by M.I Tech NG.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="AI services, end to end"
        intro="M.I Tech helps organizations understand, adopt and deploy AI — from first strategy conversation to a working solution in production."
      />
      <section className="section">
        <div className="container">
          <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <RevealItem key={s.slug}>
                <ServiceCard service={s} />
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealItem>
            <div className="mt-10 rounded-2xl border border-gold/20 bg-gold/[0.04] p-6 text-sm leading-relaxed text-muted">
              <span className="font-semibold text-gold">A note on custom builds:</span>{" "}
              M.I Tech designs and delivers custom AI systems by coordinating a
              trusted network of expert developers. You get a single,
              accountable partner — M.I Tech builds them.
            </div>
          </RevealItem>
        </div>
      </section>
      <CTABand />
    </>
  );
}
