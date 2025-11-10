/**
 * Fetches all hotels from the server.
 * @param {object} axiosPrivate - The authenticated axios instance.
 * @returns {Promise<object>} The API response.
 */
export const getAllHotels = (axiosPrivate) => {
  // This will make a GET request to:
  // [your_base_url]/api/hotels
  return axiosPrivate.get('/Hotels');
};

/**
 * Fetches a single hotel by its ID.
 * @param {object} axiosPrivate - The authenticated axios instance.
 * @param {string} hotelId - The ID of the hotel to fetch.
 * OFA_REMOVED_COMMENT
 */
export const getHotelById = (axiosPrivate, hotelId) => {
  return axiosPrivate.get(`/Hotels/${hotelId}`);
};