import pool from '../config/database'; 

export async function calcularMediaFrequenciaPorAluno(classId?: string, subject?: string) {
    const conditions = [];
    const values: any[] = [];
  
    if (classId) {
      values.push(classId);
      conditions.push(`a.class_id = $${values.length}`);
    }
  
    if (subject) {
      values.push(subject);
      conditions.push(`f.subject = $${values.length}`);
    }
  
    const whereClause = conditions.length ? `AND ${conditions.join(' AND ')}` : '';
  
    const query = `
      SELECT 
        a.id AS aluno_id,
        a.name,
        ROUND(
          100.0 * SUM(CASE WHEN f.present THEN 1 ELSE 0 END) / NULLIF(COUNT(f.id), 0),
          1
        ) AS media_frequencia
      FROM Students a
      LEFT JOIN Attendance f ON a.id = f.student_id
      WHERE f.teacher_id IS NOT NULL
      ${whereClause}
      GROUP BY a.id
      ORDER BY a.name;
    `;
  
    const result = await pool.query(query, values);
    return result.rows;
  }
  