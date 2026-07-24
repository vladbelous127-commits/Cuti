import {
  Bot,
  Workflow,
  Sparkles,
  GraduationCap,
  Palette,
  LineChart,
  Cpu,
  MessageSquare,
  CalendarClock,
  Database,
  FileText,
  Users,
  Receipt,
  Mail,
  Megaphone,
  TrendingUp,
  FileSignature,
  PenLine,
  Share2,
  Mic,
  BookOpen,
  Building2,
  HeartPulse,
  Landmark,
  HandHeart,
  Clapperboard,
  Wallet,
  ShoppingBag,
  Sprout,
  HardHat,
  Home,
  UtensilsCrossed,
  Factory,
  Store,
  type LucideIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Mission / Vision / Values                                          */
/* ------------------------------------------------------------------ */

export const mission =
  "To make Artificial Intelligence practical, accessible and profitable for African businesses — turning everyday operations into automated, intelligent systems that save time and unlock growth.";

export const vision =
  "To become a leading AI consultancy driving digital transformation across Africa, and ultimately a national AI academy building the next generation of AI-fluent talent.";

export const coreValues: { title: string; body: string }[] = [
  {
    title: "Practical AI",
    body: "We focus on solutions that create measurable business impact, not hype.",
  },
  {
    title: "Trust & Integrity",
    body: "We advise honestly, protect client data, and only recommend what genuinely helps.",
  },
  {
    title: "Empowerment",
    body: "We teach and equip teams so AI becomes a lasting capability, not a dependency.",
  },
  {
    title: "Excellence",
    body: "Every deliverable — from strategy to design — is held to an agency standard.",
  },
];

/* ------------------------------------------------------------------ */
/* Services — What We Do                                               */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  points?: string[];
};

export const services: Service[] = [
  {
    slug: "ai-consulting",
    title: "AI Consulting",
    icon: Sparkles,
    summary:
      "Helping businesses understand how AI can increase productivity and where it fits their operations.",
    points: ["AI readiness assessment", "Opportunity mapping", "Roadmaps & ROI"],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    icon: Workflow,
    summary: "Automating repetitive business tasks so teams focus on what matters.",
    points: ["Workflow automation", "System integrations", "Human-in-the-loop design"],
  },
  {
    slug: "prompt-engineering",
    title: "Prompt Engineering",
    icon: Bot,
    summary:
      "Designing powerful prompts for ChatGPT, Claude, Gemini and other AI systems.",
    points: ["Prompt libraries", "Guardrails & testing", "Team playbooks"],
  },
  {
    slug: "ai-training",
    title: "AI Training",
    icon: GraduationCap,
    summary: "Hands-on AI training for organizations and institutions.",
    points: ["Corporate training", "Schools & universities", "Government organizations"],
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    icon: Palette,
    summary: "AI-assisted content across every channel.",
    points: ["Social media", "Video production", "Graphics & marketing"],
  },
  {
    slug: "business-ai-strategy",
    title: "Business AI Strategy",
    icon: LineChart,
    summary: "Helping organizations adopt AI with a clear, staged plan.",
    points: ["Change management", "Tooling selection", "KPIs & governance"],
  },
  {
    slug: "custom-ai-solutions",
    title: "Custom AI Solutions",
    icon: Cpu,
    summary:
      "Connecting businesses with expert developers to build custom AI systems, delivered by M.I Tech.",
    points: ["Solution design", "Developer coordination", "Deployment & support"],
  },
];

/* ------------------------------------------------------------------ */
/* AI Solutions catalogue                                             */
/* ------------------------------------------------------------------ */

export type Solution = { title: string; icon: LucideIcon; desc: string };

