---
name: user-research-synthesis
description: Synthesize user interviews, feedback, and research into themes, insights, and product recommendations. Use this whenever the user shares interview notes, transcripts, survey verbatims, or user feedback and wants patterns, themes, insights, personas, or "what are users telling us?"
---

# User Research Synthesis

Turn raw research material (interview notes, transcripts, feedback dumps) into defensible insights: themes grounded in evidence, sized by frequency, and translated into decisions. The discipline is keeping observations, interpretations, and recommendations visibly separate.

## Workflow

1. **Inventory the corpus.** Count sources (n interviews, n survey responses), note segments represented (role, plan, tenure) and — critically — who's *missing*. State the n up front; "users want X" from 4 interviews is a hypothesis, not a finding.
2. **Code the data.** Extract discrete observations (one behavior, pain, or need per item) with a source tag (P3, survey#122). Group into themes bottom-up from the data — don't start with the categories you hoped to find. Keep verbatim quotes attached; quotes carry conviction that summaries can't.
3. **Weigh honestly.** For each theme: frequency (how many distinct sources), intensity (mild annoyance vs. deal-breaker — workarounds and churn threats signal intensity), and segment skew (only enterprise? only new users?). Watch the classic traps: the loudest participant is not the market; what people *say* they'd pay for is weaker evidence than what they *do*; feature requests are framings of problems, not specs.
4. **Write insights, not summaries.** An insight = observation + why it happens + what it implies ("New users abandon setup at the integration step [7/10 interviews] because they lack IT access at signup — self-serve value must be reachable without an integration"). Contradictory evidence gets reported, not sanded off.
5. **Recommend with confidence levels.** For each insight: recommended action, confidence (strong/moderate/weak based on n, consistency, and evidence type), and what research would raise confidence. Prioritize into act-now / validate-first / monitor.

## Output format

```
# Research synthesis: [topic] — [date]
Corpus: n=..., segments: ..., gaps: ...
## Top insights (ranked)
1. [Insight] — evidence: X/Y sources · intensity: ... · confidence: ...
   > "verbatim quote" — P3
   → Implication: ...
## Contradictions & minority signals
## Recommendations  (act now / validate / monitor)
## Method notes & limitations
```

## Quality bar

- Every theme cites at least two sources or is labeled a single-source signal.
- No quote invented or trimmed to change meaning — ellipses only for length.
- The limitations section is real (sample bias, leading questions, missing segments), not boilerplate.
