import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getMyBookings } from '../../api/bookingApi';
import AddReviewModal from '../../components/user/AddReviewModal';
import CancelBookingModal from '../../components/user/CancelBookingModal'; // 1. Import
import { useLocation } from 'react-router-dom';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  // 2. State for modals
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // 3. State for success messages
  const [successMessage, setSuccessMessage] = useState(location.state?.message);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMyBookings(axiosPrivate);
      setBookings(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // Clear the navigation message after we've shown it once
    window.history.replaceState({}, document.title)
  }, [axiosPrivate]);

  // 4. Handlers for modals
  const handleOpenReviewModal = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  const handleOpenCancelModal = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const handleCloseModals = () => {
    setSelectedBooking(null);
    setShowReviewModal(false);
    setShowCancelModal(false);
  };

  // 5. Unified success handler
  const handleSuccess = (message) => {
    handleCloseModals();
    setSuccessMessage(message);
    fetchBookings(); // Refresh the list
  };

  if (loading) return <p className="text-center mt-5">Loading your bookings...</p>;
  if (error) return <p className="text-center text-danger mt-5">Error: {error}</p>;

  return (
    <>
      <div className="container my-5">
        <h1 className="fw-bold mb-4">My Bookings</h1>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}

        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.bookingID} className="card shadow-sm mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    {/* These properties now match our UserBookingDto */}
                    <h4 className="card-title">{booking.hotelName}</h4>
                    <p className="card-text mb-1">
                      <strong>Room:</strong> {booking.roomType}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Check-In:</strong> {new Date(booking.checkInDate).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                      <strong>Check-Out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="col-md-4 text-end">
                    {/* 6. Updated badge color for Cancelled */}
                    <span className={`badge bg-${booking.status === 'Confirmed' ? 'success' : (booking.status === 'Cancelled' ? 'danger' : 'secondary')} fs-6 mb-3`}>
                      {booking.status}
                    </span>
                    <br />
                    
                    {/* 7. Conditionally show buttons */}
                    {booking.status === 'Confirmed' && (
                      <>
                        <button 
                          className="btn btn-primary me-2"
                          onClick={() => handleOpenReviewModal(booking)}
                        >
                          Leave a Review
                        </button>
                        <button 
                          className="btn btn-outline-danger"
                          onClick={() => handleOpenCancelModal(booking)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>You have no bookings.</p>
        )}
      </div>

      {/* 8. Render both modals */}
      {selectedBooking && (
        <AddReviewModal 
          show={showReviewModal}
          handleClose={handleCloseModals}
          booking={selectedBooking}
          onReviewSuccess={handleSuccess}
        />
      )}
      {selectedBooking && (
        <CancelBookingModal
          show={showCancelModal}
          handleClose={handleCloseModals}
          booking={selectedBooking}
          onCancelSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default MyBookingsPage;