import os
import sys
import time
import json

# ==============================================================================
# Gemini (Veo) AI Video Generation Script — Part 6 Full B-Roll Package
# Channel: @HakamDataStudio
#
# Generates the complete set of B-roll clips for the Part 6 video
# ("Connecting Power BI MCP to Antigravity AI"), one clip per chapter of
# youtube_video_script_part6.md, all sharing one consistent brand style so
# every shot looks like it belongs to the same video.
#
# Requires:  pip install google-genai
# Env var:   GEMINI_API_KEY  (https://aistudio.google.com/apikey)
# ==============================================================================

ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(ASSETS_DIR, "gemini_broll")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Model can be overridden via env var once you confirm the exact ID available
# to your account in Google AI Studio (Veo access is still allow-listed for
# some accounts/regions). "veo-3.1-generate-preview" is the current default
# text/image-to-video model as of this writing; "veo-3.1-fast-generate-preview"
# is a cheaper/faster variant worth trying first for iteration.
VIDEO_MODEL = os.getenv("GEMINI_VIDEO_MODEL", "veo-3.1-generate-preview")

# ------------------------------------------------------------------------------
# BRAND STYLE GUIDE — prepended to every single scene prompt so Gemini/Veo
# renders all clips with the same look, palette, and presenter identity.
# Keep this block in sync with the channel's actual brand kit.
# ------------------------------------------------------------------------------
BRAND_STYLE = (
    "Brand: @HakamDataStudio, a premium '1% BI & AI Engineer' data analytics "
    "channel. Visual identity taken directly from the channel's registered "
    "Power BI theme (Elektra873060879558101.json): dark cyber-slate "
    "background (#0D2229), glowing neon lime green primary accent (#39FF14), "
    "electric cyan secondary accent (#00D2FF), holographic data "
    "particles, glassy glowing UI panels. Presenter Hakam: confident, "
    "high-energy, direct-to-camera data engineer, beige double-breasted suit, "
    "sharp and premium. Overall mood: cinematic, hyper-realistic, futuristic "
    "tech studio, smooth camera movement, shallow depth of field, 4K, "
    "60fps-look motion, no on-screen text/captions (added later in editing)."
)

# ------------------------------------------------------------------------------
# SCENES — one per chapter of youtube_video_script_part6.md.
# `image` (optional) = keyframe/reference image in this assets folder used for
# image-to-video generation, keeping Hakam's likeness consistent across shots.
# ------------------------------------------------------------------------------
SCENES = [
    {
        "id": "01_hook",
        "timestamp": "00:00-00:45",
        "image": "broll_opening_hook.png",
        "duration_seconds": 8,
        "aspect_ratio": "16:9",
        "prompt": (
            "High-voltage opening shot. Hakam stands in a futuristic data "
            "studio, looking directly into the camera with sharp confidence, "
            "then turns and gestures toward a glowing 3D laptop screen. "
            "Streams of cyan and neon lime data particles flow from an AI "
            "prompt box into a live multi-page Power BI dashboard that "
            "assembles itself in real time — KPI cards and bar charts "
            "snapping into place automatically. Fast, punchy camera push-in."
        ),
    },
    {
        "id": "02_tool_comparison",
        "timestamp": "00:35-02:00",
        "duration_seconds": 6,
        "aspect_ratio": "16:9",
        "prompt": (
            "Clean, minimal motion-graphics shot: three glowing holographic "
            "panels floating in dark studio space, labeled with abstract "
            "tool icons for Claude Code, OpenAI Codex, and Antigravity AI. "
            "The Antigravity AI panel glows brighter in lime green and cyan "
            "and slides forward as the other two dim, implying it is the "
            "chosen free tool. No readable body text, icon-level only."
        ),
    },
    {
        "id": "03_pbip_vs_pbix",
        "timestamp": "02:00-04:00",
        "duration_seconds": 6,
        "aspect_ratio": "16:9",
        "prompt": (
            "Split-screen holographic visualization: on the left, a dense "
            "opaque dark binary blob icon labeled conceptually as a single "
            "locked file, cracking and glitching in red warning light. On "
            "the right, the same file smoothly unfolds into a clean glowing "
            "folder tree of readable text file icons in neon lime and cyan, "
            "expanding calmly. Symbolizes fragile binary vs transparent text."
        ),
    },
    {
        "id": "04_mcp_setup",
        "timestamp": "04:00-08:00",
        "duration_seconds": 8,
        "aspect_ratio": "16:9",
        "prompt": (
            "Over-the-shoulder style screen-recording look: a dark-themed "
            "code editor window with a terminal, glowing cyan cursor typing "
            "a connection command, then a JSON configuration file populating "
            "itself line by line with a soft lime-green glow highlighting "
            "each new key as it appears. Smooth slow zoom into the editor."
        ),
    },
    {
        "id": "05_dax_tmdl_generation",
        "timestamp": "08:00-10:30",
        "duration_seconds": 8,
        "aspect_ratio": "16:9",
        "prompt": (
            "Close-up on a glowing dark-mode code editor: a chat prompt box "
            "at the bottom pulses with cyan light as a message is sent, and "
            "in the main pane a .tmdl file rapidly fills with DAX measure "
            "code, each new line materializing with a brief lime-green "
            "shimmer. Sparse holographic data particles drift in the "
            "background. Confident, fast, satisfying build-up motion."
        ),
    },
    {
        "id": "06_executive_dashboard_reveal",
        "timestamp": "10:30-13:15",
        "duration_seconds": 8,
        "aspect_ratio": "16:9",
        "prompt": (
            "Wide reveal shot of a glowing executive Power BI dashboard "
            "hovering in 3D holographic space: KPI cards for revenue, "
            "profit and margin snap into place one by one, followed by a "
            "6-chart grid of bar, donut and matrix visuals assembling in "
            "sync, all rendered in dark emerald background with neon lime "
            "and cyber cyan chart accents. Smooth slow orbit camera move."
        ),
    },
    {
        "id": "07_brand_theme_test",
        "timestamp": "13:15-14:15",
        "duration_seconds": 6,
        "aspect_ratio": "16:9",
        "prompt": (
            "Power BI Desktop application window opening on a dark studio "
            "desk setup, three report page tabs rendering in sequence, each "
            "styled in dark emerald green with neon lime and cyber cyan "
            "chart colors matching brand swatches floating beside the "
            "screen. Clean, professional, satisfying snap-into-focus motion."
        ),
    },
    {
        "id": "08_outro",
        "timestamp": "14:15-15:00",
        "image": "hakam_presenter_photo.jpg",
        "duration_seconds": 6,
        "aspect_ratio": "16:9",
        "prompt": (
            "Hakam on camera in the same futuristic studio, relaxed but "
            "confident closing energy, slight smile, subtle head nod toward "
            "camera as if wrapping up a video. Behind him the full 3-page "
            "dashboard glows softly on a large display. Gentle camera "
            "pull-back to reveal the whole studio setup."
        ),
    },
]


