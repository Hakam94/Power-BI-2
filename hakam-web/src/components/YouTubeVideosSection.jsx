import React, { useState } from 'react';
import { Play, Clock, ExternalLink, X } from 'lucide-react';
import { YoutubeIcon } from './BrandIcons';

export default function YouTubeVideosSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: 'video-1',
      youtubeId: 'E5IwVrO7bvk',
      title: 'How to Install Power BI & Build Your First Dashboard',
      part: 'Part 1',
      category: 'Power BI',
      summary: 'Import raw coffee-shop sales data, clean it, and create your first visuals — the starting point of the CoffeeShop dashboard series.'
    },
    {
      id: 'video-2',
      youtubeId: 'mXn-_VGXMsI',
      title: 'Coffee Shop Sales Dashboard — DAX, Profit, Price & MoM Growth',
      part: 'Part 2',
      category: 'DAX',
      summary: 'Dive into DAX: calculating metrics like Profit, Price, and Month-over-Month Growth, and enhancing interactivity.'
    },
    {
      id: 'video-3',
      youtubeId: 'ysnD_-scwhg',
      title: 'Dynamic Greeting, Refresh Timestamps & Row-Level Security (RLS)',
      part: 'Part 3',
      category: 'Row-Level Security',
      summary: 'Personalize your dashboard with dynamic greetings, display refresh timestamps, and configure dynamic RLS filters.'
    },
    {
      id: 'video-4',
      youtubeId: '81GNe3HosF4',
      title: 'Field Parameters | The Smart Dashboard Technique',
      part: 'Part 4',
      category: 'Field Parameters',
      summary: 'Use Field Parameters to build a flexible, user-driven dashboard that switches dimensions and measures dynamically.'
    },
    {
      id: 'video-5',
      youtubeId: 'kYJ_tXnZ9c8',
      title: 'Dashboard Design Basics | Clean Layout, Themes & UX Tips',
      part: 'Part 5',
      category: 'Design & UX',
      summary: 'Dashboard design fundamentals: aligning visuals, formatting themes, and structuring containers for a professional layout.'
    }
  ];

  return (
    <section id="youtube" className="py-24 relative overflow-hidden bg-[#061114]">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full h-[500px] glow-orb-yellow pointer-events-none opacity-10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 mb-4">
              <YoutubeIcon className="w-3.5 h-3.5" />
              <span>Official Channel Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              The Power BI CoffeeShop Series
            </h2>
            <p className="text-gray-400 text-base mt-2 max-w-xl">
              The free, step-by-step tutorial series on @HakamDataStudio — from raw Excel data to a polished executive dashboard.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@HakamDataStudio"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono shadow-xl shadow-red-600/20 transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <YoutubeIcon className="w-4 h-4 fill-current" />
            <span>Subscribe on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="glass-panel rounded-3xl border border-white/10 overflow-hidden glass-card-hover group flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div
                className="relative h-48 sm:h-52 w-full overflow-hidden cursor-pointer bg-gray-900"
                onClick={() => setActiveVideo(vid)}
              >
                <img
                  src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2229] via-transparent to-transparent"></div>

                {/* Part Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-mono text-gray-200 border border-white/10 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#BFFF00]" />
                  <span>{vid.part}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-red-600/80 backdrop-blur-md text-[10px] font-mono text-white font-semibold">
                  {vid.category}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base leading-snug mb-3 group-hover:text-[#BFFF00] transition-colors font-heading">
                    {vid.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">
                    {vid.summary}
                  </p>
                </div>

                <button
                  onClick={() => setActiveVideo(vid)}
                  className="w-full py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-red-600/20 hover:border-red-500/50 text-white font-semibold text-xs font-mono transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-red-500" />
                  <span>Watch Tutorial Video</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Lightbox Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-in fade-in">
          <div className="max-w-4xl w-full glass-panel rounded-3xl border border-white/20 overflow-hidden relative bg-[#0D2229]">

            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <YoutubeIcon className="w-5 h-5 text-red-500" />
                <h3 className="font-bold text-white text-sm sm:text-base font-heading truncate max-w-lg">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Embed Container */}
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0E0F14]">
              <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                <span className="px-2.5 py-1 rounded bg-white/5 text-[#BFFF00]">
                  {activeVideo.category}
                </span>
                <span>{activeVideo.part}</span>
              </div>

              <a
                href="https://www.youtube.com/@HakamDataStudio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-red-600 text-white font-bold text-xs font-mono flex items-center gap-2"
              >
                <YoutubeIcon className="w-4 h-4 fill-current" />
                <span>Visit the Channel</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
