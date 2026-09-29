import React, { useState } from 'react';
import { Alert } from '../../types/alert';
import { GlassCard } from '../common/GlassCard';
import {
  Globe,
  Server,
  User,
  Clock,
  Hash,
  Shield,
  FileCode,
  ChevronDown,
  ChevronUp,
  Copy,
  Check
} from 'lucide-react';

interface AlertSummaryCardProps {
  alert: Alert;
}

export const AlertSummaryCard: React.FC<AlertSummaryCardProps> = ({ alert }) => {
  const [showRawLogs, setShowRawLogs] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyIp = () => {
    navigator.clipboard.writeText(alert.sourceIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <GlassCard className="p-6 relative overflow-hidden border-cyan-500/20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-[#1B2947]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-800">
              ALERT PAYLOAD
            </span>
            {alert.mitreTechnique && (
              <span className="text-xs font-mono text-slate-300 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700">
                MITRE: {alert.mitreTechnique}
              </span>
            )}
          </div>
          <h2 className="text-lg font-bold text-white mt-2">
            {alert.title}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            "{alert.description}"
          </p>
        </div>

        {/* Severity indicator badge */}
        <div className="flex flex-col items-end shrink-0">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Detection Velocity</span>
          <span className="text-base font-extrabold font-mono text-rose-400 mt-0.5">
            {alert.attempts} attempts in 6m
          </span>
        </div>
      </div>

      {/* Grid of Technical Indicators (Selective monospace) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {/* Source IP */}
        <div className="p-3 rounded-xl bg-[#090F1E] border border-[#1E2E50] space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              Source IP
            </span>
            <button
              onClick={handleCopyIp}
              className="text-slate-400 hover:text-cyan-300 p-0.5 rounded transition-colors"
              title="Copy IP"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <div className="font-mono text-xs font-bold text-slate-100 flex items-center gap-2">
            <code>{alert.sourceIp}</code>
          </div>
          <div className="text-[10px] text-rose-400 font-mono">AS49870 (Bulletproof/Tor)</div>
        </div>

        {/* Target Identity */}
        <div className="p-3 rounded-xl bg-[#090F1E] border border-[#1E2E50] space-y-1">
          <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            Target Account
          </div>
          <div className="font-mono text-xs font-bold text-amber-300 truncate">
            {alert.target}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Domain Admin Privilege</div>
        </div>

        {/* Host / Workstation */}
        <div className="p-3 rounded-xl bg-[#090F1E] border border-[#1E2E50] space-y-1">
          <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-cyan-400" />
            Target Host
          </div>
          <div className="font-mono text-xs font-bold text-slate-100">
            {alert.host}
          </div>
          <div className="text-[10px] text-cyan-400 font-mono">Primary Domain Controller</div>
        </div>

        {/* Attempts */}
        <div className="p-3 rounded-xl bg-[#090F1E] border border-[#1E2E50] space-y-1">
          <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-cyan-400" />
            Total Attempts
          </div>
          <div className="font-mono text-xs font-bold text-slate-100">
            {alert.attempts}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Bursts &gt; 4.5 req/sec</div>
        </div>

        {/* First Seen */}
        <div className="p-3 rounded-xl bg-[#090F1E] border border-[#1E2E50] space-y-1">
          <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            First Seen
          </div>
          <div className="font-mono text-xs font-medium text-slate-200">
            {alert.firstSeen}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">UTC (Initial Packet)</div>
        </div>

        {/* Last Seen */}
        <div className="p-3 rounded-xl bg-[#090F1E] border border-[#1E2E50] space-y-1">
          <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Last Seen
          </div>
          <div className="font-mono text-xs font-medium text-slate-200">
            {alert.lastSeen}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">UTC (Most Recent Event)</div>
        </div>

        {/* Geolocation */}
        <div className="p-3 rounded-xl bg-[#090F1E] border border-[#1E2E50] space-y-1 sm:col-span-2">
          <div className="text-slate-400 text-[11px] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            Geolocation & Routing
          </div>
          <div className="font-mono text-xs font-semibold text-slate-200">
            {alert.geolocation}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">Anonymized Tor Exit Node Cluster</div>
        </div>
      </div>

      {/* Raw Event Log Drawer */}
      {alert.rawLogSnippet && (
        <div className="mt-4 pt-3 border-t border-[#1B2947]">
          <button
            onClick={() => setShowRawLogs(!showRawLogs)}
            className="flex items-center justify-between w-full text-xs text-slate-400 hover:text-slate-200 transition-colors font-mono py-1"
          >
            <span className="flex items-center gap-2">
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>Raw Security Telemetry Logs (EventID 4625)</span>
            </span>
            {showRawLogs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showRawLogs && (
            <div className="mt-2 p-3 rounded-xl bg-[#060A14] border border-[#1E2E50] font-mono text-[11px] text-cyan-200/90 leading-relaxed overflow-x-auto shadow-inner">
              <div className="text-slate-500 text-[10px] uppercase pb-1 border-b border-slate-800 mb-1.5">
                Windows Event Log Ingest / Splunk SIEM Forwarder
              </div>
              <code>{alert.rawLogSnippet}</code>
            </div>
          )}
        </div>
      )}
    </GlassCard>
  );
};
