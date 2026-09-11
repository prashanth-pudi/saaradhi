import React from 'react';
import { CTASection } from '@/components/ui/cta-with-rectangle';
import { MetalButton } from '@/components/ui/metal-button';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, HeartHandshake, Sparkles, ArrowRight, Store } from 'lucide-react';

export const FinalCta: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-[#FAF7F2] relative py-12">
      {/* Launch UI CTA Section with glowing rectangle */}
      <CTASection
        badge={{
          text: "Hyderabad Zero Food Waste Mission • FSSAI Certified"
        }}
        title="Ready to Save Fresh Food From Ending in a Bin?"
        description="Whether you are looking for an affordable gourmet dinner or managing a commercial kitchen with surplus portions, SAARADHI turns excess into community impact."
        action={{
          text: "Rescue Your Next Meal Now",
          href: "/marketplace",
          variant: "glow"
        }}
        withGlow={true}
        className="relative"
      />

      {/* Secondary Quick Action Bar with MetalButton */}
      <div className="max-w-3xl mx-auto px-4 -mt-6 sm:-mt-10 mb-12 flex flex-wrap items-center justify-center gap-4 relative z-10">
        <MetalButton 
          preset="gold" 
          size="md"
          onClick={() => navigateTo('/listings/new')}
        >
          <Store className="w-4 h-4 text-amber-700 mr-1" />
          <span>Kitchens: List Food Surplus</span>
        </MetalButton>

        <MetalButton 
          preset="chromatic" 
          size="md"
          onClick={() => navigateTo('/rider')}
        >
          <Sparkles className="w-4 h-4 text-emerald-600 mr-1" />
          <span>Riders: Deliver & Earn Karma</span>
        </MetalButton>

        <MetalButton 
          preset="silver" 
          size="md"
          onClick={() => navigateTo('/care-hub')}
        >
          <HeartHandshake className="w-4 h-4 text-[#FF5D38] mr-1" />
          <span>Care Hubs: Claim Free Surplus</span>
        </MetalButton>
      </div>

      {/* Trust guarantees */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500 font-medium">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          FSSAI Safety Compliance
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <HeartHandshake className="w-4 h-4 text-[#FF5D38]" />
          100% Tax Deductible 80G Receipts
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-600" />
          Average 60% Consumer Savings
        </span>
      </div>
    </div>
  );
};
