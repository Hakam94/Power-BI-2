#!/usr/bin/env python3
"""
Render Main.dc.html to a flat PNG for direct TikTok/Reels upload.

The Claude Design canvas format (.dc.html) needs its editor runtime to
render (the <script src="./support.js"> tag is swapped for the real
runtime by the editor at view time) -- it doesn't render standalone.
Since Main.dc.html here has no dynamic bindings ({{holes}}, sc-for,
sc-if, a Component class), this script strips the dc-specific wrapper
(<x-dc>, <helmet>, the support.js tag) and renders the inner HTML/CSS
directly as a normal page, then screenshots it at exactly 1080x1920
(2x device scale for a crisp 2160x3840 source TikTok will downscale
cleanly).

If Main.dc.html ever gains real dc-specific bindings, this approach
stops working and the artboard needs rendering through the actual
editor (open the published Claude Design canvas and use its Export).

Usage:
    pip install playwright
    python3 render_thumbnail.py
"""

import os
import re

from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "Main.dc.html")
STANDALONE = os.path.join(HERE, "_render_standalone.html")
OUT = os.path.join(os.path.dirname(HERE), "part6_tiktok_reel_thumbnail_1080x1920.png")

FONT_LINK = (
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
    "family=Chakra+Petch:wght@500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap\">"
)


def build_standalone():
    src = open(SRC, encoding="utf-8").read()
    helmet_style = re.search(r"<helmet>\s*<style>(.*?)</style>\s*</helmet>", src, re.S).group(1)
    body_html = re.search(r"</helmet>\s*(.*?)\s*</x-dc>", src, re.S).group(1)
    standalone = f"""<!doctype html>
<html>
<head>
<meta charset="utf-8">
{FONT_LINK}
<style>
  html, body {{ margin:0; padding:0; }}
  {helmet_style}
</style>
</head>
<body>
{body_html}
</body>
</html>
"""
    with open(STANDALONE, "w", encoding="utf-8") as f:
        f.write(standalone)


def render():
    chromium_path = os.environ.get(
        "PW_CHROMIUM_PATH",
        "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
    )
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=chromium_path)
        page = browser.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=2)
        page.goto(f"file://{STANDALONE}")
        page.wait_for_timeout(1500)  # let webfonts/images settle
        page.screenshot(path=OUT)
        browser.close()


if __name__ == "__main__":
    build_standalone()
    render()
    os.remove(STANDALONE)
    print(f"Wrote {OUT}")
