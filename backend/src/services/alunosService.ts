import pool from '../config/database'; 

export async function retornarTurmas() {
    const result = await pool.query(`
        SELECT DISTINCT Classes.id, Classes.name FROM Students INNER JOIN Classes ON Students.class_id = Classes.id;`);
    return result.rows;
}

