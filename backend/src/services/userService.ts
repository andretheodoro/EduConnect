import pool from '../config/database'; 

export const getUsuarioPorId = async (id: string) => {
  const result = await pool.query(
    `SELECT id, name, email, type, education_level, teaching_area, teaching_segment 
     FROM users 
     WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};
