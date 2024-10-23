import "dotenv/config"
import { validateEnv } from "./src/config/env.schema"
import app from "./src/app"
import { logger } from "./src/utils/logger"
import { green, red, SERVICE_NAME } from "./src/utils/terminal-styles"
import { sequelize } from "./src/config/connection"

const env = validateEnv()
const PORT = env.APP_INVENTORY_PORT

const start = async () => {
  try {
    await sequelize.sync({ force: false })
    logger.info(SERVICE_NAME + green(" Database synced successfully."))
    app.listen(PORT, () => {
      logger.info(SERVICE_NAME + green(` Service is running at port ${PORT}`))
    })
  } catch (error) {
    logger.error(
      SERVICE_NAME + red(" Unable to connect to the database"),
      error
    )
  }
}

start()
