'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  ShieldCheck, 
  Calendar, 
  Star, 
  Clock, 
  UserPlus, 
  CheckCircle2, 
  Share2, 
  ArrowRight, 
  Settings, 
  Plus,
  Building2,
  X,
  Mail,
  Copy
} from 'lucide-react';
import { BentoNavigation } from '@/components/layout/BentoNavigation';

export default function FamilyGroupPage() {
  const [activePane, setActivePane] = useState<'invite' | 'manage' | null>(null);

  // Data for the Manage Group slide-over
  const contributors = [
    { id: '1', name: 'Tunde Balogun', location: 'Manchester, UK', amount: 400, date: '2 days ago', initials: 'TB', role: 'Admin' },
    { id: '2', name: 'Folake Balogun', location: 'Toronto, Canada', amount: 300, date: 'Yesterday', initials: 'FB', role: 'Member' },
    { id: '3', name: 'Emeka Balogun', location: 'Houston, USA', amount: 200, date: 'Today', initials: 'EB', role: 'Member' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B12] pb-24 lg:pb-10 font-sans transition-colors">
      
      {/* Bento Navigation with Active State & Root Affordance */}
      <BentoNavigation />

      {/* Main Content Wrapper */}
      <div className="lg:pl-24">
        
        {/* Header Section */}
        <div className="relative bg-white dark:bg-[#0E1626] pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-[#1E2D4A] overflow-hidden transition-colors">
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#F0FDF8] via-[#E6F8EF] to-[#D1F4E0] dark:from-[#070B12]/80 dark:via-[#0E1626]/80 dark:to-[#070B12]/80 opacity-80 pointer-events-none"></div>
          
          {/* Family Photo Integration */}
          <div 
            className="absolute right-0 top-0 h-full w-[80%] sm:w-[60%] lg:w-[50%] z-0 pointer-events-none"
            style={{ 
              backgroundImage: 'url(/image_3f491c.webp)', 
              backgroundPosition: 'center center', 
              backgroundSize: 'cover',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
            }}
          ></div>

          <div className="max-w-7xl mx-auto relative z-10 flex justify-between items-center">
            <div className="max-w-xl py-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] dark:text-white tracking-tight">
                Family & Friends
              </h1>
              <p className="text-slate-600 dark:text-[#94A3B8] mt-2 text-sm sm:text-base font-medium">
                Manage your family group, add trusted contacts, and share access securely.
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6 relative z-20">
          
          {/* Top 3 Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white dark:bg-[#0E1626] rounded-2xl p-6 border border-slate-200 dark:border-[#1E2D4A] shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600 dark:text-[#94A3B8] uppercase tracking-wider">Family Group Members</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">4</h3>
                <div className="mt-1 flex items-center text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                  <span className="text-emerald-600 dark:text-emerald-400 mr-1">↑</span> +1 this month
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0E1626] rounded-2xl p-6 border border-slate-200 dark:border-[#1E2D4A] shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600 dark:text-[#94A3B8] uppercase tracking-wider">Shared Access</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">3</h3>
                <div className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-[#94A3B8]">
                  Active Connections
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#0E1626] rounded-2xl p-6 border border-slate-200 dark:border-[#1E2D4A] shadow-sm flex items-start gap-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-600 dark:text-[#94A3B8] uppercase tracking-wider">Last Activity</p>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">Today</h3>
                <div className="mt-1 text-[11px] font-semibold text-slate-500 dark:text-[#94A3B8]">
                  2 activities
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section: Family Group & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Your Family Group */}
            <div className="lg:col-span-2 bg-white dark:bg-[#0E1626] rounded-2xl border border-slate-200 dark:border-[#1E2D4A] shadow-sm p-6 flex flex-col justify-between transition-colors">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Family Group</h2>
                </div>
                <button 
                  onClick={() => setActivePane('manage')}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1.5 rounded-full transition-colors border border-emerald-200 dark:border-emerald-800"
                >
                  Manage Group <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-extrabold text-lg flex items-center justify-center border-2 border-white dark:border-[#0E1626] shadow-sm ring-2 ring-emerald-100 dark:ring-emerald-900">
                      JD
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">Admin</span>
                  </div>
                  
                  <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-[#162238] text-emerald-700 dark:text-emerald-300 font-bold text-lg flex items-center justify-center border-2 border-slate-100 dark:border-[#1E2D4A] shadow-sm mb-5">
                    TB
                  </div>
                  <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-[#162238] text-emerald-700 dark:text-emerald-300 font-bold text-lg flex items-center justify-center border-2 border-slate-100 dark:border-[#1E2D4A] shadow-sm mb-5">
                    FB
                  </div>
                  <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-[#162238] text-emerald-700 dark:text-emerald-300 font-bold text-lg flex items-center justify-center border-2 border-slate-100 dark:border-[#1E2D4A] shadow-sm mb-5">
                    EB
                  </div>
                  
                  {/* Invite Button */}
                  <button 
                    onClick={() => setActivePane('invite')}
                    className="flex flex-col items-center gap-1.5 group mb-5"
                  >
                    <div className="w-14 h-14 rounded-full bg-slate-50 dark:bg-[#070B12] border-2 border-dashed border-slate-300 dark:border-[#1E2D4A] text-slate-500 dark:text-[#94A3B8] flex items-center justify-center group-hover:border-emerald-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/40 transition-colors">
                      <Plus className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-[#94A3B8] group-hover:text-emerald-700 dark:group-hover:text-emerald-400">Invite Member</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 bg-emerald-50 dark:bg-[#070B12] border border-emerald-200 dark:border-[#1E2D4A] rounded-2xl p-4 w-full sm:w-auto shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md text-white">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Family Group Active</h4>
                    <p className="text-xs text-slate-700 dark:text-[#CBD5E1] mt-0.5 max-w-[160px] leading-tight font-medium">
                      Your family group is secure and up to date.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1 bg-white dark:bg-[#0E1626] rounded-2xl border border-slate-200 dark:border-[#1E2D4A] shadow-sm p-6 transition-colors">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Quick Actions</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setActivePane('invite')}
                  className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] rounded-xl hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-[#162238] hover:shadow-sm transition-all group h-full"
                >
                  <div className="w-12 h-12 bg-white dark:bg-[#0E1626] shadow-sm rounded-full flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-[#CBD5E1] leading-tight">Invite<br/>Member</span>
                </button>
                
                <button 
                  onClick={() => setActivePane('manage')}
                  className="flex flex-col items-center justify-center text-center p-4 bg-slate-50 dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] rounded-xl hover:border-emerald-300 dark:hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-[#162238] hover:shadow-sm transition-all group h-full"
                >
                  <div className="w-12 h-12 bg-white dark:bg-[#0E1626] shadow-sm rounded-full flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                    <Settings className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-[#CBD5E1] leading-tight">Manage<br/>Group</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section: Recent Activity & Share with confidence */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white dark:bg-[#0E1626] rounded-2xl border border-slate-200 dark:border-[#1E2D4A] shadow-sm p-6 transition-colors">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity</h2>
                </div>
                <Link href="#" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 flex items-center gap-1 transition-colors">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-[#162238]/50 rounded-xl transition-colors border border-transparent hover:border-slate-100 dark:hover:border-[#1E2D4A]">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-[#E2E8F0]">You invited Tunde Balogun to your family group</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-[#94A3B8] whitespace-nowrap">2 hours ago</span>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-[#162238]/50 rounded-xl transition-colors border border-transparent hover:border-slate-100 dark:hover:border-[#1E2D4A]">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-800 dark:text-[#E2E8F0]">Folake Balogun accepted your invitation</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-[#94A3B8] whitespace-nowrap">1 day ago</span>
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-[#162238]/50 rounded-xl transition-colors border border-transparent hover:border-slate-100 dark:hover:border-[#1E2D4A]">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-800">Access shared with Emeka Balogun</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap">2 days ago</span>
                </div>
              </div>
            </div>

            {/* Share with confidence */}
            <div className="lg:col-span-1 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-[#0E1626] dark:to-[#09111D] rounded-2xl border border-emerald-300 dark:border-[#1E2D4A] shadow-sm p-6 relative overflow-hidden flex flex-col justify-center transition-colors">
              <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-400/30 dark:bg-emerald-500/10 rounded-full blur-2xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-emerald-700 dark:bg-emerald-600 text-white flex items-center justify-center shadow-md mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">Share with confidence</h3>
                <p className="text-sm text-slate-800 dark:text-[#CBD5E1] font-medium leading-relaxed mb-5">
                  Keep your loved ones close while maintaining control.
                </p>
                <button className="text-xs font-bold px-5 py-2.5 rounded-full border-2 border-emerald-700 dark:border-emerald-400 text-emerald-800 dark:text-emerald-300 bg-white/50 dark:bg-[#162238] hover:bg-emerald-700 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-slate-950 hover:border-emerald-700 transition-all flex items-center gap-1.5 w-max shadow-sm">
                  Learn More <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Slide-over Backdrop */}
      {activePane && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity" 
          onClick={() => setActivePane(null)}
        />
      )}

      {/* Slide-over Side Pane */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white dark:bg-[#0E1626] shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-transparent dark:border-[#1E2D4A] ${
          activePane ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-[#1E2D4A] bg-slate-50/50 dark:bg-[#070B12]/50">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            {activePane === 'manage' && <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            {activePane === 'invite' && <UserPlus className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            {activePane === 'manage' ? 'Manage Group & Contributions' : 'Invite Family Member'}
          </h2>
          <button 
            onClick={() => setActivePane(null)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/60 dark:bg-[#162238] text-slate-500 dark:text-[#94A3B8] hover:bg-slate-200 dark:hover:bg-[#1E2D4A] hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          
          {/* MANAGE GROUP PANE */}
          {activePane === 'manage' && (
            <div className="space-y-6">
              
              <div className="bg-emerald-50 dark:bg-[#070B12] border border-emerald-100 dark:border-[#1E2D4A] rounded-2xl p-5 shadow-sm text-center">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">Total Family Contributions</span>
                <div className="text-3xl font-black text-slate-900 dark:text-white">$900.00</div>
                <div className="mt-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-300 bg-emerald-100/50 dark:bg-emerald-950/60 inline-block px-3 py-1 rounded-full border border-transparent dark:border-emerald-800">
                  Dad's Eye Surgery Pot
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 border-b border-slate-100 dark:border-[#1E2D4A] pb-2">Active Members</h3>
                <div className="space-y-3">
                  {contributors.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-white dark:bg-[#070B12] border border-slate-100 dark:border-[#1E2D4A] rounded-2xl hover:border-emerald-200 dark:hover:border-emerald-600 transition-colors shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-extrabold flex items-center justify-center flex-shrink-0">
                          {member.initials}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                            {member.name}
                            {member.role === 'Admin' && (
                              <span className="text-[9px] uppercase tracking-wider font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-transparent dark:border-emerald-800">Admin</span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-[#94A3B8]">{member.location}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-emerald-700 dark:text-emerald-400 text-sm">${member.amount}</div>
                        <div className="text-[10px] text-slate-400 dark:text-[#94A3B8] font-medium">{member.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="w-full py-3 bg-white dark:bg-[#070B12] border-2 border-slate-200 dark:border-[#1E2D4A] text-slate-700 dark:text-[#CBD5E1] hover:border-emerald-600 hover:text-emerald-700 dark:hover:border-emerald-500 dark:hover:text-emerald-300 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                Download Contribution Report
              </button>
            </div>
          )}

          {/* INVITE MEMBER PANE */}
          {activePane === 'invite' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Send an Email Invite</h3>
                <p className="text-xs text-slate-500 dark:text-[#94A3B8] mb-4">
                  Add a family member to your transparent ledger group. They will need to verify their identity upon joining.
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-[#CBD5E1] uppercase tracking-wide block mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-[#94A3B8]" />
                      <input 
                        type="email" 
                        placeholder="uncle.emeka@example.com"
                        className="w-full pl-9 pr-4 py-3 bg-white dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] rounded-xl text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                  <button className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm mt-2">
                    Send Invitation
                  </button>
                </div>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-[#1E2D4A]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white dark:bg-[#0E1626] text-xs font-bold text-slate-400 dark:text-[#94A3B8] uppercase tracking-wider">Or</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Share Invite Link</h3>
                <p className="text-xs text-slate-500 dark:text-[#94A3B8] mb-4">
                  Copy this private link and send it directly via WhatsApp or SMS.
                </p>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly
                    value="https://verapay.io/join/f-82A9xZ"
                    className="flex-1 px-4 py-3 bg-slate-50 dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] rounded-xl text-sm font-medium text-slate-600 dark:text-[#CBD5E1] focus:outline-none"
                  />
                  <button className="p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900 rounded-xl transition-colors shadow-sm flex-shrink-0" title="Copy Link">
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}