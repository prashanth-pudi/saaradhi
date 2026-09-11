import React from 'react';
import { Store, Cpu, ArrowRight, CheckCircle2, ShoppingBag, HeartHandshake, Zap, Bike } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Surplus Appears',
      subtitle: 'Wholesome Food Identified',
      desc: 'Near closing, local bakeries and restaurants have delicious unserved meals that deserve better than a bin.',
      icon: Store,
      badge: 'Input'
    },
    {
      num: '02',
      title: 'AI Evaluates',
      subtitle: 'Multi-Factor Analysis',
      desc: 'SAARADHI Engine evaluates expiry time, customer demand velocity, shelter needs, and transit distances.',
      icon: Cpu,
      badge: 'Intelligence'
    },
    {
      num: '03',
      title: 'Best Destination',
      subtitle: 'Precision Distribution',
      desc: 'Intelligently split into SELL (discounted customer drops), DONATE (Care Hub matched), or URGENT RESCUE.',
      icon: Zap,
      badge: 'Action'
    },
    {
      num: '04',
      title: 'Rescue Completed',
      subtitle: 'Zero Landfill Waste',
      desc: 'Food is picked up or delivered by Riders. Value is recovered, bellies are filled, and carbon is saved.',
      icon: CheckCircle2,
      badge: 'Impact'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-[#FF5D38] block mb-1">
            Seamless Ecosystem
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2922] tracking-tight">
            How SAARADHI Works
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Most platforms only post food online. SAARADHI coordinates the entire operational lifecycle from kitchen surplus to verified destination.
          </p>
        </div>

        {/* 4 Connected Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Step number watermark */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-3xl text-stone-200">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E8EFE9] text-[#14382F]">
                    {step.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#14382F] text-white flex items-center justify-center mb-4">
                  <IconComp className="w-6 h-6 text-[#FF5D38]" />
                </div>

                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg text-[#0F2922]">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#2E7D5E] mb-2">
                    {step.subtitle}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Workflow Diagram */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
          <div className="text-center text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">
            The SAARADHI Coordinated Redistribution Flow
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Origin */}
            <div className="flex-1 w-full text-center p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <Store className="w-6 h-6 text-[#14382F] mx-auto mb-1.5" />
              <div className="font-display font-bold text-sm text-stone-900">Source Kitchens</div>
              <div className="text-[11px] text-stone-500">Bakery • Restaurant • Supermarket</div>
            </div>

            <ArrowRight className="w-5 h-5 text-stone-300 hidden lg:block shrink-0" />

            {/* AI Engine Core */}
            <div className="flex-1 w-full text-center p-5 rounded-2xl bg-[#0F2922] text-white shadow-lg border border-[#FF5D38]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF5D38]/10 rounded-full blur-xl"></div>
              <Cpu className="w-7 h-7 text-[#FF5D38] mx-auto mb-1.5" />
              <div className="font-display font-extrabold text-sm text-white">
                SAARADHI AI Decision Engine
              </div>
              <div className="text-[11px] text-emerald-300">
                Time • Demand • Urgency • Shelter Needs
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-stone-300 hidden lg:block shrink-0" />

            {/* Destinations */}
            <div className="flex-1 w-full grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-center border border-emerald-200">
                <div className="text-xs font-display font-bold text-emerald-900">1. SELL</div>
                <div className="text-[10px] text-emerald-700">Customer Rescue</div>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50 text-center border border-amber-200">
                <div className="text-xs font-display font-bold text-amber-900">2. DISCOUNT</div>
                <div className="text-[10px] text-amber-700">Rapid Clearance</div>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-50 text-center border border-teal-200">
                <div className="text-xs font-display font-bold text-teal-900">3. DONATE</div>
                <div className="text-[10px] text-teal-700">Care Hub Matching</div>
              </div>
              <div className="p-2.5 rounded-xl bg-red-50 text-center border border-red-200">
                <div className="text-xs font-display font-bold text-red-900">4. URGENT</div>
                <div className="text-[10px] text-red-700">Rider Fleet</div>
              </div>
            </div>

            <ArrowRight className="w-5 h-5 text-stone-300 hidden lg:block shrink-0" />

            {/* End Beneficiary */}
            <div className="flex-1 w-full text-center p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <HeartHandshake className="w-6 h-6 text-[#FF5D38] mx-auto mb-1.5" />
              <div className="font-display font-bold text-sm text-stone-900">Impact Completed</div>
              <div className="text-[11px] text-stone-500">Customer • Shelter • Zero Waste</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
