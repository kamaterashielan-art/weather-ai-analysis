# Setup Guide

## Prerequisites

- Node.js 18+ and npm 9+
- Python 3.9+
- Docker & Docker Compose
- PostgreSQL 14+ (if running locally)
- Redis 7+ (if running locally)
- Git

## Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/weather-ai-analysis.git
cd weather-ai-analysis
```

### 2. Setup Environment Variables

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with your configuration
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create logs directory
mkdir -p logs

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will run on `http://localhost:3000`

### 5. ML Model Setup

```bash
cd ml-model

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start ML service
python src/app.py
```

ML service will run on `http://localhost:8000`

## Docker Setup (Recommended)

### 1. Build and Start Services

```bash
# Build all services
docker-compose build

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### 2. Initialize Database

```bash
# Run migrations
docker-compose exec backend npm run migrate

# Seed sample data (optional)
docker-compose exec backend npm run seed
```

### 3. Access Services

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api/docs
- ML Service: http://localhost:8000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### 4. Stop Services

```bash
docker-compose down

# Remove volumes (careful - deletes data)
docker-compose down -v
```

## Database Setup

### PostgreSQL

```bash
# Create database
createdb weather_db

# Create user
createuser weather_user

# Set password
psql -c "ALTER USER weather_user WITH PASSWORD 'weather_password';"

# Grant privileges
psql -c "GRANT ALL PRIVILEGES ON DATABASE weather_db TO weather_user;"

# Run migrations
npm run migrate
```

### Redis

```bash
# Start Redis (if not using Docker)
redis-server

# Test connection
redis-cli ping
```

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- weatherRoutes.test.js

# Watch mode
npm test -- --watch
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

### ML Model Tests

```bash
cd ml-model

# Run all tests
pytest tests/ -v

# Run with coverage
pytest tests/ --cov=src

# Run specific test
pytest tests/test_preprocessing.py -v
```

## Linting & Formatting

### Backend

```bash
cd backend

# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix
```

### Frontend

```bash
cd frontend

# Run linter
npm run lint

# Format code
npm run format
```

### Python

```bash
cd ml-model

# Format with Black
black src/

# Lint with Flake8
flake8 src/

# Type check with mypy
mypy src/
```

## API Documentation

### Swagger/OpenAPI

Access API documentation at: `http://localhost:5000/api/docs`

### Manual Testing with cURL

```bash
# Get current weather
curl -X GET "http://localhost:5000/api/weather/current?latitude=-6.2088&longitude=106.8456"

# Get forecast
curl -X GET "http://localhost:5000/api/weather/forecast?latitude=-6.2088&longitude=106.8456&days=7"

# Get prediction (requires auth)
curl -X POST "http://localhost:5000/api/analysis/predict" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"latitude": -6.2088, "longitude": 106.8456, "days_ahead": 7}'
```

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :5000  # Backend
lsof -i :3000  # Frontend
lsof -i :8000  # ML Service

# Kill process
kill -9 <PID>
```

### Database Connection Error

```bash
# Check PostgreSQL is running
psql -U weather_user -d weather_db -c "SELECT NOW();"

# Check connection string in .env
DATABASE_URL=postgresql://weather_user:weather_password@localhost:5432/weather_db
```

### Redis Connection Error

```bash
# Check Redis is running
redis-cli ping

# Check connection string in .env
REDIS_URL=redis://localhost:6379
```

### Docker Issues

```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild from scratch
docker-compose build --no-cache

# Start fresh
docker-compose up -d
```

## Environment Variables Reference

### Backend (.env)

```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://weather_user:weather_password@localhost:5432/weather_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key
OPENWEATHER_API_KEY=your_api_key
LOG_LEVEL=info
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_ENV=development
```

### ML Model (.env)

```
MODEL_PATH=./models/mimo_model.h5
DATA_PATH=./data/
BATCH_SIZE=32
EPOCHS=100
```

## Next Steps

1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
2. Check [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
3. Review API documentation at `/api/docs`
4. Start developing features!

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with details
3. Contact maintainers

Happy coding! 🚀
