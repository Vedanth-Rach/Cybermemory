import React from 'react';
import { useSecurity, ToastItem } from '../../context/SecurityContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useSecurity();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none">
      {toasts.map((toast: ToastItem) => {
        let borderClass = 'border-cyan-500/40 bg-[#0E172B]/95 text-cyan-200';
        let Icon = Info;
        let iconClass = 'text-cyan-400';

        if (toast.type === 'success') {
          borderClass = 'border-emerald-500/40 bg-[#0A1A1E]/95 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.2)]';
          Icon = CheckCircle2;
          iconClass = 'text-emerald-400';
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-500/40 bg-[#1A160A]/95 text-amber-200 shadow-[0_0_25px_rgba(245,158,11,0.2)]';
          Icon = AlertTriangle;
          iconClass = 'text-amber-400';
        } else if (toast.type === 'error') {
          borderClass = 'border-rose-500/40 bg-[#1E0E12]/95 text-rose-200 shadow-[0_0_25px_rgba(244,63,94,0.2)]';
          Icon = XCircle;
          iconClass = 'text-rose-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-in slide-in-from-right-8 ${borderClass}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconClass}`} />
            <div className="flex-1 text-sm">
              <div className="font-semibold text-slate-100 flex items-center justify-between">
                <span>{toast.title}</span>
                <span className="text-[10px] text-slate-400 font-mono">{toast.timestamp}</span>
              </div>
              <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-200 p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
