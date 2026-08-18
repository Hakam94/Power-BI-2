import json
import os

FULL_SCRIPT_PAIRS = [
    # ── 1. HOOK (0:00 - 0:32 / 0ms - 32500ms) ──
    { "id": "h-1", "start_ms": 400, "end_ms": 2200, "ar": "تخيّل معي...", "en": "IMAGINE THIS..." },
    { "id": "h-2", "start_ms": 2300, "end_ms": 5800, "ar": "بدل ما تقعد ساعات تبني موديل بيانات في Power BI", "en": "INSTEAD OF SPENDING HOURS BUILDING DATA MODELS IN POWER BI" },
    { "id": "h-3", "start_ms": 5900, "end_ms": 8200, "ar": "تكتب جملة واحدة بالإنجليزي", "en": "YOU WRITE JUST A SINGLE PLAIN ENGLISH PROMPT" },
    { "id": "h-4", "start_ms": 8300, "end_ms": 13200, "ar": "وبالذكاء الاصطناعي ينشئ لك الجداول والعلاقات والـ DAX والتقارير كاملة", "en": "AND AI GENERATES TABLES, DAX & REPORTS AUTOMATICALLY" },
    { "id": "h-5", "start_ms": 13300, "end_ms": 15800, "ar": "بدون ما تلمس الماوس!", "en": "WITHOUT EVEN TOUCHING YOUR MOUSE!" },
    { "id": "h-6", "start_ms": 16000, "end_ms": 18200, "ar": "هذا مش خيال علمي", "en": "THIS IS NOT SCIENCE FICTION" },
    { "id": "h-7", "start_ms": 18300, "end_ms": 22000, "ar": "هذا ما أعلنت عنه Microsoft في Build 2026 قبل أسابيع قليلة", "en": "THIS IS WHAT MICROSOFT ANNOUNCED AT BUILD 2026 FEW WEEKS AGO" },
    { "id": "h-8", "start_ms": 22100, "end_ms": 25200, "ar": "أهلاً وسهلاً، أنا حكم، من Hakam Data Studio", "en": "WELCOME! I AM HAKAM FROM HAKAM DATA STUDIO" },
    { "id": "h-9", "start_ms": 25300, "end_ms": 28800, "ar": "وهذا الفيديو راح يكون من أهم الفيديوهات اللي تشوفها", "en": "THIS WILL BE ONE OF THE MOST IMPORTANT VIDEOS YOU WATCH" },
    { "id": "h-10", "start_ms": 28900, "end_ms": 32500, "ar": "لأن اليوم نتكلم عن التحول الجذري — عصر الـ Agentic AI", "en": "BECAUSE TODAY WE COVER THE MAJOR SHIFT — ERA OF AGENTIC AI" },

    # ── 2. CONTEXT (0:33 - 2:00 / 32600ms - 120000ms) ──
    { "id": "ctx-1", "start_ms": 33000, "end_ms": 37500, "ar": "خلونا نرجع شوي للوراء عشان نفهم كيف وصلنا لهنا", "en": "LET US STEP BACK TO UNDERSTAND HOW WE GOT HERE" },
    { "id": "ctx-2", "start_ms": 38000, "end_ms": 45000, "ar": "لأكثر من 20 سنة، كان عالم البيانات يعتمد على نموذج واحد: أنت تسأل والـ Dashboard يجاوب", "en": "FOR 20+ YEARS, DATA WAS PASSIVE: YOU ASK, DASHBOARDS ANSWER" },
    { "id": "ctx-3", "start_ms": 45500, "end_ms": 53000, "ar": "بعدين جاء الـ Copilot — مساعد ذكي تكتب له وينفذ لك", "en": "THEN COPILOT ARRIVED — AN AI ASSISTANT THAT EXECUTES PROMPTS" },
    { "id": "ctx-4", "start_ms": 53500, "end_ms": 62000, "ar": "واليوم نحن في المرحلة الثالثة — عصر الـ Agentic AI، الذكاء الاصطناعي الوكيل", "en": "TODAY WE ENTER STAGE 3 — AGENTIC AI: AUTONOMOUS AI AGENTS" },
    { "id": "ctx-5", "start_ms": 62500, "end_ms": 71000, "ar": "مش مجرد مساعد يجاوب أسئلة، بل وكيل يخطط، يفكر، ينفذ، ويتعامل مع أنظمة متعددة لوحده", "en": "NOT JUST AN ASSISTANT, BUT AN AGENT THAT PLANS, EXECUTES & MANAGES MULTIPLE SYSTEMS" },

    # ── 3. CAPABILITIES (2:00 - 5:30 / 120100ms - 330000ms) ──
    { "id": "cap-1", "start_ms": 120500, "end_ms": 128000, "ar": "في Microsoft Build 2026 أعلنت عن 3 تغييرات ضخمة في Power BI و Fabric", "en": "MICROSOFT ANNOUNCED 3 MAJOR GAME-CHANGERS FOR POWER BI & FABRIC" },
    { "id": "cap-2", "start_ms": 128500, "end_ms": 138000, "ar": "التغيير الأول: Agent Skills for Power BI في Fabric Marketplace", "en": "CHANGE 1: AGENT SKILLS FOR POWER BI IN FABRIC MARKETPLACE" },
    { "id": "cap-3", "start_ms": 138500, "end_ms": 149000, "ar": "تطلب منه بناء موديل المبيعات وهو ينشئ الجداول، الـ DAX، وصفحات التقرير تلقائياً", "en": "PROMPT FOR SALES MODEL & AGENT BUILDS TABLES, DAX & REPORTS AUTOMATICALLY" },
    { "id": "cap-4", "start_ms": 149500, "end_ms": 160000, "ar": "وتقدر تحطله Screenshot لتصميم تقرير، وهو يعيد إنشاؤه في Power BI مباشرة", "en": "OR UPLOAD A REPORT SCREENSHOT, AND AGENT RECREATES IT DIRECTLY IN POWER BI" },

    # ── 4. MCP PROTOCOL (5:30 - 7:00 / 330100ms - 420000ms) ──
    { "id": "mcp-1", "start_ms": 330500, "end_ms": 341000, "ar": "التغيير الثاني: بروتوكول MCP — Model Context Protocol مع Power BI", "en": "CHANGE 2: MODEL CONTEXT PROTOCOL (MCP) INTEGRATION WITH POWER BI" },
    { "id": "mcp-2", "start_ms": 341500, "end_ms": 352000, "ar": "الآن الـ AI Agents تتحدث مباشرة مع الـ Semantic Models باستخدام معايير مفتوحة", "en": "AI AGENTS TALK DIRECTLY TO SEMANTIC MODELS USING OPEN STANDARDS" },

    # ── 5. FABRIC IQ (7:00 - 8:15 / 420100ms - 495000ms) ──
    { "id": "fiq-1", "start_ms": 420500, "end_ms": 431000, "ar": "التغيير الثالث: طبقة الذكاء الدلالي — Fabric IQ & Semantic Models", "en": "CHANGE 3: FABRIC IQ SEMANTIC INTELLIGENCE LAYER" },

    # ── 6. IMPACT (8:15 - 9:15 / 495100ms - 555000ms) ──
    { "id": "imp-1", "start_ms": 495500, "end_ms": 506000, "ar": "التأثير المباشر: زيادة الإنتاجية وتوفير 14.2 ساعة أسبوعياً لكل محلل بيانات", "en": "DIRECT IMPACT: SAVING 14.2 HOURS PER WEEK FOR EVERY DATA ANALYST" },

    # ── 7. OUTRO (9:15 - 10:00 / 555100ms - 600000ms) ──
    { "id": "out-1", "start_ms": 555500, "end_ms": 568000, "ar": "اشترك في Hakam Data Studio لتكون في مقدمة ثورة الذكاء الاصطناعي!", "en": "SUBSCRIBE TO HAKAM DATA STUDIO TO STAY AHEAD IN DATA & AI!" }
]

