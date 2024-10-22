import "dotenv/config"
import app from "./src/app"
import { SERVICE_NAME, style } from "./src/utils/terminal-styles"
import { sequelize } from "./src/config/connection"
import { logger } from "./src/utils/logger"

const PORT = process.env.APP_INVENTORY_PORT

const start = async () => {
  try {
    await sequelize.sync({ force: false })
    logger.info(`${SERVICE_NAME} Database synced successfully.`)
    app.listen(PORT, () => {
      logger.info(`${SERVICE_NAME} Service is running at port ${PORT}`)
    })
  } catch (error) {
    logger.error(`${SERVICE_NAME} Unable to connect to the database:`, error)
  }
}

start()
