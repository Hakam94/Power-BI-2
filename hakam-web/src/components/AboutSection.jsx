import React from 'react';
import { GraduationCap, Building2, Video, Users } from 'lucide-react';
import TiltCard from './TiltCard';
import hakamPortrait from '../assets/hakam-portrait.jpg';

export default function AboutSection() {
  const milestones = [
    {
      year: 'MSc',
      title: 'International Economics',
      role: 'Università degli Studi di Milano-Bicocca',
      icon: GraduationCap,
      color: '#00D2FF',
      description: 'Built a foundation in economic modeling, statistical analysis, and financial data before moving into enterprise analytics.'
    },
    {
      year: 'Present',
      title: 'Head of Data & AI Enablement',
      role: 'Siemens Healthineers',
      icon: Building2,
      color: '#F2C811',
      description: 'Leads Power BI, SAP data, and AI-enablement initiatives across a global healthcare technology organization.'
    },
    {
      year: 'Present',
      title: 'Content Creator & Educator',
      role: 'Founder of Hakam Data Studio',
      icon: Video,
      color: '#FF5555',
      description: 'Teaching Power BI, DAX, SQL, and AI workflows to a growing global audience on YouTube and social media.'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#070709]">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 glow-orb-yellow pointer-events-none opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 glow-orb-cyan pointer-events-none opacity-20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F2C811] mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Meet The Founder</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Hakam Abushanab
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            From International Economics to Data & AI leadership at Siemens Healthineers — and global educator.
          </p>
        </div>

        {/* Founder Bio Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: Avatar & Quick Stats Card */}
          <div className="lg:col-span-5">
            <TiltCard max={6} className="relative">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden text-center group">

              {/* Profile Avatar Graphic */}
              <div className="relative w-36 h-36 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-[#F2C811] via-[#00D2FF] to-[#BFFF00] p-[2px] shadow-2xl shadow-yellow-500/20">
                <div className="w-full h-full bg-[#0B0B0B] rounded-[22px] flex items-center justify-center overflow-hidden">
                  <img
                    src={hakamPortrait}
                    alt="Hakam Abushanab"
                    className="w-full h-full object-cover object-top rounded-[22px]"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">Hakam Abushanab</h3>
              <p className="text-xs font-mono text-[#00D2FF] mb-4">HEAD OF DATA & AI ENABLEMENT, SIEMENS HEALTHINEERS</p>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "My mission is simple: eliminate the confusion in data analytics and empower professionals with practical, job-ready skills in Power BI, SQL, and AI."
              </p>

              {/* Key Skill Areas */}
              <div className="flex flex-wrap justify-center gap-2 pt-4 border-t border-white/10 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                  ⚡ Power BI & DAX
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                  🗄️ SAP & Enterprise Data
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                  🤖 MCP & AI Workflows
                </span>
              </div>
            </div>
            </TiltCard>
          </div>

          {/* Right Column: Timeline Journey */}
          <div className="lg:col-span-7 space-y-4">
            {milestones.map((item, idx) => {
              const MilestoneIcon = item.icon;
              return (
                <div 
                  key={idx} 
                  className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-all duration-300 flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MilestoneIcon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-white text-lg font-heading">{item.title}</h4>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-gray-400">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-gray-400 mb-2">{item.role}</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
