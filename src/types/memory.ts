export type IncidentOutcome = 'Resolved' | 'Partially Resolved' | 'Escalated' | 'False Positive';

export interface HindsightMemory {
  id: string;
  incidentId: string;
  originalAlert: string;
  similarity: number; // e.g. 94
  rootCause: string;
  actionsTaken: string[];
  resolution: string;
  outcome: IncidentOutcome;
  date: string;
  analyst: string;
  host?: string;
  target?: string;
  indicators?: string[];
  tags: string[];
  matchRationale?: string;
  retrievalTimestamp?: string;
  learningImpact?: string;
}

export interface MemoryStats {
  totalMemories: number;
  incidentsStored: number;
  successfulRecalls: number;
  averageSimilarity: number;
  knowledgeGrowthRate: string;
}

export interface MemorySearchResult {
  memory: HindsightMemory;
  score: number;
  highlightedMatches: string[];
}
