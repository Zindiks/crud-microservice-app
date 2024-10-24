import { Request, Response } from "express"
import { UniqueConstraintError } from "sequelize"
import { Op } from "sequelize"
import { logger } from "../utils/logger"
import { Movies } from "../models/movies.model"

export const addMovie = async (req: Request, res: Response) => {
  const { title, description } = req.body

  try {
    const newMovie = await Movies.create({
      title,
      description,
    })
    logger.info(newMovie)
    res.status(201).json(newMovie)
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      logger.warn("Movie with this title already exists:", title)
      res.status(400).json({ message: "Movie with this title already exists" })
      return
    }

    logger.error("Error adding movie:", error)
    res.status(500).json({ message: "Internal server error" })
    return
  }
}

export const getMovies = async (req: Request, res: Response) => {
  const { title } = req.query

  try {
    if (title) {
      const movies = await Movies.findAll({
        where: {
          title: {
            [Op.like]: `%${title}%`,
          },
        },
      })
      res.status(200).json(movies)
      return
    }

    const movies = await Movies.findAll()
    res.status(200).json(movies)
    return
  } catch (error) {
    logger.error("Error fetching movies:", error)
    res.status(500).json({ message: "Internal server error" })
    return
  }
}

export const deleteMovies = async (req: Request, res: Response) => {
  try {
    await Movies.destroy({ where: {} })
    res.status(204).send()
    return
  } catch (error) {
    logger.error("Error deleting movies:", error)
    res.status(500).json({ message: "Internal server error" })
    return
  }
}
