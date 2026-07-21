# Cuti — Company Website

A fast, dependency-free static website for Cuti, responsive across mobile and desktop.
Design language inspired by modern Japanese corporate sites (case study: otsuka-air.jp):
numbered English section labels, generous whitespace, staggered text reveals,
scroll-triggered animations, and a condensing sticky header.

## Structure

```
index.html      # Single-page site: hero, about, services, works, news, careers, contact
css/style.css   # All styling, responsive breakpoints, animations
js/main.js      # Mobile menu, scroll reveals, stat counters, form handling
```

## Run locally

No build step — open `index.html` directly, or serve it:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customizing

- **Brand colors** — edit the CSS variables at the top of `css/style.css` (`--ink`, `--accent`, …).
- **Content** — all copy lives in `index.html`; sections are clearly commented.
- **Contact form** — front-end only for now; wire `js/main.js`'s submit handler to your backend or a form service (Formspree, Basin, etc.).
- **Email** — replace `hello@cuti.example` with your real address.
