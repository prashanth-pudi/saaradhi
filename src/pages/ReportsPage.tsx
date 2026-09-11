import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import { SURPLUS_TREND_DATA, MOCK_WASTE_INSIGHTS } from '../data/mockData';
import { 
  Award, 
  Download, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  FileText,
  DollarSign,
  Leaf
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { totalMealsRescued, totalWasteAvoidedKg, totalSavingsInr, totalDonatedMeals, addToast } = useApp();

  const pieData = [
    { name: 'Customer Rescue (Sold)', value: 68, color: '#14382F' },
    { name: 'Care Hub Community Donation', value: 24, color: '#2E7D5E' },
    { name: 'Flash Clearance', value: 8, color: '#FF5D38' }
  ];

  const handleDownloadReport = () => {
    addToast({
      type: 'success',
      title: 'ESG Report Downloaded! 📄',
      message: 'Generated Q3 Hyderabad Municipal Corporation & FSSAI Environmental Certificate.'
    });
  };

  return (
    <div className="py-8 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>Public Accountability</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Hyderabad Metropolitan Region</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl text-[#0F2922] tracking-tight">
              Impact & ESG Compliance Analytics
            </h1>
            <p className="text-stone-600 text-sm mt-0.5">
              Transparent reporting on organic waste diversion, methane emission avoidance, and community nutrition.
            </p>
          </div>

          <button
            onClick={handleDownloadReport}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#14382F] hover:bg-[#0D261F] shadow-sm transition-all active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download ESG Certificate</span>
          </button>
        </div>

        {/* 4 Big Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-xs text-stone-500 block">Total Meals Diverted</span>
            <div className="text-3xl font-display font-black text-[#14382F] mt-1">
              {totalMealsRescued.toLocaleString()}+
            </div>
            <p className="text-[11px] text-stone-400 mt-1">From commercial trash compactor</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-xs text-stone-500 block">Organic Landfill Waste</span>
            <div className="text-3xl font-display font-black text-[#2E7D5E] mt-1">
              {(totalWasteAvoidedKg / 1000).toFixed(1)} tonnes
            </div>
            <p className="text-[11px] text-stone-400 mt-1">7.8 tonnes CO₂e methane mitigated</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-xs text-stone-500 block">Consumer Affordability</span>
            <div className="text-3xl font-display font-black text-[#FF5D38] mt-1">
              ₹{(totalSavingsInr / 1000).toFixed(1)}k
            </div>
            <p className="text-[11px] text-stone-400 mt-1">Returned directly to local eaters</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-xs text-stone-500 block">Verified Charity Portions</span>
            <div className="text-3xl font-display font-black text-amber-600 mt-1">
              {totalDonatedMeals.toLocaleString()}
            </div>
            <p className="text-[11px] text-stone-400 mt-1">Delivered hot to 24 shelter kitchens</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Bar Chart: Weekly Redistribution */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            <h3 className="font-display font-bold text-lg text-[#0F2922] mb-1">
              Weekly Waste Generation vs. Rescue Recovery
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Tracked across Hyderabad central districts (Banjara, Begumpet, Jubilee Hills)
            </p>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SURPLUS_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F2922', borderRadius: '12px', color: '#fff', border: 'none' }}
                  />
                  <Bar dataKey="surplusMeals" name="Surplus Meals" fill="#FF5D38" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rescuedMeals" name="Marketplace Rescue" fill="#14382F" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="donated" name="Care Hub Shelter Route" fill="#2E7D5E" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart: Destination Split */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-[#0F2922] mb-1">
                Surplus Destination Split
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                Where every meal went this cycle
              </p>

              <div className="h-52 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 mt-2">
                {pieData.map(p => (
                  <div key={p.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-stone-700">{p.name}</span>
                    </div>
                    <span className="font-bold text-stone-900">{p.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 text-center">
              <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full">
                Zero Landfill Waste Target Achieved
              </span>
            </div>
          </div>

        </div>

        {/* Business Model Monetization Breakdown (Section 45) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm mb-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-display font-bold uppercase tracking-wider text-[#FF5D38] block mb-1">
              Platform Sustainability Model
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#0F2922]">
              How SAARADHI Generates Revenue
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              We align revenue directly with waste prevention. Businesses recover cash, customers save money, and Care Hubs receive guaranteed meals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Transaction Commission */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-lg bg-[#14382F] text-white flex items-center justify-center mb-3 font-display font-bold text-sm">
                  10%
                </span>
                <h3 className="font-display font-bold text-base text-[#0F2922]">
                  Marketplace Transaction Fee
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  A small 10% fee on consumer surplus meal purchases. Completely free for registered non-profit Care Hub shelter distribution.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-semibold text-[#14382F]">
                Current Volume: ₹1.84L / month
              </div>
            </div>

            {/* 2. SaaS Subscriptions */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-lg bg-[#FF5D38] text-white flex items-center justify-center mb-3 font-display font-bold text-sm">
                  SaaS
                </span>
                <h3 className="font-display font-bold text-base text-[#0F2922]">
                  Predictive Waste SaaS Plans
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Kitchens subscribe for AI production analytics, menu adjustments, and automated flash-clearance pricing.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-semibold text-[#FF5D38]">
                Starter: ₹499 • Pro: ₹1,999 / mo
              </div>
            </div>

            {/* 3. ESG & Carbon Offsets */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center mb-3 font-display font-bold text-sm">
                  ESG
                </span>
                <h3 className="font-display font-bold text-base text-[#0F2922]">
                  Enterprise CSR Verification
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Corporate hotels and tech parks purchase auditable ESG sustainability compliance certificates for carbon credits.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-semibold text-emerald-800">
                FSSAI & Municipal Certified
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
