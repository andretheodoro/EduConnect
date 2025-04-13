import { Request, Response } from 'express';
import * as alunosService from '../services/alunosService';

export const getTurmas = async (req: Request, res: Response) => {
  try {
    const turmas = await alunosService.retornarTurmas();
    res.json(turmas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar Turmas.' });
  }
};