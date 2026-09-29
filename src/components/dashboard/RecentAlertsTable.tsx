import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Alert } from '../../types/alert';
import { GlassCard } from '../common/GlassCard';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { MemoryMatchPill } from '../common/MemoryMatchPill';
import { ArrowUpRight, Search, Shield, Terminal, Monitor, Server } from 'lucide-react';

export const RecentAlertsTable: React.FC = () => {
  const { alerts, selectAlert, setCurrentView } = useSecurity();

  // Display top recent alerts
  const displayAlerts = alerts.slice(0, 6);

  const getSourceIcon = (source: string, host: string) => {
    if (source.includes('.') && !source.startsWith('WS') && !source.startsWith('SRV')) {
      return <Terminal className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
    if (host.startsWith('DC') || host.startsWith('SRV') || host.startsWith('FILE')) {
      return <Server className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
    }
    return <Monitor className="w-3.5 h-3.5 text-slate-400 shrink-0" />;
  };

  return (
    <GlassCard className="p-0 overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-[#1B2947] flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
            <span>Recent Alerts</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800">
              Live Ingestion
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any alert row to launch an investigation enriched with Hindsight Memory.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('alerts')}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 hover:underline"
        >
          <span>View All Alerts ({alerts.length})</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0A101E] border-b border-[#1B2947] text-slate-400 uppercase font-mono text-[10px] tracking-wider">
            <tr>
              <th className="py-3 px-5">Alert</th>
              <th className="py-3 px-4">Severity</th>
              <th className="py-3 px-4">Source / Host</th>
              <th className="py-3 px-4">Detected</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Memory Match</th>
              <th className="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#152138]">
            {displayAlerts.map((alert: Alert) => {
              const isHighlight = alert.incidentId === 'INC-2026-00421';
              return (
                <tr
                  key={alert.id}
                  onClick={() => selectAlert(alert)}
                  className={`group cursor-pointer transition-colors duration-150 ${
                    isHighlight
                      ? 'bg-cyan-950/20 hover:bg-cyan-900/30 border-l-2 border-cyan-400'
                      : 'hover:bg-slate-800/40'
                  }`}
                >
                  {/* Alert Title & Incident ID */}
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                      <span>{alert.title}</span>
                      {isHighlight && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                          Demo Focus
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                      <span>#{alert.incidentId}</span>
                      <span>•</span>
                      <span className="truncate max-w-xs">{alert.description}</span>
                    </div>
                  </td>

                  {/* Severity */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <SeverityBadge severity={alert.severity} size="sm" />
                  </td>

                  {/* Source */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-mono text-slate-200">
                      {getSourceIcon(alert.source, alert.host)}
                      <span>{alert.source}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Target: {alert.target}
                    </div>
                  </td>

                  {/* Detected */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-300 font-mono text-[11px]">
                    {alert.detectedAt}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={alert.status} size="sm" />
                  </td>

                  {/* Memory Match */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <MemoryMatchPill
                      count={alert.memoryMatchCount}
                      interactive={false}
                    />
                  </td>

                  {/* Action Button */}
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        selectAlert(alert);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 font-semibold border border-cyan-500/30 transition-all flex items-center gap-1 ml-auto text-xs active:scale-95 shadow-sm"
                    >
                      <Search className="w-3 h-3" />
                      <span>Investigate</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