export const solutions: Solution[] = [
  { title: "AI Customer Support", icon: MessageSquare, desc: "Always-on support that answers instantly and escalates smartly." },
  { title: "AI Chatbots", icon: Bot, desc: "On-brand assistants for websites, apps and messaging." },
  { title: "WhatsApp Automation", icon: MessageSquare, desc: "Automated enquiries, orders and follow-ups on WhatsApp." },
  { title: "Appointment Booking", icon: CalendarClock, desc: "Self-serve scheduling that syncs with your calendar." },
  { title: "CRM Automation", icon: Database, desc: "Capture, enrich and route leads without manual work." },
  { title: "Document AI", icon: FileText, desc: "Extract, summarize and search across your documents." },
  { title: "HR Automation", icon: Users, desc: "Screening, onboarding and internal Q&A on autopilot." },
  { title: "Invoice Automation", icon: Receipt, desc: "Generate, send and reconcile invoices automatically." },
  { title: "Email Automation", icon: Mail, desc: "Drafting, triage and smart replies at scale." },
  { title: "Marketing Automation", icon: Megaphone, desc: "Campaigns, segmentation and content that runs itself." },
  { title: "Sales Automation", icon: TrendingUp, desc: "Follow-ups, proposals and pipeline hygiene, automated." },
  { title: "Proposal Generator", icon: FileSignature, desc: "Tailored proposals produced in minutes, not hours." },
  { title: "Content Generator", icon: PenLine, desc: "On-brand articles, captions and scripts on demand." },
  { title: "Social Media AI", icon: Share2, desc: "Plan, create and schedule across every platform." },
  { title: "Voice AI", icon: Mic, desc: "Voice assistants and call automation for your business." },
  { title: "Knowledge Base", icon: BookOpen, desc: "A living, searchable brain for your whole company." },
  { title: "Internal Company Assistant", icon: Building2, desc: "A private assistant trained on your policies and data." },
];

/* ------------------------------------------------------------------ */
/* Industries                                                         */
/* ------------------------------------------------------------------ */

export const industries: { name: string; icon: LucideIcon }[] = [
  { name: "Healthcare", icon: HeartPulse },
  { name: "Education", icon: GraduationCap },
  { name: "Government", icon: Landmark },
  { name: "NGOs", icon: HandHeart },
  { name: "Media", icon: Clapperboard },
  { name: "Finance", icon: Wallet },
  { name: "Retail", icon: ShoppingBag },
  { name: "Agriculture", icon: Sprout },
  { name: "Construction", icon: HardHat },
  { name: "Real Estate", icon: Home },
  { name: "Hospitality", icon: UtensilsCrossed },
  { name: "Manufacturing", icon: Factory },
  { name: "Small Businesses", icon: Store },
];

/* ------------------------------------------------------------------ */
/* Case Studies                                                       */
/* ------------------------------------------------------------------ */

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  problem: string;
  action: string;
  tech: string[];
  outcome: string;
  metric: { value: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "whatsapp-customer-assistant",
    title: "Instant WhatsApp customer assistant",
    industry: "Retail",
    problem:
      "A local business wanted faster customer response but was losing enquiries because replies took hours.",
    action:
      "M.I Tech designed an AI-powered WhatsApp assistant that answers customer enquiries instantly, captures orders, and hands off complex cases to a human.",
    tech: ["WhatsApp Business API", "LLM assistant", "CRM integration"],
    outcome:
      "Response time dropped from hours to seconds, and no enquiry goes unanswered — even after hours.",
    metric: { value: "< 5s", label: "avg. response time" },
  },
  {
    slug: "clinic-appointment-automation",
    title: "Automated appointment booking for a clinic",
    industry: "Healthcare",
    problem:
      "A clinic's front desk was overwhelmed with calls, leading to missed bookings and long wait times.",
    action:
      "M.I Tech deployed an AI booking assistant that lets patients schedule, reschedule and get reminders automatically, syncing with the clinic calendar.",
    tech: ["Booking automation", "Calendar sync", "Reminder workflows"],
    outcome:
      "Front-desk call volume fell sharply and no-shows dropped thanks to automated reminders.",
    metric: { value: "40%", label: "fewer no-shows" },
  },
  {
    slug: "sme-content-engine",
    title: "AI content engine for an SME",
    industry: "Small Businesses",
    problem:
      "An SME struggled to stay consistent on social media and produce marketing content on a small budget.",
    action:
      "M.I Tech built an AI-assisted content workflow producing on-brand captions, graphics briefs and a monthly content calendar.",
    tech: ["Prompt engineering", "Content workflow", "Brand system"],
    outcome:
      "The business now publishes consistently every week with a fraction of the previous effort.",
    metric: { value: "4x", label: "more content shipped" },
  },
];

