import { Sequelize } from "sequelize-typescript";
import config from "./config";
import { Movies } from "../models/movies.model";

export const sequelize = new Sequelize({
  models: [Movies],
  dialect: "postgres",
  database: config.db.name,
  username: config.db.user,
  password: config.db.password,
  host: config.db.host,
  port: +config.db.port,
});
