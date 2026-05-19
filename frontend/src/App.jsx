import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Predictions from './pages/Predictions';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <LandingPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/predictions" element={isAuthenticated ? <Predictions /> : <LandingPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/settings" element={isAuthenticated ? <Settings /> : <LandingPage setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
