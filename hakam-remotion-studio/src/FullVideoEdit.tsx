import React from 'react';
import {
  AbsoluteFill,
  CalculateMetadataFunction,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Video } from '@remotion/media';
import { TransitionSeries } from '@remotion/transitions';
import { CyberBackground } from './components/CyberBackground';
import { BrandBadge } from './components/BrandBadge';
import { PowerBIBrandBar } from './components/PowerBIBrandBar';
import { HookScene } from './scenes/HookScene';
import { ContextScene } from './scenes/ContextScene';
import { MCPScene } from './scenes/MCPScene';
import { FabricIQScene } from './scenes/FabricIQScene';
import { ImpactScene } from './scenes/ImpactScene';
import { OutroScene } from './scenes/OutroScene';
import { CalloutCard } from './components/CalloutCard';
import { DualCaptions } from './captions/DualCaptions';
import { DynamicOmniCamera } from './components/DynamicOmniCamera';

// ── Types ────────────────────────────────────────────────────────────────────
type Clip = {
  id: number;
  srcStartSec: number;
  srcEndSec: number;
  durationSec: number;
  trimBefore: number;
  durationFrames: number;
};

type SpeechData = {
  generatedAt: string;
  sourceFile: string;
  fps: number;
  compositionFrames: number;
  totalSpeechSec: number;
  totalRemovedSec: number;
  clips: Clip[];
};

export type FullVideoEditProps = {
  speechData: SpeechData | null;
};

// ── calculateMetadata ────────────────────────────────────────────────────────
export const calculateMetadata: CalculateMetadataFunction<FullVideoEditProps> = async () => {
  try {
    const res = await fetch(staticFile('speech_segments.json'));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const speechData: SpeechData = await res.json();
    return {
      durationInFrames: speechData.compositionFrames,
      props: { speechData },
    };
  } catch {
    return {
      durationInFrames: 32165,
      props: { speechData: null },
    };
  }
};

function getSectionFrames(totalFrames: number) {
  return {
    HOOK_START:  0,
    HOOK_END:    Math.round(totalFrames * 0.075),
    CTX_START:   Math.round(totalFrames * 0.075),
    CTX_END:     Math.round(totalFrames * 0.20),
    CAP1_START:  Math.round(totalFrames * 0.20),
    CAP1_END:    Math.round(totalFrames * 0.316),
    CAP2_START:  Math.round(totalFrames * 0.316),
    CAP2_END:    Math.round(totalFrames * 0.433),
    CAP3_START:  Math.round(totalFrames * 0.433),
    CAP3_END:    Math.round(totalFrames * 0.55),
    MCP_START:   Math.round(totalFrames * 0.55),
    MCP_END:     Math.round(totalFrames * 0.70),
    FIQ_START:   Math.round(totalFrames * 0.70),
    FIQ_END:     Math.round(totalFrames * 0.8125),
    IMP_START:   Math.round(totalFrames * 0.8125),
    IMP_END:     Math.round(totalFrames * 0.925),
    OUTRO_START: Math.round(totalFrames * 0.925),
    OUTRO_END:   totalFrames,
  };
}

