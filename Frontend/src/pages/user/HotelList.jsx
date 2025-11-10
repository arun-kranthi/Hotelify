import React, { useEffect, useState, useMemo } from 'react';
import { axiosInstance } from '../../api/axiosInstance'; 
import HotelCard from '../../components/common/HotelCard';

// --- Image Imports ---
import hotelImg1 from '../../assets/images/hotel1.jpg';
import hotelImg2 from '../../assets/images/hotel2.jpg';
import hotelImg3 from '../../assets/images/hotel3.jpg';
import hotelImg4 from '../../assets/images/hotel4.jpg';
import hotelImg5 from '../../assets/images/hotel5.jpg';

const hotelImages = [hotelImg1, hotelImg2, hotelImg3, hotelImg4, hotelImg5];
// Use one image (e.g., hotel1) for the hero background
const heroImage = hotelImg1; 
// --- End Image Imports ---

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('All');

  // ... (useEffect for fetching hotels - no change) ...
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/hotels');
        setHotels(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch hotels", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  // ... (useMemo for filtering/sorting - no change) ...
  const filteredAndSortedHotels = useMemo(() => {
    let processedHotels = [...hotels];
    if (selectedLocation !== 'All') {
      processedHotels = processedHotels.filter(
        (hotel) => hotel.location === selectedLocation
      );
    }
    processedHotels.sort((a, b) => b.rating - a.rating);
    return processedHotels;
  }, [hotels, selectedLocation]);

  // --- Render Logic ---
  if (loading) {
    return <p className="text-center mt-5">Loading hotels...</p>;
  }

  if (error) {
    return <p className="text-center text-danger mt-5">Error: {error}</p>;
  }

  return (
    <>
      {/* ================================== */}
      {/* 1. NEW HERO SECTION                */}
      {/* ================================== */}
      <div 
        className="container-fluid py-5 text-center text-white" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginTop: '22px' // Push below fixed navbar
        }}
      >
        <h1 className="display-4 fw-bold">Find Your Perfect Stay</h1>
        <p className="fs-4">Book with Hotelify for the best prices.</p>
      </div>

      {/* ================================== */}
      {/* 2. NEW CONTROL BAR & LISTING SECTION */}
      {/* ================================== */}
      <div className="bg-body-secondary">
        <div className="container py-5">
          
          {/* --- 2a. New Filter/Header Bar --- */}
          <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white rounded shadow-sm">
            <h2 className="mb-0">
              Explore {selectedLocation === 'All' ? 'All Hotels' : selectedLocation}
            </h2>
            
            <div className="col-md-3">
              <select 
                className="form-select" 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="All">Filter by Location (All)</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
          </div>

          {/* --- 2b. Hotel Card Grid --- */}
          <div className="row">
            {filteredAndSortedHotels.length > 0 ? (
              filteredAndSortedHotels.map((hotel, index) => (
                <div key={hotel.hotelID} className="col-md-4 mb-4">
                  <HotelCard 
                    hotel={hotel} 
                    imageUrl={hotelImages[index % hotelImages.length]} 
                  />
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-center fs-4 p-5 bg-white rounded shadow-sm">
                  No hotels found for this location.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelList;