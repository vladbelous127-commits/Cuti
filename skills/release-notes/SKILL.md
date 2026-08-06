---
name: release-notes
description: Write release notes, changelogs, and product update announcements from commits, tickets, or feature lists. Use this whenever the user mentions release notes, a changelog, "what's new" content, product update emails, or shipping announcements — including turning a commit log or ticket dump into customer-facing text.
---

# Release Notes

Translate what engineering shipped into what customers gained. The same release usually needs two artifacts — a scannable changelog entry and, for bigger releases, an announcement — both written from the user's point of view, not the ticket titles.

## Workflow

1. **Ingest and classify the raw material.** From commits, PR titles, tickets, or a feature list: bucket into New, Improved, Fixed, Deprecated/Breaking, Security. Discard internal-only items (refactors, CI changes) unless they have a visible effect (faster load times count; "migrated to Postgres 16" doesn't, "2× faster exports" does).
2. **Rewrite each item benefit-first.** Formula: what you can now do → brief how/where → who it's for if scoped. "Export any report to CSV from the share menu" beats "Added CSV export functionality." Fixed bugs get described by the symptom users saw ("Fixed: dashboards no longer blank after login timeout"), never by the internal cause.
3. **Order by impact, not chronology.** Lead with the item most users will care about. Breaking changes and deprecations go in a clearly marked block near the top with dates and migration steps — burying a breaking change is the cardinal sin of release notes.
4. **Match the format to the channel:**
   - **Changelog** (docs/in-app): dated heading, version if used, grouped bullets, links to docs per major item.
   - **Announcement email/blog** (for headline features): a hook naming the customer problem, 2–3 short paragraphs on the main feature with a screenshot placeholder, "also in this release" bullet list, CTA to try it.
   - **In-app/social blurb**: 1–2 sentences per headline feature, under 200 characters where possible.
5. **Add the credits and caveats.** Rollout notes (gradual rollout? plan-gated?), known issues if any, and thank-you credits for customer-reported bugs where the user's culture does that.

## Output format

Deliver the changelog entry by default; add the announcement version when the release contains at least one headline feature. Use `[SCREENSHOT: ...]` and `[DOCS LINK]` placeholders.

## Quality bar

- Zero internal jargon: no ticket numbers, service names, or "various improvements" (list them or cut them).
- Every entry answers "so what?" for a customer in the first clause.
- Breaking changes include: what breaks, who's affected, what to do, and by when.
