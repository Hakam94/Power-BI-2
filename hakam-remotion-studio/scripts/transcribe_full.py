import whisper
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEO = os.path.join(ROOT, 'public', 'DHBP6661.MP4')
MODEL_NAME = 'small'

print(f"[Whisper] Loading '{MODEL_NAME}' model...", flush=True)
model = whisper.load_model(MODEL_NAME)

print("[Whisper] Pass 1/2: transcribing Arabic with word-level timestamps...", flush=True)
ar_result = model.transcribe(
    VIDEO,
    language='ar',
    task='transcribe',
    word_timestamps=True,
    verbose=False,
)

ar_out = []
for seg in ar_result['segments']:
    words = [
        {"text": w["word"].strip(), "startMs": round(w["start"] * 1000), "endMs": round(w["end"] * 1000)}
        for w in seg.get("words", [])
        if w.get("word", "").strip()
    ]
    ar_out.append({
        "startMs": round(seg["start"] * 1000),
        "endMs": round(seg["end"] * 1000),
        "text": seg["text"].strip(),
        "words": words,
    })

ar_path = os.path.join(ROOT, 'public', 'whisper_full_ar.json')
with open(ar_path, 'w', encoding='utf-8') as f:
    json.dump(ar_out, f, ensure_ascii=False, indent=2)
print(f"[Whisper] Saved {len(ar_out)} Arabic segments -> {ar_path}", flush=True)

print("[Whisper] Pass 2/2: translating to English (segment-level)...", flush=True)
en_result = model.transcribe(
    VIDEO,
    language='ar',
    task='translate',
    word_timestamps=False,
    verbose=False,
)

en_out = [
    {
        "startMs": round(seg["start"] * 1000),
        "endMs": round(seg["end"] * 1000),
        "text": seg["text"].strip(),
    }
    for seg in en_result['segments']
]

en_path = os.path.join(ROOT, 'public', 'whisper_full_en.json')
with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en_out, f, ensure_ascii=False, indent=2)
print(f"[Whisper] Saved {len(en_out)} English segments -> {en_path}", flush=True)

print("[Whisper] DONE.", flush=True)
