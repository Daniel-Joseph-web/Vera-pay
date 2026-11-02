'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Upload,
  ShieldCheck,
  ArrowRight,
  Building2,
  Store,
  CheckCircle2,
  Clock,
  Activity,
  Home,
  GraduationCap
} from 'lucide-react';
import { usePaymentStore } from '@/stores/usePaymentStore';
import { formatCurrency } from '@/lib/utils';
import { BentoNavigation } from '@/components/layout/BentoNavigation';

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
    <div className="min-h-screen bg-[#F8FAFC] py-12 pb-24 lg:pb-12 px-4 sm:px-6 lg:px-8 font-sans lg:pl-24">
      
      {/* Bento Navigation with Active State & Root Affordance */}
      <BentoNavigation />

      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm relative overflow-hidden">
        
        {/* Subtle Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full opacity-50 pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 border-b border-slate-100 pb-8 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Step 1 &bull; Fund Payment
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              PayPal Sandbox Protected
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Start a Verified Payment</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-lg font-medium leading-relaxed">
            Your money stays 100% protected in Verapay. It is only released when proof passes and you tap approve.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          {/* Payment Category Picker */}
          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-3">
              Payment Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'SCHOOL', label: 'School Tuition', icon: GraduationCap },
                { id: 'HOSPITAL', label: 'Hospital & Clinic', icon: Activity },
                { id: 'LANDLORD', label: 'Rent', icon: Home },
                { id: 'BUILDING_SUPPLIER', label: 'Building Materials', icon: Building2 },
                { id: 'ARTISAN_INFORMAL', label: 'Groceries', icon: Store },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => updateForm({ payeeCategory: c.id as any })}
                  className={`p-4 rounded-2xl border text-xs font-bold text-left flex flex-col items-start gap-3 transition-all ${
                    form.payeeCategory === c.id
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm ring-1 ring-emerald-500'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 bg-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${form.payeeCategory === c.id ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    <c.icon className="w-5 h-5" />
                  </div>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 space-y-6">
            {/* Payee Name & Live Network Status */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">
                Organisation / School / Shop Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bright Future School or Alhaji Ganiyu Cement"
                value={form.payeeName}
                onChange={(e) => updateForm({ payeeName: e.target.value })}
                className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium bg-white text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
              />

              {/* Dynamic Directory Status Badge */}
              <div className="mt-3">
                {form.payeeName.length > 2 && (
                  isPreVerified ? (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-900 shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong className="font-extrabold block mb-0.5">Case 2 (Pre-Verified)</strong> 
                        {form.payeeName} is already on the verified list! Bill check will be near-instant.
                      </span>
                    </div>
                  ) : isInformal ? (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900 shadow-sm">
                      <Store className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong className="font-extrabold block mb-0.5">Groceries (No CAC)</strong> 
                        Phone & account matched. Payout released strictly after family taps "Received" on site.
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3 text-xs text-blue-900 shadow-sm">
                      <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong className="font-extrabold block mb-0.5">Case 1 (New Organisation)</strong> 
                        Verapay will query CAC database & verify account name while funds wait safely in your vault.
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Bank Code & NUBAN */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">Nigerian Commercial Bank</label>
                <select
                  value={form.bankCode}
                  onChange={(e) => updateForm({ bankCode: e.target.value })}
                  className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white text-slate-900 font-medium shadow-sm appearance-none"
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
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">10-Digit NUBAN Account</label>
                <input
                  type="text"
                  required
                  placeholder="0123456789"
                  value={form.accountNumber}
                  onChange={(e) => updateForm({ accountNumber: e.target.value })}
                  className="w-full p-4 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Amount */}
            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">Amount in USD ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-black text-lg">$</span>
                  <input
                    type="number"
                    required
                    min={10}
                    value={form.amountUSD || ''}
                    onChange={(e) => updateForm({ amountUSD: parseFloat(e.target.value) || 0 })}
                    className="w-full p-4 pl-8 rounded-xl border border-slate-200 text-xl font-black text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">Estimated Payout in Naira (₦)</label>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-xl font-black font-mono text-emerald-800 flex items-center shadow-sm">
                  {formatCurrency(form.amountUSD * 1650, 'NGN')}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Upload Area */}
          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-3">Upload Bill / Invoice / Slip</label>
            <div className="border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-3xl p-8 sm:p-10 text-center transition-colors cursor-pointer relative bg-slate-50/50 group">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 group-hover:scale-105 transition-transform">
                <Upload className="w-8 h-8 text-emerald-500" />
              </div>
              <span className="text-sm font-extrabold text-slate-800 block mb-1">
                {selectedFile ? selectedFile.name : 'Tap to upload tuition bill, hospital invoice, or materials quote'}
              </span>
              <span className="text-[11px] text-slate-500 font-medium block max-w-md mx-auto leading-relaxed">
                Gemini Multimodal OCR will extract line items, names, and compare prices with 2-3 local shops.
              </span>
            </div>
          </div>

          {/* Submit Payment Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 sm:py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50"
          >
            {isSubmitting ? 'Securing Payment with PayPal...' : 'Secure Payment & Run AI Verification'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}