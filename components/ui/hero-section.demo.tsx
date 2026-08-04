import { HeroSection } from "./hero-section";

export function HeroSectionDemo() {
  return <HeroSection />;
}

export function HeroSectionMinimalDemo() {
  return (
    <HeroSection
      eyebrow="Now in open beta"
      eyebrowHref="#changelog"
      headline="Analytics that answer"
      headlineAccent="the question you meant."
      description="Ask in plain language, get the chart you were about to build by hand. Connected to your warehouse in a single step."
      primaryLabel="Connect your data"
      secondaryLabel="See a live board"
      bullets={[
        { label: "Works with Postgres, Snowflake, BigQuery" },
        { label: "SOC 2 Type II" },
      ]}
      proofText="Loved by 4,200+ data teams"
      rating={5}
    />
  );
}

export default HeroSectionDemo;
