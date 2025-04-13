import { Router } from 'express';
import { upload } from '../config/multer';
import { uploadMaterial, listarMateriais } from '../controllers/uploadController';

const router = Router();

router.post(
  '/upload',
  upload.fields([
    { name: 'arquivo', maxCount: 1 },
    { name: 'capa', maxCount: 1 },
  ]),
  uploadMaterial
);

router.get('/materiais', listarMateriais);

export default router;
