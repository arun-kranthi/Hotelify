import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getMyBookings } from '../../api/bookingApi';
import AddReviewModal from '../../components/user/AddReviewModal';
import { useLocation } from 'react-router-dom';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  // For the modal
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const successMessage = location.state?.message;

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMyBookings(axiosPrivate);
      setBookings(response.data); // Data comes from our new DTO
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [axiosPrivate]);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
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
                    <span className={`badge bg-${booking.status === 'Confirmed' ? 'success' : 'secondary'} fs-6 mb-3`}>
                      {booking.status}
                    </span>
                    <br />
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleOpenModal(booking)}
                    >
                      Leave a Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>You have no bookings.</p>
        )}
      </div>

      {selectedBooking && (
        <AddReviewModal 
          show={showModal}
          handleClose={handleCloseModal}
          booking={selectedBooking}
          onReviewSubmitted={fetchBookings}
        />
      )}
    </>
  );
};

export default MyBookingsPage;