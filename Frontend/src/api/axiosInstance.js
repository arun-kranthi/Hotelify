import axios from 'axios';

// OUR ACTUAL BACKEND URL
const BASE_URL = 'https://localhost:7046/api'; 

// This is PUBLIC axios instance (used for login, register, etc.)
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// This is PRIVATE axios instance (used for auth-required calls)
// will create its interceptors later in useAxiosPrivate.js
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// By default, just exporting the public one
export default axiosInstance;