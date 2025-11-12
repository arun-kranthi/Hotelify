import React, { useState } from 'react';

import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
import { addReview } from '../../api/reviewApi.js';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext.jsx';
import StarRating from './StarRating.jsx';

const AddReviewModal = ({ show, handleClose, booking, onReviewSuccess }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // For success message
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    setShowSuccess(false);

    const reviewData = {
      HotelId: booking.hotelID, 
      rating: parseInt(rating),
      comment: comment,
    };

    try {
      await addReview(axiosPrivate, user.id, reviewData);
      setSubmitting(false);
      setShowSuccess(true); // Show success message
      
      // Close modal and refresh after 2 seconds
      setTimeout(() => {
        onReviewSuccess("Review submitted successfully!");
        handleClose();
        setShowSuccess(false); // Reset for next time
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review.");
      setSubmitting(false);
    }
  };

  // Reset form when modal is reopened
  const handleEnter = () => {
    setRating(5);
    setComment('');
    setError('');
    setShowSuccess(false);
    setSubmitting(false);
  };

  return (
    <Modal show={show} onHide={handleClose} onEnter={handleEnter} centered>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review for {booking.hotelName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {showSuccess && <Alert variant="success">Thank you! Your review was submitted.</Alert>}

        {/* Hide form on success */}
        {!showSuccess && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="rating">
              <Form.Label>Rating</Form.Label>
              <StarRating rating={rating} setRating={setRating} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your stay..."
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={submitting} className="w-100">
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddReviewModal;