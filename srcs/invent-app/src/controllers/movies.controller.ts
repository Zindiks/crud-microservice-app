import { Request, Response } from "express"
import { logger } from "../utils/logger"
import { Movies } from "../models/movies.model"

export const addMovie = async (req: Request, res: Response) => {
  const { title, description } = req.body

  try {
    const newMovie = await Movies.create({
      title,
      description,
    })
    res.status(201).json(newMovie)
  } catch (error) {
    logger.error("Error adding movie: ", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movies.findAll()

    res.status(200).json(movies)
  } catch (error) {
    logger.error("Error fetching movies: ", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const deleteMovies = async (req: Request, res: Response) => {
  logger.info(req.body)

  res.status(200).json(req.body)
}