export const FullVideoEdit: React.FC<FullVideoEditProps> = ({ speechData }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { durationInFrames } = React.useMemo(() => {
    return { durationInFrames: speechData?.compositionFrames ?? 32165 };
  }, [speechData]);

  const S = getSectionFrames(durationInFrames);
  const clips = speechData?.clips ?? null;

  // ── DYNAMIC PIP LAYOUT MATH (Single Unbroken Video Track) ─────────────────────
  // 1. Hook Chart PIP: Frames 110 to 450 (Power BI Chart visual expansion)
  const isHookPip = frame >= 110 && frame < 450;
  // 2. MCP Architecture PIP: Frames S.MCP_START to S.MCP_END
  const isMCPSection = frame >= S.MCP_START && frame < S.MCP_END;
  // 3. Fabric IQ PIP: Frames S.FIQ_START to S.FIQ_END
  const isFIQSection = frame >= S.FIQ_START && frame < S.FIQ_END;

  const hookProgress = spring({
    frame: Math.max(0, frame - 110),
    fps,
    config: { damping: 16, stiffness: 120 },
  });

  const mcpProgress = spring({
    frame: Math.max(0, frame - S.MCP_START),
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  const fiqProgress = spring({
    frame: Math.max(0, frame - S.FIQ_START),
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  let videoX = 0;
  let videoY = 0;
  let videoW = 1920;
  let videoH = 1080;
  let videoRadius = 0;
  let videoBorder = 0;
  let videoShadow = 0;

  if (isHookPip) {
    // Smoothly morph speaker to PIP right card (620x800) during Power BI Chart preview
    videoX = interpolate(hookProgress, [0, 1], [0, 1240]);
    videoY = interpolate(hookProgress, [0, 1], [0, 140]);
    videoW = interpolate(hookProgress, [0, 1], [1920, 620]);
    videoH = interpolate(hookProgress, [0, 1], [1080, 800]);
    videoRadius = interpolate(hookProgress, [0, 1], [0, 24]);
    videoBorder = interpolate(hookProgress, [0, 1], [0, 3]);
    videoShadow = interpolate(hookProgress, [0, 1], [0, 1]);
  } else if (isMCPSection) {
    // Smoothly morph to PIP right panel (620x800)
    videoX = interpolate(mcpProgress, [0, 1], [0, 1240]);
    videoY = interpolate(mcpProgress, [0, 1], [0, 140]);
    videoW = interpolate(mcpProgress, [0, 1], [1920, 620]);
    videoH = interpolate(mcpProgress, [0, 1], [1080, 800]);
    videoRadius = interpolate(mcpProgress, [0, 1], [0, 24]);
    videoBorder = interpolate(mcpProgress, [0, 1], [0, 3]);
    videoShadow = interpolate(mcpProgress, [0, 1], [0, 1]);
  } else if (isFIQSection) {
    // Smoothly morph to webcam PIP bottom-right (500x360)
    videoX = interpolate(fiqProgress, [0, 1], [0, 1360]);
    videoY = interpolate(fiqProgress, [0, 1], [0, 660]);
    videoW = interpolate(fiqProgress, [0, 1], [1920, 500]);
    videoH = interpolate(fiqProgress, [0, 1], [1080, 360]);
    videoRadius = interpolate(fiqProgress, [0, 1], [0, 20]);
    videoBorder = interpolate(fiqProgress, [0, 1], [0, 3]);
    videoShadow = interpolate(fiqProgress, [0, 1], [0, 1]);
  }

  const isPipActive = isHookPip || isMCPSection || isFIQSection;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D2229', overflow: 'hidden' }}>

      {/* ══ LAYER 0: GLOBAL CYBER BACKGROUND (Active in PIP modes) ══ */}
      {isPipActive && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <CyberBackground />

          {/* Ambient Hakam Color Glows */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              left: '5%',
              width: 700,
              height: 700,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(191,255,0,0.14) 0%, transparent 70%)',
              filter: 'blur(90px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '25%',
              width: 800,
              height: 800,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,210,255,0.14) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
        </div>
      )}

      {/* ══ LAYER 1: UNBROKEN SINGLE VIDEO PLAYER (NO REPETITION) ══ */}
      <div
        style={{
          position: 'absolute',
          left: videoX,
          top: videoY,
          width: videoW,
          height: videoH,
          borderRadius: videoRadius,
          overflow: 'hidden',
          zIndex: 10,
          border: `${videoBorder}px solid rgba(0, 210, 255, 0.6)`,
          boxShadow: videoShadow > 0
            ? `0 24px 60px rgba(0, 0, 0, 0.7), 0 0 45px rgba(0, 210, 255, 0.3)`
            : 'none',
        }}
      >
        <DynamicOmniCamera defaultOrigin="center 35%">
          {clips ? (
            <TransitionSeries name="Video Timeline">
              {clips.map((clip) => (
                <TransitionSeries.Sequence
                  key={clip.id}
                  name={`Clip ${clip.id + 1}`}
                  durationInFrames={clip.durationFrames}
                >
                  <Video
                    src={staticFile('DHBP6661.MP4')}
                    trimBefore={clip.trimBefore}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </TransitionSeries.Sequence>
              ))}
            </TransitionSeries>
          ) : (
            <Video
              src={staticFile('DHBP6661.MP4')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </DynamicOmniCamera>

        {/* Live Speaker Badge (Visible in PIP mode) */}
        {isPipActive && (
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              left: 14,
              padding: '6px 14px',
              borderRadius: 12,
              background: 'rgba(13, 34, 41, 0.88)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(191, 255, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#BFFF00',
                boxShadow: '0 0 10px #BFFF00',
              }}
            />
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 12,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: 1,
              }}
            >
              HAKAM — DATA STUDIO
            </span>
          </div>
        )}
      </div>

      {/* ══ LAYER 2: PERSISTENT BRAND BAR & BADGE ══ */}
      <BrandBadge />

      <Sequence from={S.HOOK_START} durationInFrames={S.CTX_END - S.HOOK_START} style={{ zIndex: 15 }}>
        <PowerBIBrandBar sectionLabel="Hook — Microsoft Build 2026" currentSection={0} />
      </Sequence>
      <Sequence from={S.CTX_START} durationInFrames={S.CAP1_END - S.CTX_START} style={{ zIndex: 15 }}>
        <PowerBIBrandBar sectionLabel="السياق التاريخي" currentSection={1} />
      </Sequence>
      <Sequence from={S.CAP1_START} durationInFrames={S.CAP3_END - S.CAP1_START} style={{ zIndex: 15 }}>
        <PowerBIBrandBar sectionLabel="الإعلانات الكبرى — 3 تغييرات جوهرية" currentSection={2} />
      </Sequence>
      <Sequence from={S.MCP_START} durationInFrames={S.MCP_END - S.MCP_START} style={{ zIndex: 15 }}>
        <PowerBIBrandBar sectionLabel="MCP Protocol — USB-C للذكاء الاصطناعي" currentSection={4} />
      </Sequence>
      <Sequence from={S.FIQ_START} durationInFrames={S.FIQ_END - S.FIQ_START} style={{ zIndex: 15 }}>
        <PowerBIBrandBar sectionLabel="Fabric IQ — طبقة الذكاء الدلالي" currentSection={5} />
      </Sequence>
      <Sequence from={S.IMP_START} durationInFrames={S.OUTRO_END - S.IMP_START} style={{ zIndex: 15 }}>
        <PowerBIBrandBar sectionLabel="التأثير على مستقبلك" currentSection={6} />
      </Sequence>

      {/* ══ LAYER 3: ADVANCED MOTION GRAPHICS SCENES ══ */}
      {/* NOTE: explicit zIndex:15 required on every Sequence here — the video
          layer above has zIndex:10, and without a higher z-index these overlays
          render *behind* the full-screen video and are invisible despite animating. */}

      {/* Hook Scene Overlays (0–45s) */}
      <Sequence from={S.HOOK_START} durationInFrames={S.HOOK_END - S.HOOK_START} style={{ zIndex: 15 }}>
        <HookScene />
      </Sequence>

      {/* Context Timeline Scene (0:45–2:00) */}
      <Sequence from={S.CTX_START} durationInFrames={S.CTX_END - S.CTX_START} style={{ zIndex: 15 }}>
        <ContextScene />
      </Sequence>

      {/* Capabilities Lower-Third Cards (2:00–5:30) */}
      <Sequence from={S.CAP1_START} durationInFrames={S.CAP1_END - S.CAP1_START} style={{ zIndex: 15 }}>
        <CalloutCard
          label="CAPABILITY 01"
          title="Agent Skills for Power BI"
          subtitle="بناء كامل من نص أو Screenshot — بدون ماوس"
          accent="#BFFF00"
          position="bottom-left"
          icon="🤖"
          delay={0}
        />
      </Sequence>
      <Sequence from={S.CAP2_START} durationInFrames={S.CAP2_END - S.CAP2_START} style={{ zIndex: 15 }}>
        <CalloutCard
          label="CAPABILITY 02"
          title="Fabric Apps for Semantic Models"
          subtitle="تطبيق ويب كامل فوق موديل البيانات — بدون فريق تطوير"
          accent="#00D2FF"
          position="bottom-left"
          icon="🌐"
          delay={0}
        />
      </Sequence>
      <Sequence from={S.CAP3_START} durationInFrames={S.CAP3_END - S.CAP3_START} style={{ zIndex: 15 }}>
        <CalloutCard
          label="CAPABILITY 03"
          title="Skills for Fabric Marketplace"
          subtitle="متجر الـ AI Agents — حزم جاهزة للمؤسسات"
          accent="#BFFF00"
          position="bottom-left"
          icon="🛒"
          delay={0}
        />
      </Sequence>

      {/* MCP Architecture Stage (5:30–7:00) — Left 1160px Stage */}
      <Sequence from={S.MCP_START} durationInFrames={S.MCP_END - S.MCP_START}>
        <div style={{ position: 'absolute', top: 60, left: 60, width: 1140, height: 960, zIndex: 15 }}>
          <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                padding: '6px 16px',
                borderRadius: 20,
                backgroundColor: 'rgba(0, 210, 255, 0.15)',
                border: '1px solid rgba(0, 210, 255, 0.5)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 13,
                fontWeight: 700,
                color: '#00D2FF',
                letterSpacing: 2,
              }}
            >
              MCP PROTOCOL ARCHITECTURE
            </div>
            <h2 style={{ margin: 0, fontFamily: 'Outfit, system-ui, sans-serif', fontSize: 32, fontWeight: 800, color: '#FFFFFF' }}>
              معمارية بروتوكول MCP — USB-C للذكاء الاصطناعي
            </h2>
          </div>
          <MCPScene />
        </div>
      </Sequence>

      {/* Fabric IQ Stage (7:00–8:15) — Full Canvas Stage */}
      <Sequence from={S.FIQ_START} durationInFrames={S.FIQ_END - S.FIQ_START}>
        <div style={{ position: 'absolute', top: 60, left: 60, width: 1250, height: 960, zIndex: 15 }}>
          <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                padding: '6px 16px',
                borderRadius: 20,
                backgroundColor: 'rgba(191, 255, 0, 0.15)',
                border: '1px solid rgba(191, 255, 0, 0.5)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 13,
                fontWeight: 700,
                color: '#BFFF00',
                letterSpacing: 2,
              }}
            >
              FABRIC IQ SEMANTIC LAYER
            </div>
            <h2 style={{ margin: 0, fontFamily: 'Outfit, system-ui, sans-serif', fontSize: 32, fontWeight: 800, color: '#FFFFFF' }}>
              طبقة الذكاء الدلالي — Fabric IQ & Semantic Models
            </h2>
          </div>
          <FabricIQScene />
        </div>
      </Sequence>

      {/* Impact Stat Counters (8:15–9:15) */}
      <Sequence from={S.IMP_START} durationInFrames={S.IMP_END - S.IMP_START} style={{ zIndex: 15 }}>
        <ImpactScene />
      </Sequence>

      {/* ══ LAYER 4: DUAL ARABIC & ENGLISH CAPTIONS ══ */}
      <DualCaptions />

      {/* Outro CTA (9:15–end) */}
      <Sequence from={S.OUTRO_START} durationInFrames={S.OUTRO_END - S.OUTRO_START} style={{ zIndex: 15 }}>
        <OutroScene />
      </Sequence>

    </AbsoluteFill>
  );
};
