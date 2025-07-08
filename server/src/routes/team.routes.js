import express from 'express';
import { getAllTeamMembers, createTeamMember, getTeamMemberById } from '../controllers/team.controllers.js';
import { authorizeRole } from '../middlewares/auth.middlewares.js';
const router = express.Router();

router.get('/', getAllTeamMembers);
router.post('/', authorizeRole('admin'), createTeamMember);
router.get('/:id', getTeamMemberById);

export default router; 