import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts
import PublicLayout from '../layouts/PublicLayout';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';
import ManagerLayout from '../layouts/ManagerLayout';

// Import Route Guard
import ProtectedRoute from './ProtectedRoute';

// Import Public Pages
import LandingPage from '../pages/misc/LandingPage';
import About from '../pages/misc/About';
import NotFound from '../pages/misc/NotFound';

// Import Auth Pages
import Login from '../pages/auth/login';
import Signup from '../pages/auth/Signup';
import Unauthorized from '../pages/auth/Unauthorized';

// Import App Pages (Placeholders for now)
import HotelList from '../pages/user/HotelList';
import AdminDashboard from '../pages/admin/Dashboard';
import ManagerDashboard from '../pages/manager/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ====================================================== */}
      {/* PUBLIC ROUTES                                          */}
      {/* =ax=================================================== */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* ====================================================== */}
      {/* AUTH ROUTES                                            */}
      {/* ====================================================== */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ====================================================== */}
      {/* PROTECTED ROUTES                                       */}
      {/* ====================================================== */}

      {/* --- User Routes --- */}
      <Route element={<ProtectedRoute allowedRoles={['User', 'Admin', 'HotelManager']} />}>
        <Route element={<UserLayout />}>
          {/* Note: We add all roles here so admins/managers can also see user pages */}
          <Route path="/hotels" element={<HotelList />} />
          {/* Add other user routes here (e.g., /my-bookings, /profile) */}
        </Route>
      </Route>

      {/* --- Manager Routes --- */}
      <Route element={<ProtectedRoute allowedRoles={['HotelManager']} />}>
        <Route element={<ManagerLayout />}>
          <Route path="/manager/dashboard" element={<ManagerDashboard />} />
          {/* Add other manager routes here (e.g., /manager/rooms) */}
        </Route>
      </Route>
      
      {/* --- Admin Routes --- */}
      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* Add other admin routes here (e.g., /admin/users) */}
        </Route>
      </Route>

      {/* ====================================================== */}
      {/* CATCH ALL (404)                                        */}
      {/* ====================================================== */}
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  );
};

export default AppRoutes;