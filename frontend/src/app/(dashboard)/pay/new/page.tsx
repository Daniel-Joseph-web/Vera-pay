'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  UploadCloud,
  ShieldCheck,
  ArrowRight,
  Building2,
  Store,
  CheckCircle2,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { usePaymentStore } from '@/stores/usePaymentStore';
import { formatCurrency } from '@/lib/utils';

export default function NewPaymentPage() {
  const router = useRouter();
  const { form, updateForm, setPaymentId } = usePaymentStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Case 1 vs Case 2 Detection
  const isPreVerified = form.payeeName.toLowerCase().includes('bright future') ||
                        form.payeeName.toLowerCase().includes('luth') ||
                        form.payeeName.toLowerCase().includes('dangote');

  const isInformal = form.payeeCategory === 'ARTISAN_INFORMAL';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `pay_${Date.now().toString().slice(-6)}`;
    setPaymentId(generatedId);

    setTimeout(() => {
      router.push(`/pay/${generatedId}/verify?scenario=green`);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-lg">
        {/* Header */}
        <div className="border-b border-slate-100 pb-5 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-brand-primary">
              Step 1 &bull; Fund Escrow
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
              PayPal Sandbox Protected
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Start a Verified Payment</h1>
          <p className="text-xs text-slate-500 mt-1">
            Your money stays 100% protected in escrow. It is only released when proof passes and you tap approve.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Category Picker */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
              Payment Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'SCHOOL', label: 'School Tuition', icon: Building2 },
                { id: 'HOSPITAL', label: 'Hospital & Clinic', icon: Building2 },
                { id: 'LANDLORD', label: 'Rent for Parents', icon: Building2 },
                { id: 'BUILDING_SUPPLIER', label: 'Building Materials', icon: Building2 },
                { id: 'ARTISAN_INFORMAL', label: 'Market / Small Seller', icon: Store },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => updateForm({ payeeCategory: c.id as any })}
                  className={`p-3 rounded-2xl border text-xs font-bold text-left flex items-center gap-2 transition-all ${
                    form.payeeCategory === c.id
                      ? 'border-brand-primary bg-emerald-50 text-brand-dark ring-1 ring-brand-primary'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                  }`}
                >
                  <c.icon className="w-4 h-4 text-brand-primary" />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Payee Name & Live Network Status */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Organisation / School / Shop Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bright Future School or Alhaji Ganiyu Cement"
                value={form.payeeName}
                onChange={(e) => updateForm({ payeeName: e.target.value })}
                className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary font-medium"
              />

              {/* Dynamic Directory Status Badge */}
              <div className="mt-2">
                {form.payeeName.length > 2 && (
                  isPreVerified ? (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>
                        <strong>Case 2 (Pre-Verified):</strong> {form.payeeName} is already on the verified list! Bill check will be near-instant.
                      </span>
                    </div>
                  ) : isInformal ? (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs text-amber-900">
                      <Store className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span>
                        <strong>Small Seller (No CAC):</strong> Phone & account matched. Payout released strictly after family taps &ldquo;Received&rdquo; on site.
                      </span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-2 text-xs text-blue-900">
                      <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>
                        <strong>Case 1 (New Organisation):</strong> Verapay will query CAC database & verify account name while funds wait safely in escrow.
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Bank Code & NUBAN */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nigerian Commercial Bank</label>
                <select
                  value={form.bankCode}
                  onChange={(e) => updateForm({ bankCode: e.target.value })}
                  className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:border-brand-primary bg-white"
                >
                  <option value="058">Guaranty Trust Bank (GTB)</option>
                  <option value="011">First Bank of Nigeria</option>
                  <option value="033">United Bank for Africa (UBA)</option>
                  <option value="057">Zenith Bank</option>
                  <option value="044">Access Bank</option>
                  <option value="070">Fidelity Bank</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">10-Digit NUBAN Account</label>
                <input
                  type="text"
                  required
                  placeholder="0123456789"
                  value={form.accountNumber}
                  onChange={(e) => updateForm({ accountNumber: e.target.value })}
                  className="w-full p-3.5 rounded-2xl border border-slate-300 text-sm font-mono focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            {/* Amount */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Amount in USD ($)</label>
                <input
                  type="number"
                  required
                  min={10}
                  value={form.amountUSD}
                  onChange={(e) => updateForm({ amountUSD: parseFloat(e.target.value) || 0 })}
                  className="w-full p-3.5 rounded-2xl border border-slate-300 text-lg font-black focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Payout in Naira (₦)</label>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-lg font-black font-mono text-emerald-800">
                  {formatCurrency(form.amountUSD * 1650, 'NGN')}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Upload Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Upload Bill / Invoice / Slip</label>
            <div className="border-2 border-dashed border-slate-300 hover:border-brand-primary rounded-3xl p-7 text-center transition-colors cursor-pointer relative bg-slate-50/50">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-10 h-10 text-brand-primary mx-auto mb-2" />
              <span className="text-xs font-bold text-slate-800 block">
                {selectedFile ? selectedFile.name : 'Tap to upload tuition bill, hospital invoice, or materials quote'}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Gemini Multimodal OCR will extract line items, names, and compare prices with 2-3 local shops.
              </span>
            </div>
          </div>

          {/* Submit Escrow Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-brand-primary hover:bg-brand-dark text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Funding Escrow with PayPal...' : 'Fund Escrow & Run AI Verification'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
