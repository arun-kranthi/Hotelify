import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="container text-center my-5">
      <h1 className="display-1 fw-bold">403</h1>
      <h2>Access Denied</h2>
      <p className="lead">
        Sorry, you do not have permission to access this page.
      </p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
};

export default Unauthorized;