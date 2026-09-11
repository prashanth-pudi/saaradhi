import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  HeartHandshake, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Sliders, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { calculateAIDecision } from '../../utils/aiDecisionEngine';
import { useApp } from '../../context/AppContext';

export const AiDecisionEngine: React.FC = () => {
  const { navigateTo, addToast } = useApp();

  // Interactive controls to let visitors or judges test operational parameters live
  const [quantity, setQuantity] = useState<number>(72);
  const [minutesRemaining, setMinutesRemaining] = useState<number>(150); // ~2.5 hrs
  const [currentDemand, setCurrentDemand] = useState<'Low' | 'Moderate' | 'Strong'>('Strong');
  const [historicalDemand, setHistoricalDemand] = useState<'Low' | 'Medium' | 'Strong'>('Medium');
  const [careHubNeedLevel, setCareHubNeedLevel] = useState<'Low' | 'Medium' | 'High'>('High');
  const [pickupAvailable, setPickupAvailable] = useState<boolean>(true);

  const decision = useMemo(() => {
    return calculateAIDecision({
      quantity,
      minutesRemaining,
      historicalDemand,
      currentDemand,
      careHubNeedLevel,
      ngoNeedLevel: careHubNeedLevel,
      pickupAvailable,
      distanceKm: 2.4,
      originalPrice: 280
    });
  }, [quantity, minutesRemaining, historicalDemand, currentDemand, careHubNeedLevel, pickupAvailable]);

  const handleApplyPlan = () => {
    addToast({
      type: 'success',
      title: 'Rescue Plan Activated! 🚀',
      message: `Allocated ${decision.sellQty} to Customer Marketplace, ${decision.discountQty} to Rapid Discount, and ${decision.donateQty} reserved for Akshaya Trust.`
    });
    navigateTo('/marketplace');
  };

  return (
    <section id="decision-engine" className="py-16 sm:py-24 bg-[#0F2922] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-[#FF5D38]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#2E7D5E]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#FF5D38] text-xs font-display font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>The Core Differentiator</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            AI Rescue Decision Engine
          </h2>

          <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
            SAARADHI is not a chatbot. It is an operational decision matrix that evaluates time, demand, quantity, distance, shelter urgency, and transit logistics to assign every meal to its optimal destination.
          </p>
        </div>

        {/* The Interactive Decision Matrix Visual */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* LEFT: Live Operational Telemetry & Interactive Sliders */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#FF5D38] font-bold">
                      Surplus Batch Ingested
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-white">
                      {quantity} Surplus Meals Detected
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Origin: Paradise Kitchens (Begumpet, Hyderabad)
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                      Decision Confidence
                    </span>
                    <span className="font-display font-black text-2xl text-emerald-400">
                      {decision.confidence}%
                    </span>
                  </div>
                </div>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                  
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Time to Expiry</span>
                    </div>
                    <div className="font-display font-bold text-sm text-white">
                      {Math.floor(minutesRemaining / 60)}h {minutesRemaining % 60}m
                    </div>
                    <div className="text-[10px] text-amber-400 font-medium mt-0.5">
                      {decision.timeToExpiryScore} Urgency
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Demand Velocity</span>
                    </div>
                    <div className="font-display font-bold text-sm text-white">
                      {currentDemand}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium mt-0.5">
                      Historical: {historicalDemand}
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                    <div className="flex items-center gap-1.5 text-stone-400 text-xs mb-1">
                      <HeartHandshake className="w-3.5 h-3.5 text-[#FF5D38]" />
                      <span>Care Hub Shelter Need</span>
                    </div>
                    <div className="font-display font-bold text-sm text-white">
                      {careHubNeedLevel} Need
                    </div>
                    <div className="text-[10px] text-[#FF5D38] font-medium mt-0.5">
                      Akshaya Care Hub (2.4 km)
                    </div>
                  </div>

                </div>

                {/* Interactive Tweak Panel */}
                <div className="mt-6 p-4 rounded-2xl bg-black/25 border border-white/10 space-y-3.5">
                  <div className="flex items-center justify-between text-xs text-stone-300 font-bold uppercase tracking-wider font-display">
                    <span className="flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-[#FF5D38]" />
                      Live Simulation Controls (Try Changing!)
                    </span>
                    <button
                      onClick={() => {
                        setQuantity(72);
                        setMinutesRemaining(150);
                        setCurrentDemand('Strong');
                        setHistoricalDemand('Medium');
                        setCareHubNeedLevel('High');
                      }}
                      className="text-[10px] text-stone-400 hover:text-white underline"
                    >
                      Reset Default
                    </button>
                  </div>

                  {/* Quantity Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-stone-300 mb-1">
                      <span>Batch Quantity:</span>
                      <span className="font-bold text-white">{quantity} Meals</span>
                    </div>
                    <input 
                      type="range" 
                      min="20" 
                      max="150" 
                      step="4"
                      value={quantity} 
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full accent-[#FF5D38] cursor-pointer"
                    />
                  </div>

                  {/* Expiry Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-stone-300 mb-1">
                      <span>Time Remaining to Expiry:</span>
                      <span className="font-bold text-amber-300">{minutesRemaining} minutes</span>
                    </div>
                    <input 
                      type="range" 
                      min="30" 
                      max="240" 
                      step="15"
                      value={minutesRemaining} 
                      onChange={(e) => setMinutesRemaining(Number(e.target.value))}
                      className="w-full accent-[#FF5D38] cursor-pointer"
                    />
                  </div>
                </div>

              </div>

              {/* Engine operational reason */}
              <div className="text-xs text-stone-300 border-l-2 border-[#FF5D38] pl-3 py-1 italic leading-relaxed">
                “{decision.explanation}”
              </div>
            </div>

            {/* RIGHT: Recommended Rescue Plan Output Card */}
            <div className="lg:col-span-6 bg-white text-[#0F2922] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF5D38]">
                      Optimized Execution Plan
                    </span>
                    <h4 className="font-display font-black text-2xl text-[#0F2922]">
                      Recommended Rescue Breakdown
                    </h4>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-display font-bold bg-[#E8EFE9] text-[#14382F] uppercase">
                    Mode: {decision.recommendedMode}
                  </span>
                </div>

                {/* 3 Metric Breakdown Blocks */}
                <div className="space-y-3">
                  {/* SELL Block */}
                  <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-display font-black text-lg flex items-center justify-center">
                        {decision.sellQty}
                      </div>
                      <div>
                        <div className="font-display font-bold text-base text-emerald-950">
                          SELL (Customer Rescue)
                        </div>
                        <div className="text-xs text-emerald-700">
                          Listed at 55% discount on SAARADHI discovery feed
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      ₹129 / portion
                    </span>
                  </div>

                  {/* DISCOUNT Block */}
                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-600 text-white font-display font-black text-lg flex items-center justify-center">
                        {decision.discountQty}
                      </div>
                      <div>
                        <div className="font-display font-bold text-base text-amber-950">
                          DISCOUNT (Flash Clearance)
                        </div>
                        <div className="text-xs text-amber-800">
                          Automated progressive markdown before final hour
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      ₹89 / portion
                    </span>
                  </div>

                  {/* DONATE Block */}
                  <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200/80 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-700 text-white font-display font-black text-lg flex items-center justify-center">
                        {decision.donateQty}
                      </div>
                      <div>
                        <div className="font-display font-bold text-base text-teal-950">
                          DONATE (Care Hub Matched)
                        </div>
                        <div className="text-xs text-teal-800">
                          Routed to Akshaya Care Hub with rider courier dispatch
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                      Zero Waste
                    </span>
                  </div>
                </div>

                {/* Summary Forecast */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500 block">Projected Revenue Recovered:</span>
                    <span className="font-display font-bold text-base text-[#14382F]">
                      ₹{decision.projectedRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Community Meals Donated:</span>
                    <span className="font-display font-bold text-base text-[#FF5D38]">
                      {decision.donateQty} portions
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4">
                <button
                  type="button"
                  onClick={handleApplyPlan}
                  className="w-full py-3.5 px-6 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-white bg-[#FF5D38] hover:bg-[#E44824] shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>Apply Rescue Plan ({quantity} Meals)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
