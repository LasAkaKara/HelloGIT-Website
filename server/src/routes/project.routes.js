import express from 'express';
import { getAllProjects, createProject, getProjectById } from '../controllers/project.controllers.js';
const router = express.Router();

router.get('/', getAllProjects);
router.post('/', createProject);
router.get('/:id', getProjectById);

export default router; 