// This file will hold all API calls for the Hotel Manager
// e.g., export const getRoomsByHotel = (axiosPrivate, hotelId) => { ... }
// e.g., export const createRoom = (axiosPrivate, roomData) => { ... }
// This file should already exist, add this new function to it.
// (We'll assume you have a /api/rooms/hotel/{hotelId} endpoint)

/**
 * Fetches all rooms for a specific hotel.
 * @param {object} axiosPrivate - The authenticated axios instance.
 * @param {string} hotelId - The ID of the hotel.
 */
export const getRoomsByHotelId = (axiosPrivate, hotelId) => {
  // This is the fix:
  // Call the 'search' endpoint and pass the hotelId as a query parameter.
  return axiosPrivate.get(`/rooms/search?hotelId=${hotelId}`);
};