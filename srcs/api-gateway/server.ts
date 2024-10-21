import app from "./src/app"

const PORT = process.env.API_GATEWAY_PORT

const start = () => {
  app.listen(PORT, () => {
    console.log(`[GATEWAY]: gateway is running at port ${PORT}`)
  })
}

start() 
