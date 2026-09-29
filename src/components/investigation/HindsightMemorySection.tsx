import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { HindsightMemory } from '../../types/memory';
import { GlassCard } from '../common/GlassCard';
import { StatusBadge } from '../common/StatusBadge';
import {
  BrainCircuit,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Zap,
  Tag
} from 'lucide-react';

export const HindsightMemorySection: React.FC = () => {
  const { investigation, setSelectedMemoryDetail } = useSecurity();

  if (!investigation) return null;

  const memories = investigation.relatedMemories;

  return (
    <GlassCard className="p-6 border-cyan-500/30 bg-gradient-to-br from-[#0B1528] via-[#0D182F] to-[#0A1224] relative overflow-hidden">
      {/* Header and Visual Influence Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#1E2E50]">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Hindsight Memory
            </h3>
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
              {memories.length} related incidents found
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Relevant experiences retrieved from previous incidents.
          </p>
        </div>

        {/* Central Visual Badge: Memory -> Current Investigation */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-950/90 via-blue-950/80 to-purple-950/90 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.2)] text-xs font-mono">
          <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
            <BrainCircuit className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Hindsight Memory</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <div className="flex items-center gap-1.5 text-indigo-200 font-bold">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Current Investigation</span>
          </div>
        </div>
      </div>

      {/* Explanatory Banner */}
      <div className="mt-4 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2.5">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-cyan-300">Continuous Organizational Learning:</strong> CyberMemory AI does not triage in isolation. These historical incidents directly seeded the confidence assessment, guided log correlation queries, and formulated recommended containment actions.
        </div>
      </div>

      {/* Memory Results Grid / Cards */}
      <div className="mt-5 space-y-4">
        {memories.map((mem: HindsightMemory) => {
          const isHighMatch = mem.similarity >= 85;

          return (
            <div
              key={mem.id}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                isHighMatch
                  ? 'bg-[#0E1A33]/90 border-cyan-500/40 shadow-[0_0_15px_-3px_rgba(6,182,212,0.15)] hover:border-cyan-400'
                  : 'bg-[#091022]/80 border-[#1B2947] hover:border-slate-600'
              }`}
            >
              {/* Top Row: Incident ID, Similarity, Date, Outcome */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#1B2B4C]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-white tracking-wide">
                    #{mem.incidentId}
                  </span>
                  
                  {/* Similarity Badge */}
                  <span
                    className={`text-xs font-mono font-extrabold px-2.5 py-0.5 rounded-full border ${
                      mem.similarity >= 90
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                        : mem.similarity >= 75
                        ? 'bg-blue-500/20 text-blue-300 border-blue-400/40'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    Similarity: {mem.similarity}%
                  </span>

                  {mem.similarity >= 90 && (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800 font-bold">
                      Primary Match
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {mem.date}
                  </span>
                  <StatusBadge status={mem.outcome} size="sm" />
                </div>
              </div>

              {/* Alert & Root Cause */}
              <div className="mt-3 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">
                    Original Alert:
                  </span>
                  <p className="text-slate-200 font-medium mt-0.5">
                    "{mem.originalAlert}"
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block font-semibold">
                    Root Cause:
                  </span>
                  <p className="text-slate-300 mt-0.5">
                    {mem.rootCause}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-cyan-400 block font-semibold">
                    Historical Resolution & Actions:
                  </span>
                  <p className="text-cyan-200/90 font-mono text-[11px] mt-0.5 bg-[#060B18] p-2.5 rounded-lg border border-[#162544] leading-relaxed">
                    {mem.resolution}
                  </p>
                </div>

                {/* Actions Taken Bullets */}
                {mem.actionsTaken && mem.actionsTaken.length > 0 && (
                  <div className="pt-1">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                      Containment Actions Applied:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {mem.actionsTaken.map((action, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-slate-300 text-[10px] font-mono flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Footer: Match rationale and View Incident modal button */}
              <div className="mt-3 pt-3 border-t border-[#172540] flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 italic">
                  Analyst: <span className="text-slate-300 font-mono">{mem.analyst}</span>
                </span>

                <button
                  onClick={() => setSelectedMemoryDetail(mem)}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold hover:underline"
                >
                  <span>View Incident</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
