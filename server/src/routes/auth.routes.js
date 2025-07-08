import express from 'express';
import {register, login} from '../controllers/auth.controllers.js';
import {generateInviteToken} from '../controllers/registrationInvite.controllers.js';
import { authorizeRole, verifyToken } from '../middlewares/auth.middlewares.js';

const router = express.Router();
router.post('/invite', verifyToken, authorizeRole("admin"), generateInviteToken); // for generating invite tokens
router.post('/register', register); // keep for seeding the first admin
router.post('/login', login);

export default router;
