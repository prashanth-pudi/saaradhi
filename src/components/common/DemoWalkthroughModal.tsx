import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  CheckCircle2, 
  Zap, 
  X, 
  Sliders, 
  Store, 
  User, 
  HeartHandshake, 
  Bike, 
  BarChart3, 
  Sparkles 
} from 'lucide-react';

const DEMO_STEPS = [
  {
    step: 1,
    title: 'Surplus Detected at Restaurant',
    role: 'business' as const,
    route: '/dashboard/business',
    desc: 'Paradise Kitchens has 72 unserved biryani meals at 9:00 PM near closing.',
    icon: Store,
    badge: '1/15'
  },
  {
    step: 2,
    title: 'Business Surplus Listing Wizard',
    role: 'business' as const,
    route: '/listings/new',
    desc: 'Business owner enters 72 portions into SAARADHI Listing flow.',
    icon: Store,
    badge: '2/15'
  },
  {
    step: 3,
    title: 'AI Decision Engine Analysis',
    role: 'business' as const,
    route: '/listings/new',
    desc: 'AI evaluates time to expiry, local footfall, distance & NGO demand in Banjara/Begumpet.',
    icon: Sparkles,
    badge: '3/15'
  },
  {
    step: 4,
    title: 'AI Recommended Breakdown',
    role: 'business' as const,
    route: '/listings/new',
    desc: 'AI outputs: 40 SELL, 20 DISCOUNT, 12 DONATE with 92% confidence.',
    icon: Sparkles,
    badge: '4/15'
  },
  {
    step: 5,
    title: 'Customer Discovery on Marketplace',
    role: 'customer' as const,
    route: '/marketplace',
    desc: 'Customer in Hyderabad browses live rescue drops with 55-60% off original price.',
    icon: User,
    badge: '5/15'
  },
  {
    step: 6,
    title: 'Live Rescue Countdown',
    role: 'customer' as const,
    route: '/marketplace',
    desc: 'Live countdown shows urgency window (01h 24m remaining) before closing.',
    icon: User,
    badge: '6/15'
  },
  {
    step: 7,
    title: 'Customer Reserves Meal Box',
    role: 'customer' as const,
    route: '/dashboard/customer',
    desc: 'Instant checkout generates 6-digit pickup code SRD-4821 and updates remaining stock.',
    icon: User,
    badge: '7/15'
  },
  {
    step: 8,
    title: 'NGO Matched with 12 Meals',
    role: 'ngo' as const,
    route: '/ngo',
    desc: 'Akshaya Trust receives automated notification for 12 hot meals with 96% AI match score.',
    icon: HeartHandshake,
    badge: '8/15'
  },
  {
    step: 9,
    title: 'Care Hub Accepts Donation Batch',
    role: 'care_hub' as const,
    route: '/care-hub',
    desc: 'Care Hub shelter accepts batch and requests rider courier for immediate transport.',
    icon: HeartHandshake,
    badge: '9/15'
  },
  {
    step: 10,
    title: 'Rider Accepts Rescue Task',
    role: 'rider' as const,
    route: '/rider',
    desc: 'Rider Arjun accepts pickup from Begumpet to Banjara Hills (2.8 km route).',
    icon: Bike,
    badge: '10/15'
  },
  {
    step: 11,
    title: 'Rider Marks Picked Up',
    role: 'rider' as const,
    route: '/rider',
    desc: 'Food collected from restaurant dispatch. Cold/warm packaging verified.',
    icon: Bike,
    badge: '11/15'
  },
  {
    step: 12,
    title: 'Rider Delivers to Care Hub',
    role: 'rider' as const,
    route: '/rider',
    desc: 'Delivery arrived at Akshaya Care Hub shelter. Proof of delivery uploaded.',
    icon: Bike,
    badge: '12/15'
  },
  {
    step: 13,
    title: 'Care Hub Confirms Receipt & Impact',
    role: 'care_hub' as const,
    route: '/care-hub',
    desc: 'Care Hub validates 12 meals received for evening dinner distribution.',
    icon: HeartHandshake,
    badge: '13/15'
  },
  {
    step: 14,
    title: 'Real-Time Impact Dashboard',
    role: 'business' as const,
    route: '/reports',
    desc: 'Real-time counters update: 12,840+ meals rescued, ₹1.84L saved, 3.2T carbon waste avoided.',
    icon: BarChart3,
    badge: '14/15'
  },
  {
    step: 15,
    title: 'AI Predicts Sunday Surplus Pattern',
    role: 'business' as const,
    route: '/insights',
    desc: 'AI Waste Intelligence detects recurring 34 sandwich surplus on Sundays & recommends adjustments.',
    icon: Sparkles,
    badge: '15/15'
  }
];

