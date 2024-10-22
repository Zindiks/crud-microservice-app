import { Request, Response } from "express"
import { logger } from "../utils/logger"

export const addMovie = async (req: Request, res: Response) => {
  logger.info(req.body)

  
  res.status(200).json(req.body)
}
