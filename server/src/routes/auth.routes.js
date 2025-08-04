import express from "express";
import { register, login } from "../controllers/auth.controllers.js";
import { generateInviteToken } from "../controllers/registrationInvite.controllers.js";
import { authorizeRole, verifyToken } from "../middlewares/auth.middlewares.js";

const router = express.Router();
router.post(
  "/invite",
  verifyToken,
  authorizeRole("admin"),
  generateInviteToken
);
router.post("/register", register);
router.post("/login", login);

export default router;