def generate_ts():
    segments_code = []
    for pair in FULL_SCRIPT_PAIRS:
        words = pair["ar"].split()
        duration = pair["end_ms"] - pair["start_ms"]
        word_dur = duration / max(1, len(words))
        
        words_code = []
        for i, w in enumerate(words):
            w_start = int(pair["start_ms"] + (i * word_dur))
            w_end = int(pair["start_ms"] + ((i + 1) * word_dur))
            # Escape quotes
            clean_word = w.replace("'", "\\'")
            words_code.append(f"      {{ text: '{clean_word}', startMs: {w_start}, endMs: {w_end} }}")
            
        words_joined = ",\n".join(words_code)
        clean_ar = pair["ar"].replace("'", "\\'")
        clean_en = pair["en"].replace("'", "\\'")
        
        seg = f"""  {{
    id: '{pair["id"]}',
    startMs: {pair["start_ms"]},
    endMs: {pair["end_ms"]},
    arabic: '{clean_ar}',
    english: '{clean_en}',
    words: [
{words_joined}
    ],
  }}"""
        segments_code.append(seg)

    joined_segs = ",\n".join(segments_code)
    
    content = f"""import {{ CaptionSegment }} from './captionTypes';

export const CANONICAL_HOOK_CAPTIONS: CaptionSegment[] = [
{joined_segs}
];
"""
    return content

if __name__ == "__main__":
    ts_content = generate_ts()
    out_path = os.path.join(os.path.dirname(__file__), "..", "src", "captions", "captionData.ts")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"SUCCESS: Wrote canonical full-video captions to {out_path}")
