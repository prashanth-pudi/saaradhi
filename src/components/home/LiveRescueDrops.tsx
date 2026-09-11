import React, { useState } from 'react';
import { ArrowRight, Sparkles, SlidersHorizontal, Flame, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FoodCard } from '../common/FoodCard';
import { FoodCategory } from '../../types';

export const LiveRescueDrops: React.FC = () => {
  const { listings, navigateTo, reserveFood } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterPills: string[] = [
    'All',
    'Bakery',
    'Meals',
    'Indian',
    'Snacks',
    'Groceries',
    'Vegetarian',
    'Nearby (< 1.5 km)'
  ];

  const filteredListings = listings.filter((item) => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        item.item.toLowerCase().includes(q) || 
        item.businessName.toLowerCase().includes(q) ||
        item.businessArea.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Category or special filters
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Vegetarian') return item.isVegetarian;
    if (selectedFilter === 'Nearby (< 1.5 km)') return item.distanceKm <= 1.5;
    return item.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <section id="live-drops" className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5D38] animate-pulse"></span>
              <span className="text-xs font-display font-bold uppercase tracking-wider text-[#FF5D38]">
                Real-Time Surplus Drops
              </span>
            </div>
            
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2922] tracking-tight">
                Live Rescue Drops
              </h2>
              {/* Handwritten-style visual note */}
              <span className="font-hand text-xl sm:text-2xl text-[#FF5D38] font-bold transform -rotate-3">
                Fresh deals every day nearby! ✨
              </span>
            </div>

            <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-xl leading-relaxed">
              Good food. Better prices. Rescue before the clock runs out.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/marketplace')}
              className="inline-flex items-center gap-1.5 font-display font-bold text-sm text-[#14382F] hover:text-[#FF5D38] transition-colors group"
            >
              <span>View All Drops ({listings.length})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Search & Filter Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-8">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 sm:pb-0 scrollbar-none">
            {filterPills.map((pill) => {
              const active = selectedFilter === pill;
              return (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setSelectedFilter(pill)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-[#14382F] text-white shadow-sm'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/80'
                  }`}
                >
                  {pill}
                </button>
              );
            })}
          </div>

          {/* Quick inline search */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search food, cafe, area..."
              className="w-full bg-white border border-stone-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FF5D38]"
            />
          </div>
        </div>

        {/* Food Grid: 4 cards across on desktop */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredListings.slice(0, 8).map((listing) => (
              <FoodCard
                key={listing.id}
                listing={listing}
                onReserveClick={(l) => {
                  reserveFood(l.id, 1);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 p-8">
            <p className="font-display font-bold text-lg text-stone-800">
              No rescue drops matching "{selectedFilter}"
            </p>
            <p className="text-sm text-stone-500 mt-1 max-w-md mx-auto">
              We’ll have something worth saving soon. Try resetting your filter or searching another area.
            </p>
            <button
              onClick={() => {
                setSelectedFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#14382F] text-white text-xs font-bold font-display hover:bg-[#0D261F] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
