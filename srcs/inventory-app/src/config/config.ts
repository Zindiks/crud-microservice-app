import dotenv from "dotenv";
import { logger } from "../utils/logger";
import { SERVICE_NAME } from "../utils/terminal-styles";

logger.info(SERVICE_NAME);
// Then check NODE_ENV and load additional environment if needed
if (process.env.NODE_ENV === "development") {
  logger.info("Loading development environment");
  dotenv.config({ path: ".env.dev" });
} else {
  logger.info("Loading production environment");
  dotenv.config({ path: ".env" });
}

// Log the loaded configuration
logger.info(
  `DB ${process.env.DB_INVENTORY_HOST}:${process.env.DB_INVENTORY_PORT}`,
);
logger.info(
  `App Port: http://${process.env.APP_INVENTORY_HOST}:${process.env.APP_INVENTORY_INTERNAL_PORT}`,
);

export default {
  db: {
    name: process.env.DB_INVENTORY_NAME || "movies",
    user: process.env.DB_INVENTORY_USER || "postgres",
    password: process.env.DB_INVENTORY_PASSWORD || "password",
    host: process.env.DB_INVENTORY_HOST || "localhost",
    port: process.env.DB_INVENTORY_PORT || "5432",
  },
};
