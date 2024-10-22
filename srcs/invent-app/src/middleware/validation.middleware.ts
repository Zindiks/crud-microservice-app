import { Request, Response, NextFunction } from "express"
import { ZodSchema } from "zod"

const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      // If validation fails, return a 400 error with the validation details
      res.status(400).json({ error: result.error.errors })
      return
    }

    // If validation succeeds, replace the body with parsed data and call next()
    req.body = result.data
    next()
  }
}

export default validate
