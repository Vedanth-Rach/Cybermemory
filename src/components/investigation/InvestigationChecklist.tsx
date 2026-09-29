import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { InvestigationStep, StepStatus } from '../../types/incident';
import { GlassCard } from '../common/GlassCard';
import {
  ListChecks,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Terminal,
  FileSearch,
  Check,
  PlayCircle
} from 'lucide-react';

export const InvestigationChecklist: React.FC = () => {
  const { investigation, updateStepStatus } = useSecurity();
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({
    'step-01': true,
    'step-02': true
  });

  if (!investigation) return null;

  const toggleExpand = (stepId: string) => {
    setExpandedSteps(prev => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const steps = investigation.steps;
  const completedCount = steps.filter(s => s.status === 'completed').length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  const getStatusBadge = (status: StepStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/80 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 animate-spin" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-700/60 px-2 py-0.5 rounded-full">
            Pending
          </span>
        );
    }
  };

  return (
    <GlassCard className="p-6">
      {/* Header and Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1B2947]">
        <div>
          <div className="flex items-center gap-2">
            <ListChecks className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              AI-Generated Investigation Steps
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Sequential triage procedures synthesized from previous similar incident resolutions.
          </p>
        </div>

        {/* Completion Progress Tracker */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-mono font-bold text-slate-200">
              {completedCount} of {steps.length} Steps Complete
            </div>
            <div className="text-[10px] text-cyan-400 font-mono">
              {progressPercent}% execution complete
            </div>
          </div>
          <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="mt-4 space-y-3">
        {steps.map((step: InvestigationStep) => {
          const isExpanded = !!expandedSteps[step.id];
          const isComplete = step.status === 'completed';

          return (
            <div
              key={step.id}
              className={`rounded-xl border transition-all ${
                isComplete
                  ? 'bg-[#091122]/60 border-emerald-950/80'
                  : 'bg-[#090F1E] border-[#1E2E50] hover:border-cyan-500/40'
              }`}
            >
              {/* Step Header */}
              <div
                onClick={() => toggleExpand(step.id)}
                className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {/* Step Number Circle */}
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-lg font-mono text-xs font-bold shrink-0 border ${
                      isComplete
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-cyan-950/80 text-cyan-400 border-cyan-800'
                    }`}
                  >
                    {step.stepNumber}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-xs font-bold truncate ${
                          isComplete ? 'text-slate-300 line-through opacity-80' : 'text-slate-100'
                        }`}
                      >
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2 shrink-0">
                  {getStatusBadge(step.status)}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStepStatus(step.id, isComplete ? 'pending' : 'completed');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all flex items-center gap-1 ${
                      isComplete
                        ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                        : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>{isComplete ? 'Mark Incomplete' : 'Mark Complete'}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(step.id);
                    }}
                    className="p-1 text-slate-400 hover:text-slate-200"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Step Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[#152138] space-y-3 text-xs">
                  {/* Detailed Guidance */}
                  <div className="p-3 rounded-lg bg-[#0C152B] border border-[#1E2E50] text-slate-300 leading-relaxed">
                    <div className="text-[10px] uppercase font-mono text-cyan-400 font-bold mb-1 flex items-center gap-1">
                      <FileSearch className="w-3 h-3 text-cyan-400" />
                      SOC Playbook Guidance
                    </div>
                    {step.detailedGuidance}
                  </div>

                  {/* Command Snippet (if available) */}
                  {step.commandSuggestion && (
                    <div className="p-3 rounded-lg bg-[#060913] border border-[#1E2E50] font-mono text-[11px] text-cyan-300">
                      <div className="text-[10px] uppercase font-mono text-slate-500 mb-1 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <Terminal className="w-3 h-3 text-slate-400" />
                          Recommended CLI Query
                        </span>
                        <span className="text-slate-600">PowerShell / Bash</span>
                      </div>
                      <code>{step.commandSuggestion}</code>
                    </div>
                  )}

                  {/* Evidence / Findings */}
                  {step.evidenceFound && (
                    <div className="p-3 rounded-lg bg-[#0A161E] border border-cyan-950 text-[11px] text-cyan-200">
                      <span className="text-cyan-400 font-semibold uppercase font-mono text-[10px] block mb-0.5">
                        Telemetry Finding:
                      </span>
                      {step.evidenceFound}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
