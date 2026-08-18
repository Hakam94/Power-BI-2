import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, staticFile, Img } from 'remotion';

export const BrandBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 35,
        right: 45,
        zIndex: 100,
        transform: `scale(${scale})`,
        filter: 'drop-shadow(0 4px 15px rgba(0, 210, 255, 0.4))',
      }}
    >
      <Img
        src={staticFile('official_hakam_logo.png')}
        style={{
          height: 90,
          objectFit: 'contain',
        }}
      />
    </div>
  );
};
