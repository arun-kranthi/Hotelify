import React from 'react';
import { Outlet } from 'react-router-dom';
// 1. Import your new UserNavbar
import UserNavbar from '../components/common/UserNavbar'; 
import Footer from '../components/common/Footer';

const UserLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      <UserNavbar /> 
      <main style={{ flex: '1', paddingTop: '56px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;