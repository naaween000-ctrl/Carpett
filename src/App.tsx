import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { AIChatbot } from './components/ui/AIChatbot';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Catalogue } from './pages/Catalogue';
import { ProductDetail } from './pages/ProductDetail';
import { RetailEnquiry } from './pages/RetailEnquiry';
import { WholesaleEnquiry } from './pages/WholesaleEnquiry';
import { InternationalEnquiry } from './pages/InternationalEnquiry';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

// Helper component to auto-scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout wrapper for user-facing pages
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <AIChatbot />
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes (No default website footer) */}
        <Route
          path="/admin/login"
          element={
            <div className="min-h-screen bg-charcoal-900">
              <Navbar />
              <AdminLogin />
            </div>
          }
        />
        <Route
          path="/admin"
          element={
            <div className="min-h-screen bg-stone-100">
              <Navbar />
              <AdminDashboard />
            </div>
          }
        />

        {/* Public Website Routes */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/catalogue"
          element={
            <MainLayout>
              <Catalogue />
            </MainLayout>
          }
        />
        <Route
          path="/carpets/:slug"
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />
        <Route
          path="/enquiry/retail"
          element={
            <MainLayout>
              <RetailEnquiry />
            </MainLayout>
          }
        />
        <Route
          path="/enquiry/wholesale"
          element={
            <MainLayout>
              <WholesaleEnquiry />
            </MainLayout>
          }
        />
        <Route
          path="/enquiry/international"
          element={
            <MainLayout>
              <InternationalEnquiry />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
