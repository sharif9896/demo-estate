import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import Agents from './pages/Agents';
import AgentDetail from './pages/AgentDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import SavedProperties from './pages/SavedProperties';
import UserProtectedRoute from './components/UserProtectedRoute';

import AdminLogin from './pages/admin/AdminLogin';
import AdminSignup from './pages/admin/AdminSignup';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageListings from './pages/admin/ManageListings';
import ListingForm from './pages/admin/ListingForm';
import ManageAgents from './pages/admin/ManageAgents';
import ManagePages from './pages/admin/ManagePages';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <div className="min-h-screen flex flex-col">
      {!location.pathname.startsWith('/admin') && <Navbar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Listings purpose="buy" />} />
          <Route path="/rent" element={<Listings purpose="rent" />} />
          <Route path="/property/:slug" element={<PropertyDetail />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/agents/:id" element={<AgentDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/saved-properties" element={<UserProtectedRoute><SavedProperties /></UserProtectedRoute>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/listings" element={<ProtectedRoute><ManageListings /></ProtectedRoute>} />
          <Route path="/admin/listings/new" element={<ProtectedRoute><ListingForm /></ProtectedRoute>} />
          <Route path="/admin/listings/:id" element={<ProtectedRoute><ListingForm /></ProtectedRoute>} />
          <Route path="/admin/agents" element={<ProtectedRoute><ManageAgents /></ProtectedRoute>} />
          <Route path="/admin/pages" element={<ProtectedRoute><ManagePages /></ProtectedRoute>} />
        </Routes>
      </div>
      {!location.pathname.startsWith('/admin') && <Footer />}
    </div>
  );
}
