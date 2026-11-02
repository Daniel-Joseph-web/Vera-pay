'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  ChevronDown,
  LayoutDashboard,
  Menu,
  Send,
  Sparkles,
  Users2,
  X,
} from 'lucide-react';
import { VerapayLogo } from '@/components/brand/VerapayLogo';

const LIME = '#7CF05A';

// Marketing links, shown on the home page only
const marketingLinks = [
  { href: '/', label: 'Home' },
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#use-cases', label: 'Use Cases' },
  { href: '/#support', label: 'Support' },
];

// App links, shown everywhere else
const appLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pay/new', label: 'Send & Verify', icon: Send },
  { href: '/family', label: 'Family Hub', icon: Users2 },
  { href: '/projects/proj-881', label: 'Projects Hub', icon: Building2 },
];

const demoItems = [
  { href: '/pay/pay_school_fees/verify?scenario=green', dot: 'bg-emerald-400', title: 'Scene 1: School Fees (Green)', sub: 'Ada Okonkwo tuition • CAC check & instant release' },
  { href: '/pay/pay_padded_cement/verify?scenario=amber', dot: 'bg-amber-300', title: 'Scene 2: Quote Agent Catch (Amber)', sub: 'Cement quoted +24% • Switch to local supplier' },
  { href: '/pay/pay_reused_photo/verify?scenario=red', dot: 'bg-rose-400', title: 'Scene 3: Fraud Caught (Red)', sub: 'Reused roof photo • 1-click PayPal 100% refund' },
  { href: '/family', dot: 'bg-white/40', title: 'Scene 4: Verapay Plus Family Pot', sub: "Siblings chip in for Dad's surgery at LUTH", divider: true },
  { href: '/contractor/upload/demo-token', dot: 'bg-white/40', title: 'Scene 5: Contractor Mobile Cam', sub: 'Live GPS watermarking & 15s surprise video', external: true },
];

// MUST BE A NAMED EXPORT: export const Navbar
export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState('');

  const isHomePage = pathname === '/';

  // Track scroll position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active URL hash for the marketing links
  useEffect(() => {
    setCurrentHash(window.location.hash);
    const handleHashChange = () => setCurrentHash(window.location.hash);
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname, currentHash]);

  // Hide the global Navbar on app pages that have their own custom layout sidebars/headers.
  // Using startsWith for '/projects' ensures both the hub and the dynamic ID pages are hidden.
  const isHiddenRoute = 
    pathname === '/dashboard' || 
    pathname === '/family' || 
    pathname === '/pay/new' || 
    pathname.startsWith('/projects');

  if (isHiddenRoute) {
    return null;
  }

  const position = isHomePage ? 'fixed inset-x-0 top-0' : 'sticky top-0';
  const surface =
    scrolled || !isHomePage || mobileOpen
      ? 'bg-[#061b16]/85 backdrop-blur-xl border-b border-white/[0.06]'
      : 'bg-transparent border-b border-transparent';

  const isMarketingLinkActive = (href: string) => {
    if (href === '/') return currentHash === '';
    return href === `/${currentHash}`;
  };

  return (
    <header className={`${position} z-50 w-full transition-all duration-300 ${surface}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-10">
          <Link 
            href="/" 
            onClick={() => setCurrentHash('')} 
            className="transition-opacity hover:opacity-90"
          >
            <VerapayLogo variant="white-on-green" size={38} showTagline={false} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {isHomePage
              ? marketingLinks.map(({ href, label }) => {
                  const isActive = isMarketingLinkActive(href);
                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setCurrentHash(href.replace('/', ''))}
                      className="relative px-4 py-2 text-sm font-semibold text-white/80 transition hover:text-white"
                    >
                      <span className={isActive ? 'text-white' : ''}>{label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full"
                          style={{ backgroundColor: LIME }}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })
              : appLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-all ${
                      pathname === href
                        ? 'bg-white/10 text-white'
                        : 'text-white/70 hover:bg-white/[0.07] hover:text-white'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 text-white/50" />
                    {label}
                  </Link>
                ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {!isHomePage && (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setShowDemoMenu(!showDemoMenu)}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-white/70 transition-all hover:bg-white/[0.07] hover:text-white"
              >
                <Sparkles className="h-3.5 w-3.5 text-white/50" />
                <span>Judge Scenarios</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-white/50 transition-transform duration-200 ${
                    showDemoMenu ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {showDemoMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-white/10 bg-[#071f19]/95 p-2 text-xs text-white shadow-2xl shadow-black/40 backdrop-blur-2xl"
                    onMouseLeave={() => setShowDemoMenu(false)}
                  >
                    <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-white/50">
                      <span>3-Minute Demo Presets</span>
                      <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/70">LIVE</span>
                    </div>
                    <div className="mt-1 space-y-1">
                      {demoItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          target={item.external ? '_blank' : undefined}
                          onClick={() => setShowDemoMenu(false)}
                          className={`group flex items-start gap-2.5 rounded-xl p-2.5 transition-colors hover:bg-white/[0.07] ${
                            item.divider ? 'border-t border-white/10' : ''
                          }`}
                        >
                          <span className={`mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full transition-transform group-hover:scale-125 ${item.dot}`} />
                          <div>
                            <div className="font-semibold text-white">{item.title}</div>
                            <div className="text-[11px] text-white/50">{item.sub}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <Link
            href="/pay/new"
            style={{ backgroundColor: LIME }}
            className="group flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-[#052e1f] shadow-[0_8px_24px_rgba(124,240,90,.22)] transition hover:brightness-110 active:scale-95"
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-white/[0.06] px-5 pb-5 pt-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {(isHomePage ? marketingLinks : appLinks).map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setCurrentHash(l.href.replace('/', ''))}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.07]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};