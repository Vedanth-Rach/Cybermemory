import { Alert } from '../types/alert';
import { IncidentInvestigation, InvestigationStep, ResolutionPayload, StepStatus } from '../types/incident';
import { HindsightMemory } from '../types/memory';
import { alertService } from './alertService';
import { memoryService } from './memoryService';
import { aiService } from './aiService';

class InvestigationService {
  private activeInvestigations: Map<string, IncidentInvestigation> = new Map();

  /**
   * Initializes or fetches the investigation state for a given alert
   */
  public async getInvestigationForAlert(alert: Alert): Promise<IncidentInvestigation> {
    if (this.activeInvestigations.has(alert.incidentId)) {
      return this.activeInvestigations.get(alert.incidentId)!;
    }

    // AI assessment and memories
    const [aiResult, memories] = await Promise.all([
      aiService.analyzeAlert(alert),
      memoryService.searchSimilarIncidents(alert)
    ]);

    const investigation: IncidentInvestigation = {
      id: `INV-${alert.incidentId}`,
      incidentId: alert.incidentId,
      alertId: alert.id,
      alertTitle: alert.title,
      severity: alert.severity,
      status: alert.status,
      aiAssessment: aiResult.assessment,
      confidence: aiResult.confidence,
      steps: aiResult.steps,
      relatedMemories: memories,
      storedInHindsight: false
    };

    this.activeInvestigations.set(alert.incidentId, investigation);
    return investigation;
  }

  public updateStepStatus(
    incidentId: string,
    stepId: string,
    status: StepStatus
  ): IncidentInvestigation | undefined {
    const inv = this.activeInvestigations.get(incidentId);
    if (!inv) return undefined;

    inv.steps = inv.steps.map(step => {
      if (step.id === stepId) {
        return { ...step, status };
      }
      return step;
    });

    return { ...inv };
  }

  public async resolveIncident(payload: ResolutionPayload, alert?: Alert): Promise<{
    investigation: IncidentInvestigation;
    storedMemory?: HindsightMemory;
  }> {
    const inv = this.activeInvestigations.get(payload.incidentId) || {
      id: `INV-${payload.incidentId}`,
      incidentId: payload.incidentId,
      alertId: alert?.id || 'ALT-10921',
      alertTitle: alert?.title || 'Multiple Failed Login Attempts',
      severity: alert?.severity || 'high',
      status: 'resolved',
      aiAssessment: 'Incident resolved by analyst with containment actions.',
      confidence: 91,
      steps: [],
      relatedMemories: [],
      storedInHindsight: false
    };

    inv.status = 'resolved';
    inv.resolvedAt = new Date().toISOString().replace('T', ' ').substring(0, 16);
    inv.rootCause = payload.rootCause;
    inv.actionsTaken = payload.actionsTaken;
    inv.outcome = payload.outcome;
    inv.analystNotes = payload.analystNotes;
    inv.storedInHindsight = payload.saveToHindsight;

    // Update alert status in alert service
    if (alert) {
      alertService.updateAlertStatus(alert.id, 'resolved');
    }

    let storedMemory: HindsightMemory | undefined;
    if (payload.saveToHindsight) {
      storedMemory = await memoryService.storeIncident(payload, alert);
    }

    this.activeInvestigations.set(payload.incidentId, inv);
    return { investigation: inv, storedMemory };
  }
}

export const investigationService = new InvestigationService();
