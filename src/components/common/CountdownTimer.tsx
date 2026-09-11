import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  initialMinutes: number;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialMinutes,
  showIcon = true,
  size = 'sm',
  className = ''
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(Math.max(0, initialMinutes * 60));

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  // Urgency states
  const totalMins = secondsLeft / 60;
  let urgencyStyle = 'bg-stone-100 text-stone-700 border-stone-200';
  let dotColor = 'bg-stone-400';
  let isUrgent = false;

  if (secondsLeft === 0) {
    urgencyStyle = 'bg-stone-200 text-stone-500 border-stone-300';
    dotColor = 'bg-stone-400';
  } else if (totalMins <= 30) {
    urgencyStyle = 'bg-red-50 text-red-700 border-red-200 font-semibold';
    dotColor = 'bg-[#FF5D38] animate-pulse';
    isUrgent = true;
  } else if (totalMins <= 60) {
    urgencyStyle = 'bg-amber-50 text-amber-800 border-amber-200';
    dotColor = 'bg-amber-500';
  } else {
    urgencyStyle = 'bg-[#E8EFE9]/80 text-[#16423C] border-[#16423C]/10';
    dotColor = 'bg-[#2E7D5E]';
  }

  const formatTime = () => {
    if (secondsLeft === 0) return 'Expired';
    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m left`;
    }
    return `${minutes}m ${String(seconds).padStart(2, '0')}s left`;
  };

  const textSizes = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2 font-bold'
  };

  return (
    <div 
      className={`inline-flex items-center gap-1.5 rounded-full border transition-colors ${urgencyStyle} ${textSizes[size]} ${className}`}
      title={isUrgent ? 'Urgent: Rescue window closing soon!' : 'Active rescue window'}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`}></span>
      {showIcon && <Clock className="w-3.5 h-3.5 shrink-0 opacity-70" />}
      <span className="font-mono tracking-tight whitespace-nowrap">{formatTime()}</span>
    </div>
  );
};
