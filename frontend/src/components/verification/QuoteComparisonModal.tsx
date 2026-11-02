import React from 'react';
import { X, TrendingDown, Store, Phone, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export interface SupplierQuote {
  name: string;
  location: string;
  price: number;
  phone: string;
}

interface QuoteModalProps {
  materialName: string;
  contractorPrice: number;
  marketAveragePrice: number;
  cheaperSuppliers: SupplierQuote[];
  onSelectSupplier: (supplier: SupplierQuote) => void;
  onClose: () => void;
}

export const QuoteComparisonModal: React.FC<QuoteModalProps> = ({
  materialName,
  contractorPrice,
  marketAveragePrice,
  cheaperSuppliers,
  onSelectSupplier,
  onClose,
}) => {
  const savings = contractorPrice - marketAveragePrice;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
        <div className="flex justify-between items-start pb-4 border-b">
          <div>
            <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold uppercase tracking-wider">
              <TrendingDown className="w-4 h-4" /> Quote Agent &bull; Price Comparison
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-1">{materialName}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Delta Comparison */}
        <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 grid grid-cols-2 gap-3">
          <div>
            <span className="text-xs text-amber-800 font-medium block">Contractor Quote</span>
            <span className="text-lg font-bold text-gray-900">{formatCurrency(contractorPrice, 'NGN')}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-emerald-800 font-medium block">Local Market Average</span>
            <span className="text-lg font-bold text-emerald-700">{formatCurrency(marketAveragePrice, 'NGN')}</span>
          </div>
          <div className="col-span-2 pt-2 border-t border-amber-200/60 text-xs text-amber-900 font-semibold flex justify-between">
            <span>Potential Savings:</span>
            <span className="text-emerald-700 font-bold">Save {formatCurrency(savings, 'NGN')}</span>
          </div>
        </div>

        {/* Alternative Verified Suppliers */}
        <div className="mt-5">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Recommended Verified Suppliers in Your Area
          </h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {cheaperSuppliers.map((s, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <Store className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-sm text-gray-900">{s.name}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                    <span>{s.location}</span> &bull;
                    <span className="flex items-center gap-1 font-mono"><Phone className="w-3 h-3" /> {s.phone}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-700">{formatCurrency(s.price, 'NGN')}</div>
                  <button
                    onClick={() => onSelectSupplier(s)}
                    className="mt-1 px-3 py-1 bg-brand-primary hover:bg-brand-dark text-white text-xs font-semibold rounded-md shadow-sm"
                  >
                    Pay Supplier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Keep Contractor Quote
          </button>
        </div>
      </div>
    </div>
  );
};
