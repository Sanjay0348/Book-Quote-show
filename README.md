# Book Quote Shorts

A modern, full-stack web application for browsing inspirational book quotes in a TikTok/Instagram Reels-style format.

## 🏗️ Architecture

- **Frontend**: React 18 + Vite + TypeScript
- **Backend**: Node.js + Express.js + TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Containerization**: Docker + Docker Compose
- **Development**: Hot reload for both frontend and backend

## 🚀 Quick Start with Docker

### Prerequisites
- Docker Desktop
- Docker Compose

### Start the Application
```bash
# Clone and navigate to project
cd book-quote-shorts

# Start all services (first time - builds images)
npm run dev

# Or use Docker Compose directly
docker-compose up --build
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

### Stop the Application
```bash
npm run stop
# or
docker-compose down
```

## 🛠️ Development Setup

### Manual Setup (without Docker)

1. **Install Dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend && npm install

   # Install backend dependencies
   cd ../backend && npm install
   ```

2. **Start MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update connection string in backend/.env

3. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

4. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

## 📁 Project Structure

```
book-quote-shorts/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   ├── types/          # TypeScript type definitions
│   │   ├── styles/         # Global styles
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   ├── Dockerfile          # Frontend Docker configuration
│   ├── package.json
│   └── vite.config.ts
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   ├── Dockerfile          # Backend Docker configuration
│   ├── package.json
│   └── init-mongo.js       # MongoDB initialization
├── docker-compose.yml      # Multi-container orchestration
└── README.md
```

## 🔧 Available Scripts

```bash
# Docker commands
npm run dev          # Start all services in development mode
npm run start        # Start all services in production mode
npm run stop         # Stop all services
npm run clean        # Stop services and remove volumes

# Manual development
npm run install-frontend    # Install frontend dependencies
npm run install-backend     # Install backend dependencies
npm run build-frontend      # Build frontend for production
npm run seed-db            # Seed database with sample quotes
```

## 🌟 Features

### Frontend Features
- ⚛️ React 18 with TypeScript
- ⚡ Vite for lightning-fast development
- 🎨 Modern, responsive UI with smooth animations
- 📱 Mobile-first design with touch gestures
- 🌓 Dark/Light theme support
- ❤️ Interactive like system
- 📤 Quote sharing functionality
- ⌨️ Keyboard navigation
- 🔄 Auto-play mode
- 📊 Progress tracking

### Backend Features
- 🚀 Express.js with TypeScript
- 🍃 MongoDB integration with Mongoose
- 🔐 JWT authentication (ready for user system)
- 📝 RESTful API design
- 🛡️ Input validation and sanitization
- 📊 Error handling and logging
- 🔄 CORS configuration
- 🐳 Docker containerization

### Database Features
- 📚 MongoDB for quote storage
- 🔍 Indexed queries for performance
- 📊 Like tracking and statistics
- 🏷️ Quote categorization
- 👤 User system ready (extensible)

## 🔌 API Endpoints

```
GET    /api/quotes           # Get all quotes (paginated)
GET    /api/quotes/:id       # Get specific quote
POST   /api/quotes/:id/like  # Like/unlike a quote
GET    /api/categories       # Get all categories
GET    /api/stats           # Get application statistics
```

## 🐳 Docker Configuration

### Services
- **MongoDB**: Database with persistent volume
- **Backend**: Node.js API server with hot reload
- **Frontend**: React development server with hot reload

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CORS_ORIGIN`: Allowed frontend origin
- `VITE_API_BASE_URL`: Backend API base URL

## 🚀 Production Deployment

### Build Production Images
```bash
# Build optimized production images
docker-compose -f docker-compose.prod.yml up --build
```

### Environment Configuration
1. Copy `.env.example` to `.env`
2. Update production values
3. Use Docker secrets for sensitive data

## 🔒 Security

- JWT authentication ready for user system
- Input validation with Joi/Zod
- CORS configuration
- Environment variable protection
- MongoDB connection security
- Docker container isolation

## 🧪 Testing

```bash
# Frontend tests
cd frontend && npm run test

# Backend tests  
cd backend && npm run test

# E2E tests
npm run test:e2e
```

## 📈 Performance

- Vite for fast development and builds
- MongoDB indexing for query optimization
- Docker multi-stage builds
- Frontend code splitting
- API response caching
- Image optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure they pass
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in docker-compose.yml
2. **MongoDB connection**: Ensure MongoDB service is running
3. **Node modules**: Delete node_modules and reinstall
4. **Docker issues**: Rebuild images with --no-cache flag

### Logs
```bash
# View logs for specific service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongodb
```

---

**Happy coding! 📚✨**