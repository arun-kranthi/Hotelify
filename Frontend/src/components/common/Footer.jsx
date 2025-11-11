import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <div className="container">
        <p className="text-center mb-0">
          © {new Date().getFullYear()} Hotelify. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;