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
    <div className="bg-white dark:bg-[#0E1626] rounded-xl border border-gray-200 dark:border-[#1E2D4A] p-6 shadow-sm transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Project Milestone Stages</h3>
          <p className="text-xs text-gray-500 dark:text-[#94A3B8]">Funds are released stage-by-stage only after live verification.</p>
        </div>
        <span className="text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
          2% Milestone Verification Fee
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
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
                  : 'border-gray-200 dark:border-[#1E2D4A] hover:border-gray-300 dark:hover:border-emerald-500/40 bg-white dark:bg-[#070B12]'
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
                      : 'bg-gray-100 dark:bg-[#162238] text-gray-400 dark:text-[#94A3B8]'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{m.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-[#94A3B8] mt-0.5">
                    <span className="font-semibold text-gray-700 dark:text-[#CBD5E1]">
                      {formatCurrency(m.targetBudgetUSD, 'USD')}
                    </span>
                    &bull;
                    <span className="flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5" /> {m.photoCount} Photos
                    </span>
                    {m.videoVerified && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <Video className="w-3.5 h-3.5" /> 15s Video Verified
                      </span>
                    )}
                    {m.surveyorVisited && (
                      <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" /> Surveyor Audited
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                {isCompleted && (
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-1 rounded border border-transparent dark:border-emerald-800">
                    PAID & RELEASED
                  </span>
                )}
                {isInProgress && (
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-1 rounded flex items-center gap-1 border border-transparent dark:border-amber-800">
                    <Clock className="w-3.5 h-3.5" /> AWAITING APPROVAL
                  </span>
                )}
                {!isCompleted && !isInProgress && (
                  <span className="text-xs font-medium text-gray-400 dark:text-[#94A3B8] flex items-center gap-1">
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
