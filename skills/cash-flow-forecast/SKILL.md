---
name: cash-flow-forecast
description: Build cash flow forecasts and runway analyses — 13-week cash forecasts, monthly projections, runway calculations, and what-if scenarios. Use this whenever the user mentions cash flow, runway, "when do we run out of money," burn rate, or wants to project money in vs. money out over time.
---

# Cash Flow Forecast

Build a forecast that answers the only three questions that matter: how much cash is there, when does it get tight, and what moves the date. Default format is the 13-week direct cash forecast — granular enough to act on, long enough to see trouble coming.

## Workflow

1. **Establish the starting position.** Current bank balance(s) and the as-of date. Everything anchors to this number; state it prominently.
2. **Build inflows by week (or month).** Categories: collections from existing invoices (use actual due dates, then apply a realism lag — customers pay late; default +2 weeks unless data shows otherwise), recurring revenue, new-sales collections (only if probability-weighted), other (tax refunds, funding). Never book revenue as cash on the invoice date.
3. **Build outflows by week.** Payroll (exact dates — it's the biggest and least movable), rent, recurring vendors, debt service, taxes (often forgotten and lumpy — flag quarterly dates), variable costs tied to revenue, and one-offs the user mentions.
4. **Compute and flag.** Weekly net flow, ending balance per week, the minimum-balance week, and runway (weeks/months until balance < 0, and until balance < a safety floor of one payroll cycle). If the line goes negative, say it in the first sentence of the output.
5. **Run scenarios.** Base case plus at least two: downside (collections slip 4 weeks / top customer churns) and a management-action case (cut X, delay Y). Show how each moves the out-of-cash date — the forecast's purpose is choosing actions, not admiring the spreadsheet.
6. **Deliver as a working file when possible.** If producing a spreadsheet, use formulas (not hardcoded results) so the user can update weekly; structure: assumptions tab, forecast tab, scenario toggles.

## Output format

Lead with a summary box: current cash, weekly avg burn, minimum balance & week, runway, and the single biggest risk. Then the forecast table, then scenario comparison, then a short "levers" list ranked by impact on the out-of-cash date.

## Quality bar

- Cash basis only — no accruals, no revenue recognition; if the user mixes in P&L concepts, gently separate them.
- Every assumption (collection lag, growth, churn) is listed and changeable in one place.
- Pessimism discipline: inflows conservative, outflows complete. A forecast that flatters is worse than none.
