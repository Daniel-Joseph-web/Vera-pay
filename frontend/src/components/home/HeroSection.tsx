'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ShieldCheck } from 'lucide-react';

const LIME = '#7CF05A';

const avatars = [
  { initials: 'AO', bg: 'bg-emerald-700' },
  { initials: 'TB', bg: 'bg-amber-700' },
  { initials: 'FK', bg: 'bg-teal-700' },
  { initials: 'EN', bg: 'bg-lime-800' },
  { initials: 'BO', bg: 'bg-green-800' },
];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#031d16] text-white"
    >
      {/* Background photo (save the hero image at public/images/verapay-hero.png) */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          src="/images/verapay-hero.png"
          alt=""
          className="h-full w-full object-cover object-[72%_center] sm:object-[68%_center] lg:object-right"
        />
        {/* Keeps the headline readable on small screens, where the photo sits behind the text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031d16]/90 via-[#031d16]/55 to-transparent lg:from-[#031d16]/60 lg:via-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#031d16]/70 to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[680px] max-w-7xl items-center px-5 pb-40 pt-32 sm:px-8 md:min-h-[760px] lg:min-h-[820px] lg:px-12">
        <div className="max-w-[640px]">
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.07] py-1.5 pl-1.5 pr-4 backdrop-blur-md"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/90 text-[#062b21]">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold text-white/90">
              AI-Powered Payment Verification
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: "var(--font-display), 'Sora', system-ui, sans-serif" }}
            className="mt-6 text-[clamp(3.25rem,8.5vw,6.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
          >
            <span className="block text-white">Verify, then</span>
            <span className="relative mt-1 inline-block" style={{ color: LIME }}>
              release.
              <svg
                aria-hidden="true"
                viewBox="0 0 300 18"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full sm:h-4"
                fill="none"
              >
                <path
                  d="M3 12 C 60 4, 140 3, 297 9"
                  stroke={LIME}
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 max-w-[500px] text-base leading-7 text-white/85 sm:text-lg sm:leading-8"
          >
            Send money with confidence. Verapay checks every proof, gets your approval, and
            releases funds only when you say so.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/pay/new"
              style={{ backgroundColor: LIME }}
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full px-8 text-sm font-bold text-[#052e1f] shadow-[0_14px_35px_rgba(124,240,90,.28)] transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Start a Payment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/testbench"
              className="inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/[0.06] px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#052e1f]">
                <Play className="h-3 w-3 fill-current" />
              </span>
              Watch Interactive Demo
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-2.5">
              {avatars.map((a) => (
                <span
                  key={a.initials}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0a3a2b] text-[11px] font-bold text-white ${a.bg}`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <p className="text-xs leading-5 text-white/80">
              Built for
              <br />
              <span className="font-bold text-white">Diaspora families & projects</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* White wave into the next section */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 z-10 h-20 w-full sm:h-28"
      >
        <path
          d="M0 70 C 240 10, 520 10, 760 55 C 1000 100, 1220 95, 1440 40 L1440 120 L0 120 Z"
          fill="#ffffff"
        />
      </svg>
    </section>
  );
}