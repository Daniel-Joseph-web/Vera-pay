'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Award,
  Clock,
  Home,
  Users,
  Lock,
  Upload,
  Plus,
  Headphones,
  ArrowRight,
  TrendingUp,
  Landmark,
  FlaskConical,
  Camera,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { BentoNavigation } from '@/components/layout/BentoNavigation';
import { VerapayAGGrid } from '@/components/dashboard/VerapayAGGrid';
import { usePaymentStore } from '@/stores/usePaymentStore';

export default function DashboardPage() {
  const { protectedBalanceUSD, verifiedCount, transactions } = usePaymentStore();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B12] text-slate-900 dark:text-[#F8FAFC] pb-24 lg:pb-10 font-sans lg:pl-20 transition-colors">
      {/* Bento Navigation with Active State & Root Affordance */}
      <BentoNavigation />

      {/* Hero / Header Section */}
      <div className="relative bg-white dark:bg-[#0A101C] pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-100/80 dark:border-[#1E2D4A] transition-colors">
        
        {/* Header Background & Image Integration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/40 dark:from-emerald-950/20 dark:via-transparent dark:to-transparent z-0"></div>
          
          <div 
            className="absolute top-0 right-0 w-full sm:w-[65%] lg:w-[55%] h-full z-0 opacity-80 dark:opacity-40"
            style={{
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)'
            }}
          >
            <img 
              src="/image_5c02a4.png" 
              alt="Header Background Buildings" 
              className="w-full h-full object-cover object-center" 
            />
          </div>
          
          <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-bl from-emerald-400/20 via-emerald-100/10 to-transparent z-10 mix-blend-multiply"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-20 flex justify-between items-start">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome back, Adeze!
            </h1>
            <p className="text-slate-600 dark:text-[#94A3B8] mt-2 text-base sm:text-lg font-medium">
              Your payments, escrow vault, and construction milestones are fully protected.
            </p>
          </div>

          {/* Top Right Badges */}
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 bg-cyan-50 dark:bg-cyan-950/40 px-5 py-2.5 rounded-full border border-cyan-100 dark:border-cyan-800 shadow-sm cursor-pointer hover:bg-cyan-100 transition-colors">
                <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <span className="text-sm font-black text-cyan-900 dark:text-cyan-300">Verapay Plus</span>
             </div>
             
             <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-slate-800 dark:text-emerald-300 font-black flex items-center justify-center text-base border border-emerald-100 dark:border-emerald-800 shadow-sm">
               AD
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-8 relative z-30">
        
        {/* Quick Demo Scenarios Control Center */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-indigo-500/30">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-white">Live Demo & Test Bench Scenarios</h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">1-Click Launch</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">Jump directly into any forensic verification test or simulated fraud audit:</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/testbench"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm"
              >
                <FlaskConical className="w-3.5 h-3.5" /> All-in-One AI Lab
              </Link>
              <Link
                href="/contractor/upload/demo-token"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
              >
                <Camera className="w-3.5 h-3.5" /> Contractor Cam
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Scene 1: School Fees */}
            <Link
              href="/pay/pay_school_fees/verify?scenario=green"
              className="group flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-400 tracking-wider uppercase">Scene 1 • Green</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-300 transition-all" />
                </div>
                <p className="text-sm font-bold text-white truncate mt-0.5">Adaeze Tuition ($400)</p>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">CAC & bank match • Auto-payout</p>
              </div>
            </Link>

            {/* Scene 2: Quote Radar */}
            <Link
              href="/pay/pay_padded_cement/verify?scenario=amber"
              className="group flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-amber-500/10 border border-amber-500/30 hover:border-amber-400 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-amber-400 tracking-wider uppercase">Scene 2 • Amber</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-amber-300 transition-all" />
                </div>
                <p className="text-sm font-bold text-white truncate mt-0.5">Padded Cement Quote</p>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">+67% markup detected • Escrow locked</p>
              </div>
            </Link>

            {/* Scene 3: Reused Photo */}
            <Link
              href="/pay/pay_reused_photo/verify?scenario=red"
              className="group flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-rose-500/10 border border-rose-500/30 hover:border-rose-400 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <XCircle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-rose-400 tracking-wider uppercase">Scene 3 • Red</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-rose-300 transition-all" />
                </div>
                <p className="text-sm font-bold text-white truncate mt-0.5">Duplicate Site Photo</p>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">Perceptual hash clone • 1-click refund</p>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Top Metric Cards (Enlarged Fonts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {/* Protected in Verapay */}
          <div className="bg-white dark:bg-[#0E1626] rounded-3xl p-8 border border-slate-100 dark:border-[#1E2D4A] shadow-sm relative overflow-hidden flex flex-col justify-between transition-colors">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <svg width="140" height="70" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 60 C 20 40, 40 50, 60 30 C 80 10, 100 20, 120 0 L 120 60 Z" fill="#10B981"/>
              </svg>
            </div>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center flex-shrink-0 shadow-inner">
                <ShieldCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-slate-600 dark:text-[#94A3B8]">Protected in Escrow Vault</p>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1.5 tracking-tight">
                  ${protectedBalanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-sm font-bold text-slate-400">USD</span>
                  <span className="text-base font-bold text-slate-500 dark:text-slate-400 ml-3">
                    (&#8358;{(protectedBalanceUSD * 1650).toLocaleString()})
                  </span>
                </h3>
                <div className="mt-4 flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 gap-1.5">
                  <TrendingUp className="w-4 h-4" /> {transactions.filter(t => t.status === 'Verifying').length} Active Payments Locked
                </div>
              </div>
            </div>
          </div>

          {/* Verified Payments */}
          <div className="bg-[#FFF9F0] dark:bg-[#0E1626] rounded-3xl p-8 border border-orange-100 dark:border-[#1E2D4A] shadow-sm relative overflow-hidden flex flex-col justify-between transition-colors">
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-end gap-2 opacity-60">
                <div className="w-3 bg-amber-300 rounded-t-sm h-5"></div>
                <div className="w-3 bg-amber-300 rounded-t-sm h-8"></div>
                <div className="w-3 bg-amber-400 rounded-t-sm h-12"></div>
                <div className="w-3 bg-amber-500 rounded-t-sm h-16"></div>
            </div>
            <div className="flex items-start gap-5 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center flex-shrink-0 shadow-inner">
                <Award className="w-8 h-8 text-amber-500 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-base font-bold text-slate-600 dark:text-[#94A3B8]">Verified Payments Released</p>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1.5">{verifiedCount}</h3>
                <div className="mt-4 flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 gap-1.5">
                  <TrendingUp className="w-4 h-4" /> 100% Verification Accuracy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary AG Grid Enterprise Forensic Ledger */}
        <div className="bg-white dark:bg-[#0E1626] rounded-3xl border border-slate-100 dark:border-[#1E2D4A] shadow-sm p-6 sm:p-8 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center shadow-inner">
                <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Audit & Payment Ledger</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Real-time payment ledger with AI fraud inspection & PayPal settlements</p>
              </div>
            </div>

            <Link href="/pay/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all w-fit">
              New Payment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <VerapayAGGrid />
        </div>

        {/* Secondary Grid (Projects & Quick Actions) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Projects Card */}
          <div className="lg:col-span-2 bg-white dark:bg-[#0E1626] rounded-3xl border border-slate-100 dark:border-[#1E2D4A] shadow-sm p-6 sm:p-8 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">Active Construction Milestones</h2>
              </div>
              <Link href="/projects" className="text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#070B12] border border-slate-100 dark:border-[#1E2D4A] transition-colors">
              <div className="w-full sm:w-52 h-36 rounded-xl overflow-hidden relative flex-shrink-0 shadow-sm">
                <img src="/image_5c02a4.png" alt="Project Site" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 w-full">
                <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-transparent dark:border-emerald-800 text-xs font-bold uppercase tracking-wider rounded-md mb-2">
                  In Progress
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4-Bedroom Duplex in Ibadan</h3>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-slate-200 dark:bg-[#1E2D4A] h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[40%]"></div>
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-[#CBD5E1]">40% Complete</span>
                </div>
              </div>

              <div className="w-full sm:w-auto flex sm:flex-col items-center justify-between sm:items-end sm:justify-center pt-4 sm:pt-0 sm:pl-6 sm:border-l border-slate-200 dark:border-[#1E2D4A]">
                <div className="text-left sm:text-right mb-0 sm:mb-3">
                  <div className="text-xl font-black text-slate-900 dark:text-white">&#8358;25,575,000</div>
                  <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold mt-0.5">Stage: Blockwork to Lintel ($15,500 Total)</div>
                </div>
                <Link href="/projects/proj-881" className="w-11 h-11 rounded-2xl bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-[#1E2D4A] flex items-center justify-center text-slate-600 dark:text-[#CBD5E1] hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-600 transition-colors shadow-sm">
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions & Escrow Security Card */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0E1626] rounded-3xl border border-slate-100 dark:border-[#1E2D4A] shadow-sm p-6 sm:p-8 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center">
                   <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Quick Actions</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <Link href="/pay/new" className="flex flex-col items-center justify-center p-4 bg-[#F8FAFC] dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] rounded-2xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group text-center shadow-sm">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-105 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-[#CBD5E1] leading-tight">Start<br/>Payment</span>
                </Link>
                
                <Link href="/projects" className="flex flex-col items-center justify-center p-4 bg-[#F8FAFC] dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] rounded-2xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group text-center shadow-sm">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white mb-2 group-hover:scale-105 transition-transform shadow-sm">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-[#CBD5E1] leading-tight">Manage<br/>Projects</span>
                </Link>
                
                <Link href="/family" className="flex flex-col items-center justify-center p-4 bg-[#F8FAFC] dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] rounded-2xl hover:border-emerald-400 dark:hover:border-emerald-500 transition-all group text-center shadow-sm">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-[#CBD5E1] leading-tight">Manage<br/>Family</span>
                </Link>
              </div>
            </div>

            {/* Escrow Guarantee Banner */}
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-[#0E1626] dark:to-[#09111D] rounded-3xl p-7 border border-emerald-100 dark:border-[#1E2D4A] shadow-sm relative overflow-hidden transition-colors">
               <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 opacity-20">
                  <Lock className="w-28 h-28 text-emerald-600 dark:text-emerald-400" />
               </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Funds Protected by Escrow</h3>
                <p className="text-sm text-emerald-950/80 dark:text-[#94A3B8] mt-2 mb-6 pr-6 leading-relaxed font-semibold">
                  Beneficiaries and contractors never get paid upfront. Payouts are released only after ground truth verification.
                </p>
                <Link href="/pay/new" className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-emerald-600 text-emerald-700 dark:text-white text-sm font-bold rounded-2xl shadow-sm hover:shadow border border-emerald-100 dark:border-emerald-500 transition-all">
                  Deposit to Escrow <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}