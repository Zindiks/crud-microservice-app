import { Order } from "../models/order.models"
import { Request, Response } from "express"

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.findAll()
  res.json(orders)
}
