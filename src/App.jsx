import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/UI/Navbar';
import Starfield from './components/Background/Starfield';
import AnimatedRoutes from './components/UI/AnimatedRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen relative overflow-hidden font-sans text-white">
          {/* Global 3D Background */}
          <Starfield />

          {/* Navigation */}
          <Navbar />

          {/* Page Routing */}
          <div className="relative z-10 w-full flex justify-center">
            <AnimatedRoutes />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
