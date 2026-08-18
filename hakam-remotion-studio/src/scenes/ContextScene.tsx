import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

/**
 * ContextScene — 0:45 to 2:00 (Historical timeline)
 *
 * Animates the evolution: Dashboard → Copilot → Agent
 * Each node pops in sequentially with connecting animated lines.
 */
export const ContextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nodes = [
    {
      era: '20+ Years',
      title: 'Passive Dashboard',
      subtitle: 'You ask, the chart answers',
      icon: '📊',
      color: 'rgba(255,255,255,0.4)',
      accentColor: 'rgba(255,255,255,0.5)',
      delay: 0,
    },
    {
      era: '2023–2025',
      title: 'Copilot AI',
      subtitle: 'Type a question, get an answer',
      icon: '🤖',
      color: '#00D2FF',
      accentColor: '#00D2FF',
      delay: Math.round(1.5 * fps),
    },
    {
      era: '2026 → NOW',
      title: 'Agentic AI',
      subtitle: 'Set a goal. Agent delivers results.',
      icon: '⚡',
      color: '#BFFF00',
      accentColor: '#BFFF00',
      delay: Math.round(3 * fps),
    },
  ];

  // Header fade in
  const headerOpacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headerY = interpolate(frame, [0, 0.6 * fps], [-30, 0], {
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
        padding: 80,
      }}
    >
      {/* Header */}
      <div
        style={{
          transform: `translateY(${headerY}px)`,
          opacity: headerOpacity,
          marginBottom: 70,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: '#00D2FF',
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: 4,
            textTransform: 'uppercase',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            marginBottom: 10,
          }}
        >
          السياق التاريخي
        </div>
        <h2
          style={{
            color: '#FFFFFF',
            fontSize: 52,
            fontWeight: 900,
            margin: 0,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          التطور نحو <span style={{ color: '#BFFF00' }}>Agentic AI</span>
        </h2>
      </div>

      {/* Timeline */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          width: '100%',
          maxWidth: 1500,
          justifyContent: 'center',
        }}
      >
        {nodes.map((node, idx) => {
          const localFrame = Math.max(0, frame - node.delay);
          const nodeScale = spring({
            frame: localFrame,
            fps,
            config: { damping: 12, stiffness: 120 },
          });
          const nodeOpacity = interpolate(localFrame, [0, 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          // Connector arrow between nodes
          const arrowDelay = node.delay + Math.round(0.5 * fps);
          const arrowLocalFrame = Math.max(0, frame - arrowDelay);
          const arrowWidth = interpolate(arrowLocalFrame, [0, 20], [0, 100], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const arrowOpacity = interpolate(arrowLocalFrame, [0, 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const isLast = idx === nodes.length - 1;
          const isActive = idx === nodes.length - 1; // Last = "NOW"

          return (
            <React.Fragment key={idx}>
              {/* Node card */}
              <div
                style={{
                  transform: `scale(${nodeScale})`,
                  opacity: nodeOpacity,
                  backgroundColor: isActive
                    ? 'rgba(13, 34, 41, 0.95)'
                    : 'rgba(13, 34, 41, 0.7)',
                  border: `2px solid ${node.accentColor}`,
                  borderRadius: 22,
                  padding: isActive ? '36px 40px' : '28px 36px',
                  width: isActive ? 380 : 320,
                  boxShadow: isActive
                    ? `0 20px 60px rgba(0,0,0,0.7), 0 0 40px ${node.accentColor}44`
                    : `0 10px 30px rgba(0,0,0,0.4)`,
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                {/* Era badge */}
                <div
                  style={{
                    color: node.accentColor,
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    marginBottom: 12,
                    padding: '4px 10px',
                    backgroundColor: `${node.accentColor}18`,
                    borderRadius: 20,
                    display: 'inline-block',
                    border: `1px solid ${node.accentColor}44`,
                  }}
                >
                  {node.era}
                </div>

                {/* Icon */}
                <div style={{ fontSize: isActive ? 52 : 44, marginBottom: 12 }}>
                  {node.icon}
                </div>

                {/* Title */}
                <div
                  style={{
                    color: node.color,
                    fontSize: isActive ? 28 : 22,
                    fontWeight: 900,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    lineHeight: 1.2,
                    marginBottom: 8,
                  }}
                >
                  {node.title}
                </div>

                {/* Subtitle */}
                <div
                  style={{
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: isActive ? 17 : 14,
                    fontWeight: 600,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {node.subtitle}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -14,
                      right: 20,
                      backgroundColor: '#BFFF00',
                      color: '#0D2229',
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: 2,
                      padding: '4px 14px',
                      borderRadius: 20,
                      textTransform: 'uppercase',
                    }}
                  >
                    الآن ◆
                  </div>
                )}
              </div>

              {/* Arrow connector */}
              {!isLast && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    opacity: arrowOpacity,
                    flexShrink: 0,
                    margin: '0 10px',
                  }}
                >
                  {/* Line */}
                  <div
                    style={{
                      width: arrowWidth,
                      height: 3,
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.3), #00D2FF)',
                      boxShadow: '0 0 8px rgba(0, 210, 255, 0.5)',
                      borderRadius: 2,
                    }}
                  />
                  {/* Arrow head */}
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      borderLeft: '12px solid #00D2FF',
                      filter: 'drop-shadow(0 0 6px #00D2FF)',
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom quote */}
      {frame >= 4 * fps && (
        <div
          style={{
            marginTop: 50,
            opacity: interpolate(frame, [4 * fps, 5 * fps], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            color: 'rgba(255,255,255,0.55)',
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 1,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
          }}
        >
          الفرق؟ الـ Agent يخطط، يفكر، ينفذ — ويرجعلك بالنتيجة جاهزة
        </div>
      )}
    </div>
  );
};
