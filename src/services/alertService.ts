import { Alert, AlertFilterOptions, AlertStatus } from '../types/alert';
import { INITIAL_ALERTS } from '../data/mockAlerts';

class AlertService {
  private alerts: Alert[] = [...INITIAL_ALERTS];

  public getAlerts(): Alert[] {
    return [...this.alerts];
  }

  public getAlertById(id: string): Alert | undefined {
    return this.alerts.find(a => a.id === id || a.incidentId === id);
  }

  public updateAlertStatus(id: string, status: AlertStatus): Alert | undefined {
    const alert = this.alerts.find(a => a.id === id || a.incidentId === id);
    if (alert) {
      alert.status = status;
    }
    return alert;
  }

  public addAlert(newAlert: Alert): void {
    this.alerts.unshift(newAlert);
  }

  public filterAlerts(alerts: Alert[], filters: AlertFilterOptions): Alert[] {
    return alerts.filter(alert => {
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesQuery = 
          alert.title.toLowerCase().includes(query) ||
          alert.description.toLowerCase().includes(query) ||
          alert.source.toLowerCase().includes(query) ||
          alert.sourceIp.toLowerCase().includes(query) ||
          alert.target.toLowerCase().includes(query) ||
          alert.host.toLowerCase().includes(query) ||
          alert.incidentId.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Severity filter
      if (filters.severity && filters.severity !== 'all') {
        if (alert.severity !== filters.severity.toLowerCase()) return false;
      }

      // Status filter
      if (filters.status && filters.status !== 'all') {
        if (alert.status !== filters.status.toLowerCase()) return false;
      }

      // Source filter
      if (filters.source && filters.source !== 'all') {
        if (!alert.source.toLowerCase().includes(filters.source.toLowerCase()) && 
            !alert.host.toLowerCase().includes(filters.source.toLowerCase())) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'severity') {
        const weight: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 };
        const diff = (weight[b.severity] || 0) - (weight[a.severity] || 0);
        return filters.sortOrder === 'asc' ? -diff : diff;
      }
      if (filters.sortBy === 'memoryMatches') {
        const diff = b.memoryMatchCount - a.memoryMatchCount;
        return filters.sortOrder === 'asc' ? -diff : diff;
      }
      // default: detectedAt (as presented)
      return 0;
    });
  }
}

export const alertService = new AlertService();
