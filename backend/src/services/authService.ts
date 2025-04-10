import pool from '../config/database'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const loginUser = async (email: string, password: string) => {
  const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

  if (user.rowCount === 0) {
    throw new Error('Usuário não encontrado');
  }

  const usuario = user.rows[0];

  const validPassword = await bcrypt.compare(password, usuario.senha);

  if (!validPassword) {
    throw new Error('Senha incorreta');
  }
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, tipo: usuario.tipo_usuario }, // já envia tipo no payload também
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  // Retorna token e dados relevantes do usuário
  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo_usuario,
    }
  };
};
