import React from 'react';
import { INITIAL_BUSINESSES } from '../../data/mockData';
import { CheckCircle, ShieldCheck } from 'lucide-react';

export const TrustedPartners: React.FC = () => {
  return (
    <section className="bg-white border-y border-stone-200/60 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="shrink-0 text-center md:text-left">
            <span className="text-[11px] font-display font-extrabold uppercase tracking-widest text-stone-400 block">
              Trusted by Local Businesses
            </span>
            <span className="text-xs text-stone-600 font-medium flex items-center justify-center md:justify-start gap-1.5 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified FSSAI Food Partners in Hyderabad
            </span>
          </div>

          {/* Partner Brands Strip */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-8 lg:gap-10">
            {INITIAL_BUSINESSES.map((b) => (
              <div
                key={b.id}
                className="flex items-center gap-2 text-stone-600 hover:text-[#0F2922] transition-colors cursor-default group"
              >
                <div className="w-2 h-2 rounded-full bg-stone-300 group-hover:bg-[#FF5D38] transition-colors" />
                <span className="font-display font-bold text-sm tracking-tight">
                  {b.name}
                </span>
                <span className="text-[10px] text-stone-400 font-medium">
                  ({b.area})
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
