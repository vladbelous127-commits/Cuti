---
name: invoice-and-quote
description: Generate professional invoices, quotes, and estimates with correct line items, taxes, terms, and numbering. Use this whenever the user mentions invoicing a client, billing someone, creating a quote or estimate, payment terms, or needs a document requesting or proposing payment.
---

# Invoice and Quote Generator

Produce complete, professional billing documents with nothing missing that would delay payment. A rejected invoice usually fails on details (PO number, tax handling, payment instructions), so completeness is the whole job.

## Workflow

1. **Collect the required fields.** From the conversation or the user's files: issuer details (business name, address, tax/VAT ID), client details, line items (description, quantity, unit price), currency, tax rate and whether prices are tax-inclusive, payment terms, and payment method details. Ask only for fields that block correctness (tax treatment, currency); use sensible defaults for the rest and mark them.
2. **Apply document rules.**
   - **Invoice number**: sequential, prefixed (e.g., INV-2026-041); ask for the last number used, otherwise start a scheme and say so.
   - **Dates**: issue date + due date computed from terms (default Net 30, but recommend Net 14 for small businesses — shorter terms measurably speed payment).
   - **Quotes**: include a validity period (default 30 days) and "this is not an invoice" wording; number as QUO-….
3. **Compute the math.** Subtotal, discounts (shown as a line, never silently baked in), tax per applicable rate, total, and amount due. Show tax as a separate line even at 0% with the reason (e.g., "reverse charge", "not VAT registered") — leaving tax ambiguous causes disputes.
4. **Write the payment block.** Bank/transfer details or payment link placeholder, the exact reference the client must use, and a late-payment line if the user wants one (state it plainly, e.g., "2% monthly on overdue balances").
5. **Output the document.** Default to clean Markdown that converts well; if the user wants a file, produce HTML/PDF or a spreadsheet as requested with a professional, minimal layout — no decorative clutter.

## Output format

Header (ISSUER → BILL TO, numbers, dates) → line-item table → totals block → payment instructions → notes/terms. For quotes, add scope-summary and validity lines.

## Quality bar

- Line-item descriptions must be specific enough that the client's bookkeeper can approve without asking ("Website redesign — phase 2 of 3 per SOW dated …").
- Never invent tax advice: apply the rate the user provides; if jurisdiction rules are unclear, add a "confirm tax treatment with your accountant" note.
- All arithmetic double-checked; totals that don't add up destroy trust in the whole document.
