#!/usr/bin/env python3
"""
build_resolve_timeline.py — Part 6 Rough-Cut Timeline Generator (FCPXML)
==========================================================================
Channel: @HakamDataStudio

Free DaVinci Resolve does NOT expose the live scripting API (that became
Studio-only starting with Resolve 19.1). So instead of driving a running
copy of Resolve, this script builds an .fcpxml timeline file OFFLINE:

  - Track 1 (spine):  your trimmed narration (from auto_edit.py)
  - Track 2 (lane 1): the 8 branded Gemini B-roll clips, positioned at
                       their exact chapter timestamps from
                       youtube_video_script_part6.md

You then do ONE import in Resolve — File > Import > Timeline... — and the
rough cut appears already laid out, instead of a blank timeline. You still
do the fine trims, transitions, and color by hand afterward.

Works on FREE Resolve. Requires no live app, no scripting-API setup, no
Studio purchase. Requires `ffprobe` (ships with ffmpeg, already used by
auto_edit.py) to be on PATH so real clip durations can be read.

CAVEAT: FCPXML lane offsets are timeline-absolute per spec, but exact
interpretation can vary slightly between app versions. If a B-roll clip
lands a frame or two off after import, nudge it — this file exists to
save you from starting on a blank timeline, not to guarantee frame-perfect
placement without a look.

USAGE:
    python build_resolve_timeline.py --narration "C:\\path\\to\\trimmed_narration.mp4"
    python build_resolve_timeline.py --narration ... --broll-dir gemini_broll --fps 30 --output part6_rough_cut.fcpxml

THEN IN RESOLVE:
    File > Import > Timeline... > select the .fcpxml this script wrote.
"""

import argparse
import glob
import os
import subprocess
import sys
from pathlib import Path
from xml.sax.saxutils import escape

ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))

# Chapter timestamps, mirrored from generate_gemini_broll.py / youtube_video_script_part6.md.
# scene_file must match the output naming from generate_gemini_broll.py:
#   part6_broll_<id>.mp4
CHAPTERS = [
    {"id": "01_hook",                       "start": "00:00", "name": "Hook"},
    {"id": "02_tool_comparison",            "start": "00:35", "name": "Why Antigravity AI"},
    {"id": "03_pbip_vs_pbix",               "start": "02:00", "name": "PBIP vs PBIX"},
    {"id": "04_mcp_setup",                  "start": "04:00", "name": "MCP Setup"},
    {"id": "05_dax_tmdl_generation",        "start": "08:00", "name": "DAX/TMDL Generation"},
    {"id": "06_executive_dashboard_reveal", "start": "10:30", "name": "Executive Dashboards"},
    {"id": "07_brand_theme_test",           "start": "13:15", "name": "Brand Theme Test"},
    {"id": "08_outro",                      "start": "14:15", "name": "Outro"},
]


def ffprobe_duration(path: str) -> float:
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", path],
        capture_output=True, text=True,
    )
    if result.returncode != 0 or not result.stdout.strip():
        print(f"❌ ffprobe failed to read duration for: {path}")
        print("   Is ffmpeg/ffprobe installed and on PATH?")
        sys.exit(1)
    return float(result.stdout.strip())


def to_file_url(path: str) -> str:
    return Path(os.path.abspath(path)).as_uri()


def frames(seconds: float, fps: int) -> int:
    return round(seconds * fps)


def rational(frame_count: int, fps: int) -> str:
    return f"{frame_count}/{fps}s"


def timestamp_to_seconds(ts: str) -> int:
    minutes, seconds = ts.split(":")
    return int(minutes) * 60 + int(seconds)


def find_broll_clips(broll_dir: str) -> dict:
    found = {}
    for chapter in CHAPTERS:
        pattern = os.path.join(broll_dir, f"part6_broll_{chapter['id']}*.mp4")
        matches = glob.glob(pattern)
        if matches:
            found[chapter["id"]] = matches[0]
    return found


