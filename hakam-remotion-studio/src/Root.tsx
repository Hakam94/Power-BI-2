import React from 'react';
import { Composition } from 'remotion';
import { MainVideo } from './MainVideo';
import { ReelVideo } from './ReelVideo';
import { FullVideoEdit, calculateMetadata } from './FullVideoEdit';
import { HookPreview } from './hook/HookPreview';
import { ShortReel, REEL_DURATION } from './ShortReel';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ══ DEDICATED VIRAL HOOK PREVIEW (Ali Abdaal Style Retention + Dual Captions) ══ */}
      <Composition
        id="HookPreview"
        component={HookPreview}
        durationInFrames={980}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* ══ PRIMARY PRODUCTION COMPOSITION ══ */}
      <Composition
        id="FullVideoEdit"
        component={FullVideoEdit}
        durationInFrames={18000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ speechData: null }}
        calculateMetadata={calculateMetadata}
      />

      {/* ══ 20s Vertical Short / Reel / TikTok Promo ══ */}
      <Composition
        id="ShortReel"
        component={ShortReel}
        durationInFrames={REEL_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* ══ Demo / preview compositions ══ */}
      <Composition
        id="AgenticAIVideo"
        component={MainVideo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="AgenticAIReel"
        component={ReelVideo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};
