import React from 'react';
import { TrafficLightSignal, VerificationCheckItem } from '@shared/types/index';
import { ShieldCheck, AlertTriangle, AlertOctagon, CheckCircle2, XCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export interface TrafficLightCardProps {
  paymentId: string;
  signal: TrafficLightSignal;
  headline: string;
  description: string;
  checks: VerificationCheckItem[];
  amountUSD: number;
  amountNGN: number;
  providerName: string;
  isPlusUser?: boolean;
  onApprove: (id: string) => Promise<void>;
  onRefund: (id: string) => Promise<void>;
  onViewQuotes?: () => void;
  onRequestHumanReview?: () => void;
}

export const TrafficLightDecisionCard: React.FC<TrafficLightCardProps> = ({
  paymentId,
  signal,
  headline,
  description,
  checks,
  amountUSD,
  amountNGN,
  providerName,
  isPlusUser = false,
  onApprove,
  onRefund,
  onViewQuotes,
  onRequestHumanReview,
}) => {
  const isGreen = signal === 'GREEN';
  const isAmber = signal === 'AMBER';
  const isRed = signal === 'RED';

  return (
    <div className={`rounded-xl border p-6 shadow-sm transition-all ${
      isGreen ? 'border-signal-green-border bg-signal-green-bg/20' :
      isAmber ? 'border-signal-amber-border bg-signal-amber-bg/20' :
      'border-signal-red-border bg-signal-red-bg/20'
    }`}>
      {/* Header Banner */}
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${
          isGreen ? 'bg-signal-green-bg text-signal-green-text' :
          isAmber ? 'bg-signal-amber-bg text-signal-amber-text' :
          'bg-signal-red-bg text-signal-red-text'
        }`}>
          {isGreen && <ShieldCheck className="w-8 h-8" />}
          {isAmber && <AlertTriangle className="w-8 h-8" />}
          {isRed && <AlertOctagon className="w-8 h-8" />}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className={`px-2.5 py-0.5 text-xs font-bold rounded uppercase tracking-wider ${
              isGreen ? 'bg-signal-green-bg text-signal-green-text border border-signal-green-border' :
              isAmber ? 'bg-signal-amber-bg text-signal-amber-text border border-signal-amber-border' :
              'bg-signal-red-bg text-signal-red-text border border-signal-red-border'
            }`}>
              {signal} RISK VERDICT
            </span>
            <span className="text-xs text-gray-500 font-mono">ID: {paymentId}</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-1">{headline}</h2>
          <p className="text-sm text-gray-600 mt-0.5">{description}</p>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mt-5 p-4 rounded-lg bg-white border border-gray-200 grid grid-cols-2 gap-4">
        <div>
          <span className="text-xs text-gray-500 block">Verified Beneficiary</span>
          <span className="text-sm font-semibold text-gray-900">{providerName}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 block">Protected Amount</span>
          <span className="text-base font-bold text-gray-900">{formatCurrency(amountUSD, 'USD')}</span>
          <span className="text-xs text-gray-400 block font-mono">({formatCurrency(amountNGN, 'NGN')})</span>
        </div>
      </div>

      {/* Verification Item Checklist */}
      <div className="mt-4 space-y-2">
        <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Automated Verification Checks</h4>
        <div className="divide-y divide-gray-100 rounded-lg bg-white border border-gray-200 overflow-hidden">
          {checks.map((chk) => (
            <div key={chk.id} className="p-3 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2.5">
                {chk.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500" />
                )}
                <span className="text-gray-800 font-medium">{chk.name}</span>
              </div>
              <span className={`text-xs font-semibold ${chk.passed ? 'text-gray-500' : 'text-amber-700'}`}>
                {chk.statusText}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        {isGreen && (
          <>
            <button
              onClick={() => onApprove(paymentId)}
              className="flex-1 py-3 px-4 bg-brand-primary hover:bg-brand-dark text-white font-bold rounded-lg shadow transition-colors text-center"
            >
              Approve & Release {formatCurrency(amountUSD, 'USD')}
            </button>
            <button
              onClick={() => onRefund(paymentId)}
              className="py-3 px-4 text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Cancel & Refund
            </button>
          </>
        )}

        {isAmber && (
          <>
            {onViewQuotes && (
              <button
                onClick={onViewQuotes}
                className="flex-1 py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow transition-colors text-center"
              >
                View Cheaper Suppliers
              </button>
            )}
            {onRequestHumanReview && (
              <button
                onClick={onRequestHumanReview}
                className="py-3 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-sm"
              >
                Request Human Review {isPlusUser && <span className="text-emerald-600">(Fast Track)</span>}
              </button>
            )}
            <button
              onClick={() => onApprove(paymentId)}
              className="py-3 px-4 text-gray-500 hover:text-gray-800 text-xs font-medium"
            >
              Override & Pay
            </button>
          </>
        )}

        {isRed && (
          <button
            onClick={() => onRefund(paymentId)}
            className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shadow transition-colors text-center"
          >
            Proof Failed &bull; Tap for 100% Instant Refund
          </button>
        )}
      </div>
    </div>
  );
};
