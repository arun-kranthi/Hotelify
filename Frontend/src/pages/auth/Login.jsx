import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // --- 1. GET THE MESSAGE FROM NAVIGATION STATE ---
  const [successMessage, setSuccessMessage] = useState(location.state?.message);

  // --- 2. CLEAR THE LOCATION STATE ---
  // This useEffect runs once to clear the message from history,
  // so it doesn't show up again if you navigate away and come back.
  useEffect(() => {
    if (location.state?.message) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage(''); // --- 3. CLEAR SUCCESS ON NEW ATTEMPT ---
    setLoading(true);

    try {
      const roles = await login(email, password);
      
      if (roles.includes('Admin')) {
        navigate('/admin/dashboard');
      } else if (roles.includes('HotelManager')) {
        navigate('/manager/dashboard');
      } else {
        navigate('/hotels');
      }

    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg border-0" style={{ width: '400px' }}>
        <div className="card-body p-5">
          <h2 className="card-title text-center fw-bold mb-4">Login to Hotelify</h2>
          
          {/* --- 4. RENDER MESSAGES --- */}
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div className="text-center mt-3">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;