/* ------------------------------------------------------------------ */
/* Skills / Expertise (grouped)                                       */
/* ------------------------------------------------------------------ */

export const skillGroups: { title: string; icon: LucideIcon; skills: string[] }[] = [
  {
    title: "AI & Automation",
    icon: Sparkles,
    skills: [
      "Prompt Engineering",
      "AI Consulting",
      "Workflow Automation",
      "Business Automation",
      "AI Strategy",
      "LLMs",
      "ChatGPT",
      "Claude",
      "Gemini",
      "Cursor",
      "AI Agents",
    ],
  },
  {
    title: "Business",
    icon: LineChart,
    skills: [
      "Business Development",
      "Sales",
      "Project Management",
      "Client Discovery",
      "Requirements Gathering",
      "Digital Transformation",
      "Solution Design",
    ],
  },
  {
    title: "Creative",
    icon: Palette,
    skills: [
      "Brand Strategy",
      "Graphic Design Direction",
      "Presentation Design",
      "Content Strategy",
      "Video Production",
      "Photography Direction",
    ],
  },
  {
    title: "Marketing",
    icon: Megaphone,
    skills: [
      "Digital Marketing",
      "Personal Branding",
      "Lead Generation",
      "Social Media Strategy",
      "Copywriting",
    ],
  },
  {
    title: "Technical",
    icon: Cpu,
    skills: [
      "Website Planning",
      "Automation Platforms",
      "API Integrations",
      "No-Code Tools",
      "AI Deployment",
      "Developer Coordination",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Certifications                                                     */
/* ------------------------------------------------------------------ */

export const certifications: { name: string; issuer: string }[] = [
  { name: "CS50", issuer: "Harvard" },
  { name: "Certified Professional", issuer: "Google" },
  { name: "Certified Professional", issuer: "Microsoft" },
  { name: "AI & Data", issuer: "IBM" },
  { name: "Deep Learning", issuer: "DeepLearning.AI" },
  { name: "AI Fluency", issuer: "Anthropic" },
  { name: "Applied AI", issuer: "OpenAI" },
  { name: "Prompt Engineering", issuer: "Certification" },
];

/* ------------------------------------------------------------------ */
/* Founder                                                            */
/* ------------------------------------------------------------------ */

export const founderRoles = [
  "Computer Science",
  "Prompt Engineering",
  "AI Consultant",
  "Workshop Speaker",
  "Automation Consultant",
  "Digital Transformation Advocate",
];

/* ------------------------------------------------------------------ */
/* Roadmap                                                            */
/* ------------------------------------------------------------------ */

export const roadmap: { year: string; title: string; body: string }[] = [
  { year: "2026", title: "AI Consultancy", body: "Establish M.I Tech as a trusted AI consultancy for Nigerian businesses and institutions." },
  { year: "2027", title: "Corporate AI", body: "Scale corporate AI training and automation across larger organizations." },
  { year: "2028", title: "National AI Academy", body: "Launch a national AI academy building AI-fluent talent at scale." },
  { year: "2029", title: "African AI Company", body: "Expand operations and partnerships across the African continent." },
  { year: "2030", title: "Global Expansion", body: "Take proven African AI playbooks to a global market." },
];

/* ------------------------------------------------------------------ */
/* Stats                                                              */
/* ------------------------------------------------------------------ */

export const stats: { value: string; label: string }[] = [
  { value: "7+", label: "Core services" },
  { value: "17", label: "AI solutions" },
  { value: "13", label: "Industries served" },
  { value: "2026", label: "Building since" },
];
