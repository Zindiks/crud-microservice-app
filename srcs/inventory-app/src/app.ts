import express, { Express, Request, Response } from "express"
import { sequelize } from "./config/connection"
import { green, red, SERVICE_NAME, style } from "./utils/terminal-styles"
import cors from "cors"
import moviesRouter from "./routes/movies.router"
import { logger, loggerHttp } from "./utils/logger"
import swaggerUi from "swagger-ui-express"
import { specs } from "./config/swagger"
import helmet from "helmet"
import { limiter } from "./middleware/rateLimiter.middleware"

const app: Express = express()
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(limiter)
app.use(loggerHttp)

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))

app.use("/movies", moviesRouter)

app.get("/health", async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate()

    logger.info(
      SERVICE_NAME +
        green(" ✅ Connection with database has been established successfully.")
    )
  } catch (error) {
    logger.error(
      SERVICE_NAME + red(`❌ Unable to connect to the database:`),
      error
    )
  }

  res.status(200).json({ status: "OK", service: "inventory-app" })
})
// ;async () => {
//   await sequelize.sync()
// }
export default app
