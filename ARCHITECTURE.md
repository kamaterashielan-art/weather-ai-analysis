# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                          │
│  Dashboard | Charts | Alerts | Real-time Updates (Socket.io)   │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP/WebSocket
┌────────────────────────▼────────────────────────────────────────┐
│                   Cloudflare Workers (Edge)                      │
│  - Request routing                                               │
│  - Rate limiting                                                 │
│  - Caching layer                                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │ HTTP
┌────────────────────────▼────────────────────────────────────────┐
│                  Backend API (Express.js)                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Routes & Controllers                                     │   │
│  │ - Weather endpoints                                      │   │
│  │ - Analysis endpoints                                     │   │
│  │ - User management                                        │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Services Layer                                           │   │
│  │ - Weather data fetching                                  │   │
│  │ - Data processing                                        │   │
│  │ - Model inference                                        │   │
│  │ - Alert generation                                       │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────────┘
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
    │PostgreSQL│    │  Redis  │    │ Python  │
    │ Database │    │ Cache   │    │ ML Svc  │
    └──────────┘    └─────────┘    └────┬────┘
                                         │
                    ┌────────────────────┼────────────────────┐
                    │                    │                    │
              ┌─────▼────┐        ┌─────▼────┐        ┌─────▼────┐
              │ TensorFlow│        │ PyTorch  │        │Scikit-   │
              │   Model   │        │  Model   │        │learn     │
              └───────────┘        └──────────┘        └──────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
    ┌────▼────┐          ┌────▼────┐
    │Training │          │Inference│
    │Pipeline │          │Service  │
    └──────────┘         └─────────┘
         │
    ┌────▼────────────────┐
    │ External Data       │
    │ - OpenWeatherMap    │
    │ - Weather APIs      │
    │ - Historical Data   │
    └─────────────────────┘
```

## Data Flow

### 1. Real-time Weather Data Ingestion
```
OpenWeatherMap API
        ↓
Backend Weather Service
        ↓
Data Validation & Normalization
        ↓
PostgreSQL (Store)
        ↓
Redis Cache (Fast Access)
        ↓
Frontend (Real-time via Socket.io)
```

### 2. AI Model Inference Pipeline
```
Raw Weather Data
        ↓
Feature Engineering (Preprocessing)
        ↓
MIMO Model Input
        ↓
Model Inference (TensorFlow/PyTorch)
        ↓
Post-processing & Validation
        ↓
Store Results in PostgreSQL
        ↓
Cache in Redis
        ↓
Send to Frontend
```

### 3. Alert Generation
```
Predicted Weather Data
        ↓
Threshold Checking
        ↓
Alert Rules Engine
        ↓
Generate Alerts
        ↓
Store in Database
        ↓
Send Notifications (Email/Push/SMS)
        ↓
Display in Dashboard
```

## Component Details

### Backend Services

#### Weather Service
- Fetches data from OpenWeatherMap API
- Validates and normalizes data
- Stores in PostgreSQL
- Caches in Redis for fast retrieval

#### Analysis Service
- Prepares data for ML model
- Calls Python ML service
- Processes model output
- Generates insights and alerts

#### Cache Service
- Redis integration
- Cache invalidation strategy
- TTL management

#### Notification Service
- Email notifications
- Push notifications
- SMS alerts (optional)

### ML Model Service (Python)

#### Data Preprocessing
- Feature scaling & normalization
- Missing value handling
- Outlier detection
- Feature engineering

#### MIMO Model
- Multi-input: temperature, humidity, pressure, wind speed, etc.
- Multi-output: predictions for multiple weather parameters
- Ensemble approach for better accuracy

#### Model Training
- Historical data collection
- Train/validation/test split
- Hyperparameter tuning
- Model evaluation & validation

#### Inference
- Real-time prediction
- Batch prediction
- Model versioning
- Performance monitoring

### Frontend Components

#### Dashboard
- Real-time weather display
- Current conditions
- Forecast cards
- Alert notifications

#### Charts & Visualizations
- Temperature trends
- Humidity patterns
- Pressure changes
- Wind speed variations
- Heatmaps for spatial analysis

#### Data Table
- Historical data view
- Filtering & sorting
- Export functionality

#### Settings
- Location management
- Notification preferences
- Theme settings

## Database Schema

### Tables

#### weather_data
```sql
- id (PK)
- location_id (FK)
- timestamp
- temperature
- humidity
- pressure
- wind_speed
- wind_direction
- precipitation
- cloud_cover
- visibility
- created_at
- updated_at
```

#### predictions
```sql
- id (PK)
- location_id (FK)
- prediction_date
- predicted_temperature
- predicted_humidity
- predicted_precipitation
- confidence_score
- model_version
- created_at
```

#### alerts
```sql
- id (PK)
- location_id (FK)
- alert_type
- severity (low/medium/high/critical)
- message
- triggered_at
- acknowledged_at
- created_at
```

#### locations
```sql
- id (PK)
- name
- latitude
- longitude
- country
- timezone
- created_at
- updated_at
```

#### users
```sql
- id (PK)
- email
- password_hash
- preferences (JSON)
- created_at
- updated_at
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "temperature": 25.5,
    "humidity": 65,
    "pressure": 1013.25,
    "wind_speed": 10.5
  },
  "timestamp": "2026-05-19T11:40:08Z",
  "meta": {
    "location": "Jakarta, Indonesia",
    "source": "OpenWeatherMap"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "INVALID_LOCATION",
    "message": "Location not found",
    "details": "Latitude and longitude are required"
  },
  "timestamp": "2026-05-19T11:40:08Z"
}
```

## Deployment Architecture

### Docker Containers
- **frontend**: React app (Nginx)
- **backend**: Express.js API
- **ml-service**: Python ML inference
- **postgres**: PostgreSQL database
- **redis**: Redis cache
- **nginx**: Reverse proxy

### Cloudflare Workers
- Edge caching
- Request routing
- Rate limiting
- DDoS protection

### CI/CD Pipeline
- GitHub Actions
- Automated testing
- Docker image building
- Deployment to production

## Security Considerations

1. **Authentication**: JWT tokens
2. **Authorization**: Role-based access control (RBAC)
3. **Data Encryption**: TLS/SSL for transit, encryption at rest
4. **Input Validation**: Sanitization & validation on all inputs
5. **Rate Limiting**: Per-IP and per-user limits
6. **CORS**: Configured for allowed origins
7. **Environment Variables**: Sensitive data in .env files
8. **Database**: SQL injection prevention with parameterized queries

## Performance Optimization

1. **Caching Strategy**
   - Redis for frequently accessed data
   - Browser caching for static assets
   - CDN for frontend assets

2. **Database Optimization**
   - Indexing on frequently queried columns
   - Query optimization
   - Connection pooling

3. **API Optimization**
   - Pagination for large datasets
   - Compression (gzip)
   - Lazy loading

4. **Frontend Optimization**
   - Code splitting
   - Lazy loading components
   - Image optimization
   - Minification

## Monitoring & Logging

1. **Application Logs**
   - Winston/Bunyan for Node.js
   - Python logging module

2. **Performance Monitoring**
   - Response time tracking
   - Error rate monitoring
   - Resource usage tracking

3. **Alerting**
   - Slack notifications
   - Email alerts
   - Dashboard alerts

## Scalability

1. **Horizontal Scaling**
   - Load balancing (Nginx/HAProxy)
   - Multiple backend instances
   - Database replication

2. **Vertical Scaling**
   - Increase server resources
   - Optimize code & queries

3. **Caching Strategy**
   - Redis cluster for distributed caching
   - Cache warming strategies
