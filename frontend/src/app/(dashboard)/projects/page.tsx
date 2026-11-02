'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building,
  MapPin,
  ArrowRight,
  Plus,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { BentoNavigation } from '@/components/layout/BentoNavigation';

export default function ProjectsHubPage() {
  const projects = [
    {
      id: 'proj-881',
      title: '4-Bedroom Duplex',
      location: 'Moniya Estate, Ibadan',
      contractor: 'Engr. Kayode',
      budgetUSD: 15500,
      spentUSD: 2500,
      status: 'Active',
      currentStage: 'Blockwork to Lintel',
      progress: 40,
    },
    {
      id: 'proj-882',
      title: 'Community Borehole',
      location: 'Surulere, Lagos',
      contractor: 'AquaTech Drillers Ltd',
      budgetUSD: 1200,
      spentUSD: 1200,
      status: 'Completed',
      currentStage: 'Handover & Testing',
      progress: 100,
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 lg:pb-10 font-sans lg:pl-24">
      
      {/* Bento Navigation with Active State & Root Affordance */}
      <BentoNavigation />

      {/* Header Section */}
      <div className="relative bg-white pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 via-white to-slate-50/50 z-0"></div>
          <div className="absolute top-0 right-0 w-[40%] h-full bg-emerald-100/30 rounded-l-full blur-3xl transform translate-x-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Projects Hub
            </h1>
            <p className="text-slate-600 mt-2 text-sm sm:text-base font-medium">
              Manage your long-term capital builds, track escrow milestones, and monitor site progress.
            </p>
          </div>
          
          <Link 
            href="/pay/new" 
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-full shadow-sm flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" /> Start New Project
          </Link>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link 
              href={`/projects/${project.id}`} 
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all p-6 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-100 transition-all">
                    <Building className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                    project.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {project.status === 'Active' ? <Clock className="w-3 h-3 text-emerald-600" /> : <CheckCircle2 className="w-3 h-3 text-slate-500" />}
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{project.title}</h3>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mt-1 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {project.location}
                </p>

                <div className="space-y-3 mb-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-emerald-700">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 bg-emerald-500`} 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-slate-500 flex justify-between">
                    <span>Current Stage:</span> 
                    <span className="text-slate-800">{project.currentStage}</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">Budget</span>
                  <span className="text-lg font-black text-slate-900">{formatCurrency(project.budgetUSD, 'USD')}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-200 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
