import React from 'react';
import { Heart, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { FoodListing } from '../../types';
import { CountdownTimer } from './CountdownTimer';
import { useApp } from '../../context/AppContext';

interface FoodCardProps {
  listing: FoodListing;
  onReserveClick?: (listing: FoodListing) => void;
  compact?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({ listing, onReserveClick, compact = false }) => {
  const { toggleFavorite, isFavorite, navigateTo } = useApp();
  const favorited = isFavorite(listing.id);

  const handleCardClick = () => {
    navigateTo(`/listing/${listing.id}`);
  };

  const handleRescueBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onReserveClick) {
      onReserveClick(listing);
    } else {
      navigateTo(`/listing/${listing.id}`);
    }
  };

  const handleFavBtn = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(listing.id);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 overflow-hidden flex flex-col cursor-pointer"
    >
      {/* Top Image Section */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <img 
          src={listing.image} 
          alt={listing.item}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          {/* Discount Badge */}
          <span className="bg-[#FF5D38] text-white font-display font-bold text-xs px-2.5 py-1 rounded-full shadow-sm tracking-wide">
            {listing.discountPercentage}% OFF
          </span>

          {/* Vegetarian Badge */}
          {listing.isVegetarian && (
            <span className="bg-white/90 backdrop-blur-xs text-[#1E3A34] text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Veg
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={handleFavBtn}
          aria-label={favorited ? 'Remove from saved' : 'Save this food'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 z-10 ${
            favorited 
              ? 'bg-white text-[#FF5D38] shadow-md' 
              : 'bg-black/35 text-white hover:bg-white hover:text-[#FF5D38]'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Bottom Bar inside image: Distance & Countdown */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1 text-white text-xs font-medium bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <MapPin className="w-3 h-3 text-[#FF5D38]" />
            <span>{listing.distanceKm} km</span>
          </div>

          <CountdownTimer initialMinutes={listing.minutesRemaining} size="sm" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Business & Area */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-medium truncate max-w-[70%] text-[#16423C]">
              {listing.businessName}
            </span>
            <span className="text-stone-400">{listing.businessArea}</span>
          </div>

          {/* Food Title */}
          <h3 className="font-display font-bold text-stone-900 text-base leading-snug group-hover:text-[#16423C] transition-colors line-clamp-1">
            {listing.item}
          </h3>

          {!compact && (
            <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
              {listing.description}
            </p>
          )}
        </div>

        {/* Pricing, Quantity & Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-end justify-between gap-2">
          {/* Prices */}
          <div>
            <div className="text-[11px] text-stone-400 font-medium">
              Orig. <span className="line-through">₹{listing.originalPrice}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-display font-extrabold text-[#16423C]">
                ₹{listing.rescuePrice}
              </span>
              <span className="text-[11px] font-semibold text-[#FF5D38] bg-[#FF5D38]/10 px-1.5 py-0.2 rounded">
                Save ₹{listing.originalPrice - listing.rescuePrice}
              </span>
            </div>
            <div className="text-[11px] text-amber-700 font-medium mt-0.5">
              Only <span className="font-bold">{listing.quantityRemaining} left</span>
            </div>
          </div>

          {/* Rescue CTA Button */}
          <button
            type="button"
            onClick={handleRescueBtn}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#FF5D38] hover:bg-[#E44824] shadow-xs hover:shadow transition-all active:scale-95 shrink-0"
          >
            <span>Rescue Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
