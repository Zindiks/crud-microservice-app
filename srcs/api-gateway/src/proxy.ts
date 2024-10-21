import {
  createProxyMiddleware,
  fixRequestBody,
  debugProxyErrorsPlugin,
  loggerPlugin,
  errorResponsePlugin,
  proxyEventsPlugin,
} from "http-proxy-middleware"

const inventory_host = process.env.INVENTORY_APP_HOST
const inventory_port = process.env.INVENTORY_APP_PORT
const billing_host = process.env.BILLING_APP_HOST
const billing_port = process.env.BILLING_APP_PORT

export const moviesProxyMiddleware = createProxyMiddleware({
    target: `http://${inventory_host}:${inventory_port}`,
    changeOrigin:true,
    ejectPlugins:true,
    pathRewrite:{
        '^/api/movies': '/movies'
    },
    on:{
        proxyReq: fixRequestBody
    },
    plugins:[debugProxyErrorsPlugin,loggerPlugin,errorResponsePlugin,proxyEventsPlugin]
})

export const ordersProxyMiddleware = createProxyMiddleware({
    target: `http://${billing_host}:${billing_port}`,
    changeOrigin: true,
    ejectPlugins:true,
    pathRewrite:{
        '^/api/billing': '/billing'
    },
    on:{
        proxyReq: fixRequestBody
    },
    plugins: [debugProxyErrorsPlugin,loggerPlugin,errorResponsePlugin,proxyEventsPlugin]
})