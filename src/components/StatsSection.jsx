import React, { useState, useEffect } from 'react';
import { Users2, Share2, TrendingUp } from 'lucide-react';

function CounterItem({ icon: Icon, target, label, suffix, color }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = 30;
    const increment = Math.ceil(target / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="glass-panel p-8 rounded-3xl border border-white/10 text-center glass-card-hover group">
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7" style={{ color }} />
      </div>

      <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 font-heading tracking-tight">
        {count.toLocaleString()}{suffix}
      </div>

      <p className="text-gray-400 font-mono text-xs uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section id="stats" className="py-24 relative overflow-hidden bg-[#070709]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] glow-orb-yellow pointer-events-none opacity-20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F2C811] mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Community Impact</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Global Analytics Reach
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Empowering business analysts, SQL engineers, and BI professionals worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <CounterItem
            icon={Users2}
            target={5000}
            suffix="+"
            label="Community Members Across Social Media"
            color="#F2C811"
          />
          <CounterItem
            icon={Share2}
            target={5}
            suffix=""
            label="Platforms — YouTube, LinkedIn, Instagram, TikTok & Facebook"
            color="#00D2FF"
          />
        </div>

      </div>
    </section>
  );
}
