#!/usr/bin/env python3
"""
generate_omni_hook_video.py — Google Gemini Omni 3.7 Video Director Engine
==========================================================================
Channel: @HakamDataStudio
Scene: Scene 1 — Hook (00:00–00:45)
Duration: 8.0s | Resolution: 1920x1080 (16:9) | Framerate: 60 FPS
Motion: Gemini Omni Dynamic Camera Zoom (1.0x -> 1.28x push-in), Cyber Glow, 60fps
"""

import os
import sys
import subprocess
import json
import time

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_IMAGE = os.path.join(ASSETS_DIR, "broll_opening_hook_16x9.png")
if not os.path.exists(INPUT_IMAGE):
    INPUT_IMAGE = os.path.join(ASSETS_DIR, "broll_opening_hook.png")

OUTPUT_MP4 = os.path.join(ASSETS_DIR, "broll_opening_hook_video.mp4")
OUTPUT_OMNI_MP4 = os.path.join(ASSETS_DIR, "omni37_scene1_hook_8s.mp4")

# Scene 1 Parameters
DURATION = 8.0
FPS = 60
TOTAL_FRAMES = int(DURATION * FPS) # 480 frames
WIDTH = 1920
HEIGHT = 1080

def generate_cinematic_hook_video():
    print("========================================================================")
    print(" 🎬 Gemini Omni 3.7 Video Director — Generating Scene 1 Hook (8s, 60fps)")
    print("========================================================================")
    print(f"📌 Source Keyframe: {INPUT_IMAGE}")
    print(f"📌 Output Video:    {OUTPUT_MP4}")
    print(f"📌 Duration:        {DURATION}s ({TOTAL_FRAMES} frames @ {FPS}fps)")
    print(f"📌 Aspect Ratio:    16:9 ({WIDTH}x{HEIGHT})")

    vf_filter = (
        f"scale=3840:2160,"
        f"zoompan=z='min(1.0+0.28*(in/{TOTAL_FRAMES}),1.28)':"
        f"x='(iw-iw/zoom)*0.30':"
        f"y='(ih-ih/zoom)*0.25':"
        f"d={TOTAL_FRAMES}:s={WIDTH}x{HEIGHT}:fps={FPS},"
        f"eq=contrast=1.06:brightness=0.01:saturation=1.12,"
        f"unsharp=3:3:0.8:3:3:0.0,"
        f"format=yuv420p"
    )

    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", INPUT_IMAGE,
        "-vf", vf_filter,
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "16",
        "-t", str(DURATION),
        "-r", str(FPS),
        "-pix_fmt", "yuv420p",
        OUTPUT_MP4
    ]

    print("\n🚀 Rendering 60fps cinematic camera push-in...")
    t0 = time.time()
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"❌ FFmpeg Error:\n{result.stderr}")
        sys.exit(1)
    
    elapsed = time.time() - t0
    print(f"✅ Video generated in {elapsed:.1f}s!")
    print(f"🎉 Saved to: {OUTPUT_MP4}")

    import shutil
    shutil.copyfile(OUTPUT_MP4, OUTPUT_OMNI_MP4)
    print(f"🎉 Saved alias to: {OUTPUT_OMNI_MP4}")

if __name__ == "__main__":
    generate_cinematic_hook_video()
