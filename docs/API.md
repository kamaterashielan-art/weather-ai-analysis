# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "timestamp": "2026-05-19T11:40:08Z"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  },
  "timestamp": "2026-05-19T11:40:08Z"
}
```

## Endpoints

### Health Check

#### GET /health
Check API health status

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-05-19T11:40:08Z",
  "uptime": 3600,
  "environment": "development",
  "version": "1.0.0"
}
```

---

### Weather Endpoints

#### GET /weather/current
Get current weather for a location

**Query Parameters:**
- `latitude` (required): Location latitude (-90 to 90)
- `longitude` (required): Location longitude (-180 to 180)
- `units` (optional): metric or imperial (default: metric)

**Example:**
```bash
GET /weather/current?latitude=-6.2088&longitude=106.8456&units=metric
```

**Response:**
```json
{
  "success": true,
  "data": {
    "location": {
      "latitude": -6.2088,
      "longitude": 106.8456
    },
    "current": {
      "temperature": 25.5,
      "humidity": 65,
      "pressure": 1013.25,
      "wind_speed": 10.5,
      "wind_direction": 230,
      "cloud_cover": 40,
      "visibility": 10000,
      "description": "Partly cloudy"
    },
    "timestamp": "2026-05-19T11:40:08Z"
  }
}
```

---

#### GET /weather/forecast
Get weather forecast for next 7 days

**Query Parameters:**
- `latitude` (required): Location latitude
- `longitude` (required): Location longitude
- `days` (optional): Number of days (default: 7, max: 14)

**Example:**
```bash
GET /weather/forecast?latitude=-6.2088&longitude=106.8456&days=7
```

**Response:**
```json
{
  "success": true,
  "data": {
    "location": {
      "latitude": -6.2088,
      "longitude": 106.8456
    },
    "forecast": [
      {
        "date": "2026-05-19",
        "temperature_max": 28,
        "temperature_min": 22,
        "humidity": 70,
        "precipitation": 0,
        "description": "Sunny"
      }
    ],
    "days": 7
  }
}
```

---

#### GET /weather/historical
Get historical weather data (requires authentication)

**Query Parameters:**
- `latitude` (required): Location latitude
- `longitude` (required): Location longitude
- `start_date` (required): Start date (YYYY-MM-DD)
- `end_date` (required): End date (YYYY-MM-DD)

**Example:**
```bash
GET /weather/historical?latitude=-6.2088&longitude=106.8456&start_date=2026-05-01&end_date=2026-05-19
```

---

#### POST /weather/location
Add a new location to track (requires authentication)

**Request Body:**
```json
{
  "name": "Jakarta",
  "latitude": -6.2088,
  "longitude": 106.8456,
  "country": "Indonesia",
  "timezone": "Asia/Jakarta"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Jakarta",
    "latitude": -6.2088,
    "longitude": 106.8456,
    "country": "Indonesia",
    "timezone": "Asia/Jakarta",
    "created_at": "2026-05-19T11:40:08Z"
  }
}
```

---

#### GET /weather/locations
Get all tracked locations (requires authentication)

**Response:**
```json
{
  "success": true,
  "data": {
    "locations": [
      {
        "id": 1,
        "name": "Jakarta",
        "latitude": -6.2088,
        "longitude": 106.8456
      }
    ]
  }
}
```

---

### Analysis Endpoints

#### POST /analysis/predict
Get AI prediction for weather (requires authentication)

**Request Body:**
```json
{
  "latitude": -6.2088,
  "longitude": 106.8456,
  "days_ahead": 7
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "location": {
      "latitude": -6.2088,
      "longitude": 106.8456
    },
    "predictions": [
      {
        "date": "2026-05-20",
        "temperature": 26.5,
        "humidity": 68,
        "precipitation_probability": 0.15,
        "confidence_score": 0.92
      }
    ],
    "model_version": "1.0.0",
    "generated_at": "2026-05-19T11:40:08Z"
  }
}
```

---

#### GET /analysis/insights
Get AI-generated insights (requires authentication)

**Query Parameters:**
- `latitude` (required): Location latitude
- `longitude` (required): Location longitude
- `period` (optional): 7d, 30d, or 90d (default: 7d)

**Response:**
```json
{
  "success": true,
  "data": {
    "location": {
      "latitude": -6.2088,
      "longitude": 106.8456
    },
    "period": "7d",
    "insights": [
      {
        "type": "temperature_trend",
        "description": "Temperature is gradually increasing",
        "severity": "low",
        "recommendation": "Stay hydrated"
      }
    ],
    "generated_at": "2026-05-19T11:40:08Z"
  }
}
```

---

#### GET /analysis/trends
Get weather trends (requires authentication)

**Query Parameters:**
- `latitude` (required): Location latitude
- `longitude` (required): Location longitude
- `metric` (optional): temperature, humidity, pressure, wind_speed (default: temperature)

