export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlertStatus = 'open' | 'investigating' | 'resolved' | 'dismissed';

export interface Alert {
  id: string;
  incidentId: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  source: string;
  sourceIp: string;
  target: string;
  host: string;
  detectedAt: string;
  firstSeen: string;
  lastSeen: string;
  attempts: number;
  geolocation: string;
  memoryMatchCount: number;
  mitreTechnique?: string;
  mitreTactic?: string;
  rawLogSnippet?: string;
  assignedAnalyst?: string;
}

export interface AlertFilterOptions {
  searchQuery: string;
  severity: string;
  status: string;
  source: string;
  dateRange: string;
  sortBy: 'detectedAt' | 'severity' | 'memoryMatches';
  sortOrder: 'asc' | 'desc';
}
