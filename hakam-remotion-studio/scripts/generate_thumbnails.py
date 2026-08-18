import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
import arabic_reshaper
from bidi.algorithm import get_display

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MEDIA = os.path.join(ROOT, 'media Hakam')
OUT = os.path.join(ROOT, 'out', 'thumbnails')
os.makedirs(OUT, exist_ok=True)

W, H = 1280, 720

LIME = (191, 255, 0)
CYAN = (0, 210, 255)
SLATE = (13, 34, 41)
SLATE_LIGHT = (20, 48, 56)
WHITE = (255, 255, 255)

FONT_DIR = r"C:\Windows\Fonts"
F_ARABIC_BLACK = os.path.join(FONT_DIR, "segoeuib.ttf")
F_ARABIC_BOLD = os.path.join(FONT_DIR, "segoeuib.ttf")
F_LATIN_BLACK = os.path.join(FONT_DIR, "arialbd.ttf")
F_LATIN_BOLD = os.path.join(FONT_DIR, "arialbd.ttf")


def ar(text):
    reshaped = arabic_reshaper.reshape(text)
    return get_display(reshaped)


def font(path, size):
    return ImageFont.truetype(path, size)


def draw_text_with_shadow(draw, xy, text, fnt, fill, anchor=None, shadow_color=(0, 0, 0), shadow_offset=4, glow=None):
    x, y = xy
    if glow:
        for r in range(14, 0, -2):
            draw.text((x, y), text, font=fnt, fill=(*glow, 0), anchor=anchor)
    draw.text((x + shadow_offset, y + shadow_offset), text, font=fnt, fill=(*shadow_color, 160), anchor=anchor)
    draw.text((x, y), text, font=fnt, fill=fill, anchor=anchor)


