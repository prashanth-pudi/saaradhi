import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CountdownTimer } from '../components/common/CountdownTimer';
import { 
  MapPin, 
  Clock, 
  Heart, 
  Share2, 
  ShieldCheck, 
  ArrowLeft, 
  Store, 
  Check, 
  Sparkles, 
  AlertCircle, 
  ShoppingBag, 
  X,
  Navigation
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ListingDetailPageProps {
  listingId?: string;
}

export const ListingDetailPage: React.FC<ListingDetailPageProps> = ({ listingId }) => {
  const { listings, getListingById, reserveFood, toggleFavorite, isFavorite, navigateTo, currentRoute } = useApp();

  // Extract ID from prop or route path
  const targetId = listingId || currentRoute.replace('/listing/', '') || listings[0]?.id;
  const listing = getListingById(targetId) || listings[0];

  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);
  const [orderConfirmed, setOrderConfirmed] = useState<any>(null);

  if (!listing) {
    return (
      <div className="py-20 text-center">
        <p>Listing not found.</p>
        <button onClick={() => navigateTo('/marketplace')} className="mt-4 px-4 py-2 bg-[#14382F] text-white rounded-xl">
          Back to Marketplace
        </button>
      </div>
    );
  }

  const favorited = isFavorite(listing.id);
  const savings = (listing.originalPrice - listing.rescuePrice) * selectedQty;
  const itemSubtotal = listing.rescuePrice * selectedQty;
  const platformFee = Math.max(5, Math.round(itemSubtotal * 0.10));
  const totalAmount = itemSubtotal + platformFee;

  const handleConfirmReservation = () => {
    const newOrder = reserveFood(listing.id, selectedQty);
    setOrderConfirmed(newOrder);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="py-8 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigateTo('/marketplace')}
          className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-stone-600 hover:text-[#14382F] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Large Photo & Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-md bg-stone-100 border border-stone-200">
              <img
                src={listing.image}
                alt={listing.item}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-[#FF5D38] text-white font-display font-black text-sm px-3.5 py-1.5 rounded-full shadow-md">
                {listing.discountPercentage}% OFF
              </div>

              {/* Heart & Share */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite(listing.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-95 ${
                    favorited ? 'bg-white text-[#FF5D38] shadow-md' : 'bg-black/40 text-white hover:bg-white hover:text-[#FF5D38]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Bottom urgency badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <CountdownTimer initialMinutes={listing.minutesRemaining} size="md" />
                <span className="bg-black/60 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5D38]" />
                  {listing.distanceKm} km from you
                </span>
              </div>
            </div>

            {/* Food Details & Description */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 space-y-4 shadow-2xs">
              <h2 className="font-display font-bold text-lg text-[#0F2922]">
                About This Rescue Item
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                {listing.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {listing.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium bg-[#E8EFE9] text-[#14382F] px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
                {listing.isVegetarian && (
                  <span className="text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    100% Vegetarian
                  </span>
                )}
              </div>

              {/* Food safety & packaging disclaimer */}
              <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#14382F]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Freshness & FSSAI Standard Guarantee</span>
                </div>
                <p>
                  Prepared fresh today under verified hygienic commercial kitchen protocols. Food safety remains guaranteed by the partner business operator.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Pricing, Pickup Window & Reserve Action */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Reservation Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-6">
              
              {/* Business Name & Verification */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold uppercase tracking-wider">
                    <Store className="w-3.5 h-3.5" />
                    <span>{listing.businessType}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#0F2922]">
                    {listing.businessName}
                  </h3>
                  <p className="text-xs text-stone-400">{listing.businessArea}, Hyderabad</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>

              {/* Food Title */}
              <div>
                <h1 className="font-display font-extrabold text-2xl text-[#0F2922] leading-tight">
                  {listing.item}
                </h1>
              </div>

              {/* Pricing breakdown */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-stone-400 line-through">
                      ₹{listing.originalPrice}
                    </span>
                    <div className="text-3xl font-display font-black text-[#14382F]">
                      ₹{listing.rescuePrice}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-[#FF5D38]/15 text-[#FF5D38] text-xs font-bold font-display px-2.5 py-1 rounded-lg">
                      You save ₹{listing.originalPrice - listing.rescuePrice} ({listing.discountPercentage}% off)
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-amber-700 font-semibold flex items-center justify-between">
                  <span>Remaining in this batch:</span>
                  <span className="bg-amber-100 px-2 py-0.5 rounded font-bold">{listing.quantityRemaining} portions left</span>
                </div>
              </div>

              {/* Pickup Window */}
              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#E8EFE9]/60 border border-[#14382F]/10">
                  <div className="flex items-center gap-2 font-medium">
                    <Clock className="w-4 h-4 text-[#14382F]" />
                    <span>Pickup Window Today:</span>
                  </div>
                  <span className="font-display font-bold text-sm text-[#14382F]">
                    {listing.pickupWindowStart} – {listing.pickupWindowEnd}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                  <span className="font-bold text-stone-700 block mb-1">Pickup Instructions:</span>
                  <p className="text-stone-500 leading-relaxed">
                    {listing.pickupInstructions}
                  </p>
                </div>
              </div>

              {/* Reserve CTA */}
              <button
                type="button"
                disabled={listing.quantityRemaining === 0}
                onClick={() => setReserveModalOpen(true)}
                className={`w-full py-4 rounded-2xl font-display font-bold text-sm uppercase tracking-wider text-white shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 ${
                  listing.quantityRemaining === 0
                    ? 'bg-stone-300 cursor-not-allowed text-stone-500 shadow-none'
                    : 'bg-[#FF5D38] hover:bg-[#E44824] shadow-[#FF5D38]/25 hover:shadow-xl'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{listing.quantityRemaining === 0 ? 'Sold Out' : 'Reserve & Rescue This Meal'}</span>
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* CHECKOUT RESERVATION MODAL */}
      {reserveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-fade-in">
            
            <button
              onClick={() => {
                setReserveModalOpen(false);
                setOrderConfirmed(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            {!orderConfirmed ? (
              <div>
                <span className="text-xs font-display font-bold uppercase tracking-wider text-[#FF5D38] block mb-1">
                  Step 2: Confirm Reservation
                </span>
                <h3 className="font-display font-extrabold text-xl text-[#0F2922]">
                  Rescue Checkout Summary
                </h3>

                <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
                  <div className="flex justify-between font-medium">
                    <span className="text-stone-700">{listing.item}</span>
                    <span className="text-stone-900 font-bold">₹{listing.rescuePrice} each</span>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                    <span className="text-stone-600">Portions to Rescue:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                        className="w-7 h-7 rounded-lg bg-stone-200 hover:bg-stone-300 font-bold text-stone-800"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{selectedQty}</span>
                      <button
                        onClick={() => setSelectedQty(Math.min(listing.quantityRemaining, selectedQty + 1))}
                        className="w-7 h-7 rounded-lg bg-stone-200 hover:bg-stone-300 font-bold text-stone-800"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-stone-200 text-stone-600">
                    <span>Food Subtotal ({selectedQty}x):</span>
                    <span>₹{itemSubtotal}</span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span className="flex items-center gap-1">
                      <span>SAARADHI Platform Fee (10%):</span>
                    </span>
                    <span>₹{platformFee}</span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-stone-300 font-display font-extrabold text-base text-[#14382F]">
                    <span>Total Payable:</span>
                    <span>₹{totalAmount}</span>
                  </div>

                  <div className="text-[11px] text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg text-center">
                    🎉 You are saving ₹{savings} compared to standard restaurant menu prices!
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleConfirmReservation}
                    className="w-full py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-white bg-[#FF5D38] hover:bg-[#E44824] shadow-md transition-all active:scale-98"
                  >
                    Confirm & Reserve (₹{totalAmount})
                  </button>
                  <p className="text-[11px] text-stone-400 text-center mt-2">
                    Pay upon pickup or instant demo reservation. No cancellation fee.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>

                <h3 className="font-display font-extrabold text-2xl text-[#0F2922]">
                  RESCUE CONFIRMED!
                </h3>

                <p className="text-xs text-stone-600">
                  Your meal has been safely reserved at <strong>{listing.businessName}</strong>.
                </p>

                {/* Pickup Code Box */}
                <div className="bg-[#14382F] text-white p-5 rounded-2xl space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-300">
                    Your Digital Pickup Code
                  </span>
                  <div className="text-3xl font-mono font-black tracking-widest text-white">
                    {orderConfirmed.pickupCode}
                  </div>
                  <div className="text-xs text-stone-300 pt-1">
                    Pickup Deadline: <strong>{orderConfirmed.pickupDeadline}</strong>
                  </div>
                </div>

                <div className="text-xs text-stone-500 bg-stone-50 p-3 rounded-xl">
                  📍 {listing.businessName} • {listing.businessArea}, Hyderabad
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      setReserveModalOpen(false);
                      navigateTo(`/order-status/${orderConfirmed.id}`);
                    }}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-[#FF5D38] hover:bg-[#E44824] text-white text-xs font-display font-extrabold uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>🚀 Track Live Order Status</span>
                  </button>
                  <button
                    onClick={() => {
                      setReserveModalOpen(false);
                      navigateTo('/dashboard/customer');
                    }}
                    className="py-3.5 px-4 rounded-xl border border-stone-300 text-stone-700 text-xs font-display font-bold hover:bg-stone-50 transition-colors"
                  >
                    My Reservations
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
