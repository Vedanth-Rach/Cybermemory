import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { KpiStatsGrid } from '../dashboard/KpiStatsGrid';
import { ThreatActivityChart } from '../dashboard/ThreatActivityChart';
import { RecentAlertsTable } from '../dashboard/RecentAlertsTable';
import {
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  RotateCw,
  SearchCode
} from 'lucide-react';

export const OverviewPage: React.FC = () => {
  const { selectAlert, alerts, memoryStats } = useSecurity();

  const handleQuickInvestigate = () => {
    const alert = alerts.find(a => a.incidentId === 'INC-2026-00421') || alerts[0];
    selectAlert(alert);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Central Feedback Loop Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0C1A33] via-[#0E2347] to-[#141B30] border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center shrink-0">
            <BrainCircuit className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>The CyberMemory Continuous Learning Loop</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Powered by Hindsight
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
              "CyberMemory AI doesn't investigate every incident from scratch. It learns from previous incidents and uses organizational memory to provide better context for future investigations."
            </p>
          </div>
        </div>

        {/* Conceptual loop flow pills */}
        <div className="hidden lg:flex items-center gap-1.5 font-mono text-[11px] bg-[#070D1A]/80 p-2 rounded-xl border border-[#1B2B4C] shrink-0">
          <span className="text-rose-400 font-semibold px-2 py-1 rounded bg-rose-950/40 border border-rose-900/50">Detect</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-amber-400 font-semibold px-2 py-1 rounded bg-amber-950/40 border border-amber-900/50">Investigate</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-cyan-400 font-bold px-2 py-1 rounded bg-cyan-950/60 border border-cyan-700 shadow-[0_0_10px_rgba(6,182,212,0.3)]">Recall</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-blue-400 font-semibold px-2 py-1 rounded bg-blue-950/40 border border-blue-900/50">Recommend</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-emerald-400 font-semibold px-2 py-1 rounded bg-emerald-950/40 border border-emerald-900/50">Resolve</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-purple-400 font-bold px-2 py-1 rounded bg-purple-950/60 border border-purple-700">Remember</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <KpiStatsGrid />

      {/* Threat Activity 24h Area Chart */}
      <ThreatActivityChart />

      {/* Recent Alerts Table */}
      <RecentAlertsTable />
    </div>
  );
};
