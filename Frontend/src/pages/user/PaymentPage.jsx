import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the booking data passed from the BookingPage
  const booking = location.state?.booking;

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // If no booking data, redirect home
  if (!booking) {
    navigate('/');
  }

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate a 2-second payment processing
    setPaymentSuccess(true);
    setTimeout(() => {
      navigate('/my-bookings', { state: { message: 'Booking confirmed!' } });
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="container text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h2 className="mt-3">Payment Successful!</h2>
        <p>Confirming your booking and redirecting...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h1 className="text-center fw-bold mb-4">Mock Payment</h1>
              <p className="text-center fs-4">
                Total Amount: <span className="text-primary fw-bold">${booking.totalAmount.toFixed(2)}</span>
              </p>
              <p className="text-center text-muted">Booking ID: {booking.bookingID}</p>
              
              <form onSubmit={handlePayment}>
                {/* Dummy Credit Card Form */}
                <div className="mb-3">
                  <label htmlFor="cardName" className="form-label">Name on Card</label>
                  <input type="text" id="cardName" className="form-control" defaultValue="Arun" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Card Number</label>
                  <input type="text" id="cardNumber" className="form-control" defaultValue="1234 5678 9012 3456" required />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="expiry" className="form-label">Expiry</label>
                    <input type="text" id="expiry" className="form-control" defaultValue="12/28" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input type="text" id="cvv" className="form-control" defaultValue="123" required />
                  </div>
                </div>
                
                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Pay Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;