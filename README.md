# M.I Tech NG — Agency Website

A premium AI consultancy website for **M.I Tech NG** — an AI-focused
technology company helping businesses automate operations, save time and grow
with Artificial Intelligence.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** and
**Framer Motion**, in a dark luxury theme with green (`#74A432`) accents, gold
(`#C9A227`) highlights and the Poppins typeface.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Design system

- **Colors:** near-black background (`#050505`), brand green `#74A432`, gold
  `#C9A227`, off-white text. Tokens live in `tailwind.config.ts`.
- **Typography:** Poppins via `next/font/google`.
- **Primitives:** buttons, cards, eyebrows and section helpers in
  `src/app/globals.css` and `src/components/ui.tsx`.
- **Motion:** scroll-reveal wrappers in `src/components/Reveal.tsx`
  (respects `prefers-reduced-motion`).

## Pages

Home, About, Founder, Services, AI Solutions, Industries, Workshops,
Portfolio, Case Studies, Resources, Blog (+ posts), Speaking, Gallery,
Roadmap, Contact, and the interactive **AI Discovery Session** lead-gen tool
(`/discovery`).

## Content

All copy and data are centralized and easy to edit:

- `src/lib/site.ts` — brand, navigation, contact and socials
- `src/lib/content.ts` — mission/vision, services, solutions, industries,
  case studies, skills, certifications, roadmap
- `src/lib/library.ts` — workshops, portfolio, blog, resources, testimonials

## SEO

Per-page metadata, Open Graph/Twitter tags, `sitemap.xml`, `robots.txt` and
Organization JSON-LD are all included. See `PORTFOLIO_PLAN.md` for the full
sitemap and build phases.

## Notes

Visual placeholders (`src/components/Placeholder.tsx`) stand in for real
photography and portfolio assets — swap them for `next/image` once real
assets are supplied. Contact and Discovery forms currently handle submission
on the client; wire them to your preferred backend or email service to
capture leads.
