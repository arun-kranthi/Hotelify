import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const UserNavbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // Get user and logout from AuthContext

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
        <Link className="navbar-brand fw-bold" to="/hotels">
          <i className="bi bi-building"></i> Hotelify
        </Link>
        
        {/* Navbar Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#userNavbar"
          aria-controls="userNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="userNavbar">
          <ul className="navbar-nav ms-auto align-items-center">
            
            {/* Standard Nav Links */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/hotels">
                Hotels
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/my-bookings">
                My Bookings
              </NavLink>
            </li>
            
            {/* User Dropdown */}
            <li className="nav-item dropdown ms-2">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                {/* Use the user's name from context */}
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
                  {/* Logout Button */}
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
            
            {/* Theme Toggle Button */}
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

export default UserNavbar;