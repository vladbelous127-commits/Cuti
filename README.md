# Cuti — Business Skills Pack for Claude Code

34 original, business-focused [Agent Skills](https://code.claude.com/docs/en/skills) for Claude Code, covering the documents and analyses a business runs on: marketing campaigns, sales proposals, cash flow forecasts, SOPs, hiring kits, PRDs, OKRs, KPI reports, and more.

Each skill is a self-contained `SKILL.md` that teaches Claude a repeatable workflow, an output format, and a quality bar — so results are consistent instead of improvised.

## Installation

**Option A — as a plugin (recommended):**

```
/plugin marketplace add vladbelous127-commits/Cuti
/plugin install business-skills-pack@cuti-skills
```

**Option B — personal skills (available in every project):**

```bash
cp -r skills/* ~/.claude/skills/
```

**Option C — project skills (this project only):**

```bash
mkdir -p .claude/skills && cp -r skills/* .claude/skills/
```

Skills trigger automatically when your request matches their description — just ask naturally ("write a cold email sequence for CFOs", "turn these notes into meeting minutes").

## Skill catalog

### Marketing & Communications
| Skill | What it does |
|---|---|
| [marketing-email-campaign](skills/marketing-email-campaign/SKILL.md) | Email campaigns and drip sequences with subject lines, send plans, and metrics |
| [seo-content-brief](skills/seo-content-brief/SKILL.md) | SEO briefs: keywords, intent, outline, meta tags, internal links |
| [social-media-calendar](skills/social-media-calendar/SKILL.md) | Content calendars with publishable per-platform post copy |
| [landing-page-copy](skills/landing-page-copy/SKILL.md) | Full landing page copy in conversion order, hero to FAQ |
| [press-release](skills/press-release/SKILL.md) | Inverted-pyramid press releases plus journalist pitch emails |

### Sales
| Skill | What it does |
|---|---|
| [cold-outreach-sequence](skills/cold-outreach-sequence/SKILL.md) | Cold email + LinkedIn sequences with personalization slots |
| [sales-proposal](skills/sales-proposal/SKILL.md) | Proposals, quotes, and SOWs with three-option pricing |
| [discovery-call-prep](skills/discovery-call-prep/SKILL.md) | One-page call prep: research, question track, objections, close |

### Finance
| Skill | What it does |
|---|---|
| [budget-variance-report](skills/budget-variance-report/SKILL.md) | Budget vs. actuals with materiality filtering and driver narrative |
| [cash-flow-forecast](skills/cash-flow-forecast/SKILL.md) | 13-week cash forecasts, runway, and what-if scenarios |
| [pricing-strategy](skills/pricing-strategy/SKILL.md) | Price points, tier design, discount guardrails, validation plans |
| [invoice-and-quote](skills/invoice-and-quote/SKILL.md) | Complete invoices and quotes with correct tax and terms handling |
| [business-case](skills/business-case/SKILL.md) | ROI justifications with conservative benefits and sensitivity analysis |

### Operations
| Skill | What it does |
|---|---|
| [sop-writer](skills/sop-writer/SKILL.md) | SOPs a new hire could follow, with exceptions and checklists |
| [meeting-minutes](skills/meeting-minutes/SKILL.md) | Decisions, action items, and owners from notes or transcripts |
| [project-status-report](skills/project-status-report/SKILL.md) | Honest RAG status reports with explicit asks |
| [vendor-comparison](skills/vendor-comparison/SKILL.md) | Weighted decision matrices with 3-year TCO |

### People & HR
| Skill | What it does |
|---|---|
| [job-description](skills/job-description/SKILL.md) | Job postings with outcome-based responsibilities and inclusive language |
| [interview-kit](skills/interview-kit/SKILL.md) | Structured interview loops: questions, rubrics, debrief protocol |
| [onboarding-plan](skills/onboarding-plan/SKILL.md) | 30/60/90 plans with owners, checkpoints, and ramp goals |
| [performance-review-prep](skills/performance-review-prep/SKILL.md) | Evidence-based reviews, self-assessments, and feedback phrasing |

### Product
| Skill | What it does |
|---|---|
| [prd-writer](skills/prd-writer/SKILL.md) | PRDs with measurable success criteria, scope, and edge cases |
| [user-research-synthesis](skills/user-research-synthesis/SKILL.md) | Interview and feedback synthesis into evidence-backed insights |
| [release-notes](skills/release-notes/SKILL.md) | Customer-facing changelogs and announcements from commits or tickets |

### Customer Success & Support
| Skill | What it does |
|---|---|
| [support-macro-library](skills/support-macro-library/SKILL.md) | Help desk reply templates that don't sound like templates |
| [customer-feedback-analysis](skills/customer-feedback-analysis/SKILL.md) | NPS/review/ticket mining into quantified themes and priorities |

### Strategy & Analytics
| Skill | What it does |
|---|---|
| [swot-analysis](skills/swot-analysis/SKILL.md) | Evidence-backed SWOT with TOWS moves and real recommendations |
| [competitor-analysis](skills/competitor-analysis/SKILL.md) | Competitive landscapes and sales battle cards, sourced and dated |
| [okr-planner](skills/okr-planner/SKILL.md) | OKRs with outcome key results, alignment maps, and cadence |
| [kpi-report](skills/kpi-report/SKILL.md) | Metric selection and business reviews with driver narratives |
| [survey-analysis](skills/survey-analysis/SKILL.md) | Survey design and honest results analysis with segment cuts |
| [executive-summary](skills/executive-summary/SKILL.md) | BLUF one-pagers and board briefs from long documents |
| [pitch-deck-outline](skills/pitch-deck-outline/SKILL.md) | Narrative-first investor and sales decks, slide by slide |
| [contract-review-checklist](skills/contract-review-checklist/SKILL.md) | Plain-English contract risk flags and negotiation points (not legal advice) |

## Anatomy of a skill

Every skill follows the same structure:

```
skills/<skill-name>/
└── SKILL.md
    ├── frontmatter — name + a description that tells Claude when to trigger
    ├── Workflow    — numbered, imperative steps with the reasoning behind them
    ├── Output format — the exact structure of the deliverable
    └── Quality bar — what separates a good result from a generic one
```

## Customizing

These skills are deliberately company-agnostic. To make them yours, edit the `SKILL.md` files to add your brand voice, default currencies and tax treatment, internal tools, and house templates — or add `references/` files next to a `SKILL.md` with your own examples for Claude to follow.

## Disclaimer

Skills that touch legal, tax, or financial territory (contract review, invoicing, pricing, forecasting) produce informational drafts and analyses — not professional legal, tax, or financial advice.
