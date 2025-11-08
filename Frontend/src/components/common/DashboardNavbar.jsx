import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const DashboardNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  // 1. Get auth data
  const { user, logout, roles } = useAuth();

  // 2. Determine the correct "home" link for the brand icon
  const getHomeLink = () => {
    if (roles.includes('Admin')) return '/admin/dashboard';
    if (roles.includes('HotelManager')) return '/manager/dashboard';
    return '/'; // Fallback
  };

  return (
    <nav 
      className={`
        navbar navbar-expand-lg 
        ${theme === 'light' ? 'navbar-light bg-light' : 'navbar-dark bg-dark'} 
        shadow-sm
        fixed-top 
      `}
    >
      <div className="container">
        {/* 3. Use the dynamic home link */}
        <Link className="navbar-brand fw-bold" to={getHomeLink()}>
          <i className="bi bi-building"></i> Hotelify (Admin)
        </Link>
        
        {/* Navbar Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#dashboardNavbar"
          aria-controls="dashboardNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="dashboardNavbar">
          {/* We have no main nav links, just the user dropdown */}
          <ul className="navbar-nav ms-auto align-items-center">
            
            {/* User Dropdown (Everyone sees this) */}
            <li className="nav-item dropdown ms-2">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Welcome, {user?.username || 'User'}
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
            
            {/* Theme Toggle (Everyone sees this) */}
            <li className="nav-item ms-2">
              <button 
                className="btn btn-outline-secondary" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;