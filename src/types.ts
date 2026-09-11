export type UserRole = 'customer' | 'business' | 'care_hub' | 'rider' | 'ngo' | 'volunteer' | 'admin';

export type RescueMode = 'SELL' | 'DISCOUNT' | 'DONATE' | 'URGENT_RESCUE';

export type FoodCategory = 
  | 'All'
  | 'Bakery'
  | 'Meals'
  | 'Indian'
  | 'Snacks'
  | 'Groceries'
  | 'Vegetarian'
  | 'Desserts';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone?: string;
  location: string;
  avatar?: string;
  organizationName?: string;
}

export interface Business {
  id: string;
  name: string;
  type: 'Bakery' | 'Restaurant' | 'Café' | 'Supermarket' | 'Hotel';
  area: string;
  city: string;
  rating: number;
  verificationStatus: 'verified' | 'pending';
  totalRescuedMeals: number;
  contactPhone: string;
  address: string;
}

export interface FoodListing {
  id: string;
  businessId: string;
  businessName: string;
  businessArea: string;
  businessType: string;
  item: string;
  description: string;
  category: FoodCategory;
  image: string;
  originalPrice: number;
  rescuePrice: number;
  discountPercentage: number;
  quantityTotal: number;
  quantityRemaining: number;
  mode: RescueMode;
  isVegetarian: boolean;
  distanceKm: number;
  pickupWindowStart: string; // e.g. "19:30"
  pickupWindowEnd: string;   // e.g. "21:30"
  expiresAt: string;         // ISO timestamp or relative target
  minutesRemaining: number;
  pickupInstructions: string;
  tags: string[];
  status: 'active' | 'sold_out' | 'expired' | 'donated';
  isFlashRescue?: boolean;
}

export type OrderStatus = 'reserved' | 'packing' | 'ready_for_pickup' | 'picked_up' | 'cancelled';

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  listingId: string;
  item: string;
  businessName: string;
  businessAddress?: string;
  businessPhone?: string;
  customerId: string;
  customerName: string;
  quantity: number;
  itemPrice: number;
  platformFee: number;
  totalAmount: number;
  savingsAmount?: number;
  pickupCode: string;
  pickupDeadline: string;
  status: OrderStatus;
  createdAt: string;
  estimatedPickupMinutes?: number;
  pickupInstructions?: string;
  timeline?: OrderTimelineStep[];
}

export interface CareHub {
  id: string;
  name: string;
  area: string;
  contactPerson: string;
  phone: string;
  verified: boolean;
  mealsServed: number;
  capacityPerDay: number;
  acceptedCategories: FoodCategory[];
  currentNeedUrgency: 'low' | 'medium' | 'high' | 'critical';
}

// Backward compatibility alias
export type NGO = CareHub;

export interface Donation {
  id: string;
  listingId: string;
  foodItem: string;
  businessName: string;
  businessArea: string;
  careHubId: string;
  careHubName: string;
  // Backward compatibility fields
  ngoId?: string;
  ngoName?: string;
  quantity: number;
  urgency: 'medium' | 'high' | 'critical';
  matchScore: number;
  matchReasons: string[];
  status: 'matched' | 'accepted' | 'rider_assigned' | 'volunteer_assigned' | 'picked_up' | 'delivered' | 'completed';
  createdAt: string;
  assignedRiderId?: string;
  assignedRiderName?: string;
  assignedVolunteerId?: string;
  assignedVolunteerName?: string;
  proofImageUrl?: string;
}

export interface RiderTask {
  id: string;
  donationId: string;
  foodItem: string;
  quantity: number;
  pickupBusiness: string;
  pickupAddress: string;
  dropoffCareHub: string;
  // Backward compatibility alias
  dropoffNGO?: string;
  dropoffAddress: string;
  distanceKm: number;
  urgency: 'high' | 'urgent' | 'critical';
  deadline: string;
  status: 'available' | 'accepted' | 'picked_up' | 'delivered';
  riderId?: string;
  riderName?: string;
  volunteerId?: string;
  volunteerName?: string;
  rewardPoints: number;
  cashBonusInr?: number;
}

// Backward compatibility alias
export type VolunteerTask = RiderTask;

export interface AIDecisionResult {
  totalQuantity: number;
  sellQty: number;
  discountQty: number;
  donateQty: number;
  urgentRescueQty: number;
  confidence: number;
  timeToExpiryScore: 'Low' | 'Medium' | 'High' | 'Critical';
  historicalDemand: 'Low' | 'Medium' | 'Strong';
  currentDemand: 'Low' | 'Moderate' | 'Strong';
  careHubNeedLevel: 'Low' | 'Medium' | 'High';
  ngoNeedLevel?: 'Low' | 'Medium' | 'High';
  recommendedMode: RescueMode;
  explanation: string;
  projectedRevenue: number;
  projectedImpactMeals: number;
}

export interface WasteInsight {
  id: string;
  title: string;
  headline: string;
  peakSurplusTime: string;
  recurringPattern: string;
  recommendation: string;
  potentialSavings: string;
  category: string;
  confidence: number;
}
