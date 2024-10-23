import { Router } from "express"
import {
  addMovie,
  deleteMovies,
  getMovies,
} from "../controllers/movies.controller"
import { createMovieSchema } from "../models/movies.schema"

import {
  deleteMoviesById,
  getMovieById,
  updateMovieById,
} from "../controllers/movie.controller"

import validate from "../middleware/validation.middleware"

const router = Router()

router.get("/", getMovies)
router.post("/", validate(createMovieSchema), addMovie)
router.delete("/", deleteMovies)

router.get("/:id", getMovieById)
router.put("/:id", updateMovieById)
router.delete("/:id", deleteMoviesById)

export default router
