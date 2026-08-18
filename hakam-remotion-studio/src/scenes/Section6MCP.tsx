import React from 'react';
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const Section6MCP: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14 } });

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `scale(${scale})`, backgroundColor: 'rgba(13, 34, 41, 0.94)', border: '2px solid #BFFF00', borderRadius: 24, padding: '40px 60px', width: 1550, boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(191,255,0,0.2)' }}>
        <div style={{ color: '#BFFF00', fontSize: 18, fontWeight: 900, letterSpacing: 2, marginBottom: 10 }}>SECTION 06 • PROTOCOL ARCHITECTURE</div>
        <h2 style={{ color: '#FFFFFF', fontSize: 44, fontWeight: 900, margin: 0 }}>Model Context Protocol (MCP) Servers</h2>
        <p style={{ color: '#00D2FF', fontSize: 22, fontWeight: 700, margin: '8px 0 30px 0' }}>🔌 Universal AI-to-System Protocol — Like USB-C for AI Agents</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
          <div style={{ backgroundColor: 'rgba(0, 210, 255, 0.08)', padding: 30, borderRadius: 18, border: '1px solid #00D2FF' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>☁️</div>
            <h3 style={{ color: '#00D2FF', fontSize: 26, margin: 0 }}>Remote Power BI MCP Server</h3>
            <p style={{ color: '#FFFFFF', fontSize: 16, marginTop: 12 }}>Queries published Fabric Semantic Models remotely, generates DAX on the fly & respects Row-Level Security (RLS).</p>
          </div>
          
          <div style={{ backgroundColor: 'rgba(191, 255, 0, 0.08)', padding: 30, borderRadius: 18, border: '1px solid #BFFF00' }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>💻</div>
            <h3 style={{ color: '#BFFF00', fontSize: 26, margin: 0 }}>Local Power BI Modeling MCP Server</h3>
            <p style={{ color: '#FFFFFF', fontSize: 16, marginTop: 12 }}>Executes bulk edits directly on local .pbip projects, creates DAX measures, renames columns & connects to VS Code or Claude Desktop.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
