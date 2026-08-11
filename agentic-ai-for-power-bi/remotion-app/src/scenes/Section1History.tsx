import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export const Section1History: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14 } });
  const highlight = interpolate(frame, [0, 90], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `scale(${scale})`, backgroundColor: 'rgba(13, 34, 41, 0.92)', border: '2px solid #00D2FF', borderRadius: 24, padding: '40px 60px', width: 1500, boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
        <div style={{ color: '#00D2FF', fontSize: 18, fontWeight: 900, letterSpacing: 2, marginBottom: 10 }}>SECTION 01 • HISTORICAL PARADIGM SHIFT</div>
        <h2 style={{ color: '#FFFFFF', fontSize: 44, fontWeight: 900, margin: 0 }}>The 3 Eras of Business Intelligence</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 30, marginTop: 35 }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: 25, borderRadius: 16, borderLeft: '4px solid #88AABB' }}>
            <span style={{ color: '#88AABB', fontSize: 14, fontWeight: 800 }}>ERA 1 (+20 YEARS)</span>
            <h3 style={{ color: '#FFFFFF', fontSize: 24, margin: '8px 0' }}>Dashboard Era</h3>
            <p style={{ color: '#88AABB', fontSize: 16, margin: 0 }}>Static reporting. You ask, dashboard answers.</p>
          </div>
          
          <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: 25, borderRadius: 16, borderLeft: '4px solid #00D2FF' }}>
            <span style={{ color: '#00D2FF', fontSize: 14, fontWeight: 800 }}>ERA 2 (2022-2025)</span>
            <h3 style={{ color: '#FFFFFF', fontSize: 24, margin: '8px 0' }}>Copilot Era</h3>
            <p style={{ color: '#00D2FF', fontSize: 16, margin: 0 }}>AI Assistant. Natural language Q&A, human executes.</p>
          </div>
          
          <div style={{ backgroundColor: 'rgba(191,255,0,0.1)', padding: 25, borderRadius: 16, borderLeft: '4px solid #BFFF00', boxShadow: '0 0 20px rgba(191,255,0,0.2)' }}>
            <span style={{ color: '#BFFF00', fontSize: 14, fontWeight: 800 }}>ERA 3 (2026+)</span>
            <h3 style={{ color: '#BFFF00', fontSize: 24, margin: '8px 0' }}>Agentic AI Era</h3>
            <p style={{ color: '#FFFFFF', fontSize: 16, margin: 0 }}>Autonomous Agent. Plans, executes & builds workflows.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
