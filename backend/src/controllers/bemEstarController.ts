import { Request, Response } from 'express';
import * as bemEstarService from '../services/bemEstarService';

export const enviarRespostas = async (req: Request, res: Response) => {
  try {
    const { usuarioId, respostas } = req.body;
    await bemEstarService.salvarRespostas(usuarioId, respostas);
    res.status(201).json({ message: 'Respostas enviadas com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar respostas' });
  }
};

export const obterEstatisticas = async (_req: Request, res: Response) => {
  try {
    const dados = await bemEstarService.getEstatisticas();
    res.json(dados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
};

export const obterRespostasAlunos = async (_req: Request, res: Response) => {
    try {
      const dados = await bemEstarService.getAlunosEmAlerta();
      res.json(dados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar respostas dos alunos' });
    }
  };
  
  export const obterRespostasAluno = async (req: Request, res: Response) => {
    try {
      const { usuarioId } = req.params;
  
      const dados = await bemEstarService.getRespostasAluno(usuarioId);
  
      if (!dados) {
        res.status(404).json({ error: 'Respostas não encontradas' });
      }
  
      res.json(dados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar respostas do aluno' });
    }
  };
  