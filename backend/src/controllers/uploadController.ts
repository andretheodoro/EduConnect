import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

// POST: Upload de material
export const uploadMaterial = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo } = req.body;
    const professorId = req.headers['professor-id'];

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (!files || !titulo || !professorId) {
      res.status(400).json({ message: 'Dados incompletos' });
      return;
    }

    const arquivo = files.arquivo?.[0];
    const capa = files.capa?.[0];

    if (!arquivo || !capa) {
      res.status(400).json({ message: 'Arquivo ou capa ausentes' });
      return;
    }

    const material = {
      titulo,
      arquivoPath: arquivo.filename,
      capaPath: capa.filename,
      professorId,
      dataUpload: new Date()
    };

    console.log('Material salvo:', material);
    res.status(201).json({ message: 'Material enviado com sucesso!', material });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no upload' });
  }
};

export const listarMateriais = async (req: Request, res: Response): Promise<void> => {
  try {
    const materialsDir = path.join(__dirname, '..', 'uploads', 'materials');
    const capasDir = path.join(__dirname, '..', 'uploads', 'capas');
    const arquivos = fs.readdirSync(materialsDir);

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    console.log("baseUrl",baseUrl);

    const materiais = arquivos.map((nomeArquivo) => {
      console.log("nomeArquivo",nomeArquivo);
      const arquivoPath = path.join(materialsDir, nomeArquivo);
      const stats = fs.statSync(arquivoPath);
      const dataUpload = stats.mtime;
      const nomeSemExtensao = path.parse(nomeArquivo).name;

      const baseName = nomeArquivo.split('-arquivo')[0];

      const possiveisExtensoes = ['.png', '.jpg', '.jpeg', '.webp'];
      let capaFinal: string | null = null;

      for (const ext of possiveisExtensoes) {
        const tentativa = path.join(capasDir, `${baseName}-capa${ext}`);
        if (fs.existsSync(tentativa)) {
          capaFinal = `${baseUrl}/uploads/capas/${baseName}-capa${ext}`;
          break;
        }
      }

      return {
        titulo: nomeSemExtensao,
        arquivoPath: `${baseUrl}/uploads/materials/${nomeArquivo}`,
        capaPath: capaFinal,
        dataUpload: fs.statSync(arquivoPath).mtime
      };
    });

    res.json(materiais);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar materiais' });
  }
};
