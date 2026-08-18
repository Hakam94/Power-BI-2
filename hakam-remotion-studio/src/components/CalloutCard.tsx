import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

interface CalloutCardProps {
  label: string;       // small category label e.g. "CAPABILITY 01"
  title: string;       // main bold text
  subtitle?: string;   // smaller descriptive text
  accent?: string;     // accent color for border/label
  position?: 'bottom-left' | 'bottom-right' | 'bottom-center' | 'top-left';
  delay?: number;      // entry delay in frames
  exitFrame?: number;  // frame to start exit animation (optional)
  icon?: string;       // emoji or icon
}

export const CalloutCard: React.FC<CalloutCardProps> = ({
  label,
  title,
  subtitle,
  accent = '#BFFF00',
  position = 'bottom-left',
  delay = 0,
  exitFrame,
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);

  // Entry spring
  const entryScale = spring({
    frame: localFrame,
    fps,
    config: { damping: 13, stiffness: 120, mass: 0.5 },
  });

  const entryX = interpolate(localFrame, [0, 18], [-60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle pulsing accent line
  const barPulse = interpolate(
    Math.sin(frame / 15),
    [-1, 1],
    [0.7, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Position mapping
  const positionStyles: Record<string, React.CSSProperties> = {
    'bottom-left':   { bottom: 140, left: 80 },
    'bottom-right':  { bottom: 140, right: 80 },
    'bottom-center': { bottom: 140, left: '50%', transform: 'translateX(-50%)' },
    'top-left':      { top: 80, left: 80 },
  };

  const posStyle = positionStyles[position] || positionStyles['bottom-left'];

  return (
    <div
      style={{
        position: 'absolute',
        ...posStyle,
        transform: `translateX(${entryX}px) scale(${entryScale})`,
        opacity,
        backgroundColor: 'rgba(13, 34, 41, 0.92)',
        border: `2px solid ${accent}`,
        borderRadius: 18,
        padding: '20px 32px',
        maxWidth: 700,
        backdropFilter: 'blur(10px)',
        boxShadow: `0 16px 50px rgba(0, 0, 0, 0.7), 0 0 25px ${accent}33`,
      }}
    >
      {/* Accent top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 24,
          right: 24,
          height: 3,
          backgroundColor: accent,
          borderRadius: '0 0 3px 3px',
          opacity: barPulse,
          boxShadow: `0 0 12px ${accent}`,
        }}
      />

      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        {icon && (
          <span style={{ fontSize: 22 }}>{icon}</span>
        )}
        <span
          style={{
            color: accent,
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: 3,
            textTransform: 'uppercase',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {label}
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          color: '#FFFFFF',
          fontSize: 28,
          fontWeight: 900,
          lineHeight: 1.25,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          marginBottom: subtitle ? 8 : 0,
        }}
      >
        {title}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.65)',
            fontSize: 18,
            fontWeight: 600,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
