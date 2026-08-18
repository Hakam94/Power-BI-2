import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, Img } from 'remotion';
import { Video } from '@remotion/media';
import { getSourceFrameForOutputFrame } from './editing/masterTimeline';

export const ReelVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sourceTrimBefore = getSourceFrameForOutputFrame(0, fps);

  // Background Grid motion
  const bgGridY = interpolate(frame, [0, 600], [0, 150], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Spring animation for phase transitions (4 seconds per phase, 120 frames at 30fps)
  const phaseFrame = frame % 120;
  const phaseScale = spring({
    frame: phaseFrame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });

  // Animated stat counter for phase 3 (14.2 Hours)
  const statVal = interpolate(frame, [360, 440], [0, 14.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }).toFixed(1);

  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1920,
        backgroundColor: '#0D2229',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* ── Background Animated Cyber Grid ── */}
      <div
        style={{
          position: 'absolute',
          width: 1200,
          height: 2100,
          top: -100,
          left: -60,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 210, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 210, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '70px 70px',
          transform: `translateY(${bgGridY % 70}px)`,
        }}
      />

      {/* ── Top Header — Official Hakam Logo ── */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 50,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(13, 34, 41, 0.85)',
            border: '2px solid #00D2FF',
            borderRadius: 50,
            padding: '10px 30px',
            boxShadow: '0 0 30px rgba(0, 210, 255, 0.4)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Img
            src={staticFile('official_hakam_logo.png')}
            style={{ height: 80, objectFit: 'contain' }}
          />
        </div>
      </div>

      {/* ── Central Speaker Video Framing (Hakam Camera Footage) ── */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 50,
          right: 50,
          height: 980,
          borderRadius: 36,
          overflow: 'hidden',
          border: '4px solid #00D2FF',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0,210,255,0.4)',
          zIndex: 10,
        }}
      >
        <Video
          src={staticFile('DHBP6661.MP4')}
          trimBefore={sourceTrimBefore}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
          }}
        />
      </div>

      {/* ── Middle Overlay Motion Graphics Container ── */}
      <div
        style={{
          position: 'absolute',
          top: 1200,
          left: 50,
          right: 50,
          height: 480,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 30,
        }}
      >
        {/* PHASE 0: HOOK ALERT (0 - 4s) */}
        {frame < 120 && (
          <div
            style={{
              transform: `scale(${phaseScale})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(255, 60, 60, 0.25)',
                border: '2px solid #FF3C3C',
                color: '#FF6666',
                fontSize: 26,
                fontWeight: 900,
                padding: '10px 30px',
                borderRadius: 40,
                letterSpacing: 2,
                marginBottom: 20,
                boxShadow: '0 0 25px rgba(255, 60, 60, 0.4)',
              }}
            >
              ⚠️ MICROSOFT BUILD 2026 ⚠️
            </div>

            <h1
              style={{
                color: '#FFFFFF',
                fontSize: 54,
                fontWeight: 900,
                lineHeight: 1.15,
                margin: 0,
                textShadow: '0 8px 30px rgba(0,0,0,0.9)',
              }}
            >
              تبني Power BI <span style={{ color: '#BFFF00' }}>بدون ماوس!</span> 🖱️❌
            </h1>
          </div>
        )}

        {/* PHASE 1: AGENTIC AI WORKFLOW (4 - 8s) */}
        {frame >= 120 && frame < 240 && (
          <div
            style={{
              transform: `scale(${phaseScale})`,
              backgroundColor: 'rgba(13, 34, 41, 0.95)',
              border: '3px solid #00D2FF',
              borderRadius: 28,
              padding: '30px 25px',
              textAlign: 'center',
              boxShadow: '0 0 35px rgba(0,210,255,0.4)',
              width: '100%',
            }}
          >
            <span style={{ color: '#00D2FF', fontSize: 22, fontWeight: 900, letterSpacing: 2 }}>
              عصر الـ AGENTIC AI 🤖
            </span>

            <h2 style={{ color: '#FFFFFF', fontSize: 38, fontWeight: 900, margin: '12px 0' }}>
              تكتب جملة واحدة بالإنجليزي... 💬
            </h2>

            <p style={{ color: '#BFFF00', fontSize: 28, fontWeight: 800, margin: 0 }}>
              والذكاء الاصطناعي ينشئ الـ DAX والتقارير كاملة! ⚡
            </p>
          </div>
        )}

        {/* PHASE 2: 3 MAJOR UPDATES (8 - 12s) */}
        {frame >= 240 && frame < 360 && (
          <div
            style={{
              transform: `scale(${phaseScale})`,
              backgroundColor: 'rgba(13, 34, 41, 0.95)',
              border: '3px solid #BFFF00',
              borderRadius: 28,
              padding: '25px 20px',
              textAlign: 'center',
              boxShadow: '0 0 35px rgba(191,255,0,0.3)',
              width: '100%',
            }}
          >
            <div style={{ color: '#BFFF00', fontSize: 22, fontWeight: 900, letterSpacing: 2, marginBottom: 10 }}>
              ⚡ 3 تحديثات ثورية في POWER BI
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', gap: 10 }}>
              <div style={{ backgroundColor: 'rgba(0,210,255,0.15)', padding: '10px 14px', borderRadius: 16, border: '1px solid #00D2FF', color: '#00D2FF', fontSize: 20, fontWeight: 800 }}>
                🤖 Agent Skills
              </div>
              <div style={{ backgroundColor: 'rgba(191,255,0,0.15)', padding: '10px 14px', borderRadius: 16, border: '1px solid #BFFF00', color: '#BFFF00', fontSize: 20, fontWeight: 800 }}>
                🔌 MCP Protocol
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '10px 14px', borderRadius: 16, border: '1px solid #FFFFFF', color: '#FFFFFF', fontSize: 20, fontWeight: 800 }}>
                🧠 Fabric IQ
              </div>
            </div>
          </div>
        )}

        {/* PHASE 3: STAT BADGE (12 - 16s) */}
        {frame >= 360 && frame < 480 && (
          <div
            style={{
              transform: `scale(${phaseScale})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 88,
                fontWeight: 900,
                color: '#BFFF00',
                lineHeight: 1,
                textShadow: '0 0 40px #BFFF00',
                margin: 0,
              }}
            >
              -{statVal} ساعة
            </div>

            <h2 style={{ color: '#FFFFFF', fontSize: 36, fontWeight: 900, margin: '10px 0 0 0' }}>
              توفير أسبوعياً لكل محلل بيانات! ⏱️
            </h2>
          </div>
        )}

        {/* PHASE 4: OUTRO CTA (16 - 20s) */}
        {frame >= 480 && (
          <div
            style={{
              transform: `scale(${phaseScale})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <h2 style={{ color: '#FFFFFF', fontSize: 44, fontWeight: 900, margin: '0 0 20px 0' }}>
              شاهد الفيديو الكامل على يوتيوب! 🚀
            </h2>

            <div
              style={{
                backgroundColor: '#BFFF00',
                color: '#0D2229',
                padding: '20px 40px',
                borderRadius: 50,
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: 1,
                boxShadow: '0 0 35px #BFFF00',
                marginBottom: 15,
              }}
            >
              ▶ Hakam Data Studio
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Captions Bar (Dual Language Arabic + English) ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 50,
          right: 50,
          backgroundColor: 'rgba(0, 210, 255, 0.18)',
          border: '2px solid #00D2FF',
          borderRadius: 24,
          padding: '14px 25px',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0, 210, 255, 0.3)',
          zIndex: 40,
        }}
      >
        <div style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 900, marginBottom: 4 }}>
          تخيل بدل ما تقعد ساعات تبني موديل بيانات... 🚀
        </div>
        <div style={{ color: '#00D2FF', fontSize: 20, fontWeight: 800 }}>
          Agentic AI for Power BI • Microsoft Build 2026
        </div>
      </div>
    </div>
  );
};
