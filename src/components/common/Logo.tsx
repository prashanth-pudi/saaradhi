import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  inverted?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false, inverted = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Custom SAARADHI Emblem: Leaf + Food Bowl + Infinite Rescue Loop */}
      <div 
        className={`relative ${iconSizes[size]} rounded-xl flex items-center justify-center transition-transform hover:scale-105 ${
          inverted ? 'bg-white/10 text-white' : 'bg-[#14382F] text-white shadow-sm'
        }`}
      >
        <svg 
          viewBox="0 0 36 36" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6"
        >
          {/* Organic Leaf Curve */}
          <path 
            d="M8 26C8 17.1634 15.1634 10 24 10C24 18.8366 16.8366 26 8 26Z" 
            fill={inverted ? '#FFFFFF' : '#E8EFE9'} 
            fillOpacity="0.35"
          />
          {/* Food Bowl / Sustenance Arc */}
          <path 
            d="M10 19C10 24.5228 14.4772 29 20 29C25.5228 29 30 24.5228 30 19H10Z" 
            fill={inverted ? '#FFFFFF' : '#2E7D5E'}
          />
          {/* Dynamic Coral Rescue Drop / Spark of Movement */}
          <circle 
            cx="24" 
            cy="11" 
            r="4" 
            fill="#FF5D38" 
          />
          <path 
            d="M20 9C20 9 22.5 13 25.5 13C28.5 13 28.5 9 28.5 9" 
            stroke="#FF5D38" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span 
            className={`font-display font-extrabold tracking-tight ${titleSizes[size]} ${
              inverted ? 'text-white' : 'text-[#0F2922]'
            }`}
          >
            SAARADHI
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5D38] inline-block -mt-1"></span>
        </div>
        {showTagline && (
          <span 
            className={`text-[11px] font-medium tracking-wide uppercase ${
              inverted ? 'text-white/70' : 'text-[#1E3A34]/70'
            }`}
          >
            Every Surplus Has a Destination
          </span>
        )}
      </div>
    </div>
  );
};
