import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export type PowerBIRealChartProps = {
  title?: string;
  subtitle?: string;
  delay?: number;
};

export const PowerBIRealChart: React.FC<PowerBIRealChartProps> = ({
  title = "Power BI — AI Sales Analytics",
  subtitle = "Generated via Agentic AI Prompt in 1.4 seconds",
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delay);

  // Entrance spring animation
  const containerSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Animated bar growth values
  const bar1Width = interpolate(localFrame, [10, 40], [0, 85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2Width = interpolate(localFrame, [15, 45], [0, 68], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3Width = interpolate(localFrame, [20, 50], [0, 92], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // KPI counter interpolation
  const kpiValue = Math.round(interpolate(localFrame, [5, 45], [0, 2450800], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        scale: containerSpring,
        transformOrigin: 'top left',
        opacity: containerSpring,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 30,
        borderRadius: 24,
        background: 'linear-gradient(145deg, rgba(13, 34, 41, 0.95) 0%, rgba(13, 34, 41, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 210, 255, 0.4)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 210, 255, 0.15)',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* ══ HEADER: Power BI Visual Title ══ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Power BI Icon Badge */}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #F2C811 0%, #E2A000 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: 14,
                color: '#000000',
              }}
            >
              PBI
            </div>
            <h3
              style={{
                margin: 0,
                fontFamily: 'Outfit, system-ui, sans-serif',
                fontSize: 22,
                fontWeight: 800,
                color: '#FFFFFF',
              }}
            >
              {title}
            </h3>
          </div>
          <p style={{ margin: '4px 0 0 38px', fontSize: 13, color: '#00D2FF', fontWeight: 600 }}>
            {subtitle}
          </p>
        </div>

        {/* Live Status Tag */}
        <div
          style={{
            padding: '6px 14px',
            borderRadius: 20,
            background: 'rgba(191, 255, 0, 0.15)',
            border: '1px solid rgba(191, 255, 0, 0.5)',
            color: '#BFFF00',
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#BFFF00', boxShadow: '0 0 8px #BFFF00' }} />
          LIVE DAX MODEL
        </div>
      </div>

      {/* ══ TOP ROW: KPI CARDS ══ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {/* KPI 1: Revenue */}
        <div
          style={{
            padding: 16,
            borderRadius: 16,
            background: 'rgba(0, 210, 255, 0.08)',
            border: '1px solid rgba(0, 210, 255, 0.3)',
          }}
        >
          <span style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600, textTransform: 'uppercase' }}>
            Total Revenue
          </span>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: '#00D2FF', marginTop: 4 }}>
            ${kpiValue.toLocaleString()}
          </div>
          <span style={{ fontSize: 11, color: '#BFFF00', fontWeight: 700 }}>+18.4% vs last quarter</span>
        </div>

        {/* KPI 2: AI Accuracy */}
        <div
          style={{
            padding: 16,
            borderRadius: 16,
            background: 'rgba(191, 255, 0, 0.08)',
            border: '1px solid rgba(191, 255, 0, 0.3)',
          }}
        >
          <span style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600, textTransform: 'uppercase' }}>
            Model Precision
          </span>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: '#BFFF00', marginTop: 4 }}>
            99.8%
          </div>
          <span style={{ fontSize: 11, color: '#00D2FF', fontWeight: 700 }}>Agentic AI Validated</span>
        </div>

        {/* KPI 3: Build Speed */}
        <div
          style={{
            padding: 16,
            borderRadius: 16,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <span style={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.7)', fontWeight: 600, textTransform: 'uppercase' }}>
            Time Saved
          </span>
          <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: '#FFFFFF', marginTop: 4 }}>
            14.2 Hours
          </div>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Automated DAX & ETL</span>
        </div>
      </div>

      {/* ══ MAIN BAR CHART VISUAL ══ */}
      <div
        style={{
          flex: 1,
          padding: 20,
          borderRadius: 16,
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <span style={{ fontSize: 13, color: '#FFFFFF', fontWeight: 700, marginBottom: 8 }}>
          Revenue Distribution by Product Region ($M)
        </span>

        {/* Bar Item 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
            <span>North America (Enterprise AI)</span>
            <span style={{ color: '#00D2FF', fontWeight: 700 }}>$1,240,000</span>
          </div>
          <div style={{ width: '100%', height: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6, overflow: 'hidden' }}>
            <div
              style={{
                width: `${bar1Width}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00D2FF 0%, #0080FF 100%)',
                borderRadius: 6,
                boxShadow: '0 0 12px rgba(0, 210, 255, 0.6)',
              }}
            />
          </div>
        </div>

        {/* Bar Item 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
            <span>Europe (Fabric Apps)</span>
            <span style={{ color: '#BFFF00', fontWeight: 700 }}>$920,000</span>
          </div>
          <div style={{ width: '100%', height: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6, overflow: 'hidden' }}>
            <div
              style={{
                width: `${bar2Width}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #BFFF00 0%, #80FF00 100%)',
                borderRadius: 6,
                boxShadow: '0 0 12px rgba(191, 255, 0, 0.6)',
              }}
            />
          </div>
        </div>

        {/* Bar Item 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
            <span>Asia Pacific (MCP Agents)</span>
            <span style={{ color: '#00D2FF', fontWeight: 700 }}>$1,480,000</span>
          </div>
          <div style={{ width: '100%', height: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6, overflow: 'hidden' }}>
            <div
              style={{
                width: `${bar3Width}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00D2FF 0%, #BFFF00 100%)',
                borderRadius: 6,
                boxShadow: '0 0 12px rgba(0, 210, 255, 0.6)',
              }}
            />
          </div>
        </div>
      </div>

      {/* ══ DAX CODE SNIPPET BOX ══ */}
      <div
        style={{
          padding: 12,
          borderRadius: 12,
          backgroundColor: '#09151A',
          border: '1px solid rgba(0, 210, 255, 0.3)',
          fontFamily: 'Fira Code, monospace',
          fontSize: 12,
          color: '#BFFF00',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ color: '#00D2FF', fontWeight: 800 }}>DAX</span>
        <span>TOTAL_REVENUE = CALCULATE(SUM(Sales[Amount]), ALL(Calendar))</span>
      </div>
    </div>
  );
};
