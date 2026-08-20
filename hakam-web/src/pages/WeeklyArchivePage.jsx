import React from 'react';
import { Link } from 'react-router-dom';
import { Radar, ArrowRight, ArrowLeft } from 'lucide-react';
import { getPublishedWeeklyUpdates } from '../data/weeklyUpdates';
import SEO from '../components/SEO';

export default function WeeklyArchivePage() {
  const sorted = getPublishedWeeklyUpdates().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="pt-32 pb-24 relative overflow-hidden bg-[#0D2229] min-h-screen">
      <SEO
        title="Weekly Best Practices"
        description="A running archive of what changed in Power BI, Snowflake, Databricks, and the rest of the modern data stack — each entry rewrites a real before/after code example."
        path="/weekly"
      />
      <div className="absolute top-0 left-1/3 w-96 h-96 glow-orb-cyan pointer-events-none opacity-20 blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00D2FF] mb-4">
          <Radar className="w-3.5 h-3.5" />
          <span>Weekly Best Practices</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Every tool update, rewritten as real code
        </h1>
        <p className="text-gray-400 text-base max-w-2xl mb-16">
          A running archive of what changed in Power BI, Snowflake, Databricks, and the rest of the modern data stack — each entry rewrites a real before/after example so the practice change is concrete, not theoretical.
        </p>

        <div className="space-y-6">
          {sorted.map((update) => (
            <Link
              key={update.slug}
              to={`/weekly/${update.slug}`}
              className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 glass-card-hover group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#00D2FF] border border-white/10">
                    {update.tool || (update.tags && update.tags[0]) || 'Roundup'}
                  </span>
                  <span className="text-[11px] font-mono text-gray-500">{update.date}</span>
                  <span className="text-[11px] font-mono text-gray-500">· {update.readTime}</span>
                </div>
                <h2 className="font-bold text-white text-xl leading-snug mb-2 group-hover:text-[#BFFF00] transition-colors font-heading">
                  {update.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                  {update.summary}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono text-[#BFFF00] sm:pl-4">
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
