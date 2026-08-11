"""
Generate PowerPoint presentation for Hakam Data Studio
Topic: Agentic AI for Power BI - Arabic with English terms in parentheses
Brand Colors: Cyber Slate #0D2229 | Lime Green #BFFF00 | Electric Cyan #00D2FF
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches, Pt
import os

# ─── Brand Colors ───────────────────────────────────────────────
BG_DARK       = RGBColor(0x0D, 0x22, 0x29)   # Cyber Slate
LIME_GREEN    = RGBColor(0xBF, 0xFF, 0x00)   # Lime Green
CYBER_CYAN    = RGBColor(0x00, 0xD2, 0xFF)   # Electric Cyan
WHITE         = RGBColor(0xFF, 0xFF, 0xFF)
DARK_CARD     = RGBColor(0x0A, 0x1A, 0x20)   # Slightly darker card

SLIDE_W = Inches(13.33)
SLIDE_H = Inches(7.5)

prs = Presentation()
prs.slide_width  = SLIDE_W
prs.slide_height = SLIDE_H

blank_layout = prs.slide_layouts[6]  # Completely blank


def set_bg(slide, color=BG_DARK):
    """Fill slide background with solid color."""
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color


def add_rect(slide, left, top, width, height, fill_color, transparency=0):
    """Add a filled rectangle shape."""
    shape = slide.shapes.add_shape(
        1,  # MSO_SHAPE_TYPE.RECTANGLE
        left, top, width, height
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    shape.line.fill.background()
    return shape


def add_textbox(slide, text, left, top, width, height,
                font_size=24, bold=False, color=WHITE,
                align=PP_ALIGN.RIGHT, rtl=True, italic=False):
    """Add a textbox with Arabic RTL support."""
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    run.font.name = "Arial"
    # RTL paragraph direction
    pPr = p._pPr
    if pPr is None:
        from pptx.oxml.ns import qn
        from lxml import etree
        pPr = etree.SubElement(p._p, qn('a:pPr'))
    pPr.set('rtl', '1' if rtl else '0')
    return txBox


def add_accent_line(slide, top, color=LIME_GREEN, height=Inches(0.05)):
    """Add a full-width horizontal accent line."""
    add_rect(slide, Inches(0), top, SLIDE_W, height, color)


def add_slide_number(slide, num):
    """Add small slide number bottom-right."""
    txBox = slide.shapes.add_textbox(
        Inches(12.5), Inches(7.1), Inches(0.6), Inches(0.3)
    )
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    run = p.add_run()
    run.text = str(num)
    run.font.size = Pt(11)
    run.font.color.rgb = RGBColor(0x44, 0x66, 0x77)
    run.font.name = "Arial"


def add_logo_placeholder(slide):
    """Add HDS brand tag bottom-left."""
    txBox = slide.shapes.add_textbox(
        Inches(0.3), Inches(7.0), Inches(3), Inches(0.4)
    )
    tf = txBox.text_frame
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.LEFT
    run = p.add_run()
    run.text = "@HakamDataStudio"
    run.font.size = Pt(11)
    run.font.color.rgb = CYBER_CYAN
    run.font.bold = True
    run.font.name = "Arial"


# ═══════════════════════════════════════════════════════════════════
# SLIDE 1 — Title
# ═══════════════════════════════════════════════════════════════════
slide = prs.slides.add_slide(blank_layout)
set_bg(slide)

# Top cyan bar
add_rect(slide, Inches(0), Inches(0), SLIDE_W, Inches(0.08), CYBER_CYAN)
# Bottom lime bar
add_rect(slide, Inches(0), Inches(7.42), SLIDE_W, Inches(0.08), LIME_GREEN)

# Center glow card
add_rect(slide, Inches(1.5), Inches(1.2), Inches(10.33), Inches(5.1), DARK_CARD)
add_rect(slide, Inches(1.5), Inches(1.2), Inches(0.06), Inches(5.1), LIME_GREEN)

# Main Arabic title
add_textbox(slide,
    "عصر الذكاء الاصطناعي الوكيل",
    Inches(1.7), Inches(1.5), Inches(9.9), Inches(1.4),
    font_size=44, bold=True, color=WHITE)

# Subtitle in lime
add_textbox(slide,
    "(Agentic AI)",
    Inches(1.7), Inches(2.7), Inches(9.9), Inches(0.7),
    font_size=28, bold=True, color=LIME_GREEN)

# Description
add_textbox(slide,
    "في باور بي آي ومايكروسوفت فابريك  (Power BI & Microsoft Fabric)",
    Inches(1.7), Inches(3.3), Inches(9.9), Inches(0.8),
    font_size=22, color=CYBER_CYAN)

# Divider
add_rect(slide, Inches(2), Inches(4.2), Inches(9.33), Inches(0.03), LIME_GREEN)

# Channel
add_textbox(slide,
    "حكم داتا ستوديو  (Hakam Data Studio) | مايكروسوفت بيلد 2026  (Microsoft Build 2026)",
    Inches(1.7), Inches(4.35), Inches(9.9), Inches(0.6),
    font_size=16, color=RGBColor(0x88, 0xAA, 0xBB))

add_logo_placeholder(slide)
add_slide_number(slide, 1)


# ═══════════════════════════════════════════════════════════════════
# SLIDE 2 — 3 Eras Timeline
# ═══════════════════════════════════════════════════════════════════
slide = prs.slides.add_slide(blank_layout)
set_bg(slide)
add_rect(slide, Inches(0), Inches(0), SLIDE_W, Inches(0.08), LIME_GREEN)

add_textbox(slide, "التطور: من التقارير إلى الوكلاء الذكيين",
    Inches(0.3), Inches(0.2), Inches(12.7), Inches(0.7),
    font_size=30, bold=True, color=LIME_GREEN)
add_textbox(slide, "(From Dashboards to AI Agents)",
    Inches(0.3), Inches(0.85), Inches(12.7), Inches(0.4),
    font_size=16, color=CYBER_CYAN)

# Arrow line
add_rect(slide, Inches(0.8), Inches(3.5), Inches(11.7), Inches(0.06), CYBER_CYAN)

# Era boxes
eras = [
    ("المرحلة الأولى\n(Dashboard Era)",    "+20 سنة",      "لوحات بيانات ثابتة\nالإنسان يسأل والنظام يجاوب", LIME_GREEN, Inches(0.5)),
    ("المرحلة الثانية\n(Copilot Era)",      "2022 - 2025",  "مساعد ذكي\nيجاوب الأسئلة بالكلام الطبيعي",     CYBER_CYAN, Inches(4.5)),
    ("المرحلة الثالثة\n(Agentic AI Era)",   "2026 →",       "وكيل ذكي مستقل\nيخطط وينفذ ويحقق الأهداف",      LIME_GREEN, Inches(8.5)),
]

for title, year, desc, color, left in eras:
    # Card
    add_rect(slide, left, Inches(1.5), Inches(4.1), Inches(4.5), DARK_CARD)
    add_rect(slide, left, Inches(1.5), Inches(4.1), Inches(0.07), color)
    # Year badge
    add_textbox(slide, year, left, Inches(1.55), Inches(4.1), Inches(0.5),
                font_size=13, bold=True, color=color, align=PP_ALIGN.CENTER, rtl=False)
    # Title
    add_textbox(slide, title, left, Inches(2.0), Inches(4.1), Inches(1.0),
                font_size=18, bold=True, color=WHITE, align=PP_ALIGN.CENTER, rtl=False)
    # Dot on timeline
    dot = slide.shapes.add_shape(9, left + Inches(1.85), Inches(3.38), Inches(0.4), Inches(0.4))
    dot.fill.solid()
    dot.fill.fore_color.rgb = color
    dot.line.fill.background()
    # Desc
    add_textbox(slide, desc, left, Inches(3.4), Inches(4.1), Inches(2.3),
                font_size=16, color=WHITE, align=PP_ALIGN.CENTER, rtl=True)

add_logo_placeholder(slide)
add_slide_number(slide, 2)


# ═══════════════════════════════════════════════════════════════════
# SLIDE 3 — Microsoft Build 2026: 3 Big Changes
# ═══════════════════════════════════════════════════════════════════
slide = prs.slides.add_slide(blank_layout)
set_bg(slide)
add_rect(slide, Inches(0), Inches(0), SLIDE_W, Inches(0.08), CYBER_CYAN)

add_textbox(slide, "مؤتمر مايكروسوفت بيلد 2026  (Microsoft Build 2026)",
    Inches(0.3), Inches(0.2), Inches(12.7), Inches(0.65),
    font_size=28, bold=True, color=LIME_GREEN)
add_textbox(slide, "ثلاثة تغييرات ستغير عالم تحليل البيانات إلى الأبد",
    Inches(0.3), Inches(0.85), Inches(12.7), Inches(0.5),
    font_size=20, color=WHITE)

changes = [
    ("①", "مهارات الوكيل\n(Agent Skills for Power BI)",
     "بناء موديل أعمال كامل وتقارير\nبالكلام الطبيعي أو لقطة شاشة", LIME_GREEN),
    ("②", "تطبيقات فابريك\n(Fabric Apps for Semantic Models)",
     "تطبيقات ويب أصيلة فوق\nموديل الأعمال مباشرة", CYBER_CYAN),
    ("③", "متجر المهارات\n(Skills for Fabric Marketplace)",
     "سوق أدوات الوكلاء الذكيين\nلفابريك مع حوكمة كاملة", LIME_GREEN),
]

for i, (num, title, desc, color) in enumerate(changes):
    left = Inches(0.4 + i * 4.3)
    add_rect(slide, left, Inches(1.6), Inches(4.1), Inches(5.4), DARK_CARD)
    add_rect(slide, left, Inches(1.6), Inches(0.07), Inches(5.4), color)

    # Number circle
    circ = slide.shapes.add_shape(9, left + Inches(1.7), Inches(1.75), Inches(0.7), Inches(0.7))
    circ.fill.solid()
    circ.fill.fore_color.rgb = color
    circ.line.fill.background()

    add_textbox(slide, num, left + Inches(1.7), Inches(1.77), Inches(0.7), Inches(0.6),
                font_size=20, bold=True, color=BG_DARK, align=PP_ALIGN.CENTER, rtl=False)
    add_textbox(slide, title, left, Inches(2.55), Inches(4.1), Inches(1.4),
                font_size=17, bold=True, color=WHITE, align=PP_ALIGN.CENTER, rtl=False)
    add_rect(slide, left + Inches(0.3), Inches(3.95), Inches(3.5), Inches(0.03), color)
    add_textbox(slide, desc, left, Inches(4.1), Inches(4.1), Inches(2.7),
                font_size=15, color=RGBColor(0xCC, 0xEE, 0xFF), align=PP_ALIGN.CENTER, rtl=True)

add_logo_placeholder(slide)
add_slide_number(slide, 3)


# ═══════════════════════════════════════════════════════════════════
# SLIDE 4 — Agent Skills Deep Dive
# ═══════════════════════════════════════════════════════════════════
slide = prs.slides.add_slide(blank_layout)
set_bg(slide)
add_rect(slide, Inches(0), Inches(0), SLIDE_W, Inches(0.08), LIME_GREEN)

add_textbox(slide, "مهارات الوكيل  (Agent Skills for Power BI)",
    Inches(0.3), Inches(0.2), Inches(12.7), Inches(0.7),
    font_size=30, bold=True, color=LIME_GREEN)
add_textbox(slide, "الوكيل الذكي يبني لك تقارير كاملة — من الصفر",
    Inches(0.3), Inches(0.88), Inches(12.7), Inches(0.45),
    font_size=18, color=CYBER_CYAN)

steps = [
    ("موديل الأعمال\n(Semantic Model)", "ينشئ الجداول والعلاقات\nوالمقاييس"),
    ("الداكس\n(DAX Measures)", "يكتب مقاييس الداكس\nاللازمة تلقائياً"),
    ("التقرير\n(Report Pages)", "يبني صفحات التقرير\nويختار المرئيات"),
    ("النشر\n(Publish)", "ينشر في مساحة عمل\nفابريك مباشرة"),
]

arrow_y = Inches(3.6)
for i, (title, desc) in enumerate(steps):
    left = Inches(0.4 + i * 3.2)
    add_rect(slide, left, Inches(1.5), Inches(2.9), Inches(4.2), DARK_CARD)
    add_rect(slide, left, Inches(1.5), Inches(2.9), Inches(0.07), LIME_GREEN)
    add_textbox(slide, title, left, Inches(1.65), Inches(2.9), Inches(1.1),
                font_size=16, bold=True, color=LIME_GREEN, align=PP_ALIGN.CENTER, rtl=False)
    add_textbox(slide, desc, left, Inches(2.8), Inches(2.9), Inches(2.8),
                font_size=14, color=WHITE, align=PP_ALIGN.CENTER, rtl=True)
    if i < 3:
        add_textbox(slide, "←", left + Inches(2.95), Inches(2.9), Inches(0.4), Inches(0.5),
                    font_size=22, color=CYBER_CYAN, align=PP_ALIGN.CENTER, rtl=False)

# Input tip
add_rect(slide, Inches(0.4), Inches(5.9), Inches(12.5), Inches(1.1), RGBColor(0x0A, 0x2A, 0x15))
add_rect(slide, Inches(0.4), Inches(5.9), Inches(0.06), Inches(1.1), LIME_GREEN)
add_textbox(slide, '✦  تكتب جملة أو تحط لقطة شاشة  (Screenshot)  والوكيل يبني كل شي',
    Inches(0.6), Inches(6.05), Inches(12.1), Inches(0.7),
    font_size=18, bold=True, color=LIME_GREEN)

add_logo_placeholder(slide)
add_slide_number(slide, 4)


# ═══════════════════════════════════════════════════════════════════
# SLIDE 5 — Fabric Apps
# ═══════════════════════════════════════════════════════════════════
slide = prs.slides.add_slide(blank_layout)
set_bg(slide)
add_rect(slide, Inches(0), Inches(0), SLIDE_W, Inches(0.08), CYBER_CYAN)

add_textbox(slide, "تطبيقات فابريك  (Fabric Apps for Semantic Models)",
    Inches(0.3), Inches(0.2), Inches(12.7), Inches(0.7),
    font_size=30, bold=True, color=CYBER_CYAN)
add_textbox(slide, "من موديل بيانات إلى تطبيق ويب كامل — بكلام طبيعي",
    Inches(0.3), Inches(0.88), Inches(12.7), Inches(0.45),
    font_size=18, color=WHITE)

# Before / After
for i, (label, items, color) in enumerate([
    ("قبل ❌", ["مطور واجهة أمامية  (Frontend)", "مطور خوادم  (Backend)", "واجهة برمجية  (API)", "ديزاينر  (Designer)", "أسابيع من الشغل"], RGBColor(0x33, 0x0A, 0x0A)),
    ("بعد ✅  (With Fabric Apps)", ["وكيل ذكي واحد  (AI Agent)", "موديل أعمال جاهز  (Semantic Model)", "كلام طبيعي", "تطبيق ويب أصيل  (Fabric-native App)", "في أيام وليس أسابيع!"], RGBColor(0x0A, 0x22, 0x0A)),
]):
    left = Inches(0.5 + i * 6.7)
    add_rect(slide, left, Inches(1.5), Inches(6.3), Inches(5.5), color)
    border_color = RGBColor(0x99, 0x00, 0x00) if i == 0 else LIME_GREEN
    add_rect(slide, left, Inches(1.5), Inches(6.3), Inches(0.07), border_color)
    add_textbox(slide, label, left, Inches(1.6), Inches(6.3), Inches(0.6),
                font_size=18, bold=True, color=border_color, align=PP_ALIGN.CENTER, rtl=False)
    for j, item in enumerate(items):
        add_textbox(slide, f"◆  {item}", left + Inches(0.2), Inches(2.3 + j * 0.85),
                    Inches(5.9), Inches(0.7),
                    font_size=15, color=WHITE)

add_logo_placeholder(slide)
add_slide_number(slide, 5)


# ═══════════════════════════════════════════════════════════════════
# SLIDE 6 — MCP Protocol
# ═══════════════════════════════════════════════════════════════════
slide = prs.slides.add_slide(blank_layout)
set_bg(slide)
add_rect(slide, Inches(0), Inches(0), SLIDE_W, Inches(0.08), LIME_GREEN)

add_textbox(slide, "بروتوكول السياق النموذجي  (MCP — Model Context Protocol)",
    Inches(0.3), Inches(0.2), Inches(12.7), Inches(0.7),
    font_size=28, bold=True, color=LIME_GREEN)
add_textbox(slide, "جسر التواصل بين الوكيل الذكي وباور بي آي",
    Inches(0.3), Inches(0.88), Inches(12.7), Inches(0.45),
    font_size=18, color=CYBER_CYAN)

# Analogy
add_rect(slide, Inches(0.4), Inches(1.5), Inches(12.5), Inches(0.9), RGBColor(0x0A, 0x2A, 0x1A))
add_textbox(slide, '🔌  فكّر فيه زي يو إس بي سي للذكاء الاصطناعي  (USB-C for AI)  — معيار موحّد لكل الوكلاء',
    Inches(0.6), Inches(1.6), Inches(12.1), Inches(0.65),
    font_size=18, bold=True, color=LIME_GREEN)

# Two server cards
servers = [
    ("خادم التحليل البعيد\n(Remote Power BI MCP Server)",
     "• يتصل بموديلات الأعمال المنشورة  (Published Semantic Models)\n"
     "• يولّد استعلامات داكس  (DAX Queries)\n"
     "• يجاوب أسئلة البيانات بالكلام الطبيعي\n"
     "• يحترم صلاحيات الأمان  (Row-Level Security)",
     CYBER_CYAN, Inches(0.4)),
    ("خادم التطوير المحلي\n(Local Power BI Modeling MCP Server)",
     "• يشتغل على ملفات المشروع المحلية  (.pbip files)\n"
     "• تغيير أعمدة وعلاقات دفعة واحدة  (Bulk Operations)\n"
     "• إنشاء مقاييس داكس  (DAX Measures) تلقائياً\n"
     "• يعمل مع بيئات التطوير  (VS Code / Claude Desktop)",
     LIME_GREEN, Inches(6.85)),
]

for title, desc, color, left in servers:
    add_rect(slide, left, Inches(2.55), Inches(6.1), Inches(4.5), DARK_CARD)
    add_rect(slide, left, Inches(2.55), Inches(6.1), Inches(0.07), color)
    add_textbox(slide, title, left, Inches(2.65), Inches(6.1), Inches(1.1),
                font_size=17, bold=True, color=color, align=PP_ALIGN.CENTER, rtl=False)
    add_rect(slide, left + Inches(0.3), Inches(3.75), Inches(5.5), Inches(0.03), color)
    add_textbox(slide, desc, left + Inches(0.2), Inches(3.85), Inches(5.8), Inches(3.1),
                font_size=13, color=WHITE, align=PP_ALIGN.RIGHT, rtl=True)

add_logo_placeholder(slide)
add_slide_number(slide, 6)


# ═══════════════════════════════════════════════════════════════════
# SLIDE 7 — Fabric IQ
# ═══════════════════════════════════════════════════════════════════
slide = prs.slides.add_slide(blank_layout)
set_bg(slide)
add_rect(slide, Inches(0), Inches(0), SLIDE_W, Inches(0.08), CYBER_CYAN)

add_textbox(slide, "ذكاء فابريك  (Fabric IQ)  — طبقة الذكاء الدلالي",
    Inches(0.3), Inches(0.2), Inches(12.7), Inches(0.7),
    font_size=30, bold=True, color=CYBER_CYAN)

# Center brain concept
add_rect(slide, Inches(4.9), Inches(1.4), Inches(3.5), Inches(2.0), DARK_CARD)
add_rect(slide, Inches(4.9), Inches(1.4), Inches(3.5), Inches(0.07), LIME_GREEN)
add_textbox(slide, "ذكاء فابريك\n(Fabric IQ)\n🧠 دماغ المنصة", Inches(4.9), Inches(1.5),
            Inches(3.5), Inches(1.8), font_size=18, bold=True, color=LIME_GREEN,
            align=PP_ALIGN.CENTER, rtl=True)

# Microsoft IQ Ecosystem cards
ecosystem = [
    ("ذكاء العمل\n(Work IQ)", "إيميلات، اجتماعات\nمستندات  (Microsoft 365)", Inches(0.4), Inches(3.6)),
    ("ذكاء فابريك\n(Fabric IQ)", "بيانات ومقاييس\nالأعمال التجارية", Inches(4.9), Inches(3.6)),
    ("ذكاء المعرفة\n(Foundry IQ)", "المعرفة المؤسسية\nالموثّقة", Inches(9.4), Inches(3.6)),
]
for title, desc, left, top in ecosystem:
    add_rect(slide, left, top, Inches(3.5), Inches(2.8), DARK_CARD)
    add_rect(slide, left, top, Inches(3.5), Inches(0.06), CYBER_CYAN)
    add_textbox(slide, title, left, top + Inches(0.1), Inches(3.5), Inches(1.0),
                font_size=16, bold=True, color=CYBER_CYAN, align=PP_ALIGN.CENTER, rtl=False)
    add_textbox(slide, desc, left, top + Inches(1.1), Inches(3.5), Inches(1.5),
                font_size=14, color=WHITE, align=PP_ALIGN.CENTER, rtl=True)

# Key insight
add_rect(slide, Inches(0.4), Inches(6.55), Inches(12.5), Inches(0.7), RGBColor(0x0A, 0x22, 0x15))
add_textbox(slide,
    "✦  الوكلاء يشتغلون على نفس فهم الأعمال — بدون تخمينات أو أخطاء  (Governed & Trusted AI)",
    Inches(0.6), Inches(6.65), Inches(12.1), Inches(0.5),
    font_size=16, bold=True, color=LIME_GREEN)

add_logo_placeholder(slide)
add_slide_number(slide, 7)


# ═══════════════════════════════════════════════════════════════════
# SLIDE 8 — Impact on Your Future
# ═══════════════════════════════════════════════════════════════════
slide = prs.slides.add_slide(blank_layout)
set_bg(slide)
add_rect(slide, Inches(0), Inches(0), SLIDE_W, Inches(0.08), LIME_GREEN)

add_textbox(slide, "ماذا يعني هذا عليك؟  (What Does This Mean for You?)",
    Inches(0.3), Inches(0.2), Inches(12.7), Inches(0.7),
    font_size=30, bold=True, color=LIME_GREEN)

impacts = [
    ("⚡", "الأعمال المتكررة ستختفي", "كل شي كان يأخذ ساعات — الوكيل سيأخذه\n(Data Modeling, DAX, Report Building)", LIME_GREEN),
    ("🎯", "موديل الأعمال هو المهارة الأهم", "الوكيل يكتب الداكس — لكن مين يبني الموديل الصح؟\n(Semantic Model = Strategic Infrastructure)", CYBER_CYAN),
    ("🔄", "دور المحلل يتطور مش يختفي", "من تنفيذ المهام إلى الإشراف والجودة والاستراتيجية\n(From Executor to Strategic Analyst)", LIME_GREEN),
    ("📈", "80% تخفيض في الأعمال المتكررة", "هذا ما تقوله أبحاث 2026 من المؤسسات اللي طبّقت\n(80% reduction in repetitive workflows)", CYBER_CYAN),
]

for i, (icon, title, desc, color) in enumerate(impacts):
    row = i // 2
    col = i % 2
    left = Inches(0.4 + col * 6.5)
    top = Inches(1.3 + row * 2.9)
    add_rect(slide, left, top, Inches(6.2), Inches(2.5), DARK_CARD)
    add_rect(slide, left, top, Inches(0.07), Inches(2.5), color)
    add_textbox(slide, icon, left + Inches(0.2), top + Inches(0.15), Inches(0.8), Inches(0.6),
                font_size=26, align=PP_ALIGN.LEFT, rtl=False)
    add_textbox(slide, title, left + Inches(0.2), top + Inches(0.2), Inches(5.8), Inches(0.65),
                font_size=18, bold=True, color=color)
    add_textbox(slide, desc, left + Inches(0.2), top + Inches(0.85), Inches(5.8), Inches(1.5),
                font_size=14, color=WHITE)

add_logo_placeholder(slide)
add_slide_number(slide, 8)


# ═══════════════════════════════════════════════════════════════════
# SLIDE 9 — Summary Recap
# ═══════════════════════════════════════════════════════════════════
slide = prs.slides.add_slide(blank_layout)
set_bg(slide)
add_rect(slide, Inches(0), Inches(0), SLIDE_W, Inches(0.08), CYBER_CYAN)
add_rect(slide, Inches(0), Inches(7.42), SLIDE_W, Inches(0.08), LIME_GREEN)

add_textbox(slide, "خلاصة الكلام  (Summary)",
    Inches(0.3), Inches(0.2), Inches(12.7), Inches(0.7),
    font_size=32, bold=True, color=WHITE)

recap_items = [
    (LIME_GREEN,  "✅", "مهارات الوكيل  (Agent Skills for Power BI)",      "بناء كامل بالكلام الطبيعي أو لقطة شاشة"),
    (CYBER_CYAN,  "✅", "تطبيقات فابريك  (Fabric Apps for Semantic Models)", "تطبيقات ويب أصيلة فوق موديل البيانات"),
    (LIME_GREEN,  "✅", "بروتوكول السياق النموذجي  (MCP Servers)",          "جسر احترافي بين الوكلاء وباور بي آي"),
    (CYBER_CYAN,  "✅", "ذكاء فابريك  (Fabric IQ)",                        "الطبقة الذكية للدقة والحوكمة"),
]

for i, (color, icon, title, desc) in enumerate(recap_items):
    top = Inches(1.2 + i * 1.4)
    add_rect(slide, Inches(0.4), top, Inches(12.5), Inches(1.15), DARK_CARD)
    add_rect(slide, Inches(0.4), top, Inches(0.07), Inches(1.15), color)
    add_textbox(slide, icon, Inches(0.6), top + Inches(0.2), Inches(0.5), Inches(0.65),
                font_size=22, align=PP_ALIGN.LEFT, rtl=False)
    add_textbox(slide, title, Inches(1.2), top + Inches(0.08), Inches(7.0), Inches(0.5),
                font_size=18, bold=True, color=color)
    add_textbox(slide, desc, Inches(1.2), top + Inches(0.55), Inches(11.0), Inches(0.5),
                font_size=15, color=WHITE)

add_logo_placeholder(slide)
add_slide_number(slide, 9)


# ═══════════════════════════════════════════════════════════════════
# SLIDE 10 — CTA
# ═══════════════════════════════════════════════════════════════════
slide = prs.slides.add_slide(blank_layout)
set_bg(slide)
add_rect(slide, Inches(0), Inches(0), SLIDE_W, Inches(0.08), LIME_GREEN)
add_rect(slide, Inches(0), Inches(7.42), SLIDE_W, Inches(0.08), CYBER_CYAN)

# Glow card center
add_rect(slide, Inches(1.5), Inches(0.8), Inches(10.33), Inches(5.8), DARK_CARD)
add_rect(slide, Inches(1.5), Inches(0.8), Inches(0.07), Inches(5.8), LIME_GREEN)
add_rect(slide, Inches(11.76), Inches(0.8), Inches(0.07), Inches(5.8), LIME_GREEN)

add_textbox(slide, "عصر الذكاء الاصطناعي الوكيل ما جاء ليحل محلك",
    Inches(1.7), Inches(1.1), Inches(9.9), Inches(0.8),
    font_size=26, bold=True, color=WHITE)
add_textbox(slide, "جاء ليضاعف قدرتك 🚀",
    Inches(1.7), Inches(1.85), Inches(9.9), Inches(0.7),
    font_size=28, bold=True, color=LIME_GREEN)

add_rect(slide, Inches(2), Inches(2.65), Inches(9.33), Inches(0.04), CYBER_CYAN)

add_textbox(slide, "اشترك في القناة لمتابعة أحدث محتوى  (Subscribe for Latest Content)",
    Inches(1.7), Inches(2.8), Inches(9.9), Inches(0.65),
    font_size=20, color=CYBER_CYAN, bold=True)

add_textbox(slide, "وفي التعليقات: أي ميزة أثارت اهتمامك أكثر؟",
    Inches(1.7), Inches(3.45), Inches(9.9), Inches(0.6),
    font_size=18, color=WHITE)
add_textbox(slide, "مهارات الوكيل ولا تطبيقات فابريك؟  (Agent Skills vs Fabric Apps?)",
    Inches(1.7), Inches(3.95), Inches(9.9), Inches(0.5),
    font_size=16, color=LIME_GREEN)

add_textbox(slide, "@HakamDataStudio",
    Inches(1.7), Inches(4.7), Inches(9.9), Inches(0.7),
    font_size=30, bold=True, color=CYBER_CYAN, align=PP_ALIGN.CENTER, rtl=False)

add_logo_placeholder(slide)
add_slide_number(slide, 10)


# ─── Save ────────────────────────────────────────────────────────
output_path = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "agentic-ai-presentation.pptx"
)
prs.save(output_path)
print(f"[OK] Presentation saved: {output_path}")
print(f"     Slides: {len(prs.slides)}")
