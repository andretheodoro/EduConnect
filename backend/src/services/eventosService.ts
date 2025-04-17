import pool from '../config/database'; 
import { v4 as uuidv4 } from 'uuid';

export const getTodosEventos = async () => {
  const result = await pool.query('SELECT * FROM Events ORDER BY DATE ASC, TIME ASC');
  return result.rows;
};

export const criarEventoParaUsuario = async (
  date: string,
  time: string,
  description: string,
  usuarioId: string
) => {
  const id = uuidv4(); 

  const query = `
    INSERT INTO events (id, date, time, description, user_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [id, date, time, description, usuarioId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const criarEventoParaTurma = async (
  date: string,
  time: string,
  description: string,
  turmaId: number
) => {
  // Busca os alunos da turma
  const alunos = await pool.query(
    'SELECT user_id FROM students WHERE class_id = $1',
    [turmaId]
  );

  // Busca os professores da turma
  const professores = await pool.query(
    'SELECT user_id FROM teachers WHERE class_id = $1',
    [turmaId]
  );

  const usuarios = [...alunos.rows, ...professores.rows];

  const eventosCriados = [];

  for (const usuario of usuarios) {
    const evento = await criarEventoParaUsuario(date, time, description, usuario.user_id);
    eventosCriados.push(evento);
  }

  return eventosCriados;
};

export const getEventosPorUsuarioId = async (usuarioId: string) => {
  const query = `
    SELECT * FROM Events
    WHERE user_id = $1
    ORDER BY date ASC, time ASC;
  `;

  const result = await pool.query(query, [usuarioId]);
  return result.rows;
};
