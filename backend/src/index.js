const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const logger = require('./utils/logger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import routes
const weatherRoutes = require('./api/routes/weatherRoutes');
const analysisRoutes = require('./api/routes/analysisRoutes');
const alertRoutes = require('./api/routes/alertRoutes');
const userRoutes = require('./api/routes/userRoutes');
const healthRoutes = require('./api/routes/healthRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/users', userRoutes);

// API Documentation
app.get('/api/docs', (req, res) => {
  res.json({
    message: 'Weather AI Analysis API',
    version: '1.0.0',
    endpoints: {
      weather: '/api/weather',
      analysis: '/api/analysis',
      alerts: '/api/alerts',
      users: '/api/users',
      health: '/api/health'
    },
    documentation: 'https://github.com/yourusername/weather-ai-analysis/docs'
  });
});

// Socket.io events
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on('subscribe_location', (data) => {
    const { latitude, longitude } = data;
    socket.join(`location_${latitude}_${longitude}`);
    logger.info(`Client subscribed to location: ${latitude}, ${longitude}`);
  });

  socket.on('unsubscribe_location', (data) => {
    const { latitude, longitude } = data;
    socket.leave(`location_${latitude}_${longitude}`);
    logger.info(`Client unsubscribed from location: ${latitude}, ${longitude}`);
  });

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  logger.info(`Server running on http://${HOST}:${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
  logger.info(`API Docs: http://${HOST}:${PORT}/api/docs`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

module.exports = { app, io };
