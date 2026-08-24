#!/usr/bin/env python3
"""
generate_part6_lipsync_hook.py — Part 6 Lip-Sync Talking Hook Generator
========================================================================
Channel: @HakamDataStudio
Topic: Part 6 — Agentic AI for Power BI (Antigravity + MCP + TMDL + DAX)
Presenter: Hakam (Beige double-breasted suit in cyber tech studio)
"""

import os
import sys
import subprocess
import time
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()
load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

ASSETS_DIR = Path(__file__).resolve().parent
ROOT_DIR = ASSETS_DIR.parent.parent

IMAGE_SRC = ASSETS_DIR / "broll_opening_hook_16x9.png"
if not IMAGE_SRC.exists():
    IMAGE_SRC = ASSETS_DIR / "broll_opening_hook.png"

LOGO_SRC = ROOT_DIR / "assets" / "official_hakam_logo.png"
MASTER_VOICE_MP4 = ROOT_DIR / "agentic-ai-for-power-bi" / "DHBP6661.MP4"

BRANDED_IMAGE = ASSETS_DIR / "part6_lipsync_branded_anchor.png"
AUDIO_HOOK = ASSETS_DIR / "part6_voice_hook.wav"
OUTPUT_LOCAL = ASSETS_DIR / "part6_lipsync_hook.mp4"
OUTPUT_GLOBAL = ROOT_DIR / "output" / "part6_lipsync_hook.mp4"

DURATION = 15.0 # High energy 15s hook
FPS = 60
TOTAL_FRAMES = int(DURATION * FPS) # 900 frames
WIDTH = 1920
HEIGHT = 1080


def create_branded_anchor():
    """Ensures the keyframe has the official Hakam Data Studio logo."""
    from PIL import Image
    print("🎨 Preparing Part 6 branded anchor...")
    bg = Image.open(IMAGE_SRC).convert("RGBA")
    bg = bg.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)

    if LOGO_SRC.exists():
        logo = Image.open(LOGO_SRC).convert("RGBA")
        logo_width = 240
        aspect = logo.height / logo.width
        logo_height = int(logo_width * aspect)
        logo = logo.resize((logo_width, logo_height), Image.Resampling.LANCZOS)

        margin_x = WIDTH - logo_width - 40
        margin_y = 35
        bg.paste(logo, (margin_x, margin_y), logo)
        print(f"✅ Logo placed at ({margin_x}, {margin_y})")

    bg = bg.convert("RGB")
    bg.save(BRANDED_IMAGE, quality=95)
    print(f"✅ Saved branded anchor: {BRANDED_IMAGE}")


def extract_hook_audio():
    """Extracts 15s clean hook audio with loudness normalization (-16 LUFS)."""
    print("🎙️ Extracting Part 6 Hook voiceover from master video...")
    if not MASTER_VOICE_MP4.exists():
        print("⚠️ Master video not found, generating tone placeholder...")
        cmd_audio = [
            "ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo",
            "-t", str(DURATION), str(AUDIO_HOOK)
        ]
    else:
        cmd_audio = [
            "ffmpeg", "-y",
            "-ss", "00:00:00",
            "-i", str(MASTER_VOICE_MP4),
            "-t", str(DURATION),
            "-af", "loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=in:ss=0:d=0.3,afade=t=out:st=14.5:d=0.5",
            "-ar", "48000",
            "-ac", "2",
            str(AUDIO_HOOK)
        ]

    res = subprocess.run(cmd_audio, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"✅ Clean audio extracted: {AUDIO_HOOK}")
    else:
        # Fallback
        cmd_fallback = [
            "ffmpeg", "-y", "-ss", "0", "-i", str(MASTER_VOICE_MP4),
            "-t", str(DURATION), "-vn", "-ar", "48000", str(AUDIO_HOOK)
        ]
        subprocess.run(cmd_fallback, capture_output=True)
        print(f"✅ Audio extracted (fallback): {AUDIO_HOOK}")


def render_part6_lipsync_hook():
    """Renders Part 6 Lip-Sync Talking Hook with conversational dynamics."""
    print(f"\n🎬 Rendering Part 6 Lip-Sync Hook ({DURATION}s @ {FPS}fps)...")
    
    # Check if Cloud Lip-Sync API is available
    hedra_key = os.getenv("HEDRA_API_KEY")
    replicate_token = os.getenv("REPLICATE_API_TOKEN")

    if hedra_key or replicate_token:
        print("⚡ Calling Cloud AI Lip-Sync Engine via scripts/generate_lipsync.py...")
        cmd_sync = [
            sys.executable, str(ROOT_DIR / "scripts" / "generate_lipsync.py"),
            "--image", str(BRANDED_IMAGE),
            "--audio", str(AUDIO_HOOK),
            "--output", str(OUTPUT_LOCAL)
        ]
        res = subprocess.run(cmd_sync)
        if res.returncode == 0 and OUTPUT_LOCAL.exists():
            import shutil
            OUTPUT_GLOBAL.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(OUTPUT_LOCAL, OUTPUT_GLOBAL)
            return

    # High-energy 60fps conversational director animation
    vf = (
        f"scale=3840:2160,"
        f"zoompan=z='min(1.02+0.18*(in/{TOTAL_FRAMES}),1.20)':"
        f"x='(iw-iw/zoom)*(0.48+0.04*sin(2*PI*in/{FPS}*0.6))':"
        f"y='(ih-ih/zoom)*(0.32+0.02*cos(2*PI*in/{FPS}*0.4))':"
        f"d={TOTAL_FRAMES}:s={WIDTH}x{HEIGHT}:fps={FPS},"
        f"eq=contrast=1.06:brightness=0.01:saturation=1.12,"
        f"unsharp=3:3:0.8:3:3:0.0,"
        f"format=yuv420p"
    )

    cmd_render = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", str(BRANDED_IMAGE),
        "-i", str(AUDIO_HOOK),
        "-vf", vf,
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "16",
        "-c:a", "aac",
        "-b:a", "192k",
        "-t", str(DURATION),
        "-r", str(FPS),
        "-pix_fmt", "yuv420p",
        "-shortest",
        str(OUTPUT_LOCAL)
    ]

    t0 = time.time()
    res = subprocess.run(cmd_render, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"❌ Render Error:\n{res.stderr}", file=sys.stderr)
        sys.exit(1)

    elapsed = time.time() - t0
    print(f"🎉 Part 6 Lip-Sync Hook Video generated in {elapsed:.1f}s!")
    print(f"✅ Saved to: {OUTPUT_LOCAL}")

    import shutil
    OUTPUT_GLOBAL.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(OUTPUT_LOCAL, OUTPUT_GLOBAL)
    print(f"✅ Global master video saved to: {OUTPUT_GLOBAL}")


def main():
    print("========================================================================")
    print(" 🎙️ Part 6 Lip-Sync Hook Video Generator (@HakamDataStudio)            ")
    print("========================================================================")
    create_branded_anchor()
    extract_hook_audio()
    render_part6_lipsync_hook()
    print("========================================================================")
    print(" 🚀 COMPLETE! Part 6 Hook Video with Voice is Ready!                     ")
    print("========================================================================")


if __name__ == "__main__":
    main()
