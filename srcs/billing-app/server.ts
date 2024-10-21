import express, { Express } from "express"
import { Request, Response } from "express"
import { serviceConfig } from "./src/config/config"
import { sequelizeConnection } from "./src/config/connection"
import { rabbitMQConnection } from "./src/config/rabbitmq"
import { Order } from "./src/models/order.models"
import router from "./src/routes/orders.routes"
import morgan from "morgan"

const app: Express = express()
const { port, host } = serviceConfig()

sequelizeConnection.addModels([Order])

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("[Billing-service] Health check passed!")
})

app.use(morgan("dev"))
app.use(router)

const start = async (): Promise<void> => {
  try {
    await sequelizeConnection.authenticate()
    await sequelizeConnection.sync({
      force: true,
    })
    await rabbitMQConnection()
    app.listen(Number(port), () => {
      console.log(
        `[Billing-service]: server is running at http://${host}:${port}`
      )
    })
  } catch (error) {
    console.error(`[Billing-service]: server failed to start. Error: ${error}`)
    process.exit(1)
  }
}

void start()
