import express from "express";
import {
  getAllEvents,
  createEvent,
  getEventsById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controllers.js";
import { authorizeRole, verifyToken } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventsById);
router.post("/", verifyToken, authorizeRole("member", "admin"), createEvent);
router
  .route("/:id")
  .put(verifyToken, authorizeRole("member", "admin"), updateEvent)
  .delete(verifyToken, authorizeRole("member", "admin"), deleteEvent);

export default router;
