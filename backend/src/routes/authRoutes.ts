import express from 'express';
import { login, generateHash } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.post('/gerar-hash', generateHash);

export default router;
