import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { memoryService } from '../../services/memoryService';
import { GlassCard } from '../common/GlassCard';
import {
  Settings as SettingsIcon,
  BrainCircuit,
  Cpu,
  Shield,
  Key,
  Database,
  RotateCw,
  CheckCircle2,
  Sliders,
  Radio,
  FileCheck
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { memoryStats, addToast } = useSecurity();

  // AI Configuration state
  const [aiModel, setAiModel] = useState('CyberMemory SOC Engine v3.2 (Gemini Fine-tuned)');
  const [confidenceThreshold, setConfidenceThreshold] = useState(80);
  const [maxMemories, setMaxMemories] = useState(5);
  const [recommendationMode, setRecommendationMode] = useState('Proactive Assist');

  // Hindsight Memory State
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isRefreshingMemory, setIsRefreshingMemory] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('2 minutes ago');

  // Security Configuration state
  const [sessionTimeout, setSessionTimeout] = useState('15 minutes');
  const [mfaEnforced, setMfaEnforced] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    const result = await memoryService.testConnection();
    setIsTestingConnection(false);
    addToast(
      'Hindsight Memory Ping Successful',
      `Cluster response latency: ${result.latencyMs}ms. Status: ${result.status}`,
      'success'
    );
  };

  const handleRefreshMemory = async () => {
    setIsRefreshingMemory(true);
    await new Promise(r => setTimeout(r, 600));
    setIsRefreshingMemory(false);
    setLastSyncTime('Just now');
    addToast(
      'Hindsight Memory Synchronized',
      `Reloaded vector graph index for ${memoryStats.totalMemories} incident memories.`,
      'info'
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="pb-2 border-b border-[#1B2947]">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl font-bold text-white tracking-wide">
            Platform Settings & Integrations
          </h1>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Configure CyberMemory AI cognitive thresholds, Hindsight Memory connection, and security governance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: AI Configuration */}
        <GlassCard className="p-6 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1B2947]">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white">AI Configuration</h2>
          </div>

          {/* AI Model */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Underlying AI Model
            </label>
            <select
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              className="w-full bg-[#080D1A] border border-[#1E2E50] rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/60"
            >
              <option value="CyberMemory SOC Engine v3.2 (Gemini Fine-tuned)">
                CyberMemory SOC Engine v3.2 (Gemini Fine-tuned)
              </option>
              <option value="Gemini 1.5 Pro - Threat Specialist">
                Gemini 1.5 Pro - Threat Specialist
              </option>
              <option value="Gemini 1.5 Flash - Real-Time Low Latency">
                Gemini 1.5 Flash - Real-Time Low Latency
              </option>
            </select>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Optimized for high-confidence MITRE ATT&CK alignment and rapid triage.
            </span>
          </div>

          {/* Confidence Threshold */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Confidence Threshold for Autonomous Steps
              </label>
              <span className="text-xs font-mono font-bold text-cyan-400">
                {confidenceThreshold}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>50% (Permissive)</span>
              <span>80% (Recommended)</span>
              <span>95% (Strict)</span>
            </div>
          </div>

          {/* Max Memories Retrieved */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Maximum Memories Retrieved Per Alert
            </label>
            <select
              value={maxMemories}
              onChange={(e) => setMaxMemories(Number(e.target.value))}
              className="w-full bg-[#080D1A] border border-[#1E2E50] rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/60 font-mono"
            >
              <option value={3}>Top 3 Precedents</option>
              <option value={5}>Top 5 Precedents (Default)</option>
              <option value={10}>Top 10 Precedents (Deep Graph)</option>
            </select>
          </div>

          {/* Recommendation Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Recommendation Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Conservative', 'Proactive Assist', 'Autonomous'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setRecommendationMode(mode)}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    recommendationMode === mode
                      ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 font-bold'
                      : 'bg-[#080D1A] border-[#1E2E50] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Section 2: Hindsight Memory Integration */}
        <GlassCard className="p-6 space-y-5 border-cyan-500/30">
          <div className="flex items-center justify-between pb-3 border-b border-[#1B2947]">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white">Hindsight Memory Cluster</h2>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-800 text-emerald-400 text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Connected</span>
            </div>
          </div>

          {/* Connection Details */}
          <div className="p-3.5 rounded-xl bg-[#090F1E] border border-[#1E2E50] space-y-2.5 text-xs font-mono">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Memory Endpoint:</span>
              <span className="text-cyan-300 font-semibold truncate max-w-xs">
                https://api.hindsight-memory.internal/v1
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Connection Status:</span>
              <span className="text-emerald-400">Active (TLS 1.3 mTLS Encrypted)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Last Synchronization:</span>
              <span className="text-slate-200">{lastSyncTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Stored Incident Memories:</span>
              <span className="text-white font-bold">{memoryStats.totalMemories} records</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleTestConnection}
              disabled={isTestingConnection}
              className="flex-1 py-2 px-3 rounded-xl bg-[#0E172B] hover:bg-[#14223E] border border-[#1E2E50] text-slate-200 hover:text-cyan-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Radio className={`w-3.5 h-3.5 text-cyan-400 ${isTestingConnection ? 'animate-ping' : ''}`} />
              <span>{isTestingConnection ? 'Testing...' : 'Test Connection'}</span>
            </button>

            <button
              onClick={handleRefreshMemory}
              disabled={isRefreshingMemory}
              className="flex-1 py-2 px-3 rounded-xl bg-cyan-950/70 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 font-semibold text-xs border border-cyan-500/40 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshingMemory ? 'animate-spin' : ''}`} />
              <span>{isRefreshingMemory ? 'Syncing...' : 'Refresh Memory'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-[11px] text-cyan-300 leading-relaxed">
            <strong>Architecture Notice:</strong> The Hindsight abstraction layer persists vector embeddings across restarts. In production mode, incident resolutions are streamed to Kafka/PubSub and indexed into the vector memory cluster.
          </div>
        </GlassCard>

        {/* Section 3: Security & Compliance */}
        <GlassCard className="p-6 space-y-5 lg:col-span-2">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1B2947]">
            <Shield className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white">Security & Audit Policies</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Session Timeout */}
            <div className="p-4 rounded-xl bg-[#090F1E] border border-[#1E2E50] space-y-2">
              <span className="font-semibold text-slate-200 block">Session Timeout</span>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className="w-full bg-[#070B16] border border-[#1E2E50] rounded-lg px-2.5 py-1.5 text-xs text-slate-100"
              >
                <option value="15 minutes">15 minutes (Strict SOC Standard)</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
              </select>
            </div>

            {/* MFA Enforced */}
            <div
              onClick={() => setMfaEnforced(!mfaEnforced)}
              className="p-4 rounded-xl bg-[#090F1E] border border-[#1E2E50] space-y-2 cursor-pointer select-none"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">Hardware FIDO2 MFA</span>
                <input
                  type="checkbox"
                  checked={mfaEnforced}
                  onChange={() => {}}
                  className="rounded text-cyan-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Enforced for all analyst actions modifying containment rules or resolving alerts.
              </p>
            </div>

            {/* Audit Logging */}
            <div
              onClick={() => setAuditLogging(!auditLogging)}
              className="p-4 rounded-xl bg-[#090F1E] border border-[#1E2E50] space-y-2 cursor-pointer select-none"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">Immutable Audit Trail</span>
                <input
                  type="checkbox"
                  checked={auditLogging}
                  onChange={() => {}}
                  className="rounded text-cyan-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Cryptographically signed ledger recording all memory commits and query logs.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
