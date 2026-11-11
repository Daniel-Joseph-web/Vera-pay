'use client';

import React from 'react';

interface TechPartner {
  name: string;
  category: string;
  logoSrc: string;
}

const PARTNERS: TechPartner[] = [
  {
    name: 'PayPal',
    category: 'Escrow & Global Payouts',
    logoSrc: '/logos/paypal.png',
  },
  {
    name: 'Google Gemini AI',
    category: 'Multimodal AI Forensics',
    logoSrc: '/logos/gemini.png',
  },
  {
    name: 'AG Grid',
    category: 'Enterprise Forensic Ledger',
    logoSrc: '/logos/aggrid.png',
  },
  {
    name: 'Postman',
    category: 'API Testing & CI/CD',
    logoSrc: '/logos/postman.png',
  },
  {
    name: 'APIMatic',
    category: 'SDK & Portal Generation',
    logoSrc: '/logos/apimatic.png',
  },
  {
    name: 'Render',
    category: 'Cloud Hosting & Auto-Deploy',
    logoSrc: '/logos/render.png',
  },
  {
    name: '_zapier',
    category: 'Automated Workflows',
    logoSrc: '/logos/zapier.png',
  },
  {
    name: 'elastic',
    category: 'Search & Log Analytics',
    logoSrc: '/logos/elastic.png',
  },
];

export const TechPartnersMarquee: React.FC = () => {
  // Duplicate the list to guarantee a seamless infinite scroll loop
  const duplicatedPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="relative bg-white py-12 sm:py-16 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs font-bold uppercase tracking-wider text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Integrated Infrastructure & API Ecosystem
        </div>
        <h3 className="mt-3 text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Powered by Industry-Leading Platforms & Official Sponsors
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-medium">
          Verapay unites bank-grade escrow settlements, multimodal AI forensics, and enterprise workflows.
        </p>
      </div>

      {/* Marquee Track Container with Gradient Edge Fades */}
      <div className="relative w-full overflow-hidden marquee-container">
        {/* Left Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-white to-transparent z-10" />
        {/* Right Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Animated Scrolling Ribbon */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] gap-5 sm:gap-6 py-3">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="group flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 flex-shrink-0 cursor-default"
            >
              <div className="h-10 sm:h-12 flex items-center justify-center min-w-[110px] max-w-[160px]">
                <img
                  src={partner.logoSrc}
                  alt={partner.name}
                  className="h-7 sm:h-9 w-auto max-w-[155px] object-contain group-hover:scale-105 transition-transform"
                  loading="eager"
                />
              </div>
              <div className="h-8 w-px bg-slate-200/80 mx-1 hidden sm:block"></div>
              <div className="text-left hidden sm:block">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                  Verified Partner
                </span>
                <span className="block text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors whitespace-nowrap">
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
