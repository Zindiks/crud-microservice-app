import "./src/config/config" // Load environment configuration first
import app from "./src/app"
import { sequelize } from "./src/config/connection"
import { logger } from "./src/utils/logger"
import { SERVICE_NAME, green } from "./src/utils/terminal-styles"

const start = async () => {
  await sequelize.sync()
  const PORT = process.env.APP_INVENTORY_INTERNAL_PORT || 8080
  app.listen(PORT, () => {
    logger.info(SERVICE_NAME + green(` ✅ Service is running at port ${PORT}`))
  })
  // try {
  //   await sequelize.sync();
  //   logger.info(SERVICE_NAME + green(" ✅ Database synced successfully."));

  //   const PORT = process.env.APP_INVENTORY_INTERNAL_PORT || 8080;
  //   app.listen(PORT, () => {
  //     logger.info(
  //       SERVICE_NAME + green(` ✅ Service is running at port ${PORT}`),
  //     );
  //   });
  // } catch (error) {
  //   logger.error(" Error starting server:", error);
  //   // process.exit(1);
  // }
}

start()
