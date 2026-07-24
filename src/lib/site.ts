export const site = {
  name: "M.I Tech NG",
  legalName: "M.I Tech NG",
  tagline: "AI & Automation Solutions for Modern Businesses",
  description:
    "M.I Tech NG is an AI-focused technology company helping businesses, organizations and entrepreneurs leverage Artificial Intelligence to improve productivity, automate repetitive work and unlock new opportunities.",
  url: "https://mitechng.com",
  email: "hello@mitechng.com",
  phone: "+234 000 000 0000",
  whatsapp: "https://wa.me/2340000000000",
  location: "Nigeria",
  founder: "Mustapha Ibrahim",
  socials: {
    whatsapp: "https://wa.me/2340000000000",
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    facebook: "https://www.facebook.com/",
  },
};

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "AI Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Workshops", href: "/workshops" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About M.I Tech", href: "/about" },
      { label: "Meet the Founder", href: "/founder" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Speaking", href: "/speaking" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "What We Do",
    items: [
      { label: "Services", href: "/services" },
      { label: "AI Solutions", href: "/solutions" },
      { label: "Industries", href: "/industries" },
      { label: "Workshops", href: "/workshops" },
    ],
  },
  {
    title: "Proof",
    items: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Resources", href: "/resources" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: "Book a Discovery Session", href: "/discovery" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
