// This file will hold all API calls for creating and viewing bookings
// e.g., export const createBooking = (axiosPrivate, bookingData) => { ... }
// e.g., export const getMyBookings = (axiosPrivate) => { ... }
/**
 * Fetches all bookings for the currently logged-in user.
 * @param {object} axiosPrivate - The authenticated axios instance.
 */
export const getMyBookings = (axiosPrivate) => {
  // This now matches your new .NET endpoint
  return axiosPrivate.get('/bookings/mybookings');
};


/**
 * Creates a new booking.
 * @param {object} axiosPrivate - The authenticated axios instance.
 * @param {object} bookingData - The CreateBookingDto object.
 */
export const createBooking = (axiosPrivate, bookingData) => {
  return axiosPrivate.post('/bookings', bookingData);
};

// bookingApi.js
export const getBookingsByManager = (axiosPrivate, managerId) => {
    return axiosPrivate.get(`/Bookings/all/${managerId}`);
};
export const cancelBooking = async (axiosPrivate, bookingId) => {
    return await axiosPrivate.put(`/Bookings/${bookingId}/cancel`);
};
