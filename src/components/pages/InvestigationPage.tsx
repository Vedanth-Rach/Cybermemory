import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { AlertSummaryCard } from '../investigation/AlertSummaryCard';
import { AiInvestigationPanel } from '../investigation/AiInvestigationPanel';
import { InvestigationChecklist } from '../investigation/InvestigationChecklist';
import { HindsightMemorySection } from '../investigation/HindsightMemorySection';
import { MemoryRecallFlow } from '../investigation/MemoryRecallFlow';
import { SeverityBadge } from '../common/SeverityBadge';
import { StatusBadge } from '../common/StatusBadge';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2,
  ChevronDown,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Flame
} from 'lucide-react';

export const InvestigationPage: React.FC = () => {
  const {
    activeAlert,
    selectAlert,
    alerts,
    setIsResolveModalOpen,
    addToast
  } = useSecurity();

  const [isAlertDropdownOpen, setIsAlertDropdownOpen] = useState<boolean>(false);
  const [isEscalated, setIsEscalated] = useState<boolean>(false);

  const handleEscalate = () => {
    setIsEscalated(!isEscalated);
    addToast(
      isEscalated ? 'Escalation Cleared' : 'Incident Escalated',
      isEscalated
        ? `Incident #${activeAlert.incidentId} returned to standard tier 2 queue.`
        : `Incident #${activeAlert.incidentId} escalated to Senior Incident Commander & Forensics Tier 3.`,
      isEscalated ? 'info' : 'warning'
    );
  };

  const handleExport = () => {
    addToast(
      'Investigation Report Generated',
      `Comprehensive PDF & STIX 2.1 intelligence package compiled for #${activeAlert.incidentId}.`,
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Investigation Workspace Header */}
      <div className="p-5 rounded-2xl bg-[#091122]/90 border border-[#1C2C4E] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-wrap items-center gap-4">
          {/* Quick Alert Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsAlertDropdownOpen(!isAlertDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0E172B] hover:bg-[#14203B] border border-[#21355A] text-xs font-mono font-bold text-white transition-colors"
            >
              <span className="text-cyan-400">Investigation</span>
              <span>#{activeAlert.incidentId}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isAlertDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-[#0B1325] border border-[#1E2E50] rounded-xl shadow-2xl p-2 z-50 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-400 px-2 py-1">
                  Switch Active Incident
                </div>
                {alerts.map(a => (
                  <div
                    key={a.id}
                    onClick={() => {
                      selectAlert(a);
                      setIsAlertDropdownOpen(false);
                    }}
                    className={`p-2 rounded-lg text-xs cursor-pointer flex items-center justify-between transition-colors ${
                      a.id === activeAlert.id
                        ? 'bg-cyan-950/70 border border-cyan-800 text-cyan-200'
                        : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{a.title}</div>
                      <div className="text-[10px] font-mono text-slate-400">#{a.incidentId} • {a.host}</div>
                    </div>
                    <SeverityBadge severity={a.severity} size="sm" showIcon={false} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status & Severity */}
          <div className="flex items-center gap-2">
            <StatusBadge status={activeAlert.status} />
            <SeverityBadge severity={activeAlert.severity} />
            {isEscalated && (
              <span className="px-2.5 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold flex items-center gap-1 animate-pulse">
                <Flame className="w-3.5 h-3.5" />
                ESCALATED
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0E172B] hover:bg-[#14203B] border border-[#1E2E50] text-slate-300 hover:text-white text-xs font-semibold transition-all active:scale-95"
            title="Download executive incident report"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>

          <button
            onClick={handleEscalate}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
              isEscalated
                ? 'bg-rose-500/30 text-rose-200 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                : 'bg-[#0E172B] hover:bg-rose-950/30 text-slate-300 hover:text-rose-300 border-[#1E2E50] hover:border-rose-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEscalated ? 'De-escalate' : 'Escalate'}</span>
          </button>

          <button
            onClick={() => setIsResolveModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            <span>Mark Resolved</span>
          </button>
        </div>
      </div>

      {/* 1. Alert Summary Card */}
      <AlertSummaryCard alert={activeAlert} />

      {/* 2. AI Investigation Panel */}
      <AiInvestigationPanel />

      {/* 3. Memory Recall Visualization ("How CyberMemory AI Used Past Experience") */}
      <MemoryRecallFlow />

      {/* 4. Investigation Checklist (01 - 05) */}
      <InvestigationChecklist />

      {/* 5. Hindsight Memory Section (5 related incidents found) */}
      <HindsightMemorySection />
    </div>
  );
};
