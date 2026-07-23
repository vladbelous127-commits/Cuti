---
name: sop-writer
description: Document business processes as standard operating procedures (SOPs), runbooks, and how-to guides a new hire could follow. Use this whenever the user mentions SOPs, documenting a process, process documentation, runbooks, training documentation, or says "write down how we do X" or "so anyone can do this."
---

# SOP Writer

Turn how-one-person-does-it into a procedure anyone can execute to the same standard. The test of an SOP: a competent new hire completes the task correctly without asking questions.

## Workflow

1. **Extract the process.** From the user's description, files, or a short interview, capture: the trigger (when does this process start), the end state (how do you know it's done and done well), the actor (which role), tools/access needed, and frequency. If the user describes steps out of order or skips "obvious" ones, reconstruct the true sequence and confirm.
2. **Write steps at execution altitude.** Each step is one action by one person with one verifiable result. "Update the spreadsheet" is too high; "click cell B2" is too low; "In the Orders sheet, set the Status column to 'Shipped' for each order in today's batch" is right. Include the *why* for any step people will be tempted to skip — unexplained steps get dropped within months.
3. **Handle the branches.** Real processes have exceptions. Add a decision point wherever the path forks ("If the refund exceeds $200 → escalate to manager, see step 9"), and an explicit "when to stop and ask" rule — SOPs fail most expensively when people improvise on edge cases.
4. **Add the metadata block.** Owner (role, not name), last-reviewed date, review cadence, systems/permissions required, and estimated time to complete.
5. **Finish with the checklist.** Condense the SOP into a copy-pasteable checklist version at the end — experienced operators use the checklist; the full text is for training and disputes.

## Output format

```
# SOP: [Process name]
Owner: [role] | Last reviewed: [date] | Time: ~X min | Frequency: ...
Trigger: ... | Done means: ...
Prerequisites: [access, tools]

## Steps
1. [Action] — [expected result]. (Why: ... if non-obvious)
2. ...
   ⚠ If [exception] → [action]

## When to stop and escalate
- ...

## Quick checklist
- [ ] ...
```

## Quality bar

- Numbered steps, imperative voice, no "should/could/typically."
- Screenshots/links referenced by placeholder where the user can add them; never pretend a screenshot exists.
- Every acronym expanded on first use — the reader is new.
