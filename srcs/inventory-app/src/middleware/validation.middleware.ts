import { Request, Response, NextFunction } from "express"
import { ZodSchema } from "zod"

const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      res.status(400).json({ error: result.error.errors })
      return
    }

    req.body = result.data
    next()
  }
}

export default validate
