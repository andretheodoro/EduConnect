import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'src/uploads/others';

    if (file.fieldname === 'image') {
      uploadPath = 'src/uploads/feed';
    } else if (file.fieldname === 'arquivo') {
      uploadPath = 'src/uploads/materials';
    } else if (file.fieldname === 'capa') {
      uploadPath = 'src/uploads/capas';
    }

    // Garante que o diretório exista
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const timestamp = Date.now();

    if (file.fieldname === 'image') {
      const uniqueName = `${timestamp}-${file.originalname}`;
      cb(null, uniqueName);
    } else {
      const rawTitle = req.body.titulo || 'sem-titulo';
      const safeTitle = rawTitle.toLowerCase().replace(/[^a-z0-9]/gi, '_');
      const filename = `${safeTitle}-${file.fieldname}${ext}`;
      cb(null, filename);
    }
  },
});

export const upload = multer({ storage });
