import { Request, Response } from 'express';
import * as frequenciasService from '../services/frequenciasService';

export const getMediaFrequencia = async (req: Request, res: Response) => {
    try {
      const { classId, subject } = req.query;
      const medias = await frequenciasService.calcularMediaFrequenciaPorAluno(
        classId as string,
        subject as string
      );
      res.json(medias);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao calcular média de frequência.' });
    }
  };
  
  export const getFrequenciasDoAluno = async (req: Request, res: Response) => {
    const alunoId = Number(req.params.alunoId);
  
    try {
      const frequencias = await frequenciasService.getFrequenciasPorAlunoId(alunoId);
      res.json(frequencias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar frequências do aluno." });
    }
  };