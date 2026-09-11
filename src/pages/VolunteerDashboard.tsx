import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bike, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Camera, 
  Award, 
  ArrowRight, 
  Store, 
  HeartHandshake,
  Navigation,
  ShieldCheck,
  Zap,
  DollarSign
} from 'lucide-react';
import { RiderTask } from '../types';

export const RiderDashboard: React.FC = () => {
  const { riderTasks, acceptRiderTask, markTaskPickedUp, markTaskDelivered, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'completed'>('available');

  const handleAcceptTask = (task: RiderTask) => {
    acceptRiderTask(task.id, 'Active Rider');
    addToast({
      type: 'success',
      title: 'Dispatch Task Accepted! 🛵',
      message: `Head to ${task.pickupBusiness} before ${task.deadline}.`
    });
  };

  const handleMarkPickedUp = (task: RiderTask) => {
    markTaskPickedUp(task.id);
    addToast({
      type: 'info',
      title: 'Surplus In Transit 📦',
      message: `Food collected. Deliver to ${task.dropoffCareHub || task.dropoffNGO}.`
    });
  };

  const handleMarkDelivered = (task: RiderTask) => {
    markTaskDelivered(task.id);
    addToast({
      type: 'success',
      title: 'Delivery Complete! 🏅 +110 Karma & Transit Bonus',
      message: `${task.dropoffCareHub || task.dropoffNGO} received the meal batch safely. Great work!`
    });
  };

  return (
    <div className="py-8 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rider Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span className="font-semibold text-[#FF5D38] uppercase tracking-wider">Rider Fleet Portal</span>
              <span>•</span>
              <span className="text-[#14382F] font-bold">Hyderabad Green Dispatch</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl text-[#0F2922] tracking-tight">
              Rider Surplus Delivery Command
            </h1>
            <p className="text-stone-600 text-sm mt-0.5">
              Rapid zero-waste courier fleet connecting commercial kitchens with local Care Hubs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-display font-black text-lg">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Rider Karma</span>
                <span className="font-display font-bold text-base text-[#14382F]">620 Points</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-display font-black text-lg">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Today's Payout</span>
                <span className="font-display font-bold text-base text-emerald-800">₹360</span>
              </div>
            </div>
          </div>
        </div>

        {/* Task Feed */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-xl text-[#0F2922]">
                Active Rider Dispatch Queue
              </h2>
              <p className="text-xs text-stone-500">Auto-synchronized with Care Hub matching and kitchen countdowns</p>
            </div>
            <span className="text-xs font-bold text-[#14382F] bg-white border border-stone-200 px-3 py-1 rounded-lg">
              {riderTasks.length} Live Routes
            </span>
          </div>

          <div className="space-y-4">
            {riderTasks.map((task) => {
              const isAvailable = task.status === 'available';
              const isAccepted = task.status === 'accepted';
              const isPickedUp = task.status === 'picked_up';
              const isDelivered = task.status === 'delivered';

              return (
                <div
                  key={task.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        task.urgency === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {task.urgency} Urgency
                      </span>
                      <span className="text-xs font-mono font-bold text-stone-400">
                        Rider Status: <strong className="text-[#14382F] uppercase">{task.status}</strong>
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-xl text-[#0F2922]">
                      {task.foodItem} ({task.quantity} Meals)
                    </h3>

                    {/* Route Visualizer */}
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-emerald-700 shrink-0" />
                        <div>
                          <span className="text-stone-400 block text-[10px] uppercase font-bold">Kitchen Pickup</span>
                          <strong className="text-stone-900">{task.pickupBusiness}</strong>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center text-stone-400">
                        <ArrowRight className="w-4 h-4" />
                      </div>

                      <div className="flex items-center gap-2">
                        <HeartHandshake className="w-4 h-4 text-[#FF5D38] shrink-0" />
                        <div>
                          <span className="text-stone-400 block text-[10px] uppercase font-bold">Care Hub Shelter</span>
                          <strong className="text-stone-900">{task.dropoffCareHub || task.dropoffNGO}</strong>
                        </div>
                      </div>

                      <div className="text-right sm:border-l sm:border-stone-200 sm:pl-4">
                        <span className="text-stone-400 block text-[10px] uppercase font-bold">Trip Distance</span>
                        <strong className="text-[#14382F] font-mono text-sm">{task.distanceKm} km</strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                      <span className="flex items-center gap-1 text-amber-700 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        Pickup Deadline: {task.deadline}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">
                        Rider Bonus: ₹{task.cashBonusInr || 60} + {task.rewardPoints || 100} Karma Points
                      </span>
                    </div>
                  </div>

                  {/* Actions according to lifecycle */}
                  <div className="flex flex-col gap-2 shrink-0">
                    {isAvailable && (
                      <button
                        onClick={() => handleAcceptTask(task)}
                        className="px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#FF5D38] hover:bg-[#E44824] shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <Bike className="w-4 h-4" />
                        <span>Accept Rider Dispatch</span>
                      </button>
                    )}

                    {isAccepted && (
                      <button
                        onClick={() => handleMarkPickedUp(task)}
                        className="px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-amber-600 hover:bg-amber-700 shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <Store className="w-4 h-4" />
                        <span>Confirm Food Picked Up</span>
                      </button>
                    )}

                    {isPickedUp && (
                      <div className="space-y-2">
                        <div className="text-xs text-stone-500 flex items-center gap-1">
                          <Camera className="w-3.5 h-3.5 text-stone-400" />
                          <span>Delivering to Care Hub shelter</span>
                        </div>
                        <button
                          onClick={() => handleMarkDelivered(task)}
                          className="w-full px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Deliver to Care Hub</span>
                        </button>
                      </div>
                    )}

                    {isDelivered && (
                      <div className="p-3 bg-emerald-50 rounded-xl text-xs font-bold text-emerald-800 border border-emerald-200 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Task Completed (+110 Karma)</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

// Backward-compatibility export
export const VolunteerDashboard = RiderDashboard;
