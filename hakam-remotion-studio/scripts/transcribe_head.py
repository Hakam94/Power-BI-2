import whisper
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("[Whisper] Loading Whisper AI model to locate 'تخيل معي' timestamp...")
model = whisper.load_model('base')
result = model.transcribe('public/DHBP6661.MP4', language='ar')

print("\n--- FIRST 15 SEGMENTS ---")
segments_data = []
for seg in result['segments'][:20]:
    txt = seg['text'].strip()
    print(f"[{seg['start']:.2f}s -> {seg['end']:.2f}s] {txt}")
    segments_data.append({
        'start': seg['start'],
        'end': seg['end'],
        'text': txt
    })

with open('public/whisper_head.json', 'w', encoding='utf-8') as f:
    json.dump(segments_data, f, ensure_ascii=False, indent=2)

print("\nSaved to public/whisper_head.json")
