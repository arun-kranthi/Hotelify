import { useEffect } from 'react';
import { axiosPrivate } from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const useAxiosPrivate = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // This is the interceptor that attaches the token to requests
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // If the Authorization header doesn't exist, set it
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // This is the interceptor that handles errors (like expired tokens)
    const responseIntercept = axiosPrivate.interceptors.response.use(
      // If response is good, just return it
      (response) => response, 
      // If response is an error
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          // If token is bad (Unauthorized or Forbidden)
          // Log the user out and send to login
          console.error("Auth error, logging out...");
          logout();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove interceptors when component unmounts
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };

  }, [token, logout, navigate]);

  // Return the private axios instance
  return axiosPrivate;
};

export default useAxiosPrivate;