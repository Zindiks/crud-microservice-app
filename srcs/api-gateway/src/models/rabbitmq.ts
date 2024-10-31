import client, { Connection, Channel } from "amqplib";
import { rabbitMQConfig } from "../config/config";

const { host, username, password, port } = rabbitMQConfig();

const url = `amqp://${username}:${password}@${host}:${port}`;

const QUEUE_NAME = "BILLING_QUEUE";

export class Publish {
  channel: Channel | null;

  constructor() {
    this.channel = null;
  }

  async createChannel() {
    try {
      const connection: Connection = await client.connect(url);
      this.channel = await connection.createChannel();

      await this.channel.assertQueue(QUEUE_NAME, { durable: true });
      console.log(`[RabbitMQ]: waiting for messages in ${QUEUE_NAME}`);
    } catch (error) {
      console.error(`[RabbitMQ]: failed to connect to RabbitMQ. ${error}`);
    }
  }

  async sendToBillingQueue(message: any) {
    if (!this.channel) {
      await this.createChannel();
    } else {
      try {
        this.channel.sendToQueue(
          QUEUE_NAME,
          Buffer.from(JSON.stringify(message)),
          {
            persistent: true,
          },
        );
      } catch (error) {
        console.error(`[RabbitMQ]: failed to send message to queue. ${error}`);
      }
    }
  }
}
