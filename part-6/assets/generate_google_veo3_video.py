#!/usr/bin/env python3
"""
generate_google_veo3_video.py — Google Veo 3.1 AI Video Generation Script
========================================================================
Channel: @HakamDataStudio
Scene: Scene 1 — Hook (00:00–00:45)
Model: Google Veo 3.1 (veo-3.1-generate-preview)
"""

import os
import sys
import time
import shutil
from pathlib import Path
from dotenv import load_dotenv

# Automatically load environment variables from .env if present
load_dotenv()
load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

ASSETS_DIR = Path(__file__).resolve().parent
KEYFRAME_PATH = ASSETS_DIR / "broll_opening_hook_16x9.png"
if not KEYFRAME_PATH.exists():
    KEYFRAME_PATH = ASSETS_DIR / "broll_opening_hook.png"

OUTPUT_MP4 = ASSETS_DIR / "veo3_scene1_hook.mp4"
OUTPUT_BROLL_MP4 = ASSETS_DIR / "broll_opening_hook_video.mp4"

PROMPT = (
    "High-energy 4K cinematic studio opening shot (8s). Presenter Hakam in a sharp beige double-breasted suit "
    "stands in a futuristic tech studio with dark cyber-slate (#0D2229) and deep emerald (#051915) background. "
    "He looks directly into the camera with confident energy, then turns and gestures toward a glowing 3D laptop screen. "
    "Holographic streams of electric cyber cyan (#00D2FF, #00E5FF) and neon lime (#39FF14, #BFFF00) data particles flow "
    "from an AI prompt box into a live multi-page Power BI dashboard floating in 3D space. KPI cards and bar charts snap "
    "into place in real time with glassy glowing UI panels. Fast, punchy camera push-in zoom, 60fps cinematic motion, shallow depth of field."
)

def main():
    print("========================================================================")
    print(" 🎬 Google Veo 3.1 Video Generation — Scene 1 Hook (@HakamDataStudio)")
    print("========================================================================")
    print(f"📌 Model:           veo-2.0-generate-001 / veo-3.1-generate-preview")
    print(f"📌 Keyframe Image:  {KEYFRAME_PATH}")
    print(f"📌 Target Output:   {OUTPUT_MP4}")
    print(f"📌 Aspect Ratio:    16:9 | Duration: 8s")

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

    if not api_key:
        print("\n⚠️  [CREDENTIAL NOTICE] GEMINI_API_KEY environment variable is not set.")
        print("Please set your Gemini API Key in .env or your terminal environment:")
        print("  $env:GEMINI_API_KEY='your_api_key_here'")
        print("\n⚡ Automatically deploying Gemini Omni 3.7 Video Director fallback to generate 60fps hook...")
        from generate_omni_hook_video import generate_cinematic_hook_video
        generate_cinematic_hook_video()
        return

    try:
        from google import genai
        from google.genai import types

        print("\n🚀 Initializing Google GenAI client...")
        client = genai.Client(api_key=api_key)

        print("📡 Uploading keyframe reference to Google GenAI...")
        with open(KEYFRAME_PATH, "rb") as f:
            image_bytes = f.read()

        image_input = types.Image.from_bytes(
            data=image_bytes,
            mime_type="image/png"
        )

        models_to_try = ["veo-3.1-generate-preview", "veo-2.0-generate-001", "veo-2.0-generate-preview"]
        operation = None
        for model_name in models_to_try:
            try:
                print(f"⚡ Calling Google Veo model: {model_name}...")
                operation = client.models.generate_videos(
                    model=model_name,
                    prompt=PROMPT,
                    image=image_input,
                    config=types.GenerateVideosConfig(
                        aspect_ratio="16:9",
                        duration_seconds=8,
                        person_generation="allow_adult"
                    )
                )
                break
            except Exception as model_err:
                print(f"⚠️ Model {model_name} failed: {model_err}. Trying next fallback...")

        if not operation:
            print("❌ All Veo model endpoints failed. Falling back to Gemini Omni Video Director...")
            from generate_omni_hook_video import generate_cinematic_hook_video
            generate_cinematic_hook_video()
            return

        print(f"⏳ Veo 3.1 generation started (Operation: {operation.name}). Polling for completion...")

        while not operation.done:
            print("⏳ Generating video with Google Veo 3.1 in cloud cluster (checking status every 10s)...")
            time.sleep(10)
            operation = client.operations.get(operation)

        if operation.error:
            print(f"❌ Veo 3.1 Generation Error: {operation.error}")
            return

        generated_video = operation.result.generated_videos[0]
        video_uri = generated_video.video.uri
        print(f"🎉 Veo 3.1 video generation complete! Downloading from {video_uri}...")

        # Download or write video bytes
        if hasattr(generated_video.video, 'video_bytes') and generated_video.video.video_bytes:
            with open(OUTPUT_MP4, "wb") as f:
                f.write(generated_video.video.video_bytes)
        else:
            client.files.download(file=generated_video.video, path=str(OUTPUT_MP4))

        print(f"✅ Saved Google Veo 3.1 video to: {OUTPUT_MP4}")

        import shutil
        shutil.copyfile(OUTPUT_MP4, OUTPUT_BROLL_MP4)
        print(f"✅ Updated master B-Roll video: {OUTPUT_BROLL_MP4}")

    except Exception as e:
        print(f"❌ Exception occurred: {e}")

if __name__ == "__main__":
    main()
