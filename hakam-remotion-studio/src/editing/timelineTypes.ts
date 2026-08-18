export type EditClip = {
  id: number;
  sourceStartMs: number;
  sourceEndMs: number;
  outputStartMs: number;
  outputEndMs: number;
};

export type MasterTimelineConfig = {
  sourceVideoPath: string;
  fps: number;
  totalDurationMs: number;
  clips: EditClip[];
};
