import { Request, Response } from "express"
import { UniqueConstraintError } from "sequelize"
import { logger } from "../utils/logger"
import { Movies } from "../models/movies.model"

export const getMovieById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const movie = await Movies.findByPk(Number(id))
    if (!movie) {
      res.status(404).json({ message: "Movie not found" })
      return
    }
    res.status(200).json(movie)
    return
  } catch (error) {
    logger.error("Error fetching movie:", error)
    res.status(500).json({ message: "Internal server error" })
    return
  }
}

export const updateMovieById = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description } = req.body

  try {
    const [updatedCount, [updatedMovie]] = await Movies.update(
      { title, description },
      {
        where: { id: Number(id) },
        returning: true, // just to get return result
      }
    )

    if (updatedCount) {
      res.status(200).json(updatedMovie) 
      return
    }

    res.status(404).json({ message: "Movie not found" })
    return
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      logger.warn("Movie with this title already exists:", title)
      res
        .status(400)
        .json({ message: "Movie with this title already exists" })

        return
    }

    logger.error("Error updating movie:", error)
    res.status(500).json({ message: "Internal server error" })
    return
  }
}

export const deleteMoviesById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await Movies.destroy({ where: { id: Number(id) } })
    res.status(204).send()
    return
  } catch (error) {
    logger.error("Error deleting movies:", error)
    res.status(500).json({ message: "Internal server error" })
    return
  }
}
