import React, { useState, useEffect } from 'react';
import { Phone, Search, Bot, CheckCircle2, ArrowRight, Sparkles, Mail } from 'lucide-react';
import PayPalCheckoutModal from './PayPalCheckoutModal';
import TiltCard from './TiltCard';

const SERVICES = [
  {
    id: 'strategy-call',
    name: '1:1 Power BI & DAX Strategy Session',
    price: '149.00',
    duration: '60 minutes, live 1:1',
    icon: Phone,
    color: '#F2C811',
    description:
      'A focused working session on your actual report. Bring a broken DAX measure, a slow data model, or a design you want reviewed — leave with a fix and a plan.',
    bullets: [
      'Live screen-share troubleshooting on your .pbix',
      'DAX, data modeling & star-schema guidance',
      'Session recording + written follow-up notes',
    ],
  },
  {
    id: 'dashboard-audit',
    name: 'Dashboard Performance & Design Audit',
    price: '249.00',
    duration: 'Turnaround in 3-5 business days',
    icon: Search,
    color: '#00D2FF',
    description:
      'Send your Power BI report. Get a structured audit covering data model efficiency, DAX performance, RLS setup, and executive-level UX — with prioritized fixes.',
    bullets: [
      'Full data model & DAX performance review',
      'Design & UX recommendations for stakeholders',
      'Written report + 20-min walkthrough call',
    ],
  },
  {
    id: 'ai-mcp-setup',
    name: 'Power BI + AI/MCP Setup Service',
    price: '349.00',
    duration: 'Done-for-you setup + handoff call',
    icon: Bot,
    color: '#BFFF00',
    description:
      'Connect your PBIP, PBIX, or Fabric semantic model to Claude, Codex, or Antigravity using the Power BI Modeling MCP server — so you can query and edit your model with AI, safely.',
    bullets: [
      'MCP server installed & configured for your model',
      'Guardrails so AI agents can’t break production reports',
      'Live handoff call showing your new AI workflow',
    ],
  },
];

export default function ServicesSection() {
  const [checkoutService, setCheckoutService] = useState(null);
  const [paidService, setPaidService] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === '1') {
      const service = SERVICES.find((s) => s.id === params.get('service'));
      setPaidService(service || true);
      params.delete('paid');
      params.delete('service');
      const query = params.toString();
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}${query ? `?${query}` : ''}#services`
      );
    }
  }, []);

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#061114]">
      <div className="absolute top-0 right-0 w-96 h-96 glow-orb-yellow pointer-events-none opacity-20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {paidService && (
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 mb-12 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-[#BFFF00]" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-base mb-1">Payment complete — thank you!</h3>
              <p className="text-sm text-gray-300">
                {paidService.name
                  ? `You're booked for ${paidService.name}. `
                  : "You're booked. "}
                Email the details below and I'll reply within 24 hours with available times.
              </p>
            </div>
            <a
              href={`mailto:h.abushanab94@gmail.com?subject=${encodeURIComponent(
                `Booking: ${paidService.name || 'Service'}`
              )}`}
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#BFFF00] text-black font-bold text-xs font-mono shadow-lg shadow-lime-500/20 hover:bg-lime-400"
            >
              <Mail className="w-4 h-4" />
              <span>Email to Schedule</span>
            </a>
          </div>
        )}

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#BFFF00] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Work With Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            1:1 Services & Consulting
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Beyond the free tutorials — hands-on help from a senior BI architect, for teams and analysts who
            need results now.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <TiltCard key={service.id} className="relative">
              <div
                className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between glass-card-hover group h-full"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <ServiceIcon className="w-6 h-6" style={{ color: service.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-snug font-heading">
                        {service.name}
                      </h3>
                      <span className="text-[11px] font-mono text-gray-400">{service.duration}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-5">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-[#BFFF00] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold text-white">
                      ${service.price}
                      <span className="text-xs font-mono text-gray-400 font-normal"> USD</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setCheckoutService(service)}
                    className="w-full py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-[#BFFF00] hover:text-black text-white font-semibold text-xs font-mono transition-all duration-200 flex items-center justify-center gap-2 group-hover:border-lime-500/50"
                  >
                    <span>Book & Pay with PayPal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              </TiltCard>
            );
          })}
        </div>
      </div>

      {checkoutService && (
        <PayPalCheckoutModal service={checkoutService} onClose={() => setCheckoutService(null)} />
      )}
    </section>
  );
}