def build_fcpxml(narration_path: str, broll_clips: dict, fps: int) -> str:
    resources = [
        f'<format id="r1" name="FFVideoFormat1080p{fps}" frameDuration="1/{fps}s" width="1920" height="1080"/>'
    ]

    next_id = [2]

    def add_asset(name: str, path: str):
        dur_frames = frames(ffprobe_duration(path), fps)
        rid = f"r{next_id[0]}"
        next_id[0] += 1
        resources.append(
            f'<asset id="{rid}" name="{escape(name)}" src="{escape(to_file_url(path))}" '
            f'hasVideo="1" hasAudio="1" format="r1" duration="{rational(dur_frames, fps)}"/>'
        )
        return rid, dur_frames

    narration_rid, narration_frames = add_asset("narration", narration_path)

    broll_rids = {}
    for chapter_id, path in broll_clips.items():
        broll_rids[chapter_id] = add_asset(f"broll_{chapter_id}", path)

    connected = []
    for chapter in CHAPTERS:
        if chapter["id"] not in broll_rids:
            continue
        rid, dur_frames = broll_rids[chapter["id"]]
        offset_frames = frames(timestamp_to_seconds(chapter["start"]), fps)
        connected.append(
            f'      <asset-clip ref="{rid}" lane="1" offset="{rational(offset_frames, fps)}" '
            f'name="{escape(chapter["name"])}" start="0/{fps}s" duration="{rational(dur_frames, fps)}"/>'
        )
        connected.append(
            f'      <marker start="{rational(offset_frames, fps)}" duration="1/{fps}s" '
            f'value="{escape(chapter["name"])}"/>'
        )

    spine_clip = (
        f'    <asset-clip ref="{narration_rid}" offset="0/{fps}s" name="narration" '
        f'start="0/{fps}s" duration="{rational(narration_frames, fps)}">\n'
        + "\n".join(connected) +
        "\n    </asset-clip>"
    )

    resources_xml = "\n    ".join(resources)

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fcpxml>
<fcpxml version="1.9">
  <resources>
    {resources_xml}
  </resources>
  <library>
    <event name="Part 6">
      <project name="Part 6 Auto Assembly">
        <sequence format="r1" duration="{rational(narration_frames, fps)}" tcStart="0/{fps}s">
          <spine>
{spine_clip}
          </spine>
        </sequence>
      </project>
    </event>
  </library>
</fcpxml>
"""


def main():
    parser = argparse.ArgumentParser(description="Generate the Part 6 rough-cut FCPXML for free Resolve")
    parser.add_argument("--narration", required=True,
                         help="Path to the trimmed narration/talking-head video (e.g. auto_edit.py output)")
    parser.add_argument("--broll-dir",
                         default=os.path.join(ASSETS_DIR, "gemini_broll"),
                         help="Folder containing part6_broll_*.mp4 clips (default: assets/gemini_broll)")
    parser.add_argument("--fps", type=int, default=30)
    parser.add_argument("--output", default=os.path.join(ASSETS_DIR, "part6_rough_cut.fcpxml"))
    args = parser.parse_args()

    if not os.path.exists(args.narration):
        print(f"❌ Narration file not found: {args.narration}")
        sys.exit(1)

    broll_clips = find_broll_clips(args.broll_dir)
    print(f"📌 Found {len(broll_clips)}/{len(CHAPTERS)} B-roll clips in {args.broll_dir}")
    for chapter in CHAPTERS:
        status = "✅" if chapter["id"] in broll_clips else "⚠️  missing"
        print(f"   {status}  {chapter['id']}")

    print("\n🎬 Reading clip durations and building FCPXML...")
    fcpxml = build_fcpxml(args.narration, broll_clips, args.fps)

    with open(args.output, "w", encoding="utf-8") as f:
        f.write(fcpxml)

    print("\n========================================================================")
    print(f" ✅ Rough-cut timeline written: {args.output}")
    print(" Next: in Resolve, File > Import > Timeline... and pick this file.")
    print(" Narration lands on the primary track, B-roll on a track above it at")
    print(" each chapter mark, with markers labeling each chapter.")
    print("========================================================================")


if __name__ == "__main__":
    main()
