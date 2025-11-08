import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/common/PublicNavbar';
import Footer from '../components/common/Footer';

const PublicLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} >
      <PublicNavbar />
      <main style={{ flex: '1' }}>
        {/* Your page content (e.g., LandingPage) will be injected here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;