**Response:**
```json
{
  "success": true,
  "data": {
    "location": {
      "latitude": -6.2088,
      "longitude": 106.8456
    },
    "metric": "temperature",
    "trend": "increasing",
    "trend_strength": 0.75,
    "data_points": [
      {
        "date": "2026-05-13",
        "value": 24.5
      }
    ],
    "generated_at": "2026-05-19T11:40:08Z"
  }
}
```

---

### Alert Endpoints

#### GET /alerts
Get all alerts (requires authentication)

**Query Parameters:**
- `status` (optional): active, acknowledged, resolved
- `severity` (optional): low, medium, high, critical

**Response:**
```json
{
  "success": true,
  "data": {
    "alerts": [],
    "total": 0,
    "filters": {
      "status": "active",
      "severity": "high"
    }
  }
}
```

---

#### POST /alerts/create
Create a new alert rule (requires authentication)

**Request Body:**
```json
{
  "location_id": 1,
  "alert_type": "high_temperature",
  "threshold": 35,
  "severity": "high",
  "enabled": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "location_id": 1,
    "alert_type": "high_temperature",
    "threshold": 35,
    "severity": "high",
    "enabled": true,
    "created_at": "2026-05-19T11:40:08Z"
  }
}
```

---

#### PUT /alerts/:id
Update alert rule (requires authentication)

**Request Body:**
```json
{
  "threshold": 36,
  "severity": "critical",
  "enabled": true
}
```

---

#### DELETE /alerts/:id
Delete alert rule (requires authentication)

---

#### POST /alerts/:id/acknowledge
Acknowledge an alert (requires authentication)

---

### User Endpoints

#### POST /users/register
Register a new user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2026-05-19T11:40:08Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

#### POST /users/login
Login user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

#### GET /users/profile
Get user profile (requires authentication)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "preferences": {
      "theme": "dark",
      "units": "metric",
      "notifications_enabled": true
    },
    "created_at": "2026-05-19T11:40:08Z"
  }
}
```

---

#### PUT /users/profile
Update user profile (requires authentication)

**Request Body:**
```json
{
  "name": "Jane Doe",
  "preferences": {
    "theme": "light",
    "units": "imperial"
  }
}
```

---

#### POST /users/change-password
Change user password (requires authentication)

**Request Body:**
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

---

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| MISSING_PARAMS | 400 | Required parameters missing |
| INVALID_COORDINATES | 400 | Invalid latitude/longitude |
| INVALID_QUERY | 400 | Invalid query parameters |
| VALIDATION_ERROR | 400 | Request validation failed |
| MISSING_TOKEN | 401 | Authorization token missing |
| INVALID_TOKEN | 401 | Invalid or expired token |
| TOKEN_EXPIRED | 401 | Token has expired |
| UNAUTHORIZED | 401 | Unauthorized access |
| FORBIDDEN | 403 | Access forbidden |
| NOT_FOUND | 404 | Resource not found |
| INTERNAL_SERVER_ERROR | 500 | Server error |

## Rate Limiting

- **Limit:** 100 requests per 15 minutes per IP
- **Headers:** 
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

## Pagination

For endpoints returning lists, use query parameters:
- `page` (default: 1)
- `limit` (default: 20, max: 100)

Example:
```bash
GET /alerts?page=1&limit=20
```

## WebSocket Events

Connect to `http://localhost:5000` with Socket.io

**Subscribe to location updates:**
```javascript
socket.emit('subscribe_location', {
  latitude: -6.2088,
  longitude: 106.8456
});
```

**Receive real-time updates:**
```javascript
socket.on('weather_update', (data) => {
  console.log('New weather data:', data);
});
```

## Examples

### cURL Examples

```bash
# Get current weather
curl -X GET "http://localhost:5000/api/weather/current?latitude=-6.2088&longitude=106.8456"

# Register user
curl -X POST "http://localhost:5000/api/users/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'

# Login
curl -X POST "http://localhost:5000/api/users/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Get prediction (with token)
curl -X POST "http://localhost:5000/api/analysis/predict" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": -6.2088,
    "longitude": 106.8456,
    "days_ahead": 7
  }'
```

### JavaScript/Fetch Examples

```javascript
// Get current weather
fetch('http://localhost:5000/api/weather/current?latitude=-6.2088&longitude=106.8456')
  .then(res => res.json())
  .then(data => console.log(data));

// Login
fetch('http://localhost:5000/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
})
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('token', data.token);
    console.log('Logged in:', data);
  });

// Get prediction with token
const token = localStorage.getItem('token');
fetch('http://localhost:5000/api/analysis/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    latitude: -6.2088,
    longitude: 106.8456,
    days_ahead: 7
  })
})
  .then(res => res.json())
  .then(data => console.log('Prediction:', data));
```

---

For more information, visit the [GitHub repository](https://github.com/yourusername/weather-ai-analysis)
