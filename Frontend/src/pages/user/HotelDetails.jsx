import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { axiosInstance } from '../../api/axiosInstance';
import { getHotelById } from '../../api/hotelApi';

// Import our dummy images
import defaultHotelImg from '../../assets/images/hotel1.jpg';
import roomImg1 from '../../assets/images/room1.jpg';
import roomImg2 from '../../assets/images/room2.jpg';
import roomImg3 from '../../assets/images/room3.jpg';

// Store room images in an array
const roomImages = [roomImg1, roomImg2, roomImg3];

// Dummy "About" text
const dummyAboutText = "Welcome to a place where comfort meets luxury. Our hotel is dedicated to providing you with an unforgettable experience, combining modern amenities with timeless elegance. From our meticulously designed rooms to our world-class service, we ensure every moment of your stay is perfect. We are located in the heart of the city, providing easy access to all major attractions. We look forward to welcoming you.";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!hotelId) return;
      try {
        setLoading(true);
        const response = await getHotelById(axiosInstance, hotelId);
        setHotel(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch hotel details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  if (loading) {
    return <p className="text-center mt-5">Loading hotel details...</p>;
  }
  if (error) {
    return <p className="text-center text-danger mt-5">Error: {error}</p>;
  }
  if (!hotel) {
    return <p className="text-center mt-5">Hotel not found.</p>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* --- Main Content Column --- */}
        <div className="col-lg-8">
          {/* 1. Main Hotel Image */}
          <img 
            src={defaultHotelImg} 
            className="img-fluid rounded shadow-lg mb-4" 
            alt={hotel.name}
            style={{ width: '100%', height: '450px', objectFit: 'cover' }}
          />

          {/* 2. Hotel Info */}
          <h1 className="fw-bold display-5">{hotel.name}</h1>
          <p className="fs-4 text-muted">{hotel.location}</p>
          
          <hr className="my-4" />

          {/* 3. NEW: About Section */}
          <div className="mb-4">
            <h3 className="fw-bold mb-3">About this Hotel</h3>
            <p className="fs-5" style={{ lineHeight: '1.6' }}>{dummyAboutText}</p>
          </div>

          <hr className="my-4" />

          {/* 4. NEW: Room Gallery */}
          <div className="mb-4">
            <h3 className="fw-bold mb-3">Our Rooms</h3>
            <div className="row g-3">
              {roomImages.map((img, index) => (
                <div className="col-md-4" key={index}>
                  <img
                    src={img}
                    alt={`Room ${index + 1}`}
                    className="img-fluid rounded shadow-sm"
                    style={{ height: '150px', width: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <hr className="my-4" />

          {/* 5. Amenities Section */}
          <div className="mb-4">
            <h3 className="fw-bold mb-3">Amenities</h3>
            <p className="fs-5">{hotel.amenities}</p>
            {/* You could split this later if it's a list */}
          </div>
        </div>

        {/* --- Booking Card Column --- */}
        <div className="col-lg-4">
          <div className="card shadow-sm" style={{ position: 'sticky', top: '165px' }}>
            <div className="card-body p-4 text-center">
              <h4 className="mb-3">Rating</h4>
              <h2 className="fw-bold text-primary display-4">{hotel.rating.toFixed(1)}</h2>
              <p className="fs-5 text-muted">/ 5.0</p>
              <hr />
              <p className="fs-5 mb-3">Ready to book your stay?</p>
              <Link to={`/book/${hotel.hotelID}`} className="btn btn-primary btn-lg w-100">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;