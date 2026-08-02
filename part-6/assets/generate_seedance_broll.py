import os
import sys
import time
import requests
import json

# ==============================================================================
# Seedance AI Video Generation Integration Script — Part 6 B-Roll Hook
# Channel: @HakamDataStudio
# ==============================================================================

ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGE_PATH = os.path.join(ASSETS_DIR, "broll_opening_hook.png")
OUTPUT_VIDEO_PATH = os.path.join(ASSETS_DIR, "seedance_broll_hook_part6.mp4")

# Check API Key from Environment
SEEDANCE_API_KEY = os.getenv("SEEDANCE_API_KEY") or os.getenv("BYTEDANCE_API_KEY") or os.getenv("SEEDANCE_KEY")

API_ENDPOINT = "https://api.seedance.ai/v1/video/generations"  # Standard Seedance AI endpoint

PROMPT = (
    "High-energy cinematic studio shot of a handsome male presenter in a beige double-breasted suit "
    "pointing rightward toward a glowing 3D laptop. Holographic cyan (#00D2FF) and neon lime (#BFFF00) "
    "data particles stream from an AI prompt box into a live multi-page Power BI dashboard assembling "
    "KPI cards and bar charts automatically. Smooth 4K cinematic camera movement, hyper-realistic, 60fps."
)

def main():
    print("========================================================================")
    print(" 🎬 Seedance AI Video Generator — Part 6 B-Roll Hook Automation")
    print("========================================================================")
    print(f"📌 Keyframe Image: {IMAGE_PATH}")
    print(f"📌 Output Path:    {OUTPUT_VIDEO_PATH}")

    if not SEEDANCE_API_KEY:
        print("\n⚠️  [CREDENTIAL NOTICE] SEEDANCE_API_KEY environment variable is missing.")
        print("Please set your Seedance API Key in your environment or .env file:")
        print("  Windows PowerShell: $env:SEEDANCE_API_KEY='your_api_key_here'")
        print("  CMD: set SEEDANCE_API_KEY=your_api_key_here")
        print("\nDummy payload structure created for reference:")
        print(json.dumps({
            "prompt": PROMPT,
            "image_url": IMAGE_PATH,
            "aspect_ratio": "16:9",
            "motion_bucket_id": 127,
            "fps": 60,
            "duration": 5
        }, indent=2))
        return

    headers = {
        "Authorization": f"Bearer {SEEDANCE_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "prompt": PROMPT,
        "aspect_ratio": "16:9",
        "duration": 5,
        "fps": 60,
        "camera_motion": "pan_right_zoom_in"
    }

    print("\n🚀 Initiating Seedance AI video generation request...")
    try:
        response = requests.post(API_ENDPOINT, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        task_id = data.get("id") or data.get("task_id")
        print(f"✅ Generation task submitted! Task ID: {task_id}")
        
        # Poll for completion
        status_url = f"{API_ENDPOINT}/{task_id}"
        while True:
            time.sleep(5)
            status_res = requests.get(status_url, headers=headers, timeout=30)
            status_data = status_res.json()
            status = status_data.get("status")
            
            print(f"⏳ Task Status: {status}...")
            if status in ["succeeded", "completed", "done"]:
                video_url = status_data.get("video_url") or status_data.get("output", {}).get("video_url")
                print(f"🎉 Video generation complete! Downloading from {video_url}...")
                
                vid_res = requests.get(video_url, timeout=60)
                with open(OUTPUT_VIDEO_PATH, "wb") as f:
                    f.write(vid_res.content)
                    
                print(f"✅ Video saved successfully to: {OUTPUT_VIDEO_PATH}")
                break
            elif status in ["failed", "error"]:
                print(f"❌ Video generation failed: {status_data.get('error')}")
                break

    except Exception as e:
        print(f"❌ Exception occurred: {e}")

if __name__ == "__main__":
    main()
