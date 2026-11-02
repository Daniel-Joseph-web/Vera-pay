'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sun,
  Moon,
  ShieldCheck,
  Bell,
  CreditCard,
  Sliders,
  DollarSign,
  Smartphone,
  Eye,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Globe,
  Sparkles,
  Camera,
  RefreshCw
} from 'lucide-react';
import { BentoNavigation } from '@/components/layout/BentoNavigation';

export default function SettingsPage() {
  // Theme state
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // Currency & Rate state
  const [currency, setCurrency] = useState<'USD' | 'GBP' | 'EUR' | 'CAD'>('USD');

  // Forensic & Security toggles
  const [antiReplayEnabled, setAntiReplayEnabled] = useState(true);
  const [priceRadarTolerance, setPriceRadarTolerance] = useState('15%');
  const [videoAuditRequired, setVideoAuditRequired] = useState(true);
  const [twoFactorApproval, setTwoFactorApproval] = useState(true);

  // Notification toggles
  const [whatsAppAlerts, setWhatsAppAlerts] = useState(true);
  const [familyLedgerPublic, setFamilyLedgerPublic] = useState(true);
  const [emailSummaries, setEmailSummaries] = useState(true);

  // Save feedback state
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    // Check saved theme or system preference
    const saved = localStorage.getItem('verapay_theme') as 'light' | 'dark' | null;
    if (saved) {
      setThemeMode(saved);
      document.documentElement.classList.toggle('dark', saved === 'dark');
    }
  }, []);

  const handleThemeChange = (mode: 'light' | 'dark') => {
    setThemeMode(mode);
    localStorage.setItem('verapay_theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
    showSaveToast();
  };

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

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 lg:pl-24 pb-24 lg:pb-12 ${
      themeMode === 'dark' ? 'bg-[#0B131E] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'
    }`}>
      {/* Bento Navigation with Active Settings Tab */}
      <BentoNavigation />

      {/* Header Section */}
      <div className={`border-b transition-colors ${
        themeMode === 'dark' ? 'bg-[#0E1A29] border-slate-800' : 'bg-white border-slate-200/90'
      } pt-10 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-r ${
            themeMode === 'dark' ? 'from-emerald-950/20 via-transparent to-slate-900/40' : 'from-emerald-50/60 via-white to-slate-50/50'
          } z-0`}></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                System Preferences
              </span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-500/10 px-2.5 py-0.5 rounded-full">
                v2.0 Platform
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Settings & Preferences
            </h1>
            <p className={`mt-2 text-sm sm:text-base font-medium ${
              themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
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
        
        {/* Section 1: Appearance & Theme Mode */}
        <div className={`rounded-3xl border p-6 sm:p-8 transition-all shadow-sm ${
          themeMode === 'dark' ? 'bg-[#111F33] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Appearance & Display Theme</h2>
              <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Select your preferred visual style for the dashboard and verification flow.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Light Mode Card */}
            <button
              onClick={() => handleThemeChange('light')}
              className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                themeMode === 'light'
                  ? 'border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
              }`}
            >
              <div className={`p-3 rounded-xl ${themeMode === 'light' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>
                <Sun className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900">Light Studio Mode</span>
                  {themeMode === 'light' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Clean crisp high-contrast daylight theme for desktop & outdoor review.
                </p>
              </div>
            </button>

            {/* Dark Mode Card */}
            <button
              onClick={() => handleThemeChange('dark')}
              className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                themeMode === 'dark'
                  ? 'border-emerald-500 bg-emerald-950/40 ring-2 ring-emerald-500/30 shadow-sm'
                  : 'border-slate-700/60 hover:border-slate-600 bg-slate-900/40'
              }`}
            >
              <div className={`p-3 rounded-xl ${themeMode === 'dark' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                <Moon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`font-extrabold text-sm ${themeMode === 'dark' ? 'text-white' : 'text-slate-200'}`}>
                    Dark Obsidian Mode
                  </span>
                  {themeMode === 'dark' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Deep slate & emerald dark theme that reduces glare during night inspections.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Section 2: Diaspora Currency & Conversion Peg */}
        <div className={`rounded-3xl border p-6 sm:p-8 transition-all shadow-sm ${
          themeMode === 'dark' ? 'bg-[#111F33] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Diaspora Funding Currency</h2>
              <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
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
                    : 'border-slate-200/80 hover:border-slate-300 font-medium'
                }`}
              >
                <span className="text-base font-extrabold block">{currencySymbols[c]}</span>
                <span className="text-[11px] text-emerald-600 font-mono mt-1 block">
                  1 {c} = {exchangeRates[c]}
                </span>
              </button>
            ))}
          </div>

          <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-medium ${
            themeMode === 'dark' ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>Live Bank Exchange Peg: <strong>1 {currency} &asymp; {exchangeRates[currency]} NIP Payout</strong></span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-full">
              Real-time Mid-Market
            </span>
          </div>
        </div>

        {/* Section 3: AI Forensics & Fraud Safeguards */}
        <div className={`rounded-3xl border p-6 sm:p-8 transition-all shadow-sm ${
          themeMode === 'dark' ? 'bg-[#111F33] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">AI Forensics & Anti-Fraud Gates</h2>
              <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Fine-tune automated verification checks and image integrity inspections before money is released.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* Anti-Replay Photo Forensics */}
            <div className="py-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">Anti-Replay Duplicate Photo Detection</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    pHash Active
                  </span>
                </div>
                <p className={`text-xs mt-1 max-w-xl leading-relaxed ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Automatically cross-references contractor photos against previous builds to catch recycled or duplicate images.
                </p>
              </div>
              <button
                onClick={() => {
                  setAntiReplayEnabled(!antiReplayEnabled);
                  showSaveToast();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  antiReplayEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
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
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    Wholesale Radar
                  </span>
                </div>
                <p className={`text-xs mt-1 max-w-xl leading-relaxed ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
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
                        : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800'
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
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded-full">
                    Live Proof
                  </span>
                </div>
                <p className={`text-xs mt-1 max-w-xl leading-relaxed ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Mandate an in-app 15-second impromptu video audit with randomized verification phrases on milestones over $1,000.
                </p>
              </div>
              <button
                onClick={() => {
                  setVideoAuditRequired(!videoAuditRequired);
                  showSaveToast();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  videoAuditRequired ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
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
          themeMode === 'dark' ? 'bg-[#111F33] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Disbursement Notifications & Ledger Sync</h2>
              <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Control how and when beneficiaries and family contributors receive proof and confirmation messages.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* WhatsApp Payout Alert */}
            <div className="py-4 flex items-center justify-between gap-4">
              <div>
                <span className="font-bold text-sm block">Instant WhatsApp Payout Receipts</span>
                <p className={`text-xs mt-1 max-w-xl leading-relaxed ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Automatically send a PDF proof slip and NIP session reference via WhatsApp to both you and the Nigerian payee.
                </p>
              </div>
              <button
                onClick={() => {
                  setWhatsAppAlerts(!whatsAppAlerts);
                  showSaveToast();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  whatsAppAlerts ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
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
                <p className={`text-xs mt-1 max-w-xl leading-relaxed ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  Broadcast verified payments to your shared family pot members so everyone sees full financial transparency.
                </p>
              </div>
              <button
                onClick={() => {
                  setFamilyLedgerPublic(!familyLedgerPublic);
                  showSaveToast();
                }}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                  familyLedgerPublic ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
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
          themeMode === 'dark' ? 'bg-[#111F33] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Connected Payment Rails</h2>
              <p className={`text-xs font-medium ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Active checkout integrations and outbound disbursement rails powering your payments.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              themeMode === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-black text-sm">
                  PP
                </div>
                <div>
                  <span className="font-extrabold text-sm block">PayPal Sandbox Inbound</span>
                  <span className="text-[11px] text-emerald-600 font-bold">Connected &bull; Active</span>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">v2_orders</span>
            </div>

            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              themeMode === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 font-black text-sm">
                  PS
                </div>
                <div>
                  <span className="font-extrabold text-sm block">Paystack NIP Transfers</span>
                  <span className="text-[11px] text-emerald-600 font-bold">Instant Payout Rail</span>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono">nip_direct</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
