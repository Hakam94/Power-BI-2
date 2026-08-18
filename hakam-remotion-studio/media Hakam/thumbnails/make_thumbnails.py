"""
Hakam Data Studio - YouTube thumbnail generator
Brand tokens (from brand-design-system skill):
  Lime accent:   #BFFF00
  Cyan accent:   #00D2FF
  BG slate teal: #0D2229
  Text white:    #FFFFFF
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
import arabic_reshaper
from bidi.algorithm import get_display
import math, random

W, H = 1280, 720
LIME = (191, 255, 0)
CYAN = (0, 210, 255)
BG = (13, 34, 41)
BG2 = (8, 20, 25)
WHITE = (255, 255, 255)

FONT_DIR = "C:/Windows/Fonts/"
DUBAI_BOLD = FONT_DIR + "DUBAI-BOLD.TTF"
TAHOMA_BOLD = FONT_DIR + "tahomabd.ttf"
ARIAL_BOLD = FONT_DIR + "arialbd.ttf"

LOGO_PATH = "../official_hakam_logo.png"


def ar(text):
    reshaped = arabic_reshaper.reshape(text)
    return get_display(reshaped)


def font(path, size):
    return ImageFont.truetype(path, size)


def draw_text_with_stroke(draw, xy, text, f, fill, stroke_fill=(0, 0, 0), stroke_w=6, anchor="la"):
    draw.text(xy, text, font=f, fill=fill, stroke_width=stroke_w, stroke_fill=stroke_fill, anchor=anchor)


def make_hud_background(glow_color=CYAN, seed=0):
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img, "RGBA")
    # vertical gradient darken toward bottom
    for y in range(H):
        t = y / H
        r = int(BG[0] * (1 - t) + BG2[0] * t)
        g = int(BG[1] * (1 - t) + BG2[1] * t)
        b = int(BG[2] * (1 - t) + BG2[2] * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))
    # faint HUD grid
    random.seed(seed)
    grid_col = (*glow_color, 18)
    for x in range(0, W, 64):
        draw.line([(x, 0), (x, H)], fill=grid_col, width=1)
    for y in range(0, H, 64):
        draw.line([(0, y), (W, y)], fill=grid_col, width=1)
    # corner orbit rings (cyber HUD motif)
    ring_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    rd = ImageDraw.Draw(ring_layer)
    cx, cy = W - 120, 120
    for i, rad in enumerate([260, 200, 150]):
        alpha = 40 - i * 8
        rd.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], outline=(*glow_color, alpha), width=2)
    img.paste(Image.alpha_composite(img.convert("RGBA"), ring_layer).convert("RGB"), (0, 0))
    # soft glow blob behind subject area (left-bottom or right depending later)
    return img.convert("RGBA")


def add_vignette(img):
    w, h = img.size
    vign = Image.new("L", (w, h), 0)
    vd = ImageDraw.Draw(vign)
    vd.ellipse([-w*0.25, -h*0.35, w*1.25, h*1.35], fill=255)
    vign = vign.filter(ImageFilter.GaussianBlur(120))
    dark = Image.new("RGBA", (w, h), (0, 0, 0, 140))
    img = Image.composite(img, Image.alpha_composite(img, dark), vign)
    return img


def paste_logo(canvas, logo_path=LOGO_PATH, size=110, margin=28):
    try:
        logo = Image.open(logo_path).convert("RGBA")
    except FileNotFoundError:
        return canvas
    ratio = size / max(logo.size)
    logo = logo.resize((int(logo.size[0]*ratio), int(logo.size[1]*ratio)), Image.LANCZOS)
    canvas.alpha_composite(logo, (canvas.width - logo.width - margin, margin))
    return canvas


def fit_subject(cutout_path, target_h, bust_only_frac=None):
    im = Image.open(cutout_path).convert("RGBA")
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    if bust_only_frac:
        im = im.crop((0, 0, im.width, int(im.height * bust_only_frac)))
    ratio = target_h / im.height
    im = im.resize((int(im.width*ratio), int(im.height*ratio)), Image.LANCZOS)
    return im


def glow_edge(subject_rgba, color, blur=18, grow=6):
    alpha = subject_rgba.split()[-1]
    alpha_grown = alpha.filter(ImageFilter.MaxFilter(grow*2+1))
    glow = Image.new("RGBA", subject_rgba.size, (*color, 0))
    glow.putalpha(alpha_grown)
    glow = glow.filter(ImageFilter.GaussianBlur(blur))
    return glow


# ---------- Thumbnail 1: SHOCK / lime headline, subject on right ----------
def thumb1():
    canvas = make_hud_background(CYAN, seed=1)
    subject = fit_subject("cutout_9FAF3481.png", target_h=760)
    sx = W - subject.width + 70
    sy = H - subject.height + 40
    glow = glow_edge(subject, CYAN, blur=22, grow=8)
    canvas.alpha_composite(glow, (sx, sy))
    canvas.alpha_composite(subject, (sx, sy))

    draw = ImageDraw.Draw(canvas)
    f_ar = font(TAHOMA_BOLD, 88)
    f_en = font(ARIAL_BOLD, 46)
    line1 = ar("الذكاء الاصطناعي")
    line2 = ar("يبني Power BI وحده!")
    draw_text_with_stroke(draw, (50, 90), line1, f_ar, LIME, stroke_w=8, anchor="la")
    draw_text_with_stroke(draw, (50, 195), line2, f_ar, LIME, stroke_w=8, anchor="la")
    draw_text_with_stroke(draw, (54, 320), "Microsoft Build 2026", f_en, CYAN, stroke_w=5, anchor="la")

    # accent bar
    draw.rectangle([48, 300, 48+8, 300+56], fill=LIME)

    canvas = add_vignette(canvas)
    canvas = paste_logo(canvas)
    canvas.convert("RGB").save("thumb_1_shock.jpg", quality=95)


# ---------- Thumbnail 2: AUTHORITY / question hook, subject centered-left with own bokeh bg ----------
def thumb2():
    base = Image.open("cutout_IMG_3520.png").convert("RGBA") if False else None
    # use original event photo (already has nice dark bokeh bg close to brand), just grade + crop
    orig = Image.open("../IMG_3520.png").convert("RGB")
    # crop to head/shoulders only -- stop well above the conference badge/lanyard
    ow, oh = orig.size
    crop = orig.crop((int(ow*0.10), int(oh*0.02), int(ow*0.92), int(oh*0.37)))
    crop = crop.resize((int(crop.width * H*1.3 / crop.height), int(H*1.3)), Image.LANCZOS)
    crop = ImageOps.fit(crop, (W, H), method=Image.LANCZOS, centering=(0.62, 0.05))

    # color grade toward brand teal/cyan
    r, g, b = crop.split()
    def boost(ch, amt):
        return ch.point(lambda v: max(0, min(255, int(v*amt))))
    b = boost(b, 1.12)
    g = boost(g, 1.02)
    r = boost(r, 0.92)
    graded = Image.merge("RGB", (r, g, b)).convert("RGBA")

    overlay = Image.new("RGBA", (W, H), (*BG, 0))
    od = ImageDraw.Draw(overlay)
    for x in range(0, int(W*0.62)):
        t = x / (W*0.62)
        a = int(235 * (1 - t))
        od.line([(x, 0), (x, H)], fill=(*BG, a))
    canvas = Image.alpha_composite(graded, overlay)

    draw = ImageDraw.Draw(canvas)
    f_ar = font(TAHOMA_BOLD, 74)
    f_ar_sm = font(TAHOMA_BOLD, 42)
    f_en = font(ARIAL_BOLD, 40)
    draw_text_with_stroke(draw, (50, 70), ar("هل انتهى"), f_ar, WHITE, stroke_w=7)
    draw_text_with_stroke(draw, (50, 165), ar("Power BI اليدوي؟"), f_ar, CYAN, stroke_w=7)
    draw_text_with_stroke(draw, (50, 270), ar("الوكيل الذكي يبني كل شي"), f_ar_sm, LIME, stroke_w=5)
    draw_text_with_stroke(draw, (54, 340), "Agentic AI 2026", f_en, LIME, stroke_w=4)

    canvas = add_vignette(canvas)
    canvas = paste_logo(canvas)
    canvas.convert("RGB").save("thumb_2_authority.jpg", quality=95)


# ---------- Thumbnail 3: FUTURE-OF-ROLE / cutout right, big % stat ----------
def thumb3():
    canvas = make_hud_background(LIME, seed=3)
    # bust_only_frac cuts the cutout above the conference badge/lanyard
    subject = fit_subject("cutout_IMG_3516.png", target_h=680, bust_only_frac=0.50)
    sx = W - subject.width + 60
    sy = H - subject.height + 30
    glow = glow_edge(subject, LIME, blur=20, grow=7)
    canvas.alpha_composite(glow, (sx, sy))
    canvas.alpha_composite(subject, (sx, sy))

    draw = ImageDraw.Draw(canvas)
    f_stat = font(ARIAL_BOLD, 190)
    f_ar = font(TAHOMA_BOLD, 66)
    f_en = font(ARIAL_BOLD, 40)

    draw_text_with_stroke(draw, (50, 50), "80%", f_stat, LIME, stroke_w=10)
    draw_text_with_stroke(draw, (56, 300), ar("من مهامك ستختفي"), f_ar, WHITE, stroke_w=6)
    draw_text_with_stroke(draw, (56, 385), ar("مع الذكاء الاصطناعي الوكيل"), f_ar, CYAN, stroke_w=6)
    draw_text_with_stroke(draw, (58, 470), "Agent Skills for Power BI", f_en, LIME, stroke_w=4)

    canvas = add_vignette(canvas)
    canvas = paste_logo(canvas)
    canvas.convert("RGB").save("thumb_3_stat.jpg", quality=95)


if __name__ == "__main__":
    thumb1()
    print("thumb1 done")
    thumb2()
    print("thumb2 done")
    thumb3()
    print("thumb3 done")
