import { Router } from "express"
import { addMovie, deleteMovies, getMovies } from "../controllers/movies.controller"
import {createMovieSchema} from "../models/movies.schema"

import validate from "../middleware/validation.middleware"

const router = Router()


//TODO: GET /api/movies retrieve all the movies.
//TODO: GET /api/movies?title=[name] retrieve all the movies with name in the title.
//TODO: POST /api/movies create a new product entry.
//TODO: DELETE /api/movies delete all movies in the database.


router.post("/", validate(createMovieSchema) , addMovie)
router.get("/", getMovies)
router.delete("/",deleteMovies)




export default router
