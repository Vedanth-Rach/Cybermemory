import React from 'react';
import { SecurityProvider, useSecurity } from './context/SecurityContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DemoFlowBanner } from './components/layout/DemoFlowBanner';
import { OverviewPage } from './components/pages/OverviewPage';
import { AlertsPage } from './components/pages/AlertsPage';
import { InvestigationPage } from './components/pages/InvestigationPage';
import { HistoryPage } from './components/pages/HistoryPage';
import { MemoryPage } from './components/pages/MemoryPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { ResolveIncidentModal } from './components/investigation/ResolveIncidentModal';
import { IncidentDetailModal } from './components/investigation/IncidentDetailModal';
import { ToastContainer } from './components/common/ToastContainer';
import { FloatingCopilot } from './components/copilot/FloatingCopilot';

const MainContent: React.FC = () => {
  const { currentView } = useSecurity();

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'investigations':
        return <InvestigationPage />;
      case 'history':
        return <HistoryPage />;
      case 'memory':
        return <MemoryPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="flex h-screen bg-[#070B14] text-slate-100 overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Workspace Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header */}
        <Header />

        {/* Guided 11-Step Demo Flow Banner */}
        <DemoFlowBanner />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6 cyber-grid scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Persistent Modals */}
      <ResolveIncidentModal />
      <IncidentDetailModal />

      {/* Floating AI Assistant */}
      <FloatingCopilot />

      {/* SOC Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <SecurityProvider>
      <MainContent />
    </SecurityProvider>
  );
}

export default App;
