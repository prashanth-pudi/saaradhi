import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Navigation, Store, HeartHandshake, ArrowLeft, Clock } from 'lucide-react';
import { FoodListing } from '../types';

export const MapPage: React.FC = () => {
  const { listings, navigateTo } = useApp();
  const [selected, setSelected] = useState<FoodListing>(listings[0]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('/marketplace')}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-display font-bold text-base text-[#0F2922]">
              Hyderabad Live Rescue Map
            </h1>
            <p className="text-[11px] text-stone-500">
              Showing {listings.length} live surplus drops & 3 partner shelters
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('/marketplace')}
          className="px-3.5 py-1.5 rounded-xl bg-[#14382F] text-white text-xs font-display font-bold"
        >
          View Grid Feed
        </button>
      </div>

      {/* Main Map + Sidebar layout */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        
        {/* Sidebar list */}
        <div className="w-full md:w-80 lg:w-96 bg-white border-r border-stone-200 p-4 overflow-y-auto max-h-[350px] md:max-h-[calc(100vh-65px)]">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3">
            Available Drops Near You
          </span>

          <div className="space-y-3">
            {listings.map((l) => (
              <div
                key={l.id}
                onClick={() => setSelected(l)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex gap-3 ${
                  selected?.id === l.id
                    ? 'border-[#FF5D38] bg-[#FF5D38]/5 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <img src={l.image} alt={l.item} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-stone-500 truncate">{l.businessName}</span>
                    <span className="text-[#FF5D38] font-bold">{l.discountPercentage}% OFF</span>
                  </div>
                  <h4 className="font-display font-bold text-xs text-stone-900 truncate mt-0.5">
                    {l.item}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-display font-black text-sm text-[#14382F]">
                      ₹{l.rescuePrice}
                    </span>
                    <span className="text-[11px] text-stone-400 line-through">
                      ₹{l.originalPrice}
                    </span>
                    <span className="text-[10px] text-amber-700 ml-auto font-medium">
                      {l.minutesRemaining}m left
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Canvas */}
        <div className="flex-1 bg-[#E8EFE9] relative min-h-[450px]">
          {/* Stylized vector map */}
          <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
            {/* Water body */}
            <path
              d="M 520,180 C 580,160 660,190 680,240 C 690,290 640,340 580,330 C 530,320 490,270 500,220 Z"
              fill="#C6DCD7"
            />
            {/* Roads */}
            <line x1="0" y1="280" x2="1400" y2="310" stroke="#FFFFFF" strokeWidth="8" />
            <line x1="200" y1="0" x2="600" y2="800" stroke="#FFFFFF" strokeWidth="6" />
            <line x1="800" y1="0" x2="400" y2="800" stroke="#FFFFFF" strokeWidth="6" />
          </svg>

          {/* Markers */}
          {listings.map((l, index) => {
            const isSelected = selected?.id === l.id;
            const topPositions = ['35%', '25%', '50%', '60%', '42%', '48%'];
            const leftPositions = ['40%', '65%', '45%', '32%', '20%', '55%'];

            return (
              <div
                key={l.id}
                style={{ top: topPositions[index % 6], left: leftPositions[index % 6] }}
                onClick={() => setSelected(l)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-all ${
                  isSelected ? 'scale-120 z-20' : 'hover:scale-110'
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg border-2 font-display text-xs font-bold whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#FF5D38] text-white border-white shadow-[#FF5D38]/40 ring-4 ring-[#FF5D38]/20'
                      : 'bg-[#14382F] text-white border-white'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>{l.businessName}</span>
                  <span className="text-[10px] opacity-90">₹{l.rescuePrice}</span>
                </div>
              </div>
            );
          })}

          {/* Selected Listing Floating Drawer */}
          {selected && (
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 z-30 animate-fade-in">
              <div className="flex gap-4">
                <img src={selected.image} alt={selected.item} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold text-emerald-800">{selected.businessName}</span>
                    <span className="text-[#FF5D38] font-bold">{selected.discountPercentage}% OFF</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-stone-900 truncate mt-0.5">
                    {selected.item}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-display font-black text-xl text-[#14382F]">
                      ₹{selected.rescuePrice}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      ₹{selected.originalPrice}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Expires in {selected.minutesRemaining} mins</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-500 flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-[#FF5D38]" />
                  {selected.distanceKm} km away • {selected.businessArea}
                </span>
                <button
                  onClick={() => navigateTo(`/listing/${selected.id}`)}
                  className="px-4 py-2 rounded-xl bg-[#FF5D38] text-white text-xs font-display font-bold hover:bg-[#E44824] transition-colors"
                >
                  Reserve & Rescue
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
