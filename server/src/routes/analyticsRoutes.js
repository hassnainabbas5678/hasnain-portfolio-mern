import express from "express";
import { stats } from "../controllers/analyticsController.js";

const router = express.Router();
router.get("/", stats);
export default router;
