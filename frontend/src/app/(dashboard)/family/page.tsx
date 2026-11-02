'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Plus, ShieldCheck, HeartHandshake, CheckCircle2, Download, ArrowRight } from 'lucide-react';
import { SharedPotWidget } from '@/components/family/SharedPotWidget';
import { SharedPotDetails } from '@shared/types/index';
import { formatCurrency } from '@/lib/utils';

export default function FamilyGroupPage() {
  const [pot, setPot] = useState<SharedPotDetails>({
    id: 'pot_eye_surgery',
    title: "Dad's Cataract Eye Surgery at LUTH",
    targetAmountUSD: 1200,
    collectedAmountUSD: 900,
    status: 'COLLECTING',
    contributors: [
      { userId: 'u_1', fullName: 'Tunde Balogun (Manchester, UK)', amountUSD: 400, contributedAt: '2 days ago' },
      { userId: 'u_2', fullName: 'Folake Balogun (Toronto, CA)', amountUSD: 300, contributedAt: 'Yesterday' },
      { userId: 'u_3', fullName: 'Emeka Balogun (Houston, US)', amountUSD: 200, contributedAt: 'Today' },
    ],
  });

  const [showChipInModal, setShowChipInModal] = useState(false);
  const [chipInAmount, setChipInAmount] = useState<number>(300);
  const [payoutTriggered, setPayoutTriggered] = useState(false);

  const handleCompleteChipIn = () => {
    const updatedCollected = pot.collectedAmountUSD + chipInAmount;
    const isTargetReached = updatedCollected >= pot.targetAmountUSD;

    setPot({
      ...pot,
      collectedAmountUSD: updatedCollected,
      status: isTargetReached ? 'TARGET_REACHED' : 'COLLECTING',
      contributors: [
        ...pot.contributors,
        {
          userId: 'u_4',
          fullName: 'Bisi Balogun (London, UK)',
          amountUSD: chipInAmount,
          contributedAt: 'Just now',
        },
      ],
    });

    setShowChipInModal(false);

    if (isTargetReached) {
      setTimeout(() => {
        setPayoutTriggered(true);
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <Link href="/dashboard" className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>

        {/* Family Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-teal-700 text-white flex items-center justify-center font-bold shadow-md">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase text-brand-primary tracking-wider">The Balogun Family Account</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  Verapay Plus Member ($9.99/mo)
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 mt-0.5">Family Group & Shared Pots</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Brothers and sisters abroad pool funds; Verapay verifies the hospital or landlord and pays directly.
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid: Shared Pot & Family Transparent Ledger */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Shared Pot Container */}
          <div className="lg:col-span-8 space-y-6">
            <SharedPotWidget pot={pot} onChipIn={() => setShowChipInModal(true)} />

            {/* Target Reached Banner */}
            {pot.status === 'TARGET_REACHED' && (
              <div className="p-6 rounded-3xl bg-emerald-600 text-white shadow-xl space-y-3 animate-fade-in">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-200" />
                  <div>
                    <h3 className="text-lg font-black">Shared Pot 100% Fully Funded!</h3>
                    <p className="text-xs text-emerald-100">
                      Target of $1,200 reached. Verapay has initiated direct institutional payout to Lagos University Teaching Hospital (LUTH).
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-emerald-500 flex justify-between text-xs font-mono">
                  <span>Payee: LUTH Ophthalmology Dept</span>
                  <span className="font-bold">Naira Payout: ₦1,980,000.00</span>
                </div>
              </div>
            )}

            {/* Family Transparent Ledger */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 mb-1">Transparent Family Ledger</h3>
              <p className="text-xs text-slate-500 mb-4">
                Everyone in the family group sees exactly what was paid, who chipped in, and the verified receipts.
              </p>

              <div className="divide-y divide-slate-100 text-xs">
                {[
                  { title: "Mama's Monthly Groceries & Rent", paidTo: "Landlord (Alhaji Lateef)", amount: "$450", date: "Oct 1, 2026", status: "Verified & Paid" },
                  { title: "Sister Kemi School Tuition", paidTo: "Queens College Yaba", amount: "$320", date: "Sep 15, 2026", status: "Verified & Paid" },
                  { title: "Solar Inverter for Family Home", paidTo: "Lagos Solar Mart", amount: "$800", date: "Aug 20, 2026", status: "Delivered (Mama tapped Received)" },
                ].map((item, idx) => (
                  <div key={idx} className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-900 block">{item.title}</span>
                      <span className="text-[11px] text-slate-500">Paid to: {item.paidTo} &bull; {item.date}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 block">{item.amount}</span>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Family Members & Monthly Audit */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4">
                Family Group Members (4)
              </h4>
              <div className="space-y-3.5">
                {[
                  { name: 'Tunde Balogun', location: 'Manchester, UK', role: 'Funder &bull; Verapay Plus Admin' },
                  { name: 'Folake Balogun', location: 'Toronto, Canada', role: 'Funder' },
                  { name: 'Emeka Balogun', location: 'Houston, USA', role: 'Funder' },
                  { name: 'Mrs. Abigail Balogun (Mama)', location: 'Surulere, Lagos', role: 'Beneficiary &bull; Confirms Deliveries' },
                ].map((m, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                      {m.name[0]}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">{m.name}</span>
                      <span className="text-slate-500 text-[11px]">{m.location}</span>
                      <span className="text-[10px] text-brand-primary font-semibold block" dangerouslySetInnerHTML={{ __html: m.role }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Report Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <span className="text-xs font-bold text-slate-900 block mb-1">Consolidated Monthly Report</span>
              <p className="text-xs text-slate-500 leading-relaxed">
                One single page showing every payment, what it bought, and official receipts. Perfect for family transparency.
              </p>
              <button
                onClick={() => alert('Downloaded: Verapay_Monthly_Family_Report_Oct_2026.pdf')}
                className="mt-4 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Download October Report (PDF)
              </button>
            </div>
          </div>
        </div>

        {/* Chip-In Modal */}
        {showChipInModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" /> Chip In to Shared Pot
              </div>
              <h3 className="text-xl font-bold text-slate-900">Dad&apos;s Eye Surgery at LUTH</h3>
              <p className="text-xs text-slate-500">
                Current total: $900 / $1,200. $300 needed to complete the surgery pot.
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Contribution (USD)</label>
                <input
                  type="number"
                  value={chipInAmount}
                  onChange={(e) => setChipInAmount(parseFloat(e.target.value) || 0)}
                  className="w-full p-3 rounded-xl border border-slate-300 font-bold text-lg focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900">
                <strong>Protected Escrow:</strong> Your contribution is held safely until the pot is 100% funded, then paid directly to LUTH Hospital.
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCompleteChipIn}
                  className="flex-1 py-3 bg-brand-primary hover:bg-brand-dark text-white font-bold rounded-xl text-xs shadow"
                >
                  Confirm & Chip In ${chipInAmount} via PayPal
                </button>
                <button
                  onClick={() => setShowChipInModal(false)}
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
