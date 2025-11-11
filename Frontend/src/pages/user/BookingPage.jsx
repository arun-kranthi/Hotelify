import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useAuth } from '../../context/AuthContext';
import { getRoomsByHotelId } from '../../api/roomApi';
import { getLoyaltyPoints } from '../../api/loyaltyApi';
import { createBooking } from '../../api/bookingApi';

import roomImg from '../../assets/images/room1.jpg'; 

const BookingPage = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  // Form State
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [pointsToRedeem, setPointsToRedeem] = useState(0);

  // Data State
  const [rooms, setRooms] = useState([]);
  const [loyalty, setLoyalty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch rooms and loyalty data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userId = user.id; 

        const [roomsRes, loyaltyRes] = await Promise.all([
          getRoomsByHotelId(axiosPrivate, hotelId),
          getLoyaltyPoints(axiosPrivate, userId)
        ]);
        
        setRooms(roomsRes.data);
        setLoyalty(loyaltyRes.data);
      } catch (err) {
        setError("Failed to load booking data. " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [axiosPrivate, hotelId, user]);

  // Helper function to get the selected room object
  const selectedRoom = useMemo(() => 
    rooms.find(r => r.roomID === parseInt(selectedRoomId)),
  [rooms, selectedRoomId]);

  // Price Calculation Logic
  const { calculatedPrice, discount, finalPrice, days } = useMemo(() => {
    const room = selectedRoom;
    if (!room || !checkIn || !checkOut) {
      return { calculatedPrice: 0, discount: 0, finalPrice: 0, days: 0 };
    }

    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const timeDiff = date2.getTime() - date1.getTime();
    const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (numDays <= 0) {
      return { calculatedPrice: 0, discount: 0, finalPrice: 0, days: 0 };
    }

    const calculatedPrice = numDays * room.price;
    const discount = Math.min(calculatedPrice, pointsToRedeem); // 1 point = 1 Rupee
    const finalPrice = calculatedPrice - discount;

    return { calculatedPrice, discount, finalPrice, days: numDays };
  }, [selectedRoom, checkIn, checkOut, pointsToRedeem]);
  
  // --- DATE FIX 1: Helper function to get min check-out date ---
  const getMinCheckOutDate = () => {
    if (!checkIn) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }
    const parts = checkIn.split('-');
    const checkInDate = new Date(parts[0], parts[1] - 1, parts[2]);
    checkInDate.setDate(checkInDate.getDate() + 1);
    return checkInDate.toISOString().split('T')[0];
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (days <= 0) {
      // --- DATE FIX 2: Correct error message ---
      setError("Check-out date must be after the check-in date.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const bookingData = {
      userID: user.id,
      roomID: parseInt(selectedRoomId),
      checkInDate: checkIn,
      checkOutDate: checkOut,
      pointsToRedeem: parseInt(pointsToRedeem) || 0
    };

    try {
      const response = await createBooking(axiosPrivate, bookingData);
      navigate('/payment', { state: { booking: response.data } });
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading booking options...</p>;

  return (
    <div className="container my-5">
      <div className="row g-5">
        
        {/* --- Column 1: The Form --- */}
        <div className="col-lg-7">
          <h1 className="fw-bold mb-4">Confirm Your Stay</h1>
          
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* 1. Room Selection */}
            <div className="mb-4">
              <label htmlFor="room" className="form-label fs-5">Select Room</label>
              <select 
                id="room" 
                className="form-select form-select-lg"
                value={selectedRoomId}
                onChange={(e) => setSelectedRoomId(e.target.value)}
                required
              >
                <option value="">-- Please select a room --</option>
                {rooms.map(room => (
                  <option key={room.roomID} value={room.roomID}>
                    {/* --- CURRENCY FIX 1 --- */}
                    {room.type} (₹{room.price} / night)
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Date Selection (with FIX) */}
            <div className="row mb-4">
              <div className="col">
                <label htmlFor="checkIn" className="form-label fs-5">Check-In Date</label>
                <input 
                  type="date" 
                  id="checkIn" 
                  className="form-control form-control-lg"
                  value={checkIn}
                  min={new Date().toISOString().split('T')[0]} 
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (checkOut && new Date(e.target.value) >= new Date(checkOut)) {
                      setCheckOut('');
                    }
                  }}
                  required 
                />
              </div>
              <div className="col">
                <label htmlFor="checkOut" className="form-label fs-5">Check-Out Date</label>
                <input 
                  type="date" 
                  id="checkOut" 
                  className="form-control form-control-lg"
                  value={checkOut}
                  min={getMinCheckOutDate()} // <-- DATE FIX 3
                  onChange={(e) => setCheckOut(e.target.value)}
                  required 
                />
              </div>
            </div>

            {/* 3. Loyalty Points */}
            {loyalty && loyalty.pointsBalance > 0 && (
              <div className="mb-4">
                <label htmlFor="points" className="form-label fs-5">
                  Redeem Loyalty Points
                </label>
                <p className="text-muted">
                  You have: <span className="fw-bold text-primary">{loyalty.pointsBalance}</span> points available.
                </p>
                <div className="input-group">
                  <input 
                    type="number" 
                    id="points" 
                    className="form-control form-control-lg"
                    value={pointsToRedeem}
                    onChange={(e) => setPointsToRedeem(Math.max(0, Math.min(loyalty.pointsBalance, e.target.value)))}
                    max={loyalty.pointsBalance}
                    min="0"
                  />
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={() => setPointsToRedeem(loyalty.pointsBalance)}
                  >
                    Use Max
                  </button>
                </div>
              </div>
            )}
            
            <hr className="my-4" />

            {/* 4. Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-100 py-3" 
              disabled={submitting || !selectedRoomId || !checkIn || !checkOut}
            >
              {submitting ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </form>
        </div>

        {/* --- Column 2: The Summary Card (with Currency Fixes) --- */}
        <div className="col-lg-5">
          <div className="card shadow-lg" style={{ position: 'sticky', top: '80px' }}>
            <img src={roomImg} className="card-img-top" alt="Room" style={{height: '200px', objectFit: 'cover'}} />
            <div className="card-body p-4">
              <h3 className="card-title fw-bold">Booking Summary</h3>
              
              {(!selectedRoom || days <= 0) ? (
                <p className="text-muted">Please select a room and valid dates.</p>
              ) : (
                <>
                  <div className="d-flex justify-content-between my-3">
                    <span className="fs-5">{selectedRoom.roomType}</span>
                    {/* --- CURRENCY FIX 2 --- */}
                    <span className="fs-5">₹{selectedRoom.price} x {days} {days > 1 ? 'nights' : 'night'}</span>
                  </div>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between">
                    {/* --- CURRENCY FIX 3 --- */}
                    <p className="fs-5">Total (INR)</p>
                    <p className="fs-5">₹{calculatedPrice.toFixed(2)}</p>
                  </div>
                  
                  {discount > 0 && (
                    <div className="d-flex justify-content-between text-danger">
                      <p className="fs-5">Loyalty Discount</p>
                      {/* --- CURRENCY FIX 4 --- */}
                      <p className="fs-5">-₹{discount.toFixed(2)}</p>
                    </div>
                  )}
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="fs-4 fw-bold mb-0">Final Price</p>
                    {/* --- CURRENCY FIX 5 --- */}
                    <p className="fs-4 fw-bold text-primary mb-0">₹{finalPrice.toFixed(2)}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default BookingPage;