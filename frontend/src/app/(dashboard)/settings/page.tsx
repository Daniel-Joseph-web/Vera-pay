'use client';

import React, { useState } from 'react';
import {
  Sun,
  Moon,
  ShieldCheck,
  Bell,
  CreditCard,
  DollarSign,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { BentoNavigation } from '@/components/layout/BentoNavigation';
import { useTheme } from '@/components/layout/ThemeContext';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  // Currency & Rate state
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'EUR' | 'CAD'>('USD');

  // Forensic & Security toggles
  const [antiReplayEnabled, setAntiReplayEnabled] = useState(true);
  const [priceRadarTolerance, setPriceRadarTolerance] = useState('15%');
  const [videoAuditRequired, setVideoAuditRequired] = useState(true);

  // Notification toggles
  const [whatsAppAlerts, setWhatsAppAlerts] = useState(true);
  const [familyLedgerPublic, setFamilyLedgerPublic] = useState(true);

  // Save feedback state
  const [savedToast, setSavedToast] = useState(false);

  const showSaveToast = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2200);
  };

  const currencySymbols = {
    USD: '$ USD',
    GBP: '£ GBP',
    EUR: '€ EUR',
    CAD: '$ CAD',
  };

  const exchangeRates = {
    USD: '₦1,650.00',
    GBP: '₦2,130.00',
    EUR: '₦1,780.00',
    CAD: '₦1,210.00',
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 lg:pl-24 pb-24 lg:pb-12 ${
      isDark ? 'bg-[#070B12] text-[#F8FAFC]' : 'bg-[#F8FAFC] text-[#020617]'
    }`}>
      {/* Bento Navigation with Active Settings Tab */}
      <BentoNavigation />

      {/* Header Section */}
      <div className={`border-b transition-colors ${
        isDark ? 'bg-[#0E1626] border-[#1E2D4A]' : 'bg-white border-slate-200/90'
      } pt-10 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r ${
            isDark ? 'from-emerald-950/20 via-transparent to-slate-900/40' : 'from-emerald-50/60 via-white to-slate-50/50'
          } z-0`}></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                isDark 
                  ? 'text-emerald-300 bg-emerald-950/60 border-emerald-800/80' 
                  : 'text-emerald-700 bg-emerald-50 border-emerald-200'
              }`}>
                System Preferences
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                isDark ? 'text-slate-400 bg-slate-800' : 'text-slate-600 bg-slate-100'
              }`}>
                v2.0 Platform
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Settings & Preferences
            </h1>
            <p className={`mt-2 text-sm sm:text-base font-medium ${
              isDark ? 'text-[#CBD5E1]' : 'text-[#334155]'
            }`}>
              Configure appearance, diaspora conversion rails, forensic fraud safeguards, and notification preferences.
            </p>
          </div>

          {savedToast && (
            <div className="animate-in fade-in slide-in-from-top-2 bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-2 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" /> Settings updated
            </div>
          )}
        </div>
      </div>

      {/* Settings Grid Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8 relative z-20">
        
        {/* Section 1: Appearance & Theme Mode (Space Black / Clean Slate) */}
        <div className={`rounded-3xl border p-6 sm:p-8 transition-all shadow-sm ${
          isDark ? 'bg-[#0E1626] border-[#1E2D4A]' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
            }`}>
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Appearance & Display Theme</h2>
              <p className={`text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                Select your preferred visual style. Note: Dark mode applies strictly to dashboard pages; the landing page retains its original green look.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Light Mode Card */}
            <button
              onClick={() => {
                setTheme('light');
                showSaveToast();
              }}
              className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                !isDark
                  ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20 shadow-sm'
                  : 'border-[#1E2D4A] hover:border-slate-600 bg-[#070B12]/80'
              }`}
            >
              <div className={`p-3 rounded-xl ${!isDark ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}>
                <Sun className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-[#020617] dark:text-white">Light Studio Mode</span>
                  {!isDark && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1 leading-relaxed">
                  Clean crisp high-contrast daylight theme for desktop & outdoor review.
                </p>
              </div>
            </button>

            {/* Dark Mode Card (Space Black) */}
            <button
              onClick={() => {
                setTheme('dark');
                showSaveToast();
              }}
              className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                isDark
                  ? 'border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/30 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <div className={`p-3 rounded-xl ${isDark ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-200 text-slate-700'}`}>
                <Moon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-[#020617] dark:text-white">
                    Dark Space Black Mode
                  </span>
                  {isDark && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <p className="text-xs text-[#475569] dark:text-[#94A3B8] mt-1 leading-relaxed">
                  Deep Space Black (#070B12) with high-contrast AAA typography that eliminates screen glare.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Section 2: Diaspora Currency & Conversion Peg */}
        <div className={`rounded-3xl border p-6 sm:p-8 transition-all shadow-sm ${
          isDark ? 'bg-[#0E1626] border-[#1E2D4A]' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
            }`}>
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Diaspora Funding Currency</h2>
              <p className={`text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                Choose the currency you use to fund payments from abroad. Payouts are auto-calculated into Nigerian Naira (₦).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {(['USD', 'GBP', 'EUR', 'CAD'] as const).map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCurrency(c);
                  showSaveToast();
                }}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  currency === c
                    ? 'border-emerald-500 bg-emerald-500/10 font-bold ring-1 ring-emerald-500'
                    : isDark ? 'border-[#1E2D4A] hover:border-slate-700 font-medium' : 'border-slate-200 hover:border-slate-300 font-medium'
                }`}
              >
                <span className="text-base font-extrabold block">{currencySymbols[c]}</span>
                <span className={`text-[11px] font-mono mt-1 block ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                  1 {c} = {exchangeRates[c]}
                </span>
              </button>
            ))}
          </div>

          <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-medium ${
            isDark ? 'bg-[#070B12] border-[#1E2D4A] text-[#CBD5E1]' : 'bg-slate-50 border-slate-200 text-[#334155]'
          }`}>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>Live Bank Exchange Peg: <strong>1 {currency} &asymp; {exchangeRates[currency]} NIP Payout</strong></span>
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isDark ? 'text-emerald-300 bg-emerald-950/60' : 'text-emerald-700 bg-emerald-100'
            }`}>
              Indicative Sandbox Rate
            </span>
          </div>
        </div>

        {/* Section 3: AI Forensics & Fraud Safeguards */}
        <div className={`rounded-3xl border p-6 sm:p-8 transition-all shadow-sm ${
          isDark ? 'bg-[#0E1626] border-[#1E2D4A]' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">AI Forensics & Anti-Fraud Gates</h2>
              <p className={`text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                Fine-tune automated verification checks and image integrity inspections before money is released.
              </p>
            </div>
          </div>

          <div className={`divide-y ${isDark ? 'divide-[#1E2D4A]' : 'divide-slate-100'}`}>
            {/* Anti-Replay Photo Forensics */}
            <div className="py-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">Anti-Replay Duplicate Photo Detection</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isDark ? 'text-emerald-300 bg-emerald-950/60' : 'text-emerald-700 bg-emerald-100'
                  }`}>
                    pHash Active
                  </span>
                </div>
                <p className={`text-xs mt-1 max-w-xl leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                  Automatically cross-references contractor photos against previous builds to catch recycled or duplicate images.
                </p>
              </div>
              <button
                onClick={() => {
                  setAntiReplayEnabled(!antiReplayEnabled);
                  showSaveToast();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  antiReplayEnabled ? 'bg-emerald-600' : isDark ? 'bg-slate-700' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  antiReplayEnabled ? 'translate-x-6 shadow' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Price Radar Variance Tolerance */}
            <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">Quote Agent Price Variance Tolerance</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isDark ? 'text-amber-300 bg-amber-950/60' : 'text-amber-700 bg-amber-100'
                  }`}>
                    Wholesale Radar
                  </span>
                </div>
                <p className={`text-xs mt-1 max-w-xl leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                  Flag an amber alert when quoted material or tuition prices exceed local wholesale regional averages by this threshold.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {['10%', '15%', '25%'].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setPriceRadarTolerance(t);
                      showSaveToast();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      priceRadarTolerance === t
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : isDark ? 'border-[#1E2D4A] text-[#94A3B8] hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Surprise Video Audit Requirement */}
            <div className="py-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">Surprise 15s Video Milestone Audit</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isDark ? 'text-purple-300 bg-purple-950/60' : 'text-purple-700 bg-purple-100'
                  }`}>
                    Live Proof
                  </span>
                </div>
                <p className={`text-xs mt-1 max-w-xl leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                  Mandate an in-app 15-second impromptu video audit with randomized verification phrases on milestones over $1,000.
                </p>
              </div>
              <button
                onClick={() => {
                  setVideoAuditRequired(!videoAuditRequired);
                  showSaveToast();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  videoAuditRequired ? 'bg-emerald-600' : isDark ? 'bg-slate-700' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  videoAuditRequired ? 'translate-x-6 shadow' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Communication & Family Alerts */}
        <div className={`rounded-3xl border p-6 sm:p-8 transition-all shadow-sm ${
          isDark ? 'bg-[#0E1626] border-[#1E2D4A]' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
            }`}>
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Disbursement Notifications & Ledger Sync</h2>
              <p className={`text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                Control how and when beneficiaries and family contributors receive proof and confirmation messages.
              </p>
            </div>
          </div>

          <div className={`divide-y ${isDark ? 'divide-[#1E2D4A]' : 'divide-slate-100'}`}>
            {/* WhatsApp Payout Alert */}
            <div className="py-4 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-sm block">Instant WhatsApp Payout Receipts</span>
                <p className={`text-xs mt-1 max-w-xl leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                  Automatically send a PDF proof slip and NIP session reference via WhatsApp to both you and the Nigerian payee.
                </p>
              </div>
              <button
                onClick={() => {
                  setWhatsAppAlerts(!whatsAppAlerts);
                  showSaveToast();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  whatsAppAlerts ? 'bg-emerald-600' : isDark ? 'bg-slate-700' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  whatsAppAlerts ? 'translate-x-6 shadow' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Family Transparent Ledger Sync */}
            <div className="py-4 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-sm block">Family Hub Real-Time Ledger Feed</span>
                <p className={`text-xs mt-1 max-w-xl leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                  Broadcast verified payments to your shared family pot members so everyone sees full financial transparency.
                </p>
              </div>
              <button
                onClick={() => {
                  setFamilyLedgerPublic(!familyLedgerPublic);
                  showSaveToast();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  familyLedgerPublic ? 'bg-emerald-600' : isDark ? 'bg-slate-700' : 'bg-slate-300'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  familyLedgerPublic ? 'translate-x-6 shadow' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Section 5: Connected Payment Rails */}
        <div className={`rounded-3xl border p-6 sm:p-8 transition-all shadow-sm ${
          isDark ? 'bg-[#0E1626] border-[#1E2D4A]' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
            }`}>
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Connected Payment Rails</h2>
              <p className={`text-xs font-medium ${isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}`}>
                Active checkout integrations and outbound disbursement rails powering your payments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              isDark ? 'bg-[#070B12] border-[#1E2D4A]' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-black text-sm">
                  PP
                </div>
                <div>
                  <span className="font-extrabold text-sm block">PayPal Sandbox Inbound</span>
                  <span className="text-[11px] text-emerald-500 font-bold">Connected &bull; Active</span>
                </div>
              </div>
              <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>v2_orders</span>
            </div>

            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              isDark ? 'bg-[#070B12] border-[#1E2D4A]' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 font-black text-sm">
                  PS
                </div>
                <div>
                  <span className="font-extrabold text-sm block">Paystack NIP Transfers</span>
                  <span className="text-[11px] text-emerald-500 font-bold">Instant Payout Rail</span>
                </div>
              </div>
              <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>nip_direct</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
