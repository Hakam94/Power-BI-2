import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const BrandBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const rotation = interpolate(frame, [0, 300], [0, 360], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 40,
        right: 50,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        transform: `scale(${scale})`,
      }}
    >
      {/* Orbit Ring */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '2px dashed #00D2FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `rotate(${rotation}deg)`,
          boxShadow: '0 0 15px rgba(0, 210, 255, 0.4)',
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#BFFF00',
            boxShadow: '0 0 12px #BFFF00',
          }}
        />
      </div>

      {/* Brand Text */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            color: '#FFFFFF',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 900,
            fontSize: 20,
            letterSpacing: 1.5,
          }}
        >
          HAKAM DATA STUDIO
        </span>
        <span
          style={{
            color: '#00D2FF',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 2,
          }}
        >
          @HakamDataStudio
        </span>
      </div>
    </div>
  );
};