def build_full_prompt(scene: dict) -> str:
    return f"{BRAND_STYLE} Scene: {scene['prompt']}"


def dummy_run():
    print("\n⚠️  [CREDENTIAL NOTICE] GEMINI_API_KEY environment variable is missing.")
    print("Set it first:")
    print("  macOS/Linux: export GEMINI_API_KEY='your_api_key_here'")
    print("  Windows PowerShell: $env:GEMINI_API_KEY='your_api_key_here'")
    print("\nDummy payloads for all 8 B-roll scenes (for review before spending credits):\n")
    for scene in SCENES:
        payload = {
            "model": VIDEO_MODEL,
            "scene_id": scene["id"],
            "timestamp": scene["timestamp"],
            "image_reference": scene.get("image"),
            "aspect_ratio": scene["aspect_ratio"],
            "duration_seconds": scene["duration_seconds"],
            "prompt": build_full_prompt(scene),
        }
        print(f"--- {scene['id']} ---")
        print(json.dumps(payload, indent=2))
        print()


def real_run():
    from google import genai
    from google.genai import types

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    client = genai.Client(api_key=GEMINI_API_KEY)

    print("========================================================================")
    print(" 🎬 Gemini (Veo) B-Roll Generator — Part 6 Full Package")
    print(f" 📌 Model:      {VIDEO_MODEL}")
    print(f" 📌 Output dir: {OUTPUT_DIR}")
    print(f" 📌 Scenes:     {len(SCENES)}")
    print("========================================================================\n")

    results = []
    for scene in SCENES:
        print(f"🚀 [{scene['id']}] Submitting ({scene['timestamp']})...")

        config_kwargs = {
            "aspect_ratio": scene["aspect_ratio"],
            "duration_seconds": scene["duration_seconds"],
            "number_of_videos": 1,
        }

        kwargs = {
            "model": VIDEO_MODEL,
            "prompt": build_full_prompt(scene),
            "config": types.GenerateVideosConfig(**config_kwargs),
        }

        image_name = scene.get("image")
        if image_name:
            image_path = os.path.join(ASSETS_DIR, image_name)
            if os.path.exists(image_path):
                with open(image_path, "rb") as f:
                    image_bytes = f.read()
                mime_type = "image/png" if image_path.lower().endswith(".png") else "image/jpeg"
                kwargs["image"] = types.Image(image_bytes=image_bytes, mime_type=mime_type)
            else:
                print(f"   ⚠️  Reference image not found, skipping image-to-video: {image_path}")

        try:
            operation = client.models.generate_videos(**kwargs)

            while not operation.done:
                print(f"   ⏳ [{scene['id']}] Rendering...")
                time.sleep(10)
                operation = client.operations.get(operation)

            generated = operation.response.generated_videos
            if not generated:
                print(f"   ❌ [{scene['id']}] No video returned. Response: {operation.response}")
                continue

            video_file = generated[0].video
            client.files.download(file=video_file)
            out_path = os.path.join(OUTPUT_DIR, f"part6_broll_{scene['id']}.mp4")
            video_file.save(out_path)
            print(f"   ✅ [{scene['id']}] Saved -> {out_path}\n")
            results.append(out_path)

        except Exception as e:
            print(f"   ❌ [{scene['id']}] Exception: {e}\n")

    print("========================================================================")
    print(f" 🎉 Done. {len(results)}/{len(SCENES)} clips generated in {OUTPUT_DIR}")
    print("========================================================================")


def main():
    if not GEMINI_API_KEY:
        dummy_run()
        return
    real_run()


if __name__ == "__main__":
    main()
