import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  Search,
  Bell,
  Sparkles,
  Shield,
  Layers,
  ChevronDown,
  BrainCircuit,
  ExternalLink,
  Plus
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    alerts,
    selectAlert,
    memoryStats,
    isDemoMode,
    setIsDemoMode,
    demoStep
  } = useSecurity();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof alerts>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length > 1) {
      const filtered = alerts.filter(a =>
        a.title.toLowerCase().includes(q.toLowerCase()) ||
        a.source.toLowerCase().includes(q.toLowerCase()) ||
        a.sourceIp.toLowerCase().includes(q.toLowerCase()) ||
        a.incidentId.toLowerCase().includes(q.toLowerCase()) ||
        a.host.toLowerCase().includes(q.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <header className="h-16 border-b border-[#1B2947] bg-[#0A101E]/90 backdrop-blur-md px-6 flex items-center justify-between z-20 shrink-0">
      {/* Left: View title or Greeting */}
      <div className="flex items-center gap-4">
        {currentView === 'overview' ? (
          <div>
            <h1 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Good evening, Analyst
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h1>
            <p className="text-xs text-slate-400">
              Here's what's happening across your security environment.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400 capitalize">SOC</span>
            <span className="text-slate-600">/</span>
            <span className="font-semibold text-cyan-300 capitalize">{currentView}</span>
          </div>
        )}
      </div>

      {/* Center: Global Search Bar */}
      <div className="relative max-w-md w-full mx-6 hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search alerts, IPs (e.g. 185.73.22.41), hosts (DC-01), incidents..."
            className="w-full bg-[#0E172B] border border-[#1E2E50] rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setSearchResults([]); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              Esc
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#0E172B] border border-[#1E2E50] rounded-xl shadow-2xl p-2 z-50 max-h-80 overflow-y-auto space-y-1">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 px-2 py-1">
              Matching Alerts ({searchResults.length})
            </div>
            {searchResults.map(alert => (
              <div
                key={alert.id}
                onClick={() => {
                  selectAlert(alert);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors"
              >
                <div>
                  <div className="text-xs font-medium text-slate-200">{alert.title}</div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {alert.incidentId} • {alert.host} • {alert.sourceIp}
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {alert.memoryMatchCount} memories
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Guided Demo Flow Button */}
        <button
          onClick={() => setIsDemoMode(!isDemoMode)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            isDemoMode
              ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 text-cyan-300 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              : 'bg-[#0E172B] text-slate-400 border-[#1E2E50] hover:text-slate-200 hover:border-slate-600'
          }`}
          title="Toggle 11-step Guided Demo Tour"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Demo Tour</span>
          <span className="px-1.5 py-0.2 bg-cyan-500/20 text-cyan-200 rounded text-[10px] font-mono">
            Step {demoStep}/11
          </span>
        </button>

        {/* Hindsight Status Pill */}
        <div
          onClick={() => setCurrentView('memory')}
          className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0E172B] border border-[#1E2E50] text-xs text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors cursor-pointer"
          title="View Hindsight Memory database"
        >
          <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-mono text-cyan-400">{memoryStats.totalMemories}</span>
          <span className="text-slate-400">memories</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-[#0E172B] border border-[#1E2E50] text-slate-400 hover:text-slate-200 hover:border-[#2D4370] transition-colors"
            title="Real-time SOC notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0E172B] border border-[#1E2E50] rounded-xl shadow-2xl p-3 z-50 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E2E50]">
                <span className="text-xs font-bold text-slate-200">SOC Activity Feed</span>
                <span className="text-[10px] font-mono text-cyan-400">Live Feed</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-200 font-medium">Hindsight Memory Search Completed</div>
                  <div className="text-[11px] text-slate-400">Found 5 historical matches for INC-2026-00421</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">2 min ago</div>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="text-slate-200 font-medium">New High Alert Detected</div>
                  <div className="text-[11px] text-slate-400">Multiple Failed Login Attempts on DC-01</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">5 min ago</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Primary Action Button: + Investigate Alert */}
        <button
          onClick={() => {
            const highAlert = alerts.find(a => a.incidentId === 'INC-2026-00421') || alerts[0];
            selectAlert(highAlert);
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Investigate Alert</span>
        </button>
      </div>
    </header>
  );
};
