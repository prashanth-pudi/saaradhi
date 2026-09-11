import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { calculateAIDecision } from '../utils/aiDecisionEngine';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Store, 
  Clock, 
  HeartHandshake, 
  Tag, 
  Image as ImageIcon,
  CheckCircle2,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { FoodCategory, RescueMode } from '../types';

export const NewListingWizard: React.FC = () => {
  const { addListing, navigateTo, addToast } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form Fields
  const [foodItem, setFoodItem] = useState('Royal Dum Biryani & Pulao Pots');
  const [category, setCategory] = useState<FoodCategory>('Indian');
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [description, setDescription] = useState('Freshly prepared saffron dum biryani unserved from evening banquet rush. Maintained hot in thermal food containers.');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80');
  
  // Pricing & Quantity
  const [quantityTotal, setQuantityTotal] = useState<number>(72);
  const [originalPrice, setOriginalPrice] = useState<number>(320);
  const [rescuePrice, setRescuePrice] = useState<number>(139);

  // Pickup & Expiry
  const [pickupStart, setPickupStart] = useState('20:30');
  const [pickupEnd, setPickupEnd] = useState('22:00');
  const [minutesRemaining, setMinutesRemaining] = useState<number>(150); // 2.5 hrs

  // Mode & AI Recommendation
  const [selectedMode, setSelectedMode] = useState<RescueMode>('SELL');
  const [useAiRecommendation, setUseAiRecommendation] = useState<boolean>(true);

  // Live AI calculation
  const aiDecision = useMemo(() => {
    return calculateAIDecision({
      quantity: quantityTotal,
      minutesRemaining,
      historicalDemand: 'Medium',
      currentDemand: 'Strong',
      ngoNeedLevel: 'High',
      pickupAvailable: true,
      originalPrice
    });
  }, [quantityTotal, minutesRemaining, originalPrice]);

  const discountPercentage = Math.round(((originalPrice - rescuePrice) / originalPrice) * 100);

  const handlePublish = () => {
    addListing({
      businessId: 'b-2',
      businessName: 'Paradise Kitchens',
      businessArea: 'Begumpet',
      businessType: 'Restaurant',
      item: foodItem,
      description,
      category,
      image,
      originalPrice,
      rescuePrice,
      discountPercentage,
      quantityTotal,
      quantityRemaining: quantityTotal,
      mode: useAiRecommendation ? aiDecision.recommendedMode : selectedMode,
      isVegetarian,
      distanceKm: 1.2,
      pickupWindowStart: pickupStart,
      pickupWindowEnd: pickupEnd,
      expiresAt: new Date(Date.now() + minutesRemaining * 60 * 1000).toISOString(),
      minutesRemaining,
      pickupInstructions: 'Collect at the dedicated express dispatch counter with your 6-digit code.',
      tags: ['Chef Special', 'Evening Drop', 'Fresh Batch']
    });

    navigateTo('/dashboard/business');
  };

  return (
    <div className="py-8 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigateTo('/dashboard/business')}
            className="inline-flex items-center gap-1 text-xs font-display font-bold text-stone-500 hover:text-stone-900 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Business Dashboard</span>
          </button>
          <h1 className="font-display font-extrabold text-3xl text-[#0F2922] tracking-tight">
            Create Surplus Food Listing
          </h1>
          <p className="text-stone-600 text-sm mt-0.5">
            Turn tonight’s unserved surplus into recovered value and verified community impact.
          </p>
        </div>

        {/* Step Indicators */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs mb-8 flex items-center justify-between">
          {[
            { num: 1, label: 'Food Details' },
            { num: 2, label: 'Pricing & Batch' },
            { num: 3, label: 'Pickup Window' },
            { num: 4, label: 'AI Optimization' },
            { num: 5, label: 'Review & Publish' }
          ].map((s) => {
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-display ${
                    isDone
                      ? 'bg-[#14382F] text-white'
                      : isCurrent
                      ? 'bg-[#FF5D38] text-white shadow-sm ring-2 ring-[#FF5D38]/30'
                      : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {isDone ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className={`text-xs font-semibold hidden md:inline ${isCurrent ? 'text-[#0F2922]' : 'text-stone-400'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Forms */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          
          {/* STEP 1: Food Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl text-[#0F2922]">
                Step 1: Food Details & Packaging
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Food Item Name
                </label>
                <input
                  type="text"
                  value={foodItem}
                  onChange={(e) => setFoodItem(e.target.value)}
                  placeholder="e.g. Butter Croissant Box, Biryani Portions"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#FF5D38]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Food Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#FF5D38]"
                  >
                    <option value="Indian">Indian Meals</option>
                    <option value="Bakery">Bakery & Pastry</option>
                    <option value="Meals">Continental / Rice Bowls</option>
                    <option value="Snacks">Evening Snacks</option>
                    <option value="Vegetarian">Pure Vegetarian</option>
                    <option value="Groceries">Produce / Fresh Box</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-sm font-semibold text-stone-800">
                    <input
                      type="checkbox"
                      checked={isVegetarian}
                      onChange={(e) => setIsVegetarian(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    <span>100% Pure Vegetarian</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Description & Ingredients
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:bg-white focus:outline-none focus:border-[#FF5D38]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Food Photo URL (or select preset)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setImage('https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80')}
                    className="text-xs px-3 py-1 bg-stone-100 rounded-lg hover:bg-stone-200"
                  >
                    Bakery
                  </button>
                  <button
                    type="button"
                    onClick={() => setImage('https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80')}
                    className="text-xs px-3 py-1 bg-stone-100 rounded-lg hover:bg-stone-200"
                  >
                    Biryani
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Pricing & Batch */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl text-[#0F2922]">
                Step 2: Batch Size & Rescue Pricing
              </h2>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                💡 <strong>Dynamic Rescue Rule:</strong> Standard discounts of 50%–60% encourage 3x faster local customer pickups, recovering cashflow while avoiding zero-revenue landfill disposal.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Total Surplus Portions
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantityTotal}
                    onChange={(e) => setQuantityTotal(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-bold focus:outline-none focus:border-[#FF5D38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    min="10"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF5D38]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Rescue Price (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={rescuePrice}
                    onChange={(e) => setRescuePrice(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm font-bold text-[#FF5D38] focus:outline-none focus:border-[#FF5D38]"
                  />
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl text-xs flex items-center justify-between">
                <span>Calculated Consumer Discount:</span>
                <span className="font-bold text-emerald-700 text-sm">{discountPercentage}% OFF Menu Price</span>
              </div>
            </div>
          )}

          {/* STEP 3: Pickup & Expiry */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl text-[#0F2922]">
                Step 3: Pickup Windows & Expiry Safety
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Pickup Window Start
                  </label>
                  <input
                    type="time"
                    value={pickupStart}
                    onChange={(e) => setPickupStart(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Pickup Window End
                  </label>
                  <input
                    type="time"
                    value={pickupEnd}
                    onChange={(e) => setPickupEnd(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Remaining Safe Consumption Buffer (Minutes)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="30"
                    max="240"
                    step="15"
                    value={minutesRemaining}
                    onChange={(e) => setMinutesRemaining(Number(e.target.value))}
                    className="flex-1 accent-[#FF5D38]"
                  />
                  <span className="font-mono font-bold text-sm text-[#0F2922] w-24">
                    {Math.floor(minutesRemaining / 60)}h {minutesRemaining % 60}m
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: AI Destination Optimization (THE CORE DEMO) */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#FF5D38]" />
                  <h2 className="font-display font-extrabold text-xl text-[#0F2922]">
                    Step 4: AI Rescue Destination Breakdown
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800">
                  {aiDecision.confidence}% Confidence
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                Based on current Hyderabad evening footfall, {minutesRemaining}m window, and shelter demand from Akshaya Trust, SAARADHI recommends splitting your {quantityTotal} meals:
              </p>

              {/* AI Recommended Breakdown Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="text-2xl font-display font-black text-emerald-800">
                    {aiDecision.sellQty}
                  </div>
                  <div className="text-xs font-bold text-emerald-950 uppercase mt-1">
                    SELL
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">
                    Customer Rescue (₹{rescuePrice})
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                  <div className="text-2xl font-display font-black text-amber-800">
                    {aiDecision.discountQty}
                  </div>
                  <div className="text-xs font-bold text-amber-950 uppercase mt-1">
                    DISCOUNT
                  </div>
                  <div className="text-[11px] text-amber-700 mt-0.5">
                    Rapid Clearance (₹{Math.round(rescuePrice * 0.75)})
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-center">
                  <div className="text-2xl font-display font-black text-teal-800">
                    {aiDecision.donateQty}
                  </div>
                  <div className="text-xs font-bold text-teal-950 uppercase mt-1">
                    DONATE
                  </div>
                  <div className="text-[11px] text-teal-700 mt-0.5">
                    Akshaya Trust (Volunteer Route)
                  </div>
                </div>
              </div>

              {/* Operational Reasoning Quote */}
              <div className="p-4 rounded-2xl bg-[#0F2922] text-white text-xs space-y-1">
                <span className="text-[#FF5D38] font-bold uppercase tracking-wider text-[10px]">
                  Operational Decision Reason:
                </span>
                <p className="text-stone-300 italic leading-relaxed">
                  “{aiDecision.explanation}”
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="acceptAi"
                  checked={useAiRecommendation}
                  onChange={(e) => setUseAiRecommendation(e.target.checked)}
                  className="rounded text-[#FF5D38] focus:ring-[#FF5D38]"
                />
                <label htmlFor="acceptAi" className="text-xs font-medium text-stone-700 cursor-pointer">
                  Accept AI Auto-Balancing Strategy (Maximizes Revenue + Guaranteed Zero Waste)
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Confirm */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-xl text-[#0F2922]">
                Step 5: Review & Publish to SAARADHI Network
              </h2>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-500">Food Item:</span>
                  <span className="font-bold text-stone-900">{foodItem} ({category})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Total Portions:</span>
                  <span className="font-bold text-stone-900">{quantityTotal} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Pricing:</span>
                  <span>₹{rescuePrice} <span className="line-through text-stone-400">₹{originalPrice}</span> ({discountPercentage}% off)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Pickup Window:</span>
                  <span className="font-bold text-stone-900">{pickupStart} – {pickupEnd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Strategy:</span>
                  <span className="font-bold text-emerald-800">
                    {useAiRecommendation 
                      ? `${aiDecision.sellQty} Sell • ${aiDecision.discountQty} Discount • ${aiDecision.donateQty} Donate`
                      : 'Manual Single Mode'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Verified under Paradise Kitchens FSSAI license #13621011000492</span>
              </div>
            </div>
          )}

          {/* Navigation Controls between wizard steps */}
          <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl text-xs font-display font-bold text-stone-600 hover:bg-stone-100 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#FF5D38] hover:bg-[#E44824] shadow-xs flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePublish}
                className="px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 shadow-md flex items-center gap-2 active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Publish Listing Now</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
