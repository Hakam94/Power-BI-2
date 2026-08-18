import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export type ZoomDirective = {
  startSec: number;
  endSec: number;
  scale: number;
  origin?: string;
  type?: 'hook_punch' | 'emphasis_zoom' | 'wide_reset' | 'slow_push';
};

interface DynamicOmniCameraProps {
  children: React.ReactNode;
  directives?: ZoomDirective[];
  defaultOrigin?: string;
  enableDynamicPunch?: boolean;
}

const DEFAULT_DIRECTIVES: ZoomDirective[] = [
  { startSec: 0.0, endSec: 3.2, scale: 1.25, origin: 'center 35%', type: 'hook_punch' },
  { startSec: 3.2, endSec: 6.5, scale: 1.12, origin: 'center 35%', type: 'slow_push' },
  { startSec: 6.5, endSec: 10.0, scale: 1.0, origin: 'center 35%', type: 'wide_reset' },
  { startSec: 10.0, endSec: 14.5, scale: 1.22, origin: 'center 35%', type: 'emphasis_zoom' },
  { startSec: 14.5, endSec: 19.0, scale: 1.0, origin: 'center 35%', type: 'wide_reset' },
  { startSec: 19.0, endSec: 24.0, scale: 1.20, origin: 'center 35%', type: 'emphasis_zoom' },
];

export const DynamicOmniCamera: React.FC<DynamicOmniCameraProps> = ({
  children,
  directives = DEFAULT_DIRECTIVES,
  defaultOrigin = 'center 35%',
  enableDynamicPunch = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;

  if (!enableDynamicPunch || directives.length === 0) {
    return <>{children}</>;
  }

  // Find active directive
  const activeDirective = directives.find(
    (d) => currentSec >= d.startSec && currentSec < d.endSec
  ) || {
    startSec: 0,
    endSec: 9999,
    scale: 1.0,
    origin: defaultOrigin,
    type: 'wide_reset',
  };

  const directiveStartFrame = Math.round(activeDirective.startSec * fps);
  const relativeFrame = Math.max(0, frame - directiveStartFrame);

  // Smooth spring zoom transition
  const animatedScale = spring({
    frame: relativeFrame,
    fps,
    config: {
      damping: activeDirective.type === 'hook_punch' ? 10 : 14,
      stiffness: activeDirective.type === 'hook_punch' ? 180 : 130,
      mass: 0.5,
    },
    from: 1.0,
    to: activeDirective.scale,
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        transform: `scale(${animatedScale})`,
        transformOrigin: activeDirective.origin || defaultOrigin,
        transition: 'transform-origin 0.3s ease-out',
      }}
    >
      {children}
    </div>
  );
};
