import dotenv from 'dotenv'
import { logger } from '../utils/logger'

// Prevent dotenv from loading .env automatically
const options = { path: undefined }

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'production') {
  logger.info('Loading production environment')
  dotenv.config({ ...options, path: '.env' })
} else {
  logger.info('Loading development environment')
  dotenv.config({ ...options, path: '.env.dev' })
}

// Log the loaded configuration
logger.info(`Environment: ${process.env.NODE_ENV}`)
logger.info(`DB Host: ${process.env.DB_INVENTORY_HOST}`)
logger.info(`App Port: ${process.env.APP_INVENTORY_PORT}`)

export default {
  db: {
    name: process.env.DB_INVENTORY_NAME || "movies",
    user: process.env.DB_INVENTORY_USER || "postgres",
    password: process.env.DB_INVENTORY_PASSWORD || "password",
    host: process.env.DB_INVENTORY_HOST || "localhost",
    port: process.env.DB_INVENTORY_PORT || "5432",
  },
}