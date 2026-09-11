import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldAlert, 
  Store, 
  HeartHandshake, 
  Bike, 
  DollarSign, 
  AlertCircle, 
  CheckCircle2, 
  Zap,
  Activity,
  MapPin
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { listings, donations, volunteerTasks, triggerFlashRescue, addToast } = useApp();

  return (
    <div className="py-8 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>Platform Administration</span>
              <span>•</span>
              <span className="text-red-600 font-semibold">City Operations Command</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl text-[#0F2922] tracking-tight">
              Hyderabad City Operational Oversight
            </h1>
            <p className="text-stone-600 text-sm mt-0.5">
              Live monitoring of commercial surplus batches, Care Hub matches, and active riders.
            </p>
          </div>

          <button
            onClick={() => triggerFlashRescue()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#FF5D38] hover:bg-[#E44824] shadow-md transition-all active:scale-95 shrink-0"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Broadcast City Flash Rescue</span>
          </button>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Active Surplus Drops</span>
              <Store className="w-4 h-4 text-[#14382F]" />
            </div>
            <div className="text-2xl font-display font-black text-[#14382F]">
              {listings.length} Batches
            </div>
            <span className="text-[11px] text-stone-400">Paradise, Concu, Karachi</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Care Hub Match Queue</span>
              <HeartHandshake className="w-4 h-4 text-teal-700" />
            </div>
            <div className="text-2xl font-display font-black text-teal-800">
              {donations.length} Active
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">100% matched within 12m</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Riders In Transit</span>
              <Bike className="w-4 h-4 text-[#FF5D38]" />
            </div>
            <div className="text-2xl font-display font-black text-[#FF5D38]">
              {volunteerTasks.length} Active
            </div>
            <span className="text-[11px] text-stone-400">Avg transit 18 mins</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span>Platform 10% Fees</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-display font-black text-emerald-800">
              ₹18,450
            </div>
            <span className="text-[11px] text-stone-400">This week collected</span>
          </div>
        </div>

        {/* Safety and Verification Queue */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg text-[#0F2922]">
              FSSAI & Hygiene Safety Auditing
            </h2>
            <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
              Zero Safety Incidents Reported
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="font-bold text-stone-900">Paradise Kitchens Begumpet</span>
                  <span className="text-stone-500 block text-[11px]">Daily thermal food temp log: 68°C • Safe</span>
                </div>
              </div>
              <span className="text-emerald-700 font-bold">Passed</span>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="font-bold text-stone-900">Concu Pâtisserie Jubilee Hills</span>
                  <span className="text-stone-500 block text-[11px]">Bakery cold chain inspection: 4°C • Safe</span>
                </div>
              </div>
              <span className="text-emerald-700 font-bold">Passed</span>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="font-bold text-stone-900">Akshaya Community Kitchen Trust</span>
                  <span className="text-stone-500 block text-[11px]">80G Certificate renewal verified with IT Department</span>
                </div>
              </div>
              <span className="text-emerald-700 font-bold">Verified</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
