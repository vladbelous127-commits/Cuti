# Cuti — Editable Link-in-Bio Landing Page

A single-file, mobile-first link-in-bio landing page (ranking.bio-style layout) with a
built-in visual editor. No build step, no backend — just open `index.html`.

## Features

- **Profile header** — cover image, avatar with gradient ring + online dot, name with
  verified badge, handle, location pill, and multi-line bio.
- **Social icon row** — Instagram, TikTok, X, YouTube, Telegram, Snapchat, or a generic
  website icon.
- **Link cards** — emoji icon, title, subtitle, and an optional "featured" highlight
  style using the accent color.
- **Edit mode** — click **Edit page** (top right):
  - Click any dashed text (name, handle, location, bio, footer) to edit it inline.
  - Click the cover or avatar to upload an image (stored as a data URL).
  - Add / edit / reorder / feature / delete link cards.
  - Add / change / remove social icons.
  - Pick the accent color.
- **Persistence** — edits auto-save to `localStorage` in your browser.
  **Export / Import JSON** lets you back up or move the page data.
- **Reset** — restore the default placeholder content.

## Run locally

```sh
npx http-server .        # or: python3 -m http.server
```

Then open http://localhost:8080 (or just double-click `index.html`).

## Deploy

It's a static page — host it anywhere (GitHub Pages, Netlify, Vercel, S3, …).
To make your edits permanent for visitors, edit the `DEFAULT_DATA` object near the top
of the `<script>` in `index.html` (or paste in your exported JSON values), since
`localStorage` edits are only visible in the browser where you made them.
