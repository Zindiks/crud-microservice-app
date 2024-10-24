import { Orders } from "../models/orders.models"

import { Request, Response } from "express"

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Orders.findAll()
  res.status(200).json(orders)
}
