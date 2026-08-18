import React from 'react';
import { Sequence, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { Audio } from '@remotion/media';

interface HookAudioDesignProps {
  enableBgm?: boolean;
  enableSfx?: boolean;
  hookDurationFrames?: number;
}

export const HookAudioDesign: React.FC<HookAudioDesignProps> = ({
  enableBgm = true,
  enableSfx = true,
  hookDurationFrames = 600,
}) => {
  const frame = useCurrentFrame();

  // Background Music Volume Ducking: louder during first 15 frames (0.5s), subtle under speech
  const bgmVolume = interpolate(
    frame,
    [0, 15, 60, hookDurationFrames - 45, hookDurationFrames],
    [0.32, 0.15, 0.12, 0.14, 0.28],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <>
      {/* ══ 1. CYBER-TECH BACKGROUND MUSIC BED ══ */}
      {enableBgm && (
        <Audio
          src={staticFile('sfx/cyber_bgm.wav')}
          volume={bgmVolume}
          loop
        />
      )}

      {/* ══ 2. HOOK SOUND EFFECTS SYNCHRONIZATION ══ */}
      {enableSfx && (
        <>
          {/* Opening Air Whoosh (Frame 0 - 0.0s) */}
          <Sequence from={0} durationInFrames={20}>
            <Audio src={staticFile('sfx/whoosh.wav')} volume={0.45} />
          </Sequence>

          {/* Microsoft Build Badge Pop (Frame 9 - 0.3s) */}
          <Sequence from={9} durationInFrames={15}>
            <Audio src={staticFile('sfx/pop.wav')} volume={0.4} />
          </Sequence>

          {/* "IMAGINE THIS..." Deep Sub Bass Punch (Frame 15 - 0.5s) */}
          <Sequence from={15} durationInFrames={35}>
            <Audio src={staticFile('sfx/bass_impact.wav')} volume={0.7} />
          </Sequence>

          {/* Floating Prompt Card Pop (Frame 177 - 5.9s) */}
          <Sequence from={177} durationInFrames={15}>
            <Audio src={staticFile('sfx/pop.wav')} volume={0.45} />
          </Sequence>

          {/* Workflow Diagram Laser Pulse (Frame 249 - 8.3s) */}
          <Sequence from={249} durationInFrames={25}>
            <Audio src={staticFile('sfx/laser.wav')} volume={0.5} />
          </Sequence>

          {/* "0-Click Automation" Pop (Frame 399 - 13.3s) */}
          <Sequence from={399} durationInFrames={15}>
            <Audio src={staticFile('sfx/pop.wav')} volume={0.45} />
          </Sequence>
        </>
      )}
    </>
  );
};
