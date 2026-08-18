import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

export const CyberBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const gridOffset = interpolate(frame, [0, 300], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glowOpacity = interpolate(
    Math.sin(frame / 20),
    [-1, 1],
    [0.3, 0.7],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        width: 1920,
        height: 1080,
        backgroundColor: '#0D2229',
        overflow: 'hidden',
      }}
    >
      {/* Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          width: 2100,
          height: 1200,
          top: -60,
          left: -60,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 210, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 210, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: `translateY(${gridOffset % 60}px)`,
        }}
      />

      {/* Cyber Ambient Glow Corner top left */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: -200,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(191, 255, 0, 0.15) 0%, transparent 70%)',
          opacity: glowOpacity,
        }}
      />

      {/* Cyber Ambient Glow Corner bottom right */}
      <div
        style={{
          position: 'absolute',
          bottom: -200,
          right: -200,
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 210, 255, 0.2) 0%, transparent 70%)',
          opacity: glowOpacity,
        }}
      />
    </div>
  );
};
