import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title spring pop
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Badge fade/slide
  const badgeY = interpolate(frame, [0, 0.8 * fps], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const badgeOpacity = interpolate(frame, [0, 0.8 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtitle fade
  const subOpacity = interpolate(frame, [0.5 * fps, 1.2 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Glow pulse
  const glowWidth = interpolate(frame, [0.8 * fps, 2.5 * fps], [0, 800], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
      {/* Category Pill */}
      <div
        style={{
          transform: `translateY(${badgeY}px)`,
          opacity: badgeOpacity,
          backgroundColor: 'rgba(0, 210, 255, 0.15)',
          border: '1.5px solid #00D2FF',
          padding: '8px 24px',
          borderRadius: 30,
          color: '#00D2FF',
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 3,
          marginBottom: 30,
          textTransform: 'uppercase',
          boxShadow: '0 0 20px rgba(0, 210, 255, 0.3)',
        }}
      >
        Microsoft Build 2026 Breakthrough
      </div>

      {/* Main Title */}
      <h1
        style={{
          transform: `scale(${titleScale})`,
          color: '#FFFFFF',
          fontSize: 84,
          fontWeight: 900,
          textAlign: 'center',
          lineHeight: 1.1,
          margin: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          maxWidth: 1400,
          textShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        THE <span style={{ color: '#BFFF00' }}>AGENTIC ERA</span> IN POWER BI
      </h1>

      {/* Underline Bar */}
      <div
        style={{
          width: glowWidth,
          height: 6,
          backgroundColor: '#BFFF00',
          borderRadius: 3,
          marginTop: 25,
          marginBottom: 25,
          boxShadow: '0 0 20px #BFFF00',
        }}
      />

      {/* Subtitle */}
      <h2
        style={{
          opacity: subOpacity,
          color: '#00D2FF',
          fontSize: 36,
          fontWeight: 700,
          margin: 0,
          letterSpacing: 1.5,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        Autonomous AI Agents • Agent Skills • Fabric IQ • MCP Protocol
      </h2>
    </div>
  );
};
