import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { uploadMaterial, listarMateriais } from '../controllers/uploadController';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'arquivo') {
      cb(null, 'src/uploads/materials');
    } else if (file.fieldname === 'capa') {
      cb(null, 'src/uploads/capas');
    } else {
      cb(null, 'src/uploads/others');
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const rawTitle = req.body.titulo || 'sem-titulo';
    const safeTitle = rawTitle.toLowerCase().replace(/[^a-z0-9]/gi, '_');
    const filename = `${safeTitle}-${file.fieldname}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

router.post(
  '/upload',
  upload.fields([
    { name: 'arquivo', maxCount: 1 },
    { name: 'capa', maxCount: 1 }
  ]),
  uploadMaterial
);

router.get('/materiais', listarMateriais);

export default router;
