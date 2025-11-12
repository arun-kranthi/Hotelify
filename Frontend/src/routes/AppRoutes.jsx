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
import ManageUsers from '../pages/admin/ManageUsers';
import ManageHotels from '../pages/admin/ManageHotels';
import HotelDetails from '../pages/user/HotelDetails';
import ManageRooms from '../pages/manager/ManageRooms';
// We'll create this component later, just make a placeholder for now
import BookingPage from '../pages/user/BookingPage';
import PaymentPage from '../pages/user/PaymentPage';
import MyBookingsPage from '../pages/user/MyBookingsPage';
import ProfilePage from '../pages/user/Profile.jsx';
import ViewBookings from '../pages/manager/ViewBookings';

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
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
          <Route path="/book/:hotelId" element={<BookingPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />

        </Route>
      </Route>

      {/* --- Manager Routes --- */}
      <Route element={<ProtectedRoute allowedRoles={['HotelManager']} />}>
        <Route element={<ManagerLayout />}>
                  <Route path="/manager/dashboard" element={<ManagerDashboard />} />
                  <Route path="/manager/manage-rooms" element={<ManageRooms />} />
                  <Route path="/manager/bookings" element={<ViewBookings />} />
          {/* Add other manager routes here (e.g., /manager/rooms) */}
        </Route>
      </Route>
      
      {/* --- Admin Routes --- */}
      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/manage-users" element={<ManageUsers />} />
                  <Route path="/admin/manage-hotels" element={<ManageHotels />} />
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