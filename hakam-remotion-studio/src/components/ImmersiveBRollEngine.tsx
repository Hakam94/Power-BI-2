import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const ImmersiveBRollEngine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pulse & Particle Timers
  const gridY = interpolate((frame * 2) % 60, [0, 60], [0, 40]);
  const beamProgress = interpolate((frame * 3) % 90, [0, 90], [0, 1000]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* ══ LAYER 1: CYBER PERSPECTIVE NEON GRID (CONTINUOUS MOTION) ══ */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: -200,
          right: -200,
          height: 900,
          background: `
            linear-gradient(to bottom, transparent 0%, rgba(13,34,41,0.95) 100%),
            repeating-linear-gradient(0deg, transparent, transparent 38px, rgba(0,210,255,0.18) 39px, rgba(0,210,255,0.18) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 38px, rgba(0,210,255,0.18) 39px, rgba(0,210,255,0.18) 40px)
          `,
          transform: `perspective(600px) rotateX(60deg) translateY(${gridY}px)`,
          opacity: 0.7,
        }}
      />

      {/* ══ LAYER 2: FLOATING DATA METRIC HUDS & DAX CODE PARTICLES (0s - 6s) ══ */}
      {frame >= 0 && frame < 180 && (
        <>
          {/* Floating Metric Card 1: Revenue DAX */}
          <div
            style={{
              position: 'absolute',
              top: 260,
              right: 40,
              width: 320,
              padding: '16px 20px',
              borderRadius: 18,
              background: 'rgba(13,34,41,0.85)',
              border: '1.5px solid rgba(191,255,0,0.6)',
              boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 25px rgba(191,255,0,0.3)',
              backdropFilter: 'blur(14px)',
              transform: `translateY(${Math.sin(frame / 12) * 12}px) scale(${spring({ frame, fps, config: { damping: 12 } })})`,
              opacity: interpolate(frame, [0, 15, 160, 180], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#BFFF00', fontWeight: 800 }}>⚡ AUTO-DAX AI</span>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#00D2FF' }}>+128.4%</span>
            </div>
            <div style={{ fontFamily: 'Courier New, monospace', fontSize: 14, color: '#FFFFFF', fontWeight: 700 }}>
              CALCULATE(SUM(Sales[Amt]))
            </div>
          </div>

          {/* Floating Metric Card 2: Fabric Semantic Model */}
          <div
            style={{
              position: 'absolute',
              top: 380,
              left: 40,
              width: 300,
              padding: '14px 18px',
              borderRadius: 18,
              background: 'rgba(13,34,41,0.85)',
              border: '1.5px solid rgba(0,210,255,0.6)',
              boxShadow: '0 12px 35px rgba(0,0,0,0.6), 0 0 25px rgba(0,210,255,0.3)',
              backdropFilter: 'blur(14px)',
              transform: `translateY(${Math.cos(frame / 14) * 12}px) scale(${spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12 } })})`,
              opacity: interpolate(frame, [15, 30, 160, 180], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
            }}
          >
            <div style={{ fontFamily: 'Inter', fontSize: 12, color: '#00D2FF', fontWeight: 800, marginBottom: 4 }}>
              🧠 FABRIC IQ AGENT
            </div>
            <div style={{ fontFamily: 'Outfit', fontSize: 18, color: '#FFFFFF', fontWeight: 800 }}>
              Semantic Layer Active
            </div>
          </div>
        </>
      )}

      {/* ══ LAYER 3: LIVE GROWING 3D POWER BI BAR CHARTS B-ROLL (6s - 13s) ══ */}
      {frame >= 170 && frame < 390 && (
        <div
          style={{
            position: 'absolute',
            top: 220,
            left: 50,
            right: 50,
            padding: '24px 28px',
            borderRadius: 24,
            background: 'rgba(10,25,30,0.92)',
            border: '2px solid rgba(0,210,255,0.7)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(0,210,255,0.35)',
            backdropFilter: 'blur(20px)',
            opacity: interpolate(frame, [170, 185, 370, 390], [0, 1, 1, 0], { extrapolateRight: 'clamp' }),
            transform: `scale(${spring({ frame: frame - 170, fps, config: { damping: 12, stiffness: 160 } })})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#BFFF00', boxShadow: '0 0 10px #BFFF00' }} />
              <span style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>
                LIVE AGENTIC POWER BI DASHBOARD
              </span>
            </div>
            <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#00D2FF', fontWeight: 800, background: 'rgba(0,210,255,0.15)', padding: '4px 10px', borderRadius: 8 }}>
              REAL-TIME SYNC
            </span>
          </div>

          {/* Animated 5-Bar Chart B-Roll */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 160, padding: '0 10px', borderBottom: '1.5px solid rgba(255,255,255,0.15)' }}>
            {[0.4, 0.65, 0.85, 0.7, 1.0].map((h, idx) => {
              const barHeight = interpolate(
                spring({ frame: Math.max(0, frame - 185 - idx * 6), fps, config: { damping: 10, stiffness: 120 } }),
                [0, 1],
                [0, h * 135]
              );
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 48 }}>
                  <div
                    style={{
                      width: '100%',
                      height: barHeight,
                      borderRadius: '8px 8px 0 0',
                      background: idx === 4
                        ? 'linear-gradient(to top, #BFFF00, #00D2FF)'
                        : 'linear-gradient(to top, rgba(0,210,255,0.6), rgba(0,210,255,0.95))',
                      boxShadow: idx === 4 ? '0 0 20px #BFFF00' : '0 0 12px rgba(0,210,255,0.4)',
                    }}
                  />
                  <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>
                    {['Q1', 'Q2', 'Q3', 'Q4', 'AI'][idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══ LAYER 4: 0-CLICK AI LASER ENERGY BEAM (12s - 16s) ══ */}
      {frame >= 370 && frame < 490 && (
        <div
          style={{
            position: 'absolute',
            top: 480,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, transparent, #BFFF00 50%, transparent)',
            boxShadow: '0 0 25px #BFFF00, 0 0 50px #00D2FF',
            transform: `translateX(${beamProgress - 500}px)`,
          }}
        />
      )}
    </div>
  );
};
