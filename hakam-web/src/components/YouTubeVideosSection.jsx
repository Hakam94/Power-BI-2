import React, { useState } from 'react';
import { Play, Eye, Clock, Sparkles, ExternalLink, X } from 'lucide-react';
import { YoutubeIcon } from './BrandIcons';

export default function YouTubeVideosSection() {
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: 'video-1',
      youtubeId: 'dQw4w9WgXcQ', // Clean fallback video or placeholder stream
      title: 'Power BI End-to-End Masterclass: Build an Executive Financial Dashboard',
      views: '185,000+ views',
      duration: '1h 45m',
      category: 'Power BI',
      published: 'Latest Release',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      summary: 'Learn how to transform raw transactional data into a production-ready Power BI dashboard using DAX calculations, Star Schema modeling, and custom visual formatting.'
    },
    {
      id: 'video-2',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'SQL Window Functions Explained: ROW_NUMBER, RANK, DENSE_RANK & LAG',
      views: '142,000+ views',
      duration: '42 mins',
      category: 'SQL',
      published: 'Popular Tutorial',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      summary: 'Master SQL window functions with clear visual step-by-step diagrams and real business queries for revenue ranking and period-over-period growth.'
    },
    {
      id: 'video-3',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Snowflake Cloud Data Warehouse Crash Course for Beginners',
      views: '98,000+ views',
      duration: '58 mins',
      category: 'Snowflake',
      published: 'Trending',
      thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop',
      summary: 'Complete guide to Snowflake virtual warehouses, Zero-Copy cloning, Time Travel disaster recovery, and cost optimization techniques.'
    },
    {
      id: 'video-4',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Microsoft Fabric Direct Lake Mode: Goodbye Import & DirectQuery',
      views: '115,000+ views',
      duration: '35 mins',
      category: 'Microsoft Fabric',
      published: 'Featured',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
      summary: 'Discover how Microsoft Fabric Direct Lake mode queries Delta Parquet files in OneLake instantly without dataset refresh bottlenecks.'
    },
    {
      id: 'video-5',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'AI & MCP Protocol: Connecting ChatGPT to Power BI and Snowflake',
      views: '210,000+ views',
      duration: '50 mins',
      category: 'AI & MCP',
      published: 'Hot',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      summary: 'Build an autonomous Model Context Protocol (MCP) server that enables Claude and ChatGPT to safely run DAX & SQL queries directly on enterprise databases.'
    },
    {
      id: 'video-6',
      youtubeId: 'dQw4w9WgXcQ',
      title: 'Top 10 DAX Functions Every Data Analyst Must Master in 2026',
      views: '260,000+ views',
      duration: '1h 12m',
      category: 'DAX',
      published: 'Top Rated',
      thumbnail: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop',
      summary: 'Deep dive into CALCULATE, FILTER, ALLSELECTED, SUMX, USERELATIONSHIP, and Time Intelligence patterns for complex reporting.'
    }
  ];

  return (
    <section id="youtube" className="py-24 relative overflow-hidden bg-[#070709]">
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
              Featured YouTube Tutorials
            </h2>
            <p className="text-gray-400 text-base mt-2 max-w-xl">
              High-impact, practical video tutorials watched by over 50,000 data professionals on @HakamDataStudio.
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
                  src={vid.thumbnail} 
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent"></div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-mono text-gray-200 border border-white/10 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#F2C811]" />
                  <span>{vid.duration}</span>
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
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-2">
                    <Eye className="w-3.5 h-3.5 text-[#F2C811]" />
                    <span>{vid.views}</span>
                    <span>•</span>
                    <span className="text-[#00D2FF]">{vid.published}</span>
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug mb-3 group-hover:text-[#F2C811] transition-colors font-heading">
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
          <div className="max-w-4xl w-full glass-panel rounded-3xl border border-white/20 overflow-hidden relative bg-[#0B0B0B]">
            
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
                <span className="px-2.5 py-1 rounded bg-white/5 text-[#F2C811]">
                  {activeVideo.category}
                </span>
                <span>{activeVideo.views}</span>
              </div>

              <a
                href="https://www.youtube.com/@HakamDataStudio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-red-600 text-white font-bold text-xs font-mono flex items-center gap-2"
              >
                <YoutubeIcon className="w-4 h-4 fill-current" />
                <span>Visit Channel for 150+ More Tutorials</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
