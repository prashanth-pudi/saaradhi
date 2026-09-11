import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  FoodListing, 
  Order, 
  OrderStatus,
  OrderTimelineStep,
  Donation, 
  RiderTask,
  VolunteerTask,
  CareHub,
  NGO,
  AIDecisionResult 
} from '../types';
import { 
  INITIAL_LISTINGS, 
  INITIAL_BUSINESSES, 
  INITIAL_CARE_HUBS,
  INITIAL_NGOS, 
  INITIAL_DONATIONS, 
  INITIAL_RIDER_TASKS,
  INITIAL_VOLUNTEER_TASKS 
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'urgent' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  
  // Navigation
  currentRoute: string;
  navigateTo: (route: string) => void;
  
  // Listings
  listings: FoodListing[];
  addListing: (newListing: Omit<FoodListing, 'id' | 'status'>) => FoodListing;
  getListingById: (id: string) => FoodListing | undefined;
  
  // Orders / Real-Time Tracking
  orders: Order[];
  activeTrackingOrderId: string | null;
  setActiveTrackingOrderId: (id: string | null) => void;
  activeOrder?: Order;
  reserveFood: (listingId: string, quantity: number, notes?: string) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  advanceOrderStatus: (orderId: string) => void;
  
  // Care Hubs (formerly NGOs)
  careHubs: CareHub[];
  ngos: NGO[]; // backward-compat alias
  
  // Donations
  donations: Donation[];
  acceptDonation: (donationId: string) => void;
  rejectDonation: (donationId: string) => void;
  confirmDonationReceived: (donationId: string) => void;
  
  // Riders (formerly Volunteers)
  riderTasks: RiderTask[];
  volunteerTasks: VolunteerTask[]; // backward-compat alias
  acceptRiderTask: (taskId: string, riderName: string) => void;
  acceptVolunteerTask: (taskId: string, volunteerName: string) => void;
  updateVolunteerTask: (taskId: string, status: 'accepted' | 'picked_up' | 'delivered') => void;
  markTaskPickedUp: (taskId: string) => void;
  markTaskDelivered: (taskId: string, proofUrl?: string) => void;
  
  // Favorites
  favorites: string[];
  favoriteIds: string[]; // backward-compat alias
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
  
  // Flash Rescue
  flashRescueActive: boolean;
  triggerFlashRescue: (listingId?: string) => void;
  dismissFlashRescue: () => void;
  
  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  
  // Stats
  totalMealsRescued: number;
  totalWasteAvoidedKg: number;
  totalSavingsInr: number;
  totalDonatedMeals: number;
  
  // Demo Mode
  demoStep: number;
  setDemoStep: (step: number) => void;
  demoModalOpen: boolean;
  setDemoModalOpen: (open: boolean) => void;
  runDemoStep: (stepNumber: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const createInitialTimeline = (businessName: string): OrderTimelineStep[] => [
  {
    status: 'reserved',
    label: 'Order Reserved & Code Generated',
    description: 'Surplus meal secured on SAARADHI Network. Verification OTP created.',
    timestamp: '12 mins ago',
    completed: true,
    current: false,
  },
  {
    status: 'packing',
    label: 'Kitchen Preparing & Packing',
    description: `${businessName} kitchen is packing food in food-grade insulated packaging.`,
    timestamp: 'In Progress',
    completed: true,
    current: false,
  },
  {
    status: 'ready_for_pickup',
    label: 'Ready for Collection',
    description: 'Fresh pack ready at counter. Present pickup code to collect.',
    timestamp: 'Ready Now',
    completed: false,
    current: true,
  },
  {
    status: 'picked_up',
    label: 'Rescued & Verified',
    description: 'Meal safely collected. Community impact and CO2 savings recorded.',
    timestamp: 'Pending handover',
    completed: false,
    current: false,
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [selectedCity, setSelectedCity] = useState<string>('Hyderabad');
  const [selectedArea, setSelectedArea] = useState<string>('All Hyderabad');
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  
  const [listings, setListings] = useState<FoodListing[]>(INITIAL_LISTINGS);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-101',
      orderNumber: 'SRD-4821',
      listingId: 'list-1',
      item: 'Butter Croissant & Danish Box',
      businessName: 'Concu Artisan Pâtisserie',
      businessAddress: 'Plot 479, Road No. 21, Jubilee Hills, Hyderabad',
      businessPhone: '+91 98490 34567',
      customerId: 'usr-customer-1',
      customerName: 'Prashanth Kumar',
      quantity: 1,
      itemPrice: 149,
      platformFee: 15,
      totalAmount: 164,
      savingsAmount: 231,
      pickupCode: 'SRD-4821',
      pickupDeadline: '21:45 Today',
      status: 'ready_for_pickup',
      createdAt: '12 mins ago',
      estimatedPickupMinutes: 15,
      pickupInstructions: 'Show your 4-digit code SRD-4821 at the counter. Carry your own reusable container if possible.',
      timeline: createInitialTimeline('Concu Artisan Pâtisserie')
    }
  ]);

  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | null>('ord-101');
  const [careHubs] = useState<CareHub[]>(INITIAL_CARE_HUBS);
  const [donations, setDonations] = useState<Donation[]>(INITIAL_DONATIONS);
  const [riderTasks, setRiderTasks] = useState<RiderTask[]>(INITIAL_RIDER_TASKS);
  const [favorites, setFavorites] = useState<string[]>(['list-1', 'list-2']);
  const [flashRescueActive, setFlashRescueActive] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Demo walkthrough controller
  const [demoStep, setDemoStep] = useState<number>(0);
  const [demoModalOpen, setDemoModalOpen] = useState<boolean>(false);

  // Impact stats
  const [totalMealsRescued, setTotalMealsRescued] = useState<number>(12840);
  const [totalWasteAvoidedKg, setTotalWasteAvoidedKg] = useState<number>(3200);
  const [totalSavingsInr, setTotalSavingsInr] = useState<number>(184500);
  const [totalDonatedMeals, setTotalDonatedMeals] = useState<number>(4280);

  // Synchronize route with URL hash/pathname if needed
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path && path !== '/') {
        setCurrentRoute(path);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({}, '', route);
    } catch {
      // safe fallback if pushState is restricted
    }
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleFavorite = (listingId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(listingId);
      if (exists) {
        addToast({
          type: 'info',
          title: 'Removed from Favorites',
          message: 'Listing removed from your saved food list.'
        });
        return prev.filter(id => id !== listingId);
      } else {
        addToast({
          type: 'success',
          title: 'Added to Favorites',
          message: 'Saved! We will alert you before the rescue window closes.'
        });
        return [...prev, listingId];
      }
    });
  };

  const isFavorite = (listingId: string) => favorites.includes(listingId);
  const getListingById = (id: string) => listings.find(l => l.id === id);

  const addListing = (newListing: Omit<FoodListing, 'id' | 'status'>): FoodListing => {
    const id = `list-${Date.now()}`;
    const created: FoodListing = {
      ...newListing,
      id,
      status: 'active'
    };
    setListings(prev => [created, ...prev]);
    addToast({
      type: 'success',
      title: 'Surplus Listing Published',
      message: `${created.item} is now live on the SAARADHI Rescue Network.`
    });
    return created;
  };

  // Real-time order creation with rich timeline
  const reserveFood = (listingId: string, quantity: number, notes?: string): Order => {
    const targetListing = listings.find(l => l.id === listingId);
    const itemTitle = targetListing ? targetListing.item : 'Food Rescue Box';
    const bizName = targetListing ? targetListing.businessName : 'SAARADHI Partner';
    const bizAddress = targetListing ? `${targetListing.businessArea}, Hyderabad` : 'Hyderabad Central';
    const price = targetListing ? targetListing.rescuePrice : 120;
    const original = targetListing ? targetListing.originalPrice : 280;
    const platformFee = Math.max(5, Math.round(price * quantity * 0.10));
    const total = price * quantity + platformFee;
    const savings = Math.max(0, (original - price) * quantity);
    const code = `SRD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTimeline: OrderTimelineStep[] = [
      {
        status: 'reserved',
        label: 'Order Reserved & Code Generated',
        description: 'Surplus meal secured on SAARADHI Network. Digital OTP created.',
        timestamp: 'Just now',
        completed: true,
        current: false,
      },
      {
        status: 'packing',
        label: 'Kitchen Packaging Surplus',
        description: `${bizName} is packing in tamper-proof FSSAI food-safe containers.`,
        timestamp: 'Estimated 8-12 mins',
        completed: false,
        current: true,
      },
      {
        status: 'ready_for_pickup',
        label: 'Ready for Pickup / Handover',
        description: 'Show pickup code at the counter for contactless handover.',
        timestamp: 'Upcoming',
        completed: false,
        current: false,
      },
      {
        status: 'picked_up',
        label: 'Rescued & Verified',
        description: 'Meal collected! Community impact recorded.',
        timestamp: 'Pending handover',
        completed: false,
        current: false,
      }
    ];

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: code,
      listingId,
      item: itemTitle,
      businessName: bizName,
      businessAddress: bizAddress,
      businessPhone: '+91 98490 23456',
      customerId: 'usr-customer-current',
      customerName: 'Priyanka Sen',
      quantity,
      itemPrice: price,
      platformFee,
      totalAmount: total,
      savingsAmount: savings,
      pickupCode: code,
      pickupDeadline: targetListing?.pickupWindowEnd ? `${targetListing.pickupWindowEnd} Today` : '21:30 Today',
      status: 'packing',
      createdAt: 'Just now',
      estimatedPickupMinutes: 12,
      pickupInstructions: targetListing?.pickupInstructions || 'Show pickup code at the counter.',
      timeline: newTimeline
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingOrderId(newOrder.id);

    // Decrement listing quantity
    setListings(prev => prev.map(l => {
      if (l.id === listingId) {
        const remaining = Math.max(0, l.quantityRemaining - quantity);
        return {
          ...l,
          quantityRemaining: remaining,
          status: remaining === 0 ? 'sold_out' : 'active'
        };
      }
      return l;
    }));

    // Update impact stats
    setTotalMealsRescued(prev => prev + quantity);
    setTotalSavingsInr(prev => prev + savings);
    setTotalWasteAvoidedKg(prev => prev + (quantity * 0.4));

    addToast({
      type: 'success',
      title: 'Rescue Confirmed! 🎉',
      message: `Pickup code: ${code}. Live tracking is now active.`
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id !== orderId) return ord;

      const orderStages: OrderStatus[] = ['reserved', 'packing', 'ready_for_pickup', 'picked_up'];
      const targetIndex = orderStages.indexOf(newStatus);

      const updatedTimeline = ord.timeline?.map((step, idx) => {
        if (idx < targetIndex) {
          return { ...step, completed: true, current: false };
        } else if (idx === targetIndex) {
          return { ...step, completed: newStatus === 'picked_up', current: newStatus !== 'picked_up' };
        } else {
          return { ...step, completed: false, current: false };
        }
      }) || [];

      return {
        ...ord,
        status: newStatus,
        timeline: updatedTimeline
      };
    }));
  };

  // Helper to advance order through stages for live demo & user simulation
  const advanceOrderStatus = (orderId: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    let nextStatus: OrderStatus = 'packing';
    if (targetOrder.status === 'reserved') nextStatus = 'packing';
    else if (targetOrder.status === 'packing') nextStatus = 'ready_for_pickup';
    else if (targetOrder.status === 'ready_for_pickup') nextStatus = 'picked_up';
    else nextStatus = 'ready_for_pickup';

    updateOrderStatus(orderId, nextStatus);

    const statusLabels: Record<OrderStatus, string> = {
      reserved: 'Order Reserved',
      packing: 'Kitchen Packing Surplus',
      ready_for_pickup: 'Ready for Counter Pickup 🥡',
      picked_up: 'Food Rescued & Verified! ⭐',
      cancelled: 'Order Cancelled'
    };

    addToast({
      type: 'success',
      title: 'Order Status Updated',
      message: `Order #${targetOrder.orderNumber}: ${statusLabels[nextStatus]}`
    });
  };

  const acceptDonation = (donationId: string) => {
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        return { ...d, status: 'accepted' };
      }
      return d;
    }));

    // Create Rider Task for transit
    const donation = donations.find(d => d.id === donationId);
    if (donation) {
      const newTask: RiderTask = {
        id: `task-${Date.now()}`,
        donationId,
        foodItem: `${donation.quantity} Portions: ${donation.foodItem}`,
        quantity: donation.quantity,
        pickupBusiness: `${donation.businessName} (${donation.businessArea})`,
        pickupAddress: `${donation.businessArea}, Hyderabad`,
        dropoffCareHub: donation.careHubName || 'Akshaya Community Care Hub',
        dropoffNGO: donation.careHubName || 'Akshaya Community Care Hub',
        dropoffAddress: 'Banjara Hills, Hyderabad',
        distanceKm: 2.4,
        urgency: 'critical',
        deadline: 'Within 45 mins',
        status: 'available',
        rewardPoints: 110,
        cashBonusInr: 60
      };
      setRiderTasks(prev => [newTask, ...prev]);
    }

    addToast({
      type: 'success',
      title: 'Care Hub Donation Accepted',
      message: 'Transit alert broadcasted to 14 nearby active riders.'
    });
  };

  const rejectDonation = (donationId: string) => {
    setDonations(prev => prev.filter(d => d.id !== donationId));
    addToast({
      type: 'info',
      title: 'Donation Declined',
      message: 'Re-routing surplus batch to the next eligible Care Hub shelter.'
    });
  };

  const confirmDonationReceived = (donationId: string) => {
    setDonations(prev => prev.map(d => {
      if (d.id === donationId) {
        return { ...d, status: 'completed' };
      }
      return d;
    }));
    setTotalDonatedMeals(prev => prev + 24);
    addToast({
      type: 'success',
      title: 'Care Hub Verified Receipt',
      message: 'Impact recorded. Community thank-you badge issued to donor & rider!'
    });
  };

  const acceptRiderTask = (taskId: string, riderName: string) => {
    setRiderTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: 'accepted', riderName, volunteerName: riderName };
      }
      return t;
    }));
    addToast({
      type: 'success',
      title: 'Dispatch Task Accepted! 🛵',
      message: `Head to pickup point. Route navigation unlocked.`
    });
  };

  const updateVolunteerTask = (taskId: string, status: 'accepted' | 'picked_up' | 'delivered') => {
    if (status === 'accepted') {
      acceptRiderTask(taskId, 'Active Rider');
    } else if (status === 'picked_up') {
      markTaskPickedUp(taskId);
    } else if (status === 'delivered') {
      markTaskDelivered(taskId);
    }
  };

  const markTaskPickedUp = (taskId: string) => {
    setRiderTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: 'picked_up' };
      }
      return t;
    }));
    addToast({
      type: 'info',
      title: 'Food Picked Up by Rider',
      message: 'En route to Care Hub shelter. Temperature and packaging verified.'
    });
  };

  const markTaskDelivered = (taskId: string, proofUrl?: string) => {
    const task = riderTasks.find(t => t.id === taskId);
    setRiderTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: 'delivered' };
      }
      return t;
    }));

    if (task) {
      setDonations(prev => prev.map(d => {
        if (d.id === task.donationId) {
          return {
            ...d,
            status: 'delivered',
            proofImageUrl: proofUrl || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80'
          };
        }
        return d;
      }));
      setTotalMealsRescued(prev => prev + task.quantity);
      setTotalDonatedMeals(prev => prev + task.quantity);
    }

    addToast({
      type: 'success',
      title: 'Rider Delivery Completed! 🌟',
      message: `Earned ${task?.rewardPoints || 100} Green Rescuer Karma Points + ₹${task?.cashBonusInr || 60} transit bonus.`
    });
  };

  const triggerFlashRescue = (listingId?: string) => {
    setFlashRescueActive(true);
    addToast({
      type: 'urgent',
      title: '⚡ FLASH RESCUE ACTIVATED',
      message: 'Urgent surplus window triggered. Broadcast sent to nearby customers, Care Hubs & Rider fleet!'
    });
  };

  const dismissFlashRescue = () => {
    setFlashRescueActive(false);
  };

  // Active tracking order computation
  const activeOrder = orders.find(o => o.id === activeTrackingOrderId) || orders[0];

  // Automated 15-step Hackathon Demo Runner
  const runDemoStep = (stepNumber: number) => {
    setDemoStep(stepNumber);
    switch (stepNumber) {
      case 1:
        setCurrentRole('business');
        navigateTo('/dashboard/business');
        addToast({
          type: 'info',
          title: 'Demo Step 1: Restaurant Surplus Detected',
          message: 'Paradise Kitchens has 72 fresh meal portions near closing (2.5 hrs left).'
        });
        break;
      case 2:
        setCurrentRole('business');
        navigateTo('/listings/new');
        addToast({
          type: 'info',
          title: 'Demo Step 2: Listing Creation',
          message: 'Entering 72 surplus portions of Royal Chicken & Veg Dum Biryani.'
        });
        break;
      case 3:
      case 4:
        navigateTo('/listings/new');
        addToast({
          type: 'success',
          title: 'Demo Step 4: AI Destination Optimization',
          message: 'AI analyzed demand & expiry: Recommends 40 SELL, 20 DISCOUNT, 12 DONATE (92% Confidence).'
        });
        break;
      case 5:
      case 6:
        setCurrentRole('customer');
        navigateTo('/marketplace');
        addToast({
          type: 'info',
          title: 'Demo Step 5 & 6: Customer Discovery & Countdown',
          message: 'Customer views live countdown and discounted nearby food drops.'
        });
        break;
      case 7:
        setCurrentRole('customer');
        const created = reserveFood('list-2', 2);
        // Automatically navigate to the real-time Order Status & Tracking page!
        navigateTo(`/order-status/${created.id}`);
        break;
      case 8:
      case 9:
        setCurrentRole('care_hub');
        navigateTo('/care-hub');
        acceptDonation('don-1');
        break;
      case 10:
      case 11:
        setCurrentRole('rider');
        navigateTo('/rider');
        acceptRiderTask('task-1', 'Arjun Rider');
        setTimeout(() => markTaskPickedUp('task-1'), 1200);
        break;
      case 12:
      case 13:
        markTaskDelivered('task-1');
        confirmDonationReceived('don-1');
        break;
      case 14:
        navigateTo('/reports');
        addToast({
          type: 'success',
          title: 'Demo Step 14: Real-time Impact Recorded',
          message: 'Meals rescued, revenue recovered, and waste avoided metrics updated!'
        });
        break;
      case 15:
        navigateTo('/insights');
        addToast({
          type: 'info',
          title: 'Demo Step 15: AI Waste Intelligence',
          message: '“You waste ~34 sandwiches every Sunday”. Production recommendation generated!'
        });
        break;
      default:
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        selectedCity,
        setSelectedCity,
        selectedArea,
        setSelectedArea,
        currentRoute,
        navigateTo,
        listings,
        addListing,
        getListingById,
        orders,
        activeTrackingOrderId,
        setActiveTrackingOrderId,
        activeOrder,
        reserveFood,
        updateOrderStatus,
        advanceOrderStatus,
        careHubs,
        ngos: careHubs,
        donations,
        acceptDonation,
        rejectDonation,
        confirmDonationReceived,
        riderTasks,
        volunteerTasks: riderTasks,
        acceptRiderTask,
        acceptVolunteerTask: acceptRiderTask,
        updateVolunteerTask,
        markTaskPickedUp,
        markTaskDelivered,
        favorites,
        favoriteIds: favorites,
        toggleFavorite,
        isFavorite,
        flashRescueActive,
        triggerFlashRescue,
        dismissFlashRescue,
        toasts,
        addToast,
        removeToast,
        totalMealsRescued,
        totalWasteAvoidedKg,
        totalSavingsInr,
        totalDonatedMeals,
        demoStep,
        setDemoStep,
        demoModalOpen,
        setDemoModalOpen,
        runDemoStep
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
