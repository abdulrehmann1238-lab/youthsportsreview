import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoAuthProvider } from './context/DemoAuthContext';
import { DemoDataProvider } from './context/DemoDataContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { DemoRoleSwitcher } from './components/common/DemoRoleSwitcher';
import { LoadingScreen } from './components/common/LoadingScreen';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { OrganizationDetail } from './pages/OrganizationDetail';
import { Marketplace } from './pages/Marketplace';
import { ListingDetail } from './pages/ListingDetail';
import { Membership } from './pages/Membership';
import { Advertising } from './pages/Advertising';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { WriteReview } from './pages/WriteReview';
import { UserDashboard } from './pages/UserDashboard';
import { OrganizationDashboard } from './pages/OrganizationDashboard';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DemoAuthProvider>
        <DemoDataProvider>
          <ToastProvider>
            {/* Initial loading screen */}
            <LoadingScreen />

            {/* Scroll reset helper */}
            <ScrollToTop />

            {/* Main Application Layout */}
            <div className="flex flex-col min-h-screen bg-warm-50 text-navy-900 font-sans">
              <Navbar />

              {/* Floating Demo Perspective Switcher & Tour Guide */}
              <DemoRoleSwitcher />

              {/* Route Definitions */}
              <div className="flex-1">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="/organizations/:slug" element={<OrganizationDetail />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/marketplace/:slug" element={<ListingDetail />} />
                  <Route path="/membership" element={<Membership />} />
                  <Route path="/advertising" element={<Advertising />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Review writing wizard */}
                  <Route path="/write-review" element={<WriteReview />} />

                  {/* Member Dashboard routes */}
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/dashboard/reviews" element={<UserDashboard />} />
                  <Route path="/dashboard/saved" element={<UserDashboard />} />
                  <Route path="/dashboard/membership" element={<UserDashboard />} />
                  <Route path="/dashboard/profile" element={<UserDashboard />} />

                  {/* Organization Dashboard routes */}
                  <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
                  <Route path="/organization/profile" element={<OrganizationDashboard />} />
                  <Route path="/organization/reviews" element={<OrganizationDashboard />} />
                  <Route path="/organization/analytics" element={<OrganizationDashboard />} />
                  <Route path="/organization/marketplace" element={<OrganizationDashboard />} />
                  <Route path="/organization/advertising" element={<OrganizationDashboard />} />

                  {/* Catch-all redirect */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>

              <Footer />
            </div>
          </ToastProvider>
        </DemoDataProvider>
      </DemoAuthProvider>
    </BrowserRouter>
  );
};

export default App;
