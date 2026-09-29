import React from 'react';
import { AlertSeverity } from '../../types/alert';
import { AlertTriangle, AlertCircle, ShieldAlert, Info } from 'lucide-react';

interface SeverityBadgeProps {
  severity: AlertSeverity;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  showIcon = true,
  size = 'md'
}) => {
  const configs = {
    critical: {
      label: 'CRITICAL',
      bg: 'bg-rose-500/15',
      text: 'text-rose-400',
      border: 'border-rose-500/30',
      glow: 'shadow-[0_0_12px_rgba(244,63,94,0.25)]',
      icon: ShieldAlert
    },
    high: {
      label: 'HIGH',
      bg: 'bg-amber-500/15',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.2)]',
      icon: AlertTriangle
    },
    medium: {
      label: 'MEDIUM',
      bg: 'bg-yellow-500/15',
      text: 'text-yellow-400',
      border: 'border-yellow-500/30',
      glow: '',
      icon: AlertCircle
    },
    low: {
      label: 'LOW',
      bg: 'bg-sky-500/15',
      text: 'text-sky-400',
      border: 'border-sky-500/30',
      glow: '',
      icon: Info
    }
  };

  const config = configs[severity] || configs.low;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 font-medium tracking-wide',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wider',
    lg: 'text-sm px-3.5 py-1.5 font-bold tracking-widest'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${config.bg} ${config.text} ${config.border} ${config.glow} ${sizeClasses[size]} uppercase font-mono`}
    >
      {showIcon && <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      {config.label}
    </span>
  );
};
