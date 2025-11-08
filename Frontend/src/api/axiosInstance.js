import axios from 'axios';

// =================================================================
// REPLACE WITH YOUR ACTUAL BACKEND URL
// =================================================================
const BASE_URL = 'https://localhost:7046/api'; // Or whatever your .NET API port is

// This is your PUBLIC axios instance (used for login, register, etc.)
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// This is your PRIVATE axios instance (used for auth-required calls)
// We will create its interceptors later in useAxiosPrivate.js
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// By default, just export the public one for now
export default axiosInstance;