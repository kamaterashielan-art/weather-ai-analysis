import React from 'react';
import { Cloud, Zap, BarChart3, Bell, Lock, Globe } from 'lucide-react';

export default function LandingPage({ setIsAuthenticated }) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-600/20 blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-block">
            <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full">
              <span className="text-blue-300 text-sm font-semibold">🚀 AI-Powered Weather Analysis</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Weather Intelligence at Your Fingertips
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Advanced AI-powered weather analysis with real-time predictions, intelligent alerts, and beautiful visualizations
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => setIsAuthenticated(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
            >
              Get Started Free
            </button>
            <button className="px-8 py-4 border border-slate-600 text-white rounded-lg font-semibold hover:bg-slate-800/50 transition-all">
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400">99.9%</div>
              <div className="text-slate-400 text-sm">Uptime</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-cyan-400">50M+</div>
              <div className="text-slate-400 text-sm">Data Points</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-400">92%</div>
              <div className="text-slate-400 text-sm">Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Powerful Features</h2>
            <p className="text-xl text-slate-400">Everything you need for advanced weather analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-blue-500/50 transition-all group">
              <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-4 group-hover:bg-blue-500/30 transition-colors">
                <Cloud className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Data</h3>
              <p className="text-slate-400">Live weather updates from multiple sources with instant synchronization</p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-cyan-500/50 transition-all group">
              <div className="p-3 bg-cyan-500/20 rounded-lg w-fit mb-4 group-hover:bg-cyan-500/30 transition-colors">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI Predictions</h3>
              <p className="text-slate-400">Advanced MIMO model for accurate weather forecasting up to 14 days ahead</p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-blue-500/50 transition-all group">
              <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-4 group-hover:bg-blue-500/30 transition-colors">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
              <p className="text-slate-400">Beautiful charts and visualizations for weather trends and patterns</p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-cyan-500/50 transition-all group">
              <div className="p-3 bg-cyan-500/20 rounded-lg w-fit mb-4 group-hover:bg-cyan-500/30 transition-colors">
                <Bell className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Alerts</h3>
              <p className="text-slate-400">Customizable alerts for extreme weather conditions and anomalies</p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-blue-500/50 transition-all group">
              <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-4 group-hover:bg-blue-500/30 transition-colors">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
              <p className="text-slate-400">Enterprise-grade security with encryption and compliance standards</p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-cyan-500/50 transition-all group">
              <div className="p-3 bg-cyan-500/20 rounded-lg w-fit mb-4 group-hover:bg-cyan-500/30 transition-colors">
                <Globe className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Global Coverage</h3>
              <p className="text-slate-400">Weather data and predictions for any location worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-slate-300 mb-8">Join thousands of users who trust WeatherAI for accurate weather insights</p>
          <button
            onClick={() => setIsAuthenticated(true)}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
          >
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}
