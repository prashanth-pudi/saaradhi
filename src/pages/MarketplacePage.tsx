import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FoodCard } from '../components/common/FoodCard';
import { FoodListing, FoodCategory } from '../types';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  ArrowUpDown, 
  Sparkles, 
  Clock, 
  Tag, 
  Check,
  RotateCcw
} from 'lucide-react';
import { HYDERABAD_AREAS } from '../data/mockData';

export const MarketplacePage: React.FC = () => {
  const { listings, selectedArea, setSelectedArea, reserveFood } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [maxDistance, setMaxDistance] = useState<number>(5);
  const [sortBy, setSortBy] = useState<'ending_soon' | 'discount' | 'nearest' | 'price_low'>('ending_soon');

  const categories: string[] = [
    'All',
    'Bakery',
    'Meals',
    'Indian',
    'Snacks',
    'Groceries',
    'Desserts'
  ];

  const filteredListings = useMemo(() => {
    return listings
      .filter((item) => {
        // Area filter
        if (selectedArea !== 'All Hyderabad' && item.businessArea !== selectedArea) {
          return false;
        }

        // Search query
        if (search.trim()) {
          const q = search.toLowerCase();
          const matches = 
            item.item.toLowerCase().includes(q) || 
            item.businessName.toLowerCase().includes(q) ||
            item.businessArea.toLowerCase().includes(q) ||
            item.tags.some(t => t.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && item.category !== selectedCategory) {
          return false;
        }

        // Vegetarian filter
        if (vegetarianOnly && !item.isVegetarian) {
          return false;
        }

        // Distance filter
        if (item.distanceKm > maxDistance) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'ending_soon') return a.minutesRemaining - b.minutesRemaining;
        if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
        if (sortBy === 'nearest') return a.distanceKm - b.distanceKm;
        if (sortBy === 'price_low') return a.rescuePrice - b.rescuePrice;
        return 0;
      });
  }, [listings, selectedArea, search, selectedCategory, vegetarianOnly, maxDistance, sortBy]);

  const resetAllFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setVegetarianOnly(false);
    setMaxDistance(5);
    setSortBy('ending_soon');
    setSelectedArea('All Hyderabad');
  };

  return (
    <div className="py-8 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#0F2922] font-semibold">Food Marketplace</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2922] tracking-tight">
            Find Good Food Before It’s Lost
          </h1>
          <p className="text-stone-600 text-sm mt-1">
            Freshly prepared surplus from top Hyderabad restaurants & bakeries, discounted 50%–65%.
          </p>
        </div>

        {/* Top Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs mb-8 space-y-3">
          
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search food name, bakery, biryani, or cafe..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-[#FF5D38] focus:bg-white transition-colors"
              />
            </div>

            {/* Location Selector */}
            <div className="sm:col-span-3">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-[#FF5D38] transition-colors"
              >
                {HYDERABAD_AREAS.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="sm:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-[#FF5D38] transition-colors"
              >
                <option value="ending_soon">⏱️ Ending Soonest</option>
                <option value="discount">🔥 Best Discount %</option>
                <option value="nearest">📍 Nearest Distance</option>
                <option value="price_low">💰 Lowest Price</option>
              </select>
            </div>
          </div>

          {/* Filter Pills & Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#14382F] text-white'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Veg Toggle & Distance Slider */}
            <div className="flex items-center gap-4 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer select-none font-medium text-stone-700">
                <input
                  type="checkbox"
                  checked={vegetarianOnly}
                  onChange={(e) => setVegetarianOnly(e.target.checked)}
                  className="rounded text-[#2E7D5E] focus:ring-[#2E7D5E]"
                />
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Veg Only</span>
              </label>

              <div className="hidden md:flex items-center gap-2 text-stone-600">
                <span>Radius: {maxDistance} km</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-20 accent-[#FF5D38]"
                />
              </div>

              {(search || selectedCategory !== 'All' || vegetarianOnly || maxDistance < 5 || selectedArea !== 'All Hyderabad') && (
                <button
                  onClick={resetAllFilters}
                  className="text-stone-400 hover:text-[#FF5D38] flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Results Bar */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
          <span>Showing <strong>{filteredListings.length}</strong> rescue drops available right now in Hyderabad</span>
          <span className="text-emerald-700 font-medium">All food inspected for same-day freshness</span>
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <FoodCard
                key={listing.id}
                listing={listing}
                onReserveClick={(l) => reserveFood(l.id, 1)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto my-12">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-stone-900">
              No rescue drops nearby yet
            </h3>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              We’ll have something worth saving soon. Evening drops typically appear between 7:30 PM and 9:30 PM.
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-[#14382F] text-white text-xs font-display font-bold hover:bg-[#0D261F] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
