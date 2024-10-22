import { z } from "zod"

export const createMovieSchema = z.object({
  title: z.string().min(1, "Name is required"),
  description: z.string().min(3, " Description is required"),
})

const movieResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
})
