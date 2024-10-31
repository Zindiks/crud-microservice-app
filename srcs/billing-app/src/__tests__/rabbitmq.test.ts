import { rabbitmqConn } from "../config/rabbitmq";
import { Orders } from "../models/orders.models";
import amqp, { Channel, Connection, ConsumeMessage } from "amqplib";
import { logger } from "../utils/logger";

jest.mock("amqplib");
jest.mock("../models/orders.models");
jest.mock("../utils/logger");

describe("rabbitmqConn", () => {
  let mockChannel: Partial<Channel>;
  let mockConnection: Partial<Connection>;
  const QUEUE = "BILLING_QUEUE";

  beforeEach(() => {
    mockChannel = {
      assertQueue: jest.fn().mockResolvedValue({}),
      consume: jest.fn(),
      ack: jest.fn(),
    };

    mockConnection = {
      createChannel: jest.fn().mockResolvedValue(mockChannel),
    };
    (amqp.connect as jest.Mock).mockResolvedValue(mockConnection);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should connect to RabbitMQ, consume a message, and create an order", async () => {
    const message: Partial<ConsumeMessage> = {
      content: Buffer.from(
        JSON.stringify({
          user_id: 123,
          number_of_items: 5,
          total_amount: 150.75,
        }),
      ),
    };

    (mockChannel.consume as jest.Mock).mockImplementationOnce(
      async (queue, callback) => {
        callback(message);
      },
    );

    await rabbitmqConn();

    expect(amqp.connect).toHaveBeenCalledWith({
      username: expect.any(String),
      password: expect.any(String),
      port: expect.any(Number),
      hostname: expect.any(String),
    });

    expect(mockChannel.assertQueue).toHaveBeenCalledWith(QUEUE, {
      durable: true,
    });

    expect(Orders.create).toHaveBeenCalledWith({
      user_id: 123,
      number_of_items: 5,
      total_amount: 150.75,
    });

    expect(mockChannel.ack).toHaveBeenCalledWith(message);
    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining(": message processed successfully"),
    );
  });

  it("should log an error if connection to RabbitMQ fails", async () => {
    (amqp.connect as jest.Mock).mockRejectedValueOnce(
      new Error("Connection failed"),
    );

    await rabbitmqConn();

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("connection failed."),
    );
  });
});
