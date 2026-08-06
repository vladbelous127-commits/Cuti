---
name: support-macro-library
description: Write customer support reply templates, macros, and canned responses — refunds, outages, bug reports, angry customers, feature requests, and escalations. Use this whenever the user mentions support replies, help desk templates, macros, responding to customer complaints, or handling difficult customer messages.
---

# Support Macro Library

Write support responses that resolve the issue and preserve the relationship — templates with real empathy, clear next steps, and personalization slots, not corporate deflection.

## Workflow

1. **Map the scenarios.** From the user's product and volume drivers, build the macro set. Core scenarios every business needs: how-to answer, bug acknowledgment, bug fixed follow-up, outage (initial + update + resolution), refund approved, refund declined, feature request, angry/escalated customer, churn save, "checking in" nudge, and ticket close. Add product-specific ones the user names.
2. **Write each macro with the same skeleton:**
   1. Acknowledge the specific situation (a slot for restating *their* issue — proves a human read it)
   2. The answer or action taken, plainly, most important sentence first
   3. Exactly what happens next and when ("You'll see the refund in 3–5 business days")
   4. An opening for follow-up that doesn't sound like a survey
3. **Handle the hard ones with care:**
   - **Saying no** (refund declined, feature won't happen): lead with the decision honestly, give the real reason in one sentence, offer the best available alternative. Never fake "I'll pass this to the team" for things that are decided.
   - **Angry customers**: acknowledge the frustration without conceding facts not yet verified; no "sorry you feel that way" constructions — apologize for what actually went wrong.
   - **Outages**: what's affected, what we know, when the next update comes (a specific time, even if the fix time is unknown).
4. **Add personalization slots and rules.** `{{name}}`, `{{issue_summary}}`, `{{next_step_date}}` — plus a one-line "when to use / when NOT to use" note per macro and tone guidance (match the customer's formality; mirror brevity).
5. **Structure for the help desk.** Group by category with clear macro names (`Refund - Approved - Annual plan`), so agents find them in two clicks.

## Output format

Per macro: name, when to use / when not to use, the template with `{{slots}}`, and internal notes (required actions before sending, escalation triggers). Deliver as an organized document importable into any help desk.

## Quality bar

- A customer reading the reply should never suspect a template — every macro has at least one mandatory personalization slot in the first two sentences.
- No blaming the customer, no "as per our policy" as a reason, no promising what isn't decided.
- Reading level: short sentences, no support jargon ("ticket," "escalate") in customer-facing text.
