import express from "express";
import { syncPostsFromSheet } from "../controllers/syncPost.controllers.js";

const router = express.Router();
router.get("/", syncPostsFromSheet);

export default router;
