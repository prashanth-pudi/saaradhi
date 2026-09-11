import React from 'react';
import { useApp } from '../../context/AppContext';
import { Utensils, Award, TrendingUp, HeartHandshake, Store, Building2, Percent, ArrowRight } from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const { totalMealsRescued, totalWasteAvoidedKg, totalSavingsInr, totalDonatedMeals, navigateTo } = useApp();

  const impactMetrics = [
    {
      label: 'Meals Rescued',
      value: totalMealsRescued.toLocaleString(),
      suffix: '+',
      desc: 'Wholesome portions diverted from landfill bins',
      icon: Utensils,
      color: 'text-[#14382F]'
    },
    {
      label: 'Waste Avoided',
      value: (totalWasteAvoidedKg / 1000).toFixed(1),
      suffix: ' tonnes',
      desc: 'Organic greenhouse methane emissions averted',
      icon: Award,
      color: 'text-[#2E7D5E]'
    },
    {
      label: 'Customer Savings',
      value: `₹${(totalSavingsInr / 1000).toFixed(1)}k`,
      suffix: '',
      desc: 'Affordable nutrition returned to local families',
      icon: TrendingUp,
      color: 'text-[#FF5D38]'
    },
    {
      label: 'Donated Meals',
      value: totalDonatedMeals.toLocaleString(),
      suffix: '',
      desc: 'Delivered hot to Akshaya Trust & Robin Hood Army',
      icon: HeartHandshake,
      color: 'text-amber-600'
    },
    {
      label: 'Businesses Helped',
      value: '87',
      suffix: '',
      desc: 'Bakeries, restaurants, and grocery partners in Hyderabad',
      icon: Store,
      color: 'text-[#14382F]'
    },
    {
      label: 'Care Hubs Connected',
      value: '24',
      suffix: '',
      desc: 'Verified shelter homes & community kitchens',
      icon: Building2,
      color: 'text-[#2E7D5E]'
    },
    {
      label: 'Average Rescue Rate',
      value: '83',
      suffix: '%',
      desc: 'Of all uploaded surplus successfully redistributed',
      icon: Percent,
      color: 'text-[#FF5D38]'
    }
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-stone-900">
      {/* Background Image with Dark Environmental Mood */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80"
          alt="Fresh bountiful market food"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark Teal Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D261F]/90 via-[#0F2922]/95 to-[#0D261F]/95 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Floating White/Warm Panel */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-8 border-b border-stone-200/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#2E7D5E]"></span>
                <span className="text-xs font-display font-bold uppercase tracking-wider text-[#2E7D5E]">
                  Transparent ESG & Community Metrics
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0F2922] tracking-tight">
                Our Rescue Impact
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
                Every reservation and donation recorded on SAARADHI generates verified social and environmental impact.
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <span className="text-xs font-mono text-stone-400 bg-stone-200/60 px-3 py-1 rounded-full">
                Hyderabad Region (Live Verified Data)
              </span>
              <button
                onClick={() => navigateTo('/reports')}
                className="inline-flex items-center gap-1.5 font-display font-bold text-xs uppercase tracking-wider text-white bg-[#14382F] hover:bg-[#0D261F] px-4 py-2 rounded-xl transition-all shadow-xs"
              >
                <span>Full ESG Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Large Numbers Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {impactMetrics.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="p-4 rounded-2xl bg-white border border-stone-200/70 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className={`w-5 h-5 ${stat.color} opacity-80`} />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className={`font-display font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight ${stat.color}`}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="font-display font-bold text-xs sm:text-sm text-stone-900 mt-1">
                    {stat.label}
                  </div>
                  <p className="text-[11px] text-stone-500 leading-tight mt-1">
                    {stat.desc}
                  </p>
                </div>
              );
            })}

            {/* Quick action card in the 8th grid spot */}
            <div className="p-4 rounded-2xl bg-[#FF5D38]/10 border border-[#FF5D38]/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5D38]">
                  Zero Waste Milestone
                </span>
                <div className="font-display font-bold text-sm text-stone-900 mt-1">
                  100% of edible rescue batches matched within 45 mins
                </div>
              </div>
              <button
                onClick={() => navigateTo('/marketplace')}
                className="mt-3 text-xs font-bold text-[#FF5D38] hover:text-[#E44824] flex items-center gap-1"
              >
                <span>Rescue a meal today →</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
