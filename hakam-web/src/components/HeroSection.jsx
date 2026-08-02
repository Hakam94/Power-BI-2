import React from 'react';
import { Play, Sparkles, ArrowRight, ShieldCheck, Cpu, Database, Award, Users } from 'lucide-react';
import Hero3DDashboard from './Hero3DDashboard';

export default function HeroSection({ onOpenRoadmap }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Glowing Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-orb-yellow pointer-events-none opacity-40 blur-3xl"></div>
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] glow-orb-cyan pointer-events-none opacity-30 blur-3xl"></div>
      <div className="absolute top-0 inset-x-0 h-full cyber-grid pointer-events-none opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-gold border border-[#F2C811]/30 hover:border-[#F2C811]/60 transition-all duration-300 group cursor-pointer" onClick={onOpenRoadmap}>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2C811] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F2C811]"></span>
            </span>
            <span className="text-xs font-mono text-gray-200">
              NEW: 2026 Data Engineering & Power BI AI Masterclass
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F2C811] group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Main Hero Headline */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Learn Data Analytics.{' '}
            <span className="gradient-text-yellow drop-shadow-lg">Build Real Projects.</span>{' '}
            <span className="gradient-text-cyan">Advance Your Career.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Master <strong className="text-white font-semibold">Power BI, SQL, Snowflake, Microsoft Fabric, AI & MCP</strong> with <strong className="text-[#F2C811]">Hakam Abushanab</strong>. Practical enterprise tutorials for real-world impact.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <a
              href="#courses"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#F2C811] text-black font-bold text-base shadow-xl shadow-yellow-500/25 hover:shadow-yellow-500/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Start Learning Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://www.youtube.com/@HakamDataStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/10 text-white font-semibold text-base backdrop-blur-xl transition-all duration-200 flex items-center justify-center gap-2 group hover:border-red-500/50"
            >
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span>Watch on YouTube</span>
            </a>
          </div>
        </div>

        {/* 3D Dashboard Floating Stage */}
        <div className="relative mt-8">
          <Hero3DDashboard />
        </div>

        {/* Floating Quick Feature Cards below Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-[#F2C811]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-3">
              <Database className="w-5 h-5 text-[#F2C811]" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">Enterprise SQL & DAX</h3>
            <p className="text-xs text-gray-400">Production data modeling & optimization</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5 text-[#00D2FF]" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">Microsoft Fabric & OneLake</h3>
            <p className="text-xs text-gray-400">Next-gen unified analytics platform</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-lime-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-[#BFFF00]" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">AI & MCP Automation</h3>
            <p className="text-xs text-gray-400">Model Context Protocol for Power BI</p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-3">
              <Award className="w-5 h-5 text-[#F2C811]" />
            </div>
            <h3 className="font-bold text-white text-sm mb-1">Real-World Projects</h3>
            <p className="text-xs text-gray-400">Portfolio builds that get you hired</p>
          </div>
        </div>

      </div>
    </section>
  );
}
