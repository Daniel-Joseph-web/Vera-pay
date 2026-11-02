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
  TrendingDown
} from 'lucide-react';
import { MilestoneProgressStepper } from '@/components/projects/MilestoneProgressStepper';
import { MilestoneStage } from '@shared/types/index';
import { formatCurrency } from '@/lib/utils';

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
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <Link href="/dashboard" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>

        {/* Project Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold shadow-sm">
              <Building className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-indigo-700 tracking-wider">Verapay Projects &bull; Capital Build</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                  2% Fee On Approved Release
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 mt-0.5">4-Bedroom Duplex in Ibadan</h1>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Moniya Estate Axis, Ibadan, Oyo State &bull; Contractor: Engr. Kayode
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Project Total</span>
            <span className="text-2xl font-black text-slate-900 block">$15,500</span>
            <span className="text-[11px] text-emerald-600 font-semibold block">Stage 1 Verified & Paid ($2,500)</span>
          </div>
        </div>

        {/* Weekly Plain-English Briefing & Contractor Simulator Link */}
        <div className="grid md:grid-cols-12 gap-6">
          {/* Weekly Report Card */}
          <div className="md:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-brand-primary" />
                <h3 className="font-bold text-sm text-slate-900">Weekly Progress Report (Week 6)</h3>
              </div>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Updated Today
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Blockwork reached lintel level on schedule. 500 sandcrete blocks laid. Quote Agent flagged cement price padding and saved <strong>₦340,000 ($206 USD)</strong> by sourcing from Bodija Market Depot. Contractor submitted 8 live geotagged photos and verified the 15-second surprise video challenge code.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
              <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200">
                Live Geotagged Photos: Verified
              </span>
              <span className="bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200">
                15s Surprise Video: Code Matched
              </span>
              <span className="bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200">
                Quote Agent: Savings ₦340k
              </span>
            </div>
          </div>

          {/* Surveyor Site Visit Booking & Contractor Simulator */}
          <div className="md:col-span-4 space-y-4">
            <div className="bg-indigo-50/70 rounded-3xl p-5 border border-indigo-200 space-y-3">
              <span className="text-xs font-bold text-indigo-900 block">Independent Surveyor Visit</span>
              <p className="text-[11px] text-indigo-800 leading-relaxed">
                Book a certified Nigerian surveyor or structural engineer to inspect lintel alignment before roof installation.
              </p>
              <button
                onClick={() => setShowSurveyorModal(true)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow"
              >
                Book Surveyor ($50 &bull; 15% Platform Take)
              </button>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block">Contractor Mobile Cam</span>
              <p className="text-[11px] text-slate-300">
                Test the Nigerian builder viewfinder with real GPS watermarking and surprise video.
              </p>
              <Link
                href="/contractor/upload/demo-token"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 mt-1"
              >
                Launch Mobile Camera <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Milestone Progress Stepper */}
        <MilestoneProgressStepper
          milestones={milestones}
          activeMilestoneId={selectedMilestoneId}
          onSelectMilestone={(id) => setSelectedMilestoneId(id)}
        />

        {/* Surveyor Modal */}
        {showSurveyorModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" /> Book Certified Surveyor
              </div>
              <h3 className="text-xl font-bold text-slate-900">Moniya Site Inspection</h3>
              <p className="text-xs text-slate-500">
                A registered structural engineer from the Nigerian Institute of Building (NIOB) will conduct an on-site audit of the lintel reinforcement.
              </p>

              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono text-slate-700">
                <div>Surveyor Fee: $50.00 USD</div>
                <div>Verapay Marketplace Cut: $7.50 (15%)</div>
                <div>Turnaround: 48 Hours</div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    alert('Surveyor booked! Engr. T. Adeleke assigned. Report will be delivered to your portal.');
                    setShowSurveyorModal(false);
                  }}
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow"
                >
                  Confirm Booking ($50)
                </button>
                <button
                  onClick={() => setShowSurveyorModal(false)}
                  className="py-3 px-4 text-slate-500 text-xs font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
