import { Request, Response } from "express";
import { Movies } from "../models/movies.model";
import {
  getMovieById,
  updateMovieById,
  deleteMoviesById,
} from "../controllers/movie.controller";
import { UniqueConstraintError } from "sequelize";

jest.mock("../models/movies.model");
jest.mock("../utils/logger");

describe("Single Movie Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = {
      params: { id: "1" },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
      send: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe("getMovieById", () => {
    it("should get a movie by id successfully", async () => {
      const movie = {
        id: 1,
        title: "Test Movie",
        description: "Test Description",
      };

      (Movies.findByPk as jest.Mock).mockResolvedValueOnce(movie);

      await getMovieById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(movie);
    });

    it("should return 404 when movie not found", async () => {
      (Movies.findByPk as jest.Mock).mockResolvedValueOnce(null);

      await getMovieById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Movie not found",
      });
    });
  });

  describe("updateMovieById", () => {
    it("should update a movie successfully", async () => {
      const movieData = {
        title: "Updated Movie",
        description: "Updated Description",
      };
      mockRequest.body = movieData;

      const updatedMovie = { id: 1, ...movieData };
      (Movies.update as jest.Mock).mockResolvedValueOnce([1, [updatedMovie]]);

      await updateMovieById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedMovie);
    });

    it("should return 404 when movie not found for update", async () => {
      mockRequest.body = {
        title: "Updated Movie",
        description: "Updated Description",
      };

      (Movies.update as jest.Mock).mockResolvedValueOnce([0, []]);

      await updateMovieById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Movie not found",
      });
    });

    it("should handle duplicate title error during update", async () => {
      mockRequest.body = {
        title: "Duplicate Title",
        description: "Updated Description",
      };

      (Movies.update as jest.Mock).mockRejectedValueOnce(
        new UniqueConstraintError({}),
      );

      await updateMovieById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Movie with this title already exists",
      });
    });
  });

  describe("deleteMoviesById", () => {
    it("should delete a movie successfully", async () => {
      (Movies.destroy as jest.Mock).mockResolvedValueOnce(undefined);

      await deleteMoviesById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
});
