---
name: seo-content-brief
description: Build SEO content briefs and outlines for blog posts and landing pages — target keyword, search intent, heading structure, internal links, meta tags. Use this whenever the user mentions SEO, ranking on Google, keywords, organic traffic, a content brief, or asks for a blog post that should "get found" or "rank", even if they just say "write a blog post about X."
---

# SEO Content Brief

Turn a topic into a brief a writer (or Claude itself) can execute without guessing: keyword focus, intent, structure, and on-page requirements.

## Workflow

1. **Define the target query.** Take the user's topic and phrase it as the primary keyword a searcher would type. List 3–5 secondary keywords (variants, long-tail questions). If the user gave a keyword list, use theirs verbatim.
2. **Classify search intent.** Label it informational, commercial, transactional, or navigational — and let that drive the format (guide vs. comparison vs. product page). A mismatch between intent and format is the most common reason content fails to rank.
3. **Design the outline.** Produce an H1 and a full H2/H3 skeleton. Each heading gets one line describing what the section must cover. Front-load the answer: the primary question should be answered within the first 150 words.
4. **Specify on-page elements.**
   - Title tag (under 60 characters, keyword near the front)
   - Meta description (under 155 characters, includes a reason to click)
   - URL slug (short, hyphenated, keyword-bearing)
   - Suggested internal links (from the user's site if known, otherwise placeholders with anchor-text suggestions)
   - Image/alt-text suggestions
5. **Set the bar.** Recommend a word-count range based on intent (how-to guides 1,200–2,000; comparisons 1,500+; simple answers 600–900), reading level, and 2–3 questions to answer in an FAQ section for featured-snippet potential.

## Output format

```
# Content Brief: [working title]
Primary keyword: ...   Intent: ...
Secondary keywords: ...

Title tag: ...
Meta description: ...
Slug: /...

## Outline
H1: ...
  H2: ... — [what it covers]
    H3: ...
...

## Requirements
- Word count: ...
- FAQ questions: ...
- Internal links: ...
- Images/alt text: ...
```

## Quality bar

- Never stuff keywords; each secondary keyword appears where it naturally fits in the outline.
- The outline must be answerable — if a section can't be written without data the user doesn't have, flag it in the brief.
- If asked to also write the article, write it from the brief and check every on-page element off before finishing.
