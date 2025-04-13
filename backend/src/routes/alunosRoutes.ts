import { Router } from 'express';
import * as controller from '../controllers/alunoSController';

const router = Router();

router.get('/turmas', controller.getTurmas);


export default router;
