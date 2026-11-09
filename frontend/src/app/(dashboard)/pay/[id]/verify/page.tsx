'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  TrendingDown,
  FileText,
  Sparkles,
  Store
} from 'lucide-react';
import { QuoteComparisonModal } from '@/components/verification/QuoteComparisonModal';
import { TrafficLightSignal, VerificationCheckItem } from '@shared/types/index';
import { formatCurrency } from '@/lib/utils';
import { BentoNavigation } from '@/components/layout/BentoNavigation';

export default function VerificationDecisionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialScenario = (searchParams.get('scenario')?.toUpperCase() as TrafficLightSignal) || 'GREEN';
  const [signal, setSignal] = useState<TrafficLightSignal>(initialScenario);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [payoutSuccessModal, setPayoutSuccessModal] = useState(false);
  const [refundSuccessModal, setRefundSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const q = searchParams.get('scenario');
    if (q && ['green', 'amber', 'red'].includes(q.toLowerCase())) {
      setSignal(q.toUpperCase() as TrafficLightSignal);
    }
  }, [searchParams]);

  // Dynamic scenario data
  const scenarioData = {
    GREEN: {
      headline: 'All good. Pay Bright Future School?',
      description: 'CAC registration verified, student Ada Okonkwo enrolled, invoice arithmetic clean, price is standard.',
      providerName: 'Bright Future Academy Ltd',
      cacReg: 'RC-892182',
      accountNumber: '0123456789',
      bankName: 'Guaranty Trust Bank (GTB)',
      resolvedAccountName: 'BRIGHT FUTURE ACADEMY LTD',
      nameMatchScore: 98,
      amountUSD: 400.0,
      amountNGN: 660000.0,
      checks: [
        { id: '1', name: '1. Payee Reality & CAC Verification', passed: true, statusText: 'CAC Registered & Bank Name Matched (98%)', category: 'PAYEE' },
        { id: '2', name: '2. Bill Honesty & Arithmetic', passed: true, statusText: 'Ada Okonkwo fee schedule confirmed', category: 'INVOICE' },
        { id: '3', name: '3. Quote Agent Price Check', passed: true, statusText: 'Termly fees match approved schedule', category: 'PRICE' },
        { id: '4', name: '4. Ground-Truth Proof', passed: true, statusText: 'Official termly bill validated & receipt queued', category: 'PROOF' },
      ] as VerificationCheckItem[],
    },
    AMBER: {
      headline: 'The price looks high. Pay a cheaper shop instead?',
      description: 'Contractor quoted 500 bags of cement at ₦14,200/bag. The Quote Agent found 3 local verified shops at ₦10,800/bag.',
      providerName: 'Engr. Kayode (Building Contractor)',
      cacReg: 'Unregistered Informal Contractor',
      accountNumber: '2093847120',
      bankName: 'Zenith Bank',
      resolvedAccountName: 'KAYODE ADEBAYO VENTURES',
      nameMatchScore: 88,
      amountUSD: 4303.0,
      amountNGN: 7100000.0,
      checks: [
        { id: '1', name: '1. Payee Reality & CAC Verification', passed: true, statusText: 'Personal NUBAN verified & phone confirmed', category: 'PAYEE' },
        { id: '2', name: '2. Bill Honesty & Arithmetic', passed: true, statusText: 'Math adds up to 500 bags', category: 'INVOICE' },
        { id: '3', name: '3. Quote Agent Price Check', passed: false, statusText: 'PADDED: 24% higher than regional wholesale', category: 'PRICE' },
        { id: '4', name: '4. Ground-Truth Proof', passed: true, statusText: 'Lintel stage verified; awaiting material order', category: 'PROOF' },
      ] as VerificationCheckItem[],
    },
    RED: {
      headline: 'The proof failed. Your money is safe with us.',
      description: 'Contractor submitted a roof photo that was already used in an August milestone. Payout is permanently blocked.',
      providerName: 'Alhaji Sikiru Builders',
      cacReg: 'RC-FAILED',
      accountNumber: '0987654321',
      bankName: 'Access Bank',
      resolvedAccountName: 'SIKIRU OLAMILEKAN',
      nameMatchScore: 42,
      amountUSD: 2000.0,
      amountNGN: 3300000.0,
      checks: [
        { id: '1', name: '1. Payee Reality & CAC Verification', passed: false, statusText: 'Name mismatch on NIBSS (42% match)', category: 'PAYEE' },
        { id: '2', name: '2. Bill Honesty & Arithmetic', passed: false, statusText: 'Doctored invoice date detected', category: 'INVOICE' },
        { id: '3', name: '3. Quote Agent Price Check', passed: true, statusText: 'Price within normal range', category: 'PRICE' },
        { id: '4', name: '4. Ground-Truth Proof', passed: false, statusText: 'DUPLICATE PHOTO: Image pHash matches Aug 14 build', category: 'PROOF' },
      ] as VerificationCheckItem[],
    },
  };

  const current = scenarioData[signal];

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      await fetch(`${apiUrl}/api/v1/payments/pay_school_fees/approve`, {
        method: 'POST',
      });
    } catch {
      // Graceful offline fallback
    }
    setTimeout(() => {
      setIsProcessing(false);
      setPayoutSuccessModal(true);
    }, 800);
  };

  const handleRefund = async () => {
    setIsProcessing(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      await fetch(`${apiUrl}/api/v1/payments/pay_padded_cement/refund`, {
        method: 'POST',
      });
    } catch {
      // Graceful offline fallback
    }
    setTimeout(() => {
      setIsProcessing(false);
      setRefundSuccessModal(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B12] pb-24 lg:pb-10 font-sans lg:pl-24 transition-colors">
      
      {/* Bento Navigation with Active State & Root Affordance */}
      <BentoNavigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-20">
        
        {/* Navigation & Judge Demo Preset Switcher Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#0E1626] p-4 rounded-2xl border border-slate-200 dark:border-[#1E2D4A] shadow-sm transition-colors">
          <Link href="/dashboard" className="text-xs font-bold text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>

          {/* Hackathon Judge Preset Bar */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-[#94A3B8] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> Judge Scenarios
            </span>
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-[#070B12] p-1.5 rounded-xl border border-slate-100 dark:border-[#1E2D4A] text-xs font-bold">
              <button
                onClick={() => setSignal('GREEN')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  signal === 'GREEN' 
                    ? 'bg-white dark:bg-[#162238] text-emerald-800 dark:text-emerald-300 shadow-sm font-extrabold border border-emerald-100 dark:border-emerald-800' 
                    : 'text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white border border-transparent'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                School Fees (Green)
              </button>
              <button
                onClick={() => setSignal('AMBER')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  signal === 'AMBER' 
                    ? 'bg-white dark:bg-[#162238] text-amber-800 dark:text-amber-300 shadow-sm font-extrabold border border-amber-100 dark:border-amber-800' 
                    : 'text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white border border-transparent'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Padded Quote (Amber)
              </button>
              <button
                onClick={() => setSignal('RED')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  signal === 'RED' 
                    ? 'bg-white dark:bg-[#162238] text-rose-800 dark:text-rose-300 shadow-sm font-extrabold border border-rose-100 dark:border-rose-800' 
                    : 'text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white border border-transparent'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Reused Photo (Red)
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Masterclass Verification Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: The Decision Card (Gate 4) */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`rounded-3xl border p-8 shadow-sm bg-white dark:bg-[#0E1626] transition-all ${
              signal === 'GREEN' ? 'border-emerald-200 dark:border-emerald-800 ring-1 ring-emerald-500/10' :
              signal === 'AMBER' ? 'border-amber-200 dark:border-amber-800 ring-1 ring-amber-500/10' :
              'border-rose-200 dark:border-rose-800 ring-1 ring-rose-500/10'
            }`}>
              
              {/* Signal Header Banner */}
              <div className="flex items-start gap-5">
                <div className={`p-4 rounded-2xl flex-shrink-0 ${
                  signal === 'GREEN' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' :
                  signal === 'AMBER' ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400' :
                  'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                }`}>
                  {signal === 'GREEN' && <ShieldCheck className="w-8 h-8" />}
                  {signal === 'AMBER' && <AlertTriangle className="w-8 h-8" />}
                  {signal === 'RED' && <AlertOctagon className="w-8 h-8" />}
                </div>

                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider border ${
                      signal === 'GREEN' ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800' :
                      signal === 'AMBER' ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800' :
                      'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800'
                    }`}>
                      {signal} RISK VERDICT
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-[#94A3B8] font-bold bg-slate-50 dark:bg-[#070B12] px-2 py-1 rounded-full border border-slate-100 dark:border-[#1E2D4A]">
                      Payment #VP-8921
                    </span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">{current.headline}</h2>
                  <p className="text-sm text-slate-600 dark:text-[#94A3B8] mt-2 font-medium leading-relaxed">{current.description}</p>
                </div>
              </div>

              {/* Verified Beneficiary Card */}
              <div className="mt-8 p-5 rounded-2xl bg-[#F8FAFC] dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] grid sm:grid-cols-2 gap-4 items-center">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-[#94A3B8] block mb-1">Verified Beneficiary</span>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white block">{current.providerName}</span>
                  <div className="text-[11px] text-slate-500 dark:text-[#94A3B8] font-medium mt-1">
                    CAC: <span className="font-bold text-emerald-700 dark:text-emerald-400">{current.cacReg}</span> &bull; NUBAN: <span className="font-mono font-bold text-slate-700 dark:text-[#CBD5E1]">{current.accountNumber}</span>
                  </div>
                </div>
                <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-[#1E2D4A] pt-4 sm:pt-0 sm:pl-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-[#94A3B8] block mb-1">Protected Amount</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white block">{formatCurrency(current.amountUSD, 'USD')}</span>
                  <span className="text-[11px] font-bold font-mono text-slate-500 dark:text-[#94A3B8] mt-0.5 block">
                    {formatCurrency(current.amountNGN, 'NGN')} at ₦1,650/$
                  </span>
                </div>
              </div>

              {/* Detailed 4-Step Checklist */}
              <div className="mt-8 space-y-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-[#94A3B8] block">
                  Verapay 4-Gate Forensic Results
                </span>
                <div className="divide-y divide-slate-100 dark:divide-[#1E2D4A] rounded-2xl bg-white dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] overflow-hidden shadow-sm">
                  {current.checks.map((c) => (
                    <div key={c.id} className="p-4 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        {c.passed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 flex-shrink-0" />
                        )}
                        <span className="font-bold text-slate-800 dark:text-[#E2E8F0]">{c.name}</span>
                      </div>
                      <span className={`font-bold text-right pl-4 ${c.passed ? 'text-slate-500 dark:text-[#94A3B8]' : 'text-amber-700 dark:text-amber-400'}`}>
                        {c.statusText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {signal === 'GREEN' && (
                  <>
                    <button
                      onClick={handleApprove}
                      disabled={isProcessing}
                      className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                    >
                      {isProcessing ? 'Authorizing Payout...' : `Approve & Release ${formatCurrency(current.amountUSD, 'USD')}`}
                    </button>
                    <button
                      onClick={handleRefund}
                      className="py-4 px-6 text-slate-500 dark:text-[#94A3B8] hover:text-slate-800 dark:hover:text-white font-bold text-xs bg-slate-50 dark:bg-[#070B12] hover:bg-slate-100 dark:hover:bg-[#162238] border border-slate-200 dark:border-[#1E2D4A] rounded-2xl transition-colors"
                    >
                      Reject & Refund
                    </button>
                  </>
                )}

                {signal === 'AMBER' && (
                  <>
                    <button
                      onClick={() => setShowQuoteModal(true)}
                      className="flex-1 py-4 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <TrendingDown className="w-4 h-4" /> View 3 Cheaper Suppliers (Save ₦1.7M)
                    </button>
                    <button
                      onClick={() => alert('Verapay Plus Fast Track: A human compliance agent is reviewing this invoice. ETA < 2 hours.')}
                      className="py-4 px-6 bg-slate-50 dark:bg-[#070B12] hover:bg-slate-100 dark:hover:bg-[#162238] text-slate-700 dark:text-[#CBD5E1] font-bold border border-slate-200 dark:border-[#1E2D4A] rounded-2xl text-xs transition-colors"
                    >
                      Human Help
                    </button>
                  </>
                )}

                {signal === 'RED' && (
                  <button
                    onClick={handleRefund}
                    disabled={isProcessing}
                    className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isProcessing ? 'Refunding...' : 'Proof Failed • 1-Click Instant Refund to PayPal'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Evidence Inspector */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#0E1626] rounded-3xl p-6 border border-slate-200 dark:border-[#1E2D4A] shadow-sm transition-colors">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1E2D4A]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
                    Live Evidence Inspector
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-slate-50 dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] px-2 py-1 rounded-full text-slate-500 dark:text-[#94A3B8]">
                  {signal === 'GREEN' ? 'OCR_INVOICE' : signal === 'AMBER' ? 'QUOTE_BENCHMARK' : 'IMAGE_FORENSICS'}
                </span>
              </div>

              {/* Scenario 1 Preview: Green School Fee Invoice with OCR Highlights */}
              {signal === 'GREEN' && (
                <div className="mt-5 space-y-5">
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] font-mono text-xs space-y-3">
                    <div className="flex justify-between border-b border-slate-200 dark:border-[#1E2D4A] pb-3">
                      <span className="font-extrabold text-slate-900 dark:text-white">BRIGHT FUTURE SCHOOL</span>
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100/50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-transparent dark:border-emerald-800">CAC #RC-892182</span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-[#94A3B8] space-y-2 font-medium">
                      <div>Student: <span className="text-slate-900 dark:text-white font-bold">Adaeze Okonkwo (JSS 2)</span></div>
                      <div>Term: First Term 2026/2027 Session</div>
                      <div className="flex justify-between"><span>Tuition & Books:</span> <span className="text-slate-800 dark:text-slate-200 font-bold">₦540,000.00</span></div>
                      <div className="flex justify-between"><span>Development Levy:</span> <span className="text-slate-800 dark:text-slate-200 font-bold">₦120,000.00</span></div>
                    </div>
                    <div className="pt-3 border-t border-slate-200 dark:border-[#1E2D4A] flex justify-between font-extrabold text-slate-900 dark:text-white text-sm">
                      <span>TOTAL:</span>
                      <span className="text-emerald-700 dark:text-emerald-400">₦660,000.00</span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-3 shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="font-medium leading-relaxed">
                      <strong className="font-bold block mb-0.5">Automated OCR Match</strong>
                      Gemini Multimodal OCR verified student enrollment & exact fee matching from the uploaded document.
                    </span>
                  </div>
                </div>
              )}

              {/* Scenario 2 Preview: Amber Quote Agent Price Delta */}
              {signal === 'AMBER' && (
                <div className="mt-5 space-y-5">
                  <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="font-extrabold text-slate-900 dark:text-white text-sm max-w-[160px]">Dangote 42.5R Cement (500 Bags)</span>
                      <span className="text-amber-800 dark:text-amber-300 font-black bg-amber-100 dark:bg-amber-950/80 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-800">+24% Padded</span>
                    </div>

                    <div className="space-y-2.5 pt-3 border-t border-amber-200/60 dark:border-amber-800 font-medium">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-[#94A3B8]">Contractor Quote:</span>
                        <span className="font-bold text-slate-900 dark:text-white">₦14,200 / bag (₦7.1M)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-[#94A3B8]">Ibadan Wholesale Avg:</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">₦10,800 / bag (₦5.4M)</span>
                      </div>
                      <div className="flex justify-between pt-2 mt-1 border-t border-amber-200/40 dark:border-amber-800 font-black text-emerald-700 dark:text-emerald-400 text-sm">
                        <span>Potential Savings:</span>
                        <span>₦1,700,000</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="w-full py-3.5 bg-white dark:bg-[#070B12] hover:bg-slate-50 dark:hover:bg-[#162238] text-slate-900 dark:text-white border border-slate-200 dark:border-[#1E2D4A] rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <Store className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Open Quote Agent Comparison Table
                  </button>
                </div>
              )}

              {/* Scenario 3 Preview: Red Forensics Caught Reused Photo */}
              {signal === 'RED' && (
                <div className="mt-5 space-y-5">
                  <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-xs space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-extrabold text-sm">
                      <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400" /> Duplicate Image Caught
                    </div>
                    <p className="text-xs text-rose-900/80 dark:text-[#CBD5E1] font-medium leading-relaxed">
                      The roof photograph submitted today matches a photo submitted by this contractor on <strong>August 14th, 2026</strong>.
                    </p>
                    <div className="font-mono text-[10px] text-slate-600 dark:text-[#CBD5E1] bg-white dark:bg-[#070B12] p-3 rounded-xl border border-rose-200 dark:border-rose-900 space-y-1.5 font-bold">
                      <div>Hash 1: a1f8902be34199c2 (Aug 14)</div>
                      <div>Hash 2: a1f8902be34199c0 (Today)</div>
                      <div className="text-rose-700 dark:text-rose-400 pt-1 mt-1 border-t border-rose-100 dark:border-rose-900">Hamming Dist: 1 &bull; 98.4% MATCH</div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 dark:bg-[#070B12] text-white rounded-2xl text-xs space-y-1.5 shadow-md border dark:border-[#1E2D4A]">
                    <span className="text-emerald-400 font-extrabold flex items-center gap-2 text-sm">
                      <ShieldCheck className="w-4 h-4" /> Payment Safeguard Triggered
                    </span>
                    <p className="text-xs text-slate-300 dark:text-[#94A3B8] font-medium leading-relaxed">
                      Zero money has left your account. You can tap refund below to return all funds immediately to PayPal.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Demo Tips Card */}
            <div className="p-5 bg-indigo-50/50 dark:bg-[#161B2E] rounded-3xl border border-indigo-100 dark:border-indigo-900/50 text-xs text-indigo-900/70 dark:text-indigo-200 space-y-2 transition-colors">
              <span className="font-extrabold text-indigo-900 dark:text-indigo-200 block flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> Hackathon Presentation Tip
              </span>
              <div className="font-medium leading-relaxed">&bull; Use the top buttons to switch between the 3 scenarios in under 30 seconds.</div>
              <div className="font-medium leading-relaxed">&bull; Point out that Verapay only earns its fee when money is safely released.</div>
            </div>
          </div>
        </div>

        {/* Modal 1: Quote Agent Comparison Modal */}
        {showQuoteModal && (
          <QuoteComparisonModal
            materialName="500 Bags Dangote 42.5R Cement"
            contractorPrice={7100000}
            marketAveragePrice={5400000}
            cheaperSuppliers={[
              { name: 'Alhaji Ganiyu Building Depot', location: 'Bodija Market, Ibadan', price: 5250000, phone: '+234 803 234 5678' },
              { name: 'Oyo State Direct Cement Hub', location: 'Dugbe Commercial Ave', price: 5350000, phone: '+234 802 987 6543' },
              { name: 'Westfield Materials Depot', location: 'Iwo Road Hub', price: 5450000, phone: '+234 814 112 2334' },
            ]}
            onSelectSupplier={(s) => {
              alert(`Beneficiary successfully changed to verified supplier: ${s.name}. Funds re-routed at fair price!`);
              setShowQuoteModal(false);
            }}
            onClose={() => setShowQuoteModal(false)}
          />
        )}

        {/* Modal 2: Payout Success Modal */}
        {payoutSuccessModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0E1626] border border-slate-100 dark:border-[#1E2D4A] rounded-3xl max-w-md w-full p-8 text-center space-y-5 shadow-2xl transition-colors">
              <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Naira Payout Dispatched!</h3>
                <p className="text-sm text-slate-600 dark:text-[#94A3B8] font-medium mt-2 leading-relaxed">
                  ₦660,000 has been transferred directly into Bright Future Academy Ltd's GTB account via Paystack NIP rails.
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] rounded-2xl font-mono text-xs text-slate-700 dark:text-[#CBD5E1] font-bold text-left space-y-2">
                <div className="flex justify-between"><span>Transfer Code:</span> <span>TRF_99182371A</span></div>
                <div className="flex justify-between"><span>Status:</span> <span className="text-emerald-600 dark:text-emerald-400">SUCCESSFUL</span></div>
                <div className="flex justify-between"><span>Official Receipt:</span> <span>Emailed</span></div>
              </div>
              <button
                onClick={() => {
                  setPayoutSuccessModal(false);
                  router.push('/dashboard');
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm transition-colors shadow-sm"
              >
                Done & Return to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Modal 3: Refund Success Modal */}
        {refundSuccessModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#0E1626] border border-slate-100 dark:border-[#1E2D4A] rounded-3xl max-w-md w-full p-8 text-center space-y-5 shadow-2xl transition-colors">
              <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-[#162238] border border-slate-200 dark:border-[#1E2D4A] text-slate-900 dark:text-white mx-auto flex items-center justify-center">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">100% Refund Complete</h3>
                <p className="text-sm text-slate-600 dark:text-[#94A3B8] font-medium mt-2 leading-relaxed">
                  Because proof failed verification, 100% of your protected funds have been credited back to your PayPal balance.
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] rounded-2xl font-mono text-xs text-slate-700 dark:text-[#CBD5E1] font-bold text-left space-y-2">
                <div className="flex justify-between"><span>Refund ID:</span> <span>REF_77192388A</span></div>
                <div className="flex justify-between"><span>Refunded:</span> <span className="text-emerald-700 dark:text-emerald-400">$400.00 USD</span></div>
                <div className="flex justify-between"><span>Verapay Fee:</span> <span>$0.00</span></div>
              </div>
              <button
                onClick={() => {
                  setRefundSuccessModal(false);
                  router.push('/dashboard');
                }}
                className="w-full py-3.5 bg-slate-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm transition-colors shadow-sm"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}