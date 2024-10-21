import app from "./src/app";


const PORT = process.env.INVENTORY_APP_PORT || 3001

const start = () => {
  app.listen(PORT, () => {
    console.log(`[INVENTORY]: Inventory service is running at port ${PORT}`)
  })
}

start() 
