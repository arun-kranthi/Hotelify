// This file will hold all API calls related to rooms
/**
 * Fetches all rooms for a specific hotel.
 * @param {object} axiosPrivate - The authenticated axios instance.
 * @param {string} hotelId - The ID of the hotel.
 */
export const getRoomsByHotelId = (axiosPrivate, hotelId) => {
  // Call the 'search' endpoint and pass the hotelId as a query parameter.
  return axiosPrivate.get(`/rooms/search?hotelId=${hotelId}`);
};