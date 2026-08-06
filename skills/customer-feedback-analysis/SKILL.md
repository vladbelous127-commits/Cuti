---
name: customer-feedback-analysis
description: Analyze customer feedback at scale — NPS verbatims, reviews, support tickets, survey comments — into themes, sentiment, and prioritized fixes. Use this whenever the user shares customer feedback data, mentions NPS, CSAT, reviews analysis, voice of customer, or asks "what are customers complaining about?"
---

# Customer Feedback Analysis

Mine a feedback corpus (NPS comments, app reviews, tickets, survey verbatims) for the themes that matter, quantified and tied to business impact — so "what customers say" becomes "what we fix first."

## Workflow

1. **Profile the dataset.** Source(s), time range, volume, and any score attached (NPS 0–10, star rating). Note representation bias up front: reviews over-represent extremes; support tickets over-represent breakage; neither represents the silent middle. Analysis without this caveat overclaims.
2. **Classify each item** on two axes:
   - **Theme**: build the taxonomy bottom-up from the data (pricing, onboarding, performance, missing feature X, support experience, …), keeping an "other" under 10% by splitting themes as needed.
   - **Sentiment**: negative / neutral / positive per item — and for scored data, use the score bands (NPS: detractor 0–6, passive 7–8, promoter 9–10) rather than re-guessing sentiment.
   For large datasets, write a classification script or process in batches; keep item→theme mappings so counts are auditable.
3. **Quantify and cross-cut.** Theme frequency overall and within detractors specifically (detractor themes are the churn signal), trend vs. prior period if data allows, and segment splits the user cares about (plan, platform, tenure). One number per theme the user can repeat in a meeting: "22% of detractors cite import failures."
4. **Extract the gold.** 2–3 verbatim quotes per top theme (the most articulate, not the angriest), any brilliant-idea outliers, and churn-threat items needing individual follow-up — flag those separately as urgent.
5. **Prioritize into action.** Rank themes by frequency × severity × addressability. For each top theme: recommended action, effort guess (S/M/L), and the metric that should move if fixed. Separate "fix the product" items from "fix the expectation" items (messaging/docs) — half of feedback pain is mismatched expectations.

## Output format

```
# Feedback analysis: [source, period]  n=..., overall: [NPS/avg rating + trend]
## Top themes
| Theme | % overall | % of detractors | Trend | Severity |
## Theme deep-dives  (per top-5 theme: summary, quotes, recommended action)
## Urgent individual follow-ups
## Priority recommendations (ranked)
## Method & caveats
```

## Quality bar

- Every percentage traceable to countable items; no vibes-based "many customers."
- Quotes verbatim, anonymized (strip names/emails), never stitched together.
- State what the data *can't* say (non-response bias, small segment n) before the recommendations.
