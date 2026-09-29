import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { GlassCard } from '../common/GlassCard';
import {
  BrainCircuit,
  Sparkles,
  ShieldCheck,
  RotateCw,
  Gauge,
  CheckCircle2,
  Workflow,
  Zap
} from 'lucide-react';

export const AiInvestigationPanel: React.FC = () => {
  const {
    investigation,
    isAnalyzing,
    reanalyzeCurrentAlert
  } = useSecurity();

  if (!investigation) return null;

  return (
    <GlassCard className="p-6 border-cyan-500/30 bg-gradient-to-br from-[#0B1528] via-[#0E1B33] to-[#0A1224] relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.1)]">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E2E50]/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white tracking-wide">
                CyberMemory AI
              </h2>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                Cognitive SOC Core
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous triage grounded in Hindsight persistent organizational memory.
            </p>
          </div>
        </div>

        {/* Status Indicator & Reanalyze Trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#090F1E] border border-[#1E2E50] text-xs font-mono">
            {isAnalyzing ? (
              <span className="flex items-center gap-2 text-cyan-400">
                <RotateCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Analyzing alert...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                <span>Analysis complete</span>
              </span>
            )}
          </div>

          <button
            onClick={reanalyzeCurrentAlert}
            disabled={isAnalyzing}
            className="p-1.5 rounded-lg bg-[#090F1E] border border-[#1E2E50] text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 disabled:opacity-50 transition-colors"
            title="Re-run AI analysis and refresh memory retrieval"
          >
            <RotateCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Assessment and Confidence Meter */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {/* Left 2 Cols: AI Assessment Text */}
        <div className="lg:col-span-2 p-4 rounded-xl bg-[#090F1E]/90 border border-[#1E2E50] flex flex-col justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              AI Assessment
            </div>
            <p className="text-sm text-slate-100 font-medium leading-relaxed">
              "{investigation.aiAssessment}"
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-[#152138] flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 text-cyan-300">
              <Zap className="w-3.5 h-3.5" />
              Hypothesis: Distributed Brute Force / Credential Stuffing
            </span>
            <span className="text-slate-600">•</span>
            <span>Targeting Tier 0 Identity Infrastructure</span>
          </div>
        </div>

        {/* Right 1 Col: Confidence Meter Card */}
        <div className="p-4 rounded-xl bg-[#090F1E]/90 border border-[#1E2E50] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              Triage Confidence
            </span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
              High Assurance
            </span>
          </div>

          <div className="my-2">
            <div className="flex items-baseline justify-between font-mono">
              <span className="text-2xl font-black text-white tracking-tight">
                Confidence: {investigation.confidence}%
              </span>
              <span className="text-xs text-cyan-400 font-bold">5/5 signals</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden border border-slate-700/60">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                style={{ width: `${investigation.confidence}%` }}
              />
            </div>
          </div>

          <div className="text-[10px] text-slate-400 leading-snug">
            Corroborated by 5 historical incidents in Hindsight persistent memory.
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
