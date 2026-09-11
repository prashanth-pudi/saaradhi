import React, { useState } from 'react';
import { 
  Store, 
  Bike, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  HeartHandshake, 
  ShieldCheck, 
  Clock, 
  Camera, 
  AlertCircle 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NgoVolunteerFlow: React.FC = () => {
  const { triggerFlashRescue, flashRescueActive, navigateTo } = useApp();
  const [activeStep, setActiveStep] = useState<number>(3); // Demo showing "Picked Up"

  const lifecycleSteps = [
    { id: 1, label: 'MATCHED', desc: 'AI pairs surplus batch with Akshaya Care Hub' },
    { id: 2, label: 'ACCEPTED', desc: 'Care Hub shelter confirms dietary intake & storage' },
    { id: 3, label: 'PICKED UP', desc: 'Rider collects food from kitchen dispatch' },
    { id: 4, label: 'DELIVERED', desc: 'Rider arrives at shelter & uploads verification photo' },
    { id: 5, label: 'COMPLETED', desc: 'Impact counter records verified portions served' }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-[#FF5D38] block mb-1">
            Community Redistribution Grid
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2922] tracking-tight">
            Care Hub & Rider Rapid Rescue Flow
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Surplus food cannot wait. Our peer-to-peer Rider courier network mobilizes within 15 minutes to guarantee warm delivery to local Care Hubs.
          </p>
        </div>

        {/* Step Status Flow visualization */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-stone-200 mb-12">
          
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Live Transaction Tracking
              </span>
              <h3 className="font-display font-bold text-lg text-[#0F2922]">
                Batch #SRD-882: 24 Nutritious Pulao Meals
              </h3>
              <p className="text-xs text-stone-500">
                Paradise Kitchens (Begumpet) → Akshaya Community Care Hub (Banjara Hills)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">Simulate Stage:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveStep(s)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold ${
                      activeStep === s ? 'bg-[#14382F] text-white' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            {lifecycleSteps.map((step) => {
              const isPast = step.id < activeStep;
              const isCurrent = step.id === activeStep;

              let badgeStyle = 'bg-white text-stone-400 border-stone-200';
              if (isPast) badgeStyle = 'bg-[#14382F] text-white border-[#14382F]';
              if (isCurrent) badgeStyle = 'bg-[#FF5D38] text-white border-[#FF5D38] shadow-md ring-2 ring-[#FF5D38]/30';

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isCurrent ? 'bg-white shadow-md' : 'bg-white/60 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                      {step.label}
                    </span>
                    {isPast && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-xs text-stone-600 leading-tight">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* The Flash Rescue Interactive Card */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#14382F] to-[#0D261F] text-white shadow-xl border border-white/10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FF5D38]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5D38]/20 border border-[#FF5D38]/40 text-[#FF5D38] text-xs font-display font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
                <span>Urgent Surplus Protocol</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                FLASH RESCUE: When the clock is running out
              </h3>

              <p className="text-stone-300 text-sm leading-relaxed max-w-2xl">
                When a commercial kitchen has <strong>50+ meals</strong> with less than <strong>45 minutes</strong> before disposal, SAARADHI triggers an automated priority flash alert. It broadcasts instantaneous push notifications to verified nearby Riders and pre-approved Care Hub shelters.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>45-Minute Rapid Countdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bike className="w-4 h-4 text-emerald-400" />
                  <span>Rider Fleet Auto-Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#FF5D38]" />
                  <span>Verified Photo Proof at Care Hub</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="bg-black/30 p-5 rounded-2xl border border-white/15 text-center w-full max-w-xs">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block mb-1">
                  Interactive Demo Trigger
                </span>
                <div className="text-xl font-display font-black text-white mb-3">
                  80 Fresh Meals
                </div>

                <button
                  type="button"
                  onClick={() => triggerFlashRescue()}
                  className="w-full py-3 px-4 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#FF5D38] hover:bg-[#E44824] shadow-lg shadow-[#FF5D38]/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Activate Flash Rescue</span>
                </button>
                <span className="text-[10px] text-stone-400 block mt-2">
                  Simulates alert dispatch to 3 Hyderabad Care Hubs & active riders
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
