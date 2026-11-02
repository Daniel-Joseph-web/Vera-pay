'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Building,
  ShieldCheck,
  MapPin,
  ExternalLink,
  Camera,
  Video,
  FileCheck2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  X
} from 'lucide-react';
import { MilestoneProgressStepper } from '@/components/projects/MilestoneProgressStepper';
import { MilestoneStage } from '@shared/types/index';
import { formatCurrency } from '@/lib/utils';
import { BentoNavigation } from '@/components/layout/BentoNavigation';

export default function ProjectDetailsPage() {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState('m_2');
  const [showSurveyorModal, setShowSurveyorModal] = useState(false);

  const milestones: MilestoneStage[] = [
    {
      id: 'm_1',
      sequenceNumber: 1,
      title: 'Site Clearing & Foundation (German Floor)',
      targetBudgetUSD: 2500,
      status: 'COMPLETED',
      photoCount: 14,
      videoVerified: true,
      surveyorVisited: true,
    },
    {
      id: 'm_2',
      sequenceNumber: 2,
      title: 'Blockwork to Lintel Level',
      targetBudgetUSD: 3200,
      status: 'READY_FOR_APPROVAL',
      photoCount: 8,
      videoVerified: true,
      surveyorVisited: false,
    },
    {
      id: 'm_3',
      sequenceNumber: 3,
      title: 'Roof Truss & Stone-Coated Covering',
      targetBudgetUSD: 4000,
      status: 'PENDING_FUNDING',
      photoCount: 0,
      videoVerified: false,
      surveyorVisited: false,
    },
    {
      id: 'm_4',
      sequenceNumber: 4,
      title: 'Plastering, Electrical Conduit & Plumbing',
      targetBudgetUSD: 3000,
      status: 'PENDING_FUNDING',
      photoCount: 0,
      videoVerified: false,
      surveyorVisited: false,
    },
    {
      id: 'm_5',
      sequenceNumber: 5,
      title: 'Finishing: Tiling, Windows, Doors & Painting',
      targetBudgetUSD: 2800,
      status: 'PENDING_FUNDING',
      photoCount: 0,
      videoVerified: false,
      surveyorVisited: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B12] pb-24 lg:pb-10 font-sans lg:pl-24 transition-colors">
      
      {/* Bento Navigation with Active State & Root Affordance */}
      <BentoNavigation />

      {/* Header Section */}
      <div className="relative bg-white dark:bg-[#0E1626] pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-[#1E2D4A] overflow-hidden transition-colors">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 via-white to-slate-50/50 dark:from-[#070B12]/80 dark:via-[#0E1626]/80 dark:to-[#070B12]/80 z-0"></div>
          <div className="absolute top-0 right-0 w-[30%] h-full bg-emerald-100/30 dark:bg-emerald-500/10 rounded-l-full blur-3xl transform translate-x-1/4"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Link href="/projects" className="text-xs font-bold text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 mb-6 w-max transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Projects Hub
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md flex-shrink-0">
                <Building className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 tracking-wider">
                    Capital Build
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 dark:bg-[#070B12] text-slate-600 dark:text-[#CBD5E1] border border-slate-200 dark:border-[#1E2D4A] rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500 dark:text-emerald-400" /> 2% Verification Fee
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  4-Bedroom Duplex in Ibadan
                </h1>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-[#94A3B8] bg-slate-100 dark:bg-[#162238] px-2 py-0.5 rounded border border-slate-200 dark:border-[#1E2D4A]">ID: PROJ-881</span>
                  <p className="text-xs font-medium text-slate-500 dark:text-[#94A3B8] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-[#94A3B8]" /> Moniya Estate Axis, Oyo State &bull; Engr. Kayode
                  </p>
                </div>
              </div>
            </div>

            <div className="md:text-right bg-slate-50 dark:bg-[#070B12] p-4 rounded-2xl border border-slate-200 dark:border-[#1E2D4A] shadow-sm min-w-[200px]">
              <span className="text-[11px] text-slate-500 dark:text-[#94A3B8] font-black uppercase tracking-wider block mb-0.5">Project Total</span>
              <span className="text-3xl font-black text-slate-900 dark:text-white block">$15,500</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block mt-1">Stage 1 Paid ($2,500)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6 relative z-20">
        
        {/* Weekly Plain-English Briefing & Contractor Simulator Link */}
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Weekly Report Card */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0E1626] rounded-2xl p-6 border border-slate-200 dark:border-[#1E2D4A] shadow-sm space-y-4 transition-colors">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-[#1E2D4A] pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center">
                  <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Weekly Progress Report (Week 6)</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400 dark:text-[#94A3B8] flex items-center gap-1 bg-slate-50 dark:bg-[#070B12] px-2.5 py-1 rounded-full border border-slate-200 dark:border-[#1E2D4A]">
                <Calendar className="w-3 h-3" /> Updated Today
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed font-medium">
              Blockwork reached lintel level on schedule. 500 sandcrete blocks laid. Quote Agent flagged cement price padding and saved <strong className="text-slate-900 dark:text-white">₦340,000 ($206 USD)</strong> by sourcing from Bodija Market Depot. Contractor submitted 8 live geotagged photos and verified the 15-second surprise video challenge code.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold">
              <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-800 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" /> Live Photos: Verified
              </span>
              <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-800 flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" /> 15s Video: Code Matched
              </span>
              <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-800 flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5" /> Quote Agent: Saved ₦340k
              </span>
            </div>
          </div>

          {/* Surveyor Site Visit Booking & Contractor Simulator */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-gradient-to-br from-emerald-50 to-white dark:from-[#0E1626] dark:to-[#070B12] rounded-2xl p-6 border border-emerald-100 dark:border-[#1E2D4A] shadow-sm space-y-3 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                <span className="text-sm font-extrabold text-emerald-950 dark:text-emerald-300">Independent Surveyor Visit</span>
              </div>
              <p className="text-xs text-emerald-900/70 dark:text-[#94A3B8] leading-relaxed font-medium mb-2">
                Book a certified Nigerian surveyor or structural engineer to inspect lintel alignment before roof installation.
              </p>
              <button
                onClick={() => setShowSurveyorModal(true)}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors"
              >
                Book Surveyor ($50 &bull; 15% Fee)
              </button>
            </div>

            <div className="bg-slate-900 dark:bg-[#070B12] text-white rounded-2xl p-6 border border-slate-800 dark:border-[#1E2D4A] shadow-sm space-y-3 relative overflow-hidden transition-colors">
              <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none"></div>
              <div className="relative z-10">
                <span className="text-sm font-extrabold text-emerald-400 block mb-1">Contractor Mobile Cam</span>
                <p className="text-xs text-slate-400 dark:text-[#94A3B8] font-medium leading-relaxed mb-3">
                  Test the Nigerian builder viewfinder with real GPS watermarking and surprise video challenge.
                </p>
                <Link
                  href="/contractor/upload/demo-token"
                  target="_blank"
                  className="inline-flex items-center justify-center w-full py-3 bg-white/10 dark:bg-[#162238] hover:bg-white/20 dark:hover:bg-[#1E2D4A] text-white border border-white/20 dark:border-[#1E2D4A] rounded-xl text-xs font-bold transition-colors gap-2"
                >
                  Launch Mobile Camera <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Progress Stepper */}
        <div className="bg-white dark:bg-[#0E1626] rounded-2xl border border-slate-200 dark:border-[#1E2D4A] shadow-sm p-6 overflow-hidden transition-colors">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Milestone Tracker</h2>
          <MilestoneProgressStepper
            milestones={milestones}
            activeMilestoneId={selectedMilestoneId}
            onSelectMilestone={(id) => setSelectedMilestoneId(id)}
          />
        </div>

        {/* Surveyor Modal */}
        {showSurveyorModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0E1626] border border-slate-100 dark:border-[#1E2D4A] rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl transition-colors">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1E2D4A] pb-4">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-black text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-5 h-5" /> Book Certified Surveyor
                </div>
                <button onClick={() => setShowSurveyorModal(false)} className="text-slate-400 dark:text-[#94A3B8] hover:text-slate-600 dark:hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Moniya Site Inspection</h3>
                <p className="text-sm text-slate-600 dark:text-[#94A3B8] font-medium mt-2 leading-relaxed">
                  A registered structural engineer from the Nigerian Institute of Building (NIOB) will conduct an on-site audit of the lintel reinforcement.
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] rounded-xl text-xs space-y-2 font-mono text-slate-700 dark:text-[#CBD5E1] font-bold">
                <div className="flex justify-between"><span>Surveyor Fee:</span> <span>$50.00 USD</span></div>
                <div className="flex justify-between"><span>Verapay Platform Fee:</span> <span>$7.50 (15%)</span></div>
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-[#1E2D4A] mt-2">
                  <span>Turnaround:</span> <span>48 Hours Max</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    alert('Surveyor booked! Engr. T. Adeleke assigned. Report will be delivered to your portal.');
                    setShowSurveyorModal(false);
                  }}
                  className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-sm transition-colors"
                >
                  Confirm Booking ($57.50)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}