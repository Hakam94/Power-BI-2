import React, { useState } from 'react';
import { Download, X, CheckCircle2, Sparkles, ShieldCheck, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RoadmapModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Trigger confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-lime-500/30 max-w-lg w-full relative bg-[#0D0E12] shadow-2xl">
        
        <button
          onClick={() => { setSubmitted(false); onClose(); }}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center mb-4 text-[#BFFF00]">
              <Download className="w-6 h-6" />
            </div>

            <span className="text-xs font-mono text-[#BFFF00] uppercase tracking-wider block mb-1">
              FREE DOWNLOADABLE PDF
            </span>
            <h3 className="text-2xl font-bold text-white font-heading mb-3">
              2026 Enterprise Data Analyst Roadmap
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Get the complete step-by-step roadmap to mastering <strong className="text-white">Power BI, SQL, Snowflake, Python, and AI MCP Architecture</strong>.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#BFFF00]" />
                <span>Month-by-month learning milestones</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#BFFF00]" />
                <span>Top 5 portfolio project ideas for resume</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#BFFF00]" />
                <span>Essential DAX & SQL cheat sheets included</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-400 mb-1.5">Work / Personal Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#BFFF00]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#BFFF00] text-black font-bold text-sm shadow-xl shadow-lime-500/25 hover:bg-lime-400 transition-all flex items-center justify-center gap-2 font-mono"
              >
                <Download className="w-4 h-4" />
                <span>Download Free Roadmap PDF</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[#BFFF00] flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white font-heading mb-2">Roadmap On Its Way!</h3>
            <p className="text-gray-300 text-sm mb-6">
              We've sent the download link to <strong className="text-[#BFFF00]">{email}</strong>.
            </p>

            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-6 py-2.5 rounded-full bg-white/10 text-white font-semibold text-xs font-mono hover:bg-white/20"
            >
              Close & Back to Site
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
