import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  CheckCircle,
  Eye,
  BrainCircuit,
  ShieldAlert,
  ArrowRight,
  X
} from 'lucide-react';

export const DemoFlowBanner: React.FC = () => {
  const {
    isDemoMode,
    setIsDemoMode,
    demoStep,
    nextDemoStep,
    prevDemoStep,
    resetDemo,
    selectAlert,
    alerts,
    setIsResolveModalOpen,
    reanalyzeCurrentAlert,
    setCurrentView
  } = useSecurity();

  if (!isDemoMode) return null;

  const stepsInfo = [
    {
      step: 1,
      title: 'Step 1: SOC Overview Dashboard',
      description: 'Observe real-time threat activity, active alerts, and Hindsight Memory metrics.',
      actionLabel: 'Proceed to Alert Selection',
      onAction: () => nextDemoStep()
    },
    {
      step: 2,
      title: 'Step 2: Select High-Priority Alert',
      description: 'Notice "Multiple Failed Login Attempts" (5 related incidents in memory). Click to investigate.',
      actionLabel: 'Investigate Alert',
      onAction: () => {
        const target = alerts.find(a => a.incidentId === 'INC-2026-00421') || alerts[0];
        selectAlert(target);
        nextDemoStep();
      }
    },
    {
      step: 3,
      title: 'Step 3: Alert Details Workspace',
      description: 'Inspect technical indicators: IP 185.73.22.41, DC-01, admin@company.local, 27 attempts.',
      actionLabel: 'Trigger AI Analysis',
      onAction: () => {
        reanalyzeCurrentAlert();
        nextDemoStep();
      }
    },
    {
      step: 4,
      title: 'Step 4: AI Analysis & Confidence Assessment',
      description: 'CyberMemory AI completes triage with 91% confidence, diagnosing credential spray.',
      actionLabel: 'Inspect Hindsight Memories',
      onAction: () => nextDemoStep()
    },
    {
      step: 5,
      title: 'Step 5: 5 Related Incidents in Hindsight Memory',
      description: 'Hindsight retrieved 5 matching cases (94% match on INC-2026-00317). Observe historical patterns.',
      actionLabel: 'View AI Recommendations',
      onAction: () => nextDemoStep()
    },
    {
      step: 6,
      title: 'Step 6: AI-Generated Investigation Steps',
      description: 'AI adapts historical resolution knowledge into 5 numbered operational actions.',
      actionLabel: 'Mark Steps Complete',
      onAction: () => nextDemoStep()
    },
    {
      step: 7,
      title: 'Step 7: Execute & Follow Investigation Steps',
      description: 'Analyst verifies Event ID 4624 log and checks credential exposure telemetry.',
      actionLabel: 'Open Resolution Workflow',
      onAction: () => {
        setIsResolveModalOpen(true);
        nextDemoStep();
      }
    },
    {
      step: 8,
      title: 'Step 8: Resolve Incident Modal',
      description: 'Specify root cause, actions taken, and ensure "Save this incident to Hindsight Memory" is enabled.',
      actionLabel: 'Resolve & Store Memory',
      onAction: () => {
        setIsResolveModalOpen(true);
        nextDemoStep();
      }
    },
    {
      step: 9,
      title: 'Step 9: Commit Experience to Memory',
      description: 'Click "Resolve & Store Memory" to write the incident into the persistent Hindsight knowledge base.',
      actionLabel: 'Confirm Resolution',
      onAction: () => nextDemoStep()
    },
    {
      step: 10,
      title: 'Step 10: Confirmation of Stored Memory',
      description: '✓ Incident resolved. Hindsight Memory successfully updated with vector embedding.',
      actionLabel: 'View in Memory Page',
      onAction: () => {
        setCurrentView('memory');
        nextDemoStep();
      }
    },
    {
      step: 11,
      title: 'Step 11: Complete Learning Loop Demonstrated!',
      description: 'The newly resolved incident is now searchable and ready to inform future investigations!',
      actionLabel: 'Restart Demo Tour',
      onAction: () => resetDemo()
    }
  ];

  const currentStepInfo = stepsInfo[demoStep - 1] || stepsInfo[0];

  return (
    <div className="bg-gradient-to-r from-[#0C1B33] via-[#0E2244] to-[#121A2F] border-b border-cyan-500/40 px-6 py-2.5 shadow-lg relative z-20 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Step counter & title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono text-xs font-bold shrink-0">
            {demoStep}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white tracking-wide">
                {currentStepInfo.title}
              </span>
              <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800">
                SOC Demo Tour
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              {currentStepInfo.description}
            </p>
          </div>
        </div>

        {/* Center: Step indicators */}
        <div className="hidden xl:flex items-center gap-1.5">
          {stepsInfo.map(s => (
            <div
              key={s.step}
              onClick={() => {
                s.onAction();
              }}
              className={`w-6 h-1.5 rounded-full cursor-pointer transition-all ${
                s.step === demoStep
                  ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee] w-8'
                  : s.step < demoStep
                  ? 'bg-emerald-500/80'
                  : 'bg-slate-700/60'
              }`}
              title={`Jump to ${s.title}`}
            />
          ))}
        </div>

        {/* Right: Controller buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={prevDemoStep}
            disabled={demoStep === 1}
            className="p-1.5 rounded-lg bg-[#0E172B] border border-[#1E2E50] text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Previous step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={currentStepInfo.onAction}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all active:scale-95"
          >
            <span>{currentStepInfo.actionLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={resetDemo}
            className="p-1.5 rounded-lg bg-[#0E172B] border border-[#1E2E50] text-slate-400 hover:text-slate-200 transition-colors"
            title="Reset demo to step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsDemoMode(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
            title="Close demo banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
