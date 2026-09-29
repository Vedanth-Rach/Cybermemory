import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Alert } from '../../types/alert';
import { GlassCard } from '../common/GlassCard';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import { MemoryMatchPill } from '../common/MemoryMatchPill';
import {
  BellRing,
  Search,
  Filter,
  ArrowUpDown,
  SearchCode,
  Shield,
  Monitor,
  Server,
  Terminal,
  CheckSquare,
  Square
} from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { alerts, selectAlert } = useSecurity();

  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'detected' | 'severity' | 'memoryMatches'>('detected');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter logic
  const filteredAlerts = alerts
    .filter(a => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          a.title.toLowerCase().includes(q) ||
          a.source.toLowerCase().includes(q) ||
          a.sourceIp.toLowerCase().includes(q) ||
          a.incidentId.toLowerCase().includes(q) ||
          a.target.toLowerCase().includes(q) ||
          a.host.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (severityFilter !== 'all' && a.severity !== severityFilter) return false;
      if (statusFilter !== 'all' && a.status !== statusFilter) return false;
      if (sourceFilter !== 'all' && !a.host.toLowerCase().includes(sourceFilter.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'severity') {
        const weights: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 };
        return (weights[b.severity] || 0) - (weights[a.severity] || 0);
      }
      if (sortBy === 'memoryMatches') {
        return b.memoryMatchCount - a.memoryMatchCount;
      }
      return 0; // default order
    });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAlerts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAlerts.map(a => a.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1B2947]">
        <div>
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Security Alerts
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {filteredAlerts.length} total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Monitor and investigate incoming security events across all detection telemetry feeds.
          </p>
        </div>

        {/* Selected batch action pill */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-xs font-mono text-cyan-300">
            <span>{selectedIds.length} selected</span>
            <button
              onClick={() => {
                const target = alerts.find(a => a.id === selectedIds[0]);
                if (target) selectAlert(target);
              }}
              className="px-2 py-0.5 bg-cyan-500 text-slate-950 font-bold rounded hover:bg-cyan-400"
            >
              Triage Selected
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <GlassCard className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alert, IP, host, incident ID..."
              className="w-full bg-[#080D1A] border border-[#1E2E50] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
            />
          </div>

          {/* Severity Filter */}
          <div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full bg-[#080D1A] border border-[#1E2E50] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/60 capitalize"
            >
              <option value="all">Severity: All</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-[#080D1A] border border-[#1E2E50] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/60 capitalize"
            >
              <option value="all">Status: All</option>
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-[#080D1A] border border-[#1E2E50] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/60"
            >
              <option value="detected">Sort: Detection Time</option>
              <option value="severity">Sort: Highest Severity</option>
              <option value="memoryMatches">Sort: Most Memory Matches</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Alerts Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#090F1E] border-b border-[#1B2947] text-slate-400 uppercase font-mono text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4 w-10">
                  <div
                    onClick={toggleSelectAll}
                    className="cursor-pointer text-slate-400 hover:text-slate-200"
                  >
                    {selectedIds.length === filteredAlerts.length && filteredAlerts.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4">Alert & Incident</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-4">Source & Target</th>
                <th className="py-3 px-3">Host</th>
                <th className="py-3 px-3">Detected</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4">Memory Match</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#152138]">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500 font-mono text-xs">
                    No security alerts matched the specified criteria.
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alert: Alert) => {
                  const isSelected = selectedIds.includes(alert.id);
                  const isFeatured = alert.incidentId === 'INC-2026-00421';

                  return (
                    <tr
                      key={alert.id}
                      onClick={() => selectAlert(alert)}
                      className={`group cursor-pointer transition-colors duration-150 ${
                        isFeatured
                          ? 'bg-cyan-950/20 hover:bg-cyan-900/30'
                          : isSelected
                          ? 'bg-slate-800/50'
                          : 'hover:bg-slate-800/30'
                      }`}
                    >
                      {/* Checkbox */}
                      <td
                        className="py-3.5 px-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelectRow(alert.id);
                        }}
                      >
                        <div className="cursor-pointer text-slate-400 hover:text-cyan-400">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </div>
                      </td>

                      {/* Title and ID */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                          <span>{alert.title}</span>
                          {isFeatured && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                              Demo Focus
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          #{alert.incidentId} • {alert.description}
                        </div>
                      </td>

                      {/* Severity */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <SeverityBadge severity={alert.severity} size="sm" />
                      </td>

                      {/* Source IP / Target */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-mono text-slate-200">{alert.sourceIp}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Target: {alert.target}
                        </div>
                      </td>

                      {/* Host */}
                      <td className="py-3.5 px-3 whitespace-nowrap font-mono text-slate-300 text-xs">
                        {alert.host}
                      </td>

                      {/* Detected */}
                      <td className="py-3.5 px-3 whitespace-nowrap text-slate-300 font-mono text-[11px]">
                        {alert.detectedAt}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <StatusBadge status={alert.status} size="sm" />
                      </td>

                      {/* Memory Match */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <MemoryMatchPill count={alert.memoryMatchCount} />
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            selectAlert(alert);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 font-semibold border border-cyan-500/30 transition-all flex items-center gap-1 ml-auto text-xs active:scale-95 shadow-sm"
                        >
                          <SearchCode className="w-3.5 h-3.5" />
                          <span>Investigate</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
