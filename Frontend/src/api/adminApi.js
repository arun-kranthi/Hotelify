import { axiosPrivate } from './axiosInstance';

// Create hotel manager (Role always defaults to HotelManager)
export const createHotelManager = async (axiosPrivate, managerData) => {
    const payload = {
        ...managerData,
        Role: "HotelManager"
    };
    const response = await axiosPrivate.post('/User/register', payload);
    return response.data;
};

// Get all managers
export const getAllManagers = async (axiosPrivate) => {
    const response = await axiosPrivate.get('/User/managers');
    return response.data;
};

// Get all users (admin only)
export const getAllUsers = async (axiosPrivate) => {
    const response = await axiosPrivate.get('/User/admin-only');
    return response.data;
};

// Update user
export const updateUserById = async (id, updatedData) => {
    const response = await axiosPrivate.put(`/User/update-admin-only/${id}`, updatedData);
    return response.data;
};

// Delete user
export const deleteUserById = async (id) => {
    const response = await axiosPrivate.delete(`/User/delete-admin-only/${id}`);
    return response.data;
};
