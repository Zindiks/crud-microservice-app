import { gatewayConfig } from "./src/config/config"
import app from "./src/app"
import { logger } from "./src/utils/logger"
import { SERVICE_NAME, style } from "./src/utils/terminal-styles"

const { PORT } = gatewayConfig()

const start = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(
        SERVICE_NAME + style(` Service is running at port ${PORT}`, ["green"])
      )
    })
  } catch (error) {
    logger.error(SERVICE_NAME + " Error starting server:", error)
    process.exit(1)
  }
}

start()
