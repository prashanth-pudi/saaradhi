import React from 'react';
import { User, Store, HeartHandshake, Bike, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UserEcosystem: React.FC = () => {
  const { navigateTo, setCurrentRole } = useApp();

  const cards = [
    {
      role: 'customer' as const,
      tag: 'For Conscious Eaters',
      title: 'Customers',
      subtitle: 'Browse • Reserve • Pickup • Save',
      desc: 'Discover delicious meals and bakery boxes from top Hyderabad eateries at 50–65% off.',
      icon: User,
      cta: 'Explore Marketplace',
      route: '/marketplace',
      accentColor: 'border-emerald-200 bg-white hover:border-emerald-400'
    },
    {
      role: 'business' as const,
      tag: 'For Kitchens & Stores',
      title: 'Businesses',
      subtitle: 'List • Price • Sell • Donate • Analyze',
      desc: 'Turn unserved end-of-day surplus into recovered cashflow, tax-compliant donations, and zero landfill waste.',
      icon: Store,
      cta: 'Open Business Portal',
      route: '/dashboard/business',
      accentColor: 'border-amber-200 bg-white hover:border-amber-400'
    },
    {
      role: 'care_hub' as const,
      tag: 'For Verified Shelters',
      title: 'Care Hubs',
      subtitle: 'Set Needs • Accept • Coordinate • Confirm',
      desc: 'Receive automated, high-urgency notifications for edible hot meals tailored to your shelter capacity.',
      icon: HeartHandshake,
      cta: 'View Care Hub Matches',
      route: '/care-hub',
      accentColor: 'border-teal-200 bg-white hover:border-teal-400'
    },
    {
      role: 'rider' as const,
      tag: 'For Food Rescuers',
      title: 'Riders',
      subtitle: 'Accept • Pickup • Deliver • Verify',
      desc: 'Be the vital link that transports surplus from commercial kitchens to Care Hub shelters across Hyderabad.',
      icon: Bike,
      cta: 'View Rider Tasks',
      route: '/rider',
      accentColor: 'border-coral-200 bg-white hover:border-[#FF5D38]'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-display font-bold uppercase tracking-wider text-[#FF5D38] block mb-1">
            Collaborative Impact
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0F2922] tracking-tight">
            One Network. Four Ways to Rescue.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Eliminating food waste requires a coordinated ecosystem. Every participant has dedicated tools built for speed and accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c) => {
            const IconComp = c.icon;
            return (
              <div
                key={c.title}
                className={`rounded-2xl p-6 border shadow-2xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between ${c.accentColor}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#14382F] text-white flex items-center justify-center">
                      <IconComp className="w-6 h-6 text-[#FF5D38]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      {c.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl text-[#0F2922]">
                    {c.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#2E7D5E] mt-0.5 mb-2">
                    {c.subtitle}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {c.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <button
                    onClick={() => {
                      setCurrentRole(c.role);
                      navigateTo(c.route);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-[#14382F] hover:text-white bg-stone-100 hover:bg-[#14382F] transition-colors flex items-center justify-center gap-1.5 group"
                  >
                    <span>{c.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
