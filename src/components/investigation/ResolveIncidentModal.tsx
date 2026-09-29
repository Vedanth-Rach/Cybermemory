import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { IncidentOutcome } from '../../types/memory';
import {
  X,
  CheckCircle2,
  BrainCircuit,
  ShieldCheck,
  RotateCw,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const ResolveIncidentModal: React.FC = () => {
  const {
    isResolveModalOpen,
    setIsResolveModalOpen,
    activeAlert,
    investigation,
    resolveIncident,
    setCurrentView,
    nextDemoStep,
    demoStep
  } = useSecurity();

  const [rootCause, setRootCause] = useState<string>(
    'Compromised administrator credentials caused repeated authentication attempts.'
  );

  const [actionsTaken, setActionsTaken] = useState<string[]>([
    'Blocked source IP',
    'Reset credentials',
    'Enabled MFA'
  ]);

  const [outcome, setOutcome] = useState<IncidentOutcome>('Resolved');
  const [analystNotes, setAnalystNotes] = useState<string>(
    'Correlated with historical incident INC-2026-00317. Successfully identified compromised password hash and forced immediate hardware token re-enrollment. Perimeter IP block applied to 185.73.20.0/22.'
  );
  const [saveToHindsight, setSaveToHindsight] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isResolveModalOpen) return null;

  const actionOptions = [
    'Blocked source IP',
    'Reset credentials',
    'Enabled MFA',
    'Isolated endpoint',
    'Removed malicious process',
    'Updated firewall rule',
    'Revoked Kerberos TGT tokens'
  ];

  const toggleAction = (action: string) => {
    if (actionsTaken.includes(action)) {
      setActionsTaken(actionsTaken.filter(a => a !== action));
    } else {
      setActionsTaken([...actionsTaken, action]);
    }
  };

  const handleResolve = async () => {
    setIsSubmitting(true);
    const success = await resolveIncident({
      incidentId: activeAlert.incidentId,
      rootCause,
      actionsTaken,
      outcome,
      analystNotes,
      saveToHindsight
    });
    setIsSubmitting(false);

    if (success) {
      setIsSuccess(true);
      if (demoStep === 8 || demoStep === 9) {
        nextDemoStep();
      }
    }
  };

  const handleClose = () => {
    setIsResolveModalOpen(false);
    setIsSuccess(false);
  };

  const handleGoToMemory = () => {
    handleClose();
    setCurrentView('memory');
    if (demoStep === 10) {
      nextDemoStep();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0B1222] border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1E2E50] flex items-center justify-between bg-[#080D19]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">
                Resolve Incident #{activeAlert.incidentId}
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                {activeAlert.title} • Host: {activeAlert.host}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
          {isSuccess ? (
            /* Success State */
            <div className="py-8 px-4 text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold block mb-1">
                  ✓ Incident Resolved
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Memory successfully stored in Hindsight
                </h3>
                <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                  "CyberMemory AI can now use this experience in future investigations."
                </p>
              </div>

              {/* Memory Card Preview */}
              <div className="max-w-lg mx-auto p-4 rounded-xl bg-[#090F1E] border border-cyan-500/30 text-left font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between text-cyan-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <BrainCircuit className="w-4 h-4" />
                    Hindsight Memory Node
                  </span>
                  <span>ID: #{activeAlert.incidentId}</span>
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500">Root Cause:</span> {rootCause}
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500">Actions:</span> {actionsTaken.join(', ')}
                </div>
                <div className="text-[10px] text-emerald-400 pt-1 border-t border-slate-800">
                  Status: Indexed in persistent vector space
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleGoToMemory}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2"
                >
                  <span>View in Memory Page</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Form Fields */
            <>
              {/* Root Cause */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5 flex items-center justify-between">
                  <span>Root Cause</span>
                  <span className="text-[10px] text-slate-500 font-mono">Required for memory indexing</span>
                </label>
                <input
                  type="text"
                  value={rootCause}
                  onChange={(e) => setRootCause(e.target.value)}
                  className="w-full bg-[#080D1A] border border-[#1E2E50] rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/60 font-medium"
                  placeholder="e.g. Compromised administrator credentials caused repeated authentication attempts."
                />
              </div>

              {/* Actions Taken Checkboxes */}
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Actions Taken (Select all applied remediations)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {actionOptions.map((action) => {
                    const isSelected = actionsTaken.includes(action);
                    return (
                      <div
                        key={action}
                        onClick={() => toggleAction(action)}
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition-all select-none ${
                          isSelected
                            ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
                            : 'bg-[#080D1A] border-[#1A2845] text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isSelected
                              ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                              : 'border-slate-600 bg-transparent'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{action}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Outcome Dropdown */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Resolution Outcome
                </label>
                <select
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value as IncidentOutcome)}
                  className="w-full bg-[#080D1A] border border-[#1E2E50] rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/60"
                >
                  <option value="Resolved">Resolved (Threat neutralized, controls applied)</option>
                  <option value="Partially Resolved">Partially Resolved (Quarantine active, awaiting forensics)</option>
                  <option value="Escalated">Escalated (Transferred to Tier 3 Threat Hunters)</option>
                  <option value="False Positive">False Positive (Authorized administrative vulnerability scan)</option>
                </select>
              </div>

              {/* Analyst Notes */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Analyst Post-Mortem Notes
                </label>
                <textarea
                  rows={3}
                  value={analystNotes}
                  onChange={(e) => setAnalystNotes(e.target.value)}
                  className="w-full bg-[#080D1A] border border-[#1E2E50] rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500/60 font-mono leading-relaxed"
                  placeholder="Record relevant details for future investigations..."
                />
              </div>

              {/* Hindsight Memory Storage Checkbox */}
              <div
                onClick={() => setSaveToHindsight(!saveToHindsight)}
                className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/40 border border-cyan-500/30 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs flex items-center gap-1.5">
                      <span>Save this incident to Hindsight Memory</span>
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Indexes root cause and remediations into organizational memory for future alert recall.
                    </div>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={saveToHindsight}
                  onChange={(e) => setSaveToHindsight(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 border-slate-600 bg-slate-900 cursor-pointer"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!isSuccess && (
          <div className="px-6 py-4 border-t border-[#1E2E50] bg-[#080D19] flex items-center justify-between">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleResolve}
              disabled={isSubmitting || !rootCause.trim()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50 transition-all flex items-center gap-2 active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Committing to Hindsight...</span>
                </>
              ) : (
                <>
                  <BrainCircuit className="w-4 h-4" />
                  <span>Resolve & Store Memory</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
