import React, { useState } from 'react';
import { Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Predictions() {
  const [daysAhead, setDaysAhead] = useState(7);

  const predictionData = [
    { date: 'May 20', temp: 28.5, confidence: 94, precipitation: 10 },
    { date: 'May 21', temp: 29.2, confidence: 91, precipitation: 15 },
    { date: 'May 22', temp: 27.8, confidence: 88, precipitation: 25 },
    { date: 'May 23', temp: 26.5, confidence: 85, precipitation: 35 },
    { date: 'May 24', temp: 28.1, confidence: 82, precipitation: 20 },
    { date: 'May 25', temp: 30.2, confidence: 79, precipitation: 5 },
    { date: 'May 26', temp: 29.5, confidence: 76, precipitation: 8 }
  ];

  const insights = [
    {
      title: 'Temperature Trend',
      description: 'Temperature will gradually decrease over the next 3 days, then recover',
      icon: TrendingUp,
      color: 'text-blue-400'
    },
    {
      title: 'Precipitation Alert',
      description: 'High chance of rain on May 23-24. Prepare accordingly',
      icon: AlertCircle,
      color: 'text-yellow-400'
    },
    {
      title: 'Optimal Conditions',
      description: 'May 25-26 will have the best weather conditions this week',
      icon: Zap,
      color: 'text-green-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AI Predictions</h1>
          <p className="text-slate-400">Advanced weather forecasting powered by machine learning</p>
        </div>

        {/* Days Selector */}
        <div className="mb-8 flex gap-2">
          {[7, 14].map((days) => (
            <button
              key={days}
              onClick={() => setDaysAhead(days)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                daysAhead === days
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {days} Days
            </button>
          ))}
        </div>

        {/* Prediction Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Temperature Prediction */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Temperature Prediction</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={predictionData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorTemp)"
                  name="Temperature (°C)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Confidence Score */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Prediction Confidence</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
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
                  dataKey="confidence"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: '#06b6d4', r: 4 }}
                  name="Confidence (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Precipitation Forecast */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Precipitation Forecast</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={predictionData}>
              <defs>
                <linearGradient id="colorPrecip" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="precipitation"
                stroke="#06b6d4"
                fillOpacity={1}
                fill="url(#colorPrecip)"
                name="Precipitation (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <Icon className={`w-6 h-6 ${insight.color} flex-shrink-0 mt-1`} />
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{insight.title}</h4>
                    <p className="text-slate-400 text-sm">{insight.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Model Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">About Our AI Model</h3>
          <p className="text-slate-300">
            Our predictions are powered by a state-of-the-art MIMO (Multi-Input Multi-Output) neural network trained on 50+ million historical weather data points. The model achieves 92% accuracy and continuously improves with new data.
          </p>
        </div>
      </div>
    </div>
  );
}
