import { useState } from 'react'

import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (<>
  
    <div className='App'>
      {/* The AuthContext.Provider will wrap around the AppRoutes in a later step */}
      <AppRoutes />
    </div>
  
    </>
  );
}

export default App;
