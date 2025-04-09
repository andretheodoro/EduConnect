// src/routes/assistenteRoutes.ts
import express from 'express';
import { consultarAssistente } from '../controllers/assistenteController';

const router = express.Router();

router.post('/assistente', consultarAssistente);

export default router;
