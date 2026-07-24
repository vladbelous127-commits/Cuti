/* Workshops, Portfolio, Blog, Resources, Testimonials, Speaking, Gallery */

export type Workshop = {
  title: string;
  audience: string;
  status: "Delivered" | "Upcoming" | "Available";
  desc: string;
};

export const workshops: Workshop[] = [
  {
    title: "AI Fluency Workshop",
    audience: "Corporate & general",
    status: "Delivered",
    desc: "A flagship hands-on workshop teaching teams how to use AI tools productively and responsibly in day-to-day work.",
  },
  {
    title: "Corporate AI Training",
    audience: "Businesses",
    status: "Available",
    desc: "Tailored, role-specific AI training that turns everyday staff into confident, effective AI users.",
  },
  {
    title: "AI for Secondary Schools",
    audience: "Secondary Schools",
    status: "Available",
    desc: "Age-appropriate sessions introducing students to AI, prompt writing and responsible use.",
  },
  {
    title: "AI for Universities",
    audience: "Universities",
    status: "Available",
    desc: "Deep-dive sessions on AI tooling, prompt engineering and career readiness for students.",
  },
  {
    title: "Government Agency Briefings",
    audience: "Government Agencies",
    status: "Available",
    desc: "Executive briefings on how AI can improve service delivery and internal operations.",
  },
];

export const workshopHighlights = [
  "Photos & certificates",
  "Engaged audiences",
  "Testimonials",
  "Sponsors & partners",
];

export type PortfolioItem = {
  title: string;
  category: string;
  desc: string;
};

export const portfolioCategories = [
  "Branding",
  "Print",
  "Publications",
  "Events",
  "Identity",
  "Social",
];

export const portfolioItems: PortfolioItem[] = [
  { title: "AI Fluency Branding", category: "Branding", desc: "Full visual identity for the AI Fluency workshop series." },
  { title: "Roll-up Banners", category: "Print", desc: "Event banners and stands for workshops and speaking." },
  { title: "Flyers", category: "Print", desc: "Promotional flyers for events and training programs." },
  { title: "Prompt Book", category: "Publications", desc: "A designed, practical prompt handbook for attendees." },
  { title: "Certificates", category: "Print", desc: "Branded completion certificates for workshop participants." },
  { title: "Business Cards", category: "Identity", desc: "Premium business card design for the M.I Tech brand." },
  { title: "Workshop Branding", category: "Events", desc: "Cohesive event branding across signage and slides." },
  { title: "Event Designs", category: "Events", desc: "Stage, backdrop and presentation design for events." },
  { title: "Logo Projects", category: "Identity", desc: "Logo design and brand marks for clients and initiatives." },
  { title: "Social Media Designs", category: "Social", desc: "Templated, on-brand social content systems." },
  { title: "Corporate Identity", category: "Identity", desc: "End-to-end corporate identity systems." },
  { title: "Presentation Decks", category: "Publications", desc: "Investor and training decks with agency polish." },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The AI Fluency workshop completely changed how our team thinks about everyday tools. We're faster and more confident.",
    name: "Workshop Participant",
    role: "Corporate Team Lead",
  },
  {
    quote:
      "M.I Tech helped us see exactly where AI could save us time. Clear, practical and no hype.",
    name: "Business Owner",
    role: "SME, Retail",
  },
  {
    quote:
      "Professional, patient and deeply knowledgeable. Our students were engaged from start to finish.",
    name: "Educator",
    role: "Secondary School",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "top-ai-tools-for-nigerian-businesses",
    title: "Top AI Tools for Nigerian Businesses",
    excerpt:
      "A practical roundup of the AI tools that deliver real value for Nigerian businesses today — and how to start using them.",
    category: "AI Tools",
    date: "2026-01-15",
    readTime: "6 min",
  },
  {
    slug: "how-ai-can-help-smes",
    title: "How AI Can Help SMEs",
    excerpt:
      "Small and medium businesses have the most to gain from AI. Here's where to focus first for the biggest wins.",
    category: "Business",
    date: "2026-02-02",
    readTime: "5 min",
  },
  {
    slug: "prompt-engineering-guide",
    title: "Prompt Engineering Guide",
    excerpt:
      "A beginner-friendly guide to writing prompts that get consistent, high-quality results from ChatGPT, Claude and Gemini.",
    category: "Prompt Engineering",
    date: "2026-02-20",
    readTime: "8 min",
  },
  {
    slug: "ai-in-healthcare",
    title: "AI in Healthcare",
    excerpt:
      "From patient support to appointment automation, here's how AI is quietly transforming healthcare operations.",
    category: "Industry",
    date: "2026-03-10",
    readTime: "6 min",
  },
  {
    slug: "future-of-ai",
    title: "The Future of AI",
    excerpt:
      "Where AI is heading over the next five years — and what businesses should do now to stay ahead.",
    category: "Insights",
    date: "2026-03-28",
    readTime: "7 min",
  },
];

export type Resource = {
  title: string;
  type: string;
  desc: string;
};

export const resources: Resource[] = [
  { title: "Free Prompt Book", type: "PDF", desc: "A practical collection of prompts you can use with any AI system today." },
  { title: "AI Guides", type: "Guide", desc: "Step-by-step guides to adopting AI in your business." },
  { title: "Business AI Checklists", type: "Checklist", desc: "Simple checklists to find automation opportunities fast." },
  { title: "Getting Started with AI", type: "PDF", desc: "A beginner's roadmap to using AI without the jargon." },
];

export const speakingTopics = [
  "AI Fluency Workshop",
  "AI for Schools",
  "AI for Government",
  "Youth Programs",
  "Corporate Events",
  "Universities",
];

export const galleryCategories = [
  "Speaking",
  "Networking",
  "Events",
  "Behind the Scenes",
  "Workstation",
  "Office",
];
