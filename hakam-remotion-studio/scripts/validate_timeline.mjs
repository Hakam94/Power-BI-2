import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const captionDataPath = path.join(rootDir, 'src', 'captions', 'captionData.ts');
const sourceVideoPath = path.join(rootDir, 'public', 'DHBP6661.MP4');

console.log('🔍 RUNNING AUTOMATED TIMELINE & CAPTION VALIDATION...\n');

// 1. Validate Source Video Existence
if (!fs.existsSync(sourceVideoPath)) {
  console.error('❌ ERROR: Source Hakam footage DHBP6661.MP4 missing in public directory!');
  process.exit(1);
} else {
  const stat = fs.statSync(sourceVideoPath);
  console.log(`✅ SOURCE FOOTAGE VALIDATED: DHBP6661.MP4 (${(stat.size / (1024 * 1024)).toFixed(1)} MB)`);
}

// 2. Read Caption File
const captionContent = fs.readFileSync(captionDataPath, 'utf8');

// Extract individual segment blocks by id: '...'
const segmentBlocks = captionContent.split(/id:\s*'[a-z0-9-]+'/);

if (segmentBlocks.length <= 1) {
  console.error('❌ ERROR: No valid caption segments found!');
  process.exit(1);
}

const segments = [];
for (let i = 1; i < segmentBlocks.length; i++) {
  const block = segmentBlocks[i];
  const startMatch = block.match(/startMs:\s*(\d+)/);
  const endMatch = block.match(/endMs:\s*(\d+)/);
  if (startMatch && endMatch) {
    segments.push({
      startMs: parseInt(startMatch[1], 10),
      endMs: parseInt(endMatch[1], 10),
    });
  }
}

console.log(`✅ CANONICAL CAPTION SEGMENTS DETECTED: ${segments.length} segments`);

let prevEnd = -1;
let errors = 0;

segments.forEach((seg, idx) => {
  if (seg.startMs < 0 || seg.endMs <= seg.startMs) {
    console.error(`❌ Segment ${idx + 1} invalid duration: ${seg.startMs}ms -> ${seg.endMs}ms`);
    errors++;
  }

  if (seg.startMs < prevEnd) {
    console.error(`❌ Segment ${idx + 1} overlaps with previous segment (start ${seg.startMs}ms < prevEnd ${prevEnd}ms)`);
    errors++;
  }

  prevEnd = seg.endMs;
});

if (errors > 0) {
  console.error(`\n❌ VALIDATION FAILED with ${errors} error(s).`);
  process.exit(1);
}

console.log('✅ CAPTION TIMELINE VALIDATION PASSED: 0 overlaps, 0 negative durations.');
console.log('✅ ALL AUTOMATED VALIDATION CHECKS PASSED SUCCESSFULLY!\n');
