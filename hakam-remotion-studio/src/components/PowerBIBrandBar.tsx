import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface PowerBIBrandBarProps {
  sectionLabel?: string;
  totalSections?: number;
  currentSection?: number;
  showMicrosoftFabric?: boolean;
}

export const PowerBIBrandBar: React.FC<PowerBIBrandBarProps> = ({
  sectionLabel = 'Agentic AI for Power BI',
  totalSections = 7,
  currentSection = 0,
  showMicrosoftFabric = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entry animation
  const barY = interpolate(frame, [0, 0.7 * fps], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const barOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Animated cyan accent line pulse
  const accentPulse = interpolate(
    Math.sin(frame / 25),
    [-1, 1],
    [0.6, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Section progress dots
  const sectionDots = Array.from({ length: totalSections }, (_, i) => i);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 88,
        transform: `translateY(${barY}px)`,
        opacity: barOpacity,
      }}
    >
      {/* Cyan accent top line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, transparent 0%, #00D2FF 20%, #BFFF00 50%, #00D2FF 80%, transparent 100%)',
          opacity: accentPulse,
          boxShadow: '0 0 15px rgba(0, 210, 255, 0.8)',
        }}
      />

      {/* Bar background */}
      <div
        style={{
          position: 'absolute',
          top: 3,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(13, 34, 41, 0.96)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid rgba(0, 210, 255, 0.2)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          top: 3,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 50,
          paddingRight: 50,
          gap: 30,
        }}
      >
        {/* Power BI Logo Mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          {/* Stylized Power BI icon */}
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <rect x="0" y="14" width="10" height="20" rx="2" fill="#BFFF00" opacity="0.9" />
            <rect x="12" y="8" width="10" height="26" rx="2" fill="#00D2FF" opacity="0.9" />
            <rect x="24" y="0" width="10" height="34" rx="2" fill="#FFFFFF" opacity="0.85" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                color: '#FFFFFF',
                fontSize: 15,
                fontWeight: 900,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                letterSpacing: 1.5,
                lineHeight: 1,
              }}
            >
              POWER BI
            </span>
            {showMicrosoftFabric && (
              <span
                style={{
                  color: '#00D2FF',
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: 1,
                  lineHeight: 1,
                  marginTop: 2,
                }}
              >
                MICROSOFT FABRIC
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 40,
            backgroundColor: 'rgba(0, 210, 255, 0.3)',
            flexShrink: 0,
          }}
        />

        {/* Section Label */}
        <div
          style={{
            color: '#BFFF00',
            fontSize: 16,
            fontWeight: 800,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: 2,
            textTransform: 'uppercase',
            flex: 1,
          }}
        >
          {sectionLabel}
        </div>

        {/* Section progress dots */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          {sectionDots.map((i) => (
            <div
              key={i}
              style={{
                width: i === currentSection ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === currentSection ? '#BFFF00' : 'rgba(255, 255, 255, 0.25)',
                boxShadow: i === currentSection ? '0 0 10px #BFFF00' : 'none',
                transition: 'none', // Remotion: no CSS transitions
              }}
            />
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 40,
            backgroundColor: 'rgba(0, 210, 255, 0.3)',
            flexShrink: 0,
          }}
        />

        {/* Channel Tag */}
        <div
          style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 13,
            fontWeight: 700,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: 1,
            flexShrink: 0,
          }}
        >
          @HakamDataStudio
        </div>
      </div>
    </div>
  );
};
