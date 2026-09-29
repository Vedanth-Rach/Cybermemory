import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { StatusBadge } from '../common/StatusBadge';
import {
  X,
  BrainCircuit,
  CheckCircle2,
  Calendar,
  User,
  Shield,
  Tag,
  Hash,
  Activity,
  Layers
} from 'lucide-react';

export const IncidentDetailModal: React.FC = () => {
  const { selectedMemoryDetail, setSelectedMemoryDetail } = useSecurity();

  if (!selectedMemoryDetail) return null;

  const mem = selectedMemoryDetail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0B1325] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1E2E50] flex items-center justify-between bg-[#080D19]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white tracking-wide">
                  Historical Incident #{mem.incidentId}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
                  {mem.similarity}% Match
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Archived in Hindsight Memory • Ref: {mem.id}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedMemoryDetail(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-[#070B16] border border-[#172744]">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Date</span>
              <span className="font-mono text-slate-200 text-[11px] font-semibold">{mem.date}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Analyst</span>
              <span className="font-mono text-slate-200 text-[11px]">{mem.analyst}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Host / Target</span>
              <span className="font-mono text-cyan-300 text-[11px]">{mem.host || 'DC-01'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Outcome</span>
              <StatusBadge status={mem.outcome} size="sm" />
            </div>
          </div>

          {/* Original Alert */}
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
              Original Triggering Alert:
            </span>
            <div className="p-3 rounded-xl bg-[#090F20] border border-[#1B2C4E] text-slate-200 font-medium">
              "{mem.originalAlert}"
            </div>
          </div>

          {/* Root Cause */}
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
              Root Cause Identified:
            </span>
            <div className="p-3 rounded-xl bg-[#090F20] border border-[#1B2C4E] text-slate-300 leading-relaxed">
              {mem.rootCause}
            </div>
          </div>

          {/* Actions Taken */}
          {mem.actionsTaken && mem.actionsTaken.length > 0 && (
            <div>
              <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold block mb-1">
                Containment Actions Executed:
              </span>
              <div className="p-3 rounded-xl bg-[#090F20] border border-[#1B2C4E] space-y-1.5 font-mono text-[11px]">
                {mem.actionsTaken.map((act, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final Resolution */}
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
              Resolution Outcome & Impact:
            </span>
            <div className="p-3 rounded-xl bg-[#081525] border border-cyan-900/60 text-cyan-200 leading-relaxed">
              {mem.resolution}
            </div>
          </div>

          {/* Learning Impact */}
          {mem.learningImpact && (
            <div>
              <span className="text-[10px] uppercase font-mono text-purple-400 font-bold block mb-1">
                Persistent Organizational Learning:
              </span>
              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/40 text-purple-200 text-[11px] leading-relaxed">
                {mem.learningImpact}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5">
            {mem.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono flex items-center gap-1"
              >
                <Tag className="w-2.5 h-2.5 text-slate-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1E2E50] bg-[#080D19] flex justify-end">
          <button
            onClick={() => setSelectedMemoryDetail(null)}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
