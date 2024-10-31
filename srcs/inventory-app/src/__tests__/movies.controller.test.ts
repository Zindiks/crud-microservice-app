import { Request, Response } from "express";
import { Movies } from "../models/movies.model";
import {
  addMovie,
  getMovies,
  deleteMovies,
} from "../controllers/movies.controller";
import { UniqueConstraintError } from "sequelize";

// Mock the Movies model
jest.mock("../models/movies.model");
jest.mock("../utils/logger");

describe("Movies Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject = {};

  beforeEach(() => {
    mockRequest = {};
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

  describe("addMovie", () => {
    it("should create a new movie successfully", async () => {
      const movieData = {
        title: "Test Movie",
        description: "Test Description",
      };

      mockRequest.body = movieData;

      (Movies.create as jest.Mock).mockResolvedValueOnce(movieData);

      await addMovie(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(movieData);
    });

    it("should handle duplicate movie titles", async () => {
      const movieData = {
        title: "Duplicate Movie",
        description: "Test Description",
      };

      mockRequest.body = movieData;

      (Movies.create as jest.Mock).mockRejectedValueOnce(
        new UniqueConstraintError({}),
      );

      await addMovie(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Movie with this title already exists",
      });
    });
  });

  describe("getMovies", () => {
    it("should return all movies when no title query", async () => {
      const movies = [
        { title: "Movie 1", description: "Description 1" },
        { title: "Movie 2", description: "Description 2" },
      ];

      mockRequest.query = {};

      (Movies.findAll as jest.Mock).mockResolvedValueOnce(movies);

      await getMovies(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(movies);
    });

    it("should filter movies by title when query provided", async () => {
      const movies = [{ title: "Movie 1", description: "Description 1" }];

      mockRequest.query = { title: "Movie 1" };

      (Movies.findAll as jest.Mock).mockResolvedValueOnce(movies);

      await getMovies(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(movies);
    });
  });

  describe("deleteMovies", () => {
    it("should delete all movies successfully", async () => {
      (Movies.destroy as jest.Mock).mockResolvedValueOnce(undefined);

      await deleteMovies(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });
  });
});
