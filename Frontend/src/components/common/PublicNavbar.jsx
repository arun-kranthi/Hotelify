import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// Import the useTheme hook
import { useTheme } from '../../context/ThemeContext';

const PublicNavbar = () => {
  // Get the theme and toggle function from the context
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`
    navbar navbar-expand-lg 
    ${theme === 'light' ? 'navbar-light bg-light' : 'navbar-dark bg-dark'} 
    shadow-sm
  `}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-building"></i> Hotelify
        </Link>
        
        {/* Navbar Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#publicNavbar"
          aria-controls="publicNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="publicNavbar">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* --- Our original links --- */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item ms-2">
              <Link className="btn btn-primary" to="/signup">
                Register
              </Link>
            </li>

            {/* Add the Theme Toggle Button */}
            <li className="nav-item ms-2">
              <button 
                className="btn btn-outline-secondary" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {/* Show a different icon based on the theme */}
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;