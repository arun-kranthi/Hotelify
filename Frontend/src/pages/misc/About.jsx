import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import heroImage from '../../assets/images/hotel2.jpg'; // Using one of your images
import teamMemberPlaceholder from '../../assets/images/placeholder.png'; // Placeholder for team

const About = () => {

  return (
    <>
      {/* 1. Hero Section */}
      <Container 
        fluid 
        className="text-white text-center py-5"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1 className="display-4 fw-bold">About Hotelify</h1>
        <p className="fs-4 lead">
          Connecting you with the world's best hospitality.
        </p>
      </Container>

      {/* 2. Our Mission Section */}
      <Container className="my-5 py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="fw-bold display-6 mb-3">Our Mission</h2>
            <p className="fs-5 text-muted" style={{ lineHeight: '1.7' }}>
              At Hotelify, our mission is to simplify the travel experience. We believe finding and booking the perfect hotel should be a seamless and enjoyable part of your journey, not a chore. 
            </p>
            <p className="fs-5 text-muted" style={{ lineHeight: '1.7' }}>
              We're building a smart, secure, and user-friendly platform that empowers travelers with choice and provides hotel managers with the tools they need to succeed.
            </p>
          </Col>
          <Col md={6}>
            
            <img src={heroImage} alt="Travel" className="img-fluid rounded shadow-lg" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;