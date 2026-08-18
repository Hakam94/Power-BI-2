import os
import sys
import json
import subprocess
import whisper

sys.stdout.reconfigure(encoding='utf-8')

print("=" * 60)
print("  Hakam Data Studio — Fast Dual Arabic + English Captions")
print("=" * 60)

video_file = "public/DHBP6661.MP4"
wav_file = "temp_audio_16k.wav"
speech_segments_file = "public/speech_segments.json"
output_file = "public/captions.json"

# Key English phrase translations for key video sections
ENGLISH_TRANSLATIONS = [
    ("تخيل معي", "IMAGINE THIS..."),
    ("بناء التقرير كاملاً", "BUILDING FULL REPORTS FROM A SINGLE PROMPT"),
    ("مايكروسوفت", "MICROSOFT ANNOUNCED AT BUILD 2026"),
    ("أهلاً وسهلاً", "WELCOME TO HAKAM DATA STUDIO"),
    ("الذكاء الاصطناعي الوكيل", "AGENTIC AI FOR POWER BI & FABRIC"),
    ("ثلاث قدرات ثورية", "3 BREAKTHROUGH CAPABILITIES IN POWER BI"),
    ("بروتوكول", "MODEL CONTEXT PROTOCOL (MCP) ARCHITECTURE"),
    ("طبقة الذكاء", "FABRIC IQ SEMANTIC GOVERNANCE LAYER"),
    ("مستقبل", "THE FUTURE OF DATA ANALYTICS IS HERE"),
]

def find_english_translation(arabic_text):
    for ar_phrase, en_trans in ENGLISH_TRANSLATIONS:
        if ar_phrase in arabic_text:
            return en_trans
    return "AGENTIC AI FOR POWER BI — BUILD 2026"

# Step 1: Extract 16kHz WAV
print("[Step 1] Extracting 16kHz WAV audio stream with FFmpeg...")
subprocess.run([
    'ffmpeg', '-y', '-hide_banner', '-loglevel', 'error',
    '-i', video_file,
    '-ar', '16000', '-ac', '1',
    wav_file
], check=True)

# Load speech segments to map trimmed composition timestamps
clips = []
if os.path.exists(speech_segments_file):
    with open(speech_segments_file, 'r', encoding='utf-8') as f:
        seg_data = json.load(f)
        clips = seg_data.get('clips', [])
        print(f"[Segments] Loaded {len(clips)} active speech clips")

# Step 2: Run Whisper for Arabic Word Timestamps
print("[Step 2] Transcribing Arabic word timestamps with Whisper tiny...")
model = whisper.load_model('tiny')
ar_result = model.transcribe(wav_file, language='ar', word_timestamps=True)

raw_captions = []

for segment in ar_result.get('segments', []):
    seg_arabic = segment.get('text', '')
    seg_english = find_english_translation(seg_arabic)

    for word_info in segment.get('words', []):
        word = word_info['word']
        start_sec = word_info['start']
        end_sec = word_info['end']

        word_comp_start_sec = None
        word_comp_end_sec = None

        if clips:
            current_comp_accum = 0.0
            for clip in clips:
                c_start = clip['srcStartSec']
                c_end = clip['srcEndSec']
                c_dur = clip['durationSec']

                if start_sec >= c_start - 0.2 and start_sec <= c_end + 0.2:
                    offset_in_clip = max(0.0, start_sec - c_start)
                    word_comp_start_sec = current_comp_accum + offset_in_clip
                    word_comp_end_sec = word_comp_start_sec + (end_sec - start_sec)
                    break
                current_comp_accum += c_dur
        else:
            word_comp_start_sec = start_sec
            word_comp_end_sec = end_sec

        if word_comp_start_sec is not None:
            raw_captions.append({
                "text": word,
                "textEn": seg_english,
                "startMs": int(word_comp_start_sec * 1000),
                "endMs": int(word_comp_end_sec * 1000),
                "timestampMs": int(word_comp_start_sec * 1000),
                "confidence": None
            })

if os.path.exists(wav_file):
    os.remove(wav_file)

print(f"[Step 3] ✅ Generated {len(raw_captions)} dual-language word tokens")

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(raw_captions, f, ensure_ascii=False, indent=2)

print(f"✅ Written Dual Arabic + English Captions JSON to: {output_file}\n")
