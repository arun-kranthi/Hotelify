import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hotel1.jpg'; // Use one of your hotel images
import teamMemberPlaceholder from '../../assets/images/placeholder.png'; // A generic 1:1 image for team

// A custom CSS hook for the hero section
const heroStyle = {
  // Use vh (viewport height) minus navbar height
  minHeight: 'calc(100vh - 56px)', 
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
};

const LandingPage = () => {
  return (
    <>
      {/* ================================== */}
      {/* 1. NEW HERO SECTION                */}
      {/* ================================== */}
      <div 
        className="d-flex align-items-center justify-content-center text-center text-white" 
        style={heroStyle}
      >
        <div className="container">
          <h1 className="display-3 fw-bold">Your perfect stay, just a click away.</h1>
          <p className="lead fs-3 my-4">
            Book with Hotelify and find your next dream destination.
          </p>
          <Link to="/signup" className="btn btn-primary btn-lg fw-bold px-5 py-3">
            Get Started
          </Link>
        </div>
      </div>

      {/* ================================== */}
      {/* 2. FEATURES SECTION (with icons)   */}
      {/* ================================== */}
      <div className="container my-5 py-5">
        <h2 className="text-center fw-bold display-6 mb-5">Why Choose Hotelify?</h2>
        <div className="row g-4">
          <div className="col-md-4 text-center">
            <div className="p-4">
              <i className="bi bi-search fs-1 text-primary"></i>
              <h3 className="fw-bold my-3">Easy Search</h3>
              <p className="text-muted">Quickly find and filter thousands of hotels in Chennai, Hyderabad, and Bangalore.</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="p-4">
              <i className="bi bi-shield-lock-fill fs-1 text-primary"></i>
              <h3 className="fw-bold my-3">Secure Booking</h3>
              <p className="text-muted">Your payments and personal data are always safe with our secure system.</p>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <div className="p-4">
              <i className="bi bi-clipboard-data fs-1 text-primary"></i>
              <h3 className="fw-bold my-3">Manage Your Stay</h3>
              <p className="text-muted">For admins and managers, a powerful dashboard to control everything.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================================== */}
      {/* 3. MEET THE TEAM SECTION           */}
      {/* ================================== */}
      <div className="bg-body-secondary py-5">
        <div className="container my-5">
          <h2 className="text-center fw-bold display-6 mb-5">Meet the Team</h2>
          <div className="row g-4 justify-content-center">
            
            {/* Team Member Card (Repeat 5 times) */}
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="card border-0 text-center shadow-sm h-100">
                <img src={teamMemberPlaceholder} className="card-img-top rounded-circle p-3" alt="Team Member" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Arun</h5>
                  <p className="card-text text-primary">2446428</p>
                </div>
              </div>
            </div>

            {/* Repeat this card for your 5 team members */}
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="card border-0 text-center shadow-sm h-100">
                <img src={teamMemberPlaceholder} className="card-img-top rounded-circle p-3" alt="Team Member" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Sravan</h5>
                  <p className="card-text text-primary">2446391</p>
                </div>
              </div>
            </div>
            {/* ... add 3 more ... */}
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="card border-0 text-center shadow-sm h-100">
                <img src={teamMemberPlaceholder} className="card-img-top rounded-circle p-3" alt="Team Member" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Abhihaas</h5>
                  <p className="card-text text-primary"></p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="card border-0 text-center shadow-sm h-100">
                <img src={teamMemberPlaceholder} className="card-img-top rounded-circle p-3" alt="Team Member" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Chandana</h5>
                  <p className="card-text text-primary"></p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="card border-0 text-center shadow-sm h-100">
                <img src={teamMemberPlaceholder} className="card-img-top rounded-circle p-3" alt="Team Member" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">Keerthana</h5>
                  <p className="card-text text-primary"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================== */}
      {/* 4. FINAL CTA SECTION               */}
      {/* ================================== */}
      <div className="container my-5 py-5 text-center">
        <h2 className="fw-bold display-6 mb-4">Ready to find your next destination?</h2>
        <Link to="/signup" className="btn btn-primary btn-lg fw-bold px-5 py-3">
          Sign Up Now
        </Link>
      </div>
    </>
  );
};

export default LandingPage;