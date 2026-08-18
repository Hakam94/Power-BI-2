import React from 'react';
import { Link } from 'react-router-dom';
import { Radar, ArrowRight, Mail } from 'lucide-react';
import { getLatestWeeklyUpdates } from '../data/weeklyUpdates';

export default function WeeklyUpdatesTeaser() {
  const updates = getLatestWeeklyUpdates(3);

  return (
    <section id="weekly-updates" className="py-24 relative overflow-hidden bg-[#0D2229]">
      <div className="absolute top-0 left-1/3 w-96 h-96 glow-orb-cyan pointer-events-none opacity-20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00D2FF] mb-4">
              <Radar className="w-3.5 h-3.5" />
              <span>Weekly Best Practices</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Tool updates, rewritten as real code
            </h2>
            <p className="text-gray-400 text-base mt-2 max-w-xl">
              Every week: what changed in Power BI, Snowflake, Databricks, and the rest of the modern data stack — with a concrete before/after code rewrite, not just release notes.
            </p>
          </div>

          <Link
            to="/weekly"
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#BFFF00]/50 hover:bg-[#BFFF00]/10 text-white font-bold text-xs font-mono transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <span>Browse All Updates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updates.map((update) => (
            <Link
              key={update.slug}
              to={`/weekly/${update.slug}`}
              className="glass-panel rounded-3xl border border-white/10 p-6 glass-card-hover group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#00D2FF] border border-white/10">
                    {update.tool}
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">{update.date}</span>
                </div>
                <h3 className="font-bold text-white text-base leading-snug mb-3 group-hover:text-[#BFFF00] transition-colors font-heading">
                  {update.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                  {update.summary}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono text-[#BFFF00]">
                <span>Read the rewrite</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono text-gray-500">
          <Mail className="w-3.5 h-3.5 text-[#BFFF00]" />
          <span>New updates land in the newsletter every week — subscribe below.</span>
        </div>
      </div>
    </section>
  );
}
