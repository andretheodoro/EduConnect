import pool from '../config/database'; 

export const getTodasTurmas = async () => {
  const result = await pool.query('SELECT * FROM Classes');
  return result.rows;
};