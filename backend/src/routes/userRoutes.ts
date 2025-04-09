import express from 'express';
import { createUser, getUserProfile } from '../controllers/userController';

const router = express.Router();

router.post('/register', createUser);
router.get('/profile/:userId', getUserProfile);

export default router;
