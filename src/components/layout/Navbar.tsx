import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  ShoppingBag, 
  User, 
  Store, 
  HeartHandshake, 
  Bike, 
  Shield, 
  Sparkles,
  Zap,
  Navigation
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';
import { HYDERABAD_AREAS } from '../../data/mockData';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentRole, 
    setCurrentRole, 
    selectedCity, 
    selectedArea, 
    setSelectedArea, 
    currentRoute, 
    navigateTo, 
    orders,
    flashRescueActive,
    triggerFlashRescue,
    setDemoModalOpen,
    runDemoStep
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Find Food', href: '/marketplace' },
    { label: 'Live Order Status', href: '/dashboard/customer' },
    { label: 'For Kitchens', href: '/dashboard/business' },
    { label: 'Care Hubs', href: '/care-hub' },
    { label: 'Riders', href: '/rider' },
    { label: 'Live Map', href: '/map' },
    { label: 'City Impact', href: '/reports' }
  ];

  const roles: { role: UserRole; label: string; icon: any }[] = [
    { role: 'customer', label: 'Customer', icon: User },
    { role: 'business', label: 'Kitchen / Eatery', icon: Store },
    { role: 'care_hub', label: 'Care Hub', icon: HeartHandshake },
    { role: 'rider', label: 'Rider Courier', icon: Bike },
    { role: 'admin', label: 'City Admin Ops', icon: Shield }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#')) {
      if (currentRoute !== '/') {
        navigateTo('/');
        setTimeout(() => {
          const el = document.getElementById(href.replace('/#', ''));
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(href.replace('/#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigateTo(href);
    }
  };

  const activeReservationsCount = orders.filter(o => o.status !== 'picked_up' && o.status !== 'cancelled').length;

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-stone-200/80 py-2.5'
            : 'bg-[#FAF7F2]/80 backdrop-blur-xs py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* LEFT: Logo + Tagline */}
            <div 
              onClick={() => navigateTo('/')} 
              className="cursor-pointer shrink-0"
            >
              <Logo size="md" showTagline={!scrolled} />
            </div>

            {/* CENTER: Main Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = currentRoute === link.href || (link.href === '/dashboard/customer' && currentRoute.startsWith('/order-status'));
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className={`px-3 py-1.5 rounded-lg font-display text-sm font-medium transition-all ${
                      isActive
                        ? 'text-[#14382F] font-bold bg-[#E8EFE9]'
                        : 'text-stone-700 hover:text-[#14382F] hover:bg-black/5'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* RIGHT: Controls (Location, Role Switcher, Quick Action, Auth) */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Location Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-200 shadow-2xs hover:border-stone-300 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#FF5D38] shrink-0" />
                  <span className="truncate max-w-[90px] sm:max-w-[120px]">{selectedArea}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {locationDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-fade-in">
                    <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      Hyderabad Hotspots
                    </div>
                    {HYDERABAD_AREAS.map((area) => (
                      <button
                        key={area}
                        onClick={() => {
                          setSelectedArea(area);
                          setLocationDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between hover:bg-stone-50 ${
                          selectedArea === area ? 'text-[#FF5D38] font-bold bg-[#FF5D38]/5' : 'text-stone-700'
                        }`}
                      >
                        <span>{area}</span>
                        {selectedArea === area && <span className="w-1.5 h-1.5 rounded-full bg-[#FF5D38]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Role Switcher Pill */}
              <div className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#14382F] bg-[#E8EFE9] border border-[#14382F]/10 hover:bg-[#E8EFE9]/80 transition-all"
                  title="Switch view to test different user roles"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span className="capitalize">{currentRole.replace('_', ' ')}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-fade-in">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      Switch Role View (Demo)
                    </div>
                    {roles.map((r) => {
                      const IconComp = r.icon;
                      return (
                        <button
                          key={r.role}
                          onClick={() => {
                            setCurrentRole(r.role);
                            setRoleDropdownOpen(false);
                            if (r.role === 'customer') navigateTo('/dashboard/customer');
                            if (r.role === 'business') navigateTo('/dashboard/business');
                            if (r.role === 'care_hub') navigateTo('/care-hub');
                            if (r.role === 'rider') navigateTo('/rider');
                            if (r.role === 'admin') navigateTo('/admin');
                          }}
                          className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center gap-2 hover:bg-stone-50 ${
                            currentRole === r.role ? 'text-[#14382F] font-bold bg-[#E8EFE9]' : 'text-stone-700'
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5 text-stone-500" />
                          <span>{r.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Active Reservations / Cart (for customers) */}
              {activeReservationsCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const latest = orders[0];
                    if (latest) {
                      navigateTo(`/order-status/${latest.id}`);
                    } else {
                      navigateTo('/dashboard/customer');
                    }
                  }}
                  className="relative p-2 rounded-xl text-[#14382F] bg-white border border-stone-200 hover:border-stone-300 shadow-2xs transition-all flex items-center gap-1.5"
                  title="View active live orders"
                >
                  <ShoppingBag className="w-4 h-4 text-[#14382F]" />
                  <span className="text-xs font-bold text-[#FF5D38] hidden sm:inline">Track</span>
                  <span className="w-4 h-4 rounded-full bg-[#FF5D38] text-white text-[10px] font-bold flex items-center justify-center">
                    {activeReservationsCount}
                  </span>
                </button>
              )}

              {/* Demo Tour Launcher Button */}
              <button
                type="button"
                onClick={() => {
                  setDemoModalOpen(true);
                  runDemoStep(1);
                }}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#FF5D38] bg-[#FF5D38]/10 hover:bg-[#FF5D38]/15 border border-[#FF5D38]/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>3-Min Demo Tour</span>
              </button>

              {/* Primary Action Button based on Role */}
              <button
                type="button"
                onClick={() => {
                  if (currentRole === 'business') {
                    navigateTo('/listings/new');
                  } else if (currentRole === 'care_hub') {
                    navigateTo('/care-hub');
                  } else if (currentRole === 'rider') {
                    navigateTo('/rider');
                  } else {
                    navigateTo('/marketplace');
                  }
                }}
                className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#FF5D38] hover:bg-[#E44824] shadow-xs hover:shadow transition-all active:scale-95"
              >
                {currentRole === 'business' ? 'List Surplus' : 
                 currentRole === 'care_hub' ? 'Care Hub Portal' :
                 currentRole === 'rider' ? 'Rider Feed' : 'Rescue Meals'}
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-black/5 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-200 bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
            {/* Quick role selector on mobile */}
            <div className="p-3 bg-white rounded-2xl border border-stone-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                Active View Role:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {roles.map(r => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setCurrentRole(r.role);
                      setMobileMenuOpen(false);
                      if (r.role === 'customer') navigateTo('/dashboard/customer');
                      if (r.role === 'business') navigateTo('/dashboard/business');
                      if (r.role === 'care_hub') navigateTo('/care-hub');
                      if (r.role === 'rider') navigateTo('/rider');
                      if (r.role === 'admin') navigateTo('/admin');
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left flex items-center gap-1.5 ${
                      currentRole === r.role ? 'bg-[#14382F] text-white' : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    <r.icon className="w-3 h-3" />
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-3 py-2.5 rounded-xl font-display font-semibold text-sm text-stone-800 hover:bg-stone-200/60 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDemoModalOpen(true);
                  runDemoStep(1);
                }}
                className="w-full py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-[#FF5D38] bg-[#FF5D38]/10 border border-[#FF5D38]/20 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                Launch 3-Minute Demo Tour
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo(currentRole === 'business' ? '/listings/new' : '/marketplace');
                }}
                className="w-full py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-[#FF5D38] hover:bg-[#E44824] shadow-xs flex items-center justify-center gap-2"
              >
                {currentRole === 'business' ? 'List Surplus Food' : 'Rescue Meals Now'}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
