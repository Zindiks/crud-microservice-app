import { Router } from "express"
import { addMovie } from "../controllers/movies.controller"

const router = Router()


//TODO: GET /api/movies retrieve all the movies.
//TODO: GET /api/movies?title=[name] retrieve all the movies with name in the title.
//TODO: POST /api/movies create a new product entry.
//TODO: DELETE /api/movies delete all movies in the database.


router.post("/", addMovie)



export default router
