import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { GlassCard } from '../common/GlassCard';
import {
  BellRing,
  ShieldAlert,
  SearchCode,
  BrainCircuit,
  CheckCircle2,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export const KpiStatsGrid: React.FC = () => {
  const { alerts, memoryStats } = useSecurity();

  const activeAlertsCount = alerts.filter(a => a.status !== 'resolved').length;
  const criticalCount = alerts.filter(a => a.severity === 'critical' && a.status !== 'resolved').length;

  const kpis = [
    {
      title: 'Active Alerts',
      value: activeAlertsCount,
      trend: '↑ 12% from yesterday',
      isPositive: false, // more alerts is generally negative
      icon: BellRing,
      accent: 'cyan',
      subtext: 'across 4 enterprise network zones'
    },
    {
      title: 'Critical Incidents',
      value: criticalCount,
      trend: '↓ 25% from yesterday',
      isPositive: true,
      icon: ShieldAlert,
      accent: 'red',
      subtext: 'active triage in progress'
    },
    {
      title: 'Investigations Today',
      value: 14,
      trend: '↑ 8% from yesterday',
      isPositive: true,
      icon: SearchCode,
      accent: 'blue',
      subtext: 'avg response time: 4.2 mins'
    },
    {
      title: 'Memory Entries',
      value: memoryStats.totalMemories,
      trend: memoryStats.knowledgeGrowthRate,
      isPositive: true,
      icon: BrainCircuit,
      accent: 'emerald',
      subtext: 'Hindsight persistent memory graph'
    },
    {
      title: 'Incidents Resolved',
      value: 18,
      trend: '94% SLA compliance',
      isPositive: true,
      icon: CheckCircle2,
      accent: 'emerald',
      subtext: 'stored to organizational memory'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <GlassCard key={index} className="relative overflow-hidden group">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">{kpi.title}</span>
              <div className="p-2 rounded-lg bg-slate-800/80 border border-[#1E2E50] group-hover:border-cyan-500/40 transition-colors">
                <Icon className="w-4 h-4 text-cyan-400" />
              </div>
            </div>

            {/* Main Value */}
            <div className="mt-3 flex items-baseline justify-between">
              <div className="text-2xl font-extrabold text-white tracking-tight font-mono">
                {kpi.value}
              </div>
            </div>

            {/* Trend Indicator */}
            <div className="mt-2 flex items-center gap-1.5 text-[11px]">
              <span
                className={`font-medium flex items-center gap-0.5 ${
                  kpi.isPositive ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {kpi.isPositive ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5" />
                )}
                {kpi.trend}
              </span>
            </div>

            {/* Subtle subtext */}
            <div className="mt-1 text-[10px] text-slate-500 truncate">
              {kpi.subtext}
            </div>

            {/* Bottom ambient glow line */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </GlassCard>
        );
      })}
    </div>
  );
};
