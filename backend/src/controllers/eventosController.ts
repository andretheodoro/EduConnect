import { Request, Response } from 'express';
import { getTodosEventos } from '../services/eventosService';

export const listarEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await getTodosEventos();
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao listar eventos:', error);
    res.status(500).json({ message: 'Erro ao buscar eventos' });
  }
};
