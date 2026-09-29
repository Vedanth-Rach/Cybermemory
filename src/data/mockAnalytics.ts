import { HourlyAlertVolume, SeverityDistribution, RootCauseStat, MemoryEffectiveness } from '../types/analytics';

export const HOURLY_ALERT_ACTIVITY: HourlyAlertVolume[] = [
  { hour: '00:00', critical: 1, high: 2, medium: 4, low: 3, total: 10 },
  { hour: '02:00', critical: 0, high: 1, medium: 2, low: 4, total: 7 },
  { hour: '04:00', critical: 1, high: 3, medium: 5, low: 2, total: 11 },
  { hour: '06:00', critical: 0, high: 2, medium: 3, low: 6, total: 11 },
  { hour: '08:00', critical: 2, high: 5, medium: 8, low: 9, total: 24 },
  { hour: '10:00', critical: 4, high: 9, medium: 14, low: 11, total: 38 },
  { hour: '12:00', critical: 2, high: 6, medium: 10, low: 8, total: 26 },
  { hour: '14:00', critical: 3, high: 8, medium: 12, low: 7, total: 30 },
  { hour: '16:00', critical: 5, high: 12, medium: 15, low: 10, total: 42 },
  { hour: '18:00', critical: 3, high: 8, medium: 9, low: 6, total: 26 },
  { hour: '20:00', critical: 4, high: 11, medium: 8, low: 5, total: 28 },
  { hour: '22:00', critical: 2, high: 4, medium: 6, low: 3, total: 15 },
];

export const SEVERITY_DISTRIBUTION: SeverityDistribution[] = [
  { name: 'Critical', count: 18, percentage: 15, color: '#EF4444' },
  { name: 'High', count: 42, percentage: 35, color: '#F97316' },
  { name: 'Medium', count: 42, percentage: 35, color: '#EAB308' },
  { name: 'Low', count: 18, percentage: 15, color: '#38BDF8' },
];

export const TOP_ROOT_CAUSES: RootCauseStat[] = [
  { category: 'Credential Compromise', count: 48, percentage: 34, avgResolutionMinutes: 18 },
  { category: 'Malware & Ransomware', count: 37, percentage: 26, avgResolutionMinutes: 32 },
  { category: 'Misconfiguration / Drift', count: 25, percentage: 18, avgResolutionMinutes: 12 },
  { category: 'Phishing & Social Eng', count: 17, percentage: 12, avgResolutionMinutes: 24 },
  { category: 'Unauthorized Access', count: 10, percentage: 7, avgResolutionMinutes: 45 },
  { category: 'False Positive', count: 5, percentage: 3, avgResolutionMinutes: 6 },
];

export const MEMORY_EFFECTIVENESS_METRICS: MemoryEffectiveness = {
  assistedInvestigationsPercentage: 72,
  supportedAiRecommendationsPercentage: 84,
  avgTimeSavedMinutes: 42,
  falsePositiveReductionPercentage: 38,
};

export interface KnowledgeMilestone {
  date: string;
  milestone: string;
  incidentCount: number;
  description: string;
}

export const KNOWLEDGE_MILESTONES: KnowledgeMilestone[] = [
  {
    date: '2026-06-01',
    milestone: 'Initial Hindsight Baseline',
    incidentCount: 25,
    description: 'Ingested 25 curated legacy SOC post-mortem reports to prime foundational memory retrieval.'
  },
  {
    date: '2026-07-15',
    milestone: 'Perimeter Defense Cluster',
    incidentCount: 60,
    description: 'Expanded memory corpus with RDP, VPN, and SSH gateway spray attack patterns.'
  },
  {
    date: '2026-08-20',
    milestone: 'Active Directory Identity Expansion',
    incidentCount: 95,
    description: 'Deepened coverage of Kerberoasting, Golden Ticket, and Tier-0 privilege elevation vectors.'
  },
  {
    date: '2026-09-15',
    milestone: 'Cloud & Kubernetes Vectors',
    incidentCount: 120,
    description: 'Integrated IAM role assumption and container escape behavioral signatures into memory graph.'
  },
  {
    date: '2026-09-29',
    milestone: 'Autonomous Cross-Incident Correlation',
    incidentCount: 142,
    description: 'Multi-hop graph retrieval activated. Hindsight correlates multi-stage attacks across endpoints in real-time.'
  }
];
