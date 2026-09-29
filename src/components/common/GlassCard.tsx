import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: 'cyan' | 'blue' | 'emerald' | 'amber' | 'red' | 'none';
  onClick?: () => void;
  hoverable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = 'none',
  onClick,
  hoverable = false
}) => {
  const glowClasses = {
    cyan: 'hover:border-cyan-500/50 hover:shadow-[0_0_20px_-3px_rgba(6,182,212,0.2)]',
    blue: 'hover:border-blue-500/50 hover:shadow-[0_0_20px_-3px_rgba(59,130,246,0.2)]',
    emerald: 'hover:border-emerald-500/50 hover:shadow-[0_0_20px_-3px_rgba(16,185,129,0.2)]',
    amber: 'hover:border-amber-500/50 hover:shadow-[0_0_20px_-3px_rgba(245,158,11,0.2)]',
    red: 'hover:border-rose-500/50 hover:shadow-[0_0_20px_-3px_rgba(244,63,94,0.2)]',
    none: ''
  };

  return (
    <div
      onClick={onClick}
      className={`bg-[#0D1527]/85 backdrop-blur-md border border-[#1C2C4E] rounded-xl p-5 transition-all duration-200 ${
        hoverable ? 'hover:-translate-y-0.5 cursor-pointer' : ''
      } ${glowClasses[glow]} ${className}`}
    >
      {children}
    </div>
  );
};
