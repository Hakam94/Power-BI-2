import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface VeoBRollOverlayProps {
  startSec: number;
  durationSec: number;
  conceptTitle: string;
  conceptSubtitle: string;
  badgeText?: string;
}

export const VeoBRollOverlay: React.FC<VeoBRollOverlayProps> = ({
  startSec,
  durationSec,
  conceptTitle,
  conceptSubtitle,
  badgeText = 'GOOGLE VEO 3D B-ROLL',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;

  if (currentSec < startSec || currentSec > startSec + durationSec) {
    return null;
  }

  const startFrame = Math.round(startSec * fps);
  const endFrame = Math.round((startSec + durationSec) * fps);
  const activeFrame = frame - startFrame;
  const remainingFrame = endFrame - frame;

  // Spring entrance
  const enterScale = spring({
    frame: activeFrame,
    fps,
    config: { damping: 12, stiffness: 180 },
    from: 0.85,
    to: 1.0,
  });

  const enterOpacity = interpolate(activeFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const exitOpacity = interpolate(remainingFrame, [0, 10], [0, 1], { extrapolateLeft: 'clamp' });
  const finalOpacity = Math.min(enterOpacity, exitOpacity);

  return (
    <div
      style={{
        position: 'absolute',
        right: 80,
        top: 140,
        width: 720,
        borderRadius: 24,
        background: 'linear-gradient(135deg, rgba(13,34,41,0.92) 0%, rgba(10,25,30,0.96) 100%)',
        border: '2px solid rgba(0, 210, 255, 0.6)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.75), 0 0 35px rgba(0,210,255,0.25)',
        padding: '28px 34px',
        opacity: finalOpacity,
        transform: `scale(${enterScale})`,
        zIndex: 50,
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Veo AI Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(191,255,0,0.12)',
          border: '1px solid rgba(191,255,0,0.5)',
          borderRadius: 8,
          padding: '4px 12px',
          marginBottom: 16,
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#BFFF00', boxShadow: '0 0 8px #BFFF00' }} />
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 800, color: '#BFFF00', letterSpacing: '0.08em' }}>
          {badgeText}
        </span>
      </div>

      <h3
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 32,
          fontWeight: 800,
          color: '#FFFFFF',
          margin: '0 0 10px 0',
          letterSpacing: '-0.02em',
        }}
      >
        {conceptTitle}
      </h3>

      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 18,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.75)',
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {conceptSubtitle}
      </p>
    </div>
  );
};
