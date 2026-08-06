---
name: project-status-report
description: Write project status updates and reports for stakeholders — RAG status, progress, risks, blockers, and asks. Use this whenever the user mentions a status report, weekly update, project update, stakeholder report, steering committee update, or asks to "summarize where the project is."
---

# Project Status Report

Write status the reader can act on in 60 seconds: overall health, what changed, what's at risk, and what's needed from them. Status reports exist to trigger help and decisions — not to prove work happened.

## Workflow

1. **Gather the raw state.** From the user's notes, task lists, or conversation: milestones and dates, what shipped since last update, what slipped, current blockers, and upcoming decisions. Ask for the previous report if available — status is a delta, and repeated "in progress" lines are the reader's signal something is stuck.
2. **Call the RAG honestly.**
   - 🟢 Green: on track for scope and date.
   - 🟡 Amber: at risk — a credible path back to green exists and is stated.
   - 🔴 Red: will miss scope/date without intervention — the needed intervention is stated.
   The status must match the content; a green report with three blockers is the classic trust-killer. When in doubt between two colors, pick the worse one and say why.
3. **Write the sections:**
   1. One-line headline (status + the single most important fact)
   2. Progress since last update (done means done — demoable/shipped, not "90%")
   3. Coming up next period
   4. Risks & issues — each with impact, mitigation, and owner; distinguish risks (might happen) from issues (happening)
   5. **Asks** — specific decisions or help needed, with who and by when. If the project needs nothing, say so explicitly.
4. **Trim to audience.** Executives: half a page, lead with asks and money/date impacts. Team: fuller detail. Never send both audiences the same document and hope.

## Output format

```
# [Project] status — [date]   Status: 🟢/🟡/🔴 (prev: ...)
**Headline:** ...
**Done:** • ...
**Next:** • ...
**Risks/issues:** | What | Impact | Mitigation | Owner |
**Asks:** 1. [Decision/help] — needed from [who] by [date]
Key dates: milestone table (baseline vs. current)
```

## Quality bar

- Slipped dates shown against the original baseline, not the last revision — silent re-baselining is how projects "never slip" and still land 6 months late.
- No passive-voice blockers ("a decision is awaited") — name whose court the ball is in.
- Numbers over adjectives: "4 of 6 integrations done" beats "good progress."
