import { axiosPrivate } from './axiosInstance';

export const getAllHotels = async (axiosPrivate) => {

    const response = await axiosPrivate.get('/Hotels');

    return response.data;

};

export const addHotel = async (axiosPrivate, hotelData) => {

    const response = await axiosPrivate.post('/Hotels', hotelData);

    return response.data;

};

export const updateHotel = async (axiosPrivate, id, hotelData) => {

    const response = await axiosPrivate.put(`/Hotels/${id}`, hotelData);

    return response.data;

};

export const deleteHotel = async (axiosPrivate, id) => {

    const response = await axiosPrivate.delete(`/Hotels/${id}`);

    return response.data;

};
export const createHotelManager = async (axiosPrivate, managerData) => {
    const payload = {
        ...managerData,
        Role: "HotelManager"
    };

    const response = await axiosPrivate.post('/User/register', payload);
    return response.data;
};

// adminHotelApi.js
export const getAllManagers = async (axiosPrivate) => {
    const response = await axiosPrivate.get('/User/managers');
    return response.data;
};
export const getHotelById = async (axiosPrivate, id) => {
    const response = await axiosPrivate.get(`/Hotels/${id}`);
    return response.data;
};