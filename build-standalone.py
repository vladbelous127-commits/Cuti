#!/usr/bin/env python3
"""Bundle the site into one self-contained HTML file.

The hosted site is four files that fetch data.json at runtime, which a
browser refuses to do over file://. This flattens everything — CSS, data,
both pages — into a single document that works when opened directly from
disk, so it can be saved, emailed, or handed to someone without a server.

Page navigation becomes a hash router, since there is no second page to
navigate to.

    python3 build-standalone.py [output.html]
"""

import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).parent
OUT = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "fc-livehub-online.html"


def script_of(html):
    return re.search(r"<script>\n(.*?)\n</script>", html, re.S).group(1)


def slice_(html, start, end, keep_end=True):
    i = html.index(start)
    j = html.index(end, i)
    return html[i : j + (len(end) if keep_end else 0)]


def main():
    css = (ROOT / "styles.css").read_text()
    data = (ROOT / "data.json").read_text().strip()
    index = (ROOT / "index.html").read_text()
    check = (ROOT / "checkout.html").read_text()

    site = json.loads(data)["site"]

    # Both pages declare their own esc/money/DATA at top level. Wrapping each
    # script in an IIFE would be enough, except they also share a `boot` name,
    # so the listing's helpers are renamed to keep the two apart.
    home_js = script_of(index)
    home_js = re.sub(r"fetch\('data\.json'\).*?\n  \}\);\n", "", home_js, flags=re.S)
    home_js = home_js.replace(
        "`checkout.html?event=${encodeURIComponent(ev.id)}`",
        "`#/checkout/${encodeURIComponent(ev.id)}`",
    )
    home_js = home_js.replace("const esc =", "const escH =").replace("esc(", "escH(")
    home_js = home_js.replace("const money =", "const moneyH =").replace("money(", "moneyH(")
    home_js = home_js.replace("let DATA, activeFilter", "let activeFilter")

    co_js = script_of(check)
    co_js = re.sub(r"fetch\('data\.json'\).*?\n  \}\);\n", "", co_js, flags=re.S)
    co_js = co_js.replace("new URLSearchParams(location.search).get('event')", "CURRENT_ID")
    co_js = co_js.replace("let DATA, EVENT", "let EVENT")

    header = slice_(index, "<header>", "</header>")
    home = slice_(index, '<section class="hero">', "</section>\n\n<footer", keep_end=False)
    footer = slice_(index, '<footer id="support">', "</footer>")
    checkout = slice_(check, '<div class="wrap">\n  <a class="back"', "<footer>", keep_end=False)

    for name, frag in [("header", header), ("home", home), ("footer", footer), ("checkout", checkout)]:
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
<div id="view-checkout" hidden>
{checkout}</div>
{footer}

<script>
const DATA = {data};
let CURRENT_ID = null;

const Home = (() => {{
{home_js}
return {{ boot }};
}})();

const Checkout = (() => {{
{co_js}
return {{ boot }};
}})();

// Stands in for real page navigation: the hosted site loads
// checkout.html?event=<id>, this file swaps views on #/checkout/<id>.
function route() {{
  const m = location.hash.match(/^#\\/checkout\\/(.+)$/);
  const home = document.getElementById('view-home');
  const co   = document.getElementById('view-checkout');
  if (m) {{
    CURRENT_ID = decodeURIComponent(m[1]);
    home.hidden = true; co.hidden = false;
    Checkout.boot();
  }} else {{
    co.hidden = true; home.hidden = false;
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

    # Links to sibling pages cannot resolve in a one-file build.
    doc = re.sub(r"index\.html(#[a-z]+)?", "#/", doc)

    # Only real links matter here; the router comment names both pages on purpose.
    for page in ("index.html", "checkout.html"):
        assert f'href="{page}' not in doc, f"unresolved link to {page}"
    assert "fetch(" not in doc, "a runtime fetch survived; the file would need a server"

    OUT.write_text(doc)
    print(f"wrote {OUT} ({OUT.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
