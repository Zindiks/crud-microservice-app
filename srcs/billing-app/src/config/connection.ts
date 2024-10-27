import { Sequelize } from "sequelize-typescript"
import config from "./config"
import {Orders} from "../models/orders.models"



const {name,user,password,host,port} = config.db



export const sequelize = new Sequelize({
  models: [Orders],
  dialect: "postgres",
  database: name,
  username: user,
  password: password,
  host: host,
  port: Number(port),
})

console.log(sequelize)