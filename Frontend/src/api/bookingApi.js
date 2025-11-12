// This file will hold all API calls for creating and viewing bookings
// should use export const createBooking = (axiosPrivate, bookingData) => { ... }
// should use export const getMyBookings = (axiosPrivate) => { ... }
/**
 * Fetches all bookings for the currently logged-in user.
 * @param {object} axiosPrivate - The authenticated axios instance.
 */
export const getMyBookings = (axiosPrivate) => {
  return axiosPrivate.get('/bookings/mybookings');
};


/**
 * Creates a new booking.
 * @param {object} axiosPrivate - authenticated axios instance.
 * @param {object} bookingData - CreateBookingDto object.
 */
export const createBooking = (axiosPrivate, bookingData) => {
  return axiosPrivate.post('/bookings', bookingData);
};

/**
 * Cancels a booking.
 * @param {object} axiosPrivate - The authenticated axios instance.
 * @param {number} bookingId - The ID of the booking to cancel.
 */

// bookingApi.js
export const getBookingsByManager = (axiosPrivate, managerId) => {
    return axiosPrivate.get(`/Bookings/all/${managerId}`);
};
export const cancelBooking = async (axiosPrivate, bookingId) => {
    return await axiosPrivate.put(`/Bookings/${bookingId}/cancel`);
};
