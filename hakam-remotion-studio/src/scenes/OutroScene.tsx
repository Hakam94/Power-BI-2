import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const buttonPulse = interpolate(
    Math.sin(frame / 8),
    [-1, 1],
    [1, 1.06],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
      }}
    >
      {/* Title */}
      <h2
        style={{
          transform: `scale(${scale})`,
          color: '#FFFFFF',
          fontSize: 72,
          fontWeight: 900,
          textAlign: 'center',
          margin: '0 0 20px 0',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        MASTER THE FUTURE OF <span style={{ color: '#BFFF00' }}>AI & DATA</span>
      </h2>

      <p
        style={{
          color: '#00D2FF',
          fontSize: 32,
          fontWeight: 700,
          margin: '0 0 50px 0',
          letterSpacing: 2,
        }}
      >
        Watch Full Video & Tutorials on YouTube
      </p>

      {/* Subscribe Button */}
      <div
        style={{
          transform: `scale(${buttonPulse})`,
          backgroundColor: '#BFFF00',
          color: '#0D2229',
          padding: '24px 64px',
          borderRadius: 60,
          fontWeight: 900,
          fontSize: 36,
          letterSpacing: 2,
          boxShadow: '0 0 40px #BFFF00, 0 10px 30px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          cursor: 'pointer',
          marginBottom: 40,
        }}
      >
        <span>▶ SUBSCRIBE TO HAKAM DATA STUDIO</span>
      </div>

      <span
        style={{
          color: '#FFFFFF',
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: 3,
        }}
      >
        youtube.com/@HakamDataStudio
      </span>
    </div>
  );
};
