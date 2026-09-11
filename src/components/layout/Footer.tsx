import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';
import { Send, ShieldCheck, Heart, Leaf, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, addToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    addToast({
      type: 'success',
      title: 'Welcome to SAARADHI Network! 🌿',
      message: 'You will receive real-time evening surplus drop alerts in Hyderabad.'
    });
    setEmail('');
  };

  return (
    <footer className="bg-[#0D261F] text-stone-300 pt-16 pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          <div className="lg:col-span-5 space-y-4">
            <Logo size="lg" showTagline inverted />
            <p className="text-stone-400 text-sm max-w-md leading-relaxed mt-3">
              “What’s Left Shouldn’t Be Lost.” SAARADHI is the intelligent redistribution infrastructure transforming unavoidable food surplus into affordable meals, community donations, and zero landfill waste.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="#social-insta" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#social-linkedin" 
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#social-x" 
                aria-label="X Twitter"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white/5 rounded-2xl p-6 sm:p-8 border border-white/10">
            <h3 className="font-display font-bold text-lg text-white">
              Join the Hyderabad Rescue Network
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 leading-relaxed">
              Get notified the moment local bakeries, kitchens, and gourmet markets post discounted rescue drops near you.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email (e.g. foodsaver@saaradhi.in)"
                className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[#FF5D38] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#FF5D38] hover:bg-[#E44824] text-white font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 shrink-0"
              >
                <span>Join Network</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Middle Navigation Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs sm:text-sm">
          
          <div>
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-xs mb-3">
              Discover
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => navigateTo('/marketplace')} className="hover:text-white transition-colors">
                  Find Food Drops
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/marketplace')} className="hover:text-white transition-colors">
                  Live Countdown Drops
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/map')} className="hover:text-white transition-colors">
                  Hyderabad Rescue Map
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/#how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-xs mb-3">
              Businesses
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => navigateTo('/listings/new')} className="hover:text-white transition-colors">
                  List Surplus Food
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/dashboard/business')} className="hover:text-white transition-colors">
                  Business Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/insights')} className="hover:text-white transition-colors">
                  AI Waste Predictions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/reports')} className="hover:text-white transition-colors">
                  Business Model & Plans
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-xs mb-3">
              Community
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => navigateTo('/care-hub')} className="hover:text-white transition-colors">
                  Care Hub Portal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/rider')} className="hover:text-white transition-colors">
                  Rider Fleet Network
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/dashboard/customer')} className="hover:text-white transition-colors">
                  Live Order Tracker
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/reports')} className="hover:text-white transition-colors">
                  Impact Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/#decision-engine')} className="hover:text-white transition-colors">
                  AI Decision Engine
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-xs mb-3">
              Governance & Safety
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button onClick={() => navigateTo('/admin')} className="hover:text-white transition-colors">
                  Operations & Admin
                </button>
              </li>
              <li>
                <span className="text-stone-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  FSSAI Hygiene Standards
                </span>
              </li>
              <li>
                <span className="text-stone-400">Transparent Platform Fee (10%)</span>
              </li>
              <li>
                <span className="text-stone-400">Zero Landfill Commitment</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Safety Disclaimer & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          
          <div className="flex items-center gap-2 text-stone-400 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Food Safety Note:</strong> Food safety and hygienic packaging remain the verified responsibility of registered partner businesses. SAARADHI AI provides operational decisioning, NGO matching, and logistics coordination.
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span>© 2026 SAARADHI. Every Surplus Has a Destination.</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
