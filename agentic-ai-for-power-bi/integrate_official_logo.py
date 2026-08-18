"""
Composite Official Hakam Data Studio Logo onto all 8 Instagram Carousel Slides
"""

from PIL import Image, ImageEnhance
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

logo_path = os.path.join(SCRIPT_DIR, "official_hakam_logo.png")
logo_full = Image.open(logo_path).convert("RGBA")

slides = [
    "ig_slide_1_cover.png",
    "ig_slide_2_shift.png",
    "ig_slide_3_agent_skills.png",
    "ig_slide_4_fabric_apps.png",
    "ig_slide_5_mcp.png",
    "ig_slide_6_fabric_iq.png",
    "ig_slide_7_impact.png",
    "ig_slide_8_outro.png",
]

# Create a clean logo overlay badge (resize logo to 160x160 for top-right watermark)
logo_badge = logo_full.resize((180, 100), Image.Resampling.LANCZOS)

for slide_name in slides:
    slide_file = os.path.join(SCRIPT_DIR, slide_name)
    if not os.path.exists(slide_file):
        continue
    
    slide_img = Image.open(slide_file).convert("RGBA")
    W, H = slide_img.size
    
    if slide_name == "ig_slide_1_cover.png":
        # Cover slide: Place a prominent logo badge top-center
        cover_logo = logo_full.resize((320, 180), Image.Resampling.LANCZOS)
        pos = ((W - 320) // 2, 40)
        slide_img.paste(cover_logo, pos, cover_logo)
    else:
        # Other slides: Top-Right corner badge
        pos = (W - 200, 30)
        slide_img.paste(logo_badge, pos, logo_badge)
        
    slide_img.convert("RGB").save(slide_file, quality=95)
    print(f"[OK] Official logo integrated into {slide_name}")

print("All 8 Instagram slides updated with official Hakam Data Studio logo!")