def make_background():
    img = Image.new('RGB', (W, H), SLATE)
    draw = ImageDraw.Draw(img)

    # vertical gradient slate -> slightly lighter slate
    for y in range(H):
        t = y / H
        r = int(SLATE[0] + (SLATE_LIGHT[0] - SLATE[0]) * t)
        g = int(SLATE[1] + (SLATE_LIGHT[1] - SLATE[1]) * t)
        b = int(SLATE[2] + (SLATE_LIGHT[2] - SLATE[2]) * t)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # subtle grid
    grid = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(grid)
    step = 46
    for x in range(0, W, step):
        gdraw.line([(x, 0), (x, H)], fill=(*CYAN, 14), width=1)
    for y in range(0, H, step):
        gdraw.line([(0, y), (W, y)], fill=(*CYAN, 14), width=1)
    img.paste(Image.alpha_composite(img.convert('RGBA'), grid).convert('RGB'), (0, 0))

    # ambient glow blobs
    glow_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    for (cx, cy, r, color, alpha) in [
        (120, 80, 420, LIME, 60),
        (W - 60, H - 60, 480, CYAN, 70),
    ]:
        blob = Image.new('RGBA', (r * 2, r * 2), (0, 0, 0, 0))
        bd = ImageDraw.Draw(blob)
        bd.ellipse([0, 0, r * 2, r * 2], fill=(*color, alpha))
        blob = blob.filter(ImageFilter.GaussianBlur(r // 2))
        glow_layer.alpha_composite(blob, (cx - r, cy - r))
    img = Image.alpha_composite(img.convert('RGBA'), glow_layer).convert('RGB')
    return img


def load_subject():
    photo = Image.open(os.path.join(MEDIA, '9FAF3481.JPG')).convert('RGB')
    # crop to head + crossed-arms region, drop excess bottom/top whitespace
    pw, ph = photo.size
    crop_top = int(ph * 0.06)
    crop_bottom = int(ph * 0.74)
    photo = photo.crop((0, crop_top, pw, crop_bottom))
    # scale to fill target height
    target_h = H
    scale = target_h / photo.height
    new_w = int(photo.width * scale)
    photo = photo.resize((new_w, target_h), Image.LANCZOS)
    return photo


def composite_subject(bg, subject, side='right', width_frac=0.50):
    bg = bg.convert('RGBA')
    subject = subject.convert('RGBA')
    target_w = int(W * width_frac)
    sw, sh = subject.size
    if sw > target_w:
        crop_x = (sw - target_w) // 2 if side == 'right' else sw - target_w
        subject = subject.crop((crop_x, 0, crop_x + target_w, sh))
    else:
        target_w = sw

    # feather the inner edge so the photo blends into the cyber background
    mask = Image.new('L', subject.size, 255)
    mdraw = ImageDraw.Draw(mask)
    feather = int(target_w * 0.35)
    for i in range(feather):
        alpha = int(255 * (i / feather))
        if side == 'right':
            mdraw.line([(i, 0), (i, subject.height)], fill=alpha)
        else:
            xx = subject.width - 1 - i
            mdraw.line([(xx, 0), (xx, subject.height)], fill=alpha)
    subject.putalpha(mask)

    x = W - target_w if side == 'right' else 0
    bg.alpha_composite(subject, (x, 0))
    return bg


def paste_logo(canvas, size=150, pos=(1280 - 170, 24)):
    logo = Image.open(os.path.join(MEDIA, 'official_hakam_logo.png')).convert('RGBA')
    scale = size / logo.width
    logo = logo.resize((size, int(logo.height * scale)), Image.LANCZOS)
    canvas.alpha_composite(logo, pos)


def rounded_pill(draw, box, radius, fill=None, outline=None, width=2):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


# ── VARIANT 1: "0% Mouse / 100% AI" bold number hook ──────────────────────────
def variant1():
    bg = make_background()
    subject = load_subject()
    canvas = composite_subject(bg, subject, side='right', width_frac=0.52)
    draw = ImageDraw.Draw(canvas)

    f_huge = font(F_LATIN_BLACK, 148)
    f_ar_big = font(F_ARABIC_BLACK, 74)
    f_tag = font(F_LATIN_BLACK, 34)

    draw_text_with_shadow(draw, (60, 90), "0%", f_huge, (*WHITE, 255), shadow_offset=6)
    draw_text_with_shadow(draw, (60, 250), "MOUSE", f_huge, (*LIME, 255), shadow_offset=6)

    ar_text = ar("Power BI بذكاء اصطناعي")
    draw_text_with_shadow(draw, (60, 430), ar_text, f_ar_big, (*CYAN, 255), shadow_offset=4)

    # bottom tag pill
    rounded_pill(draw, (60, 610, 560, 672), 30, fill=(*SLATE, 235), outline=(*LIME, 255), width=3)
    draw.text((90, 622), "MICROSOFT BUILD 2026", font=f_tag, fill=(*LIME, 255))

    paste_logo(canvas)
    canvas.convert('RGB').save(os.path.join(OUT, 'thumbnail_1_zero_mouse.png'), quality=95)


# ── VARIANT 2: "3 Updates" badge-driven hook ───────────────────────────────────
def variant2():
    bg = make_background()
    subject = load_subject()
    canvas = composite_subject(bg, subject, side='right', width_frac=0.50)
    draw = ImageDraw.Draw(canvas)

    f_num = font(F_LATIN_BLACK, 190)
    f_ar_big = font(F_ARABIC_BLACK, 62)
    f_badge = font(F_LATIN_BLACK, 30)

    draw_text_with_shadow(draw, (60, 60), "3", f_num, (*LIME, 255), shadow_offset=8)
    ar_text = ar("تحديثات Power BI")
    draw_text_with_shadow(draw, (60, 300), ar_text, f_ar_big, (*WHITE, 255), shadow_offset=4)
    ar_text2 = ar("رح تغيّر شغلك للأبد")
    draw_text_with_shadow(draw, (60, 380), ar_text2, font(F_ARABIC_BOLD, 44), (*CYAN, 255), shadow_offset=3)

    badges = ["AGENT SKILLS", "MCP PROTOCOL", "FABRIC IQ"]
    colors = [LIME, CYAN, LIME]
    bx, by = 60, 480
    for label, color in zip(badges, colors):
        bbox = draw.textbbox((0, 0), label, font=f_badge)
        bw = bbox[2] - bbox[0] + 50
        rounded_pill(draw, (bx, by, bx + bw, by + 56), 28, fill=(*SLATE, 235), outline=(*color, 255), width=3)
        draw.text((bx + 25, by + 12), label, font=f_badge, fill=(*color, 255))
        by += 68

    paste_logo(canvas)
    canvas.convert('RGB').save(os.path.join(OUT, 'thumbnail_2_three_updates.png'), quality=95)


# ── VARIANT 3: "14.2 hours saved" stat-driven hook ─────────────────────────────
def variant3():
    bg = make_background()
    subject = load_subject()
    canvas = composite_subject(bg, subject, side='right', width_frac=0.52)
    draw = ImageDraw.Draw(canvas)

    f_num = font(F_LATIN_BLACK, 170)
    f_unit = font(F_LATIN_BLACK, 54)
    f_ar_big = font(F_ARABIC_BLACK, 58)
    f_tag = font(F_LATIN_BLACK, 30)

    draw_text_with_shadow(draw, (60, 70), "14.2", f_num, (*CYAN, 255), shadow_offset=8)
    draw_text_with_shadow(draw, (60, 260), "HOURS SAVED / WEEK", f_unit, (*WHITE, 255), shadow_offset=4)

    ar_text = ar("بالذكاء الاصطناعي في Power BI")
    draw_text_with_shadow(draw, (60, 400), ar_text, f_ar_big, (*LIME, 255), shadow_offset=4)

    rounded_pill(draw, (60, 560, 620, 622), 30, fill=(*SLATE, 235), outline=(*CYAN, 255), width=3)
    draw.text((90, 572), "AI AGENTS FOR POWER BI & FABRIC", font=f_tag, fill=(*CYAN, 255))

    paste_logo(canvas)
    canvas.convert('RGB').save(os.path.join(OUT, 'thumbnail_3_hours_saved.png'), quality=95)


if __name__ == '__main__':
    variant1()
    variant2()
    variant3()
    print("Done. Thumbnails written to", OUT)
