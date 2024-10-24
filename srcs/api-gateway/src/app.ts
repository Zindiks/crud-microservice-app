import express, { Express, Request, Response } from "express"
import morgan from "morgan"

import billingRouter from "./routes/billing.routes"
import moviesRouter from "./routes/movies.routes"

const app: Express = express()

// Middlewares
app.use(express.json())
app.use(morgan("dev"))


// Routes
app.use("/billing", billingRouter)
app.use("/movies", moviesRouter)


app.get("/", (req: Request, res: Response) => {
  res.status(200).send("[GATEWAY] is up and running")
})

export default app
