import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Radar, BookOpen, TrendingUp, ExternalLink, Sparkles, AlertTriangle, Telescope, BarChart3 } from 'lucide-react';
import { getWeeklyUpdateBySlug } from '../data/weeklyUpdates';
import SEO from '../components/SEO';
import { SITE_URL } from '../config/site';

// Renders one tool's "what changed / before-after / why it matters" block.
// Used both for the legacy single-tool schema (fields live on `update`
// directly) and for each entry in a multi-tool roundup's `toolSections`.
function ToolSection({ tool, headline, whatChanged, codeBefore, codeAfter, whyItMatters }) {
  return (
    <section className="mb-8">
      {(tool || headline) && (
        <div className="flex items-center gap-3 mb-5">
          {tool && (
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#00D2FF] border border-white/10 shrink-0">
              {tool}
            </span>
          )}
          {headline && <h2 className="font-bold text-white text-lg font-heading">{headline}</h2>}
        </div>
      )}

      {whatChanged && whatChanged.length > 0 && (
        <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Radar className="w-4 h-4 text-[#00D2FF]" />
            <h3 className="font-bold text-white text-base font-heading">What Changed</h3>
          </div>
          <ul className="space-y-3">
            {whatChanged.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BFFF00] mt-2 shrink-0"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {codeBefore && codeAfter && (
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#BFFF00]" />
            <h3 className="font-bold text-white text-base font-heading">The Rewrite: Before → After</h3>
          </div>

          <div className="mb-4">
            <div className="text-[11px] font-mono text-red-400 mb-2 uppercase tracking-wider">Before</div>
            <pre className="glass-panel rounded-2xl border border-white/10 p-5 overflow-x-auto text-xs sm:text-sm leading-relaxed text-gray-300 font-mono">
              <code>{codeBefore}</code>
            </pre>
          </div>

          <div>
            <div className="text-[11px] font-mono text-[#BFFF00] mb-2 uppercase tracking-wider">After</div>
            <pre className="glass-panel rounded-2xl border border-[#BFFF00]/20 p-5 overflow-x-auto text-xs sm:text-sm leading-relaxed text-gray-100 font-mono">
              <code>{codeAfter}</code>
            </pre>
          </div>

          {whyItMatters && (
            <p className="text-gray-400 text-sm leading-relaxed mt-5">
              <span className="text-white font-semibold">Why it matters: </span>
              {whyItMatters}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

export default function WeeklyArticlePage() {
  const { slug } = useParams();
  const update = getWeeklyUpdateBySlug(slug);

  if (!update) {
    return <Navigate to="/weekly" replace />;
  }

  // Roundup entries carry multiple tool sections; legacy single-tool entries
  // carry whatChanged/codeBefore/codeAfter directly on `update` — normalize
  // both into one array so rendering below doesn't need to branch.
  const sections = update.toolSections && update.toolSections.length > 0
    ? update.toolSections
    : [{
        tool: update.tool,
        whatChanged: update.whatChanged,
        codeBefore: update.codeBefore,
        codeAfter: update.codeAfter,
        whyItMatters: update.whyItMatters
      }];

  const allReferences = [
    ...(update.references || []),
    ...(update.toolSections ? update.toolSections.flatMap((s) => s.references || []) : [])
  ];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: update.title,
    description: update.summary,
    datePublished: update.date,
    author: { '@type': 'Person', name: 'Hakam Abushanab' },
    publisher: { '@type': 'Organization', name: 'Hakam Data Studio' },
    url: `${SITE_URL}/weekly/${update.slug}`
  };

  return (
    <main className="pt-32 pb-24 relative overflow-hidden bg-[#0D2229] min-h-screen">
      <SEO
        title={update.title}
        description={update.summary}
        path={`/weekly/${update.slug}`}
        type="article"
        jsonLd={articleJsonLd}
        noIndex={update.status !== 'published'}
      />
      <div className="absolute top-0 left-1/3 w-96 h-96 glow-orb-cyan pointer-events-none opacity-20 blur-3xl"></div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link
          to="/weekly"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Weekly Updates</span>
        </Link>

        {/* Draft Review Banner — visible only to whoever has this direct link */}
        {update.status !== 'published' && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-200 leading-relaxed">
              <span className="font-bold">Draft — pending your review.</span> This page is unlisted (not shown in the archive or homepage), reachable only via this direct link. Reply with edits or approval and it'll be published once you sign off.
            </p>
          </div>
        )}

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {(update.tags || [update.tool]).filter(Boolean).map((tag) => (
              <span key={tag} className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#00D2FF] border border-white/10">
                {tag}
              </span>
            ))}
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

        {/* One section per tool covered this week */}
        {sections.map((section, idx) => (
          <ToolSection key={idx} {...section} />
        ))}

        {/* Emerging Tools Watchlist */}
        {update.emergingTools && update.emergingTools.length > 0 && (
          <section className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <Telescope className="w-4 h-4 text-[#BFFF00]" />
              <h2 className="font-bold text-white text-lg font-heading">Growing Tools to Watch</h2>
            </div>
            <div className="space-y-5">
              {update.emergingTools.map((tool, idx) => (
                <div key={idx} className="pb-5 border-b border-white/5 last:border-0 last:pb-0">
                  <h3 className="font-bold text-white text-sm mb-1.5">{tool.name}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-1.5">{tool.description}</p>
                  {tool.whyWatch && (
                    <p className="text-xs text-gray-400 leading-relaxed">
                      <span className="text-gray-300 font-semibold">Why watch it: </span>
                      {tool.whyWatch}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Top 5 Tools by Job Postings */}
        {update.jobMarketTop5 && (
          <section className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-8 mb-8 bg-gradient-to-r from-cyan-500/5 via-transparent to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-[#00D2FF]" />
              <h2 className="font-bold text-white text-lg font-heading">Top 5 Tools by Job Postings</h2>
            </div>
            {update.jobMarketTop5.methodologyNote && (
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                {update.jobMarketTop5.methodologyNote}
              </p>
            )}
            <div className="space-y-3 mb-4">
              {update.jobMarketTop5.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="text-xs font-mono text-gray-400 w-24 shrink-0">{item.tool}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#BFFF00] to-[#00D2FF]"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-mono text-white w-12 text-right shrink-0">{item.percentage}%</span>
                </div>
              ))}
            </div>
            {update.jobMarketTop5.source && (
              <a
                href={update.jobMarketTop5.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#00D2FF] hover:text-[#BFFF00] transition-colors"
              >
                <ExternalLink className="w-3 h-3 shrink-0" />
                <span>{update.jobMarketTop5.source.label}</span>
              </a>
            )}
          </section>
        )}

        {/* Editorial Job Market Signal (qualitative, non-statistical) */}
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
        {allReferences.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <h2 className="font-bold text-white text-lg font-heading">References</h2>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Verify anything above yourself — these are the primary sources this update was built from.
            </p>
            <ul className="space-y-2.5">
              {allReferences.map((ref, idx) => (
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
        )}

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
