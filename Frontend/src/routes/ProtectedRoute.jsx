import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// Pass the 'roles' this route is allowed for
const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, roles } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // If not logged in, redirect to login page
    // 'replace' stops them from using the "back" button
    // 'state' remembers where they were trying to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Check if the user's roles match any of the allowed roles
  const hasAccess = roles.some(role => allowedRoles.includes(role));

  if (!hasAccess) {
    // If logged in but wrong role, send to an "Unauthorized" page
    return <Navigate to="/unauthorized" replace />;
  }

  // If logged in AND has the correct role, show the page
  return <Outlet />;
};

export default ProtectedRoute;