import React from 'react';
import { MilestoneStage } from '@shared/types/index';
import { Check, Clock, Lock, ShieldCheck, Camera, Video } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface MilestoneStepperProps {
  milestones: MilestoneStage[];
  activeMilestoneId: string;
  onSelectMilestone: (id: string) => void;
}

export const MilestoneProgressStepper: React.FC<MilestoneStepperProps> = ({
  milestones,
  activeMilestoneId,
  onSelectMilestone,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Project Milestone Stages</h3>
          <p className="text-xs text-gray-500">Funds are released stage-by-stage only after live verification.</p>
        </div>
        <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
          2% Milestone Fee Escrow
        </span>
      </div>

      <div className="space-y-4">
        {milestones.map((m, idx) => {
          const isCompleted = m.status === 'COMPLETED';
          const isInProgress = m.status === 'VERIFYING' || m.status === 'READY_FOR_APPROVAL';
          const isSelected = m.id === activeMilestoneId;

          return (
            <div
              key={m.id}
              onClick={() => onSelectMilestone(m.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'border-brand-primary bg-brand-light/30 ring-1 ring-brand-primary'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Step Circle */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isInProgress
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900">{m.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                    <span className="font-semibold text-gray-700">
                      {formatCurrency(m.targetBudgetUSD, 'USD')}
                    </span>
                    &bull;
                    <span className="flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5" /> {m.photoCount} Photos
                    </span>
                    {m.videoVerified && (
                      <span className="flex items-center gap-1 text-emerald-600 font-medium">
                        <Video className="w-3.5 h-3.5" /> 15s Video Verified
                      </span>
                    )}
                    {m.surveyorVisited && (
                      <span className="flex items-center gap-1 text-indigo-600 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" /> Surveyor Audited
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                {isCompleted && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">
                    PAID & RELEASED
                  </span>
                )}
                {isInProgress && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> AWAITING APPROVAL
                  </span>
                )}
                {!isCompleted && !isInProgress && (
                  <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> LOCKED
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
