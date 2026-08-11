import React from 'react';
import { Sequence } from 'remotion';
import { CyberBackground } from './components/CyberBackground';
import { BrandBadge } from './components/BrandBadge';
import { IntroScene } from './scenes/IntroScene';
import { CapabilitiesScene } from './scenes/CapabilitiesScene';
import { ImpactScene } from './scenes/ImpactScene';
import { OutroScene } from './scenes/OutroScene';

export const MainVideo: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: 1920, height: 1080 }}>
      {/* Background layer */}
      <CyberBackground />

      {/* Persistent Brand Badge Overlay */}
      <BrandBadge />

      {/* Scene 1: Intro (0 - 4s / frames 0 - 120) */}
      <Sequence from={0} durationInFrames={120}>
        <IntroScene />
      </Sequence>

      {/* Scene 2: 3 Major Capabilities (4 - 12s / frames 120 - 360) */}
      <Sequence from={120} durationInFrames={240}>
        <CapabilitiesScene />
      </Sequence>

      {/* Scene 3: Impact & Stat (12 - 16s / frames 360 - 480) */}
      <Sequence from={360} durationInFrames={120}>
        <ImpactScene />
      </Sequence>

      {/* Scene 4: Outro & Call to Action (16 - 20s / frames 480 - 600) */}
      <Sequence from={480} durationInFrames={120}>
        <OutroScene />
      </Sequence>
    </div>
  );
};
