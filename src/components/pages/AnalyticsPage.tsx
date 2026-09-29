import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  HOURLY_ALERT_ACTIVITY,
  SEVERITY_DISTRIBUTION,
  TOP_ROOT_CAUSES,
  MEMORY_EFFECTIVENESS_METRICS
} from '../../data/mockAnalytics';
import { GlassCard } from '../common/GlassCard';
import {
  BarChart3,
  BrainCircuit,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  PieChart as PieIcon,
  Activity,
  Layers
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const effectiveness = MEMORY_EFFECTIVENESS_METRICS;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#090F1E] border border-[#1E2E50] p-2.5 rounded-xl shadow-2xl text-xs font-mono">
          <div className="text-slate-400 font-bold mb-1">{label || payload[0].name}</div>
          <div className="text-cyan-300 font-bold">
            {payload[0].value} {payload[0].unit || 'incidents'}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1B2947]">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Security Analytics & Memory Effectiveness
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            SOC telemetry performance and organizational learning impact metrics.
          </p>
        </div>

        <div className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-3 py-1 rounded-xl">
          Telemetry Period: Last 30 Days (Demo Benchmark)
        </div>
      </div>

      {/* Memory Effectiveness Hero Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Assisted */}
        <GlassCard className="p-5 border-cyan-500/30 bg-gradient-to-br from-[#0B1529] to-[#0A1224] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Memory Assistance</span>
            <BrainCircuit className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-3xl font-extrabold font-mono text-cyan-300">
            {effectiveness.assistedInvestigationsPercentage}%
          </div>
          <p className="mt-2 text-xs font-medium text-slate-200">
            "Investigations assisted by previous incidents"
          </p>
          <div className="text-[10px] text-slate-400 mt-1">
            Correlated with historical resolutions
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-cyan-400 h-full rounded-full"
              style={{ width: `${effectiveness.assistedInvestigationsPercentage}%` }}
            />
          </div>
        </GlassCard>

        {/* Card 2: AI Supported */}
        <GlassCard className="p-5 border-blue-500/30 bg-gradient-to-br from-[#0B1529] to-[#0A1224] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Historical Grounding</span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 text-3xl font-extrabold font-mono text-blue-300">
            {effectiveness.supportedAiRecommendationsPercentage}%
          </div>
          <p className="mt-2 text-xs font-medium text-slate-200">
            "AI recommendations supported by historical memory"
          </p>
          <div className="text-[10px] text-slate-400 mt-1">
            Playbooks backed by real verified outcomes
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-blue-400 h-full rounded-full"
              style={{ width: `${effectiveness.supportedAiRecommendationsPercentage}%` }}
            />
          </div>
        </GlassCard>

        {/* Card 3: Time Saved */}
        <GlassCard className="p-5 border-emerald-500/30 bg-gradient-to-br from-[#0B1529] to-[#0A1224] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Time to Contain</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-3xl font-extrabold font-mono text-emerald-300">
            {effectiveness.avgTimeSavedMinutes}m
          </div>
          <p className="mt-2 text-xs font-medium text-slate-200">
            Average time saved per investigation
          </p>
          <div className="text-[10px] text-slate-400 mt-1">
            Eliminating redundant initial triage research
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full w-4/5" />
          </div>
        </GlassCard>

        {/* Card 4: False Positive Reduction */}
        <GlassCard className="p-5 border-purple-500/30 bg-gradient-to-br from-[#0B1529] to-[#0A1224] relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Noise Suppression</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-3xl font-extrabold font-mono text-purple-300">
            {effectiveness.falsePositiveReductionPercentage}%
          </div>
          <p className="mt-2 text-xs font-medium text-slate-200">
            False positive noise reduction
          </p>
          <div className="text-[10px] text-slate-400 mt-1">
            Suppressed via benign past precedent recall
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-purple-400 h-full rounded-full"
              style={{ width: `${effectiveness.falsePositiveReductionPercentage}%` }}
            />
          </div>
        </GlassCard>
      </div>

      {/* Row 2: Alert Volume & Severity Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 24h Volume */}
        <GlassCard className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-[#1B2947]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">
                Alert Volume Timeline (Last 24 Hours)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Total: 267 alerts</span>
          </div>

          <div className="h-56 mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_ALERT_ACTIVITY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="totalVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2E50" vertical={false} opacity={0.5} />
                <XAxis dataKey="hour" stroke="#64748B" fontSize={10} fontFamily="JetBrains Mono" />
                <YAxis stroke="#64748B" fontSize={10} fontFamily="JetBrains Mono" />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="total" stroke="#06B6D4" strokeWidth={2} fill="url(#totalVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Right 1 Col: Severity Donut */}
        <GlassCard className="p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#1B2947]">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">
                Alerts by Severity
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Breakdown</span>
          </div>

          <div className="h-44 mt-2 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SEVERITY_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {SEVERITY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Donut Legend */}
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#1B2947] text-xs">
            {SEVERITY_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 text-[11px]">{item.name}</span>
                <span className="font-mono text-[11px] text-slate-400 ml-auto">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Row 3: Top Root Causes Bar Chart & Incident Resolution Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Top Root Causes */}
        <GlassCard className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-[#1B2947]">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">
                Top Root Causes in Organizational Memory
              </h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">Classified by Hindsight</span>
          </div>

          <div className="h-60 mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TOP_ROOT_CAUSES} layout="vertical" margin={{ top: 5, right: 30, left: 70, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2E50" horizontal={false} opacity={0.5} />
                <XAxis type="number" stroke="#64748B" fontSize={10} fontFamily="JetBrains Mono" />
                <YAxis
                  type="category"
                  dataKey="category"
                  stroke="#94A3B8"
                  fontSize={10}
                  tickLine={false}
                  width={110}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#38BDF8" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Right 1 Col: Incident Resolution Rate Progress */}
        <GlassCard className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1B2947]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  Incident Resolution Rate
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">SLA 90%</span>
            </div>

            <div className="text-center py-6">
              <div className="text-4xl font-extrabold font-mono text-white">
                94.2%
              </div>
              <p className="text-xs text-emerald-400 font-mono mt-1">
                +3.4% above operational target
              </p>
              <p className="text-xs text-slate-400 mt-3 max-w-xs mx-auto leading-relaxed">
                Incidents resolved and committed to Hindsight Memory within the 60-minute mean time to remediate (MTTR).
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#090F1E] border border-[#1E2E50] text-xs font-mono text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span>Mean Resolution Time:</span>
              <span className="text-cyan-400">18.4 mins</span>
            </div>
            <div className="flex justify-between">
              <span>Reopened Cases:</span>
              <span className="text-slate-400">&lt; 1.2%</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
