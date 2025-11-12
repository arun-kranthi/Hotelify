import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { cancelBooking } from '../../api/bookingApi';

const CancelBookingModal = ({ show, handleClose, booking, onCancelSuccess }) => {
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleConfirmCancel = async () => {
    setError('');
    setSubmitting(true);
    try {
      await cancelBooking(axiosPrivate, booking.bookingID);
      onCancelSuccess("Booking successfully cancelled.");
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel booking.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cancel Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <p>Are you sure you want to cancel your booking for <b>{booking.hotelName}</b>?</p>
        <p className="text-muted">
          Check-in: {new Date(booking.checkInDate).toLocaleDateString()}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={submitting}>
          Go Back
        </Button>
        <Button variant="danger" onClick={handleConfirmCancel} disabled={submitting}>
          {submitting ? 'Cancelling...' : 'Yes, Cancel'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelBookingModal;