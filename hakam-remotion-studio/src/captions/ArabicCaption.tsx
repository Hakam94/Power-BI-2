import React from 'react';
import { CaptionSegment } from './captionTypes';

interface ArabicCaptionProps {
  segment: CaptionSegment;
  currentTimeMs: number;
}

export const ArabicCaption: React.FC<ArabicCaptionProps> = ({
  segment,
  currentTimeMs,
}) => {
  return (
    <div
      style={{
        direction: 'rtl',
        unicodeBidi: 'plaintext',
        textAlign: 'right',
        fontFamily: 'Outfit, system-ui, -apple-system, sans-serif',
        fontSize: 32,
        fontWeight: 900,
        color: '#FFFFFF',
        letterSpacing: -0.3,
        lineHeight: 1.35,
        whiteSpace: 'pre-wrap',
        margin: 0,
        padding: 0,
      }}
    >
      {segment.words.map((w, index) => {
        const isActive =
          currentTimeMs >= w.startMs && currentTimeMs < w.endMs;

        return (
          <span
            key={`${w.startMs}-${index}`}
            style={{
              color: isActive ? '#00D2FF' : '#FFFFFF',
              textShadow: isActive
                ? '0 0 24px rgba(0, 210, 255, 0.95), 0 0 12px #00D2FF'
                : '0 2px 10px rgba(0, 0, 0, 0.85)',
              transition: 'color 0.08s ease, text-shadow 0.08s ease',
            }}
          >
            {w.text}{' '}
          </span>
        );
      })}
    </div>
  );
};
