import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // for decoding JWT tokens
import { loginUser } from '../api/authApi'; // Importing API call

// the context
const AuthContext = createContext();

// Creating a custom hook to use the context
export const useAuth = () => useContext(AuthContext);

// the provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This effect runs when the app loads
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        // Check if token is expired
        if (decoded.exp * 1000 > Date.now()) {
          _setAuthState(storedToken, decoded);
        } else {
          _clearAuthState(); // Token is expired
        }
      } catch (e) {
        _clearAuthState(); // Invalid token
      }
    }
  }, []);

  // Helper function to set auth state
  const _setAuthState = (newToken, decodedToken) => {
    // Extract info from the token
    
    const username = decodedToken.Name || decodedToken.sub || 'User';
    const userRoles = decodedToken.role || [];
    const userId = decodedToken.sub;
    
    setToken(newToken);
    setUser({ id: userId, username: username });
    setRoles(Array.isArray(userRoles) ? userRoles : [userRoles]);
    setIsAuthenticated(true);
    localStorage.setItem('token', newToken);
  };

  // Helper function to clear auth state
  const _clearAuthState = () => {
    setToken(null);
    setUser(null);
    setRoles([]);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

const login = async (email, password) => {
    try {
      // Call API with email
      const data = await loginUser(email, password);
      
      // Decode the token
      const decoded = jwtDecode(data.token);
      
      // Set the state
      _setAuthState(data.token, decoded);
      
      // Return the roles for redirection
      const userRoles = decoded.role || [];
      return Array.isArray(userRoles) ? userRoles : [userRoles];
    } catch (error) {
      _clearAuthState();
      console.error("Login failed", error);
      throw error; 
    }
  };

  const logout = () => {
    _clearAuthState();
    // redirect to home page here
    window.location.href = '/';
  };

 
  const value = {
    token,
    user,
    roles,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};