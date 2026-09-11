import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MetalButton } from '@/components/ui/metal-button';
import { 
  ShoppingBag, 
  Store, 
  HeartHandshake, 
  Bike, 
  MapPin, 
  BarChart3, 
  Sparkles, 
  ArrowRight, 
  HelpCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Flame
} from 'lucide-react';

export const QuickNavigationHub: React.FC = () => {
  const { navigateTo, listings, donations, volunteerTasks, triggerFlashRescue } = useApp();
  const [activeInfoTab, setActiveInfoTab] = useState<'all' | 'customer' | 'business' | 'ngo' | 'volunteer'>('all');

  const hubs = [
    {
      id: 'customer',
      roleKey: 'customer',
      title: '1. ఆహారం కొనండి / Find Cheap Meals',
      badge: `${listings.length} Live Drops Near You`,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      tagline: 'Save 40% to 75% on fresh surplus food from top Hyderabad eateries',
      description: 'Bakeries and restaurants list surplus portions at steep discounts before closing. Reserve, get a digital pickup code, and collect fresh food.',
      icon: ShoppingBag,
      iconBg: 'bg-emerald-50 text-emerald-700',
      actionText: 'Explore Food Marketplace',
      route: '/marketplace',
      preset: 'chromatic' as const,
      popularItems: ['Paradise Hyderabadi Dum Biryani ₹149', 'Concu Bakery Surprise Box ₹180', 'Karachi Assorted Cookies ₹120'],
      stats: 'Avg ₹180 saved per order'
    },
    {
      id: 'business',
      roleKey: 'business',
      title: '2. వ్యాపారులు / Restaurants & Bakeries',
      badge: 'Recover 35% Costs',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      tagline: 'Turn unavoidable surplus into revenue or verified tax-deductible CSR donations',
      description: 'Our AI engine recommends whether your leftover food should be discounted for rapid customer pickup or matched to a nearby hunger relief shelter.',
      icon: Store,
      iconBg: 'bg-amber-50 text-amber-700',
      actionText: 'List Surplus Batch (60s)',
      route: '/listings/new',
      preset: 'gold' as const,
      popularItems: ['Smart AI Expiry Pricing', 'FSSAI Hygiene Temperature Log', 'Automated Courier Dispatch'],
      stats: 'Takes only 60 seconds'
    },
    {
      id: 'care-hub',
      roleKey: 'care_hub',
      title: '3. ఆశ్రమాలు & Care Hubs / Free Shelter Meals',
      badge: `${donations.length} Free Batches Available`,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      tagline: 'Verified Care Hub feeding shelters receive free hot meals matched automatically by AI',
      description: 'Akshaya Care Hub, Robin Hood Army, and orphanages get instant alerts when bulk food is ready. One-tap acceptance with 80G tax receipts generated.',
      icon: HeartHandshake,
      iconBg: 'bg-emerald-50 text-emerald-700',
      actionText: 'Open Care Hub Portal',
      route: '/care-hub',
      preset: 'silver' as const,
      popularItems: ['100% Free Food Deliveries', 'Automated 80G Tax Certificates', 'Thermal Safe Food Monitoring'],
      stats: '1,420+ meals distributed this week'
    },
    {
      id: 'rider',
      roleKey: 'rider',
      title: '4. రైడర్లు / Rider Delivery Heroes',
      badge: `${volunteerTasks.length} Active Dispatch Tasks`,
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
      tagline: 'Deliver meals from kitchens to Care Hub shelters within 25 mins and earn Karma Points & Bonuses',
      description: 'Use your two-wheeler or bicycle to bridge the final mile between donor restaurants and hungry communities. Compete on the city leaderboard!',
      icon: Bike,
      iconBg: 'bg-orange-50 text-[#FF5D38]',
      actionText: 'Open Rider Dispatch',
      route: '/rider',
      preset: 'chromatic' as const,
      popularItems: ['Turn 20 free mins into meals', 'Earn Karma Leaderboard Badges', 'Optimized Route Navigation'],
      stats: 'Avg delivery under 22 mins'
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-stone-200" id="quick-guide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with clear Telugu + English guidance */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE9] text-[#14382F] text-xs font-display font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>వెబ్‌సైట్ గైడ్ • Easy 4-Way Portal Navigation</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#0F2922] tracking-tight">
            మీరు ఏమి చేయాలనుకుంటున్నారు? <br />
            <span className="text-[#FF5D38]">What Would You Like to Do?</span>
          </h2>
          
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            SAARADHI అనేది హైదరాబాద్ లోని మిగులు ఆహారాన్ని వృధా కాకుండా అవసరమైన వారికి చేర్చే AI ప్లాట్‌ఫారమ్. 
            కింద ఉన్న 4 విభాగాలలో మీకు కావలసినదాన్ని సులభంగా ఎంచుకోండి:
          </p>
        </div>

        {/* 4 Interactive Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {hubs.map((hub) => {
            const Icon = hub.icon;
            return (
              <div 
                key={hub.id}
                className="rounded-3xl border border-stone-200 bg-[#FAF7F2] p-6 hover:shadow-xl hover:border-stone-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`p-3 rounded-2xl ${hub.iconBg} shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${hub.badgeColor}`}>
                      {hub.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-black text-lg text-[#0F2922] group-hover:text-[#FF5D38] transition-colors leading-tight">
                    {hub.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-[#14382F] mt-1.5 leading-snug">
                    {hub.tagline}
                  </p>

                  <p className="text-xs text-stone-600 mt-2.5 leading-relaxed">
                    {hub.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="mt-4 pt-3 border-t border-stone-200/80 space-y-1.5">
                    {hub.popularItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-stone-600">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action with MetalButton */}
                <div className="mt-6 pt-3">
                  <div className="text-[10px] text-stone-500 font-medium mb-2 flex items-center justify-between">
                    <span>{hub.stats}</span>
                    <span className="text-[#FF5D38] font-bold">1-Click</span>
                  </div>

                  <MetalButton
                    preset={hub.preset}
                    size="sm"
                    className="w-full text-xs font-bold font-display"
                    wrapperClassName="w-full"
                    onClick={() => navigateTo(hub.route)}
                  >
                    <span>{hub.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </MetalButton>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Utilities Pill Strip: Map, Analytics, Emergency, Demos */}
        <div className="bg-[#FAF7F2] rounded-2xl border border-stone-200 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14382F] text-white flex items-center justify-center shrink-0">
              <SlidersHorizontal className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-[#0F2922]">
                Quick Utility Shortcuts & Direct Views
              </h4>
              <p className="text-xs text-stone-500">
                Jump directly to live city mapping, ESG carbon reports, or trigger citywide emergency simulations.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => navigateTo('/map')}
              className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:border-[#14382F] text-xs font-bold font-display text-stone-800 flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FF5D38]" />
              <span>Hyderabad Live Map</span>
            </button>

            <button
              onClick={() => navigateTo('/reports')}
              className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:border-[#14382F] text-xs font-bold font-display text-stone-800 flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs"
            >
              <BarChart3 className="w-3.5 h-3.5 text-teal-700" />
              <span>ESG Impact Insights</span>
            </button>

            <button
              onClick={() => triggerFlashRescue()}
              className="px-3.5 py-2 rounded-xl bg-[#FF5D38] hover:bg-[#E44824] text-xs font-bold font-display text-white flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Trigger Flash Siren</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
