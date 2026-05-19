import React, { useState } from 'react';
import { MapPin, Bell, Moon, Zap, Save } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: 'dark',
    units: 'metric',
    notifications: true,
    emailAlerts: true,
    pushAlerts: true,
    locations: [
      { id: 1, name: 'Jakarta', latitude: -6.2088, longitude: 106.8456 }
    ]
  });

  const [newLocation, setNewLocation] = useState({ name: '', latitude: '', longitude: '' });

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.latitude && newLocation.longitude) {
      setSettings({
        ...settings,
        locations: [
          ...settings.locations,
          {
            id: settings.locations.length + 1,
            ...newLocation
          }
        ]
      });
      setNewLocation({ name: '', latitude: '', longitude: '' });
    }
  };

  const handleRemoveLocation = (id) => {
    setSettings({
      ...settings,
      locations: settings.locations.filter(loc => loc.id !== id)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your preferences and locations</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Display Settings */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Moon className="w-6 h-6 text-blue-400" />
              Display Settings
            </h2>

            <div className="space-y-4">
              {/* Theme */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">Theme</p>
                  <p className="text-slate-400 text-sm">Choose your preferred theme</p>
                </div>
                <select
                  value={settings.theme}
                  onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 outline-none"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              {/* Units */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div>
                  <p className="text-white font-semibold">Temperature Units</p>
                  <p className="text-slate-400 text-sm">Select your preferred unit system</p>
                </div>
                <select
                  value={settings.units}
                  onChange={(e) => setSettings({ ...settings, units: e.target.value })}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 outline-none"
                >
                  <option value="metric">Celsius (°C)</option>
                  <option value="imperial">Fahrenheit (°F)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <Bell className="w-6 h-6 text-cyan-400" />
              Notifications
            </h2>

            <div className="space-y-4">
              {/* Enable Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">Enable Notifications</p>
                  <p className="text-slate-400 text-sm">Receive alerts and updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500" />
                </label>
              </div>

              {/* Email Alerts */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div>
                  <p className="text-white font-semibold">Email Alerts</p>
                  <p className="text-slate-400 text-sm">Get alerts via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailAlerts}
                    onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500" />
                </label>
              </div>

              {/* Push Alerts */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div>
                  <p className="text-white font-semibold">Push Notifications</p>
                  <p className="text-slate-400 text-sm">Get push notifications on your device</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.pushAlerts}
                    onChange={(e) => setSettings({ ...settings, pushAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500" />
                </label>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-green-400" />
              Tracked Locations
            </h2>

            {/* Current Locations */}
            <div className="mb-6 space-y-3">
              {settings.locations.map((loc) => (
                <div
                  key={loc.id}
                  className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                >
                  <div>
                    <p className="text-white font-semibold">{loc.name}</p>
                    <p className="text-slate-400 text-sm">
                      {loc.latitude}, {loc.longitude}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveLocation(loc.id)}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Location */}
            <div className="border-t border-slate-700 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Add New Location</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Location name"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 outline-none placeholder-slate-500"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Latitude"
                    value={newLocation.latitude}
                    onChange={(e) => setNewLocation({ ...newLocation, latitude: e.target.value })}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 outline-none placeholder-slate-500"
                    step="0.0001"
                  />
                  <input
                    type="number"
                    placeholder="Longitude"
                    value={newLocation.longitude}
                    onChange={(e) => setNewLocation({ ...newLocation, longitude: e.target.value })}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 outline-none placeholder-slate-500"
                    step="0.0001"
                  />
                </div>
                <button
                  onClick={handleAddLocation}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                >
                  Add Location
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              Save Changes
            </button>
            <button className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
