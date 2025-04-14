import { Router } from 'express';
import { listarEventos, criarEvento, getEventosDoUsuario } from '../controllers/eventosController';

const router = Router();

router.get('/', listarEventos);
router.post('/', criarEvento);
router.get('/:usuarioId', getEventosDoUsuario);

export default router;
