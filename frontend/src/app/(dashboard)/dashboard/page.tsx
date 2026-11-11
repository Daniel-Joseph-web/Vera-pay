'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Zap,
  Award,
  Clock,
  GraduationCap,
  Home,
  Users,
  Lock,
  Upload,
  Plus,
  Headphones,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Landmark,
  LayoutGrid,
  Table2
} from 'lucide-react';
import { BentoNavigation } from '@/components/layout/BentoNavigation';
import { VerapayAGGrid } from '@/components/dashboard/VerapayAGGrid';
import { usePaymentStore } from '@/stores/usePaymentStore';

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<'aggrid' | 'standard'>('aggrid');
  const { protectedBalanceUSD, verifiedCount, transactions } = usePaymentStore();

  const recentPayments = transactions.slice(0, 3).map((tx) => ({
    id: tx.id,
    date: tx.date,
    description: tx.description,
    amount: tx.amount,
    status: tx.status,
    icon: tx.category === 'Education' ? GraduationCap : tx.category === 'Healthcare' ? Users : Home,
    iconColor: tx.status === 'Verified' ? 'text-emerald-600' : tx.status === 'Refunded' ? 'text-rose-600' : 'text-blue-600',
    iconBg: tx.status === 'Verified' ? 'bg-emerald-100' : tx.status === 'Refunded' ? 'bg-rose-100' : 'bg-blue-100',
  }));

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
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, Adeze!
            </h1>
            <p className="text-slate-600 dark:text-[#94A3B8] mt-2 text-sm sm:text-base font-medium">
              Your payments and projects are secured with Verapay.
            </p>
          </div>

          {/* Top Right Badges */}
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-1.5 bg-cyan-50 dark:bg-cyan-950/40 px-4 py-2 rounded-full border border-cyan-100 dark:border-cyan-800 shadow-sm cursor-pointer hover:bg-cyan-100 transition-colors">
                <Zap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-bold text-cyan-900 dark:text-cyan-300">Verapay Plus</span>
             </div>
             
             <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-slate-700 dark:text-emerald-300 font-bold flex items-center justify-center text-sm border border-emerald-100 dark:border-emerald-800 shadow-sm">
               AD
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-6 relative z-30">
        
        {/* Top Metric Cards (Updated to 2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Protected in Verapay */}
          <div className="bg-white dark:bg-[#0E1626] rounded-2xl p-6 border border-slate-100 dark:border-[#1E2D4A] shadow-sm relative overflow-hidden flex flex-col justify-between transition-colors">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 60 C 20 40, 40 50, 60 30 C 80 10, 100 20, 120 0 L 120 60 Z" fill="#10B981"/>
              </svg>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-600 dark:text-[#94A3B8]">Protected in Vera pay</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  ${protectedBalanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 ml-2">
                    (₦{(protectedBalanceUSD * 1650).toLocaleString()})
                  </span>
                </h3>
                <div className="mt-3 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> {transactions.filter(t => t.status === 'Verifying').length || 3} Payments Active
                </div>
              </div>
            </div>
          </div>

          {/* Verified Payments */}
          <div className="bg-[#FFF9F0] dark:bg-[#0E1626] rounded-2xl p-6 border border-orange-100 dark:border-[#1E2D4A] shadow-sm relative overflow-hidden flex flex-col justify-between transition-colors">
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-end gap-1.5 opacity-60">
                <div className="w-2.5 bg-amber-300 rounded-t-sm h-4"></div>
                <div className="w-2.5 bg-amber-300 rounded-t-sm h-6"></div>
                <div className="w-2.5 bg-amber-400 rounded-t-sm h-9"></div>
                <div className="w-2.5 bg-amber-500 rounded-t-sm h-12"></div>
            </div>
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-amber-500 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-600 dark:text-[#94A3B8]">Verified Payments</p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{verifiedCount}</h3>
                <div className="mt-3 flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +2 this month
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (Recent Payments & Projects) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Recent Payments Table / AG Grid Enterprise */}
            <div className="bg-white dark:bg-[#0E1626] rounded-2xl border border-slate-100 dark:border-[#1E2D4A] shadow-sm p-6 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Recent Payments</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Real-time ledger with AI fraud scores & PayPal settlements</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* View Mode Toggle */}
                  <div className="inline-flex items-center bg-slate-100 dark:bg-[#070B12] p-1 rounded-xl border border-slate-200 dark:border-[#1E2D4A]">
                    <button
                      onClick={() => setViewMode('aggrid')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                        viewMode === 'aggrid'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      AG Grid
                    </button>
                    <button
                      onClick={() => setViewMode('standard')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                        viewMode === 'standard'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Table2 className="w-3.5 h-3.5" />
                      Standard
                    </button>
                  </div>

                  <Link href="/pay/new" className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1">
                    New <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {viewMode === 'aggrid' ? (
                <VerapayAGGrid />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-slate-500 dark:text-[#94A3B8] border-b border-slate-100 dark:border-[#1E2D4A]">
                        <th className="pb-3 font-semibold whitespace-nowrap">Date</th>
                        <th className="pb-3 font-semibold whitespace-nowrap">Description</th>
                        <th className="pb-3 font-semibold whitespace-nowrap">Amount</th>
                        <th className="pb-3 font-semibold whitespace-nowrap">Status</th>
                        <th className="pb-3 font-semibold whitespace-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-[#1E2D4A]">
                      {recentPayments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-slate-50/50 dark:hover:bg-[#162238]/50 transition-colors">
                          <td className="py-4 text-slate-500 dark:text-[#94A3B8] whitespace-nowrap font-medium">{payment.date}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${payment.iconBg} dark:bg-emerald-950/60`}>
                                <payment.icon className={`w-4 h-4 ${payment.iconColor} dark:text-emerald-400`} />
                              </div>
                              <span className="font-semibold text-slate-800 dark:text-[#E2E8F0]">{payment.description}</span>
                            </div>
                          </td>
                          <td className="py-4 font-bold text-slate-900 dark:text-white">₦{payment.amount.toLocaleString()}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                              payment.status === 'Verified' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                                : 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
                            }`}>
                              {payment.status === 'Verified' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-4">
                            <Link 
                              href={
                                payment.id === 'pay_school_fees' 
                                  ? '/pay/pay_school_fees/verify?scenario=green' 
                                  : payment.id === 'pay_project_milestone' 
                                  ? '/projects/proj-881' 
                                  : '/family'
                              } 
                              className="inline-flex items-center justify-center px-4 py-1.5 border border-slate-200 dark:border-[#1E2D4A] rounded-lg text-xs font-semibold text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-50 dark:hover:bg-[#162238] hover:text-slate-900 dark:hover:text-white transition-colors bg-white dark:bg-[#070B12] shadow-sm"
                            >
                              View <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Your Projects */}
            <div className="bg-white dark:bg-[#0E1626] rounded-2xl border border-slate-100 dark:border-[#1E2D4A] shadow-sm p-6 transition-colors">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center">
                    <Landmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Projects</h2>
                </div>
                <Link href="/projects" className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1">
                  View All Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#070B12] border border-slate-100 dark:border-[#1E2D4A] transition-colors">
                <div className="w-full sm:w-48 h-32 rounded-lg overflow-hidden relative flex-shrink-0">
                  <img src="/image_5c02a4.png" alt="Project Site" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 w-full">
                  <span className="inline-block px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-transparent dark:border-emerald-800 text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                    In Progress
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">4-Bedroom Duplex in Ibadan</h3>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-slate-200 dark:bg-[#1E2D4A] h-2.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full w-[65%]"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-600 dark:text-[#94A3B8]">65% Complete</span>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex sm:flex-col items-center justify-between sm:items-end sm:justify-center pt-4 sm:pt-0 sm:pl-6 sm:border-l border-slate-200 dark:border-[#1E2D4A]">
                  <div className="text-left sm:text-right mb-0 sm:mb-2">
                    <div className="text-lg font-bold text-slate-900 dark:text-white">₦45,000,000</div>
                    <div className="text-xs text-slate-500 dark:text-[#94A3B8] font-medium mt-0.5">Stage: Roofing</div>
                  </div>
                  <Link href="/projects/proj-881" className="w-10 h-10 rounded-full bg-white dark:bg-[#0E1626] border border-slate-200 dark:border-[#1E2D4A] flex items-center justify-center text-slate-600 dark:text-[#CBD5E1] hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-600 transition-colors shadow-sm">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Actions & Security) */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white dark:bg-[#0E1626] rounded-2xl border border-slate-100 dark:border-[#1E2D4A] shadow-sm p-6 transition-colors">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center">
                   <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Quick Actions</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <Link href="/pay/new" className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#070B12] border border-slate-100 dark:border-[#1E2D4A] rounded-xl hover:border-emerald-200 dark:hover:border-emerald-600 transition-all group text-center shadow-sm">
                  <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/60 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-105 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-[#CBD5E1] leading-tight">Start<br/>Verification</span>
                </Link>
                
                <Link href="/projects" className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#070B12] border border-slate-100 dark:border-[#1E2D4A] rounded-xl hover:border-emerald-200 dark:hover:border-emerald-600 transition-all group text-center shadow-sm">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-2 group-hover:scale-105 transition-transform shadow-sm">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-[#CBD5E1] leading-tight">Manage<br/>Projects</span>
                </Link>
                
                <Link href="/family" className="flex flex-col items-center justify-center p-4 bg-white dark:bg-[#070B12] border border-slate-100 dark:border-[#1E2D4A] rounded-xl hover:border-emerald-200 dark:hover:border-emerald-600 transition-all group text-center shadow-sm">
                  <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/60 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2 group-hover:scale-105 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-[#CBD5E1] leading-tight">Manage<br/>Family</span>
                </Link>
              </div>
            </div>

            {/* Security Banner */}
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-[#0E1626] dark:to-[#09111D] rounded-2xl p-6 border border-emerald-100 dark:border-[#1E2D4A] shadow-sm relative overflow-hidden transition-colors">
               <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 opacity-20">
                  <Lock className="w-24 h-24 text-emerald-600 dark:text-emerald-400" />
               </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Account is Secure</h3>
                <p className="text-sm text-emerald-900/80 dark:text-[#94A3B8] mt-1 mb-6 pr-8 leading-relaxed font-medium">
                  All transactions are verified with advanced security.
                </p>
                <Link href="/pay/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-emerald-500 text-emerald-700 dark:text-slate-950 text-sm font-bold rounded-full shadow-sm hover:shadow border border-emerald-100 dark:border-emerald-400 transition-all">
                  Start Protected Transfer <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-gradient-to-r from-emerald-50 to-white dark:from-[#0E1626] dark:to-[#070B12] rounded-2xl p-6 border border-emerald-100 dark:border-[#1E2D4A] shadow-sm flex items-center gap-4 transition-colors">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Headphones className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Need Help?</h4>
                <p className="text-xs text-slate-500 dark:text-[#94A3B8] font-medium mt-0.5 mb-2">Our support team is always here for you.</p>
                <button className="text-xs font-bold px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-[#162238] text-emerald-700 dark:text-emerald-300 flex items-center gap-1 hover:bg-emerald-50 dark:hover:bg-[#1E2D4A] transition-colors w-max">
                  Contact Support <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}