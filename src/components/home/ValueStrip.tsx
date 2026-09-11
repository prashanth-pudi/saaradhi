import React from 'react';
import { PiggyBank, Store, HeartHandshake, Globe } from 'lucide-react';

export const ValueStrip: React.FC = () => {
  const benefits = [
    {
      title: 'Save Money',
      description: 'Enjoy great restaurant food at up to 65% off rescue prices',
      icon: PiggyBank
    },
    {
      title: 'Support Local',
      description: 'Help neighborhood bakeries and kitchens recover unserved value',
      icon: Store
    },
    {
      title: 'Help Communities',
      description: 'Enable automated warm meal donations to verified Care Hub shelters',
      icon: HeartHandshake
    },
    {
      title: 'Protect the Planet',
      description: 'Zero food to landfills. Reduced greenhouse gas emissions.',
      icon: Globe
    }
  ];

  return (
    <section className="bg-white border-y border-stone-200/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => {
            const IconComp = b.icon;
            return (
              <div key={b.title} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-[#E8EFE9] text-[#14382F] flex items-center justify-center shrink-0">
                  <IconComp className="w-5 h-5 text-[#2E7D5E]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#0F2922]">
                    {b.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
