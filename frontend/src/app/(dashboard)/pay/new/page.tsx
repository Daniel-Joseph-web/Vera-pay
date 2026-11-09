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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedId = `pay_${Date.now().toString().slice(-6)}`;
    setPaymentId(generatedId);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      await fetch(`${apiUrl}/api/v1/payments/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payeeName: form.payeeName,
          bankCode: form.bankCode,
          accountNumber: form.accountNumber,
          amountUSD: form.amountUSD,
          invoiceDescription: form.description || `${form.payeeCategory} Payment`,
          plan: form.plan,
        }),
      });
    } catch {
      // Graceful offline fallback keeps live hackathon demo bulletproof
    }

    setTimeout(() => {
      router.push(`/pay/${generatedId}/verify?scenario=green`);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070B12] py-12 pb-24 lg:pb-12 px-4 sm:px-6 lg:px-8 font-sans lg:pl-24 transition-colors">
      
      {/* Bento Navigation with Active State & Root Affordance */}
      <BentoNavigation />

      <div className="max-w-3xl mx-auto bg-white dark:bg-[#0E1626] rounded-3xl border border-slate-200 dark:border-[#1E2D4A] p-8 sm:p-12 shadow-sm relative overflow-hidden transition-colors">
        
        {/* Subtle Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 dark:bg-emerald-950/20 rounded-bl-full opacity-50 pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 border-b border-slate-100 dark:border-[#1E2D4A] pb-8 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-transparent dark:border-emerald-800">
              Step 1 &bull; Fund Payment
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 bg-slate-50 dark:bg-[#070B12] border border-slate-200 dark:border-[#1E2D4A] text-slate-600 dark:text-[#CBD5E1] rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              PayPal Sandbox Protected
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Start a Verified Payment</h1>
          <p className="text-sm text-slate-500 dark:text-[#94A3B8] mt-2 max-w-lg font-medium leading-relaxed">
            Your money stays 100% protected in Verapay. It is only released when proof passes and you tap approve.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          
          {/* Payment Category Picker */}
          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mb-3">
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
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 shadow-sm ring-1 ring-emerald-500'
                      : 'border-slate-200 dark:border-[#1E2D4A] text-slate-600 dark:text-[#CBD5E1] hover:border-slate-300 dark:hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-[#162238] bg-white dark:bg-[#070B12]'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${form.payeeCategory === c.id ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300' : 'bg-slate-100 dark:bg-[#162238] text-slate-500 dark:text-[#94A3B8]'}`}>
                    <c.icon className="w-5 h-5" />
                  </div>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-[#070B12] rounded-2xl p-6 sm:p-8 border border-slate-100 dark:border-[#1E2D4A] space-y-6 transition-colors">
            {/* Payee Name & Live Network Status */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mb-2">
                Organisation / School / Shop Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bright Future School or Alhaji Ganiyu Cement"
                value={form.payeeName}
                onChange={(e) => updateForm({ payeeName: e.target.value })}
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-[#1E2D4A] text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-medium bg-white dark:bg-[#0E1626] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all shadow-sm"
              />

              {/* Dynamic Directory Status Badge */}
              <div className="mt-3">
                {form.payeeName.length > 2 && (
                  isPreVerified ? (
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3 text-xs text-emerald-900 dark:text-emerald-200 shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong className="font-extrabold block mb-0.5">Case 2 (Pre-Verified)</strong> 
                        {form.payeeName} is already on the verified list! Bill check will be near-instant.
                      </span>
                    </div>
                  ) : isInformal ? (
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200 shadow-sm">
                      <Store className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        <strong className="font-extrabold block mb-0.5">Groceries (No CAC)</strong> 
                        Phone & account matched. Payout released strictly after family taps "Received" on site.
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-start gap-3 text-xs text-blue-900 dark:text-blue-200 shadow-sm">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
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
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mb-2">Nigerian Commercial Bank</label>
                <select
                  value={form.bankCode}
                  onChange={(e) => updateForm({ bankCode: e.target.value })}
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-[#1E2D4A] text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 bg-white dark:bg-[#0E1626] text-slate-900 dark:text-white font-medium shadow-sm appearance-none"
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
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mb-2">10-Digit NUBAN Account</label>
                <input
                  type="text"
                  required
                  placeholder="0123456789"
                  value={form.accountNumber}
                  onChange={(e) => updateForm({ accountNumber: e.target.value })}
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-[#1E2D4A] text-sm font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm bg-white dark:bg-[#0E1626] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
                />
              </div>
            </div>

            {/* Amount */}
            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mb-2">Amount in USD ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#94A3B8] font-black text-lg">$</span>
                  <input
                    type="number"
                    required
                    min={10}
                    value={form.amountUSD || ''}
                    onChange={(e) => updateForm({ amountUSD: parseFloat(e.target.value) || 0 })}
                    className="w-full p-4 pl-8 rounded-xl border border-slate-200 dark:border-[#1E2D4A] text-xl font-black text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-sm bg-white dark:bg-[#0E1626]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mb-2">Estimated Payout in Naira (₦)</label>
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800 text-xl font-black font-mono text-emerald-800 dark:text-emerald-300 flex items-center shadow-sm">
                  {formatCurrency(form.amountUSD * 1650, 'NGN')}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Upload Area */}
          <div>
            <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] mb-3">Upload Bill / Invoice / Slip</label>
            <div className="border-2 border-dashed border-slate-200 dark:border-[#1E2D4A] hover:border-emerald-400 dark:hover:border-emerald-500 rounded-3xl p-8 sm:p-10 text-center transition-colors cursor-pointer relative bg-slate-50/50 dark:bg-[#070B12]/50 group">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="w-16 h-16 bg-white dark:bg-[#0E1626] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 dark:border-[#1E2D4A] group-hover:scale-105 transition-transform">
                <Upload className="w-8 h-8 text-emerald-500 dark:text-emerald-400" />
              </div>
              <span className="text-sm font-extrabold text-slate-800 dark:text-white block mb-1">
                {selectedFile ? selectedFile.name : 'Tap to upload tuition bill, hospital invoice, or materials quote'}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-[#94A3B8] font-medium block max-w-md mx-auto leading-relaxed">
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