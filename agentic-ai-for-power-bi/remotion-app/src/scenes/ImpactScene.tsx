import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const ImpactScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated stat counter (0 -> 80)
  const statVal = Math.round(
    interpolate(frame, [0.3 * fps, 2.5 * fps], [0, 80], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const cardScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const bannerY = interpolate(frame, [1 * fps, 2 * fps], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bannerOpacity = interpolate(frame, [1 * fps, 2 * fps], [0, 1], {
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
      {/* Stat Card */}
      <div
        style={{
          transform: `scale(${cardScale})`,
          backgroundColor: 'rgba(13, 34, 41, 0.9)',
          border: '2px solid #BFFF00',
          borderRadius: 28,
          padding: '50px 90px',
          display: 'flex',
          alignItems: 'center',
          gap: 60,
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.7), 0 0 40px rgba(191, 255, 0, 0.2)',
          marginBottom: 45,
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: '#BFFF00',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: 1,
            textShadow: '0 0 30px #BFFF00',
          }}
        >
          {statVal}%
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 650 }}>
          <span
            style={{
              color: '#FFFFFF',
              fontSize: 38,
              fontWeight: 900,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1.2,
            }}
          >
            Reduction in Repetitive Data Modeling & Report Building Workflows
          </span>
          <span
            style={{
              color: '#00D2FF',
              fontSize: 20,
              fontWeight: 700,
              marginTop: 12,
              letterSpacing: 1,
            }}
          >
            Empowering Data Analysts to Focus on High-Value Strategic Insights
          </span>
        </div>
      </div>

      {/* Paradigm Shift Banner */}
      <div
        style={{
          transform: `translateY(${bannerY}px)`,
          opacity: bannerOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: 30,
          backgroundColor: 'rgba(0, 210, 255, 0.12)',
          border: '1.5px solid #00D2FF',
          padding: '20px 45px',
          borderRadius: 50,
          boxShadow: '0 0 30px rgba(0, 210, 255, 0.25)',
        }}
      >
        <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: 26, fontWeight: 700 }}>
          Passive Dashboards
        </span>
        <span style={{ color: '#BFFF00', fontSize: 32, fontWeight: 900 }}>➔</span>
        <span style={{ color: '#00D2FF', fontSize: 28, fontWeight: 900 }}>
          Autonomous AI Agents
        </span>
      </div>
    </div>
  );
};
