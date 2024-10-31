import express, { Express, Request, Response } from "express";
import { SERVICE_NAME, style } from "./utils/terminal-styles";
import cors from "cors";
import helmet from "helmet";
import { limiter } from "./middleware/rateLimiter.middleware";
import { logger, loggerHttp } from "./utils/logger";
import billingRouter from "./routes/billing.routes";
import moviesRouter from "./routes/movies.routes";

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(loggerHttp);
app.use(helmet());

// Routes

const apiRouter = express.Router();
apiRouter.use("/billing", billingRouter);
apiRouter.use("/movies", moviesRouter);
apiRouter.use("/health", async (req: Request, res: Response) => {
  try {
    logger.info(SERVICE_NAME + style(" Successfully.", ["green"]));
  } catch (error) {
    logger.error(SERVICE_NAME + ` Unsuccesfully:`, error);
  }

  res.status(200).json({ status: "OK", service: "api-gateway" });
});

app.use("/api", apiRouter);

export default app;
