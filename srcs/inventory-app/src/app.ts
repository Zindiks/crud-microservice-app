import express, {Express, Request,Response} from "express"

import morgan from "morgan"
import cors from "cors"
import moviesRoutes from "./routes/movies"
import { sequelizeConnection } from "./config/db.config"
import { Movie } from "./models/movies"

const app:Express = express()



sequelizeConnection.addModels([Movie])


app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use("/",moviesRoutes)



app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("[Inventory-service] Health check passed!")
})





export default app



