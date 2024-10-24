import { Request, Response } from "express"
import { Orders } from "../models/orders.models"
import { getOrders } from "../controllers/order.controller"

jest.mock("../models/orders.models")
jest.mock("../utils/logger")

describe("Orders Controller", () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let responseObject = {}

  beforeEach(() => {
    mockRequest = {}
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result
        return mockResponse
      }),
      send: jest.fn().mockReturnThis(),
    }
    jest.clearAllMocks()
  })



  

describe("getOrders", () => {
  it("should return all orders when no query provided", async () => {
    const orders = [
      {
        id: 1,
        user_id: 101,
        number_of_items: 5,
        total_amount: 150.75,
      },
      {
        id: 2,
        user_id: 102,
        number_of_items: 3,
        total_amount: 90.5,
      },
    ]

    mockRequest.query = {}
    ;(Orders.findAll as jest.Mock).mockResolvedValueOnce(orders)

    await getOrders(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(orders)
  })

  it("should filter orders when query provided", async () => {
    const orders = [
      {
        id: 1,
        user_id: 101,
        number_of_items: 5,
        total_amount: 150.75,
      },
    ]

    mockRequest.query = { user_id: "101" }
    ;(Orders.findAll as jest.Mock).mockResolvedValueOnce(orders)

    await getOrders(mockRequest as Request, mockResponse as Response)

    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.json).toHaveBeenCalledWith(orders)
  })
})
})
