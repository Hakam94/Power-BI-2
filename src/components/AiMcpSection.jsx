import React, { useState } from 'react';
import { 
  Bot, 
  Cpu, 
  Database, 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2,
  Terminal,
  Zap
} from 'lucide-react';

export default function AiMcpSection() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(4); // 0 to 4 completed

  const prompts = [
    {
      query: "Analyze 2026 Revenue Growth by Region in Snowflake & render Power BI DAX",
      sql: "SELECT region, SUM(revenue) FROM snowflake_dw.sales GROUP BY 1;",
      dax: "Revenue YoY % = DIVIDE([Current Revenue] - [Prior Revenue], [Prior Revenue])",
      kpi: "$4.82M (+32.4%)",
      status: "Calculated in 4ms via MCP Context Bridge"
    },
    {
      query: "Detect Anomaly in Customer Churn for European E-Commerce Segment",
      sql: "SELECT customer_id, churn_score FROM snowflake_dw.customers WHERE churn_score > 0.85;",
      dax: "High Risk Churn Count = CALCULATE(COUNTROWS('Customers'), 'Customers'[Risk] = 'High')",
      kpi: "142 At-Risk Accounts",
      status: "Isolated via Claude 3.5 Sonnet & Snowflake MCP"
    },
    {
      query: "Predict Q4 OneLake Data Capacity Needs for Microsoft Fabric",
      sql: "SELECT lakehouse_name, storage_gb FROM fabric_onelake.capacity_metrics;",
      dax: "Projected Storage TB = SUM('Storage'[GB]) * 1.45",
      kpi: "18.4 TB OneLake",
      status: "Forecasted using Direct Lake Model"
    }
  ];

  const handleSimulate = (index) => {
    setSelectedPrompt(index);
    setIsSimulating(true);
    setSimulationStep(0);

    const interval = setInterval(() => {
      setSimulationStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsSimulating(false);
          return 4;
        }
        return prev + 1;
      });
    }, 600);
  };

  const current = prompts[selectedPrompt];

  return (
    <section id="ai-mcp" className="py-24 relative overflow-hidden bg-[#0D2229]">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] glow-orb-cyan pointer-events-none opacity-20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-xs font-mono text-[#BFFF00] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Next-Gen Model Context Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            AI + MCP Data Architecture
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Experience how ChatGPT and Claude connect directly to Snowflake warehouses and Power BI dashboards using Model Context Protocol (MCP).
          </p>
        </div>

        {/* Workflow Node Pipeline Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 mb-12">
          <div className="text-xs font-mono text-gray-400 mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2 text-[#BFFF00]">
              <Sparkles className="w-4 h-4" />
              LIVE ARCHITECTURE PIPELINE FLOW
            </span>
            <span>Step {simulationStep + 1} of 5</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center items-center relative">
            
            {/* Step 1: ChatGPT / Claude */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 ${
              simulationStep >= 0 
                ? 'bg-lime-500/10 border-[#BFFF00] text-white shadow-lg shadow-lime-500/10' 
                : 'bg-white/5 border-white/5 text-gray-500'
            }`}>
              <Bot className="w-8 h-8 mx-auto mb-2 text-[#BFFF00]" />
              <h4 className="font-bold text-xs font-heading">1. LLM Prompt</h4>
              <p className="text-[10px] font-mono text-gray-400 mt-1">ChatGPT / Claude</p>
            </div>

            {/* Step 2: MCP Bridge */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 ${
              simulationStep >= 1 
                ? 'bg-cyan-500/10 border-[#00D2FF] text-white shadow-lg shadow-cyan-500/10' 
                : 'bg-white/5 border-white/5 text-gray-500'
            }`}>
              <Cpu className="w-8 h-8 mx-auto mb-2 text-[#00D2FF]" />
              <h4 className="font-bold text-xs font-heading">2. MCP Server</h4>
              <p className="text-[10px] font-mono text-gray-400 mt-1">Context Gateway</p>
            </div>

            {/* Step 3: Snowflake DW */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 ${
              simulationStep >= 2 
                ? 'bg-blue-500/10 border-blue-400 text-white shadow-lg shadow-blue-500/10' 
                : 'bg-white/5 border-white/5 text-gray-500'
            }`}>
              <Database className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <h4 className="font-bold text-xs font-heading">3. Snowflake DW</h4>
              <p className="text-[10px] font-mono text-gray-400 mt-1">Executes SQL Query</p>
            </div>

            {/* Step 4: Power BI DAX */}
            <div className={`p-4 rounded-2xl border transition-all duration-300 ${
              simulationStep >= 3 
                ? 'bg-yellow-500/10 border-[#F2C811] text-white shadow-lg shadow-yellow-500/10' 
                : 'bg-white/5 border-white/5 text-gray-500'
            }`}>
              <Zap className="w-8 h-8 mx-auto mb-2 text-[#F2C811]" />
              <h4 className="font-bold text-xs font-heading">4. DAX Measure</h4>
              <p className="text-[10px] font-mono text-gray-400 mt-1">Formula Engine</p>
            </div>

            {/* Step 5: Power BI HUD */}
            <div className={`p-4 rounded-2xl border col-span-2 sm:col-span-1 transition-all duration-300 ${
              simulationStep >= 4 
                ? 'bg-emerald-500/10 border-emerald-400 text-white shadow-lg shadow-emerald-500/10' 
                : 'bg-white/5 border-white/5 text-gray-500'
            }`}>
              <BarChart3 className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
              <h4 className="font-bold text-xs font-heading">5. Live Dashboard</h4>
              <p className="text-[10px] font-mono text-gray-400 mt-1">Visual Render</p>
            </div>

          </div>
        </div>

        {/* Interactive Simulation Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Prompts Menu */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10">
            <h3 className="text-sm font-mono text-gray-300 mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#BFFF00]" />
              TRY AN INTELLECTUAL AI PROMPT:
            </h3>

            <div className="space-y-3">
              {prompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSimulate(idx)}
                  disabled={isSimulating}
                  className={`w-full p-4 rounded-2xl text-left border transition-all duration-200 ${
                    selectedPrompt === idx
                      ? 'bg-white/10 border-[#BFFF00] text-white shadow-lg shadow-lime-500/10'
                      : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#BFFF00]">
                      Prompt #{idx + 1}
                    </span>
                    {selectedPrompt === idx && isSimulating && (
                      <span className="text-[10px] font-mono text-[#00D2FF] animate-pulse">Running MCP...</span>
                    )}
                  </div>
                  <p className="text-xs font-semibold leading-relaxed">{p.query}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Execution Terminal Result */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-white/10 bg-[#061114] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-xs font-mono">
                <span className="text-[#00D2FF] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#BFFF00]" />
                  MCP CONTEXT EXECUTION LOG
                </span>
                <span className="text-gray-400">{current.status}</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-gray-400 block mb-1">AUTOMATED SQL GENERATED</span>
                  <p className="text-emerald-400">{current.sql}</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-gray-400 block mb-1">DAX MEASURE RENDERED</span>
                  <p className="text-[#F2C811]">{current.dax}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-lime-500/10 via-cyan-500/10 to-lime-500/10 border border-lime-500/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-gray-400">POWER BI KPI RESULT</span>
                <p className="text-2xl font-bold text-white font-heading">{current.kpi}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#BFFF00] text-black font-mono font-bold text-xs">
                MCP Synced
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
