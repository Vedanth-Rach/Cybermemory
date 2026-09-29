import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { HindsightMemory } from '../../types/memory';
import { GlassCard } from '../common/GlassCard';
import { StatusBadge } from '../common/StatusBadge';
import { SeverityBadge } from '../common/SeverityBadge';
import {
  History,
  Search,
  Filter,
  BrainCircuit,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Tag
} from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const { memories, setSelectedMemoryDetail } = useSecurity();

  const [searchQuery, setSearchQuery] = useState('');
  const [outcomeFilter, setOutcomeFilter] = useState('all');
  const [rootCauseFilter, setRootCauseFilter] = useState('all');

  const filteredMemories = memories.filter(m => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        m.incidentId.toLowerCase().includes(q) ||
        m.originalAlert.toLowerCase().includes(q) ||
        m.rootCause.toLowerCase().includes(q) ||
        m.resolution.toLowerCase().includes(q) ||
        m.analyst.toLowerCase().includes(q) ||
        m.tags.some(t => t.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (outcomeFilter !== 'all' && m.outcome.toLowerCase() !== outcomeFilter.toLowerCase()) {
      return false;
    }

    if (rootCauseFilter !== 'all' && !m.tags.some(t => t.toLowerCase().includes(rootCauseFilter.toLowerCase()))) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-5 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1B2947]">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Incident History
            </h1>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {filteredMemories.length} resolved cases
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Historical incident archive and post-mortems stored in Hindsight persistent memory.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/80 px-3 py-1.5 rounded-xl">
          <BrainCircuit className="w-4 h-4 text-cyan-400" />
          <span>Continuous Knowledge Retention: 100%</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <GlassCard className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search incident ID, root cause, resolution..."
              className="w-full bg-[#080D1A] border border-[#1E2E50] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono"
            />
          </div>

          {/* Root Cause Category Filter */}
          <div>
            <select
              value={rootCauseFilter}
              onChange={(e) => setRootCauseFilter(e.target.value)}
              className="w-full bg-[#080D1A] border border-[#1E2E50] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/60 capitalize"
            >
              <option value="all">Root Cause: All Categories</option>
              <option value="credential">Credential Compromise</option>
              <option value="brute force">Brute Force / Stuffing</option>
              <option value="powershell">PowerShell / Script Execution</option>
              <option value="privilege">Privilege Escalation</option>
              <option value="c2">Command & Control (C2)</option>
            </select>
          </div>

          {/* Outcome Filter */}
          <div>
            <select
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value)}
              className="w-full bg-[#080D1A] border border-[#1E2E50] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/60 capitalize"
            >
              <option value="all">Outcome: All</option>
              <option value="resolved">Resolved</option>
              <option value="partially resolved">Partially Resolved</option>
              <option value="escalated">Escalated</option>
              <option value="false positive">False Positive</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* History Table */}
      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#090F1E] border-b border-[#1B2947] text-slate-400 uppercase font-mono text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Incident ID</th>
                <th className="py-3 px-4">Alert Trigger</th>
                <th className="py-3 px-4">Root Cause</th>
                <th className="py-3 px-4">Resolution Summary</th>
                <th className="py-3 px-3">Analyst</th>
                <th className="py-3 px-3">Resolved Date</th>
                <th className="py-3 px-3">Outcome</th>
                <th className="py-3 px-3">Memory Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#152138]">
              {filteredMemories.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500 font-mono text-xs">
                    No historical incidents matched your search criteria.
                  </td>
                </tr>
              ) : (
                filteredMemories.map((mem: HindsightMemory) => (
                  <tr
                    key={mem.id}
                    onClick={() => setSelectedMemoryDetail(mem)}
                    className="group cursor-pointer hover:bg-slate-800/40 transition-colors"
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-white group-hover:text-cyan-300">
                      #{mem.incidentId}
                    </td>

                    {/* Alert */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-slate-200 truncate">
                        {mem.originalAlert}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        Host: {mem.host || 'DC-01'}
                      </div>
                    </td>

                    {/* Root Cause */}
                    <td className="py-3.5 px-4 max-w-xs text-slate-300 leading-snug">
                      <div className="line-clamp-2">
                        {mem.rootCause}
                      </div>
                    </td>

                    {/* Resolution */}
                    <td className="py-3.5 px-4 max-w-sm text-cyan-200/90 font-mono text-[11px] leading-snug">
                      <div className="line-clamp-2">
                        {mem.resolution}
                      </div>
                    </td>

                    {/* Analyst */}
                    <td className="py-3.5 px-3 text-slate-300 font-mono whitespace-nowrap">
                      {mem.analyst}
                    </td>

                    {/* Resolved Date */}
                    <td className="py-3.5 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {mem.date}
                    </td>

                    {/* Outcome */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <StatusBadge status={mem.outcome} size="sm" />
                    </td>

                    {/* Memory Status */}
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-800 px-2 py-0.5 rounded-full">
                        <BrainCircuit className="w-3 h-3 text-cyan-400" />
                        Stored in Hindsight
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMemoryDetail(mem);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-300 hover:bg-slate-700 transition-colors inline-flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
