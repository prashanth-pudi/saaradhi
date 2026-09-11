import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plus, 
  Store, 
  TrendingUp, 
  Trash2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  Percent 
} from 'lucide-react';
import { MOCK_WASTE_INSIGHTS } from '../data/mockData';

export const BusinessDashboard: React.FC = () => {
  const { listings, navigateTo } = useApp();

  const businessListings = listings.filter(l => l.businessId === 'b-2' || l.businessId === 'b-1');

  return (
    <div className="py-8 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bar with Title & Create Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>Business Portal</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">Paradise Kitchens (Begumpet)</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl text-[#0F2922] tracking-tight">
              Surplus Operations Dashboard
            </h1>
          </div>

          <button
            onClick={() => navigateTo('/listings/new')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#FF5D38] hover:bg-[#E44824] shadow-md transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Surplus Listing</span>
          </button>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Revenue Recovered</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-display font-black text-[#14382F]">
              ₹48,920
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">+18% this month</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Waste Avoided</span>
              <Trash2 className="w-4 h-4 text-[#FF5D38]" />
            </div>
            <div className="text-2xl font-display font-black text-[#0F2922]">
              640 kg
            </div>
            <span className="text-[11px] text-stone-500 font-medium">1,600 meal portions saved</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Rescue Success Rate</span>
              <Percent className="w-4 h-4 text-[#2E7D5E]" />
            </div>
            <div className="text-2xl font-display font-black text-emerald-700">
              88.4%
            </div>
            <span className="text-[11px] text-stone-500 font-medium">Sold or Care Hub donated</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Active Surplus Drops</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-display font-black text-[#0F2922]">
              {businessListings.length} Live
            </div>
            <span className="text-[11px] text-amber-700 font-semibold">Counting down</span>
          </div>
        </div>

        {/* AI Action Alert Banner */}
        <div className="bg-gradient-to-r from-[#14382F] to-[#0D261F] text-white p-5 rounded-2xl border border-white/10 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF5D38]/20 text-[#FF5D38] flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#FF5D38] uppercase tracking-wider">
                AI Kitchen Intelligence
              </div>
              <p className="text-sm font-semibold text-white">
                “Recurring surplus pattern detected: You generate ~34 unserved meals every Sunday between 7:45 PM – 8:30 PM.”
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateTo('/insights')}
            className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/20 text-xs font-display font-bold text-white uppercase tracking-wider shrink-0 transition-colors"
          >
            Review Production Forecast
          </button>
        </div>

        {/* Active Listings Table */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs mb-8">
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <h2 className="font-display font-bold text-base text-[#0F2922]">
              Current Active Surplus Batches
            </h2>
            <span className="text-xs text-stone-500">Auto-expires at designated window</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-100">
                <tr>
                  <th className="px-6 py-3">Food Item</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Pricing (Orig / Rescue)</th>
                  <th className="px-6 py-3">Remaining</th>
                  <th className="px-6 py-3">Countdown</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {businessListings.map((l) => (
                  <tr key={l.id} className="hover:bg-stone-50/60">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={l.image} alt={l.item} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-stone-900 font-display">{l.item}</div>
                        <div className="text-[11px] text-stone-400">Pickup: {l.pickupWindowStart} – {l.pickupWindowEnd}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-600">
                      {l.category}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-stone-900">₹{l.rescuePrice}</span>
                      <span className="line-through text-stone-400 ml-1.5">₹{l.originalPrice}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        {l.quantityRemaining} / {l.quantityTotal}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-medium text-stone-700">
                      {l.minutesRemaining} mins left
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigateTo(`/listing/${l.id}`)}
                        className="px-3 py-1 bg-stone-100 hover:bg-[#14382F] hover:text-white rounded-lg font-display font-bold text-stone-700 transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
