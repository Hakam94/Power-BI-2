import React, { useState } from 'react';
import { BarChart3, Mail, Send, CheckCircle2, Heart, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Footer({ onOpenRoadmap }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    confetti({ particleCount: 60, spread: 60 });
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070709] text-gray-400 border-t border-white/10 overflow-hidden">
      {/* Background Subtle Mesh */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        
        {/* Top Newsletter Card */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 mb-16 relative overflow-hidden bg-gradient-to-r from-yellow-500/5 via-cyan-500/5 to-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-xs font-mono text-[#F2C811] uppercase tracking-wider block mb-2">
                STAY AHEAD OF THE CURVE
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-3">
                Subscribe to The Data Studio Digest
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                Get weekly DAX formulas, SQL optimization tips, Snowflake architectural breakdowns, and AI MCP tools delivered directly to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#F2C811]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-full bg-[#F2C811] text-black font-bold text-xs font-mono shadow-lg shadow-yellow-500/20 hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 shrink-0"
                  >
                    <span>Join Free</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <span className="text-xs font-mono text-[#BFFF00] font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Subscribed! Check your inbox soon.
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10 text-sm">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F2C811] to-[#00D2FF] p-[1.5px]">
                <div className="w-full h-full bg-[#0B0B0B] rounded-[10.5px] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#F2C811]" />
                </div>
              </div>
              <span className="font-bold text-lg text-white font-heading tracking-tight">
                HAKAM <span className="text-[#F2C811]">DATA STUDIO</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Empowering global professionals with world-class Data Analytics, Power BI, SQL, Snowflake, and AI engineering skills. Founded by Hakam Abushanab.
            </p>
            <div className="pt-2 text-xs font-mono text-gray-500">
              © {new Date().getFullYear()} Hakam Data Studio. All rights reserved.
            </div>
          </div>

          {/* Col 2: Learning Tracks */}
          <div>
            <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider mb-4">
              Learning Tracks
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#courses" className="hover:text-white transition-colors">Power BI Masterclass</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Modern SQL & Warehousing</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Snowflake Cloud Platform</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Microsoft Fabric & OneLake</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">AI & MCP Architecture</a></li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="#story" className="hover:text-white transition-colors">8-Step Pipeline</a></li>
              <li><a href="#services" className="hover:text-[#F2C811] transition-colors">1:1 Services</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Hakam</a></li>
              <li><a href="#youtube" className="hover:text-white transition-colors">YouTube Tutorials</a></li>
              <li><a href="#stats" className="hover:text-white transition-colors">Community Stats</a></li>
              <li><button onClick={onOpenRoadmap} className="hover:text-[#F2C811] transition-colors text-left">Free Roadmap PDF</button></li>
            </ul>
          </div>

          {/* Col 4: Official Channel */}
          <div>
            <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider mb-4">
              Official Hub
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><a href="https://www.youtube.com/@HakamDataStudio" target="_blank" rel="noreferrer" className="hover:text-[#F2C811] transition-colors">YouTube @HakamDataStudio</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn Community</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Code Repos</a></li>
              <li><a href="mailto:h.abushanab94@gmail.com" className="hover:text-[#00D2FF] transition-colors">h.abushanab94@gmail.com</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
            <span>for Data Leaders worldwide</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
