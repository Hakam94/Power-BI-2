import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

interface Particle {
  angle: number;   // degrees
  speed: number;   // relative speed multiplier
  size: number;    // circle radius
  color: string;
  delay: number;   // frame delay before this particle starts
}

interface ParticleBurstProps {
  cx?: number;  // center X (px)
  cy?: number;  // center Y (px)
  count?: number;
  maxRadius?: number;
  colors?: string[];
  durationFrames?: number;
  startFrame?: number;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const ParticleBurst: React.FC<ParticleBurstProps> = ({
  cx = 960,
  cy = 540,
  count = 60,
  maxRadius = 700,
  colors = ['#BFFF00', '#00D2FF', '#FFFFFF', '#BFFF00', '#00D2FF'],
  durationFrames = 45,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const rand = seededRandom(42);

  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    angle: rand() * 360,
    speed: 0.5 + rand() * 0.8,
    size: 3 + rand() * 8,
    color: colors[Math.floor(rand() * colors.length)],
    delay: Math.floor(rand() * 8),
  }));

  if (localFrame < 0) return null;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
      viewBox="0 0 1920 1080"
    >
      {particles.map((p, i) => {
        const pFrame = Math.max(0, localFrame - p.delay);
        const progress = pFrame / durationFrames;

        const r = interpolate(pFrame, [0, durationFrames], [0, maxRadius * p.speed], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const opacity = interpolate(
          pFrame,
          [0, durationFrames * 0.2, durationFrames * 0.7, durationFrames],
          [0, 1, 0.7, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        const angleRad = (p.angle * Math.PI) / 180;
        const px = cx + Math.cos(angleRad) * r;
        const py = cy + Math.sin(angleRad) * r;

        // Size shrinks over time
        const size = interpolate(pFrame, [0, durationFrames], [p.size * 2, p.size * 0.5], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <circle
            key={i}
            cx={px}
            cy={py}
            r={size}
            fill={p.color}
            opacity={opacity}
            style={{ filter: `drop-shadow(0 0 ${size * 1.5}px ${p.color})` }}
          />
        );
      })}

      {/* Central shockwave ring */}
      {[0, 10, 20].map((ringDelay, ri) => {
        const rFrame = Math.max(0, localFrame - ringDelay);
        const ringR = interpolate(rFrame, [0, durationFrames], [0, maxRadius * 0.9], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const ringOpacity = interpolate(rFrame, [0, 5, durationFrames * 0.6, durationFrames], [0, 0.8, 0.3, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const strokeColor = ri % 2 === 0 ? '#BFFF00' : '#00D2FF';

        return (
          <circle
            key={`ring-${ri}`}
            cx={cx}
            cy={cy}
            r={ringR}
            fill="none"
            stroke={strokeColor}
            strokeWidth={2}
            opacity={ringOpacity}
          />
        );
      })}
    </svg>
  );
};
