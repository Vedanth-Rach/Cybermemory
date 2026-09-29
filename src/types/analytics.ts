export interface HourlyAlertVolume {
  hour: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
  total: number;
}

export interface SeverityDistribution {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

export interface RootCauseStat {
  category: string;
  count: number;
  percentage: number;
  avgResolutionMinutes: number;
}

export interface MemoryEffectiveness {
  assistedInvestigationsPercentage: number;
  supportedAiRecommendationsPercentage: number;
  avgTimeSavedMinutes: number;
  falsePositiveReductionPercentage: number;
}

export interface KpiMetric {
  title: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  subtext: string;
  iconName: string;
}
