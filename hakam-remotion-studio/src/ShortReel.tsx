import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from 'remotion';
import { Video } from '@remotion/media';
import { TransitionSeries } from '@remotion/transitions';
import speechData from '../public/speech_segments.json';
import { BrandBadge } from './components/BrandBadge';
import { DynamicOmniCamera } from './components/DynamicOmniCamera';
import { HookAudioDesign } from './components/HookAudioDesign';
import { DualCaptions } from './captions/DualCaptions';
import { AdvancedPowerBIDashboard } from './components/AdvancedPowerBIDashboard';

// ── Reel timing (30fps) ─────────────────────────────────────────────────────
export const REEL_DURATION = 600; // 20s

const B1_BADGE = 9;       // 0.3s — Build 2026 badge
const B1_TEXT = 15;       // 0.5s — "تخيل معي..."
const B2_TEXT = 170;      // 5.66s — "تكتب جملة وحدة..."
const B3_FLOW = 190;      // 6.33s — Full Part-6 Power BI Dashboard B-Roll
const B4_NOCLICK = 382;   // 12.7s — "بدون ما تلمس الماوس"
const B5_OUTRO = 472;     // 15.7s — Full-screen CTA card

const clips = (speechData.clips || []).slice(0, 3);

function useLocal(delay: number) {
  const frame = useCurrentFrame();
  return Math.max(0, frame - delay);
}

const pop = (local: number, fps: number, damping = 12, stiffness = 170) =>
  spring({ frame: local, fps, config: { damping, stiffness, mass: 0.5 } });

