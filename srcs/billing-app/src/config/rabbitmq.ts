import client, { Connection, Channel, ConsumeMessage } from "amqplib";
import config from "./config";
import { logger } from "../utils/logger";
import { green, RABBITMQ_TAG, red } from "../utils/terminal-styles";
import { Orders } from "../models/orders.models";

const { username, password, port, hostname } = config.rabbitmq;

console.log(hostname);
console.log(config.rabbitmq);

const QUEUE = "BILLING_QUEUE";

export const rabbitmqConn = async () => {
  try {
    const connection: Connection = await client.connect({
      username,
      password,
      hostname,
      port: port,
    });

    const channel: Channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });

    await channel.consume(QUEUE, async (message: ConsumeMessage | null) => {
      if (message) {
        logger.info(
          RABBITMQ_TAG + `: received message: ${message.content.toString()}`,
        );

        const data = JSON.parse(message.content.toString());
        await Orders.create(data);

        logger.info(RABBITMQ_TAG + green(": order created successfully"));
        channel.ack(message);
        logger.info(RABBITMQ_TAG + green(": message processed successfully"));
      }
    });
    logger.info(RABBITMQ_TAG + `: waiting for messages in ${QUEUE}`);
  } catch (error) {
    logger.error(RABBITMQ_TAG + red(`: connection failed. ${error}`));
  }
};
