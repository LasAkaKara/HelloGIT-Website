import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { verifyToken, authorizeRole } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.use(verifyToken);
router.use(authorizeRole("admin"));

router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
