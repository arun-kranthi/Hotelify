// 1. Import the default export from your new file
import axiosInstance from './axiosInstance'; 

// 2. Use 'axiosInstance' for your calls
// (No need for the full 'http://localhost:5000' anymore, 
//  as the BASE_URL is already in axiosInstance)

export const loginUser = async (email, password) => {
  const response = await axiosInstance.post('/User/login', {
    email, // <-- CHANGED
    password,
  });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/User/register', userData);
  return response.data;
};