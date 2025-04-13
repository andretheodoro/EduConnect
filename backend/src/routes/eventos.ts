import { Router } from 'express';
import { listarEventos } from '../controllers/eventosController';

const router = Router();

router.get('/', listarEventos);

export default router;
