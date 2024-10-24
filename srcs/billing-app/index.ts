import "./src/config/config" // Load environment configuration first
import app from "./src/app"
import { sequelize } from "./src/config/connection"
import { logger } from "./src/utils/logger"
import { style, SERVICE_NAME } from "./src/utils/terminal-styles"
import { rabbitmqConn } from "./src/config/rabbitmq"

const PORT = process.env.APP_ORDER_PORT || 8080

const start = async () => {
  try {
    await sequelize.sync()
    logger.info(
      SERVICE_NAME + style(" Database synced successfully.", ["green"])
    )

    await rabbitmqConn()

    logger.info(
      SERVICE_NAME + style(" RabbitMQ synced successfully.", ["green"])
    )

    app.listen(PORT, () => {
      logger.info(
        SERVICE_NAME + style(` Service is running at port ${PORT}`, ["green"])
      )
    })
  } catch (error) {
    logger.error("Error starting server:", error)
    process.exit(1)
  }
}

start()
