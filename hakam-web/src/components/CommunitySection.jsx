import React from 'react';
import { Share2, ArrowUpRight } from 'lucide-react';
import { YoutubeIcon, LinkedinIcon, GithubIcon, InstagramIcon } from './BrandIcons';

export default function CommunitySection() {
  const socials = [
    {
      name: 'YouTube',
      handle: '@HakamDataStudio',
      stats: 'Video Tutorials',
      description: 'In-depth Power BI, SQL, Snowflake & AI video masterclasses.',
      url: 'https://www.youtube.com/@HakamDataStudio',
      icon: YoutubeIcon,
      color: '#FF0000',
      badge: 'Main Channel'
    },
    {
      name: 'LinkedIn',
      handle: 'Hakam Abushanab',
      stats: 'Professional Network',
      description: 'Daily BI engineering tips, DAX code snippets, and career guides.',
      url: 'https://www.linkedin.com/in/hakam-abushanab-a99523b6',
      icon: LinkedinIcon,
      color: '#0A66C2',
      badge: 'Professional Network'
    },
    {
      name: 'GitHub',
      handle: 'Hakam94',
      stats: 'Open Source Repos',
      description: 'Free PBIX report templates, DAX scripts, and MCP server code.',
      url: 'https://github.com/Hakam94',
      icon: GithubIcon,
      color: '#FFFFFF',
      badge: 'Code Repositories'
    },
    {
      name: 'Instagram',
      handle: '@hakam_data_studio',
      stats: 'Bite-Sized Tips',
      description: 'Short reels on DAX formulas, SQL tricks, and analytics cheatsheets.',
      url: 'https://www.instagram.com/hakam_data_studio',
      icon: InstagramIcon,
      color: '#E4405F',
      badge: 'Visual Shorts'
    }
  ];

  return (
    <section id="community" className="py-24 relative overflow-hidden bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F2C811] mb-4">
            <Share2 className="w-3.5 h-3.5" />
            <span>Connect Everywhere</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Join the Hakam Data Community
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Follow Hakam Data Studio across social platforms for daily tutorials, templates, and insights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {socials.map((soc) => {
            const SocIcon = soc.icon;
            return (
              <a
                key={soc.name}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel p-6 rounded-3xl border border-white/10 glass-card-hover group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <SocIcon className="w-6 h-6" style={{ color: soc.color }} />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">
                      {soc.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-lg font-heading flex items-center gap-1.5">
                    <span>{soc.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#F2C811] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs font-mono text-[#00D2FF] mb-3">{soc.handle}</p>
                  
                  <p className="text-gray-300 text-xs leading-relaxed mb-4">
                    {soc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>{soc.stats}</span>
                  <span className="text-[#F2C811] group-hover:underline">Follow →</span>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
