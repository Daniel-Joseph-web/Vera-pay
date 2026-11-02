import React from 'react';
import { SharedPotDetails } from '@shared/types/index';
import { Users, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface SharedPotProps {
  pot: SharedPotDetails;
  onChipIn: (potId: string) => void;
}

export const SharedPotWidget: React.FC<SharedPotProps> = ({ pot, onChipIn }) => {
  const percentFunded = Math.min(100, Math.round((pot.collectedAmountUSD / pot.targetAmountUSD) * 100));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-primary uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" /> Verapay Plus Shared Pot
          </div>
          <h3 className="text-xl font-bold text-gray-900 mt-1">{pot.title}</h3>
          <p className="text-xs text-gray-500 mt-0.5">Direct institutional settlement once 100% funded.</p>
        </div>
        <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
          Family Group
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between items-baseline mb-2">
          <div>
            <span className="text-2xl font-black text-gray-900">{formatCurrency(pot.collectedAmountUSD, 'USD')}</span>
            <span className="text-sm text-gray-500"> / {formatCurrency(pot.targetAmountUSD, 'USD')}</span>
          </div>
          <span className="text-sm font-bold text-emerald-600">{percentFunded}% Funded</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-brand-primary h-full rounded-full transition-all duration-500"
            style={{ width: `${percentFunded}%` }}
          />
        </div>
      </div>

      {/* Sibling Contributors List */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" /> Sibling Contributions
        </h4>
        <div className="space-y-2">
          {pot.contributors.map((c, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <span className="font-semibold text-gray-700">{c.fullName}</span>
              <span className="font-mono font-bold text-emerald-700">{formatCurrency(c.amountUSD, 'USD')}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-6">
        <button
          onClick={() => onChipIn(pot.id)}
          className="w-full py-3 bg-brand-primary hover:bg-brand-dark text-white font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors"
        >
          Chip In with PayPal <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
