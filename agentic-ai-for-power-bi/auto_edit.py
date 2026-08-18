#!/usr/bin/env python3
"""
auto_edit.py — Hakam Data Studio AI Video Editor
================================================
Pipeline:
  1. Silero VAD: detect speech segments, cut silences > 2 seconds
  2. FFmpeg: re-encode segments (no stream copy to avoid frozen frames)
  3. FFmpeg concat: join all segments
  4. -16 LUFS audio normalization (YouTube standard)
  5. Output: remotion-app/public/edited_video.mp4

Usage:
    python auto_edit.py DHBP6661.MP4
    python auto_edit.py DHBP6661.MP4 --silence-threshold 2.0 --padding 0.08
"""

import os
import sys
import subprocess
import argparse
import shutil
import tempfile
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed


# ─── Config ──────────────────────────────────────────────────────────────────
SILENCE_THRESHOLD_SEC = 2.0   # cut gaps longer than this
VAD_PADDING_SEC       = 0.08  # 80ms padding around speech boundaries
MAX_WORKERS           = 4     # parallel FFmpeg workers
LUFS_TARGET           = -16   # YouTube standard loudness
LUFS_TP               = -1.5  # true peak ceiling
LUFS_LRA              = 11    # loudness range


def ffmpeg(*args, silent=False):
    """Run FFmpeg command, raise on error."""
    cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel",
           "error" if silent else "warning"] + list(args)
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"[FFmpeg ERROR]\n{result.stderr}")
        raise RuntimeError("FFmpeg failed")
    return result


def ffprobe_duration(video_path: str) -> float:
    """Get video duration in seconds using ffprobe."""
    result = subprocess.run([
        "ffprobe", "-v", "error",
        "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1",
        video_path
    ], capture_output=True, text=True)
    return float(result.stdout.strip())


def extract_audio_to_wav(video_path: str, wav_path: str):
    """Extract 16kHz mono WAV from video for VAD processing.
    FFmpeg handles the resampling natively — fast and memory-efficient.
    """
    print(f"[Audio] Extracting 16kHz mono WAV for VAD analysis...")
    ffmpeg(
        "-i", video_path,
        "-ar", "16000",   # 16kHz sample rate (Silero requirement) — FFmpeg resamples natively
        "-ac", "1",       # mono
        "-sample_fmt", "s16",  # 16-bit PCM
        "-f", "wav",
        wav_path,
        silent=True
    )
    size_mb = os.path.getsize(wav_path) / 1e6
    print(f"[Audio] WAV ready: {size_mb:.1f} MB")


def run_silero_vad(audio_wav: str, silence_threshold: float, padding: float):
    """
    Run Silero VAD on a pre-resampled 16kHz mono WAV file.
    Uses soundfile for loading — no scipy resampling needed (FFmpeg handles it).
    Returns list of (start_sec, end_sec) speech segments.
    """
    try:
        import torch
    except ImportError:
        print("[!] PyTorch not found. Installing...")
        subprocess.run([sys.executable, "-m", "pip", "install",
                        "torch", "--index-url",
                        "https://download.pytorch.org/whl/cpu"], check=True)
        import torch

    try:
        import soundfile as sf
        import numpy as np
    except ImportError:
        subprocess.run([sys.executable, "-m", "pip", "install",
                        "soundfile", "numpy"], check=True)
        import soundfile as sf
        import numpy as np

    print("[VAD] Loading Silero VAD model (cached)...")
    model, utils = torch.hub.load(
        repo_or_dir="snakers4/silero-vad",
        model="silero_vad",
        force_reload=False,
        onnx=False,
        trust_repo=True,
    )
    # Unpack utils — handle both old tuple API and new namespace API
    try:
        get_speech_timestamps = utils[0]
    except (TypeError, KeyError):
        get_speech_timestamps = utils.get_speech_timestamps

    print("[VAD] Loading audio (already 16kHz from FFmpeg)...")
    # WAV is already 16kHz mono from FFmpeg — soundfile loads it fast as float32
    audio_np, sr = sf.read(audio_wav, dtype='float32')
    assert sr == 16000, f"Expected 16kHz, got {sr}Hz — check FFmpeg extraction"
    total_dur = len(audio_np) / sr
    print(f"[VAD] Audio loaded: {total_dur:.1f}s ({total_dur/60:.1f} min)")

    wav = torch.from_numpy(audio_np)

    print("[VAD] Running speech detection (this takes ~2-4 min on CPU for 18 min audio)...")
    raw_segments = get_speech_timestamps(
        wav, model,
        sampling_rate=16000,
        threshold=0.5,
        min_speech_duration_ms=250,
        min_silence_duration_ms=int(silence_threshold * 1000),
        return_seconds=True,
    )

    if not raw_segments:
        print("[VAD] No speech detected! Check audio.")
        return []

    print(f"[VAD] Raw detections: {len(raw_segments)} speech segments")

    # Add padding around each segment
    merged = []
    for seg in raw_segments:
        start = max(0.0, seg["start"] - padding)
        end   = min(total_dur, seg["end"] + padding)
        merged.append((start, end))

    # Merge overlapping segments after padding
    consolidated = [merged[0]]
    for start, end in merged[1:]:
        prev_start, prev_end = consolidated[-1]
        if start <= prev_end:
            consolidated[-1] = (prev_start, max(prev_end, end))
        else:
            consolidated.append((start, end))

    print(f"[VAD] Final: {len(consolidated)} speech segments after merge")
    return consolidated


    """Extract mono 16kHz WAV from video for VAD processing."""
    print(f"[Audio] Extracting WAV for VAD analysis...")
    ffmpeg(
        "-i", video_path,
        "-ar", "16000",   # 16kHz sample rate (Silero requirement)
        "-ac", "1",       # mono
        "-f", "wav",
        wav_path,
        silent=True
    )


