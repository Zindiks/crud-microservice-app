import { Sequelize } from "sequelize-typescript"
import config from "./config"
import {Orders} from "../models/orders.models"


export const sequelize = new Sequelize({
  models: [Orders],
  dialect: "postgres",
  database: config.db.name,
  username: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: +config.db.port,
})
