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

  export const getNotasDoAluno = async (req: Request, res: Response) => {
    try {
      const { alunoId } = req.params;  
      if (!alunoId || isNaN(Number(alunoId))) {
        res.status(400).json({ error: 'Parâmetro alunoId inválido.' });
      }
  
      const notas = await notasService.getNotasPorAlunoId(Number(alunoId));
      res.json(notas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar notas do aluno.' });
    }

  };
  