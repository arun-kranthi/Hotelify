import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct import
import { loginUser } from '../api/authApi'; // Import your API call

// Create the context
const AuthContext = createContext();

// Create a custom hook to use the context
export const useAuth = () => useContext(AuthContext);

// Create the provider component
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
    // **IMPORTANT**: Adjust these keys to match your JWT claims!
    const username = decodedToken.Name || decodedToken.sub || 'User';
    const userRoles = decodedToken.role || [];
    
    setToken(newToken);
    setUser({ username }); // Store whatever user info you need
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
      // 1. Call your API with email
      const data = await loginUser(email, password);
      
      // 2. Decode the token
      const decoded = jwtDecode(data.token);
      
      // 3. Set the state
      _setAuthState(data.token, decoded);
      
      // 4. Return the roles for redirection
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
    // You might want to redirect to home page here
    window.location.href = '/login';
  };

  // We don't need signup in the context for now,
  // the page can call the api/authApi.js file directly.

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