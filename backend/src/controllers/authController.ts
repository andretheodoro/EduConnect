import { Request, Response } from 'express';
import { loginUser } from '../services/authService';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, usuario } = await loginUser(email, password);
    res.status(200).json({ token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        tipo: usuario.tipo, // 'professor' ou 'aluno'
      }, });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const generateHash = async (req: Request, res: Response) => {
  try {
    const { senha } = req.body;

    if (!senha) {
      res.status(400).json({ message: 'A senha é obrigatória.' });
    }

    const saltRounds = 10;
    const hashed = await bcrypt.hash(senha, saltRounds);
    res.status(200).json({ senha, hash: hashed });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar hash.', error });
  }
};