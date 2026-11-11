'use client';

import React from 'react';

interface TechPartner {
  name: string;
  category: string;
  color: string;
  logo: React.ReactNode;
}

const PARTNERS: TechPartner[] = [
  {
    name: 'PayPal',
    category: 'Escrow & Global Payouts',
    color: '#003087',
    logo: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 flex-shrink-0" fill="none">
        <path d="M10 5h8c3.8 0 6.5 2.2 6.5 5.5 0 4.2-3 7-7.2 7h-3.8l-1.8 11h-5.2L10 5z" fill="#003087" />
        <path d="M14 9.5h7.5c3.5 0 6 2 6 5 0 4.2-3 7.2-7.2 7.2h-3.6l-1.6 9.8h-5.2l4.1-22z" fill="#0079C1" />
        <path d="M13.2 16.5l-1 6h3.2c3.5 0 5.8-2 6.2-5.2-.4.2-.9.2-1.5.2h-4.4l-2.5-1z" fill="#00246B" opacity="0.35" />
      </svg>
    ),
  },
  {
    name: 'Google Gemini AI',
    category: 'Multimodal AI Forensics',
    color: '#4285F4',
    logo: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 flex-shrink-0">
        <defs>
          <linearGradient id="gemini-star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1BA1E3" />
            <stop offset="35%" stopColor="#5C6BC0" />
            <stop offset="70%" stopColor="#AB47BC" />
            <stop offset="100%" stopColor="#EC407A" />
          </linearGradient>
        </defs>
        <path
          d="M16 2C16 9.73 9.73 16 2 16C9.73 16 16 22.27 16 30C16 22.27 22.27 16 30 16C22.27 16 16 9.73 16 2Z"
          fill="url(#gemini-star-grad)"
        />
      </svg>
    ),
  },
  {
    name: 'AG Grid',
    category: 'High-Performance Ledger',
    color: '#0084FF',
    logo: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 flex-shrink-0" fill="none">
        <rect x="3" y="3" width="11" height="11" rx="3" fill="#00E5FF" />
        <rect x="18" y="3" width="11" height="11" rx="3" fill="#0084FF" />
        <rect x="3" y="18" width="11" height="11" rx="3" fill="#00B0FF" />
        <rect x="18" y="18" width="11" height="11" rx="3" fill="#2979FF" />
        <circle cx="16" cy="16" r="3.2" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Postman',
    category: 'API Testing & CI/CD',
    color: '#FF6C37',
    logo: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 flex-shrink-0" fill="none">
        <circle cx="16" cy="16" r="14" fill="#FF6C37" />
        <path
          d="M22.5 12.2c-.3-.4-.8-.6-1.3-.4l-9.2 3.6c-.6.2-.9.8-.7 1.4.1.4.5.7.9.7l3 .2 1 3.5c.2.6.8.9 1.4.7.3-.1.6-.4.7-.7l3.8-7.8c.2-.5.1-1-.2-1.2z"
          fill="#FFFFFF"
        />
        <circle cx="14" cy="13" r="2.2" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'APIMatic',
    category: 'SDK & Portal Generation',
    color: '#0F80FF',
    logo: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 flex-shrink-0" fill="none">
        <path d="M16 3L27 9.5V22.5L16 29L5 22.5V9.5L16 3Z" fill="#0F80FF" />
        <path d="M16 3L27 9.5L16 16L5 9.5L16 3Z" fill="#1AD1D7" />
        <path d="M16 16L27 9.5V22.5L16 29V16Z" fill="#0C65D9" />
        <circle cx="16" cy="16" r="3.5" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'Render',
    category: 'Cloud Hosting & Auto-Deploy',
    color: '#46E3B7',
    logo: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 flex-shrink-0" fill="none">
        <rect width="32" height="32" rx="8" fill="#141E28" />
        <path
          d="M9 8h8.5a6 6 0 014 10.5L24 24h-4.5l-2.5-5H13v5H9V8zm4 4v3.5h4.5a1.75 1.75 0 000-3.5H13z"
          fill="#46E3B7"
        />
      </svg>
    ),
  },
  {
    name: 'Zapier',
    category: 'Automated Workflows',
    color: '#FF4A00',
    logo: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 flex-shrink-0" fill="none">
        <circle cx="16" cy="16" r="14" fill="#FF4A00" />
        <path
          d="M16 7v18M7 16h18M9.6 9.6l12.8 12.8M9.6 22.4l12.8-12.8"
          stroke="#FFFFFF"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: 'Elastic',
    category: 'Search & Log Analytics',
    color: '#00BFB3',
    logo: (
      <svg viewBox="0 0 32 32" className="w-8 h-8 flex-shrink-0" fill="none">
        <rect width="32" height="32" rx="8" fill="#1B2735" />
        <path
          d="M11 9c-2.8 0-5 2.2-5 5s2.2 5 5 5h1v-2h-1c-1.7 0-3-1.3-3-3s1.3-3 3-3h1V9h-1z"
          fill="#FEC514"
        />
        <path
          d="M21 9h-1v2h1c1.7 0 3 1.3 3 3s-1.3 3-3 3h-1v2h1c2.8 0 5-2.2 5-5s-2.2-5-5-5z"
          fill="#00BFB3"
        />
        <circle cx="13" cy="14" r="2.2" fill="#FD4766" />
        <circle cx="19" cy="14" r="2.2" fill="#0077CC" />
        <rect x="14" y="13" width="4" height="2" fill="#FFFFFF" />
      </svg>
    ),
  },
];

export const TechPartnersMarquee: React.FC = () => {
  // We duplicate the list to ensure a seamless infinite scroll loop
  const duplicatedPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="relative bg-white py-12 sm:py-16 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-bold uppercase tracking-wider text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Integrated Infrastructure & API Ecosystem
        </div>
        <h3 className="mt-3 text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Powered by Industry-Leading Platforms & Tools
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
          Verapay unites bank-grade escrow settlements, multimodal AI forensics, and enterprise workflows.
        </p>
      </div>

      {/* Marquee Track Container with Gradient Edge Fades */}
      <div className="relative w-full overflow-hidden marquee-container">
        {/* Left Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10" />
        {/* Right Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Animated Scrolling Ribbon */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] gap-5 sm:gap-6 py-2">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="group flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-emerald-500/50 hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 cursor-default"
            >
              <div className="p-1 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform">
                {partner.logo}
              </div>
              <div className="text-left">
                <span className="block text-base sm:text-lg font-black text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                  {partner.name}
                </span>
                <span className="block text-[11px] sm:text-xs font-semibold text-slate-400 group-hover:text-slate-600 transition-colors">
                  {partner.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
