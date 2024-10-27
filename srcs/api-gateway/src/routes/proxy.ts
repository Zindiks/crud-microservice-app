import {
  createProxyMiddleware,
  fixRequestBody,
  debugProxyErrorsPlugin,
  loggerPlugin,
  errorResponsePlugin,
  proxyEventsPlugin,
} from "http-proxy-middleware"

import { appsConfig } from "../config/config"

const { inventory_host, inventory_port, billing_host, billing_port } =
  appsConfig()

export const moviesProxyMiddleware = createProxyMiddleware({
  target: `http://${inventory_host}:${inventory_port}`,
  changeOrigin: true,
  ejectPlugins: true,
  on: {
    proxyReq: fixRequestBody,
  },
  plugins: [
    debugProxyErrorsPlugin,
    loggerPlugin,
    errorResponsePlugin,
    proxyEventsPlugin,
  ],
})

export const ordersProxyMiddleware = createProxyMiddleware({
  target: `http://${billing_host}:${billing_port}`,
  changeOrigin: true,
  ejectPlugins: true,
  on: {
    proxyReq: fixRequestBody,
  },
  plugins: [
    debugProxyErrorsPlugin,
    loggerPlugin,
    errorResponsePlugin,
    proxyEventsPlugin,
  ],
})
