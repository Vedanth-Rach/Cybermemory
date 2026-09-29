import React, { useState, useEffect } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { memoryService } from '../../services/memoryService';
import { HindsightMemory } from '../../types/memory';
import { KNOWLEDGE_MILESTONES } from '../../data/mockAnalytics';
import { GlassCard } from '../common/GlassCard';
import { StatusBadge } from '../common/StatusBadge';
import {
  BrainCircuit,
  Search,
  Sparkles,
  Database,
  GitBranch,
  TrendingUp,
  Clock,
  ExternalLink,
  Shield,
  Layers,
  RotateCw,
  CheckCircle2,
  Calendar,
  Zap,
  Tag
} from 'lucide-react';

export const MemoryPage: React.FC = () => {
  const { memoryStats, setSelectedMemoryDetail } = useSecurity();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<HindsightMemory[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const sampleQueries = [
    'credential compromise involving failed login attempts',
    'powershell encoded command execution on workstation',
    'privilege escalation domain admins membership',
    'c2 beaconing over https'
  ];

  useEffect(() => {
    let isMounted = true;
    const executeSearch = async () => {
      setIsSearching(true);
      const results = await memoryService.searchMemories(searchQuery);
      if (isMounted) {
        setSearchResults(results);
        setIsSearching(false);
      }
    };

    const timer = setTimeout(executeSearch, 200);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchQuery, memoryStats.totalMemories]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1B2947]">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Hindsight Memory
            </h1>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700">
              Persistent Knowledge Store
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Continuously learning incident memory graph providing cross-incident intelligence and precedent retrieval.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/80 px-3 py-1.5 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Vector Index Sync: Real-time Active</span>
        </div>
      </div>

      {/* Top 5 Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <GlassCard className="p-4">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Total Memories</span>
            <Database className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white mt-1">
            {memoryStats.totalMemories}
          </div>
          <div className="text-[10px] text-cyan-400 font-mono mt-1">
            +6 new this week
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Incidents Stored</span>
            <Shield className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white mt-1">
            {memoryStats.incidentsStored}
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">
            Fully post-mortemed
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Successful Recalls</span>
            <BrainCircuit className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
            {memoryStats.successfulRecalls}
          </div>
          <div className="text-[10px] text-emerald-300 font-mono mt-1">
            Assisted 72% cases
          </div>
        </GlassCard>

        <GlassCard className="p-4">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Avg Similarity</span>
            <Zap className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-mono font-bold text-white mt-1">
            {memoryStats.averageSimilarity}%
          </div>
          <div className="text-[10px] text-slate-400 font-mono mt-1">
            Cosine vector match
          </div>
        </GlassCard>

        <GlassCard className="p-4 col-span-2 sm:col-span-1">
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Knowledge Growth</span>
            <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-xl font-mono font-bold text-purple-300 mt-1">
            {memoryStats.knowledgeGrowthRate}
          </div>
          <div className="text-[10px] text-purple-400 font-mono mt-1">
            Self-expanding corpus
          </div>
        </GlassCard>
      </div>

      {/* Semantic Memory Search Interface */}
      <GlassCard className="p-6 border-cyan-500/30">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-white">
            Search Organizational Memory
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-3">
          Retrieve past security precedents, attack patterns, and verified containment playbooks using natural language queries.
        </p>

        {/* Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search organizational memory... e.g. 'credential compromise involving failed login attempts'"
            className="w-full bg-[#080D1B] border border-[#1E2E50] rounded-xl pl-10 pr-10 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 font-mono shadow-inner"
          />
          {isSearching && (
            <RotateCw className="w-4 h-4 text-cyan-400 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
          )}
        </div>

        {/* Suggested Queries Chips */}
        <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
          <span className="text-[11px] text-slate-400 font-mono">Sample queries:</span>
          {sampleQueries.map((query, index) => (
            <button
              key={index}
              onClick={() => setSearchQuery(query)}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-[#0C1529] border border-[#1C2C4E] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors font-mono"
            >
              {query}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[11px] text-slate-500 hover:text-slate-300 underline font-mono ml-auto"
            >
              Clear
            </button>
          )}
        </div>
      </GlassCard>

      {/* Retrieved Memory Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase font-mono text-slate-400 tracking-wider">
            Retrieved Memories ({searchResults.length})
          </h3>
          <span className="text-[11px] text-cyan-400 font-mono">
            Sorted by semantic similarity score
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchResults.map((mem: HindsightMemory) => (
            <GlassCard
              key={mem.id}
              className="p-5 border-cyan-500/20 hover:border-cyan-500/50 flex flex-col justify-between"
            >
              <div>
                {/* Header: Incident & Similarity */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1A2A48]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white">
                      #{mem.incidentId}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold">
                      {mem.similarity}% Similarity
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono">{mem.date}</span>
                    <StatusBadge status={mem.outcome} size="sm" />
                  </div>
                </div>

                {/* Original Alert & Context */}
                <div className="mt-3 space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                      Context / Trigger:
                    </span>
                    <p className="text-slate-200 font-medium mt-0.5">
                      "{mem.originalAlert}"
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">
                      Root Cause:
                    </span>
                    <p className="text-slate-300 mt-0.5">
                      {mem.rootCause}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-cyan-400 font-semibold block">
                      Historical Resolution:
                    </span>
                    <p className="text-cyan-200 font-mono text-[11px] mt-0.5 bg-[#070D1B] p-2.5 rounded-lg border border-[#162544]">
                      {mem.resolution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-[#172642] flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {mem.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedMemoryDetail(mem)}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold text-xs hover:underline"
                >
                  <span>View Details</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Visual Memory Timeline Section */}
      <GlassCard className="p-6 border-purple-500/30">
        <div className="flex items-center justify-between pb-4 border-b border-[#1E2E50]">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Organizational Knowledge Growth Timeline
            </h3>
          </div>
          <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 border border-purple-800 px-2 py-0.5 rounded">
            Knowledge Graph Evolution
          </span>
        </div>

        <div className="mt-6 space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-purple-500">
          {KNOWLEDGE_MILESTONES.map((m, idx) => (
            <div key={idx} className="relative flex items-start gap-5 pl-8">
              {/* Dot */}
              <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-[#080D1A] border-2 border-cyan-400 shadow-[0_0_8px_#22d3ee]" />

              <div className="flex-1 p-3.5 rounded-xl bg-[#091122]/90 border border-[#1C2C4E]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-white">
                    {m.milestone}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400">
                    <span>{m.date}</span>
                    <span>•</span>
                    <span className="px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-800">
                      {m.incidentCount} Memories Indexed
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};