def encode_segment(args):
    """Encode a single video segment. Returns output path."""
    video_path, start, end, seg_idx, tmp_dir, hw_accel = args
    out = os.path.join(tmp_dir, f"seg_{seg_idx:04d}.mp4")
    duration = end - start

    if duration < 0.1:
        return None

    cmd = [
        "-i", video_path,
        "-ss", f"{start:.6f}",
        "-to", f"{end:.6f}",
        "-avoid_negative_ts", "make_zero",
        # Video codec
        "-c:v", hw_accel if hw_accel else "libx264",
        "-preset", "fast" if not hw_accel else "p4",
        "-crf", "18",
        # Audio
        "-c:a", "aac",
        "-b:a", "192k",
        # Misc
        "-movflags", "+faststart",
        out
    ]
    try:
        ffmpeg(*cmd, silent=True)
        return out
    except Exception as e:
        print(f"[!] Segment {seg_idx} failed with HW accel. Falling back to CPU...")
        # Retry with CPU
        cmd_cpu = [
            "-i", video_path,
            "-ss", f"{start:.6f}",
            "-to", f"{end:.6f}",
            "-avoid_negative_ts", "make_zero",
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "18",
            "-c:a", "aac",
            "-b:a", "192k",
            "-movflags", "+faststart",
            out
        ]
        ffmpeg(*cmd_cpu, silent=True)
        return out


def detect_hw_accel():
    """Detect best available hardware acceleration."""
    encoders = subprocess.run(
        ["ffmpeg", "-hide_banner", "-encoders"],
        capture_output=True, text=True
    ).stdout

    if "h264_nvenc" in encoders:
        print("[HW] NVIDIA NVENC detected")
        return "h264_nvenc"
    elif "h264_qsv" in encoders:
        print("[HW] Intel QSV detected")
        return "h264_qsv"
    elif "h264_amf" in encoders:
        print("[HW] AMD AMF detected")
        return "h264_amf"
    else:
        print("[HW] No hardware acceleration — using CPU libx264")
        return None


def concat_segments(segment_files: list, concat_list_path: str, concat_out: str):
    """Concatenate all segments using FFmpeg concat demuxer."""
    with open(concat_list_path, "w") as f:
        for seg in segment_files:
            # Escape backslashes for Windows paths
            safe_path = seg.replace("\\", "/")
            f.write(f"file '{safe_path}'\n")

    print(f"[Concat] Joining {len(segment_files)} segments...")
    ffmpeg(
        "-f", "concat",
        "-safe", "0",
        "-i", concat_list_path,
        "-c", "copy",
        concat_out
    )


def normalize_audio(input_path: str, output_path: str):
    """Apply -16 LUFS loudness normalization via two-pass loudnorm."""
    print(f"[Audio] Analyzing loudness (pass 1)...")

    # Pass 1: measure loudness stats
    result = subprocess.run([
        "ffmpeg", "-hide_banner", "-i", input_path,
        "-af", "loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json",
        "-f", "null", "-"
    ], capture_output=True, text=True)

    # Parse loudnorm JSON stats from stderr
    stderr = result.stderr
    import json, re
    match = re.search(r'\{[^}]+\}', stderr, re.DOTALL)
    if match:
        stats = json.loads(match.group())
        measured_I   = stats.get("input_i",   "-23.0")
        measured_TP  = stats.get("input_tp",  "-2.0")
        measured_LRA = stats.get("input_lra", "7.0")
        measured_thresh = stats.get("input_thresh", "-33.0")
        offset = stats.get("target_offset", "0.0")
        af_filter = (
            f"loudnorm=I={LUFS_TARGET}:TP={LUFS_TP}:LRA={LUFS_LRA}"
            f":measured_I={measured_I}:measured_TP={measured_TP}"
            f":measured_LRA={measured_LRA}:measured_thresh={measured_thresh}"
            f":offset={offset}:linear=true:print_format=none"
        )
    else:
        print("[Audio] Could not parse loudnorm stats, using simple filter")
        af_filter = f"loudnorm=I={LUFS_TARGET}:TP={LUFS_TP}:LRA={LUFS_LRA}"

    print(f"[Audio] Applying normalization (pass 2, target: {LUFS_TARGET} LUFS)...")
    ffmpeg(
        "-i", input_path,
        "-af", af_filter,
        "-c:v", "copy",  # preserve video as-is
        "-c:a", "aac",
        "-b:a", "192k",
        "-movflags", "+faststart",
        output_path
    )


