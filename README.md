# Emotibit Sensor API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

**Emotibit Sensor API** is a REST API developed with NestJS for managing biometric data from Emotibit sensors. It can store and manage various sensor data such as skin temperature, electrodermal activity (EDA), and photoplethysmography (PPG), as well as personal user data.

### ✨ Features

- 📊 **Sensor Data Management**: Manage data from Emotibit sensors
- 👤 **Personal Data Management**: Manage user personal data
- 📱 **Active Sensor Monitoring**: Monitor status of active sensors
- 📚 **API Documentation**: Automatic API documentation with Swagger
- 🚀 **High Performance**: Uses Fastify as HTTP server
- 🗄️ **MongoDB Integration**: Connect to MongoDB via Mongoose

### 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) v11
- **Runtime**: [Bun](https://bun.sh/)
- **Database**: MongoDB
- **ODM**: Mongoose
- **HTTP Server**: Fastify
- **Language**: TypeScript
- **Validation**: Class Validator & Class Transformer
- **Documentation**: Swagger/OpenAPI

## 📁 Project Structure

```
src/
├── main.ts                     # Application entry point
├── app.module.ts               # Root application module
├── app.controller.ts           # Root controller
├── app.service.ts              # Root service
├── sensors/                    # Sensor data module
│   ├── sensors.controller.ts   # Sensor endpoints
│   ├── sensors.service.ts      # Sensor business logic
│   ├── sensors.module.ts       # Sensor module definition
│   ├── dto/                    # Data Transfer Objects
│   │   ├── create-sensor.dto.ts
│   │   └── update-sensor.dto.ts
│   ├── entities/               # Entity definitions
│   │   └── sensor.entity.ts
│   └── schemas/                # MongoDB schemas
│       ├── sensors.schema.ts   # Main sensor data schema
│       └── activeSensor.schema.ts # Active sensor schema
└── personal_data/              # Personal data module
    ├── personal_data.controller.ts
    ├── personal_data.service.ts
    ├── personal_data.module.ts
    ├── dto/                    # Data Transfer Objects
    │   ├── create-personal_datum.dto.ts
    │   └── update-personal_datum.dto.ts
    ├── entities/               # Entity definitions
    │   └── personal_datum.entity.ts
    └── schemas/                # MongoDB schemas
        └── personal_data.schema.ts
```

## 🗃️ Data Models

### Sensor Data Schema

```typescript
{
  topic: string,              // MQTT topic
  device_id: string,          // Unique device identifier
  timestamp: number,          // Unix timestamp
  received_at: Date,          // Server receive time
  sensors: {
    skintemp: number,         // Skin temperature
    eda: number[],            // Electrodermal Activity array
    ppg: number[]             // Photoplethysmography array
  }
}
```

### Personal Data Schema

```typescript
{
  device_id: string,          // Device identifier
  name: string,               // First name
  surname: string,            // Last name
  age: number,                // Age
  weight: number,             // Weight (kg)
  height: number              // Height (cm)
}
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.0 or higher)
- MongoDB

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Jamessurapat26/emotibit-sensor-api.git
cd emotibit-sensor-api
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/emotibit-database
```

4. Start MongoDB service on your machine

### Running the Application

```bash
# Development mode
bun run start:dev

# Production mode
bun run start:prod

# Debug mode
bun run start:debug
```

The API will be available at `http://localhost:3000`

### API Documentation

Swagger documentation is available at `http://localhost:3000/api` when the server is running.

## 📡 API Endpoints

### Sensor Data Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/sensors` | Get all sensor data (limited to 1000 records) |
| GET | `/sensors/active` | Get active sensors status |
| GET | `/sensors/:device_id` | Get latest sensor data by device ID |

### Personal Data Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/personal-data` | Get all personal data |
| GET | `/personal-data/:id` | Get personal data by ID |
| POST | `/personal-data` | Create new personal data |
| PATCH | `/personal-data/:id` | Update personal data |
| DELETE | `/personal-data/:id` | Delete personal data |

### Example API Usage

#### Get Active Sensors

```bash
curl -X GET http://localhost:3000/sensors/active
```

#### Create Personal Data

```bash
curl -X POST http://localhost:3000/personal-data \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "EMO_001",
    "name": "John",
    "surname": "Doe",
    "age": 25,
    "weight": 70.5,
    "height": 175.0
  }'
```

#### Get Sensor Data by Device ID

```bash
curl -X GET http://localhost:3000/sensors/EMO_001
```

## 🧪 Testing

```bash
# Unit tests
bun run test

# E2E tests
bun run test:e2e

# Test coverage
bun run test:cov

# Watch mode
bun run test:watch
```

## 📝 Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow ESLint configuration
- Use Prettier for code formatting
- Implement proper error handling
- Add validation for all DTOs

### Database Best Practices

- Use lean() queries for better performance
- Implement proper indexing
- Add pagination for large datasets
- Use aggregation pipelines for complex queries

### API Design

- Follow RESTful conventions
- Use proper HTTP status codes
- Implement request validation
- Add proper error responses
- Document all endpoints with Swagger

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/emotibit-database` |

### MongoDB Collections

- `sensor_readings`: Stores sensor data with timestamps
- `active_sensors`: Tracks currently active sensors
- `personal_data`: Stores user personal information

## 🚀 Deployment

### Docker Deployment

This project includes a optimized Dockerfile that uses Bun runtime for fast and efficient deployment.

#### Dockerfile Overview

The included `Dockerfile` uses:

- **Base Image**: `oven/bun:1.1.18-alpine` - Lightweight Alpine Linux with Bun runtime
- **Multi-stage Build**: Production-ready optimized image
- **Dependency Installation**: Uses `bun install --frozen-lockfile` for reproducible builds
- **Port**: Exposes port 3000 (configurable via environment variables)

#### Quick Start with Docker

1. **Build the Docker image:**

```bash
docker build -t emotibit-sensor-api .
```

2. **Run with environment variables:**

```bash
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://your-mongodb-host:27017/emotibit-database \
  -e PORT=3000 \
  emotibit-sensor-api
```

3. **Run with .env file:**

```bash
# Create .env file first with your configuration
docker run -p 3000:3000 --env-file .env emotibit-sensor-api
```

#### Docker Compose for Production

Create a `docker-compose.yml` file for easier deployment:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/emotibit-database
      - PORT=3000
    depends_on:
      - mongodb
    restart: unless-stopped

  mongodb:
    image: mongo:7-jammy
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
```

Run with Docker Compose:

```bash
docker-compose up -d
```

#### Advanced Docker Commands

```bash
# Build with custom tag and build args
docker build -t emotibit-sensor-api:v1.0.0 .

# Run in detached mode with custom name
docker run -d --name emotibit-api \
  -p 3000:3000 \
  -e MONGODB_URI=your_mongodb_uri \
  emotibit-sensor-api

# View logs
docker logs emotibit-api

# Stop and remove container
docker stop emotibit-api
docker rm emotibit-api

# Check container status
docker ps
```

#### Environment Variables for Docker

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Application port | `3000` | No |
| `MONGODB_URI` | MongoDB connection string | - | Yes |

#### Cloud Deployment Options

**AWS ECS Deployment:**

```bash
# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account.dkr.ecr.us-east-1.amazonaws.com
docker tag emotibit-sensor-api:latest your-account.dkr.ecr.us-east-1.amazonaws.com/emotibit-sensor-api:latest
docker push your-account.dkr.ecr.us-east-1.amazonaws.com/emotibit-sensor-api:latest
```

**Railway Deployment:**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy to Railway
railway login
railway init
railway up
```

**Docker Hub Deployment:**

```bash
# Tag and push to Docker Hub
docker tag emotibit-sensor-api:latest your-username/emotibit-sensor-api:latest
docker push your-username/emotibit-sensor-api:latest
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **James Surapat** - *Initial work* - [Jamessurapat26](https://github.com/Jamessurapat26)

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Runtime powered by [Bun](https://bun.sh/)
- Database powered by [MongoDB](https://www.mongodb.com/)
- Documentation with [Swagger](https://swagger.io/)
- HTTP server with [Fastify](https://www.fastify.io/)

---

For more information about NestJS, visit the [official documentation](https://docs.nestjs.com/).
For more information about Bun, visit the [official documentation](https://bun.sh/docs).
