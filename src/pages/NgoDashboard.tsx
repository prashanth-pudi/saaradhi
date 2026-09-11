import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartHandshake, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Bike, 
  Sliders, 
  ShieldCheck, 
  Sparkles,
  Building2,
  Users
} from 'lucide-react';
import { Donation } from '../types';

export const CareHubDashboard: React.FC = () => {
  const { donations, acceptDonation, addToast, navigateTo } = useApp();

  const [shelterCapacity, setShelterCapacity] = useState<number>(150);
  const [prefVegOnly, setPrefVegOnly] = useState<boolean>(true);
  const [prefMaxDistance, setPrefMaxDistance] = useState<number>(5);

  const handleAccept = (d: Donation) => {
    acceptDonation(d.id);
  };

  const handleConfirmDelivery = (d: Donation) => {
    addToast({
      type: 'success',
      title: 'Care Hub Delivery Confirmed! 🍛',
      message: `Verified delivery of ${d.quantity} meals from ${d.businessName}. Impact metrics updated!`
    });
  };

  return (
    <div className="py-8 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span className="font-semibold text-emerald-800 uppercase tracking-wider">Care Hub Portal</span>
              <span>•</span>
              <span className="text-[#14382F] font-bold">Akshaya Community Care Hub</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl text-[#0F2922] tracking-tight">
              Care Hub Community Relief Command
            </h1>
            <p className="text-stone-600 text-sm mt-0.5">
              Receiving verified surplus meals across Banjara Hills, Nampally & Begumpet shelter network.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-50 text-emerald-900 text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified 80G Certified Care Hub</span>
            </span>
          </div>
        </div>

        {/* Shelter Preferences Strip */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs mb-8">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-display font-bold uppercase tracking-wider text-[#0F2922]">
              <Sliders className="w-4 h-4 text-[#FF5D38]" />
              <span>Care Hub Intake Preferences (AI Dispatch Engine)</span>
            </div>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Auto-Matching Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <span className="text-stone-500 block mb-1 font-medium">Daily Shelter Capacity:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={shelterCapacity}
                  onChange={(e) => setShelterCapacity(Number(e.target.value))}
                  className="w-24 bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 font-bold text-stone-900"
                />
                <span className="text-stone-500">meals/evening</span>
              </div>
            </div>

            <div>
              <span className="text-stone-500 block mb-1 font-medium">Dietary Filter:</span>
              <label className="flex items-center gap-2 font-semibold text-stone-800 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={prefVegOnly}
                  onChange={(e) => setPrefVegOnly(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Vegetarian Only (Senior Care & Children Shelter)</span>
              </label>
            </div>

            <div>
              <span className="text-stone-500 block mb-1 font-medium">Max Kitchen Radius:</span>
              <span className="font-bold text-stone-800 text-sm">{prefMaxDistance} km</span>
              <span className="text-stone-400 block text-[11px]">Rider delivery fleet ready for fast dispatch</span>
            </div>
          </div>
        </div>

        {/* Donation Opportunities */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-xl text-[#0F2922]">
                Incoming AI-Matched Donation Batches
              </h2>
              <p className="text-xs text-stone-500">
                Prioritized by AI matching score with your Care Hub’s real-time shelter capacity and dietary rules.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
              {donations.length} Active Allocations
            </span>
          </div>

          <div className="space-y-4">
            {donations.map((don) => (
              <div
                key={don.id}
                className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {don.matchScore}% Match Score
                    </span>
                    <span className="text-xs font-semibold text-stone-400 uppercase">
                      Status: <strong className="text-stone-900">{don.status.replace('_', ' ')}</strong>
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl text-[#0F2922]">
                    {don.quantity} Portions of {don.foodItem}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-stone-400" />
                      Kitchen: <strong>{don.businessName}</strong> ({don.businessArea})
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      Urgency: <strong className="uppercase text-amber-700">{don.urgency}</strong>
                    </span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded">
                      Matched to: {don.careHubName || don.ngoName}
                    </span>
                  </div>

                  {don.matchReasons && don.matchReasons.length > 0 && (
                    <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 italic">
                      “{don.matchReasons[0]}”
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
                  {don.status === 'matched' && (
                    <>
                      <button
                        onClick={() => handleAccept(don)}
                        className="px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#14382F] hover:bg-[#0D261F] shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Accept For Care Hub</span>
                      </button>
                      <button
                        onClick={() => {
                          addToast({
                            type: 'info',
                            title: 'Batch Re-routed',
                            message: 'Re-routed surplus batch to the next available Care Hub.'
                          });
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                      >
                        Re-route Batch
                      </button>
                    </>
                  )}

                  {(don.status === 'accepted' || don.status === 'rider_assigned' || don.status === 'volunteer_assigned') && (
                    <div className="space-y-2">
                      <div className="text-xs text-emerald-900 font-semibold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        <Bike className="w-4 h-4 text-[#FF5D38]" />
                        <span>Rider assigned & en route (ETA ~18m)</span>
                      </div>
                      <button
                        onClick={() => handleConfirmDelivery(don)}
                        className="w-full px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 shadow-md flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Care Hub Receipt</span>
                      </button>
                    </div>
                  )}

                  {don.status === 'delivered' && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Received & Distributed at Shelter
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// Backward-compatibility export
export const NgoDashboard = CareHubDashboard;
