import React, { useState, useEffect } from 'react';
import { Search, X, BarChart3, Database, BookOpen, Cpu, Download, ArrowRight } from 'lucide-react';
import { YoutubeIcon } from './BrandIcons';

export default function CommandPalette({ isOpen, onClose, onOpenRoadmap }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { title: 'Power BI Masterclass 2026', type: 'Course', href: '#courses', icon: BarChart3, color: '#F2C811' },
    { title: 'Modern SQL & Data Warehousing', type: 'Course', href: '#courses', icon: Database, color: '#00D2FF' },
    { title: 'YouTube Channel @HakamDataStudio', type: 'Channel', href: '#youtube', icon: YoutubeIcon, color: '#FF0000' },
    { title: '8-Step Data Evolution Pipeline', type: 'Story', href: '#story', icon: BookOpen, color: '#BFFF00' },
    { title: 'AI & MCP Protocol Simulator', type: 'Simulator', href: '#ai-mcp', icon: Cpu, color: '#00D2FF' },
    { title: 'Download 2026 Data Roadmap PDF', type: 'Roadmap', action: () => { onClose(); onOpenRoadmap(); }, icon: Download, color: '#F2C811' }
  ];

  const filtered = items.filter(i => 
    i.title.toLowerCase().includes(query.toLowerCase()) || 
    i.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-2xl animate-in fade-in">
      <div className="glass-panel p-4 rounded-3xl border border-white/20 max-w-xl w-full bg-[#0D0E12] shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search className="w-5 h-5 text-[#F2C811]" />
          <input
            type="text"
            placeholder="Search courses, tutorials, DAX measures, or jump to section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-500 text-sm font-sans focus:outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="py-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-gray-500">
              No results matching "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (item.action) item.action();
                    else if (item.href) {
                      window.location.href = item.href;
                      onClose();
                    }
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/10 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <ItemIcon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <span className="text-sm text-gray-200 font-medium group-hover:text-white">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400">
                      {item.type}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#F2C811] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-500 px-2">
          <span>Press <kbd className="px-1 py-0.5 bg-white/10 rounded text-gray-300">ESC</kbd> to exit</span>
          <span>Hakam Data Studio Spotlight</span>
        </div>

      </div>
    </div>
  );
}
