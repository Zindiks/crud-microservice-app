import dotenv from "dotenv"
import { logger } from "../utils/logger"

// Prevent dotenv from loading .env automatically
const options = { path: undefined }

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === "production") {
  logger.info("Loading production environment")
  dotenv.config({ ...options, path: ".env" })
} else {
  logger.info("Loading development environment")
  dotenv.config({ ...options, path: ".env.dev" })
}

// Log the loaded configuration
logger.info(`Environment: ${process.env.NODE_ENV}`)
logger.info(`DB Host: ${process.env.DB_ORDER_HOST}`)
logger.info(`App Port: ${process.env.APP_ORDER_PORT}`)

const port = Number(process.env.RMQ_PORT)

export default {
  db: {
    name: process.env.DB_ORDER_NAME || "movies",
    user: process.env.DB_ORDER_USER || "postgres",
    password: process.env.DB_ORDER_PASSWORD || "password",
    host: process.env.DB_ORDER_HOST || "localhost",
    port: process.env.DB_ORDER_PORT || "5433",
  },
  rabbitmq: {
    username: process.env.RMQ_USER || "rabbitmq",
    password: process.env.RMQ_PASSWORD || "password",
    hostname: process.env.RMQ_HOST || "localhost",
    port
  },
}
