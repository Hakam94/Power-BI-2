import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { HookAudioDesign } from '../components/HookAudioDesign';

/**
 * HookScene — Ali Abdaal / Viral Tech YouTube Style Retention Graphics (0:00 to 0:32)
 *
 * Designed to MAXIMIZE retention with:
 * - Dynamic kinetic typography & spring scale pop-ins
 * - High-impact AI workflow transformation card
 * - Neon Lime #BFFF00 & Electric Cyan #00D2FF glows
 * - 100% Strict Face Protection (anchored strictly in the LEFT column)
 */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── L1: MICROSOFT BUILD 2026 BADGE (0.3s / frame 9) ──────────────────────
  const badgeDelay = Math.round(0.3 * fps);
  const badgeLocalFrame = Math.max(0, frame - badgeDelay);
  const badgeScale = spring({
    frame: badgeLocalFrame,
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.4 },
  });
  const badgeOpacity = interpolate(badgeLocalFrame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── L2: "IMAGINE THIS..." KINETIC TEXT (0.5s / frame 15) ──────────────────
  const p1Delay = Math.round(0.5 * fps);
  const p1Frame = Math.max(0, frame - p1Delay);
  const p1Scale = spring({
    frame: p1Frame,
    fps,
    config: { damping: 11, stiffness: 220, mass: 0.5 },
  });
  const p1Opacity = interpolate(p1Frame, [0, 6], [0, 1], { extrapolateRight: 'clamp' });

  // ── L3: PROMPT FLOATING CARD (5.9s / frame 177) ──────────────────────────
  const promptDelay = Math.round(5.9 * fps);
  const promptFrame = Math.max(0, frame - promptDelay);
  const promptScale = spring({
    frame: promptFrame,
    fps,
    config: { damping: 12, stiffness: 180 },
  });
  const promptY = interpolate(promptFrame, [0, 15], [30, 0], { extrapolateRight: 'clamp' });
  const promptOpacity = interpolate(promptFrame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });

  // ── L4: WORKFLOW ANIMATED DIAGRAM (8.3s / frame 249) ─────────────────────
  const flowDelay = Math.round(8.3 * fps);
  const flowFrame = Math.max(0, frame - flowDelay);
  const flowScale = spring({
    frame: flowFrame,
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const flowOpacity = interpolate(flowFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  // Pulse beam inside flow card
  const beamX = interpolate((frame % 60), [0, 60], [0, 500]);

  // ── L5: "0-CLICK AUTOMATION" LIME POP (13.3s / frame 399) ──────────────────
  const mouseDelay = Math.round(13.3 * fps);
  const mouseFrame = Math.max(0, frame - mouseDelay);
  const mouseScale = spring({
    frame: mouseFrame,
    fps,
    config: { damping: 9, stiffness: 240, mass: 0.4 },
  });
  const mouseOpacity = interpolate(mouseFrame, [0, 6], [0, 1], { extrapolateRight: 'clamp' });

  // ── L6: BUILD 2026 ANNOUNCEMENT BADGE (18.3s / frame 549) ───────────────
  const announceDelay = Math.round(18.3 * fps);
  const announceFrame = Math.max(0, frame - announceDelay);
  const announceScale = spring({
    frame: announceFrame,
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const announceOpacity = interpolate(announceFrame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });

  // ── L7: HOST INTRO CARD (22.1s / frame 663) ──────────────────────────────
  const introDelay = Math.round(22.1 * fps);
  const introFrame = Math.max(0, frame - introDelay);
  const introX = interpolate(introFrame, [0, 15], [-400, 0], { extrapolateRight: 'clamp' });
  const introOpacity = interpolate(introFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* ── L1: MICROSOFT BUILD 2026 BADGE (Top-Left) ── */}
      <div
        style={{
          position: 'absolute',
          top: 70,
          left: 80,
          opacity: badgeOpacity,
          transform: `scale(${badgeScale})`,
          transformOrigin: 'top left',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 22px',
          borderRadius: 24,
          background: 'rgba(13, 34, 41, 0.94)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(0, 210, 255, 0.7)',
          boxShadow: '0 8px 32px rgba(0, 210, 255, 0.35)',
        }}
      >
        <span style={{ fontSize: 20 }}>⚡</span>
        <span
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 13,
            fontWeight: 900,
            color: '#00D2FF',
            letterSpacing: 2.5,
            textTransform: 'uppercase',
          }}
        >
          MICROSOFT BUILD 2026 EXCLUSIVE
        </span>
      </div>

      {/* ── L2: "تخيّل معي..." POP INTRO (0.5s) ── */}
      {frame >= p1Delay && frame < promptDelay && (
        <div
          style={{
            position: 'absolute',
            top: 140,
            left: 80,
            opacity: p1Opacity,
            transform: `scale(${p1Scale})`,
            transformOrigin: 'top left',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '16px 32px',
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(13,34,41,0.96) 0%, rgba(13,34,41,0.85) 100%)',
            border: '2px solid #BFFF00',
            boxShadow: '0 12px 40px rgba(191,255,0,0.3)',
          }}
        >
          <span style={{ fontSize: 36 }}>✨</span>
          <span
            style={{
              fontFamily: 'Outfit, system-ui, sans-serif',
              fontSize: 38,
              fontWeight: 900,
              color: '#FFFFFF',
              direction: 'rtl',
              letterSpacing: -0.5,
            }}
          >
            تخيّل معي... <span style={{ color: '#BFFF00' }}>بدل ما تقعد ساعات!</span>
          </span>
        </div>
      )}

      {/* ── L3: PROMPT FLOATING CARD (5.9s) ── */}
      {frame >= promptDelay && frame < flowDelay && (
        <div
          style={{
            position: 'absolute',
            top: 140,
            left: 80,
            width: 640,
            opacity: promptOpacity,
            transform: `scale(${promptScale}) translateY(${promptY}px)`,
            transformOrigin: 'top left',
            padding: '20px 28px',
            borderRadius: 24,
            background: 'rgba(13, 34, 41, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(0, 210, 255, 0.8)',
            boxShadow: '0 16px 50px rgba(0, 210, 255, 0.35)',
            direction: 'rtl',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00D2FF' }} />
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 800, color: '#00D2FF', letterSpacing: 1.5 }}>
              PROMPT TO POWER BI REPORT
            </span>
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: 'Outfit, system-ui',
              fontSize: 26,
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.4,
            }}
          >
            "تكتب جملة واحدة بالإنجليزي، والذكاء الاصطناعي ينشئ كل شيء تلقائياً!" 🤖
          </p>
        </div>
      )}

      {/* ── L4: WORKFLOW ANIMATED DIAGRAM (8.3s to 13.3s) ── */}
      {frame >= flowDelay && frame < mouseDelay && (
        <div
          style={{
            position: 'absolute',
            top: 140,
            left: 80,
            width: 620,
            opacity: flowOpacity,
            transform: `scale(${flowScale})`,
            transformOrigin: 'top left',
            padding: '24px',
            borderRadius: 24,
            background: 'rgba(13, 34, 41, 0.96)',
            backdropFilter: 'blur(20px)',
            border: '2px solid #00D2FF',
            boxShadow: '0 16px 50px rgba(0, 210, 255, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Neon energy beam */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: beamX,
              width: 120,
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(0,210,255,0.25), transparent)',
              transform: 'skewX(-20deg)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 900, color: '#BFFF00', letterSpacing: 2, marginBottom: 16 }}>
            AUTOMATED AGENTIC WORKFLOW
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            {/* Step 1 */}
            <div style={{ flex: 1, padding: 14, background: 'rgba(255,255,255,0.05)', borderRadius: 14, textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>💬</div>
              <div style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 800, color: '#FFF' }}>Prompt / Image</div>
            </div>

            <div style={{ color: '#00D2FF', fontSize: 20, fontWeight: 900 }}>➔</div>

            {/* Step 2 */}
            <div style={{ flex: 1, padding: 14, background: 'rgba(0, 210, 255, 0.15)', borderRadius: 14, textAlign: 'center', border: '1px solid #00D2FF' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>🤖</div>
              <div style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 800, color: '#00D2FF' }}>Agent Engine</div>
            </div>

            <div style={{ color: '#BFFF00', fontSize: 20, fontWeight: 900 }}>➔</div>

            {/* Step 3 */}
            <div style={{ flex: 1, padding: 14, background: 'rgba(191, 255, 0, 0.15)', borderRadius: 14, textAlign: 'center', border: '1px solid #BFFF00' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>📊</div>
              <div style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 800, color: '#BFFF00' }}>DAX & Report</div>
            </div>
          </div>
        </div>
      )}

      {/* ── L5: "0-CLICK AUTOMATION" LIME POP (13.3s) ── */}
      {frame >= mouseDelay && frame < announceDelay && (
        <div
          style={{
            position: 'absolute',
            top: 150,
            left: 80,
            opacity: mouseOpacity,
            transform: `scale(${mouseScale})`,
            transformOrigin: 'top left',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '20px 36px',
            borderRadius: 24,
            background: 'linear-gradient(135deg, rgba(13,34,41,0.98) 0%, rgba(13,34,41,0.9) 100%)',
            border: '2.5px solid #BFFF00',
            boxShadow: '0 20px 60px rgba(191, 255, 0, 0.4)',
          }}
        >
          <span style={{ fontSize: 44 }}>🖱️🚫</span>
          <div style={{ display: 'flex', flexDirection: 'column', direction: 'rtl' }}>
            <span style={{ fontFamily: 'Outfit', fontSize: 34, fontWeight: 900, color: '#BFFF00' }}>
              بدون ما تلمس الماوس!
            </span>
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 800, color: '#00D2FF', letterSpacing: 2 }}>
              0-CLICK AUTOMATED MODELING
            </span>
          </div>
        </div>
      )}

      {/* ── L6: BUILD 2026 ANNOUNCEMENT CARD (18.3s) ── */}
      {frame >= announceDelay && frame < introDelay && (
        <div
          style={{
            position: 'absolute',
            top: 150,
            left: 80,
            width: 620,
            opacity: announceOpacity,
            transform: `scale(${announceScale})`,
            transformOrigin: 'top left',
            padding: '20px 28px',
            borderRadius: 20,
            background: 'rgba(13, 34, 41, 0.95)',
            border: '1.5px solid rgba(0, 210, 255, 0.7)',
            backdropFilter: 'blur(16px)',
            direction: 'rtl',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>📢</span>
            <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 800, color: '#00D2FF', letterSpacing: 1.5 }}>
              OFFICIAL ANNOUNCEMENT
            </span>
          </div>
          <p style={{ margin: 0, fontFamily: 'Outfit', fontSize: 24, fontWeight: 800, color: '#FFFFFF' }}>
            هذا ما أعلنت عنه Microsoft في Build 2026 قبل أسابيع قليلة 🚀
          </p>
        </div>
      )}

      {/* ── L7: HOST INTRO CARD (22.1s to end of hook) ── */}
      {frame >= introDelay && (
        <div
          style={{
            position: 'absolute',
            bottom: 140,
            left: 80,
            opacity: introOpacity,
            transform: `translateX(${introX}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            padding: '14px 28px',
            borderRadius: 20,
            background: 'rgba(13, 34, 41, 0.94)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(0, 210, 255, 0.6)',
            boxShadow: '0 14px 45px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #BFFF00 0%, #00D2FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              color: '#0D2229',
              fontWeight: 900,
            }}
          >
            H
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>
              Hakam — Hakam Data Studio
            </span>
            <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#00D2FF', fontWeight: 700, direction: 'rtl' }}>
              عصر الـ Agentic AI في Power BI & Fabric
            </span>
          </div>
        </div>
      )}

      {/* ══ SYNCHRONIZED SOUND DESIGN & CYBER BGM ══ */}
      <HookAudioDesign hookDurationFrames={730} />
    </div>
  );
};
