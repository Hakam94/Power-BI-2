import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Radar, BookOpen, TrendingUp, ExternalLink, Sparkles } from 'lucide-react';
import { getWeeklyUpdateBySlug } from '../data/weeklyUpdates';

export default function WeeklyArticlePage() {
  const { slug } = useParams();
  const update = getWeeklyUpdateBySlug(slug);

  if (!update) {
    return <Navigate to="/weekly" replace />;
  }

  return (
    <main className="pt-32 pb-24 relative overflow-hidden bg-[#0D2229] min-h-screen">
      <div className="absolute top-0 left-1/3 w-96 h-96 glow-orb-cyan pointer-events-none opacity-20 blur-3xl"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          to="/weekly"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Weekly Updates</span>
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#00D2FF] border border-white/10">
              {update.tool}
            </span>
            <span className="text-[11px] font-mono text-gray-500">{update.date}</span>
            <span className="text-[11px] font-mono text-gray-500">· {update.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-heading">
            {update.title}
          </h1>
          <p className="text-gray-300 text-base leading-relaxed">
            {update.summary}
          </p>
        </div>

        {/* What Changed */}
        <section className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Radar className="w-4 h-4 text-[#00D2FF]" />
            <h2 className="font-bold text-white text-lg font-heading">What Changed</h2>
          </div>
          <ul className="space-y-3">
            {update.whatChanged.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BFFF00] mt-2 shrink-0"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Before / After Code */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-[#BFFF00]" />
            <h2 className="font-bold text-white text-lg font-heading">The Rewrite: Before → After</h2>
          </div>

          <div className="mb-4">
            <div className="text-[11px] font-mono text-red-400 mb-2 uppercase tracking-wider">Before</div>
            <pre className="glass-panel rounded-2xl border border-white/10 p-5 overflow-x-auto text-xs sm:text-sm leading-relaxed text-gray-300 font-mono">
              <code>{update.codeBefore}</code>
            </pre>
          </div>

          <div>
            <div className="text-[11px] font-mono text-[#BFFF00] mb-2 uppercase tracking-wider">After</div>
            <pre className="glass-panel rounded-2xl border border-[#BFFF00]/20 p-5 overflow-x-auto text-xs sm:text-sm leading-relaxed text-gray-100 font-mono">
              <code>{update.codeAfter}</code>
            </pre>
          </div>

          {update.whyItMatters && (
            <p className="text-gray-400 text-sm leading-relaxed mt-5">
              <span className="text-white font-semibold">Why it matters: </span>
              {update.whyItMatters}
            </p>
          )}
        </section>

        {/* Job Market Trend Signal */}
        {update.trendNote && (
          <section className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 mb-8 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-[#00D2FF]" />
              <h2 className="font-bold text-white text-lg font-heading">Job Market Signal</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                Editorial
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              {update.trendNote}
            </p>
          </section>
        )}

        {/* References */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <h2 className="font-bold text-white text-lg font-heading">References</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Verify anything above yourself — these are the primary sources this update was built from.
          </p>
          <ul className="space-y-2.5">
            {update.references.map((ref, idx) => (
              <li key={idx}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#00D2FF] hover:text-[#BFFF00] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  <span>{ref.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="pt-8 border-t border-white/10">
          <Link
            to="/weekly"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#BFFF00]/50 hover:bg-[#BFFF00]/10 text-white font-bold text-xs font-mono transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse More Weekly Updates</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
