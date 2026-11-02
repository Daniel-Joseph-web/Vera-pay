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
  Camera,
  MapPin,
  Clock,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Download,
  Store,
  Phone
} from 'lucide-react';
import { QuoteComparisonModal, SupplierQuote } from '@/components/verification/QuoteComparisonModal';
import { TrafficLightSignal, VerificationCheckItem } from '@shared/types/index';
import { formatCurrency } from '@/lib/utils';

export default function VerificationDecisionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Scenario state initialized from query param (green, amber, red)
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
    setTimeout(() => {
      setIsProcessing(false);
      setPayoutSuccessModal(true);
    }, 1000);
  };

  const handleRefund = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setRefundSuccessModal(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation & Judge Demo Preset Switcher Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <Link href="/dashboard" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>

          {/* Hackathon Judge Preset Bar */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary" /> Judge Scenarios:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setSignal('GREEN')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  signal === 'GREEN' ? 'bg-white text-emerald-800 shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Scene 1: School Fees (Green)
              </button>
              <button
                onClick={() => setSignal('AMBER')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  signal === 'AMBER' ? 'bg-white text-amber-800 shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Scene 2: Padded Quote (Amber)
              </button>
              <button
                onClick={() => setSignal('RED')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  signal === 'RED' ? 'bg-white text-rose-800 shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Scene 3: Reused Photo (Red)
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Masterclass Verification Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: The Decision Card (Gate 4) */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`rounded-3xl border p-7 shadow-lg transition-all ${
              signal === 'GREEN' ? 'border-emerald-200 bg-white ring-1 ring-emerald-500/20' :
              signal === 'AMBER' ? 'border-amber-200 bg-white ring-1 ring-amber-500/20' :
              'border-rose-200 bg-white ring-1 ring-rose-500/20'
            }`}>
              {/* Signal Header Banner */}
              <div className="flex items-start gap-4">
                <div className={`p-3.5 rounded-2xl ${
                  signal === 'GREEN' ? 'bg-emerald-100 text-emerald-800' :
                  signal === 'AMBER' ? 'bg-amber-100 text-amber-800' :
                  'bg-rose-100 text-rose-800'
                }`}>
                  {signal === 'GREEN' && <ShieldCheck className="w-9 h-9" />}
                  {signal === 'AMBER' && <AlertTriangle className="w-9 h-9" />}
                  {signal === 'RED' && <AlertOctagon className="w-9 h-9" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded tracking-wider border ${
                      signal === 'GREEN' ? 'bg-emerald-50 text-emerald-900 border-emerald-200' :
                      signal === 'AMBER' ? 'bg-amber-50 text-amber-900 border-amber-200' :
                      'bg-rose-50 text-rose-900 border-rose-200'
                    }`}>
                      {signal} RISK VERDICT
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Protected Escrow #VP-8921</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mt-1 leading-snug">{current.headline}</h2>
                  <p className="text-sm text-slate-600 mt-1">{current.description}</p>
                </div>
              </div>

              {/* Verified Beneficiary Card */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 grid sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Verified Beneficiary</span>
                  <span className="text-sm font-bold text-slate-900 block mt-0.5">{current.providerName}</span>
                  <div className="text-xs text-slate-500 mt-0.5">
                    CAC Status: <span className="font-semibold text-emerald-700">{current.cacReg}</span> &bull; NUBAN: <span className="font-mono">{current.accountNumber}</span>
                  </div>
                </div>
                <div className="sm:text-right">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Escrow Protected Amount</span>
                  <span className="text-xl font-black text-slate-900 block">{formatCurrency(current.amountUSD, 'USD')}</span>
                  <span className="text-xs font-mono text-slate-500">({formatCurrency(current.amountNGN, 'NGN')} at ₦1,650/$)</span>
                </div>
              </div>

              {/* Detailed 4-Step Checklist */}
              <div className="mt-6 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Verapay 4-Gate Forensic Results
                </span>
                <div className="divide-y divide-slate-100 rounded-2xl bg-white border border-slate-200 overflow-hidden">
                  {current.checks.map((c) => (
                    <div key={c.id} className="p-3.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        {c.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        )}
                        <span className="font-bold text-slate-800">{c.name}</span>
                      </div>
                      <span className={`font-semibold ${c.passed ? 'text-slate-600' : 'text-amber-700 font-bold'}`}>
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
                      className="flex-1 py-4 bg-brand-primary hover:bg-brand-dark text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                    >
                      {isProcessing ? 'Authorizing Payout...' : `Approve & Release ${formatCurrency(current.amountUSD, 'USD')}`}
                    </button>
                    <button
                      onClick={handleRefund}
                      className="py-4 px-6 text-slate-600 hover:text-slate-900 font-bold text-xs"
                    >
                      Reject & Refund
                    </button>
                  </>
                )}

                {signal === 'AMBER' && (
                  <>
                    <button
                      onClick={() => setShowQuoteModal(true)}
                      className="flex-1 py-4 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <TrendingDown className="w-4 h-4" /> View 3 Cheaper Suppliers (Save ₦1.7M)
                    </button>
                    <button
                      onClick={() => alert('Verapay Plus Fast Track: A human compliance agent is reviewing this invoice. ETA < 2 hours.')}
                      className="py-4 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs"
                    >
                      Human Help (Plus)
                    </button>
                  </>
                )}

                {signal === 'RED' && (
                  <button
                    onClick={handleRefund}
                    disabled={isProcessing}
                    className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isProcessing ? 'Refunding...' : 'Proof Failed &bull; 1-Click Instant Refund to PayPal (100%)'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Evidence Inspector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-primary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Live Evidence Inspector
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  {signal === 'GREEN' ? 'OCR_INVOICE' : signal === 'AMBER' ? 'QUOTE_BENCHMARK' : 'IMAGE_FORENSICS'}
                </span>
              </div>

              {/* Scenario 1 Preview: Green School Fee Invoice with OCR Highlights */}
              {signal === 'GREEN' && (
                <div className="mt-4 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs space-y-2">
                    <div className="flex justify-between border-b pb-2">
                      <span className="font-bold text-slate-900">BRIGHT FUTURE SCHOOL</span>
                      <span className="text-emerald-700 font-bold">CAC #RC-892182</span>
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <div>Student: <span className="text-slate-900 font-bold">Adaeze Okonkwo (JSS 2)</span></div>
                      <div>Term: First Term 2026/2027 Session</div>
                      <div>Tuition & Books: ₦540,000.00</div>
                      <div>Development Levy: ₦120,000.00</div>
                    </div>
                    <div className="pt-2 border-t flex justify-between font-bold text-slate-900 text-sm">
                      <span>TOTAL:</span>
                      <span className="text-emerald-700">₦660,000.00</span>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Gemini Multimodal OCR verified student enrollment & exact fee matching.</span>
                  </div>
                </div>
              )}

              {/* Scenario 2 Preview: Amber Quote Agent Price Delta */}
              {signal === 'AMBER' && (
                <div className="mt-4 space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900">Dangote 42.5R Cement (500 Bags)</span>
                      <span className="text-amber-800 font-black">+24% Padded</span>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-amber-200/60">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Contractor Quote:</span>
                        <span className="font-bold text-slate-900">₦14,200 / bag (₦7,100,000)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Ibadan Wholesale Average:</span>
                        <span className="font-bold text-emerald-700">₦10,800 / bag (₦5,400,000)</span>
                      </div>
                      <div className="flex justify-between pt-1 font-bold text-emerald-800">
                        <span>Potential Savings:</span>
                        <span>₦1,700,000 (~$1,030 USD)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Store className="w-4 h-4 text-amber-700" /> Open Quote Agent Comparison Table
                  </button>
                </div>
              )}

              {/* Scenario 3 Preview: Red Forensics Caught Reused Photo */}
              {signal === 'RED' && (
                <div className="mt-4 space-y-4">
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-rose-800 font-bold">
                      <AlertOctagon className="w-4 h-4 text-rose-600" /> Duplicate Image Caught by dHash
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      The roof photograph submitted today matches a photo submitted by this contractor on <strong>August 14th, 2026</strong>.
                    </p>
                    <div className="font-mono text-[10px] text-slate-500 bg-white p-2 rounded border border-rose-200 space-y-0.5">
                      <div>Hash 1: a1f8902be34199c2 (Aug 14)</div>
                      <div>Hash 2: a1f8902be34199c0 (Today)</div>
                      <div className="text-rose-700 font-bold">Hamming Distance: 1 &bull; MATCH CONFIRMED (98.4%)</div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 text-white rounded-xl text-xs space-y-1">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Escrow Safeguard Triggered
                    </span>
                    <p className="text-[11px] text-slate-300">
                      Zero money has left your account. You can tap refund below to return all funds immediately.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Demo Tips Card */}
            <div className="p-4 bg-slate-100 rounded-2xl text-[11px] text-slate-500 space-y-1">
              <span className="font-bold text-slate-700">Hackathon Presentation Tip:</span>
              <div>&bull; Use the top buttons to switch between the 3 scenarios in under 30 seconds.</div>
              <div>&bull; Point out that Verapay only earns its fee when money is safely released.</div>
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-primary mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Naira Payout Dispatched!</h3>
              <p className="text-xs text-slate-600">
                ₦660,000 has been transferred directly into Bright Future Academy Ltd&apos;s GTB account via Paystack NIP rails.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs text-slate-600 text-left space-y-1">
                <div>Transfer Code: TRF_99182371A</div>
                <div>Status: SUCCESSFUL</div>
                <div>Official Receipt: Generated & Emailed</div>
              </div>
              <button
                onClick={() => {
                  setPayoutSuccessModal(false);
                  router.push('/dashboard');
                }}
                className="w-full py-3 bg-brand-primary text-white font-bold rounded-xl text-xs"
              >
                Done & Return to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Modal 3: Refund Success Modal */}
        {refundSuccessModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 mx-auto flex items-center justify-center">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-black text-slate-900">100% Refund Complete</h3>
              <p className="text-xs text-slate-600">
                Because proof failed verification, 100% of your escrowed funds have been credited back to your PayPal balance.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl font-mono text-xs text-slate-600 text-left space-y-1">
                <div>PayPal Refund ID: REF_77192388A</div>
                <div>Amount Refunded: $400.00 USD</div>
                <div>Verapay Fee: $0.00 (Zero fee on failed proof)</div>
              </div>
              <button
                onClick={() => {
                  setRefundSuccessModal(false);
                  router.push('/dashboard');
                }}
                className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl text-xs"
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
