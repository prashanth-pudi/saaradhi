import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Clock, 
  MapPin, 
  Heart, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  Utensils,
  Navigation,
  Sparkles,
  QrCode
} from 'lucide-react';
import { FoodCard } from '../components/common/FoodCard';
import { OrderStatus } from '../types';

export const CustomerDashboard: React.FC = () => {
  const { orders, listings, favorites, favoriteIds, navigateTo, advanceOrderStatus } = useApp();

  const favIds = favorites || favoriteIds || [];
  const favoriteListings = listings.filter(l => favIds.includes(l.id));

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'reserved':
        return { label: 'Reserved', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'packing':
        return { label: 'Packing in Kitchen', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'ready_for_pickup':
        return { label: 'Ready at Counter 🥡', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'picked_up':
        return { label: 'Rescued & Verified ⭐', color: 'bg-teal-100 text-teal-800 border-teal-200' };
      default:
        return { label: 'Confirmed', color: 'bg-stone-100 text-stone-700 border-stone-200' };
    }
  };

  return (
    <div className="py-8 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span className="font-semibold text-emerald-800 uppercase tracking-wider">Customer Portal</span>
              <span>•</span>
              <span className="text-[#FF5D38] font-bold">Hero Rescuer Level 2</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl text-[#0F2922] tracking-tight">
              Welcome back, Ananya! 👋
            </h1>
            <p className="text-stone-600 text-sm mt-0.5">
              You’ve rescued {orders.length + 6} meals and saved over ₹1,850 this month from Hyderabad kitchens.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/marketplace')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#FF5D38] hover:bg-[#E44824] shadow-md transition-all active:scale-95 shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Rescue More Food</span>
            </button>
          </div>
        </div>

        {/* Personal Impact Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span className="font-medium">Meals Rescued</span>
              <Utensils className="w-4 h-4 text-[#14382F]" />
            </div>
            <div className="text-3xl font-display font-black text-[#14382F]">
              {orders.length + 6}
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">Zero food wasted</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span className="font-medium">Direct Wallet Savings</span>
              <TrendingUp className="w-4 h-4 text-[#FF5D38]" />
            </div>
            <div className="text-3xl font-display font-black text-[#FF5D38]">
              ₹1,850
            </div>
            <span className="text-[11px] text-stone-500 font-medium">58% average discount</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <div className="flex items-center justify-between text-stone-500 text-xs mb-1">
              <span className="font-medium">Carbon Emissions Avoided</span>
              <Award className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-display font-black text-emerald-800">
              19.2 kg
            </div>
            <span className="text-[11px] text-stone-500 font-medium">Equivalent to 7 urban trees</span>
          </div>
        </div>

        {/* Active Reservations with Real-Time Tracking & Digital Pickup Code */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-xl text-[#0F2922]">
                Your Live Food Rescue Orders ({orders.length})
              </h2>
              <p className="text-xs text-stone-500">Real-time order progress and digital pickup verification codes</p>
            </div>
            <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Live Status Active
            </span>
          </div>

          {orders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map((ord) => {
                const badge = getStatusBadge(ord.status);
                const itemTitle = ord.item || ord.foodItem || 'Food Rescue Box';

                return (
                  <div key={ord.id} className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      {/* Top status bar */}
                      <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${badge.color}`}>
                          {badge.label}
                        </span>
                        <span className="text-xs font-mono text-stone-400">
                          Order #{ord.orderNumber}
                        </span>
                      </div>

                      {/* Item info */}
                      <div className="flex gap-4 items-start">
                        <div className="w-14 h-14 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 font-display font-black text-emerald-800 text-lg">
                          🥡
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-bold text-base text-stone-900 truncate">
                            {itemTitle}
                          </h3>
                          <div className="text-xs text-stone-500 mt-0.5">
                            {ord.businessName} • {ord.quantity} portions
                          </div>
                          <div className="text-xs text-emerald-700 font-bold mt-1">
                            Total Paid: ₹{ord.totalAmount}
                          </div>
                        </div>
                      </div>

                      {/* Pickup Code Display */}
                      <div className="mt-5 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-stone-400 block font-bold">
                            Digital Pickup Code
                          </span>
                          <span className="font-mono font-black text-2xl text-[#14382F] tracking-wider">
                            {ord.pickupCode}
                          </span>
                        </div>

                        <div className="text-right text-xs">
                          <span className="text-stone-400 block text-[10px] uppercase font-bold">Collect By</span>
                          <span className="font-bold text-stone-800">{ord.pickupDeadline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar: Open Live Tracking & Advance Status */}
                    <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => navigateTo(`/order-status/${ord.id}`)}
                        className="flex-1 py-3 px-4 rounded-xl bg-[#14382F] hover:bg-[#0D261F] text-white text-xs font-display font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <Navigation className="w-4 h-4 text-emerald-300" />
                        <span>Open Live Order Tracking</span>
                      </button>

                      <button
                        onClick={() => advanceOrderStatus(ord.id)}
                        className="py-3 px-4 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-display font-semibold transition-colors flex items-center justify-center gap-1"
                        title="Simulate next status transition"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#FF5D38]" />
                        <span>Advance Stage</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 text-center border border-stone-200 shadow-2xs">
              <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <p className="text-base font-display font-bold text-stone-800">No active food reservations right now</p>
              <p className="text-xs text-stone-500 mt-1">Explore surplus food drops to rescue delicious items tonight</p>
              <button
                onClick={() => navigateTo('/marketplace')}
                className="mt-5 px-6 py-3 rounded-xl bg-[#14382F] text-white text-xs font-display font-bold uppercase tracking-wider shadow-md hover:bg-[#0D261F] transition-all"
              >
                Browse Marketplace
              </button>
            </div>
          )}
        </div>

        {/* Saved Favorites Section */}
        {favoriteListings.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-xl text-[#0F2922]">
                Your Saved Food Drops ({favoriteListings.length})
              </h2>
              <span className="text-xs text-stone-500">We notify you when discounts drop</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteListings.map(l => (
                <FoodCard key={l.id} listing={l} onReserveClick={() => navigateTo(`/listing/${l.id}`)} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
