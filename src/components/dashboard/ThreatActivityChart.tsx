import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { HOURLY_ALERT_ACTIVITY } from '../../data/mockAnalytics';
import { GlassCard } from '../common/GlassCard';
import { Activity, ShieldAlert, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export const ThreatActivityChart: React.FC = () => {
  const [activeSeries, setActiveSeries] = useState<{
    critical: boolean;
    high: boolean;
    medium: boolean;
    low: boolean;
  }>({
    critical: true,
    high: true,
    medium: true,
    low: true
  });

  const toggleSeries = (key: 'critical' | 'high' | 'medium' | 'low') => {
    setActiveSeries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#090F1E] border border-[#1E2E50] p-3 rounded-xl shadow-2xl text-xs space-y-1.5 font-mono backdrop-blur-md">
          <div className="text-slate-400 font-bold border-b border-[#1E2E50] pb-1">
            Time: {label}
          </div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 capitalize" style={{ color: entry.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-bold text-slate-100">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <GlassCard className="p-6">
      {/* Header and Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1B2947]">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white tracking-wide">
              Security Alerts — Last 24 Hours
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Aggregated telemetry from network sensors, endpoints, and cloud security brokers.
          </p>
        </div>

        {/* Severity Toggle Indicators */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <button
            onClick={() => toggleSeries('critical')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono transition-all ${
              activeSeries.critical
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.2)]'
                : 'bg-slate-900/40 border-slate-800 text-slate-500 line-through'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Critical</span>
          </button>

          <button
            onClick={() => toggleSeries('high')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono transition-all ${
              activeSeries.high
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                : 'bg-slate-900/40 border-slate-800 text-slate-500 line-through'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>High</span>
          </button>

          <button
            onClick={() => toggleSeries('medium')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono transition-all ${
              activeSeries.medium
                ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-400'
                : 'bg-slate-900/40 border-slate-800 text-slate-500 line-through'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Medium</span>
          </button>

          <button
            onClick={() => toggleSeries('low')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-mono transition-all ${
              activeSeries.low
                ? 'bg-sky-500/15 border-sky-500/40 text-sky-400'
                : 'bg-slate-900/40 border-slate-800 text-slate-500 line-through'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Low</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 mt-4 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={HOURLY_ALERT_ACTIVITY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCritical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EAB308" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#EAB308" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2E50" vertical={false} opacity={0.6} />
            <XAxis
              dataKey="hour"
              stroke="#64748B"
              fontSize={11}
              fontFamily="JetBrains Mono"
              tickLine={false}
              axisLine={{ stroke: '#1E2E50' }}
            />
            <YAxis
              stroke="#64748B"
              fontSize={11}
              fontFamily="JetBrains Mono"
              tickLine={false}
              axisLine={{ stroke: '#1E2E50' }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {activeSeries.low && (
              <Area
                type="monotone"
                dataKey="low"
                name="Low"
                stroke="#38BDF8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLow)"
              />
            )}
            {activeSeries.medium && (
              <Area
                type="monotone"
                dataKey="medium"
                name="Medium"
                stroke="#EAB308"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorMedium)"
              />
            )}
            {activeSeries.high && (
              <Area
                type="monotone"
                dataKey="high"
                name="High"
                stroke="#F59E0B"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorHigh)"
              />
            )}
            {activeSeries.critical && (
              <Area
                type="monotone"
                dataKey="critical"
                name="Critical"
                stroke="#EF4444"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCritical)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