export const DemoWalkthroughModal: React.FC = () => {
  const { demoStep, runDemoStep, setDemoStep, demoModalOpen, setDemoModalOpen } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const currentStepData = DEMO_STEPS.find(s => s.step === demoStep) || DEMO_STEPS[0];

  const handleNext = () => {
    const next = demoStep >= 15 ? 1 : (demoStep === 0 ? 1 : demoStep + 1);
    runDemoStep(next);
  };

  const handlePrev = () => {
    const prev = demoStep <= 1 ? 15 : demoStep - 1;
    runDemoStep(prev);
  };

  if (!demoModalOpen) {
    return (
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => {
            setDemoModalOpen(true);
            if (demoStep === 0) runDemoStep(1);
          }}
          className="flex items-center gap-2 bg-[#14382F] hover:bg-[#0D261F] text-white px-3.5 py-2 rounded-full shadow-xl border border-white/20 text-xs font-display font-bold transition-all hover:scale-105 active:scale-95 group"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF5D38] animate-ping"></span>
          <Sparkles className="w-3.5 h-3.5 text-[#FF5D38]" />
          <span>3-Min Hackathon Demo Tour</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-mono">15 Steps</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 left-5 right-5 sm:right-auto sm:max-w-md z-40">
      <div className="bg-[#14382F] text-white rounded-2xl shadow-2xl border border-white/15 overflow-hidden transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/25 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5D38]"></span>
            <span className="text-xs font-display font-bold uppercase tracking-wider text-white">
              Live Hackathon Demo
            </span>
            <span className="text-[11px] font-mono bg-white/10 px-2 py-0.5 rounded-full text-[#FF5D38] font-bold">
              Step {demoStep > 0 ? demoStep : 1} of 15
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-white/70 hover:text-white text-xs px-2 py-0.5 rounded hover:bg-white/10 transition-colors"
            >
              {collapsed ? 'Expand' : 'Minimize'}
            </button>
            <button
              onClick={() => setDemoModalOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
              aria-label="Close demo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content body */}
        {!collapsed && (
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF5D38]/20 text-[#FF5D38] flex items-center justify-center shrink-0 border border-[#FF5D38]/30">
                <currentStepData.icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-emerald-300">
                    Role: {currentStepData.role.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {currentStepData.route}
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-white mt-1">
                  {currentStepData.title}
                </h4>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  {currentStepData.desc}
                </p>
              </div>
            </div>

            {/* Step Progress Bar */}
            <div className="mt-3.5 w-full bg-white/10 h-1.5 rounded-full overflow-hidden flex">
              <div 
                className="bg-[#FF5D38] h-full transition-all duration-300 rounded-full"
                style={{ width: `${(Math.max(1, demoStep) / 15) * 100}%` }}
              />
            </div>

            {/* Step Navigation Controls */}
            <div className="mt-4 flex items-center justify-between gap-2 pt-2 border-t border-white/10">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 text-xs text-white/80 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Back
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => runDemoStep(1)}
                  title="Restart Demo from Step 1"
                  className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 bg-[#FF5D38] hover:bg-[#E44824] text-white px-4 py-1.5 rounded-xl font-display font-bold text-xs shadow-md transition-transform active:scale-95"
                >
                  <span>{demoStep === 15 ? 'Loop to Start' : 'Execute Step'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
