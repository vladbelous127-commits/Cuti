#!/usr/bin/env python3
"""Bundle the booking site into one self-contained HTML file.

Browsers block the data.json fetch over file://, so the multi-file site
shows an empty page when opened from disk. This flattens the CSS, the data
and both pages into one document, with a hash router standing in for page
navigation, so the result can be saved or sent as a single file.

    python3 build-standalone.py [output.html]
"""

import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).parent
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "appearance-bookings.html"


def script_of(html):
    return re.search(r"<script>\n(.*?)\n</script>", html, re.S).group(1)


def slice_(html, start, end, keep_end=True):
    i = html.index(start)
    j = html.index(end, i)
    return html[i : j + (len(end) if keep_end else 0)]


def strip_fetch(js):
    return re.sub(r"fetch\('data\.json'\).*?\n  \}\);\n", "", js, flags=re.S)


def main():
    css = (ROOT / "styles.css").read_text()
    data = (ROOT / "data.json").read_text().strip()
    index = (ROOT / "index.html").read_text()
    enq = (ROOT / "enquire.html").read_text()

    site = json.loads(data)["site"]

    # Both pages declare esc, TG_ICON, DATA and boot at top level. An IIFE per
    # page isolates all of them, except DATA must resolve to the single shared
    # copy — so the inner declarations are dropped rather than shadowing it.
    home_js = strip_fetch(script_of(index))
    home_js = home_js.replace("\nlet DATA;\n", "\n")
    home_js = home_js.replace(
        'href="enquire.html?format=${encodeURIComponent(f.id)}"',
        'href="#/enquire/${encodeURIComponent(f.id)}"',
    )

    enq_js = strip_fetch(script_of(enq))
    enq_js = enq_js.replace("let DATA, formatId;", "let formatId;")
    enq_js = enq_js.replace(
        "new URLSearchParams(location.search).get('format')", "CURRENT_FORMAT"
    )

    header = slice_(index, "<header>", "</header>")
    home = slice_(index, '<section class="hero">', "</section>\n\n<footer", keep_end=False)
    footer = slice_(index, "<footer>", "</footer>")
    enq_body = slice_(enq, '<div class="wrap"><a class="back"', "<footer>", keep_end=False)

    for name, frag in [("header", header), ("home", home), ("footer", footer), ("enquire", enq_body)]:
        assert "<script" not in frag, f"{name} fragment picked up a script block"

    doc = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{site['title']}</title>
<meta name="description" content="{site['description']}">
<style>
{css}
</style>
</head>
<body>

{header}
<div id="view-home">
{home}
</div>
<div id="view-enquire" hidden>
{enq_body}</div>
{footer}

<script>
const DATA = {data};
let CURRENT_FORMAT = null;

const Home = (() => {{
{home_js}
return {{ boot }};
}})();

const Enquire = (() => {{
{enq_js}
return {{ boot }};
}})();

// Stands in for real page navigation: the hosted site loads
// enquire.html?format=<id>, this file swaps views on #/enquire/<id>.
function route() {{
  const m = location.hash.match(/^#\\/enquire(?:\\/(.+))?$/);
  const home = document.getElementById('view-home');
  const enq  = document.getElementById('view-enquire');
  if (m) {{
    CURRENT_FORMAT = m[1] ? decodeURIComponent(m[1]) : null;
    home.hidden = true; enq.hidden = false;
    Enquire.boot();
  }} else {{
    enq.hidden = true; home.hidden = false;
  }}
  window.scrollTo(0, 0);
}}

Home.boot();
addEventListener('hashchange', route);
route();
</script>
</body>
</html>
"""

    # Sibling pages do not exist in a one-file build: point plain enquiry links
    # at the router, and anything back to index at the root view.
    doc = doc.replace('href="enquire.html"', 'href="#/enquire"')
    doc = re.sub(r'href="index\.html(#[a-z]+)?"', 'href="#/"', doc)

    for page in ("index.html", "enquire.html"):
        assert f'href="{page}' not in doc, f"unresolved link to {page}"
    assert "fetch(" not in doc, "a runtime fetch survived; the file would need a server"

    OUT.write_text(doc)
    print(f"wrote {OUT} ({OUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
