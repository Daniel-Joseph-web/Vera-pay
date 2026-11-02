'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Send,
  Users2,
  Building2,
  ShieldCheck
} from 'lucide-react';

export const BentoNavigation: React.FC = () => {
  const pathname = usePathname() || '';

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Send & Verify', icon: Send, href: '/pay/new' },
    { name: 'Family Hub', icon: Users2, href: '/family' },
    { name: 'Projects Hub', icon: Building2, href: '/projects' },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    if (href === '/pay/new') return pathname.startsWith('/pay');
    if (href === '/family') return pathname.startsWith('/family');
    if (href === '/projects') return pathname.startsWith('/projects');
    return pathname === href;
  };

  return (
    <>
      {/* Desktop Expandable Bento Navigation Sidebar (>= lg) */}
      <div className="hidden lg:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 group">
        <nav className="flex flex-col gap-2 p-2.5 bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl rounded-3xl w-16 hover:w-60 transition-all duration-400 ease-out overflow-hidden">
          
          {/* Brand Root Affordance */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-emerald-50/80 transition-colors group/brand mb-1"
            title="Verapay Home Dashboard"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm flex-shrink-0 group-hover/brand:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 overflow-hidden whitespace-nowrap">
              <span className="font-extrabold text-sm text-slate-900 block leading-tight tracking-tight">Verapay</span>
              <span className="text-[10px] font-bold text-emerald-600 block uppercase tracking-wider">Escrow Hub</span>
            </div>
          </Link>

          <div className="w-full h-px bg-slate-100 my-0.5" />

          {/* Nav Items with Active State Affordance */}
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 whitespace-nowrap relative ${
                  active 
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-extrabold ring-1 ring-emerald-500' 
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/80 font-medium'
                }`}
                title={item.name}
              >
                <item.icon className={`w-6 h-6 flex-shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                <span className="font-bold text-sm opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  {item.name}
                </span>
                {active && (
                  <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Bottom Navigation Bar (< lg) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                active
                  ? 'text-emerald-600 font-extrabold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${active ? 'bg-emerald-100 text-emerald-700' : ''}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
};
