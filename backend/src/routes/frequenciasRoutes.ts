import { Router } from 'express';
import * as controller from '../controllers/frequenciasController';

const router = Router();

router.get('/media', controller.getMediaFrequencia);


export default router;