def main():
    parser = argparse.ArgumentParser(description="Hakam Data Studio Auto Video Editor")
    parser.add_argument("input", help="Input video file (e.g. DHBP6661.MP4)")
    parser.add_argument("--silence-threshold", type=float, default=SILENCE_THRESHOLD_SEC,
                        help=f"Cut silences longer than N seconds (default: {SILENCE_THRESHOLD_SEC})")
    parser.add_argument("--padding", type=float, default=VAD_PADDING_SEC,
                        help=f"Speech boundary padding in seconds (default: {VAD_PADDING_SEC})")
    parser.add_argument("--output", default=None,
                        help="Output path (default: remotion-app/public/edited_video.mp4)")
    args = parser.parse_args()

    # Paths
    script_dir = Path(__file__).parent
    input_path = Path(args.input)
    if not input_path.is_absolute():
        input_path = script_dir / input_path

    if not input_path.exists():
        print(f"[ERROR] Input file not found: {input_path}")
        sys.exit(1)

    output_path = Path(args.output) if args.output else \
        script_dir / "remotion-app" / "public" / "edited_video.mp4"
    output_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"\n{'='*60}")
    print(f"  Hakam Data Studio — Auto Video Editor")
    print(f"{'='*60}")
    print(f"  Input:    {input_path}")
    print(f"  Output:   {output_path}")
    print(f"  Silence:  > {args.silence_threshold}s will be cut")
    print(f"  Padding:  {args.padding}s around speech boundaries")
    print(f"{'='*60}\n")

    # Get video duration
    duration = ffprobe_duration(str(input_path))
    print(f"[Info] Source duration: {duration:.1f}s ({duration/60:.1f} min)")

    # Detect hardware acceleration
    hw_accel = detect_hw_accel()

    # Working directory
    tmp_dir = tempfile.mkdtemp(prefix="hakam_edit_")
    print(f"[Info] Temp directory: {tmp_dir}")

    try:
        # Step 1: Extract WAV for VAD
        wav_path = os.path.join(tmp_dir, "audio.wav")
        extract_audio_to_wav(str(input_path), wav_path)

        # Step 2: Silero VAD speech detection
        segments = run_silero_vad(wav_path, args.silence_threshold, args.padding)

        if not segments:
            print("[ERROR] No speech segments found. Exiting.")
            sys.exit(1)

        total_speech = sum(e - s for s, e in segments)
        removed = duration - total_speech
        print(f"\n[VAD] Results:")
        print(f"  Speech segments:  {len(segments)}")
        print(f"  Total speech:     {total_speech:.1f}s ({total_speech/60:.1f} min)")
        print(f"  Removed silence:  {removed:.1f}s ({removed/60:.1f} min)")
        print(f"  Reduction:        {removed/duration*100:.1f}%")
        print()

        # Step 3: Encode segments in parallel
        print(f"[Encode] Encoding {len(segments)} segments (parallel, {MAX_WORKERS} workers)...")
        encode_args = [
            (str(input_path), start, end, idx, tmp_dir, hw_accel)
            for idx, (start, end) in enumerate(segments)
        ]

        segment_files = []
        failed = 0
        with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
            futures = {executor.submit(encode_segment, a): a[3] for a in encode_args}
            for i, future in enumerate(as_completed(futures)):
                seg_idx = futures[future]
                result = future.result()
                if result:
                    segment_files.append((seg_idx, result))
                else:
                    failed += 1
                progress = (i + 1) / len(encode_args) * 100
                print(f"  [{progress:5.1f}%] Segment {seg_idx:04d} done", end="\r")

        print(f"\n[Encode] Complete. {len(segment_files)} OK, {failed} failed.")

        # Sort by segment index to preserve order
        segment_files.sort(key=lambda x: x[0])
        ordered_files = [f for _, f in segment_files]

        # Step 4: Concatenate
        concat_list = os.path.join(tmp_dir, "concat.txt")
        concat_out  = os.path.join(tmp_dir, "concat_out.mp4")
        concat_segments(ordered_files, concat_list, concat_out)

        # Step 5: Normalize audio to -16 LUFS
        print(f"[Audio] Normalizing to {LUFS_TARGET} LUFS...")
        normalize_audio(concat_out, str(output_path))

        # Final stats
        final_duration = ffprobe_duration(str(output_path))
        print(f"\n{'='*60}")
        print(f"  ✅ DONE!")
        print(f"  Output:          {output_path}")
        print(f"  Final duration:  {final_duration:.1f}s ({final_duration/60:.1f} min)")
        print(f"  Time saved:      {duration - final_duration:.1f}s")
        print(f"{'='*60}\n")

    finally:
        # Cleanup temp files
        shutil.rmtree(tmp_dir, ignore_errors=True)


if __name__ == "__main__":
    main()
