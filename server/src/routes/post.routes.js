// server/routes/posts.js
import express from "express";
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controllers.js";
import { authorizeRole, verifyToken } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", verifyToken, authorizeRole("member", "admin"), createPost);
router
  .route("/:id")
  .put(verifyToken, authorizeRole("member", "admin"), updatePost)
  .delete(verifyToken, authorizeRole("member", "admin"), deletePost);

export default router;
