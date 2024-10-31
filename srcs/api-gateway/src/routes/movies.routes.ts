import { Router } from "express";
import { moviesProxyMiddleware } from "./proxy";

const router = Router();
router.all("/", moviesProxyMiddleware);
router.all("/:id", moviesProxyMiddleware);

export default router;
