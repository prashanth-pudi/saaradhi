import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Navigation, 
  QrCode, 
  Copy, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowLeft, 
  Leaf, 
  TrendingUp, 
  Store,
  ChevronRight,
  RefreshCw,
  Award
} from 'lucide-react';
import { OrderStatus } from '../types';

interface OrderStatusPageProps {
  orderId?: string;
}

export const OrderStatusPage: React.FC<OrderStatusPageProps> = ({ orderId }) => {
  const { 
    orders, 
    activeOrder, 
    activeTrackingOrderId, 
    advanceOrderStatus, 
    updateOrderStatus,
    navigateTo, 
    addToast,
    currentRoute
  } = useApp();

  // Extract orderId from prop or URL
  const targetId = orderId || currentRoute.replace('/order-status/', '') || activeTrackingOrderId || orders[0]?.id;
  const order = orders.find(o => o.id === targetId) || activeOrder || orders[0];

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'tracker' | 'details'>('tracker');
  const [pulse, setPulse] = useState(false);

  // Auto-pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!order) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-display font-bold text-stone-900 mb-2">No Active Order Found</h2>
        <p className="text-sm text-stone-500 mb-6">You don't have an ongoing food rescue order yet.</p>
        <button
          onClick={() => navigateTo('/marketplace')}
          className="px-6 py-3 bg-[#14382F] text-white rounded-xl font-display font-bold text-sm shadow-md hover:bg-[#0D261F] transition-all"
        >
          Explore Food Drops
        </button>
      </div>
    );
  }

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(order.pickupCode);
    setCopied(true);
    addToast({
      type: 'info',
      title: 'Code Copied',
      message: `Pickup Code ${order.pickupCode} copied to clipboard.`
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'reserved':
        return {
          label: 'Order Reserved',
          bg: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
          dot: 'bg-amber-500',
          stageNum: 1
        };
      case 'packing':
        return {
          label: 'Kitchen Packing Surplus',
          bg: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
          dot: 'bg-blue-500',
          stageNum: 2
        };
      case 'ready_for_pickup':
        return {
          label: 'Ready for Pickup at Counter',
          bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
          dot: 'bg-emerald-500',
          stageNum: 3
        };
      case 'picked_up':
        return {
          label: 'Rescued & Verified',
          bg: 'bg-teal-500/10 text-teal-700 border-teal-500/20',
          dot: 'bg-teal-600',
          stageNum: 4
        };
      default:
        return {
          label: 'Processing',
          bg: 'bg-stone-500/10 text-stone-600 border-stone-500/20',
          dot: 'bg-stone-400',
          stageNum: 1
        };
    }
  };

  const statusInfo = getStatusBadge(order.status);

  return (
    <div className="py-8 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateTo('/marketplace')}
            className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-stone-600 hover:text-[#14382F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Marketplace</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-mono">Order ID: #{order.orderNumber}</span>
            <button
              onClick={() => navigateTo('/dashboard/customer')}
              className="text-xs font-semibold text-[#14382F] hover:underline"
            >
              All Reservations
            </button>
          </div>
        </div>

        {/* Top Hero Status Banner */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-sm overflow-hidden mb-6">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0F2922] to-[#164137] text-white relative">
            
            {/* Background Decorative Rings */}
            <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="text-[11px] uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full bg-white/10 text-emerald-300 border border-white/15 backdrop-blur-md">
                    LIVE RESCUE DISPATCH
                  </span>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-md ${
                    order.status === 'ready_for_pickup' 
                      ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40' 
                      : 'bg-white/15 text-white border-white/20'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${order.status === 'ready_for_pickup' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                    {statusInfo.label}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white mb-2">
                  {order.item}
                </h1>

                <div className="flex items-center gap-4 text-xs text-stone-300 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-emerald-400" />
                    <strong>{order.businessName}</strong>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF5D38]" />
                    Pickup by <strong>{order.pickupDeadline}</strong>
                  </span>
                </div>
              </div>

              {/* Digital Pickup Code Card */}
              <div className="bg-black/30 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 shrink-0 text-center min-w-[220px]">
                <span className="text-[10px] font-mono tracking-widest uppercase text-stone-300 block mb-1">
                  Counter Pickup Code
                </span>
                <div className="flex items-center justify-center gap-2">
                  <div className="text-3xl font-mono font-black tracking-widest text-emerald-300 select-all">
                    {order.pickupCode}
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-stone-300" />}
                  </button>
                </div>
                <span className="text-[10px] text-stone-300 mt-1 block">
                  Show code to cashier or rider
                </span>
              </div>
            </div>

            {/* Quick Interactive Simulation Strip */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Simulate live kitchen & collection progress:</span>
              </div>
              <button
                onClick={() => advanceOrderStatus(order.id)}
                className="px-3.5 py-1.5 rounded-xl bg-[#FF5D38] hover:bg-[#E44824] text-white font-display font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Advance Order Status (Demo)</span>
              </button>
            </div>

          </div>

          {/* Real-Time Stepper & Progress Tracker */}
          <div className="p-6 sm:p-8">
            <h2 className="text-sm uppercase tracking-wider font-mono font-bold text-stone-500 mb-6 flex items-center justify-between">
              <span>Order Tracking Journey</span>
              <span className="text-emerald-700 font-sans font-semibold text-xs">
                Real-time WebSocket Synchronized
              </span>
            </h2>

            {/* Visual Stepper Track */}
            <div className="relative">
              {/* Progress Line */}
              <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-stone-200 -z-0">
                <div 
                  className="h-full bg-gradient-to-r from-[#14382F] to-[#FF5D38] transition-all duration-500"
                  style={{
                    width: order.status === 'reserved' ? '15%' :
                           order.status === 'packing' ? '50%' :
                           order.status === 'ready_for_pickup' ? '85%' : '100%'
                  }}
                />
              </div>

              {/* Timeline Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-2 relative z-10">
                {order.timeline?.map((step, idx) => {
                  const isCompleted = step.completed;
                  const isCurrent = step.current;

                  return (
                    <div key={idx} className="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-4 sm:gap-2">
                      {/* Step Circle Indicator */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-all ${
                        isCompleted 
                          ? 'bg-[#14382F] text-white shadow-md' 
                          : isCurrent 
                            ? 'bg-[#FF5D38] text-white ring-4 ring-[#FF5D38]/20 shadow-md animate-pulse'
                            : 'bg-stone-100 text-stone-400 border border-stone-300'
                      }`}>
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      <div>
                        <div className={`font-display font-bold text-sm ${isCurrent ? 'text-[#FF5D38]' : isCompleted ? 'text-[#14382F]' : 'text-stone-400'}`}>
                          {step.label}
                        </div>
                        <p className="text-[11px] text-stone-500 leading-tight mt-0.5 max-w-[200px] sm:mx-auto">
                          {step.description}
                        </p>
                        <span className="text-[10px] font-mono text-stone-400 mt-1 inline-block">
                          {step.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current State Detail Box */}
            <div className="mt-8 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-[#0F2922]">
                    {order.status === 'ready_for_pickup' 
                      ? 'Your package is ready at the counter!' 
                      : order.status === 'picked_up'
                        ? 'Order successfully rescued! Thank you for reducing food waste.'
                        : 'Fresh surplus is being securely packed under FSSAI protocols.'}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {order.pickupInstructions || 'Show your 4-digit code at the store pickup counter.'}
                  </p>
                </div>
              </div>

              {order.status === 'ready_for_pickup' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'picked_up')}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-display font-bold text-xs shadow-sm transition-colors shrink-0"
                >
                  Confirm I Picked Up Food
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Two-Column Grid: Store & Location / Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Store & Direction Info (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Store Pickup Location Card */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-[#0F2922] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#FF5D38]" />
                  <span>Pickup Location & Directions</span>
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg">
                  0.8 km away
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="font-display font-bold text-sm text-[#0F2922]">
                  {order.businessName}
                </div>
                <p className="text-xs text-stone-600">
                  {order.businessAddress || 'Plot 479, Road No. 21, Jubilee Hills, Hyderabad'}
                </p>
                <div className="text-xs text-stone-500 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Pickup Window: <strong>Today until {order.pickupDeadline}</strong></span>
                </div>
              </div>

              {/* Action Buttons: Directions & Phone */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => navigateTo('/map')}
                  className="py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 font-display font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#14382F]" />
                  <span>Open in Map</span>
                </button>

                <a
                  href={`tel:${order.businessPhone || '+919849012345'}`}
                  className="py-2.5 px-4 rounded-xl bg-[#14382F] hover:bg-[#0D261F] text-white font-display font-bold text-xs flex items-center justify-center gap-2 transition-colors text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Kitchen</span>
                </a>
              </div>
            </div>

            {/* Environmental Impact & Waste Avoided */}
            <div className="bg-gradient-to-br from-emerald-900 to-[#14382F] text-white rounded-3xl p-6 shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono font-bold uppercase mb-2">
                  <Leaf className="w-4 h-4" />
                  <span>Your Verified Sustainability Impact</span>
                </div>
                
                <h4 className="font-display font-extrabold text-xl text-white mb-4">
                  You Kept {(order.quantity * 0.4).toFixed(1)} kg of Good Food Out of Landfills!
                </h4>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
                    <div className="text-xl font-display font-black text-emerald-300">
                      {order.quantity}
                    </div>
                    <span className="text-[10px] text-stone-300">Portions Rescued</span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
                    <div className="text-xl font-display font-black text-[#FF5D38]">
                      ₹{order.savingsAmount || 220}
                    </div>
                    <span className="text-[10px] text-stone-300">Money Saved</span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/15">
                    <div className="text-xl font-display font-black text-amber-300">
                      +110
                    </div>
                    <span className="text-[10px] text-stone-300">Karma Points</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary & Receipt (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs space-y-4">
              <h3 className="font-display font-bold text-base text-[#0F2922] pb-3 border-b border-stone-100 flex items-center justify-between">
                <span>Rescue Order Summary</span>
                <span className="text-xs font-mono text-stone-400">{order.createdAt}</span>
              </h3>

              {/* Items Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between items-start text-xs">
                  <div>
                    <div className="font-bold text-stone-800">{order.item}</div>
                    <div className="text-stone-500">Qty: {order.quantity} x ₹{order.itemPrice}</div>
                  </div>
                  <span className="font-bold text-stone-900">₹{order.quantity * order.itemPrice}</span>
                </div>

                <div className="flex justify-between items-center text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <span>SAARADHI Platform Fee</span>
                  <span>₹{order.platformFee}</span>
                </div>

                <div className="flex justify-between items-center text-sm font-display font-extrabold text-[#14382F] pt-2 border-t border-stone-200">
                  <span>Total Amount Paid</span>
                  <span>₹{order.totalAmount}</span>
                </div>

                {order.savingsAmount && (
                  <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-xl text-center font-bold">
                    🎉 You saved ₹{order.savingsAmount} compared to original restaurant price!
                  </div>
                )}
              </div>

              {/* Verified QR Scanner Simulation */}
              <div className="pt-4 border-t border-stone-100 text-center">
                <div className="w-36 h-36 mx-auto bg-stone-50 rounded-2xl border-2 border-dashed border-stone-300 p-2 flex flex-col items-center justify-center relative group">
                  <QrCode className="w-24 h-24 text-[#0F2922] group-hover:scale-105 transition-transform" />
                  <span className="text-[9px] font-mono text-stone-500 mt-1">Scan at Counter</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-2">
                  Encrypted FSSAI verification token for contactless handover.
                </p>
              </div>

              {/* Secondary CTA */}
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('/marketplace')}
                  className="w-full py-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-display font-bold text-xs transition-colors"
                >
                  Continue Rescuing Surplus
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
