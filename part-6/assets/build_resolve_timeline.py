import os
import sys
import glob

# ==============================================================================
# DaVinci Resolve Auto-Assembly Script — Part 6
# Channel: @HakamDataStudio
#
# Drives a RUNNING copy of DaVinci Resolve (via its scripting API) to build a
# rough-cut timeline automatically:
#   - Track V1 / A1: your trimmed narration/talking-head footage
#   - Track V2:      the 8 branded Gemini B-roll clips, dropped in at the
#                     exact chapter timestamps from youtube_video_script_part6.md
#   - Markers:        one per chapter, named to match the script
#
# You still do the final trims/transitions/color by hand — this just removes
# the "drag every clip to the right spot" busywork.
#
# ------------------------------------------------------------------------------
# ONE-TIME SETUP (Windows):
#   1. Open DaVinci Resolve.
#   2. Preferences -> System -> General -> "External scripting using" -> Local
#   3. Restart Resolve.
#   4. In PowerShell, before running this script:
#        $env:RESOLVE_SCRIPT_API  = "C:\ProgramData\Blackmagic Design\DaVinci Resolve\Support\Developer\Scripting"
#        $env:RESOLVE_SCRIPT_LIB  = "C:\Program Files\Blackmagic Design\DaVinci Resolve\fusionscript.dll"
#        $env:PYTHONPATH          = "$env:RESOLVE_SCRIPT_API\Modules;$env:PYTHONPATH"
#   5. Resolve must be OPEN (this drives the live app, it does not run headless).
#
# USAGE:
#   python build_resolve_timeline.py --narration "C:\path\to\trimmed_narration.mp4"
#   python build_resolve_timeline.py --narration ... --broll-dir gemini_broll --fps 30
# ==============================================================================

ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))

# Chapter timestamps, mirrored from generate_gemini_broll.py / youtube_video_script_part6.md.
# scene_file must match the output naming from generate_gemini_broll.py:
#   part6_broll_<id>.mp4
CHAPTERS = [
    {"id": "01_hook",                     "start": "00:00", "name": "Hook"},
    {"id": "02_tool_comparison",          "start": "00:35", "name": "Why Antigravity AI"},
    {"id": "03_pbip_vs_pbix",             "start": "02:00", "name": "PBIP vs PBIX"},
    {"id": "04_mcp_setup",                "start": "04:00", "name": "MCP Setup"},
    {"id": "05_dax_tmdl_generation",      "start": "07:15", "name": "DAX/TMDL Generation"},
    {"id": "06_executive_dashboard_reveal", "start": "10:30", "name": "Executive Dashboards"},
    {"id": "07_brand_theme_test",         "start": "13:15", "name": "Brand Theme Test"},
    {"id": "08_outro",                    "start": "14:15", "name": "Outro"},
]


def timestamp_to_frames(ts: str, fps: int) -> int:
    minutes, seconds = ts.split(":")
    total_seconds = int(minutes) * 60 + int(seconds)
    return total_seconds * fps


def connect_resolve():
    try:
        import DaVinciResolveScript as dvr_script
    except ImportError:
        print("❌ Could not import DaVinciResolveScript.")
        print("   Make sure RESOLVE_SCRIPT_API / RESOLVE_SCRIPT_LIB / PYTHONPATH are set")
        print("   (see the setup instructions in this file's header) and that Resolve is running.")
        sys.exit(1)

    resolve = dvr_script.scriptapp("Resolve")
    if resolve is None:
        print("❌ Could not connect to Resolve. Is it open, and is external scripting enabled")
        print("   in Preferences -> System -> General -> External scripting using -> Local?")
        sys.exit(1)
    return resolve


def find_broll_clips(broll_dir: str) -> dict:
    """Map chapter id -> clip filepath, based on generate_gemini_broll.py's output naming."""
    found = {}
    for chapter in CHAPTERS:
        pattern = os.path.join(broll_dir, f"part6_broll_{chapter['id']}*.mp4")
        matches = glob.glob(pattern)
        if matches:
            found[chapter["id"]] = matches[0]
    return found


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Auto-assemble the Part 6 Resolve timeline")
    parser.add_argument("--narration", required=True,
                         help="Path to the trimmed narration/talking-head video (e.g. auto_edit.py output)")
    parser.add_argument("--broll-dir",
                         default=os.path.join(ASSETS_DIR, "gemini_broll"),
                         help="Folder containing part6_broll_*.mp4 clips (default: assets/gemini_broll)")
    parser.add_argument("--project-name", default="Cafe Part 6 - YouTube Edit")
    parser.add_argument("--timeline-name", default="Part 6 Auto Assembly")
    parser.add_argument("--fps", type=int, default=30)
    args = parser.parse_args()

    if not os.path.exists(args.narration):
        print(f"❌ Narration file not found: {args.narration}")
        sys.exit(1)

    broll_clips = find_broll_clips(args.broll_dir)
    print(f"📌 Found {len(broll_clips)}/{len(CHAPTERS)} B-roll clips in {args.broll_dir}")
    for chapter in CHAPTERS:
        status = "✅" if chapter["id"] in broll_clips else "⚠️  missing"
        print(f"   {status}  {chapter['id']}")

    resolve = connect_resolve()
    project_manager = resolve.GetProjectManager()

    project = project_manager.LoadProject(args.project_name)
    if project is None:
        print(f"📌 Project '{args.project_name}' not found, creating it...")
        project = project_manager.CreateProject(args.project_name)
        if project is None:
            print("❌ Failed to create/load project.")
            sys.exit(1)

    media_pool = project.GetMediaPool()
    media_storage = resolve.GetMediaStorage()

    print("🚀 Importing narration...")
    narration_items = media_storage.AddItemListToMediaPool(args.narration)
    if not narration_items:
        print("❌ Failed to import narration into media pool.")
        sys.exit(1)
    narration_clip = narration_items[0]

    print("🚀 Importing B-roll clips...")
    broll_pool_items = {}
    for chapter_id, path in broll_clips.items():
        items = media_storage.AddItemListToMediaPool(path)
        if items:
            broll_pool_items[chapter_id] = items[0]

    print(f"🚀 Creating timeline '{args.timeline_name}'...")
    timeline = media_pool.CreateEmptyTimeline(args.timeline_name)
    if timeline is None:
        print("❌ Failed to create timeline.")
        sys.exit(1)
    project.SetCurrentTimeline(timeline)

    print("🎬 Appending narration to V1/A1...")
    media_pool.AppendToTimeline([narration_clip])

    print("🎬 Placing B-roll on V2 at chapter timestamps + adding chapter markers...")
    timeline.AddTrack("video")  # creates V2

    for chapter in CHAPTERS:
        start_frame = timestamp_to_frames(chapter["start"], args.fps)

        timeline.AddMarker(
            start_frame,
            "Blue",
            chapter["name"],
            f"Chapter: {chapter['name']}",
            1,
        )

        clip = broll_pool_items.get(chapter["id"])
        if clip is None:
            continue

        media_pool.AppendToTimeline([{
            "mediaPoolItem": clip,
            "trackIndex": 2,
            "recordFrame": start_frame,
        }])

    print("\n========================================================================")
    print(" ✅ Rough cut assembled in Resolve.")
    print(f"    Project:  {args.project_name}")
    print(f"    Timeline: {args.timeline_name}")
    print("    Narration on V1/A1, B-roll on V2 at chapter marks, markers added.")
    print("    Now: trim overlaps, add transitions/color, and polish by hand.")
    print("========================================================================")


if __name__ == "__main__":
    main()
