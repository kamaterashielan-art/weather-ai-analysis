import React from 'react';
import { Link } from 'react-router-dom';
import { Cloud, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              WeatherAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link to="/predictions" className="text-slate-300 hover:text-white transition-colors">
                  Predictions
                </Link>
                <Link to="/settings" className="text-slate-300 hover:text-white transition-colors">
                  Settings
                </Link>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="#features" className="text-slate-300 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">
                  Pricing
                </a>
                <button
                  onClick={() => setIsAuthenticated(true)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-slate-700/50">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block px-4 py-2 text-slate-300 hover:text-white">
                  Dashboard
                </Link>
                <Link to="/predictions" className="block px-4 py-2 text-slate-300 hover:text-white">
                  Predictions
                </Link>
                <Link to="/settings" className="block px-4 py-2 text-slate-300 hover:text-white">
                  Settings
                </Link>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="block w-full text-left px-4 py-2 text-red-400 hover:text-red-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="#features" className="block px-4 py-2 text-slate-300 hover:text-white">
                  Features
                </a>
                <a href="#pricing" className="block px-4 py-2 text-slate-300 hover:text-white">
                  Pricing
                </a>
                <button
                  onClick={() => setIsAuthenticated(true)}
                  className="block w-full text-left px-4 py-2 text-blue-400 hover:text-blue-300 font-semibold"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