const fadeIn = (local: number, dur = 10) =>
  interpolate(local, [0, dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

export const ShortReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeLocal = useLocal(B1_BADGE);
  const t1Local = useLocal(B1_TEXT);
  const t2Local = useLocal(B2_TEXT);
  const flowLocal = useLocal(B3_FLOW);
  const noClickLocal = useLocal(B4_NOCLICK);
  const outroLocal = useLocal(B5_OUTRO);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D2229', overflow: 'hidden' }}>

      {/* ══ ZONE 1: TOP SPEAKER VIDEO (0px to 860px) — 100% CLEAN FACE PROTECTION ══ */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 860,
          overflow: 'hidden',
          borderBottom: '3px solid rgba(0, 210, 255, 0.65)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.8), 0 0 35px rgba(0, 210, 255, 0.25)',
          zIndex: 10,
        }}
      >
        <DynamicOmniCamera
          defaultOrigin="50% 28%"
          directives={[
            { startSec: 0.0, endSec: 3.0, scale: 1.25, origin: '50% 28%', type: 'hook_punch' },
            { startSec: 3.0, endSec: 8.5, scale: 1.10, origin: '50% 28%', type: 'slow_push' },
            { startSec: 8.5, endSec: 12.5, scale: 1.0, origin: '50% 28%', type: 'wide_reset' },
            { startSec: 12.5, endSec: 15.5, scale: 1.22, origin: '50% 28%', type: 'emphasis_zoom' },
            { startSec: 15.5, endSec: 20.0, scale: 1.05, origin: '50% 28%', type: 'slow_push' },
          ]}
        >
          <TransitionSeries name="Reel Footage">
            {clips.map((clip: any) => (
              <TransitionSeries.Sequence key={clip.id} durationInFrames={clip.durationFrames}>
                <Video
                  src={staticFile('DHBP6661.MP4')}
                  trimBefore={clip.trimBefore}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 22%' }}
                />
              </TransitionSeries.Sequence>
            ))}
          </TransitionSeries>
        </DynamicOmniCamera>

        {/* Top Vignette for Brand Badges */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 160,
            background: 'linear-gradient(to bottom, rgba(13,34,41,0.85) 0%, transparent 100%)',
          }}
        />

        <BrandBadge />

        {/* Top Right: Microsoft Build Badge */}
        {frame >= B1_BADGE && (
          <div
            style={{
              position: 'absolute',
              top: 40,
              right: 40,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              borderRadius: 20,
              background: 'rgba(13,34,41,0.92)',
              border: '1.5px solid rgba(0,210,255,0.7)',
              boxShadow: '0 0 20px rgba(0,210,255,0.3)',
              opacity: fadeIn(badgeLocal, 8),
              transform: `scale(${pop(badgeLocal, fps)})`,
            }}
          >
            <span style={{ fontSize: 16 }}>⚡</span>
            <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 900, color: '#00D2FF', letterSpacing: 1.5 }}>
              BUILD 2026
            </span>
          </div>
        )}
      </div>

      {/* ══ ZONE 2: BOTTOM MOTION GRAPHICS & ADVANCED B-ROLL STAGE (880px to 1740px) ══ */}
      <div
        style={{
          position: 'absolute',
          top: 880,
          left: 36,
          right: 36,
          bottom: 180,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        {/* ── BEAT 1 & 2: KINETIC HOOK HEADLINES + FLOATING DAX CARDS (0s - 6.3s) ── */}
        {frame < B3_FLOW && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20, opacity: fadeIn(t1Local, 8) }}>
            {/* Primary Hook Headline */}
            <div
              style={{
                fontFamily: 'Segoe UI, Tahoma, sans-serif',
                fontSize: 48,
                fontWeight: 900,
                color: '#FFFFFF',
                direction: 'rtl',
                textAlign: 'center',
                lineHeight: 1.3,
                textShadow: '0 4px 25px rgba(0,0,0,0.8)',
                transform: `scale(${pop(t1Local, fps)})`,
              }}
            >
              تخيّل معي... <span style={{ color: '#BFFF00' }}>بدل ما تقعد ساعات</span> تبني موديل بيانات في Power BI
            </div>

            {/* Subtitle / Promise Card */}
            <div
              style={{
                background: 'rgba(13,34,41,0.92)',
                border: '1.5px solid rgba(0,210,255,0.6)',
                borderRadius: 20,
                padding: '18px 24px',
                boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 25px rgba(0,210,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontFamily: 'Inter', fontSize: 16, color: '#00D2FF', fontWeight: 800 }}>⚡ SINGLE PROMPT AUTOMATION</span>
              <span style={{ fontFamily: 'Courier New, monospace', fontSize: 15, color: '#BFFF00', fontWeight: 700 }}>AI AGENTS + FABRIC IQ</span>
            </div>
          </div>
        )}

        {/* ── BEAT 3: ADVANCED POWER BI DASHBOARD B-ROLL (PART 6 THEME) (6.3s - 12.7s) ── */}
        {frame >= B3_FLOW && frame < B4_NOCLICK && (
          <div style={{ width: '100%' }}>
            <AdvancedPowerBIDashboard delay={B3_FLOW} />
          </div>
        )}

        {/* ── BEAT 4: "0-CLICK AUTOMATION" PUNCH CARD (12.7s - 15.7s) ── */}
        {frame >= B4_NOCLICK && frame < B5_OUTRO && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(13,34,41,0.95)',
              border: '2.5px solid #BFFF00',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 45px rgba(191,255,0,0.4)',
              borderRadius: 28,
              padding: '36px 30px',
              opacity: fadeIn(noClickLocal, 8),
              transform: `scale(${pop(noClickLocal, fps, 10, 220)})`,
            }}
          >
            <span style={{ fontSize: 72, marginBottom: 12 }}>🖱️🚫</span>
            <div
              style={{
                fontFamily: 'Segoe UI, Tahoma, sans-serif',
                fontSize: 60,
                fontWeight: 900,
                color: '#BFFF00',
                direction: 'rtl',
                textAlign: 'center',
                textShadow: '0 0 35px rgba(191,255,0,0.6)',
              }}
            >
              بدون ما تلمس الماوس!
            </div>
            <div
              style={{
                marginTop: 14,
                fontFamily: 'Arial, sans-serif',
                fontSize: 22,
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: 2.5,
              }}
            >
              0-CLICK AUTOMATED MODELING
            </div>
          </div>
        )}
      </div>

      {/* ── BEAT 5: FULL-SCREEN OUTRO / CTA CARD (15.7s - 20.0s) ── */}
      {frame >= B5_OUTRO && (
        <AbsoluteFill
          style={{
            backgroundColor: '#0D2229',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 60,
            opacity: fadeIn(outroLocal, 12),
            zIndex: 100,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 30% 20%, rgba(191,255,0,0.16) 0%, transparent 55%), radial-gradient(circle at 70% 80%, rgba(0,210,255,0.18) 0%, transparent 55%)',
            }}
          />
          <Img
            src={staticFile('official_hakam_logo.png')}
            style={{ height: 140, objectFit: 'contain', marginBottom: 40, filter: 'drop-shadow(0 6px 24px rgba(0,210,255,0.4))' }}
          />
          <div
            style={{
              fontFamily: 'Segoe UI, Tahoma, sans-serif',
              fontSize: 52,
              fontWeight: 900,
              color: '#FFFFFF',
              textAlign: 'center',
              direction: 'rtl',
              lineHeight: 1.3,
              marginBottom: 20,
              transform: `scale(${pop(outroLocal, fps)})`,
            }}
          >
            🎥 شاهد الفيديو <span style={{ color: '#BFFF00' }}>الكامل</span>
          </div>
          <div
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: 24,
              fontWeight: 800,
              color: '#00D2FF',
              textAlign: 'center',
              marginBottom: 50,
              letterSpacing: 1,
            }}
          >
            Part 6 · Agent Skills · MCP Protocol · Fabric IQ
          </div>
          <div
            style={{
              background: '#BFFF00',
              color: '#0D2229',
              padding: '20px 48px',
              borderRadius: 50,
              fontFamily: 'Arial, sans-serif',
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: 1,
              boxShadow: '0 0 40px rgba(191,255,0,0.5)',
              transform: `scale(${interpolate(Math.sin(frame / 8), [-1, 1], [1, 1.06])})`,
            }}
          >
            ▶ @HakamDataStudio
          </div>
        </AbsoluteFill>
      )}

      {/* ══ ZONE 3: BILINGUAL DUAL CAPTIONS BAR (1750px to 1900px) ══ */}
      {frame < B5_OUTRO && <DualCaptions />}

      {/* ══ ZONE 4: SYNCHRONIZED HOOK AUDIO DESIGN (WHOOSH, BASS IMPACT, POPS, BGM) ══ */}
      <HookAudioDesign hookDurationFrames={REEL_DURATION} />
    </AbsoluteFill>
  );
};
