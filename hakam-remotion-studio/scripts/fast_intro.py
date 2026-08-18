import subprocess
import os
import sys
import whisper

sys.stdout.reconfigure(encoding='utf-8')

print("[Fast Intro Scan] Clipping first 45s of audio to locate 'تخيل معي'...")
subprocess.run([
    'ffmpeg', '-y', '-hide_banner', '-loglevel', 'error',
    '-i', 'public/DHBP6661.MP4',
    '-t', '45',
    '-ac', '1', '-ar', '16000',
    'temp_intro.wav'
], check=True)

model = whisper.load_model('tiny')
res = model.transcribe('temp_intro.wav', language='ar')

print("\n--- INTRO TIMESTAMPS ---")
for s in res['segments']:
    txt = s['text'].strip()
    print(f"[{s['start']:.2f}s -> {s['end']:.2f}s] {txt}")

if os.path.exists('temp_intro.wav'):
    os.remove('temp_intro.wav')
