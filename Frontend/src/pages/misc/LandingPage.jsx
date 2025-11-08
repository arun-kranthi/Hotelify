import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="container-fluid bg-primary text-light p-5 text-center" >
        
        <h1 className="display-4 fw-bold">Welcome to Hotelify</h1>
        <p className="lead">
          Find and book your perfect stay, hassle-free.
        </p>
        <Link to="/signup" className="btn btn-light btn-lg fw-bold">
          Get Started
        </Link>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Features</h2>
        <div className="row">
          <div className="col-md-4 text-center p-3">
            <i className="bi bi-search fs-2 text-primary"></i> {/* Example using Bootstrap Icons */}
            <h3>Easy Booking</h3>
            <p>Search, select, and book your room in just a few clicks.</p>
          </div>
          <div className="col-md-4 text-center p-3">
            <i className="bi bi-clipboard-data fs-2 text-primary"></i>
            <h3>Manage Stays</h3>
            <p>Hotel managers can easily manage their rooms and bookings.</p>
          </div>
          <div className="col-md-4 text-center p-3">
            <i className="bi bi-shield-lock fs-2 text-primary"></i>
            <h3>Admin Control</h3>
            <p>Full administrative control over users, hotels, and reports.</p>
          </div>
        </div>
      </div>
      
      {/* About Us/Team Section (Placeholder) */}
      <div className="container my-5 p-5 rounded">
         <div className="row">
            <div className="col text-center">
              <h2>About the Team</h2>
              <p>We are a passionate team of developers dedicated to creating the best hotel booking experience.</p>
              <Link to="/about" className="btn btn-outline-primary">Learn More</Link>
            </div>
         </div>
      </div>
    </>
  );
};

export default LandingPage;