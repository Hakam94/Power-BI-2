import speechData from '../../public/speech_segments.json';
import { MasterTimelineConfig, EditClip } from './timelineTypes';

// Load speech clips dynamically from silence analysis.
// Output position in the edited TransitionSeries is the cumulative sum of
// preceding clips' KEPT durations — NOT `trimBefore`, which is a source-video
// offset (roughly equal to sourceStartMs) and unrelated to where the clip
// lands in the final timeline once silence has been cut out.
const fps = speechData.fps || 30;
let cumulativeFrames = 0;
const clips: EditClip[] = (speechData.clips || []).map((c: any) => {
  const outputStartFrame = cumulativeFrames;
  cumulativeFrames += c.durationFrames;
  return {
    id: c.id,
    sourceStartMs: Math.round(c.srcStartSec * 1000),
    sourceEndMs: Math.round(c.srcEndSec * 1000),
    outputStartMs: Math.round((outputStartFrame / fps) * 1000),
    outputEndMs: Math.round((cumulativeFrames / fps) * 1000),
  };
});

export const MASTER_TIMELINE: MasterTimelineConfig = {
  sourceVideoPath: 'DHBP6661.MP4',
  fps: speechData.fps || 30,
  totalDurationMs: Math.round((speechData.compositionFrames / (speechData.fps || 30)) * 1000),
  clips,
};

/**
 * Converts output frame number to source video trimBefore frame offset.
 */
export function getSourceFrameForOutputFrame(outputFrame: number, fps: number = 30): number {
  if (!clips || clips.length === 0) {
    return Math.round((9.896 * fps) + outputFrame);
  }

  const outputMs = (outputFrame / fps) * 1000;
  for (const clip of clips) {
    if (outputMs >= clip.outputStartMs && outputMs <= clip.outputEndMs) {
      const offsetMs = outputMs - clip.outputStartMs;
      const sourceMs = clip.sourceStartMs + offsetMs;
      return Math.round((sourceMs / 1000) * fps);
    }
  }

  // Default offset fallback if past last clip
  const firstClip = clips[0];
  return Math.round((firstClip.sourceStartMs / 1000) * fps) + outputFrame;
}
