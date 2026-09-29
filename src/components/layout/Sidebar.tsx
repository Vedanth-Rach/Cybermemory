import React, { useState } from 'react';
import { useSecurity, AppView } from '../../context/SecurityContext';
import {
  LayoutDashboard,
  BellRing,
  SearchCode,
  History,
  BrainCircuit,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Radio,
  UserCheck
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, alerts, memories } = useSecurity();
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const navItems = [
    { id: 'overview' as AppView, label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'alerts' as AppView, label: 'Alerts', icon: BellRing, badge: alerts.filter(a => a.status !== 'resolved').length },
    { id: 'investigations' as AppView, label: 'Investigations', icon: SearchCode, badge: 'Active' },
    { id: 'history' as AppView, label: 'Incident History', icon: History, badge: null },
    { id: 'memory' as AppView, label: 'Hindsight Memory', icon: BrainCircuit, badge: memories.length },
    { id: 'analytics' as AppView, label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'settings' as AppView, label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <aside
      className={`relative flex flex-col justify-between border-r border-[#1B2947] bg-[#090F1C] transition-all duration-300 z-30 shrink-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top: Logo & Branding */}
      <div>
        <div className="flex items-center justify-between px-4 py-5 border-b border-[#1B2947]">
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => setCurrentView('overview')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-purple-600/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0">
              <BrainCircuit className="w-5 h-5 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                  CyberMemory <span className="text-cyan-400 text-xs px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">AI</span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">SOC Memory Platform</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent hover:border-[#1F2E50] transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950/70 to-blue-950/40 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_-3px_rgba(6,182,212,0.25)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between text-left">
                    <span>{item.label}</span>
                    {item.badge !== null && (
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom: System Status & User Profile */}
      <div className="p-3 border-t border-[#1B2947] space-y-3 bg-[#080D19]/60">
        {!collapsed && (
          <div className="p-3 rounded-xl bg-[#0E172A]/70 border border-[#1E2E50] space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                AI Engine
              </span>
              <span className="text-emerald-400 font-mono font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                Hindsight Memory
              </span>
              <span className="text-cyan-400 font-mono font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Connected
              </span>
            </div>
          </div>
        )}

        {/* User Card */}
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/40 transition-colors cursor-pointer">
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs shrink-0 shadow-md">
            AM
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#090F1C]" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-200 truncate flex items-center gap-1">
                Alex Mercer <UserCheck className="w-3 h-3 text-cyan-400 inline" />
              </span>
              <span className="text-[10px] text-slate-400 font-mono truncate">SOC Tier 2 Analyst</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
