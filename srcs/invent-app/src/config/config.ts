// export const DB_BASE_URL = `postgres://${process.env.DB_INVENTORY_USER}:${process.env.DB_INVENTORY_PASSWORD}@${process.env.DB_INVENTORY_HOST}:${process.env.DB_INVENTORY_PORT}/${process.env.DB_INVENTORY_NAME}`

export default {
  db: {
    name: process.env.DB_INVENTORY_NAME || "movies",
    user: process.env.DB_INVENTORY_USER || "postgres",
    password: process.env.DB_INVENTORY_PASSWORD || "password",
    host: process.env.DB_INVENTORY_HOST || "localhost",
    port: process.env.DB_INVENTORY_PORT || "5432",
  },
}