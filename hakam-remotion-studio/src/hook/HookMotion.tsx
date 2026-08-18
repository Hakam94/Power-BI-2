import { interpolate, spring } from 'remotion';

export function getHookCameraTransform(frame: number, fps: number = 30): { scale: number; x: number; y: number } {
  // Camera punch-in spring physics at key retention moments
  const punch1Progress = spring({
    frame: Math.max(0, frame - 249), // At 8.3s (Flow Diagram)
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const punch2Progress = spring({
    frame: Math.max(0, frame - 399), // At 13.3s ("No Mouse")
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  const punch1Scale = interpolate(punch1Progress, [0, 1], [1.0, 1.04], { extrapolateRight: 'clamp' });
  const punch2Scale = interpolate(punch2Progress, [0, 1], [0, 0.03], { extrapolateRight: 'clamp' });

  const totalScale = frame < 450 ? punch1Scale + punch2Scale : interpolate(frame, [450, 480], [1.07, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return {
    scale: totalScale,
    x: 0,
    y: 0,
  };
}
