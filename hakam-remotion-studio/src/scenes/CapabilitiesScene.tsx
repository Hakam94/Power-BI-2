import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

export const CapabilitiesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine active card phase (0, 1, 2)
  // Total duration: 240 frames (8 seconds @ 30fps)
  // Phase 0: 0 - 80 frames
  // Phase 1: 80 - 160 frames
  // Phase 2: 160 - 240 frames
  const phase = Math.min(2, Math.floor(frame / 80));
  const phaseFrame = frame % 80;

  const cardScale = spring({
    frame: phaseFrame,
    fps,
    config: { damping: 13, stiffness: 110 },
  });

  const cardOpacity = interpolate(phaseFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const capabilities = [
    {
      badge: "CAPABILITY 01",
      title: "Agent Skills for Power BI",
      subtitle: "Autonomous Report & Model Generation",
      accent: "#BFFF00",
      points: [
        "🤖 Creates DAX measures, tables, and relationships automatically",
        "📸 Converts UI screenshots directly into active Power BI reports",
        "💬 Full authoring from plain natural language prompts",
      ],
    },
    {
      badge: "CAPABILITY 02",
      title: "Fabric Apps for Semantic Models",
      subtitle: "Turn Data Models into Web Applications Instantly",
      accent: "#00D2FF",
      points: [
        "🌐 Deploy full-stack web applications natively over your data",
        "⚡ Zero dedicated frontend/backend developer team required",
        "⏱️ Complete project delivery in days instead of weeks",
      ],
    },
    {
      badge: "CAPABILITY 03",
      title: "MCP Protocol & Fabric IQ",
      subtitle: "Universal AI Connectivity & Governed Intelligence",
      accent: "#BFFF00",
      points: [
        "🔌 Universal USB-C style protocol linking Copilot, Claude & Custom Agents",
        "🧠 Single governed business logic layer — zero hallucination",
        "🔒 Enterprise Row-Level Security (RLS) maintained natively",
      ],
    },
  ];

  const current = capabilities[phase];

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
        padding: 80,
      }}
    >
      {/* Top Section Indicator */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 40 }}>
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            style={{
              width: 80,
              height: 6,
              borderRadius: 3,
              backgroundColor: idx === phase ? current.accent : 'rgba(255, 255, 255, 0.2)',
              boxShadow: idx === phase ? `0 0 15px ${current.accent}` : 'none',
            }}
          />
        ))}
      </div>

      {/* Main Glassmorphism Card */}
      <div
        style={{
          transform: `scale(${cardScale})`,
          opacity: cardOpacity,
          width: 1400,
          backgroundColor: 'rgba(13, 34, 41, 0.88)',
          border: `2px solid ${current.accent}`,
          borderRadius: 24,
          padding: '45px 60px',
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px ${current.accent}22`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Card Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span
            style={{
              color: current.accent,
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: 3,
              backgroundColor: `${current.accent}15`,
              padding: '6px 18px',
              borderRadius: 20,
              border: `1px solid ${current.accent}66`,
            }}
          >
            {current.badge}
          </span>
          <span style={{ color: '#00D2FF', fontSize: 18, fontWeight: 700 }}>
            Hakam Data Studio Deep-Dive
          </span>
        </div>

        {/* Title */}
        <h2
          style={{
            color: '#FFFFFF',
            fontSize: 54,
            fontWeight: 900,
            margin: '0 0 10px 0',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {current.title}
        </h2>

        {/* Subtitle */}
        <p
          style={{
            color: current.accent,
            fontSize: 26,
            fontWeight: 700,
            margin: '0 0 35px 0',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {current.subtitle}
        </p>

        {/* Feature Points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {current.points.map((pt, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                padding: '18px 24px',
                borderRadius: 14,
                borderLeft: `4px solid ${current.accent}`,
              }}
            >
              <span
                style={{
                  color: '#FFFFFF',
                  fontSize: 24,
                  fontWeight: 600,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {pt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
