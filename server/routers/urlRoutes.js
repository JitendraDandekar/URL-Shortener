import express from "express";
import { createShortUrl, getInfo, getUrls, urlStats } from "../controllers/urlController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router()

router.get("/", protect, getUrls);
router.get("/stats", protect, urlStats);
router.post("/create", protect, createShortUrl);
router.get("/info", protect, getInfo);

export default router;
