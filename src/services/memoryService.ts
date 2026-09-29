import { HindsightMemory, MemoryStats } from '../types/memory';
import { ResolutionPayload } from '../types/incident';
import { Alert } from '../types/alert';
import { INITIAL_MEMORIES, INITIAL_MEMORY_STATS } from '../data/mockMemories';

class MemoryService {
  private memories: HindsightMemory[] = [...INITIAL_MEMORIES];
  private stats: MemoryStats = { ...INITIAL_MEMORY_STATS };

  public getAllMemories(): HindsightMemory[] {
    return [...this.memories];
  }

  public getMemoryStats(): MemoryStats {
    return {
      ...this.stats,
      totalMemories: this.memories.length,
      incidentsStored: this.memories.length,
    };
  }

  /**
   * Search Hindsight Memory for past incidents similar to an incoming alert.
   * Simulates vector embedding similarity and entity match ranking.
   */
  public async searchSimilarIncidents(alert: Alert): Promise<HindsightMemory[]> {
    // Artificial slight delay for realistic SOC AI response
    await new Promise(resolve => setTimeout(resolve, 350));

    const alertText = `${alert.title} ${alert.description} ${alert.source} ${alert.sourceIp} ${alert.target} ${alert.host}`.toLowerCase();

    // Score all memories
    const scored = this.memories.map(mem => {
      let score = mem.similarity;

      // Dynamic adjustment if matching specific alert fields
      if (alert.title.includes('Login') || alert.title.includes('Authentication')) {
        if (mem.incidentId === 'INC-2026-00317') score = 94;
        else if (mem.incidentId === 'INC-2026-00281') score = 87;
        else if (mem.incidentId === 'INC-2026-00192') score = 79;
        else if (mem.incidentId === 'INC-2026-00143') score = 74;
        else if (mem.incidentId === 'INC-2026-00098') score = 68;
      } else if (alert.title.includes('PowerShell')) {
        if (mem.tags.includes('PowerShell')) score = 93;
        else if (mem.tags.includes('C2 Beacon')) score = 81;
        else score = Math.max(30, score - 20);
      } else if (alert.title.includes('Privilege')) {
        if (mem.tags.includes('Privilege Escalation') || mem.tags.includes('Active Directory')) score = 91;
        else score = Math.max(35, score - 15);
      } else {
        // Keyword overlap
        const memText = `${mem.originalAlert} ${mem.rootCause} ${mem.resolution} ${mem.tags.join(' ')}`.toLowerCase();
        const overlap = alertText.split(' ').filter(w => w.length > 3 && memText.includes(w)).length;
        score = Math.min(95, Math.max(40, 50 + overlap * 8));
      }

      return {
        ...mem,
        similarity: score,
      };
    });

    return scored.sort((a, b) => b.similarity - a.similarity).slice(0, 5);
  }

  /**
   * Interactive search across organizational memory (used by the Hindsight Memory page)
   */
  public async searchMemories(query: string): Promise<HindsightMemory[]> {
    if (!query || !query.trim()) {
      return [...this.memories];
    }

    const cleanQuery = query.toLowerCase().trim();
    const terms = cleanQuery.split(/\s+/).filter(t => t.length > 2);

    return this.memories
      .map(mem => {
        const text = `${mem.originalAlert} ${mem.rootCause} ${mem.resolution} ${mem.analyst} ${mem.incidentId} ${mem.tags.join(' ')} ${mem.indicators?.join(' ')}`.toLowerCase();
        
        let matchScore = 0;
        if (text.includes(cleanQuery)) {
          matchScore += 40;
        }

        terms.forEach(term => {
          if (text.includes(term)) matchScore += 15;
          if (mem.tags.some(t => t.toLowerCase().includes(term))) matchScore += 10;
        });

        // Calculate a representative similarity score for the query
        const calculatedSimilarity = Math.min(98, Math.max(45, 60 + matchScore));

        return {
          ...mem,
          similarity: terms.length > 0 ? calculatedSimilarity : mem.similarity,
          matchScore
        };
      })
      .filter(item => terms.length === 0 || item.matchScore > 0)
      .sort((a, b) => b.similarity - a.similarity);
  }

  /**
   * Resolves an incident and saves it into Hindsight Memory.
   * This is the core feedback loop (Resolve -> Store Memory -> Recall)
   */
  public async storeIncident(
    payload: ResolutionPayload,
    alert?: Alert
  ): Promise<HindsightMemory> {
    // Simulate brief network store with vector embedding calculation
    await new Promise(resolve => setTimeout(resolve, 400));

    const now = new Date();
    const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);
    const newId = `MEM-${Math.floor(8951 + Math.random() * 500)}`;

    const newMemory: HindsightMemory = {
      id: newId,
      incidentId: payload.incidentId,
      originalAlert: alert ? `${alert.title} - ${alert.description}` : `Security incident ${payload.incidentId}`,
      similarity: 98, // Newly minted memory
      rootCause: payload.rootCause,
      actionsTaken: payload.actionsTaken,
      resolution: payload.actionsTaken.join('. ') + (payload.analystNotes ? ` Notes: ${payload.analystNotes}` : ''),
      outcome: payload.outcome,
      date: dateStr,
      analyst: alert?.assignedAnalyst || 'Alex Mercer (SOC Tier 2)',
      host: alert?.host || 'DC-01',
      target: alert?.target || 'admin@company.local',
      indicators: [
        alert?.sourceIp || '185.73.22.41',
        alert?.target || 'admin@company.local',
        alert?.host || 'DC-01',
        ...(alert?.mitreTechnique ? [alert.mitreTechnique] : [])
      ],
      tags: [
        ...(alert?.title.includes('Login') ? ['Credential Compromise', 'Brute Force', 'Authentication'] : ['Security Incident', 'Threat Response']),
        payload.outcome
      ],
      matchRationale: 'Newly committed organizational memory. Full vector embedding and incident graph relationship indexed.',
      learningImpact: 'Experience now immediately accessible to future automated investigations.'
    };

    // Prepend to memories list
    this.memories.unshift(newMemory);

    // Update stats
    this.stats = {
      ...this.stats,
      totalMemories: this.memories.length,
      incidentsStored: this.memories.length,
      successfulRecalls: this.stats.successfulRecalls + 1,
    };

    return newMemory;
  }

  public async testConnection(): Promise<{ success: boolean; latencyMs: number; status: string }> {
    await new Promise(res => setTimeout(res, 500));
    return {
      success: true,
      latencyMs: 38,
      status: 'Hindsight Memory Cluster v2.4.1 Connected (Nodes: 3/3 Healthy)'
    };
  }
}

export const memoryService = new MemoryService();
