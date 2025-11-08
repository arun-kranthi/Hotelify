import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center my-5">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
};

export default NotFound;