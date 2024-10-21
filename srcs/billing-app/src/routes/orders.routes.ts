import Router from "express"
import { getOrders } from "../controllers/order.controller"
const router = Router()

router.get("/billing", getOrders)

export default router
