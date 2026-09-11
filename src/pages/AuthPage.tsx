import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  User, 
  Store, 
  HeartHandshake, 
  Bike, 
  ArrowRight, 
  Lock, 
  Mail, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const AuthPage: React.FC = () => {
  const { setCurrentRole, navigateTo, addToast } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('demo@saaradhi.org');
  const [password, setPassword] = useState('password123');

  const handleQuickRoleLogin = (role: UserRole, name: string, targetPath: string) => {
    setCurrentRole(role);
    addToast({
      type: 'success',
      title: `Logged in as ${name} (${role.toUpperCase()})`,
      message: 'Demo credentials loaded successfully.'
    });
    navigateTo(targetPath);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Welcome to SAARADHI',
      message: 'Logged in successfully.'
    });
    navigateTo('/marketplace');
  };

  return (
    <div className="py-12 bg-[#FAF7F2] min-h-[85vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        
        {/* Logo & Headline */}
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <Logo size="lg" />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-[#0F2922]">
            {mode === 'login' ? 'Sign In to SAARADHI' : 'Create an Account'}
          </h1>
          <p className="text-stone-600 text-xs mt-1">
            Every surplus meal has a destination in Hyderabad.
          </p>
        </div>

        {/* 1-Click Role Switcher for Judges & Evaluators */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs mb-6">
          <div className="flex items-center gap-1.5 text-xs font-display font-bold uppercase tracking-wider text-[#FF5D38] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Hackathon Evaluator Login:</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickRoleLogin('customer', 'Ananya R.', '/dashboard/customer')}
              className="p-2.5 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <div className="font-bold text-xs text-stone-900">Customer</div>
                <div className="text-[10px] text-stone-400">Ananya R.</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin('business', 'Paradise Kitchens', '/dashboard/business')}
              className="p-2.5 rounded-xl border border-stone-200 hover:border-amber-500 hover:bg-amber-50/50 text-left transition-colors flex items-center gap-2"
            >
              <Store className="w-4 h-4 text-amber-700 shrink-0" />
              <div>
                <div className="font-bold text-xs text-stone-900">Kitchen</div>
                <div className="text-[10px] text-stone-400">Paradise Kitchens</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin('care_hub', 'Akshaya Care Hub', '/care-hub')}
              className="p-2.5 rounded-xl border border-stone-200 hover:border-teal-500 hover:bg-teal-50/50 text-left transition-colors flex items-center gap-2"
            >
              <HeartHandshake className="w-4 h-4 text-teal-700 shrink-0" />
              <div>
                <div className="font-bold text-xs text-stone-900">Care Hub</div>
                <div className="text-[10px] text-stone-400">Akshaya Hub</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickRoleLogin('rider', 'Rajesh K. (Rider)', '/rider')}
              className="p-2.5 rounded-xl border border-stone-200 hover:border-[#FF5D38] hover:bg-[#FF5D38]/10 text-left transition-colors flex items-center gap-2"
            >
              <Bike className="w-4 h-4 text-[#FF5D38] shrink-0" />
              <div>
                <div className="font-bold text-xs text-stone-900">Rider Courier</div>
                <div className="text-[10px] text-stone-400">Rajesh K.</div>
              </div>
            </button>
          </div>
        </div>

        {/* Traditional Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Email Address or Phone
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#FF5D38] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#FF5D38] focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#14382F] hover:bg-[#0D261F] shadow-sm transition-all active:scale-98 flex items-center justify-center gap-1.5"
            >
              <span>{mode === 'login' ? 'Sign In' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-stone-100 text-center text-xs text-stone-500">
            {mode === 'login' ? (
              <span>Don’t have an account yet? <button onClick={() => setMode('signup')} className="font-bold text-[#FF5D38]">Sign up</button></span>
            ) : (
              <span>Already have an account? <button onClick={() => setMode('login')} className="font-bold text-[#14382F]">Sign in</button></span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
