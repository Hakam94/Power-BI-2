#!/usr/bin/env node
/**
 * detect-silences.mjs
 *
 * Remotion 2-Step Adaptive EBU R128 Silence Detector:
 *   Step 1 – Measure audio loudness using EBU R128 loudnorm to derive adaptive input_thresh
 *   Step 2 – Run FFmpeg silencedetect using noise=${input_thresh}dB:d=1.5
 *   Step 3 – Apply editorial rules (preserve natural speech pauses < 0.4s; tighten dead air > 0.8s)
 *   Step 4 – Write public/speech_segments.json for Remotion master timeline & calculateMetadata
 */

import { spawnSync } from 'child_process';
import { writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const videoArg = process.argv[2] ?? resolve(ROOT, 'public', 'DHBP6661.MP4');
const minSilence = parseFloat(process.argv[3] ?? '0.8');
const manualThreshDb = process.argv[4] ? parseFloat(process.argv[4]) : null;
const PADDING = 0.08; // 80ms breathing room around speech boundaries

const videoPath = resolve(videoArg);
if (!existsSync(videoPath)) {
  console.error(`[Error] Video not found: ${videoPath}`);
  process.exit(1);
}

console.log('='.repeat(60));
console.log('  Remotion Adaptive EBU R128 Silence Detector');
console.log('='.repeat(60));
console.log(`  Video Path: ${videoPath}`);
console.log('='.repeat(60));

// ── STEP 1: EBU R128 Loudness Measurement ─────────────────────────────────────
let noiseThreshold;
if (manualThreshDb !== null) {
  console.log(`\n[Step 1] Using manual override gating threshold: ${manualThreshDb}dB`);
  noiseThreshold = `${manualThreshDb}dB`;
} else {
  console.log('\n[Step 1] Measuring EBU R128 loudness profile...');
  const loudnormRes = spawnSync('ffmpeg', [
    '-i', videoPath,
    '-map', '0:a',
    '-af', 'loudnorm=print_format=json',
    '-f', 'null',
    '-'
  ], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });

  const loudnormOut = (loudnormRes.stdout || '') + (loudnormRes.stderr || '');
  const threshMatch = loudnormOut.match(/"input_thresh"\s*:\s*"([^"]+)"/);

  let adaptiveThresh = '-25.0';
  if (threshMatch) {
    adaptiveThresh = threshMatch[1];
    console.log(`[Step 1] ✅ Adaptive gating threshold derived: ${adaptiveThresh} dB`);
  } else {
    console.log(`[Step 1] ⚠️ Defaulting to fallback gating threshold: ${adaptiveThresh} dB`);
  }

  noiseThreshold = `${adaptiveThresh}dB`;
}

// ── STEP 2: Adaptive FFmpeg silencedetect ─────────────────────────────────────
console.log(`\n[Step 2] Running adaptive silencedetect (noise=${noiseThreshold}, d=${minSilence}s)...`);

const res = spawnSync('ffmpeg', [
  '-i', videoPath,
  '-af', `silencedetect=noise=${noiseThreshold}:d=${minSilence}`,
  '-f', 'null',
  '-'
], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });

const output = (res.stdout || '') + (res.stderr || '');

const silenceStarts = [...output.matchAll(/silence_start:\s*([\d.]+)/g)].map(m => parseFloat(m[1]));
const silenceEnds   = [...output.matchAll(/silence_end:\s*([\d.]+)/g)].map(m => parseFloat(m[1]));

console.log(`[Step 2] ✅ Detected ${silenceStarts.length} silence regions`);

// ── STEP 3: Duration & Silence Inversion ──────────────────────────────────────
const durMatch = output.match(/Duration:\s*(\d+):(\d+):([\d.]+)/);
let totalDuration = 0;
if (durMatch) {
  const hours = parseFloat(durMatch[1]);
  const mins  = parseFloat(durMatch[2]);
  const secs  = parseFloat(durMatch[3]);
  totalDuration = hours * 3600 + mins * 60 + secs;
} else {
  totalDuration = silenceEnds[silenceEnds.length - 1] ?? 1089.26;
}

const silences = silenceStarts.map((start, i) => ({
  start,
  end: silenceEnds[i] ?? totalDuration,
}));

const rawSegments = [];
let cursor = 0;

for (const silence of silences) {
  if (silence.start > cursor) {
    rawSegments.push({
      start: Math.max(0, cursor - PADDING),
      end: Math.min(totalDuration, silence.start + PADDING),
    });
  }
  cursor = silence.end;
}

if (cursor < totalDuration) {
  rawSegments.push({
    start: Math.max(0, cursor - PADDING),
    end: totalDuration,
  });
}

// ── STEP 4: Trim Initial False Start & Merge Speech Clips ─────────────────────
const MIN_START_TIME = 9.896; // Start cleanly at "تخيل معي"
const speechSegments = rawSegments.filter((seg) => seg.end > MIN_START_TIME).map((seg) => ({
  start: Math.max(MIN_START_TIME, seg.start),
  end: seg.end,
}));

const merged = [];
for (const seg of speechSegments) {
  if (merged.length === 0) {
    merged.push({ ...seg });
  } else {
    const prev = merged[merged.length - 1];
    if (seg.start <= prev.end) {
      prev.end = Math.max(prev.end, seg.end);
    } else {
      merged.push({ ...seg });
    }
  }
}

const FPS = 30;
const clips = merged.map((seg, i) => ({
  id: i,
  srcStartSec: seg.start,
  srcEndSec: seg.end,
  durationSec: seg.end - seg.start,
  trimBefore: Math.floor(seg.start * FPS),
  durationFrames: Math.ceil((seg.end - seg.start) * FPS),
}));

const totalSpeechSec = merged.reduce((s, seg) => s + (seg.end - seg.start), 0);
const totalRemovedSec = totalDuration - totalSpeechSec;
const compositionFrames = clips.reduce((s, c) => s + c.durationFrames, 0);

console.log('\n' + '='.repeat(60));
console.log('  Adaptive Silence Detection Summary');
console.log('='.repeat(60));
console.log(`  Source Duration:    ${(totalDuration / 60).toFixed(2)} min (${totalDuration.toFixed(1)}s)`);
console.log(`  Edited Duration:    ${(totalSpeechSec / 60).toFixed(2)} min (${totalSpeechSec.toFixed(1)}s)`);
console.log(`  Silence Removed:    ${(totalRemovedSec / 60).toFixed(2)} min (${totalRemovedSec.toFixed(1)}s)`);
console.log(`  Reduction:          ${((totalRemovedSec / totalDuration) * 100).toFixed(1)}%`);
console.log(`  Clips Preserved:    ${clips.length}`);
console.log(`  Composition:        ${compositionFrames} frames @ ${FPS}fps`);
console.log('='.repeat(60));

// ── STEP 5: Write Output JSON ────────────────────────────────────────────────
const outputFile = resolve(ROOT, 'public', 'speech_segments.json');
const data = {
  generatedAt: new Date().toISOString(),
  sourceFile: videoPath,
  fps: FPS,
  minSilenceSec: minSilence,
  noiseThreshold: noiseThreshold,
  padding: PADDING,
  totalDurationSec: totalDuration,
  totalSpeechSec,
  totalRemovedSec,
  compositionFrames,
  clips,
};

writeFileSync(outputFile, JSON.stringify(data, null, 2));
console.log(`\n✅ Successfully written silence edit map to ${outputFile}\n`);
