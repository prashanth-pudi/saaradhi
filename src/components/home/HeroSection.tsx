import React from 'react';
import { ArrowRight, Sparkles, Clock, TrendingUp, HeartHandshake, ShieldCheck, Leaf, HelpCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MetalButton } from '@/components/ui/metal-button';

export const HeroSection: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <section className="relative overflow-hidden pt-4 pb-16 lg:py-20 bg-[#FAF7F2]">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E8EFE9]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#FF5D38]/5 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh]">
          
          {/* LEFT COLUMN: Emotional Storytelling & Hierarchy */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Supporting Eyebrow Statement */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8EFE9] border border-[#14382F]/10">
              <Leaf className="w-3.5 h-3.5 text-[#2E7D5E]" />
              <span className="text-[11px] sm:text-xs font-display font-bold uppercase tracking-wider text-[#14382F]">
                Good Food • Stronger Communities • A Greener Tomorrow
              </span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#0F2922] tracking-tight leading-[1.08]">
              Good Food Deserves <br />
              <span className="text-[#FF5D38] relative inline-block">
                a Better Ending
                {/* Subtle hand-drawn aesthetic underline */}
                <svg 
                  className="absolute -bottom-2 left-0 w-full text-[#FF5D38]/30 overflow-visible" 
                  viewBox="0 0 260 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 9C60 2.5 180 2.5 257 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#1E3A34] max-w-xl font-normal leading-relaxed">
              “Because the end of a sale shouldn’t have to mean the end of a meal.” ❤️
              <span className="block text-stone-600 text-sm sm:text-base mt-2">
                SAARADHI connects Hyderabad’s favorite bakeries, restaurants, and grocers to conscious eaters and verified Care Hub kitchens before surplus is lost.
              </span>
            </p>

            {/* CTAs with MetalButton & Standard Quick Jump */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <MetalButton
                preset="chromatic"
                size="lg"
                onClick={() => navigateTo('/marketplace')}
              >
                <Sparkles className="w-4 h-4 text-emerald-600 mr-1" />
                <span>Rescue Your Next Meal</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </MetalButton>

              <MetalButton
                preset="gold"
                size="lg"
                onClick={() => navigateTo('/listings/new')}
              >
                <span>List Food (Sell / Donate)</span>
              </MetalButton>

              <a
                href="#quick-guide"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-xs font-bold text-stone-700 hover:text-[#0F2922] bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                <HelpCircle className="w-4 h-4 text-[#FF5D38]" />
                <span>ఎక్కడ ఏముంది? / Site Guide</span>
              </a>
            </div>

            {/* Social Proof Line */}
            <div className="pt-4 border-t border-stone-200/80 flex items-center gap-4">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Food Saver"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Partner Chef"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                  alt="Rider Courier"
                />
                <div className="h-9 w-9 rounded-full bg-[#14382F] text-white ring-2 ring-white flex items-center justify-center text-[10px] font-bold">
                  +10k
                </div>
              </div>

              <div className="text-xs">
                <div className="font-bold text-[#0F2922] font-display">
                  Join 10,000+ food savers in Hyderabad
                </div>
                <div className="text-stone-500 text-[11px]">
                  Individuals • Businesses • Care Hubs • Riders
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Large Organic Food Composition & Floating Impact Cards */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Primary Visual Container */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 group">
              <img
                src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=1000&q=85"
                alt="Fresh wholesome food rescue assortment"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Rich warm vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F2922]/70 via-transparent to-black/10 pointer-events-none" />

              {/* Floating Leaf graphic overlay */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#FF5D38]"></span>
                <span className="text-xs font-bold text-[#0F2922] font-display">Fresh Rescue Drop Live</span>
              </div>

              {/* Bottom bar on image */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-300">
                  Hyderabad Surplus Network
                </span>
                <p className="text-sm font-display font-medium text-stone-100">
                  Rescuing delicious meals from premier cafés, bakeries & cloud kitchens.
                </p>
              </div>
            </div>

            {/* FLOATING CARD 1: 72+ Meals Rescued Today (Top Left) */}
            <div className="absolute -top-4 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-stone-200/80 flex items-center gap-3 transition-transform hover:scale-105 duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D5E]/15 text-[#2E7D5E] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-display font-extrabold text-[#0F2922]">
                  72+
                </div>
                <div className="text-[11px] text-stone-500 font-medium">
                  Meals Rescued Today
                </div>
              </div>
            </div>

            {/* FLOATING CARD 2: ₹4,820 Value Recovered Today (Bottom Right) */}
            <div className="absolute -bottom-5 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-stone-200/80 flex items-center gap-3 transition-transform hover:scale-105 duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#FF5D38]/15 text-[#FF5D38] flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-display font-extrabold text-[#0F2922]">
                  ₹4,820
                </div>
                <div className="text-[11px] text-stone-500 font-medium">
                  Value Recovered Today
                </div>
              </div>
            </div>

            {/* FLOATING CARD 3: 01h 24m Rescue Window Remaining (Middle Left) */}
            <div className="hidden sm:flex absolute top-1/2 -left-8 -translate-y-1/2 bg-[#0F2922] text-white rounded-2xl p-3 shadow-xl border border-white/10 items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FF5D38] text-white flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-amber-400">
                  01h 24m
                </div>
                <div className="text-[10px] text-stone-300 font-medium">
                  Rescue Window Left
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
