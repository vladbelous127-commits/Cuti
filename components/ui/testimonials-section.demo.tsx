import { TestimonialsSection, type Testimonial } from "./testimonials-section";

export function TestimonialsSectionDemo() {
  return <TestimonialsSection />;
}

const THREE_UP: Testimonial[] = [
  {
    id: "a",
    quote:
      "I inherited a codebase with four years of drift and no tests. Two weeks later we had a green pipeline and I could finally sleep.",
    name: "Sofia Marchetti",
    role: "Engineering Manager, Kestrel",
    rating: 5,
    verified: true,
  },
  {
    id: "b",
    quote:
      "The onboarding did not try to sell me anything. It just got out of the way and let me import my data.",
    name: "Daniel Achebe",
    role: "Founder, Sablefish",
    rating: 4,
  },
  {
    id: "c",
    quote: "Cheaper than the thing it replaced and better at the one job I actually needed.",
    name: "Hanna Lindqvist",
    role: "Operations, Vantage",
    rating: 5,
    verified: true,
  },
];

export function TestimonialsSectionThreeUpDemo() {
  return (
    <TestimonialsSection
      heading="Don't take our word for it"
      description="Three customers, no cherry-picking on rating."
      testimonials={THREE_UP}
      aggregateScore={4.6}
      aggregateCount={318}
      aggregateNoun="reviews this quarter"
    />
  );
}

export function TestimonialsSectionNoAggregateDemo() {
  return (
    <TestimonialsSection
      heading="What people tell us"
      description="No score, no star ratings — just the quotes."
      testimonials={THREE_UP.map(({ rating: _rating, verified: _verified, ...rest }) => rest)}
      aggregateScore={null}
    />
  );
}

export default TestimonialsSectionDemo;
