import { Request, Response } from 'express';
import * as turmasService from '../services/turmasService';

export const listarTurmas = async (req: Request, res: Response) => {
  try {
    const eventos = await turmasService.getTodasTurmas();
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao listar turmas:', error);
    res.status(500).json({ message: 'Erro ao buscar turmas' });
  }
};
