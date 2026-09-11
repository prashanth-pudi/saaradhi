import React from 'react';
import { useApp } from '../../context/AppContext';
import { Zap, Bell, Users, HeartHandshake, ShieldAlert, X, ArrowRight } from 'lucide-react';

export const FlashRescueBanner: React.FC = () => {
  const { flashRescueActive, dismissFlashRescue, navigateTo } = useApp();

  if (!flashRescueActive) return null;

  return (
    <div className="bg-gradient-to-r from-[#FF5D38] via-[#E44824] to-[#C93514] text-white py-3 px-4 shadow-md sticky top-16 z-40 animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex h-3 w-3 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <div className="flex items-center gap-2 font-display">
            <span className="font-extrabold tracking-wider uppercase bg-black/20 px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Flash Rescue Active
            </span>
            <span className="font-medium">
              Paradise Kitchens: <strong>72 hot meals</strong> need rapid rescue (45 min countdown).
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="hidden lg:flex items-center gap-2 text-xs bg-white/10 px-2.5 py-1 rounded-lg">
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 24 Buyers</span>
            <span>•</span>
            <span className="flex items-center gap-1"><HeartHandshake className="w-3 h-3" /> Akshaya Care Hub</span>
            <span>•</span>
            <span className="flex items-center gap-1">🛵 3 Riders Active</span>
          </div>

          <button
            onClick={() => navigateTo('/marketplace')}
            className="px-3 py-1 rounded-lg bg-white text-[#FF5D38] font-display font-bold text-xs hover:bg-stone-100 transition-colors flex items-center gap-1 shadow-sm"
          >
            Rescue Batch
            <ArrowRight className="w-3 h-3" />
          </button>

          <button
            onClick={dismissFlashRescue}
            className="p-1 rounded-lg hover:bg-black/20 transition-colors ml-1"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
