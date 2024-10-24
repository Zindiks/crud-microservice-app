# Movies API Service

A RESTful API service for managing movie data with TypeScript, Express, and PostgreSQL.

## Technologies Used

### Core Technologies
- **TypeScript**: Provides static typing, enhanced IDE support, and better code organization
- **Express.js**: Fast, unopinionated web framework for Node.js
- **PostgreSQL**: Robust, open-source relational database
- **Sequelize**: Modern TypeScript-first ORM for Node.js

### Security & Validation
- **Helmet**: Secures Express apps by setting various HTTP headers
- **Express Rate Limit**: Protects against brute force attacks
- **Zod**: Schema validation for request data and environment variables
- **CORS**: Cross-Origin Resource Sharing support

### Documentation & Development
- **Swagger/OpenAPI**: API documentation with interactive UI at `/docs`
- **Jest**: Testing framework for unit and integration tests
- **Pino**: Fast and low overhead logging

### Development Tools
- **ts-node-dev**: Development server with hot reload
- **dotenv**: Environment variable management
- **ESLint & Prettier**: Code formatting and linting (recommended)

## Features

- CRUD operations for movies
- Input validation using Zod schemas
- Environment-based configuration (development/production)
- API documentation with Swagger
- Request rate limiting
- Security headers with Helmet
- Comprehensive error handling
- Database seeding functionality
- Logging with Pino logger
- Unit tests with Jest

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Run tests:
```bash
npm test
```

## API Documentation

Access the Swagger documentation at: `http://localhost:8080/docs`

## Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build the project
- `npm test`: Run tests
- `npm run test:watch`: Run tests in watch mode
- `npm run seed`: Seed the database with sample data

## Environment Variables

See `.env.example` for all required environment variables.

## Project Structure

```
src/
├── __tests__/          # Test files
├── config/            # Configuration files
├── controllers/       # Route controllers
├── middleware/        # Custom middleware
├── models/           # Database models
├── routes/           # Route definitions
├── seeds/            # Database seeders
└── utils/            # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
