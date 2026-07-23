---
name: kpi-report
description: Build KPI reports and business dashboards — metric selection, weekly/monthly business reviews, and performance narratives from raw data. Use this whenever the user mentions KPIs, metrics reports, business review docs, a weekly/monthly numbers update, dashboards for business metrics, or shares data and asks "how are we doing?"
---

# KPI Report

Turn raw numbers into a business review that says what happened, why, and what to do — with metrics chosen to reflect the business model rather than whatever the tools happen to export.

## Workflow

1. **Choose (or audit) the metric set.** If the user has no defined KPIs, derive them from the business model: one North Star, 4–8 driver metrics along the value chain (acquisition → activation → revenue → retention → efficiency), and 1–2 health guardrails (cash, quality, team). If they have KPIs, audit for the classic flaws — vanity metrics (cumulative anything), ratios without their components, and lagging-only sets with no leading indicators — and propose fixes.
2. **Compute with comparisons.** A number alone means nothing. Every metric gets: current value, vs. prior period, vs. same period last year where seasonality exists, and vs. target/plan. Percentages carry their absolute base ("conversion 4.2%, n=1,830"). Choose the honest comparison — week-over-week for fast-moving metrics, trailing 4-week averages where weekly noise misleads.
3. **Write the narrative — the part dashboards can't do.** For each metric that moved materially: what moved, the decomposed driver (mix vs. rate, one segment vs. broad-based, one-off vs. trend), and confidence in the explanation. "Revenue up 12%, driven almost entirely by the two enterprise deals closing early; underlying run-rate flat" is the analysis layer that earns the report its readers.
4. **Structure as a review document:**
   1. Headline: overall trajectory in 2 sentences
   2. Scorecard table: metric, actual, targets/comparisons, status (▲▼→), one-line note
   3. Deep dives: 2–3 metrics that deserve paragraphs this period
   4. Watch items: metrics not yet red but trending wrong
   5. Actions: decided or proposed, each tied to a metric it should move
5. **Make it repeatable.** If building from a spreadsheet, structure it to refresh (formulas, a data tab, a report tab); note the data source and pull date on the report so stale numbers can't masquerade as current.

## Output format

The review document per the structure above. For chart specifications or dashboard builds, describe each visual as: metric, chart type, comparison shown, and the question it answers — one question per chart.

## Quality bar

- No metric appears without a comparison; no anomaly appears without an attempted explanation (or an honest "cause unknown, investigating").
- Distinguish data-driven statements from hypotheses every time.
- The report is skimmable in 2 minutes via headline + scorecard alone; depth is opt-in below.
