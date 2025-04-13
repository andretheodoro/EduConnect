import pool from '../config/database'; 

export const getTodosEventos = async () => {
  const result = await pool.query('SELECT * FROM Events ORDER BY DATE ASC, TIME ASC');
  return result.rows;
};
