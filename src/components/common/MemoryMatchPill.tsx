import React from 'react';
import { BrainCircuit } from 'lucide-react';

interface MemoryMatchPillProps {
  count: number;
  similarity?: number;
  interactive?: boolean;
  onClick?: () => void;
}

export const MemoryMatchPill: React.FC<MemoryMatchPillProps> = ({
  count,
  similarity,
  interactive = false,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 transition-all ${
        interactive ? 'cursor-pointer hover:bg-cyan-900/60 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]' : ''
      }`}
      title="Related past incidents found in Hindsight persistent memory"
    >
      <BrainCircuit className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
      <span>{count} related incidents</span>
      {similarity !== undefined && (
        <span className="ml-1 px-1.5 py-0.2 bg-cyan-500/20 text-cyan-200 rounded text-[10px] font-mono font-bold">
          {similarity}%
        </span>
      )}
    </div>
  );
};
