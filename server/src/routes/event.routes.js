import express from 'express';
import { getAllEvents, createEvent, getEventsById } from '../controllers/event.controllers.js';
const router = express.Router();

router.get('/', getAllEvents);
router.post('/', createEvent);
router.get('/:id', getEventsById);

export default router; 