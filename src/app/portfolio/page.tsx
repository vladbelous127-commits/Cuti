import type { Metadata } from "next";
import { PageHero, CTABand } from "@/components/ui";
import { PortfolioGrid } from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Branding, print, publications, events and identity work by M.I Tech NG — including AI Fluency branding, the Prompt Book and more.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="The work speaks for itself"
        intro="A selection of branding, print, publications and event design produced by M.I Tech — from the AI Fluency identity to the Prompt Book."
      />
      <section className="section">
        <div className="container">
          <PortfolioGrid />
        </div>
      </section>
      <CTABand />
    </>
  );
}
