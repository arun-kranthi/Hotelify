import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import DashboardNavbar from '../components/common/DashboardNavbar';
import './Layouts.css'; // Re-using the same CSS file

const ManagerLayout = () => {
  return (
    <div className="layout-container">
      <DashboardNavbar />
      <div className="container-fluid">
        <div className="row">
          {/* Manager Sidebar */}
          <nav 
            id="sidebarMenu" 
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <h5 className="sidebar-heading px-3 mt-4 mb-1 text-muted">
                Manager Menu
              </h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/manager/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/manager/manage-rooms">
                    Manage Rooms
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/manager/bookings">
                    View Bookings
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/manager/hotel-info">
                    Hotel Info
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="pt-3">
              {/* This Outlet renders the specific manager page */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ManagerLayout;