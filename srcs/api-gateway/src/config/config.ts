import dotenv from "dotenv";

dotenv.config({ path: ".env" });
export interface RabbitMQConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

export interface GatewayConfig {
  PORT: number;
  host: string;
}

export interface AppsConfig {
  inventory_host: string;
  inventory_port: string;
  billing_host: string;
  billing_port: string;
}

export const rabbitMQConfig = (): RabbitMQConfig => {
  return {
    host: process.env.RMQ_HOST || "localhost",
    port: Number(process.env.RMQ_PORT) || 5672,
    username: process.env.RMQ_USER || "rabbitmq",
    password: process.env.RMQ_PASSWORD || "password",
  };
};

export const gatewayConfig = (): GatewayConfig => {
  return {
    PORT: Number(process.env.API_GATEWAY_PORT) || 3000,
    host: process.env.API_GATEWAY_HOST || "localhost",
  };
};

export const appsConfig = (): AppsConfig => {
  return {
    inventory_host: process.env.APP_INVENTORY_HOST || "localhost",
    inventory_port: process.env.APP_INVENTORY_INTERNAL_PORT || "8081",
    billing_host: process.env.APP_ORDER_HOST || "localhost",
    billing_port: process.env.APP_ORDER_INTERNAL_PORT || "8082",
  };
};
