import { Sequelize } from "sequelize-typescript"

import { dbConfig } from "./config"

const config = dbConfig()

export const sequelizeConnection = new Sequelize({
  logging: true,
  dialect: "postgres",
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.db_host,
  port: config.db_port,
})
