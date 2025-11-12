import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
import { getProfile, updateProfile } from '../../api/userApi.js';
import { getLoyaltyPoints } from '../../api/loyaltyApi.js'; // Import loyalty API
import { useAuth } from '../../context/AuthContext.jsx';
import { Alert } from 'react-bootstrap';

const ProfilePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user, setUser } = useAuth(); // Get user and setUser
  
  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', contactNumber: '' });
  const [loyaltyPoints, setLoyaltyPoints] = useState(0); // State for points
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 1. Fetch user data and loyalty points on load
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.id) return; // Wait for user data

      try {
        setLoading(true);
        setError('');
        setSuccess('');
        
        // Fetch profile and points at the same time
        const [profileRes, loyaltyRes] = await Promise.all([
          getProfile(axiosPrivate),
          getLoyaltyPoints(axiosPrivate, user.id)
        ]);

        // Set form data from profile
        setFormData({
          name: profileRes.data.name,
          email: profileRes.data.email,
          contactNumber: profileRes.data.contactNumber,
        });
        
        // Set loyalty points
        setLoyaltyPoints(loyaltyRes.data.pointsBalance);

      } catch (err) {
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, [axiosPrivate, user]); // Depend on user to get user.id

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');   // <-- BUG FIX: Clear old messages
    setSuccess(''); // <-- BUG FIX: Clear old messages

    try {
      const response = await updateProfile(axiosPrivate, formData);
      setSuccess("Profile updated successfully!");
      // Also update the AuthContext so the navbar name changes

    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
        setSubmitting(false);
        setUser({ ...user, username: response.data.name });
    }
  };

  if (loading) return <p className="text-center mt-5">Loading profile...</p>;

  // Get user initial for avatar
  const userInitial = formData.name ? formData.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="container my-5">
      <div className="row g-4">
        
        {/* --- Column 1: Profile Card & Loyalty --- */}
        <div className="col-lg-4">
          <div className="card shadow-sm text-center">
            <div className="card-body p-4">
              
              <img 
                src={`https://placehold.co/150x150/007bff/white?text=${userInitial}`} 
                alt="Profile Avatar"
                className="rounded-circle mb-3"
              />
              <h4 className="card-title fw-bold">{formData.name}</h4>
              <p className="card-text text-muted">{formData.email}</p>
              
              <hr className="my-4" />
              
              <div className="text-center">
                <h6 className="text-muted">REWARD POINTS</h6>
                <h2 className="fw-bold text-primary">{loyaltyPoints}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* --- Column 2: Edit Form --- */}
        <div className="col-lg-8">
          <h1 className="fw-bold mb-4">Edit Profile</h1>
          <div className="card shadow-sm">
            <div className="card-body p-5">
              
              {/* Alerts */}
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber || ''} // Handle null
                    onChange={handleChange}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 py-2" 
                  disabled={submitting}
                >
                  {submitting ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;