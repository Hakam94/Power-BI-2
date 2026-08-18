import json
import os

# Complete script sentence pairings (Arabic spoken text & English translation) for the video
SCRIPT_PAIRS = [
    # ── HOOK (0:00 - 0:32 / 0ms - 32000ms) ──
    {
        "start_ms": 400,
        "end_ms": 2200,
        "ar": "تخيّل معي...",
        "en": "IMAGINE THIS..."
    },
    {
        "start_ms": 2300,
        "end_ms": 5800,
        "ar": "بدل ما تقعد ساعات تبني موديل بيانات في Power BI",
        "en": "INSTEAD OF SPENDING HOURS BUILDING DATA MODELS IN POWER BI"
    },
    {
        "start_ms": 5900,
        "end_ms": 8200,
        "ar": "تكتب جملة واحدة بالإنجليزي",
        "en": "YOU WRITE JUST A SINGLE PLAIN ENGLISH PROMPT"
    },
    {
        "start_ms": 8300,
        "end_ms": 13200,
        "ar": "وبالذكاء الاصطناعي ينشئ لك الجداول والعلاقات والـ DAX والتقارير كاملة",
        "en": "AND AI GENERATES TABLES, DAX & FULL REPORTS AUTOMATICALLY"
    },
    {
        "start_ms": 13300,
        "end_ms": 15800,
        "ar": "بدون ما تلمس الماوس!",
        "en": "WITHOUT EVEN TOUCHING YOUR MOUSE!"
    },
    {
        "start_ms": 16000,
        "end_ms": 18200,
        "ar": "هذا مش خيال علمي",
        "en": "THIS IS NOT SCIENCE FICTION"
    },
    {
        "start_ms": 18300,
        "end_ms": 22000,
        "ar": "هذا ما أعلنت عنه Microsoft في Build 2026 قبل أسابيع قليلة",
        "en": "THIS IS WHAT MICROSOFT ANNOUNCED AT BUILD 2026 FEW WEEKS AGO"
    },
    {
        "start_ms": 22100,
        "end_ms": 25200,
        "ar": "أهلاً وسهلاً، أنا حكم، من Hakam Data Studio",
        "en": "WELCOME! I AM HAKAM FROM HAKAM DATA STUDIO"
    },
    {
        "start_ms": 25300,
        "end_ms": 28800,
        "ar": "وهذا الفيديو راح يكون من أهم الفيديوهات اللي تشوفها",
        "en": "THIS WILL BE ONE OF THE MOST IMPORTANT VIDEOS YOU WATCH"
    },
    {
        "start_ms": 28900,
        "end_ms": 32500,
        "ar": "لأن اليوم نتكلم عن التحول الجذري — عصر الـ Agentic AI",
        "en": "BECAUSE TODAY WE COVER THE MAJOR SHIFT — ERA OF AGENTIC AI"
    },
    # ── CONTEXT (0:33 - 1:15 / 32600ms - 75000ms) ──
    {
        "start_ms": 33000,
        "end_ms": 36800,
        "ar": "خلونا نرجع شوي للوراء عشان نفهم كيف وصلنا لهنا",
        "en": "LET US STEP BACK TO UNDERSTAND HOW WE GOT HERE"
    },
    {
        "start_ms": 37000,
        "end_ms": 42000,
        "ar": "لأكثر من 20 سنة، كان عالم البيانات يعتمد على نموذج واحد: أنت تسأل والـ Dashboard يجاوب",
        "en": "FOR 20+ YEARS, DATA WAS PASSIVE: YOU ASK, DASHBOARDS ANSWER"
    },
    {
        "start_ms": 42200,
        "end_ms": 48000,
        "ar": "بعدين جاء الـ Copilot — مساعد ذكي تكتب له وينفذ لك",
        "en": "THEN COPILOT ARRIVED — AN AI ASSISTANT THAT EXECUTES YOUR PROMPTS"
    },
    {
        "start_ms": 48200,
        "end_ms": 55000,
        "ar": "والآن نحن في المرحلة الثالثة — عصر الـ Agentic AI، الذكاء الاصطناعي الوكيل",
        "en": "NOW WE ENTER STAGE 3 — AGENTIC AI: AUTONOMOUS AI AGENTS"
    },
    # ── ANNOUNCEMENTS / MCP / FABRIC IQ / OUTRO ──
    {
        "start_ms": 55200,
        "end_ms": 62000,
        "ar": "3 تغييرات جوهرية: Agent Skills for Power BI + MCP Protocol + Fabric IQ",
        "en": "3 GAME CHANGERS: AGENT SKILLS + MCP PROTOCOL + FABRIC IQ"
    },
    {
        "start_ms": 62200,
        "end_ms": 70000,
        "ar": "الآن الـ Agent يستطيع بناء الـ Semantic Model والـ DAX والتقرير بالكامل تلقائياً",
        "en": "NOW AGENTS BUILD SEMANTIC MODELS, DAX & REPORTS END-TO-END"
    },
    {
        "start_ms": 70200,
        "end_ms": 75000,
        "ar": "اشترك في القناة لتبقى في مقدمة ثورة تحليل البيانات!",
        "en": "SUBSCRIBE TO HAKAM DATA STUDIO TO STAY AHEAD IN DATA & AI!"
    }
]

def generate_tokens():
    tokens = []
    for pair in SCRIPT_PAIRS:
        words = pair["ar"].split()
        if not words:
            continue
        duration = pair["end_ms"] - pair["start_ms"]
        word_dur = duration / len(words)
        
        for i, word in enumerate(words):
            token_start = int(pair["start_ms"] + (i * word_dur))
            token_end = int(pair["start_ms"] + ((i + 1) * word_dur))
            tokens.append({
                "text": word,
                "textEn": pair["en"],
                "startMs": token_start,
                "endMs": token_end,
                "timestampMs": token_start,
                "confidence": 0.99
            })
    return tokens

if __name__ == "__main__":
    captions = generate_tokens()
    out_path = os.path.join(os.path.dirname(__file__), "..", "public", "captions.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(captions, f, ensure_ascii=False, indent=2)
    print(f"SUCCESS: Generated {len(captions)} caption tokens to {out_path}")
