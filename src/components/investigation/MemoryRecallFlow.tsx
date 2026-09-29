import React from 'react';
import { GlassCard } from '../common/GlassCard';
import {
  BellRing,
  BrainCircuit,
  Database,
  GitBranch,
  Sparkles,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export const MemoryRecallFlow: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Current Alert',
      label: 'INC-2026-00421',
      desc: '27 failed logins on DC-01 from 185.73.22.41',
      icon: BellRing,
      color: 'text-rose-400',
      borderColor: 'border-rose-500/40',
      bgColor: 'bg-rose-950/20'
    },
    {
      id: 2,
      title: 'Hindsight Memory Search',
      label: 'Vector Retrieval',
      desc: 'High-dimensional cosine search across 142 historical cases',
      icon: BrainCircuit,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      bgColor: 'bg-cyan-950/20'
    },
    {
      id: 3,
      title: '5 Similar Incidents',
      label: '94% Top Match',
      desc: 'Corroborated with INC-00317, INC-00281, and INC-00192',
      icon: Database,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/40',
      bgColor: 'bg-blue-950/20'
    },
    {
      id: 4,
      title: 'Relevant Patterns Identified',
      label: 'Attack Signature',
      desc: 'Password spray preceding successful Event 4624 within 6 mins',
      icon: GitBranch,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      bgColor: 'bg-purple-950/20'
    },
    {
      id: 5,
      title: 'AI Investigation Recommendations',
      label: 'Contextual Playbook',
      desc: 'Validate Event 4624, assess leaked combo lists, enforce FIDO2 MFA',
      icon: Sparkles,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgColor: 'bg-emerald-950/20'
    }
  ];

  return (
    <GlassCard className="p-6 border-cyan-500/20">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1B2947]">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              How CyberMemory AI Used Past Experience
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time cognitive pipeline converting organizational memory into active tactical defense.
          </p>
        </div>

        <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800">
          Autonomous Feedback Loop
        </div>
      </div>

      {/* Horizontal Flow on Large Screens, Vertical on Small */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-5 gap-3 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative flex flex-col items-center">
              {/* Card Node */}
              <div
                className={`w-full p-3.5 rounded-xl border ${step.borderColor} ${step.bgColor} backdrop-blur-md flex flex-col justify-between h-full relative group transition-all duration-300 hover:scale-[1.02] shadow-lg`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Phase 0{step.id}
                    </span>
                    <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      <Icon className={`w-4 h-4 ${step.color}`} />
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-white tracking-tight leading-snug">
                    {step.title}
                  </h4>
                  <div className="text-[10px] font-mono text-cyan-400 mt-1 font-semibold">
                    {step.label}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {step.desc}
                </p>

                {/* Subtle pulse light */}
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400/80 animate-ping opacity-60" />
              </div>

              {/* Connecting arrow for larger screens */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-cyan-400/70">
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </div>
              )}

              {/* Connecting arrow for mobile screens */}
              {index < steps.length - 1 && (
                <div className="md:hidden my-2 text-cyan-400/70">
                  <ArrowDown className="w-4 h-4 animate-pulse" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Core Loop Tagline */}
      <div className="mt-5 pt-3 border-t border-[#182744] flex flex-wrap items-center justify-between text-xs text-slate-400">
        <span className="font-mono text-[11px] text-cyan-300 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
          Feedback Loop: Alert → Memory → Insight → Action → New Memory
        </span>
        <span className="text-[11px] text-slate-500 font-mono">
          Memory Latency: 38ms • Graph Correlation: Multi-hop
        </span>
      </div>
    </GlassCard>
  );
};
