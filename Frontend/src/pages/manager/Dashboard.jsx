import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAdminAxios from '../../hooks/useAdminAxios';

const ManagerDashboard = () => {
  const axiosPrivate = useAdminAxios();
  const [managerName, setManagerName] = useState('');


  return (
    <div className="container my-5">
      
      <h1 className="mb-4">Welcome, Manager</h1>
      <p className="text-muted">Overview of your hotel management tasks</p>

      <div className="row g-4">
        {/* Rooms */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Manage Rooms</h5>
              <p className="card-text">Add, update, or remove rooms.</p>
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">View Bookings</h5>
              <p className="card-text">Monitor bookings and ensure smooth check-ins.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

