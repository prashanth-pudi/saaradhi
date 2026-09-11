import React from 'react';
import { useApp } from '@/context/AppContext';
import { GlassButton } from '@/components/ui/GlassButton';
import { ArrowRight, Flame, Clock, Sparkles } from 'lucide-react';

export interface AvailableFoodItem {
  id: string;
  displayTitle: string; // e.g., "🍛 50 Meals - Rice & Curry"
  venue: string;
  area: string;
  originalPrice: number;
  rescuePrice: number;
  timeLeft: string;
  diet: 'veg' | 'non-veg' | 'bakery' | 'fresh';
  urgent?: boolean;
}

export const AVAILABLE_FOODS: AvailableFoodItem[] = [
  {
    id: 'food-1',
    displayTitle: '🍛 50 Meals - Rice & Curry',
    venue: 'Paradise Heritage',
    area: 'Secunderabad',
    originalPrice: 220,
    rescuePrice: 79,
    timeLeft: '1h 15m left',
    diet: 'non-veg',
    urgent: true,
  },
  {
    id: 'food-2',
    displayTitle: '🍎 20kg Fresh Fruits',
    venue: 'Ratnadeep Supermarket',
    area: 'Banjara Hills',
    originalPrice: 180,
    rescuePrice: 60,
    timeLeft: '2h left',
    diet: 'fresh',
  },
  {
    id: 'food-3',
    displayTitle: '🍞 100 Bread Loaves',
    venue: 'Karachi Bakery',
    area: 'Mozamjahi Market',
    originalPrice: 90,
    rescuePrice: 35,
    timeLeft: '45m left',
    diet: 'bakery',
    urgent: true,
  },
  {
    id: 'food-4',
    displayTitle: '🍲 40 Portions - Dal Tadka & Roti',
    venue: 'Chutneys Kitchen',
    area: 'Jubilee Hills',
    originalPrice: 180,
    rescuePrice: 59,
    timeLeft: '1h 30m left',
    diet: 'veg',
  },
  {
    id: 'food-5',
    displayTitle: '🥗 25 Bowls - Fresh Garden Salad',
    venue: 'Subway & Fresh Bowls',
    area: 'Hitec City',
    originalPrice: 240,
    rescuePrice: 85,
    timeLeft: '1h left',
    diet: 'veg',
  },
  {
    id: 'food-6',
    displayTitle: '🧁 35 Boxes - Assorted Pastries',
    venue: 'Concu Patisserie',
    area: 'Madhapur',
    originalPrice: 320,
    rescuePrice: 110,
    timeLeft: '35m left',
    diet: 'bakery',
    urgent: true,
  },
  {
    id: 'food-7',
    displayTitle: '🍱 60 Thalis - South Indian Meals',
    venue: 'Kakatiya Deluxe Mess',
    area: 'Ameerpet',
    originalPrice: 160,
    rescuePrice: 49,
    timeLeft: '50m left',
    diet: 'veg',
    urgent: true,
  },
  {
    id: 'food-8',
    displayTitle: '🍕 25 Pizzas - Artisanal Slices',
    venue: 'Little Italy Pizzeria',
    area: 'Film Nagar',
    originalPrice: 350,
    rescuePrice: 120,
    timeLeft: '1h 10m left',
    diet: 'veg',
  },
  {
    id: 'food-9',
    displayTitle: '🥛 30 Litres - Farm Fresh Dairy',
    venue: 'Heritage Parlour',
    area: 'Gachibowli',
    originalPrice: 95,
    rescuePrice: 40,
    timeLeft: '1h 45m left',
    diet: 'fresh',
  },
  {
    id: 'food-10',
    displayTitle: '🥪 45 Packs - Grilled Sandwiches',
    venue: 'Cafe Niloufer',
    area: 'Lakdikapul',
    originalPrice: 140,
    rescuePrice: 50,
    timeLeft: '40m left',
    diet: 'veg',
    urgent: true,
  },
];

export const AvailableFoodsMarquee: React.FC = () => {
  const { navigateTo } = useApp();

  // Double the array for seamless infinite looping
  const marqueeItems = [...AVAILABLE_FOODS, ...AVAILABLE_FOODS];

  return (
    <section 
      id="available-foods-marquee"
      className="relative w-full py-6 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6]/60 to-[#FAF7F2] border-y border-stone-200/80 overflow-hidden select-none"
    >
      {/* Header bar / live radar badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
          </span>

          <span className="text-xs font-display font-extrabold uppercase tracking-wider text-[#14382F] flex items-center gap-1.5">
            <span>Available Foods</span>
            <span className="text-stone-400 font-normal">•</span>
            <span className="text-[#FF5D38] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready for Rescue Now</span>
            </span>
          </span>

          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200/80">
            Live Updates
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-stone-500 font-medium hidden sm:inline">
            Slide or hover to inspect live batches
          </span>

          <GlassButton
            variant="small"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5 text-[#FF5D38]" />}
            iconPosition="right"
            onClick={() => navigateTo('/marketplace')}
            className="text-xs font-bold font-display"
          >
            Explore All Surplus
          </GlassButton>
        </div>
      </div>

      {/* Marquee Track Container with gradient fade edges */}
      <div className="relative w-full overflow-hidden group">
        {/* Left Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent z-10" />
        
        {/* Right Fade Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent z-10" />

        {/* Scrolling Strip */}
        <div 
          className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused]"
          style={{
            animation: 'marquee 38s linear infinite',
          }}
        >
          {marqueeItems.map((item, index) => {
            const savings = Math.round(((item.originalPrice - item.rescuePrice) / item.originalPrice) * 100);

            return (
              <div
                key={`${item.id}-${index}`}
                onClick={() => navigateTo('/marketplace')}
                className="cursor-pointer group/card flex items-center gap-3.5 px-4 py-3 rounded-2xl backdrop-blur-md bg-white/80 hover:bg-white/95 border border-white/90 hover:border-white shadow-[0_4px_16px_rgba(20,56,47,0.06),0_1px_2px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_8px_24px_rgba(20,56,47,0.12),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Title and Badge */}
                <div className="flex flex-col min-w-[200px] max-w-[260px]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-display font-bold text-sm text-[#14382F] truncate group-hover/card:text-[#FF5D38] transition-colors">
                      {item.displayTitle}
                    </span>

                    {item.urgent && (
                      <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-extrabold bg-red-100 text-red-700 border border-red-200">
                        <Flame className="w-2.5 h-2.5" />
                        Urgent
                      </span>
                    )}
                  </div>

                  {/* Venue & Location */}
                  <div className="text-[11px] text-stone-500 font-medium truncate flex items-center gap-1.5">
                    <span className="truncate">{item.venue}</span>
                    <span className="text-stone-300">•</span>
                    <span className="text-stone-400 shrink-0">{item.area}</span>
                  </div>

                  {/* Price & Time Pill Row */}
                  <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-stone-100 text-xs">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-extrabold text-[#14382F]">
                        ₹{item.rescuePrice}
                      </span>
                      <span className="text-[10px] text-stone-400 line-through">
                        ₹{item.originalPrice}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                        -{savings}%
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-800 bg-amber-50/80 px-1.5 py-0.5 rounded-md">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{item.timeLeft}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="hidden group-hover/card:flex w-7 h-7 rounded-full bg-[#14382F] text-white items-center justify-center shrink-0 shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AvailableFoodsMarquee;
