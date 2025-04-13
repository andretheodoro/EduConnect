import { Router } from 'express';
import * as bemEstarController from '../controllers/bemEstarController';

const router = Router();

router.post('/respostas', bemEstarController.enviarRespostas);
router.get('/estatisticas', bemEstarController.obterEstatisticas);
router.get('/respostas-alunos', bemEstarController.obterRespostasAlunos);

export default router;
