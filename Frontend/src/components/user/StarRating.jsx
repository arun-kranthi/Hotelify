import React, { useState } from 'react';
import './StarRating.css'; // Import the custom CSS

const StarRating = ({ rating, setRating }) => {
  // 'hover' state tracks what the user is hovering over
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const starValue = index + 1;
        
        return (
          <span
            key={index}
            className={`star ${starValue <= (hover || rating) ? 'on' : ''}`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            &#9733; {/* This is the star character in html */}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;