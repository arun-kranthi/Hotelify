import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import DashboardNavbar from '../components/common/DashboardNavbar';
import './Layouts.css'; //for sidebar styles

const AdminLayout = () => {
  return (
    <div className="layout-container">
      <DashboardNavbar />
      <div className="container-fluid">
        <div className="row">
          {/* Admin Sidebar */}
          <nav 
            id="sidebarMenu" 
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="position-sticky pt-3">
              <h5 className="sidebar-heading px-3 mt-4 mb-1 text-muted">
                Admin Menu
              </h5>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/manage-users">
                    Manage Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/manage-hotels">
                    Manage Hotels
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="pt-3">
              {/* This Outlet renders the specific admin page */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;