import type { Request, Response, NextFunction } from 'express'

import { ZodType,ZodError } from 'zod'

type ValidationSource = 'body' | 'params' | 'query'

const SOURCE_LABELS: Record<ValidationSource, string> = {
  body: 'Validation failed',
  params: 'Invalid parameters',
  query: 'Invalid query parameters',
}

// Generic validation factory
const createValidator = (source: ValidationSource, schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req[source])
      if (source === 'body') req.body = data
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: SOURCE_LABELS[source],
          details: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        })
      }
      next(error)
    }
  }
}

export const validateBody = (schema: ZodType) => createValidator('body', schema)
export const validateParams = (schema: ZodType) => createValidator('params', schema)
export const validateQuery = (schema: ZodType) => createValidator('query', schema)