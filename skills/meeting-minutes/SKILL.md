---
name: meeting-minutes
description: Turn meeting notes, transcripts, or recordings into structured minutes with decisions, action items, and owners. Use this whenever the user shares meeting notes or a transcript, mentions minutes, meeting summary, action items, or says "what did we decide" or "summarize this call."
---

# Meeting Minutes

Convert raw meeting material into a record people actually use: decisions made, actions owned, and open questions — not a play-by-play of who said what.

## Workflow

1. **Ingest whatever exists.** Transcript, rough notes, chat log, or the user's verbal recap. Note the meeting title, date, and attendees if present; ask only if the record will be shared formally and they're missing.
2. **Extract in priority order:**
   1. **Decisions** — anything the group settled. Write as flat statements ("Ship v2 on March 3 without the export feature"), each with who decided if it was contentious.
   2. **Action items** — verb-first, one owner (a name, never "the team"), and a due date. If the source has no date, mark `due: TBC` rather than inventing one.
   3. **Open questions / parked items** — raised but unresolved, so they don't silently vanish.
   4. **Key context** — a maximum of 5 bullets of discussion summary that explain *why* the decisions were made. Resist transcribing debate.
3. **Resolve ambiguity honestly.** Where the transcript is unclear about a decision or owner, flag it (`[unclear — confirm: did we approve the budget or just the plan?]`) instead of picking an interpretation. Wrong minutes are worse than incomplete ones.
4. **Format for the destination.** Default: Markdown for email/Slack. Adjust tone for formal board minutes (fuller sentences, motions/approvals noted) vs. team standups (terse).

## Output format

```
# [Meeting] — [date]
Attendees: ...

## Decisions
1. ...

## Action items
| # | Action | Owner | Due |

## Open questions
- ...

## Discussion notes
- (≤5 bullets)
```

## Quality bar

- Every action item passes the Monday test: the owner reading it cold on Monday knows exactly what to do.
- Attribute sparingly — record disagreement outcomes, not arguments.
- Whole document readable in under 2 minutes; long meetings compress, they don't sprawl.
