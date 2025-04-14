import { Router } from 'express';
import * as controller from '../controllers/notasController';

const router = Router();

router.get('/media', controller.getMediaNotas);
router.get('/disciplinas', controller.getDisciplinas);
router.get('/aluno/:alunoId', controller.getNotasDoAluno);

export default router;
