import { Router } from "express";
import {
  addMovie,
  deleteMovies,
  getMovies,
} from "../controllers/movies.controller";
import {
  createMovieSchema,
  responseMovieSchema,
} from "../models/movies.schema";

import {
  deleteMoviesById,
  getMovieById,
  updateMovieById,
} from "../controllers/movie.controller";

import validate from "../middleware/validation.middleware";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the movie
 *         title:
 *           type: string
 *           description: The title of the movie
 *         description:
 *           type: string
 *           description: The movie description
 * /movies:
 *   get:
 *     summary: Get all movies
 *     description: Retrieve a list of all movies. Can filter by title.
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter movies by title
 *     responses:
 *       200:
 *         description: List of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *   post:
 *     summary: Create a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *       400:
 *         description: Invalid input
 *   delete:
 *     summary: Delete all movies
 *     responses:
 *       204:
 *         description: All movies deleted
 */
router.get("/", getMovies);
router.post("/", validate(createMovieSchema), addMovie);
router.delete("/", deleteMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Movie not found
 *   put:
 *     summary: Update a movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *       404:
 *         description: Movie not found
 *   delete:
 *     summary: Delete a movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Movie deleted
 *       404:
 *         description: Movie not found
 */
router.get("/:id", getMovieById);
router.put("/:id", updateMovieById);
router.delete("/:id", deleteMoviesById);

export default router;
