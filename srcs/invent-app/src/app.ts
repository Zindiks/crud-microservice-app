import express, { Express, Request, Response } from "express"
import { sequelize } from "./config/connection"
import { SERVICE_NAME, style } from "./utils/terminal-styles"
import cors from "cors"
import moviesRouter from "./routes/movies.router"
import { logger, loggerHttp } from "./utils/logger"
import swaggerUi from "swagger-ui-express"
import { specs } from "./config/swagger"
import helmet from "helmet"
import { limiter } from "./middleware/rateLimiter.middleware"

const app: Express = express()
app.use(express.json())
app.use(cors())
app.use(limiter)
app.use(loggerHttp)
app.use(helmet())

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))

app.use("/movies", moviesRouter)

app.get("/health", async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate()

    logger.info(
      SERVICE_NAME +
        style(" Connection with database has been established successfully.", [
          "green",
        ])
    )
  } catch (error) {
    logger.error(SERVICE_NAME + `Unable to connect to the database:`, error)
  }

  res.status(200).json({ status: "OK" })
})
;async () => {
  await sequelize.sync()
}
export default app
