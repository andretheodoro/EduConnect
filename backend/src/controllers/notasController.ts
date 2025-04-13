import { Request, Response } from 'express';
import * as notasService from '../services/notasService';

export const getMediaNotas = async (req: Request, res: Response) => {
    try {
      const { classId, subject } = req.query;
      const medias = await notasService.calcularMediaNotasPorAluno(
        classId as string,
        subject as string
      );
      res.json(medias);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao calcular média das notas.' });
    }
  };

  export const getDisciplinas = async (req: Request, res: Response) => {
    try {
      const medias = await notasService.retornarDisciplinas();
      res.json(medias);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar disciplinas.' });
    }
  };