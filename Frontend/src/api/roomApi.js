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

export const getRoomsByHotel = async (axiosPrivate, hotelId) => {
    const response = await axiosPrivate.get(`/Rooms/search?hotelId=${hotelId}`);
    return response.data;
};

export const deleteRoom = async (axiosPrivate, id) => {
    const response = await axiosPrivate.delete(`/Rooms/${id}`);
    return response.data;
};

export const createRoom = async (axiosPrivate, roomData) => {
    const response = await axiosPrivate.post('/Rooms', roomData);
    return response.data;
};

export const updateRoom = async (axiosPrivate, id, roomData) => {
    const response = await axiosPrivate.put(`/Rooms/${id}`, roomData);
    return response.data;
};