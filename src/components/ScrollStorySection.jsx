import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Database, 
  Zap, 
  Calculator, 
  BarChart3, 
  Bot, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Sparkles
} from 'lucide-react';

export default function ScrollStorySection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'excel',
      title: 'Excel',
      subtitle: 'Raw Data & Messy Spreadsheets',
      icon: FileSpreadsheet,
      color: '#107C41',
      badge: 'Step 1: Ingestion',
      code: `// Raw Excel Sheets
Sales_2025_Final_v2_FINAL.xlsx
- VLOOKUP errors everywhere
- Unformatted dates & null values
- File size exploding at 100MB`,
      description: 'Everything begins with unorganized Excel sheets. Manual copy-pasting, broken formulas, and version chaos stall business growth.',
      demoOutput: {
        type: 'excel',
        rows: [
          { col1: '2025-01-05', col2: '#N/A', col3: '$12,400', status: 'Error' },
          { col1: '05/01/2025', col2: 'North', col3: '12400', status: 'Warning' },
        ]
      }
    },
    {
      id: 'sql',
      title: 'SQL',
      subtitle: 'Structured Data Warehousing',
      icon: Database,
      color: '#00D2FF',
      badge: 'Step 2: Relational Queries',
      code: `SELECT 
  c.customer_name,
  DATE_TRUNC('month', s.order_date) AS order_month,
  SUM(s.revenue) AS total_revenue
FROM sales_fact s
JOIN dim_customer c ON s.customer_id = c.id
GROUP BY 1, 2
HAVING SUM(s.revenue) > 10000;`,
      description: 'Filter millions of rows in milliseconds. SQL standardizes schemas, enforces primary keys, and establishes data warehouse models.',
      demoOutput: {
        type: 'sql',
        metric: '1,420,500 Rows Joined',
        speed: '12ms Query Execution'
      }
    },
    {
      id: 'powerquery',
      title: 'Power Query',
      subtitle: 'ETL & M-Code Transformations',
      icon: Zap,
      color: '#F2C811',
      badge: 'Step 3: Data Cleaning',
      code: `let
    Source = Sql.Database("dw-server.snowflake.com", "SalesDW"),
    FilteredRows = Table.SelectRows(Source, each [Status] == "Completed"),
    UnpivotedCols = Table.UnpivotOtherColumns(FilteredRows, {"CustomerID"}, "Attribute", "Value")
in
    UnpivotedCols`,
      description: 'Automated data prep. Remove duplicates, unpivot columns, and automate repeatable cleaning pipelines without writing complex code.',
      demoOutput: {
        type: 'powerquery',
        cleaningSteps: ['Removed 4,200 Nulls', 'Parsed ISO Dates', 'Unpivoted Regions']
      }
    },
    {
      id: 'dax',
      title: 'DAX',
      subtitle: 'Advanced Business Intelligence Measures',
      icon: Calculator,
      color: '#FF9900',
      badge: 'Step 4: Calculations',
      code: `Revenue YoY % = 
VAR CurrentSales = [Total Revenue]
VAR PriorYearSales = 
    CALCULATE(
        [Total Revenue], 
        SAMEPERIODLASTYEAR('DimDate'[Date])
    )
RETURN 
    DIVIDE(CurrentSales - PriorYearSales, PriorYearSales, 0)`,
      description: 'High-performance analytical calculations. Compute Year-over-Year growth, rolling averages, and row-level security with DAX engine.',
      demoOutput: {
        type: 'dax',
        formulaName: 'Revenue YoY %',
        result: '+28.4% YoY'
      }
    },
    {
      id: 'powerbi',
      title: 'Power BI',
      subtitle: 'Executive Interactive Dashboards',
      icon: BarChart3,
      color: '#F2C811',
      badge: 'Step 5: Visual Insights',
      code: `// Executive HUD Dashboard
- Cross-filtering visuals dynamically
- Drill-through down to transaction detail
- Mobile App & Automated Email Subscriptions`,
      description: 'Turn complex backend numbers into breathtaking executive dashboards that drive strategic corporate decisions.',
      demoOutput: {
        type: 'powerbi',
        widgets: ['KPI Card', 'Matrix Heatmap', 'Waterfall Chart']
      }
    },
    {
      id: 'ai',
      title: 'AI Analytics',
      subtitle: 'LLMs & Natural Language Insights',
      icon: Bot,
      color: '#BFFF00',
      badge: 'Step 6: Generative Intelligence',
      code: `Prompt: "Why did revenue drop in Q3 for Europe?"
AI Reasoning:
- Analyzed 14,000 transactions
- Isolated currency exchange fluctuation (-4.2%)
- Identified supply chain delays in Frankfurt hub`,
      description: 'Ask questions in plain English and let AI generate DAX formulas, summarize anomalies, and unearth hidden market trends.',
      demoOutput: {
        type: 'ai',
        aiStatus: 'Root-Cause Discovered',
        confidence: '99.4% Match'
      }
    },
    {
      id: 'mcp',
      title: 'MCP Protocol',
      subtitle: 'Model Context Protocol Bridge',
      icon: Cpu,
      color: '#00D2FF',
      badge: 'Step 7: Contextual Execution',
      code: `mcp_client.connect({
  server: "snowflake-powerbi-bridge",
  tools: ["execute_dax", "query_snowflake", "update-[#00D2FF]"],
  context: "Executive Revenue Summary"
});`,
      description: 'Connect AI models directly to your data warehouses and Power BI REST APIs safely with Model Context Protocol (MCP).',
      demoOutput: {
        type: 'mcp',
        connection: 'Live MCP Context Active',
        latency: '3ms Bridge Ping'
      }
    },
    {
      id: 'fabric',
      title: 'Microsoft Fabric',
      subtitle: 'Unified OneLake Analytics Engine',
      icon: Layers,
      color: '#7B2CBF',
      badge: 'Step 8: Enterprise Scale',
      code: `// OneLake Architecture
- Single Copy of Data (Delta Lake)
- Direct Lake Mode (No Import Delay)
- Real-Time Data Streams & Copilot AI`,
      description: 'The ultimate destination. Unify data engineering, data warehousing, machine learning, and BI into a single OneLake ecosystem.',
      demoOutput: {
        type: 'fabric',
        lakehouse: 'OneLake Single Source of Truth',
        capacity: 'Direct Lake Instant Sync'
      }
    }
  ];

  const current = steps[activeStep];
  const IconComponent = current.icon;

  return (
    <section id="story" className="py-24 relative overflow-hidden bg-[#0B0B0B]">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F2C811] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Data Transformation Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            The Modern Data Evolution
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Click or scroll through the 8 stages of enterprise analytics transformation taught at Hakam Data Studio.
          </p>
        </div>

        {/* Step Navigation Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start lg:justify-center">
          {steps.map((s, idx) => {
            const StepIcon = s.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono transition-all duration-300 whitespace-nowrap border ${
                  isActive 
                    ? 'bg-white/10 text-white border-yellow-500/50 shadow-lg shadow-yellow-500/10 scale-105' 
                    : 'bg-white/[0.02] text-gray-400 border-white/5 hover:text-white hover:bg-white/5'
                }`}
              >
                <StepIcon className="w-4 h-4" style={{ color: s.color }} />
                <span>{s.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Card Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Story Details */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F2C811]">
                  {current.badge}
                </span>
                <span className="text-xs font-mono text-gray-500">
                  0{activeStep + 1} / 0{steps.length}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <IconComponent className="w-6 h-6" style={{ color: current.color }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-heading">{current.title}</h3>
                  <p className="text-xs text-gray-400 font-mono">{current.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {current.description}
              </p>
            </div>

            {/* Quick Next / Prev Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-full text-xs font-mono bg-white/5 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous Stage
              </button>

              <button
                disabled={activeStep === steps.length - 1}
                onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                className="px-4 py-2 rounded-full text-xs font-mono bg-[#F2C811] text-black font-semibold hover:bg-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Code & Output Visualizer */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between bg-[#0E0F14]">
            
            {/* Window Header Bar */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="text-xs font-mono text-gray-400 ml-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-[#F2C811]" />
                  {current.id}_pipeline.script
                </span>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/5 text-gray-400">
                LIVE COMPILER
              </span>
            </div>

            {/* Code Block Display */}
            <div className="bg-[#070709] p-5 rounded-2xl font-mono text-xs sm:text-sm text-gray-200 overflow-x-auto border border-white/5 mb-6">
              <pre className="text-emerald-400 leading-relaxed">{current.code}</pre>
            </div>

            {/* Visualizer Result Output */}
            <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#BFFF00]" />
                  PIPELINE OUTPUT IMPACT
                </span>
                <span className="text-[11px] font-mono text-[#00D2FF]">100% Validated</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-gray-400 block font-mono">EXECUTION EFFICIENCY</span>
                  <span className="text-sm font-bold text-[#F2C811] font-mono">10x Speedup</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-gray-400 block font-mono">DATA INTEGRITY</span>
                  <span className="text-sm font-bold text-[#BFFF00] font-mono">Zero Errors</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
