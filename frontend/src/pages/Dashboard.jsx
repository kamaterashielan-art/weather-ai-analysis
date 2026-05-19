import React, { useState } from 'react';
import { Cloud, CloudRain, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState('Jakarta');

  // Mock data
  const currentWeather = {
    temperature: 28.5,
    humidity: 72,
    pressure: 1013.25,
    windSpeed: 12.5,
    visibility: 10,
    description: 'Partly Cloudy',
    feelsLike: 31.2
  };

  const forecastData = [
    { date: 'Mon', temp: 28, humidity: 70 },
    { date: 'Tue', temp: 29, humidity: 68 },
    { date: 'Wed', temp: 27, humidity: 75 },
    { date: 'Thu', temp: 26, humidity: 80 },
    { date: 'Fri', temp: 28, humidity: 72 },
    { date: 'Sat', temp: 30, humidity: 65 },
    { date: 'Sun', temp: 29, humidity: 70 }
  ];

  const locations = ['Jakarta', 'Bandung', 'Surabaya', 'Medan'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather Dashboard</h1>
          <p className="text-slate-400">Real-time weather analysis and predictions</p>
        </div>

        {/* Location Selector */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                selectedLocation === loc
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Current Weather Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Weather Card */}
          <div className="lg:col-span-1 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-slate-400 text-sm mb-2">{selectedLocation}</p>
                <div className="text-6xl font-bold text-white">{currentWeather.temperature}°</div>
                <p className="text-slate-400 mt-2">Feels like {currentWeather.feelsLike}°</p>
              </div>
              <Cloud className="w-24 h-24 text-blue-400" />
            </div>
            <p className="text-xl text-slate-300 font-semibold">{currentWeather.description}</p>
          </div>

          {/* Weather Details Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {/* Humidity */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Humidity</span>
                <Droplets className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white">{currentWeather.humidity}%</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                  style={{ width: `${currentWeather.humidity}%` }}
                />
              </div>
            </div>

            {/* Wind Speed */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Wind Speed</span>
                <Wind className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white">{currentWeather.windSpeed} m/s</div>
              <p className="text-slate-400 text-sm mt-2">NE Direction</p>
            </div>

            {/* Pressure */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Pressure</span>
                <Gauge className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-white">{currentWeather.pressure} mb</div>
              <p className="text-slate-400 text-sm mt-2">Normal</p>
            </div>

            {/* Visibility */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">Visibility</span>
                <Eye className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white">{currentWeather.visibility} km</div>
              <p className="text-slate-400 text-sm mt-2">Good</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temperature Chart */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">7-Day Temperature Forecast</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  name="Temperature (°C)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Humidity Chart */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">7-Day Humidity Forecast</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Bar
                  dataKey="humidity"
                  fill="#06b6d4"
                  name="Humidity (%)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="mt-8 bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Active Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <CloudRain className="w-6 h-6 text-yellow-400 flex-shrink-0" />
              <div className="flex-grow">
                <p className="text-white font-semibold">High Humidity Alert</p>
                <p className="text-slate-400 text-sm">Humidity expected to reach 85% tomorrow</p>
              </div>
              <span className="text-yellow-400 text-sm font-semibold">Medium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
