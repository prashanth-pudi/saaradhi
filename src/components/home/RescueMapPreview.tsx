import React, { useState } from 'react';
import { MapPin, Navigation, ArrowRight, Store, HeartHandshake, Eye, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FoodListing } from '../../types';

export const RescueMapPreview: React.FC = () => {
  const { listings, navigateTo } = useApp();
  const [selectedListing, setSelectedListing] = useState<FoodListing>(listings[0]);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Interactive mock map markers positioned proportionally on the stylized map grid
  const markers = [
    { id: 'list-1', x: '42%', y: '38%', label: 'Concu Pâtisserie', type: 'Bakery', count: '3 left' },
    { id: 'list-2', x: '68%', y: '24%', label: 'Paradise Kitchens', type: 'Restaurant', count: '4 left' },
    { id: 'list-3', x: '48%', y: '52%', label: 'Chutneys', type: 'Vegetarian', count: '2 left' },
    { id: 'list-4', x: '35%', y: '60%', label: 'Karachi Bakery', type: 'Bakery', count: '5 left' },
    { id: 'list-6', x: '18%', y: '45%', label: 'Ratnadeep Fresh', type: 'Supermarket', count: '3 left' },
    { id: 'ngo-pin', x: '58%', y: '48%', label: 'Akshaya Care Hub', type: 'CareHub', count: 'Accepting' }
  ];

  return (
    <section id="map-preview" className="py-16 sm:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-display font-bold uppercase tracking-wider text-[#FF5D38] block mb-1">
              Geo-Located Discovery
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2922] tracking-tight">
              Rescue Food Near You
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1">
              Explore live surplus drops across Hyderabad’s food hubs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-xl border border-stone-200 flex text-xs font-display font-bold">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'map' ? 'bg-[#14382F] text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Map View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#14382F] text-white' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                List View
              </button>
            </div>

            <button
              onClick={() => navigateTo('/map')}
              className="px-4 py-2 rounded-xl bg-[#FF5D38] hover:bg-[#E44824] text-white text-xs font-display font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xs shrink-0"
            >
              <span>Full Screen Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* The Interactive Map Component */}
        <div className="relative bg-stone-200 rounded-3xl overflow-hidden border border-stone-300/80 shadow-md min-h-[480px] sm:min-h-[520px]">
          
          {/* Stylized Modern Vector Map Canvas */}
          <div className="absolute inset-0 bg-[#E8EFE9]/70">
            {/* SVG Roads & Water Body (representing Hussain Sagar Lake & Outer Ring Road) */}
            <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
              {/* Hussain Sagar Lake representation */}
              <path
                d="M 520,180 C 580,160 660,190 680,240 C 690,290 640,340 580,330 C 530,320 490,270 500,220 Z"
                fill="#C6DCD7"
                opacity="0.9"
              />
              <text x="560" y="250" fill="#2E7D5E" fontSize="11" fontFamily="sans-serif" fontWeight="600" opacity="0.7">
                Hussain Sagar
              </text>

              {/* Major Arterial Roads */}
              <line x1="0" y1="280" x2="1200" y2="310" stroke="#FFFFFF" strokeWidth="8" />
              <line x1="200" y1="0" x2="600" y2="600" stroke="#FFFFFF" strokeWidth="6" />
              <line x1="800" y1="0" x2="400" y2="600" stroke="#FFFFFF" strokeWidth="6" />
              <line x1="0" y1="450" x2="1200" y2="420" stroke="#FFFFFF" strokeWidth="10" />

              {/* Minor Transit Grid */}
              <line x1="150" y1="100" x2="900" y2="120" stroke="#D9E5E1" strokeWidth="3" />
              <line x1="250" y1="200" x2="1000" y2="220" stroke="#D9E5E1" strokeWidth="3" />
              <line x1="300" y1="400" x2="1100" y2="400" stroke="#D9E5E1" strokeWidth="3" />
              <line x1="450" y1="0" x2="450" y2="600" stroke="#D9E5E1" strokeWidth="3" />
            </svg>

            {/* Area Landmarks */}
            <div className="absolute top-[28%] left-[62%] text-[10px] font-bold text-stone-500 uppercase tracking-widest pointer-events-none">
              Begumpet
            </div>
            <div className="absolute top-[42%] left-[40%] text-[10px] font-bold text-stone-500 uppercase tracking-widest pointer-events-none">
              Jubilee Hills
            </div>
            <div className="absolute top-[55%] left-[45%] text-[10px] font-bold text-stone-500 uppercase tracking-widest pointer-events-none">
              Banjara Hills
            </div>
            <div className="absolute top-[40%] left-[16%] text-[10px] font-bold text-stone-500 uppercase tracking-widest pointer-events-none">
              Gachibowli / Hitec
            </div>
          </div>

          {/* Interactive Pins */}
          {markers.map((pin) => {
            const isSelected = selectedListing?.id === pin.id;
            const isCareHub = pin.type === 'CareHub' || pin.type === 'NGO';

            return (
              <div
                key={pin.id}
                style={{ top: pin.y, left: pin.x }}
                onClick={() => {
                  const match = listings.find((l) => l.id === pin.id);
                  if (match) setSelectedListing(match);
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform duration-200 hover:scale-110 ${
                  isSelected ? 'scale-115 z-20' : ''
                }`}
              >
                <div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full shadow-lg border-2 font-display text-xs font-bold whitespace-nowrap transition-all ${
                    isCareHub
                      ? 'bg-teal-700 text-white border-white'
                      : isSelected
                      ? 'bg-[#FF5D38] text-white border-white shadow-[#FF5D38]/40 ring-4 ring-[#FF5D38]/20'
                      : 'bg-[#14382F] text-white border-white hover:bg-[#FF5D38]'
                  }`}
                >
                  {isCareHub ? (
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-200" />
                  ) : (
                    <Store className="w-3.5 h-3.5 text-amber-200" />
                  )}
                  <span>{pin.label}</span>
                  <span className="text-[10px] opacity-80 font-normal">({pin.count})</span>
                </div>
              </div>
            );
          })}

          {/* Floating Live Card Preview (Bottom Left) */}
          {selectedListing && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-stone-200/90 z-20 animate-fade-in">
              <div className="flex gap-3">
                <img
                  src={selectedListing.image}
                  alt={selectedListing.item}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold text-[#16423C] truncate">{selectedListing.businessName}</span>
                    <span className="text-[#FF5D38] font-bold">{selectedListing.discountPercentage}% OFF</span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-stone-900 truncate mt-0.5">
                    {selectedListing.item}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-display font-black text-base text-[#14382F]">
                      ₹{selectedListing.rescuePrice}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      ₹{selectedListing.originalPrice}
                    </span>
                    <span className="text-[11px] text-amber-700 font-medium">
                      ({selectedListing.quantityRemaining} left)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-[#FF5D38]" />
                  {selectedListing.distanceKm} km away • Banjara / Begumpet
                </span>
                <button
                  onClick={() => navigateTo(`/listing/${selectedListing.id}`)}
                  className="px-3 py-1.5 rounded-lg bg-[#FF5D38] text-white text-xs font-display font-bold hover:bg-[#E44824] transition-colors"
                >
                  Rescue Now
                </button>
              </div>
            </div>
          )}

          {/* Map Legend Overlay */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs p-2.5 rounded-xl border border-stone-200 shadow-xs hidden sm:flex flex-col gap-1.5 text-[11px] z-10">
            <span className="font-bold text-stone-600 uppercase text-[10px]">Map Legend</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14382F]"></span>
              <span>Commercial Kitchen Drops</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5D38]"></span>
              <span>Urgent Countdown</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-700"></span>
              <span>Partner Care Hub Shelters</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
