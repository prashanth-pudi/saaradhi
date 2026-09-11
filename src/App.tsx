/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { FlashRescueBanner } from './components/common/FlashRescueBanner';
import { DemoWalkthroughModal } from './components/common/DemoWalkthroughModal';

// Pages
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ListingDetailPage } from './pages/ListingDetailPage';
import { BusinessDashboard } from './pages/BusinessDashboard';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { NewListingWizard } from './pages/NewListingWizard';
import { CareHubDashboard, NgoDashboard } from './pages/NgoDashboard';
import { RiderDashboard, VolunteerDashboard } from './pages/VolunteerDashboard';
import { OrderStatusPage } from './pages/OrderStatusPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { MapPage } from './pages/MapPage';
import { ReportsPage } from './pages/ReportsPage';
import { AuthPage } from './pages/AuthPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderRoute = () => {
    if (currentRoute === '/' || currentRoute === '') {
      return <HomePage />;
    }
    if (currentRoute === '/marketplace') {
      return <MarketplacePage />;
    }
    if (currentRoute.startsWith('/listing/')) {
      const listingId = currentRoute.replace('/listing/', '');
      return <ListingDetailPage listingId={listingId} />;
    }
    if (currentRoute.startsWith('/order-status')) {
      const orderId = currentRoute.replace('/order-status/', '').replace('/order-status', '');
      return <OrderStatusPage orderId={orderId || undefined} />;
    }
    if (currentRoute === '/dashboard/business') {
      return <BusinessDashboard />;
    }
    if (currentRoute === '/dashboard/customer') {
      return <CustomerDashboard />;
    }
    if (currentRoute === '/listings/new') {
      return <NewListingWizard />;
    }
    if (currentRoute === '/care-hub' || currentRoute === '/ngo') {
      return <CareHubDashboard />;
    }
    if (currentRoute === '/rider' || currentRoute === '/volunteer') {
      return <RiderDashboard />;
    }
    if (currentRoute === '/admin') {
      return <AdminDashboard />;
    }
    if (currentRoute === '/map') {
      return <MapPage />;
    }
    if (currentRoute === '/reports' || currentRoute === '/insights') {
      return <ReportsPage />;
    }
    if (currentRoute === '/auth') {
      return <AuthPage />;
    }

    // Default fallback
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#0F2922] font-sans antialiased selection:bg-[#FF5D38] selection:text-white">
      {/* Urgent city flash rescue notification banner */}
      <FlashRescueBanner />

      {/* Primary Sticky Header */}
      <Navbar />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer />

      {/* Interactive 15-Step Hackathon Walkthrough Demo Runner Modal */}
      <DemoWalkthroughModal />

      {/* Real-time Feedback Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
