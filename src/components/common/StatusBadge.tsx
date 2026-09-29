import React from 'react';
import { AlertStatus } from '../../types/alert';
import { IncidentOutcome } from '../../types/memory';
import { CheckCircle2, Clock, Search, XCircle, LucideIcon } from 'lucide-react';

interface StatusBadgeProps {
  status: AlertStatus | IncidentOutcome;
  size?: 'sm' | 'md';
}

interface BadgeConfig {
  label: string;
  bg: string;
  text: string;
  border: string;
  dot: string;
  icon: LucideIcon;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const normalized = status.toLowerCase();

  let config: BadgeConfig = {
    label: status,
    bg: 'bg-slate-800/60',
    text: 'text-slate-300',
    border: 'border-slate-700',
    dot: 'bg-slate-400',
    icon: Clock
  };

  if (normalized === 'investigating' || normalized === 'in_progress') {
    config = {
      label: 'Investigating',
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      dot: 'bg-cyan-400 animate-ping',
      icon: Search
    };
  } else if (normalized === 'resolved') {
    config = {
      label: 'Resolved',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-400',
      icon: CheckCircle2
    };
  } else if (normalized === 'open') {
    config = {
      label: 'Open',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      dot: 'bg-amber-400',
      icon: Clock
    };
  } else if (normalized === 'escalated') {
    config = {
      label: 'Escalated',
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'border-rose-500/30',
      dot: 'bg-rose-400',
      icon: XCircle
    };
  } else if (normalized === 'false positive') {
    config = {
      label: 'False Positive',
      bg: 'bg-slate-800/40',
      text: 'text-slate-400',
      border: 'border-slate-700/60',
      dot: 'bg-slate-500',
      icon: CheckCircle2
    };
  }

  const Icon = config.icon;
  const sizeClasses = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} font-medium`}
    >
      <span className="relative flex h-2 w-2">
        {normalized === 'investigating' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`}></span>
      </span>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  );
};
