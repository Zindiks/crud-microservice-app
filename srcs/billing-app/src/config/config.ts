import dotenv from "dotenv"
import { logger } from "../utils/logger"
import { SERVICE_NAME } from "../utils/terminal-styles"

logger.info(SERVICE_NAME)
// Then check NODE_ENV and load additional environment if needed
if (process.env.NODE_ENV === "development") {
  logger.info("Loading development environment")
  dotenv.config({ path: ".env.dev" })
} else {
  logger.info("Loading production environment")
  dotenv.config({ path: ".env" })
}

// Log the loaded configuration
logger.info(
  `DB URL: http://${process.env.DB_ORDER_HOST}:${process.env.DB_ORDER_PORT}`
)
logger.info(
  `RabbitMQ URL: http://${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`
)
logger.info(
  `App Port: http://${process.env.APP_ORDER_HOST}:${process.env.APP_ORDER_INTERNAL_PORT}`
)

const port = Number(process.env.RMQ_PORT)

export default {
  db: {
    name: process.env.DB_ORDER_NAME || "orders",
    user: process.env.DB_ORDER_USER || "postgres",
    password: process.env.DB_ORDER_PASSWORD || "password",
    host: process.env.DB_ORDER_HOST || "localhost",
    port: process.env.DB_ORDER_PORT || "5433",
  },
  rabbitmq: {
    username: process.env.RMQ_USER || "rabbitmq",
    password: process.env.RMQ_PASSWORD || "password",
    hostname: process.env.RMQ_HOST || "localhost",
    port: port || 5672,
  },
}
