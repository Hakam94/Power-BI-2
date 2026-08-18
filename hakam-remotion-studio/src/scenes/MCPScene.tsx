import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

/**
 * MCPScene — 5:30 to 7:00 (MCP Architecture Diagram)
 *
 * Animated "USB-C for AI" diagram showing:
 * - AI Agents (Claude, GitHub Copilot, VS Code) on the left
 * - MCP Protocol bridge in the center
 * - Power BI / Fabric Semantic Model on the right
 * Connection lines draw in sequentially.
 */
export const MCPScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Section header ─────────────────────────────────────────────────────────
  const headerOpacity = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── Left nodes: AI Agents ─────────────────────────────────────────────────
  const leftAgents = [
    { name: 'GitHub Copilot', icon: '🐙', delay: Math.round(0.5 * fps) },
    { name: 'Claude AI', icon: '🔮', delay: Math.round(1.0 * fps) },
    { name: 'VS Code Agent', icon: '💻', delay: Math.round(1.5 * fps) },
    { name: 'Custom Agent', icon: '⚙️', delay: Math.round(2.0 * fps) },
  ];

  // ── Right nodes: Power BI targets ─────────────────────────────────────────
  const rightTargets = [
    { name: 'Semantic Model', icon: '🗃️', color: '#BFFF00', delay: Math.round(2.5 * fps) },
    { name: 'Power BI Desktop', icon: '📊', color: '#00D2FF', delay: Math.round(3.0 * fps) },
    { name: 'Fabric Workspace', icon: '🏭', color: '#BFFF00', delay: Math.round(3.5 * fps) },
  ];

  // ── Center MCP node ────────────────────────────────────────────────────────
  const mcpDelay = Math.round(2.2 * fps);
  const mcpLocalFrame = Math.max(0, frame - mcpDelay);
  const mcpScale = spring({
    frame: mcpLocalFrame,
    fps,
    config: { damping: 10, stiffness: 150, mass: 0.4 },
  });
  const mcpOpacity = interpolate(mcpLocalFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulsing MCP ring
  const mcpPulse = interpolate(
    Math.sin(frame / 20),
    [-1, 1],
    [0.85, 1.15],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // ── Connection lines ───────────────────────────────────────────────────────
  const lineDelay = Math.round(4 * fps);
  const lineProgress = interpolate(frame, [lineDelay, lineDelay + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── "USB-C for AI" callout ─────────────────────────────────────────────────
  const usbcDelay = Math.round(5 * fps);
  const usbcLocalFrame = Math.max(0, frame - usbcDelay);
  const usbcY = interpolate(usbcLocalFrame, [0, 20], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const usbcOpacity = interpolate(usbcLocalFrame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // ── MCP Types callout ──────────────────────────────────────────────────────
  const mcpTypesDelay = Math.round(6 * fps);
  const mcpTypesLocalFrame = Math.max(0, frame - mcpTypesDelay);
  const mcpTypesOpacity = interpolate(mcpTypesLocalFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        padding: '60px 80px',
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        <div
          style={{
            color: '#00D2FF',
            fontSize: 14,
            fontWeight: 900,
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            marginBottom: 8,
          }}
        >
          🔌 Model Context Protocol
        </div>
        <h2
          style={{
            color: '#FFFFFF',
            fontSize: 46,
            fontWeight: 900,
            margin: 0,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          USB-C للذكاء الاصطناعي —{' '}
          <span style={{ color: '#BFFF00' }}>كيف يتصل الـ Agent بـ Power BI</span>
        </h2>
      </div>

      {/* Architecture Diagram Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1600,
          gap: 0,
          justifyContent: 'space-between',
        }}
      >
        {/* Left column: AI Agents */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 220 }}>
          <div
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: 3,
              textTransform: 'uppercase',
              textAlign: 'center',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              marginBottom: 8,
            }}
          >
            AI Agents
          </div>
          {leftAgents.map((agent, i) => {
            const localFrame = Math.max(0, frame - agent.delay);
            const scale = spring({ frame: localFrame, fps, config: { damping: 12, stiffness: 130 } });
            const opacity = interpolate(localFrame, [0, 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={i}
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  backgroundColor: 'rgba(0, 210, 255, 0.08)',
                  border: '1.5px solid rgba(0, 210, 255, 0.4)',
                  borderRadius: 14,
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 22 }}>{agent.icon}</span>
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {agent.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Connection lines left → center (SVG) */}
        <div style={{ flex: 1, position: 'relative', height: 260 }}>
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
            viewBox="0 0 200 260"
            preserveAspectRatio="none"
          >
            {leftAgents.map((_, i) => {
              const yPos = 30 + i * 60;
              const lineLen = 200 * lineProgress;
              return (
                <line
                  key={i}
                  x1={0}
                  y1={yPos}
                  x2={lineLen}
                  y2={130}
                  stroke="#00D2FF"
                  strokeWidth={1.5}
                  strokeDasharray="5 3"
                  opacity={0.6}
                />
              );
            })}
          </svg>
        </div>

        {/* Center: MCP Node */}
        <div
          style={{
            transform: `scale(${mcpScale * mcpPulse})`,
            opacity: mcpOpacity,
            flexShrink: 0,
            width: 200,
            height: 200,
            borderRadius: '50%',
            backgroundColor: 'rgba(13, 34, 41, 0.95)',
            border: '3px solid #00D2FF',
            boxShadow: '0 0 50px rgba(0, 210, 255, 0.6), 0 0 100px rgba(0, 210, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 36 }}>🔌</span>
          <div
            style={{
              color: '#00D2FF',
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: 2,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            MCP
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1.5,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textTransform: 'uppercase',
            }}
          >
            Protocol
          </div>
        </div>

        {/* Connection lines center → right */}
        <div style={{ flex: 1, position: 'relative', height: 260 }}>
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
            viewBox="0 0 200 260"
            preserveAspectRatio="none"
          >
            {rightTargets.map((target, i) => {
              const yPos = 50 + i * 80;
              const lineLen = 200 * lineProgress;
              return (
                <line
                  key={i}
                  x1={0}
                  y1={130}
                  x2={lineLen}
                  y2={yPos}
                  stroke={target.color}
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  opacity={0.7}
                />
              );
            })}
          </svg>
        </div>

        {/* Right column: Power BI targets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 240 }}>
          <div
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: 3,
              textTransform: 'uppercase',
              textAlign: 'center',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              marginBottom: 8,
            }}
          >
            Power BI / Fabric
          </div>
          {rightTargets.map((target, i) => {
            const localFrame = Math.max(0, frame - target.delay);
            const scale = spring({ frame: localFrame, fps, config: { damping: 11, stiffness: 140 } });
            const opacity = interpolate(localFrame, [0, 8], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={i}
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  backgroundColor: 'rgba(13, 34, 41, 0.9)',
                  border: `2px solid ${target.color}`,
                  borderRadius: 14,
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  boxShadow: `0 0 20px ${target.color}33`,
                }}
              >
                <span style={{ fontSize: 26 }}>{target.icon}</span>
                <span
                  style={{
                    color: target.color,
                    fontSize: 16,
                    fontWeight: 800,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {target.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* USB-C callout */}
      <div
        style={{
          transform: `translateY(${usbcY}px)`,
          opacity: usbcOpacity,
          marginTop: 30,
          backgroundColor: 'rgba(0, 210, 255, 0.1)',
          border: '1.5px solid #00D2FF',
          borderRadius: 50,
          padding: '12px 32px',
          boxShadow: '0 0 20px rgba(0, 210, 255, 0.25)',
        }}
      >
        <span
          style={{
            color: '#00D2FF',
            fontSize: 18,
            fontWeight: 800,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: 1,
          }}
        >
          🔌 MCP = USB-C للذكاء الاصطناعي — معيار موحّد لربط أي Agent بأي نظام
        </span>
      </div>

      {/* MCP Types cards */}
      <div
        style={{
          opacity: mcpTypesOpacity,
          marginTop: 20,
          display: 'flex',
          gap: 20,
        }}
      >
        {[
          { label: 'Remote MCP Server', desc: 'للتحليل والـ Insights مع RLS', color: '#00D2FF' },
          { label: 'Local MCP Server', desc: 'للبناء على ملفات .pbip', color: '#BFFF00' },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              backgroundColor: 'rgba(13, 34, 41, 0.85)',
              border: `1.5px solid ${item.color}66`,
              borderRadius: 12,
              padding: '12px 22px',
              borderLeft: `4px solid ${item.color}`,
            }}
          >
            <div style={{ color: item.color, fontSize: 15, fontWeight: 800, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {item.label}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600, fontFamily: 'system-ui, -apple-system, sans-serif', marginTop: 4 }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
