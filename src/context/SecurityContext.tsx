import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert, AlertStatus } from '../types/alert';
import { IncidentInvestigation, ResolutionPayload, StepStatus } from '../types/incident';
import { HindsightMemory, MemoryStats } from '../types/memory';
import { alertService } from '../services/alertService';
import { memoryService } from '../services/memoryService';
import { investigationService } from '../services/investigationService';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
}

export type AppView = 'overview' | 'alerts' | 'investigations' | 'history' | 'memory' | 'analytics' | 'settings';

interface SecurityContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  alerts: Alert[];
  activeAlert: Alert;
  selectAlert: (alertOrId: Alert | string) => void;
  investigation: IncidentInvestigation | null;
  isLoadingInvestigation: boolean;
  isAnalyzing: boolean;
  reanalyzeCurrentAlert: () => void;
  memories: HindsightMemory[];
  memoryStats: MemoryStats;
  updateStepStatus: (stepId: string, newStatus: StepStatus) => void;
  resolveIncident: (payload: ResolutionPayload) => Promise<boolean>;
  isResolveModalOpen: boolean;
  setIsResolveModalOpen: (open: boolean) => void;
  selectedMemoryDetail: HindsightMemory | null;
  setSelectedMemoryDetail: (memory: HindsightMemory | null) => void;
  toasts: ToastItem[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  // Guided Demo Flow state
  demoStep: number;
  setDemoStep: (step: number) => void;
  isDemoMode: boolean;
  setIsDemoMode: (active: boolean) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  resetDemo: () => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const SecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('overview');
  const [alerts, setAlerts] = useState<Alert[]>(alertService.getAlerts());
  const [activeAlert, setActiveAlert] = useState<Alert>(alerts[0]);
  const [investigation, setInvestigation] = useState<IncidentInvestigation | null>(null);
  const [isLoadingInvestigation, setIsLoadingInvestigation] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [memories, setMemories] = useState<HindsightMemory[]>(memoryService.getAllMemories());
  const [memoryStats, setMemoryStats] = useState<MemoryStats>(memoryService.getMemoryStats());
  const [isResolveModalOpen, setIsResolveModalOpen] = useState<boolean>(false);
  const [selectedMemoryDetail, setSelectedMemoryDetail] = useState<HindsightMemory | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  
  // Guided Demo Flow: steps 1 through 11
  const [demoStep, setDemoStep] = useState<number>(1);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  // Load investigation for the active alert
  useEffect(() => {
    let isMounted = true;
    const loadInv = async () => {
      setIsLoadingInvestigation(true);
      setIsAnalyzing(true);

      const inv = await investigationService.getInvestigationForAlert(activeAlert);
      if (isMounted) {
        setInvestigation(inv);
        setIsLoadingInvestigation(false);
        // Simulate analysis phase completing after 700ms
        setTimeout(() => {
          if (isMounted) setIsAnalyzing(false);
        }, 700);
      }
    };

    loadInv();
    return () => {
      isMounted = false;
    };
  }, [activeAlert]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastItem = {
      id,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setToasts(prev => [newToast, ...prev.slice(0, 4)]);

    setTimeout(() => {
      removeToast(id);
    }, 6000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const selectAlert = (alertOrId: Alert | string) => {
    let foundAlert: Alert | undefined;
    if (typeof alertOrId === 'string') {
      foundAlert = alerts.find(a => a.id === alertOrId || a.incidentId === alertOrId);
    } else {
      foundAlert = alertOrId;
    }

    if (foundAlert) {
      setActiveAlert(foundAlert);
      setCurrentView('investigations');
    }
  };

  const reanalyzeCurrentAlert = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      addToast('AI Analysis Refreshed', 'Hindsight Memory queried with latest threat vector embeddings.', 'info');
    }, 1200);
  };

  const updateStepStatus = (stepId: string, newStatus: StepStatus) => {
    if (!investigation) return;
    const updated = investigationService.updateStepStatus(investigation.incidentId, stepId, newStatus);
    if (updated) {
      setInvestigation(updated);
      addToast(
        'Investigation Step Updated',
        `Step marked as ${newStatus.replace('_', ' ').toUpperCase()}`,
        'info'
      );
    }
  };

  const resolveIncident = async (payload: ResolutionPayload): Promise<boolean> => {
    try {
      const { investigation: updatedInv, storedMemory } = await investigationService.resolveIncident(payload, activeAlert);
      
      setInvestigation(updatedInv);

      // Update alert list in state
      setAlerts(prev => prev.map(a => {
        if (a.incidentId === payload.incidentId || a.id === activeAlert.id) {
          return { ...a, status: 'resolved' as AlertStatus };
        }
        return a;
      }));

      // Update active alert status
      setActiveAlert(prev => ({ ...prev, status: 'resolved' as AlertStatus }));

      // Update memory store state if saved
      if (storedMemory) {
        setMemories(memoryService.getAllMemories());
        setMemoryStats(memoryService.getMemoryStats());
      }

      addToast(
        '✓ Incident Resolved',
        storedMemory 
          ? `Memory #${storedMemory.incidentId} successfully stored in Hindsight.`
          : 'Incident marked as resolved.',
        'success'
      );

      return true;
    } catch (err) {
      console.error('Error resolving incident:', err);
      addToast('Resolution Error', 'Failed to store incident into Hindsight Memory.', 'error');
      return false;
    }
  };

  // Guided demo flow handler
  const nextDemoStep = () => {
    const next = Math.min(11, demoStep + 1);
    setDemoStep(next);
    applyDemoStepAction(next);
  };

  const prevDemoStep = () => {
    const prev = Math.max(1, demoStep - 1);
    setDemoStep(prev);
    applyDemoStepAction(prev);
  };

  const resetDemo = () => {
    setDemoStep(1);
    setCurrentView('overview');
    setIsResolveModalOpen(false);
  };

  const applyDemoStepAction = (step: number) => {
    switch (step) {
      case 1:
        setCurrentView('overview');
        setIsResolveModalOpen(false);
        break;
      case 2:
        setCurrentView('overview');
        setIsResolveModalOpen(false);
        break;
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // Focus on INC-2026-00421
        const mainAlert = alerts.find(a => a.incidentId === 'INC-2026-00421') || alerts[0];
        setActiveAlert(mainAlert);
        setCurrentView('investigations');
        setIsResolveModalOpen(false);
        if (step === 4) {
          reanalyzeCurrentAlert();
        }
        break;
      case 8:
        setCurrentView('investigations');
        setIsResolveModalOpen(true);
        break;
      case 9:
        // Modal is open, ready to store
        setCurrentView('investigations');
        setIsResolveModalOpen(true);
        break;
      case 10:
        // Incident resolved confirmation
        setIsResolveModalOpen(false);
        break;
      case 11:
        // View newly stored incident on Memory page
        setCurrentView('memory');
        setIsResolveModalOpen(false);
        break;
    }
  };

  return (
    <SecurityContext.Provider
      value={{
        currentView,
        setCurrentView,
        alerts,
        activeAlert,
        selectAlert,
        investigation,
        isLoadingInvestigation,
        isAnalyzing,
        reanalyzeCurrentAlert,
        memories,
        memoryStats,
        updateStepStatus,
        resolveIncident,
        isResolveModalOpen,
        setIsResolveModalOpen,
        selectedMemoryDetail,
        setSelectedMemoryDetail,
        toasts,
        addToast,
        removeToast,
        demoStep,
        setDemoStep,
        isDemoMode,
        setIsDemoMode,
        nextDemoStep,
        prevDemoStep,
        resetDemo
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};
