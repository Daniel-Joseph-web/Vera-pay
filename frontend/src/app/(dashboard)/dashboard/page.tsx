import Link from 'next/link';
import { VerapayLogo } from '@/components/brand/VerapayLogo';
import {
  ShieldCheck,
  ArrowUpRight,
  Plus,
  Users,
  Building,
  AlertTriangle,
  AlertOctagon
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const activePayments = [
    {
      id: 'pay_school_fees',
      title: 'Ada School Fees - Bright Future School',
      category: 'Tuition & Education',
      payee: 'Bright Future Academy Ltd (CAC #RC-892182)',
      amountUSD: 400,
      amountNGN: 660000,
      status: 'READY_FOR_APPROVAL',
      signal: 'GREEN',
      createdAt: 'Today, 11:20 AM',
      verdictText: 'All good. CAC confirmed & invoice verified.',
    },
    {
      id: 'pay_padded_cement',
      title: '500 Bags Dangote Cement - Stage 2',
      category: 'Building Materials',
      payee: 'Engr. Kayode (Building Contractor)',
      amountUSD: 4303,
      amountNGN: 7100000,
      status: 'AMBER_FLAGGED',
      signal: 'AMBER',
      createdAt: 'Yesterday, 3:45 PM',
      verdictText: 'Price high (+24%). Quote Agent found cheaper local shops.',
    },
    {
      id: 'pay_reused_photo',
      title: 'Roof Covering Milestone Claim',
      category: 'Milestone Escrow',
      payee: 'Alhaji Sikiru Builders',
      amountUSD: 2000,
      amountNGN: 3300000,
      status: 'PROOF_FAILED',
      signal: 'RED',
      createdAt: 'Oct 28, 2026',
      verdictText: 'Proof failed. Duplicate photo caught from August.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-brand-light shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-brand-primary tracking-wider">
                Verapay Escrow Portal
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-brand-light text-brand-dark rounded-full border border-brand-primary/20">
                Protected by PayPal Sandbox Rails
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-dark mt-1">Sender Overview</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Funds are held safely in escrow. AI checks the bill; you approve every release.
            </p>
          </div>

          <Link
            href="/pay/new"
            className="px-6 py-3.5 bg-brand-primary hover:bg-brand-dark text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-xs"
          >
            <Plus className="w-4 h-4 text-brand-gold" /> Start Verified Payment
          </Link>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Protected in Escrow</span>
            <div className="text-3xl sm:text-4xl font-black text-brand-dark my-2">{formatCurrency(6703, 'USD')}</div>
            <span className="text-xs text-brand-dark font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-primary" /> 3 Payments Active in Escrow
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-brand-primary shadow-sm flex flex-col justify-between relative">
            <span className="text-[11px] font-bold text-brand-primary uppercase tracking-wider">Active Plan</span>
            <div className="text-3xl sm:text-4xl font-black text-brand-dark my-2">Verapay Plus</div>
            <span className="text-xs text-slate-600 font-medium">
              $9.99/mo &bull; Family Group & Sibling Pot Active
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cheats / Padded Bills Caught</span>
            <div className="text-3xl sm:text-4xl font-black text-brand-gold my-2">₦1,700,000</div>
            <span className="text-xs text-slate-500 font-medium">Saved on inflated cement & fake photos</span>
          </div>
        </div>

        {/* Active Escrow Payments List */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="font-black text-lg text-brand-dark">Active Escrow & Verification Queue</h3>
              <p className="text-xs text-slate-500 mt-0.5">Click &ldquo;Review Proof&rdquo; to test the Gate 4 decision flow.</p>
            </div>
            <span className="text-xs font-bold text-slate-400">3 Items</span>
          </div>

          <div className="divide-y divide-slate-100">
            {activePayments.map((p) => {
              const isGreen = p.signal === 'GREEN';
              const isAmber = p.signal === 'AMBER';
              const isRed = p.signal === 'RED';

              return (
                <div key={p.id} className="p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 hover:bg-brand-light/20 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl flex-shrink-0 ${
                      isGreen ? 'bg-brand-light text-brand-dark' :
                      isAmber ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {isGreen && <ShieldCheck className="w-6 h-6" />}
                      {isAmber && <AlertTriangle className="w-6 h-6" />}
                      {isRed && <AlertOctagon className="w-6 h-6" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                          isGreen ? 'bg-brand-light text-brand-dark border border-brand-primary/20' :
                          isAmber ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                          'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {p.signal} SIGNAL
                        </span>
                        <span className="text-xs text-slate-400">&bull; {p.category}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base mt-1">{p.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{p.verdictText}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <div className="lg:text-right">
                      <span className="text-base font-black text-slate-900 block">{formatCurrency(p.amountUSD, 'USD')}</span>
                      <span className="text-xs font-mono text-slate-400">({formatCurrency(p.amountNGN, 'NGN')})</span>
                    </div>

                    <Link
                      href={`/pay/${p.id}/verify?scenario=${p.signal.toLowerCase()}`}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <span>Review Proof</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dual Cards for Verapay Plus & Verapay Projects */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/family"
            className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-brand-primary transition-all shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-light text-brand-primary flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase text-brand-primary tracking-wider">Verapay Plus Hub</span>
              <h3 className="text-xl font-black text-brand-dark mt-1">The Balogun Family Account</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Siblings in Manchester, Toronto, and Houston pooling $1,200 for Dad&apos;s surgery at LUTH. View transparent family receipts.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-brand-primary">
              <span>Open Family Transparent Ledger</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/projects/proj-881"
            className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-brand-gold transition-all shadow-sm flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-brand-gold flex items-center justify-center font-bold mb-4 group-hover:scale-105 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase text-brand-gold tracking-wider">Verapay Projects</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">4-Bedroom Duplex in Ibadan</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Stage 2 (Blockwork to Lintel). 8 live photos verified, surprise 15-second video verified, Quote Agent saved ₦340k.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-brand-gold">
              <span>View Milestone Stepper & Site Cam</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
