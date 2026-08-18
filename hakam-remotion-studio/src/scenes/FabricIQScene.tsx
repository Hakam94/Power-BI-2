import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

/**
 * FabricIQScene — 7:00 to 8:15 (Fabric IQ ecosystem diagram)
 *
 * Shows the Microsoft IQ ecosystem:
 * - Work IQ (M365 context)
 * - Fabric IQ (data & metrics context) ← CENTRAL
 * - Foundry IQ (enterprise knowledge)
 * All connected to a central "Agent Intelligence" hub.
 */
export const FabricIQScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const centralDelay = Math.round(0.8 * fps);
  const centralLocalFrame = Math.max(0, frame - centralDelay);
  const centralScale = spring({
    frame: centralLocalFrame,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.6 },
  });
  const centralOpacity = interpolate(centralLocalFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const centralPulse = interpolate(
    Math.sin(frame / 22),
    [-1, 1],
    [0.96, 1.04],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const iqNodes = [
    {
      id: 'work',
      label: 'Work IQ',
      icon: '💼',
      subtitle: 'Microsoft 365 Context\nEmails · Meetings · Docs',
      color: '#00D2FF',
      angle: 210, // degrees from center
      delay: Math.round(1.5 * fps),
    },
    {
      id: 'fabric',
      label: 'Fabric IQ',
      icon: '🧠',
      subtitle: 'Data & Business Metrics\nSemantic Layer · KPIs · Definitions',
      color: '#BFFF00',
      angle: 330,
      delay: Math.round(2.0 * fps),
    },
    {
      id: 'foundry',
      label: 'Foundry IQ',
      icon: '📚',
      subtitle: 'Enterprise Knowledge\nDocumented · Governed',
      color: '#00D2FF',
      angle: 90,
      delay: Math.round(2.5 * fps),
    },
  ];

  const orbitRadius = 260;
  const centerX = 960;
  const centerY = 420;

  const lineProgress = interpolate(frame, [3 * fps, 4 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bottomCardDelay = Math.round(5 * fps);
  const bottomCardLocalFrame = Math.max(0, frame - bottomCardDelay);
  const bottomCardOpacity = interpolate(bottomCardLocalFrame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bottomCardY = interpolate(bottomCardLocalFrame, [0, 20], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        width: 1920,
        height: 1080,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          position: 'absolute',
          top: 60,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: '#BFFF00',
            fontSize: 13,
            fontWeight: 900,
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            marginBottom: 8,
          }}
        >
          🧠 طبقة الذكاء الدلالي
        </div>
        <h2
          style={{
            color: '#FFFFFF',
            fontSize: 44,
            fontWeight: 900,
            margin: 0,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <span style={{ color: '#BFFF00' }}>Fabric IQ</span> — دماغ الـ Agents في المؤسسة
        </h2>
      </div>

      {/* Connection lines SVG */}
      <svg
        style={{ position: 'absolute', inset: 0, width: 1920, height: 1080, pointerEvents: 'none' }}
        viewBox="0 0 1920 1080"
      >
        {iqNodes.map((node) => {
          const angleRad = (node.angle * Math.PI) / 180;
          const nx = centerX + Math.cos(angleRad) * orbitRadius;
          const ny = centerY + Math.sin(angleRad) * orbitRadius;

          // Animated line from center to node
          const lx = centerX + Math.cos(angleRad) * orbitRadius * lineProgress;
          const ly = centerY + Math.sin(angleRad) * orbitRadius * lineProgress;

          return (
            <g key={node.id}>
              <line
                x1={centerX}
                y1={centerY}
                x2={lx}
                y2={ly}
                stroke={node.color}
                strokeWidth={2}
                opacity={0.5}
                strokeDasharray="8 4"
              />
              {/* Glowing dot traveling along the line */}
              <circle
                cx={lx}
                cy={ly}
                r={4}
                fill={node.color}
                opacity={lineProgress > 0.1 ? 0.9 : 0}
                style={{ filter: `drop-shadow(0 0 6px ${node.color})` }}
              />
            </g>
          );
        })}

        {/* Orbit ring */}
        <circle
          cx={centerX}
          cy={centerY}
          r={orbitRadius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1.5}
          strokeDasharray="12 8"
        />
      </svg>

      {/* Central Hub: Agent Intelligence */}
      <div
        style={{
          position: 'absolute',
          left: centerX - 100,
          top: centerY - 100,
          width: 200,
          height: 200,
          transform: `scale(${centralScale * centralPulse})`,
          opacity: centralOpacity,
          borderRadius: '50%',
          backgroundColor: 'rgba(13, 34, 41, 0.97)',
          border: '3px solid #BFFF00',
          boxShadow: '0 0 60px rgba(191, 255, 0, 0.5), 0 0 120px rgba(191, 255, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 40 }}>⚡</span>
        <div
          style={{
            color: '#BFFF00',
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: 1.5,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          Agent
          <br />
          Intelligence
        </div>
      </div>

      {/* Orbital IQ Nodes */}
      {iqNodes.map((node) => {
        const localFrame = Math.max(0, frame - node.delay);
        const nodeScale = spring({ frame: localFrame, fps, config: { damping: 12, stiffness: 120 } });
        const nodeOpacity = interpolate(localFrame, [0, 10], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const angleRad = (node.angle * Math.PI) / 180;
        const nx = centerX + Math.cos(angleRad) * orbitRadius;
        const ny = centerY + Math.sin(angleRad) * orbitRadius;

        const isFabricIQ = node.id === 'fabric';

        return (
          <div
            key={node.id}
            style={{
              position: 'absolute',
              left: nx - (isFabricIQ ? 140 : 130),
              top: ny - (isFabricIQ ? 90 : 80),
              width: isFabricIQ ? 280 : 260,
              transform: `scale(${nodeScale})`,
              opacity: nodeOpacity,
              backgroundColor: isFabricIQ ? 'rgba(13, 34, 41, 0.97)' : 'rgba(13, 34, 41, 0.85)',
              border: `2px solid ${node.color}`,
              borderRadius: 20,
              padding: '20px 24px',
              boxShadow: isFabricIQ
                ? `0 20px 50px rgba(0,0,0,0.7), 0 0 35px ${node.color}55`
                : `0 10px 30px rgba(0,0,0,0.5)`,
            }}
          >
            {isFabricIQ && (
              <div
                style={{
                  position: 'absolute',
                  top: -14,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#BFFF00',
                  color: '#0D2229',
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: 2,
                  padding: '4px 14px',
                  borderRadius: 20,
                  textTransform: 'uppercase',
                }}
              >
                المحوري ◆
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: isFabricIQ ? 30 : 26 }}>{node.icon}</span>
              <span
                style={{
                  color: node.color,
                  fontSize: isFabricIQ ? 20 : 17,
                  fontWeight: 900,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {node.label}
              </span>
            </div>

            {node.subtitle.split('\n').map((line, li) => (
              <div
                key={li}
                style={{
                  color: li === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)',
                  fontSize: li === 0 ? 14 : 12,
                  fontWeight: li === 0 ? 700 : 600,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: li === 1 ? 0.5 : 0,
                }}
              >
                {line}
              </div>
            ))}
          </div>
        );
      })}

      {/* Bottom result card */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
          left: '50%',
          transform: `translateX(-50%) translateY(${bottomCardY}px)`,
          opacity: bottomCardOpacity,
          backgroundColor: 'rgba(13, 34, 41, 0.92)',
          border: '2px solid #BFFF00',
          borderRadius: 60,
          padding: '16px 40px',
          boxShadow: '0 0 30px rgba(191, 255, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: 22 }}>✅</span>
        <span
          style={{
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: 800,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Fabric IQ يحوّل الـ Semantic Model من ملف Power BI إلى{' '}
          <span style={{ color: '#BFFF00' }}>Infrastructure استراتيجي</span> لكل الـ AI Agents
        </span>
      </div>
    </div>
  );
};
