import { Router } from "express"
import { deleteMoviesById, getMovieById, updateMovieById } from "../controllers/movie.controller"
const router = Router()

//TODO: GET /api/movies/:id retrieve a single movie by id.
//TODO: PUT /api/movies/:id update a single movie by id.
//TODO: DELETE /api/movies/:id delete a single movie by id.


router.get("/:id", getMovieById )
router.put("/:id", updateMovieById)
router.delete("/:id", deleteMoviesById )



export default router