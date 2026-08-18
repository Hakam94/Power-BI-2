import React from 'react';

/**
 * SpeakerSafeZone — Speaker Face Protection Boundary
 *
 * Defines the immutable zone where Hakam's face & torso are presented.
 * No motion graphics, callouts, or decorative cards may enter this zone.
 */
export const SPEAKER_SAFE_ZONE = {
  // Right Column (x: 960px to 1920px) is reserved 100% for Hakam's camera footage
  speakerColumn: {
    left: 960,
    top: 0,
    width: 960,
    height: 1080,
  },
  // Left Column (x: 80px to 780px, max-width: 700px) is reserved for motion graphics & UI overlays
  graphicsColumn: {
    left: 80,
    top: 90,
    maxWidth: 700,
  },
};

export const SpeakerSafeZone: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {children}
    </div>
  );
};
