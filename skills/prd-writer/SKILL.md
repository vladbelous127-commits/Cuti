---
name: prd-writer
description: Write product requirements documents (PRDs), feature specs, and one-pagers — problem definition, user stories, scope, success metrics, and edge cases. Use this whenever the user mentions a PRD, product spec, feature spec, requirements doc, or wants to define what to build before building it.
---

# PRD Writer

Write a PRD that aligns a team on the problem and the definition of done — while leaving the *how* to the people building it. A PRD's quality is measured by the arguments it prevents.

## Workflow

1. **Nail the problem before the solution.** Extract: who has the problem (specific segment, not "users"), evidence it's real (data, quotes, support tickets — cite what the user provides, flag when evidence is thin), the cost of not solving it, and why now. If the user leads with a solution ("we need a dashboard"), work backward to the underlying problem and record both.
2. **Define success measurably.** 1 primary metric with current baseline and target, plus guardrail metrics that must not regress (e.g., ship the onboarding change, but activation must not drop). "Improve UX" is not a metric; "reduce time-to-first-report from 12 min to 3" is.
3. **Scope with stories and sharp edges.**
   - User stories or job stories for each capability, each with acceptance criteria testable by QA without asking anyone.
   - **Out of scope** section, explicit — the most-skipped, most-valuable section in any PRD; scope disputes are settled here in advance.
   - Phasing: what's in the smallest shippable version vs. fast-follow.
4. **Sweep the edges.** Cover the states everyone forgets: empty state, error states, loading, permissions/roles, mobile, i18n if relevant, data migration for existing users, and rollback plan. A one-line answer per applicable edge beats discovering them in code review.
5. **Round out the operational sections.** Open questions (with owners and needed-by dates), dependencies, launch checklist stub (docs, support training, announcement), and stakeholders with their role (approver/consulted/informed).

## Output format

```
# PRD: [Feature] — v0.x (status: draft)
Owner: ... | Eng lead: ... | Target: ...
## Problem  (who, evidence, cost of inaction, why now)
## Goals & success metrics  (primary + guardrails, baseline → target)
## Non-goals / out of scope
## Requirements  (stories with acceptance criteria, P0/P1 tags)
## Edge cases & states
## Open questions  | Q | Owner | Needed by |
## Dependencies & risks
## Launch checklist
```

## Quality bar

- Problem section contains zero solution language; requirements contain zero implementation mandates unless a genuine constraint.
- Every P0 story's acceptance criteria are binary — pass or fail, no judgment calls.
- One page of context, then structure; a PRD nobody finishes reading aligns nobody.
