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

  const validPassword = await bcrypt.compare(password, user.rows[0].senha);

  if (!validPassword) {
    throw new Error('Senha incorreta');
  }

  const token = jwt.sign(
    { id: user.rows[0].id, email: user.rows[0].email },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' }
  );

  return token;
};
