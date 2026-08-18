import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Search,
  Play,
  Sparkles,
  Download,
  Volume2,
  VolumeX,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { YoutubeIcon } from './BrandIcons';

export default function Navbar({ onOpenCommandPalette, onOpenRoadmap }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Transformation', href: '#story' },
    { name: 'About Hakam', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'Services', href: '#services' },
    { name: 'Tutorials', href: '#youtube' },
    { name: 'AI & MCP', href: '#ai-mcp' },
    { name: 'Weekly Updates', to: '/weekly' },
    { name: 'Stats', href: '#stats' },
    { name: 'Community', href: '#community' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 sm:px-8">
      <div className={`max-w-7xl mx-auto rounded-full transition-all duration-300 border ${
        scrolled 
          ? 'bg-[#0D2229]/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-lime-500/5 py-2.5 px-6' 
          : 'bg-white/[0.03] backdrop-blur-md border-white/5 py-3.5 px-6'
      }`}>
        <div className="flex items-[#center] justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#BFFF00] via-[#BFFF00] to-[#00D2FF] p-[1.5px] shadow-lg shadow-lime-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0D2229] rounded-[10.5px] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[#BFFF00] group-hover:rotate-6 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5 font-heading">
                HAKAM <span className="text-[#BFFF00]">DATA STUDIO</span>
              </span>
              <span className="text-[10px] text-gray-400 tracking-wider font-mono">
                DATA ENGINEERING & AI
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/5">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.name}
                  to={link.to}
                  className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  {link.name}
                </a>
              )
            )}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-gray-400 hover:text-white hover:border-lime-500/40 text-xs font-mono transition-all duration-200"
              title="Open Spotlight Search (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-[#BFFF00]" />
              <span className="hidden md:inline">Search</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-gray-300">⌘K</kbd>
            </button>

            {/* Free Roadmap Button */}
            <button
              onClick={onOpenRoadmap}
              className="relative group overflow-hidden px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-[#BFFF00] to-[#FFD700] text-black shadow-lg shadow-lime-500/25 hover:shadow-lime-500/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>Get Roadmap</span>
            </button>

            {/* YouTube Live Badge Link */}
            <a
              href="https://www.youtube.com/@HakamDataStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-red-600/10 border border-red-500/30 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
              title="Watch on YouTube"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCommandPalette}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300"
            >
              <Search className="w-4 h-4 text-[#BFFF00]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-3 pb-2 animate-in fade-in slide-in-from-top-2">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </a>
              )
            )}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRoadmap();
                }}
                className="w-full py-2.5 rounded-full bg-[#BFFF00] text-black font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Analytics Roadmap</span>
              </button>
              <a
                href="https://www.youtube.com/@HakamDataStudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>Visit YouTube Channel</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
