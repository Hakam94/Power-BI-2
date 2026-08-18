import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface KineticTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  delay?: number; // frames before animation starts
  staggerMs?: number; // ms between each character
  style?: React.CSSProperties;
  glowColor?: string;
  mode?: 'slide-up' | 'scale-pop' | 'typewriter' | 'blur-in';
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  fontSize = 64,
  color = '#FFFFFF',
  fontWeight = 900,
  delay = 0,
  staggerMs = 40,
  style = {},
  glowColor,
  mode = 'slide-up',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chars = text.split('');
  const staggerFrames = (staggerMs / 1000) * fps;

  return (
    <div
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        ...style,
      }}
    >
      {chars.map((char, i) => {
        const charDelay = delay + i * staggerFrames;
        const charFrame = Math.max(0, frame - charDelay);

        let opacity = 1;
        let transform = '';
        let filter = '';

        if (mode === 'slide-up') {
          const y = interpolate(charFrame, [0, 12], [40, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          opacity = interpolate(charFrame, [0, 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          transform = `translateY(${y}px)`;
        } else if (mode === 'scale-pop') {
          const scale = spring({
            frame: charFrame,
            fps,
            config: { damping: 10, stiffness: 150, mass: 0.4 },
          });
          opacity = interpolate(charFrame, [0, 5], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          transform = `scale(${scale})`;
        } else if (mode === 'typewriter') {
          opacity = charFrame > 0 ? 1 : 0;
          const cursorBlink = i === Math.floor(frame - delay) / staggerFrames
            ? interpolate(Math.sin(frame / 4), [-1, 1], [0.3, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 1;
          opacity *= cursorBlink;
        } else if (mode === 'blur-in') {
          const blurVal = interpolate(charFrame, [0, 15], [12, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          opacity = interpolate(charFrame, [0, 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          filter = `blur(${blurVal}px)`;
        }

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              fontSize,
              fontWeight,
              color,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              opacity,
              transform,
              filter: filter || undefined,
              textShadow: glowColor ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}66` : undefined,
              whiteSpace: char === ' ' ? 'pre' : 'normal',
              lineHeight: 1.15,
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
