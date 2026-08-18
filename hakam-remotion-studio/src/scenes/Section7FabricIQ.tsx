import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const Section7FabricIQ: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14 } });

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `scale(${scale})`, backgroundColor: 'rgba(13, 34, 41, 0.94)', border: '2px solid #00D2FF', borderRadius: 24, padding: '40px 60px', width: 1500, boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
        <div style={{ color: '#00D2FF', fontSize: 18, fontWeight: 900, letterSpacing: 2, marginBottom: 10 }}>SECTION 07 • SEMANTIC INTELLIGENCE LAYER</div>
        <h2 style={{ color: '#FFFFFF', fontSize: 44, fontWeight: 900, margin: 0 }}>Fabric IQ & The Microsoft IQ Ecosystem</h2>
        <p style={{ color: '#BFFF00', fontSize: 20, fontWeight: 700, margin: '8px 0 30px 0' }}>🧠 Shared Business Context — All Agents Work Off The Same Truth</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: 25, borderRadius: 16, borderTop: '4px solid #00D2FF' }}>
            <span style={{ color: '#00D2FF', fontSize: 14, fontWeight: 800 }}>WORK IQ</span>
            <h3 style={{ color: '#FFFFFF', fontSize: 22, margin: '8px 0' }}>Microsoft 365 Context</h3>
            <p style={{ color: '#88AABB', fontSize: 15, margin: 0 }}>Emails, Teams meetings, documents & workflow signals.</p>
          </div>
          
          <div style={{ backgroundColor: 'rgba(191,255,0,0.1)', padding: 25, borderRadius: 16, borderTop: '4px solid #BFFF00', boxShadow: '0 0 20px rgba(191,255,0,0.2)' }}>
            <span style={{ color: '#BFFF00', fontSize: 14, fontWeight: 800 }}>FABRIC IQ</span>
            <h3 style={{ color: '#BFFF00', fontSize: 22, margin: '8px 0' }}>Data & Business Logic</h3>
            <p style={{ color: '#FFFFFF', fontSize: 15, margin: 0 }}>Semantic Models, DAX Metrics, OneLake & Enterprise Definitions.</p>
          </div>
          
          <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', padding: 25, borderRadius: 16, borderTop: '4px solid #00D2FF' }}>
            <span style={{ color: '#00D2FF', fontSize: 14, fontWeight: 800 }}>FOUNDRY IQ</span>
            <h3 style={{ color: '#FFFFFF', fontSize: 22, margin: '8px 0' }}>Knowledge & Policies</h3>
            <p style={{ color: '#88AABB', fontSize: 15, margin: 0 }}>Institutional policies, compliance rules & Azure AI Foundry docs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
