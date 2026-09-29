import { AlertSeverity, AlertStatus } from './alert';
import { HindsightMemory, IncidentOutcome } from './memory';

export type StepStatus = 'pending' | 'in_progress' | 'completed';

export interface InvestigationStep {
  id: string;
  stepNumber: string; // e.g. "01"
  title: string;
  description: string;
  detailedGuidance: string;
  status: StepStatus;
  commandSuggestion?: string;
  evidenceFound?: string;
}

export interface IncidentInvestigation {
  id: string;
  incidentId: string;
  alertId: string;
  alertTitle: string;
  severity: AlertSeverity;
  status: AlertStatus;
  aiAssessment: string;
  confidence: number; // e.g. 91
  steps: InvestigationStep[];
  relatedMemories: HindsightMemory[];
  // Resolution details
  resolvedAt?: string;
  rootCause?: string;
  actionsTaken?: string[];
  outcome?: IncidentOutcome;
  analystNotes?: string;
  storedInHindsight?: boolean;
}

export interface ResolutionPayload {
  incidentId: string;
  rootCause: string;
  actionsTaken: string[];
  outcome: IncidentOutcome;
  analystNotes: string;
  saveToHindsight: boolean;
}
