import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AvailableFoodsMarquee } from '../components/home/AvailableFoodsMarquee';
import { QuickNavigationHub } from '../components/home/QuickNavigationHub';
import { TrustedPartners } from '../components/home/TrustedPartners';
import { LiveRescueDrops } from '../components/home/LiveRescueDrops';
import { ValueStrip } from '../components/home/ValueStrip';
import { HowItWorks } from '../components/home/HowItWorks';
import { AiDecisionEngine } from '../components/home/AiDecisionEngine';
import { UserEcosystem } from '../components/home/UserEcosystem';
import { ImpactSection } from '../components/home/ImpactSection';
import { AiInsightsSection } from '../components/home/AiInsightsSection';
import { NgoVolunteerFlow } from '../components/home/NgoVolunteerFlow';
import { RescueMapPreview } from '../components/home/RescueMapPreview';
import { FinalCta } from '../components/home/FinalCta';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <QuickNavigationHub />
      <TrustedPartners />
      <LiveRescueDrops />
      <ValueStrip />
      <HowItWorks />
      <AiDecisionEngine />
      <UserEcosystem />
      <ImpactSection />
      <AiInsightsSection />
      <NgoVolunteerFlow />
      <RescueMapPreview />
      <FinalCta />
    </div>
  );
};
