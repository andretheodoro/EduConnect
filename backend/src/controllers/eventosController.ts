import { Request, Response } from 'express';
import * as eventosService from '../services/eventosService';

export const listarEventos = async (req: Request, res: Response) => {
  try {
    const eventos = await eventosService.getTodosEventos();
    res.status(200).json(eventos);
  } catch (error) {
    console.error('Erro ao listar eventos:', error);
    res.status(500).json({ message: 'Erro ao buscar eventos' });
  }
};

export const criarEvento = async (req: Request, res: Response) => {
  try {
    const { date, time, description, turmaId, usuarioId } = req.body;
console.log(usuarioId);

    if (!date || !time || !description) {
      res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
    }

    let resultado;

    if (turmaId > 0) {
      resultado = await eventosService.criarEventoParaTurma(date, time, description, Number(turmaId));
    } else {
      resultado = await eventosService.criarEventoParaUsuario(date, time, description, usuarioId);
    }

    res.status(201).json(resultado);
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).json({ error: 'Erro ao criar evento.' });
  }
};

export const getEventosDoUsuario = async (req: Request, res: Response) => {
  try {
    const { usuarioId } = req.params;

    if (!usuarioId) {
      res.status(400).json({ error: 'Parâmetro usuarioId inválido.' });
    }

    const eventos = await eventosService.getEventosPorUsuarioId(usuarioId);
    res.json(eventos);
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    res.status(500).json({ error: 'Erro ao buscar eventos.' });
  }
};