import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { SURPLUS_TREND_DATA, MOCK_WASTE_INSIGHTS } from '../../data/mockData';
import { Sparkles, TrendingDown, ArrowRight, Lightbulb, AlertTriangle, Calendar } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AiInsightsSection: React.FC = () => {
  const { navigateTo } = useApp();
  const primaryInsight = MOCK_WASTE_INSIGHTS[0];

  return (
    <section id="insights" className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE9] text-[#14382F] text-xs font-display font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5D38]" />
              <span>Predictive Waste Intelligence</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2922] tracking-tight">
              Turn Yesterday’s Waste Into Tomorrow’s Insight
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl">
              SAARADHI doesn’t just help you clear excess food — it analyzes production patterns to prevent avoidable overproduction at the source.
            </p>
          </div>

          <button
            onClick={() => navigateTo('/insights')}
            className="inline-flex items-center gap-1.5 font-display font-bold text-xs uppercase tracking-wider text-white bg-[#14382F] hover:bg-[#0D261F] px-4 py-2.5 rounded-xl transition-all shadow-xs shrink-0"
          >
            <span>Full Kitchen Analytics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Featured AI Insight Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-5">
                <div className="flex items-center gap-2 text-xs font-display font-bold text-[#FF5D38] uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>Verified Pattern Detected</span>
                </div>
                <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                  {primaryInsight.confidence}% Confidence
                </span>
              </div>

              {/* The Headline Quote */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-5">
                <p className="font-display font-extrabold text-lg sm:text-xl text-[#0F2922] leading-snug">
                  “{primaryInsight.headline}”
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-amber-800">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Peak Surplus Window: {primaryInsight.peakSurplusTime}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
                <p>
                  <strong>Why it happens:</strong> {primaryInsight.recurringPattern}
                </p>
                <p>
                  <strong>AI Recommendation:</strong> {primaryInsight.recommendation}
                </p>
              </div>
            </div>

            {/* Bottom Card Summary */}
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-400 font-medium block">Potential Monthly Recovery</span>
                <span className="font-display font-extrabold text-lg text-emerald-700">
                  {primaryInsight.potentialSavings}
                </span>
              </div>

              <button
                onClick={() => navigateTo('/dashboard/business')}
                className="px-4 py-2 rounded-xl text-xs font-display font-bold text-white bg-[#FF5D38] hover:bg-[#E44824] transition-colors"
              >
                Auto-Adjust Sunday Batch
              </button>
            </div>
          </div>

          {/* RIGHT: Recharts Interactive Weekly Surplus Graph */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4 mb-6">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#0F2922]">
                    Weekly Surplus Volume vs. Rescue Success
                  </h3>
                  <p className="text-xs text-stone-500">
                    Showing daily meal units generated vs. successfully diverted
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-[#FF5D38]"></span>
                    Surplus
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-[#14382F]"></span>
                    Rescued
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-[#2E7D5E]"></span>
                    Donated
                  </span>
                </div>
              </div>

              {/* Chart Canvas */}
              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={SURPLUS_TREND_DATA}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0F2922', borderRadius: '12px', color: '#fff', border: 'none' }}
                      itemStyle={{ color: '#fff', fontSize: '12px' }}
                      formatter={(val: any, name: any) => [`${val} meals`, name]}
                    />
                    <Bar dataKey="surplusMeals" name="Surplus Meals" fill="#FF5D38" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="rescuedMeals" name="Rescued (Sold)" fill="#14382F" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="donated" name="Care Hub Donated" fill="#2E7D5E" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key metric summary pill */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Notice Sunday peak (114 meals) with 93% overall rescue rate</span>
              <span className="font-bold text-[#14382F]">Total Recovered: ₹54,600 / wk</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
