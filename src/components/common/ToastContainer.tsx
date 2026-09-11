import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, Zap, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => {
        let borderAndBg = 'bg-white border-stone-200 text-stone-900';
        let IconComponent = CheckCircle2;
        let iconColor = 'text-emerald-600';

        if (toast.type === 'urgent') {
          borderAndBg = 'bg-[#FF5D38] border-[#E44824] text-white shadow-xl shadow-[#FF5D38]/30 animate-pulse';
          IconComponent = Zap;
          iconColor = 'text-white';
        } else if (toast.type === 'warning') {
          borderAndBg = 'bg-amber-50 border-amber-300 text-amber-900';
          IconComponent = AlertCircle;
          iconColor = 'text-amber-600';
        } else if (toast.type === 'info') {
          borderAndBg = 'bg-[#16423C] border-[#0F2922] text-white shadow-lg';
          IconComponent = Info;
          iconColor = 'text-emerald-300';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg transition-all transform duration-300 translate-y-0 opacity-100 ${borderAndBg}`}
          >
            <IconComponent className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-xs">
              <h4 className="font-bold font-display text-sm tracking-tight leading-snug">
                {toast.title}
              </h4>
              <p className="mt-0.5 opacity-90 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
