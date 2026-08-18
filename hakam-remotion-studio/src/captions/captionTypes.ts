export type WordTiming = {
  text: string;
  startMs: number;
  endMs: number;
};

export type CaptionSegment = {
  id: string;
  startMs: number;
  endMs: number;
  arabic: string;
  english: string;
  words: WordTiming[];
};
