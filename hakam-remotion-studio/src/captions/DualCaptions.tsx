import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { FULL_VIDEO_CAPTIONS } from './captionData';
import { ArabicCaption } from './ArabicCaption';
import { EnglishCaption } from './EnglishCaption';

export const DualCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTimeMs = (frame / fps) * 1000;

  // Find single canonical active caption segment
  const activeSegment = FULL_VIDEO_CAPTIONS.find(
    (s) => currentTimeMs >= s.startMs && currentTimeMs < s.endMs
  );

  if (!activeSegment) {
    return null;
  }

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', zIndex: 100 }}>
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          padding: '14px 32px',
          borderRadius: 22,
          background: 'rgba(13, 34, 41, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(0, 210, 255, 0.5)',
          boxShadow: '0 12px 45px rgba(0, 0, 0, 0.75), 0 0 35px rgba(0, 210, 255, 0.25)',
          maxWidth: 1100,
          width: 'max-content',
          boxSizing: 'border-box',
        }}
      >
        {/* Top: Arabic RTL text block */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <ArabicCaption
            segment={activeSegment}
            currentTimeMs={currentTimeMs}
          />
        </div>

        {/* Bottom: English LTR translation block */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <EnglishCaption englishText={activeSegment.english} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
