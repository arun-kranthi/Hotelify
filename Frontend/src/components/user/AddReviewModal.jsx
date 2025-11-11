import React, { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { addReview } from '../../api/reviewApi';
import { Modal, Button, Form } from 'react-bootstrap';

const AddReviewModal = ({ show, handleClose, booking, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const reviewData = {
      hotelId: booking.hotelID, // From our new UserBookingDto
      rating: parseInt(rating),
      comment: comment,
    };

    try {
      await addReview(axiosPrivate, reviewData);
      setSubmitting(false);
      onReviewSubmitted(); // Refresh list on submit
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review.");
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review for {booking.hotelName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Select 
              value={rating} 
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="5">⭐️⭐️⭐️⭐️⭐️ (Excellent)</option>
              <option value="4">⭐️⭐️⭐️⭐️ (Great)</option>
              <option value="3">⭐️⭐️⭐️ (Good)</option>
              <option value="2">⭐️⭐️ (Fair)</option>
              <option value="1">⭐️ (Poor)</option>
            </Form.Select>
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
      </Modal.Body>
    </Modal>
  );
};

export default AddReviewModal;