import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel, imageUrl }) => {
  return (
    // Wrap the entire card in a Link.

    <Link 
      to={`/hotels/${hotel.hotelID}`} 
      className="text-decoration-none text-reset d-block h-100"
    >
      {/* Add transition and hover effects to the card */}
      <div 
        className="card h-100 shadow-sm" 
        style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
        onMouseOver={e => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.classList.add('shadow-lg'); // Make shadow bigger on hover
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.classList.remove('shadow-lg');
        }}
      >
        <img 
          src={imageUrl} 
          className="card-img-top" 
          alt={hotel.name} 
          style={{ height: '200px', objectFit: 'cover' }} 
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{hotel.name}</h5>
          
          <p className="card-text text-muted">
            {hotel.location}
          </p>
          
          <p className="card-text">{hotel.amenities?.substring(0, 80)}...</p>
          
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;