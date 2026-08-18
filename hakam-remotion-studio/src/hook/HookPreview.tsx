import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Video } from '@remotion/media';
import { CyberBackground } from '../components/CyberBackground';
import { BrandBadge } from '../components/BrandBadge';
import { HookScene } from './HookScene';
import { DualCaptions } from '../captions/DualCaptions';
import { getSourceFrameForOutputFrame } from '../editing/masterTimeline';
import { getHookCameraTransform } from './HookMotion';
import { SpeakerSafeZone } from '../components/SpeakerSafeZone';

export const HookPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sourceTrimBefore = getSourceFrameForOutputFrame(0, fps);
  const camera = getHookCameraTransform(frame, fps);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0D2229' }}>
      {/* Layer 1: Background Grid */}
      <CyberBackground />

      {/* Layer 2: ORIGINAL HAKAM CAMERA FOOTAGE (Preserved 100% Unaltered) */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${camera.scale}) translate(${camera.x}px, ${camera.y}px)`,
          transformOrigin: '75% 50%', // Anchor camera zoom towards speaker
        }}
      >
        <Video
          src={staticFile('DHBP6661.MP4')}
          trimBefore={sourceTrimBefore}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Layer 3: Speaker Safe Zone & Left Column Motion Overlays */}
      <SpeakerSafeZone>
        <HookScene />
      </SpeakerSafeZone>

      {/* Layer 4: Brand Badge HUD (Top-Right) */}
      <BrandBadge />

      {/* Layer 5: Canonical Dual-Language Captions (Bottom-Center) */}
      <DualCaptions />
    </AbsoluteFill>
  );
};
