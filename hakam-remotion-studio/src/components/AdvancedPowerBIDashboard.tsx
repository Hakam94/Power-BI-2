import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface AdvancedPowerBIDashboardProps {
  delay?: number;
}

export const AdvancedPowerBIDashboard: React.FC<AdvancedPowerBIDashboardProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = Math.max(0, frame - delay);

  const enterScale = spring({
    frame: local,
    fps,
    config: { damping: 14, stiffness: 140 },
    from: 0.9,
    to: 1.0,
  });

  const enterOpacity = interpolate(local, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // Animated KPI numbers
  const revValue = Math.round(interpolate(local, [5, 40], [0, 2450800], { extrapolateRight: 'clamp' }));
  const ordersValue = Math.round(interpolate(local, [5, 40], [0, 48210], { extrapolateRight: 'clamp' }));
  const daxSpeed = interpolate(local, [10, 35], [0, 1.4], { extrapolateRight: 'clamp' }).toFixed(1);

  // Animated bar heights
  const bar1 = interpolate(spring({ frame: Math.max(0, local - 10), fps, config: { damping: 12 } }), [0, 1], [0, 100]);
  const bar2 = interpolate(spring({ frame: Math.max(0, local - 15), fps, config: { damping: 12 } }), [0, 1], [0, 78]);
  const bar3 = interpolate(spring({ frame: Math.max(0, local - 20), fps, config: { damping: 12 } }), [0, 1], [0, 125]);
  const bar4 = interpolate(spring({ frame: Math.max(0, local - 25), fps, config: { damping: 12 } }), [0, 1], [0, 92]);

  return (
    <div
      style={{
        width: '100%',
        borderRadius: 24,
        background: 'linear-gradient(145deg, rgba(13, 34, 41, 0.96) 0%, rgba(9, 22, 27, 0.98) 100%)',
        border: '2px solid rgba(0, 210, 255, 0.65)',
        boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(0, 210, 255, 0.25)',
        backdropFilter: 'blur(20px)',
        padding: '24px 28px',
        opacity: enterOpacity,
        transform: `scale(${enterScale})`,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* ── TOP HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid rgba(0,210,255,0.2)', paddingBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #F2C811 0%, #E2A000 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 16,
              color: '#000000',
              boxShadow: '0 0 15px rgba(242,200,17,0.4)',
            }}
          >
            PBI
          </div>
          <div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
              Power BI — AI Sales Analytics
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#00D2FF', fontWeight: 600 }}>
              Part 6: Microsoft Fabric & Agentic Semantic Model
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(191,255,0,0.12)', border: '1px solid #BFFF00', padding: '6px 12px', borderRadius: 20 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#BFFF00', boxShadow: '0 0 8px #BFFF00' }} />
          <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 800, color: '#BFFF00' }}>
            AGENT ACTIVE
          </span>
        </div>
      </div>

      {/* ── KPI METRICS CARDS ROW ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {/* KPI 1 */}
        <div style={{ background: 'rgba(13,34,41,0.85)', border: '1px solid rgba(0,210,255,0.3)', borderRadius: 16, padding: '12px 16px' }}>
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>TOTAL REVENUE</span>
          <div style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 900, color: '#00D2FF', marginTop: 4 }}>
            ${revValue.toLocaleString()}
          </div>
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#BFFF00', fontWeight: 700 }}>↑ +24.8% YoY</span>
        </div>

        {/* KPI 2 */}
        <div style={{ background: 'rgba(13,34,41,0.85)', border: '1px solid rgba(191,255,0,0.3)', borderRadius: 16, padding: '12px 16px' }}>
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>TRANSACTIONS</span>
          <div style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 900, color: '#BFFF00', marginTop: 4 }}>
            {ordersValue.toLocaleString()}
          </div>
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#00D2FF', fontWeight: 700 }}>100% Real-Time</span>
        </div>

        {/* KPI 3 */}
        <div style={{ background: 'rgba(13,34,41,0.85)', border: '1px solid rgba(242,200,17,0.3)', borderRadius: 16, padding: '12px 16px' }}>
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>AI DAX GEN TIME</span>
          <div style={{ fontFamily: 'Outfit', fontSize: 24, fontWeight: 900, color: '#F2C811', marginTop: 4 }}>
            {daxSpeed}s
          </div>
          <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#FFFFFF', fontWeight: 700 }}>0-Click Prompt</span>
        </div>
      </div>

      {/* ── LIVE INTERACTIVE BAR CHART BREAKDOWN ── */}
      <div style={{ background: 'rgba(7,18,22,0.9)', borderRadius: 18, padding: '16px 20px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 700, color: '#FFFFFF' }}>Product Category Performance (Sales vs Target)</span>
          <span style={{ fontFamily: 'Courier New', fontSize: 12, color: '#00D2FF' }}>DAX: SUMX(Sales, [Qty]*[Price])</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 135, borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 6 }}>
          {[
            { label: 'Espresso', val: bar1, color: '#00D2FF' },
            { label: 'Cold Brew', val: bar2, color: '#00D2FF' },
            { label: 'Bakery', val: bar3, color: '#BFFF00' },
            { label: 'Beans', val: bar4, color: '#F2C811' },
          ].map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 70 }}>
              <div
                style={{
                  width: 44,
                  height: item.val,
                  borderRadius: '6px 6px 0 0',
                  background: `linear-gradient(to top, rgba(13,34,41,0.8), ${item.color})`,
                  boxShadow: `0 0 16px ${item.color}88`,
                }}
              />
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 6, fontWeight: 600 }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
