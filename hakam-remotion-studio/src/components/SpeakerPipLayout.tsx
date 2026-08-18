import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CyberBackground } from './CyberBackground';

export type SpeakerPipLayoutProps = {
  /** The video element or video sequence to show inside the PIP / full screen */
  videoElement: React.ReactNode;
  /** The motion graphic content to display on the left stage */
  graphicContent: React.ReactNode;
  /**
   * Layout Mode:
   * - 'full-speaker': Video is 1920x1080 full screen.
   * - 'pip-right': Video shrinks to floating card on right, main stage on left (70%).
   * - 'pip-bottom-right': Video shrinks to floating bottom-right webcam PIP, main stage takes full screen.
   */
  mode: 'full-speaker' | 'pip-right' | 'pip-bottom-right';
  /** Title of the motion graphic section (shown in top stage header) */
  stageTitle?: string;
  /** Subtitle / tag for stage header */
  stageCategory?: string;
};

export const SpeakerPipLayout: React.FC<SpeakerPipLayoutProps> = ({
  videoElement,
  graphicContent,
  mode,
  stageTitle,
  stageCategory = 'AGENTIC AI FOR POWER BI',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Smooth Spring Transition ───────────────────────────────────────────────
  const transitionSpring = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120, mass: 0.8 },
  });

  // Calculate layout parameters based on mode
  const isPip = mode !== 'full-speaker';

  // Video PIP Transformations
  // Full mode: x=0, y=0, w=1920, h=1080, radius=0
  // PIP-right mode: x=1240, y=140, w=620, h=800, radius=24px
  // PIP-bottom-right mode: x=1360, y=660, w=500, h=360, radius=20px
  const targetX = mode === 'pip-right' ? 1240 : mode === 'pip-bottom-right' ? 1360 : 0;
  const targetY = mode === 'pip-right' ? 140 : mode === 'pip-bottom-right' ? 660 : 0;
  const targetW = mode === 'pip-right' ? 620 : mode === 'pip-bottom-right' ? 500 : 1920;
  const targetH = mode === 'pip-right' ? 800 : mode === 'pip-bottom-right' ? 360 : 1080;
  const targetRadius = isPip ? 24 : 0;

  const currentX = interpolate(transitionSpring, [0, 1], [0, targetX]);
  const currentY = interpolate(transitionSpring, [0, 1], [0, targetY]);
  const currentW = interpolate(transitionSpring, [0, 1], [1920, targetW]);
  const currentH = interpolate(transitionSpring, [0, 1], [1080, targetH]);
  const currentRadius = interpolate(transitionSpring, [0, 1], [0, targetRadius]);

  // Stage Entrance (left content)
  const stageOpacity = interpolate(transitionSpring, [0, 0.5, 1], [0, 0.2, 1]);
  const stageTranslateX = interpolate(transitionSpring, [0, 1], [-80, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D2229', overflow: 'hidden' }}>

      {/* ══ STAGE BACKGROUND (Visible in PIP mode) ══ */}
      {isPip && (
        <div style={{ position: 'absolute', inset: 0, opacity: stageOpacity }}>
          <CyberBackground />

          {/* Ambient Glows */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              left: '10%',
              width: 600,
              height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(191,255,0,0.12) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '30%',
              width: 700,
              height: 700,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,210,255,0.12) 0%, transparent 70%)',
              filter: 'blur(90px)',
            }}
          />
        </div>
      )}

      {/* ══ MAIN MOTION GRAPHIC STAGE (Left 70% / Full Screen background) ══ */}
      {isPip && (
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 60,
            width: mode === 'pip-right' ? 1120 : 1800,
            height: 1000,
            opacity: stageOpacity,
            transform: `translateX(${stageTranslateX}px)`,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10,
          }}
        >
          {/* Stage Header */}
          {stageTitle && (
            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  padding: '6px 16px',
                  borderRadius: 20,
                  backgroundColor: 'rgba(0, 210, 255, 0.12)',
                  border: '1px solid rgba(0, 210, 255, 0.4)',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#00D2FF',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                {stageCategory}
              </div>
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'Outfit, system-ui, sans-serif',
                  fontSize: 32,
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: -0.5,
                }}
              >
                {stageTitle}
              </h2>
            </div>
          )}

          {/* Main Stage Content */}
          <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
            {graphicContent}
          </div>
        </div>
      )}

      {/* ══ SPEAKER VIDEO CARD (Morphs between Full-Screen and PIP) ══ */}
      <div
        style={{
          position: 'absolute',
          left: currentX,
          top: currentY,
          width: currentW,
          height: currentH,
          borderRadius: currentRadius,
          overflow: 'hidden',
          zIndex: 20,
          boxShadow: isPip
            ? `0 24px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 210, 255, ${0.25 * transitionSpring})`
            : 'none',
          border: isPip
            ? `${Math.max(1, Math.round(3 * transitionSpring))}px solid rgba(0, 210, 255, 0.5)`
            : 'none',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        {/* Video Player */}
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {videoElement}
        </div>

        {/* Floating Speaker Label Badge (Only in PIP mode) */}
        {isPip && (
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              left: 14,
              padding: '6px 14px',
              borderRadius: 12,
              background: 'rgba(13, 34, 41, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(191, 255, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              opacity: stageOpacity,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#BFFF00',
                boxShadow: '0 0 8px #BFFF00',
              }}
            />
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 12,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: 0.5,
              }}
            >
              HAKAM — DATA STUDIO
            </span>
          </div>
        )}
      </div>

    </AbsoluteFill>
  );
};
