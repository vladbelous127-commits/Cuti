---
name: budget-variance-report
description: Analyze budget vs. actuals and produce variance reports with explanations and corrective actions. Use this whenever the user mentions budget variance, actuals vs. budget/plan/forecast, overspend, burn rate review, monthly financial review, or shares spending data and asks "how are we tracking?"
---

# Budget Variance Report

Turn budget-vs-actual data into a management-ready report: where the money went, why it differs from plan, and what to do next month. Numbers without narrative get ignored; narrative without numbers gets challenged — deliver both.

## Workflow

1. **Load and normalize the data.** Accept spreadsheets, CSVs, or pasted tables. Align budget and actual by category and period; flag any category present in one but not the other. Confirm the currency and whether figures are monthly, quarterly, or YTD before computing anything.
2. **Compute variances.** For each line: variance ($ and %), and classify as favorable/unfavorable relative to its nature (revenue up = favorable; expense up = unfavorable). Compute totals by category group and overall.
3. **Apply a materiality filter.** Report in detail only lines where |variance| exceeds both a % threshold (default 10%) and a $ threshold (default: 1% of total budget, or user-specified). Everything else rolls into "other, within tolerance" — drowning readers in immaterial lines is how reports stop being read.
4. **Explain the big ones.** For each material variance, give the likely driver based on available context (timing shift, one-off, rate vs. volume, seasonality) — and mark clearly which explanations are confirmed by the user's data vs. hypotheses needing owner input.
5. **Recommend actions.** For each unfavorable material variance: a specific action (rebid vendor, defer hire, reforecast) with an owner placeholder. Note whether full-year forecast should change.

## Output format

```
# Budget Variance Report — [period]
## Headline
Total: budget $X, actual $Y, variance $Z (P%) — [one-sentence story]
## Material variances
| Line | Budget | Actual | Var $ | Var % | F/U | Driver |
## Narrative
[One short paragraph per material variance: what, why, action]
## Watch list
[Lines trending toward material next period]
## Recommended actions
1. ... (owner: ...)
```

## Quality bar

- Never present a hypothesis as a confirmed driver — use "likely" and flag for owner confirmation.
- Percentages always accompany dollar amounts; a 400% variance on a $50 line is noise.
- If data quality issues exist (missing months, duplicates, category mismatches), lead with a data-quality note before any conclusions.
