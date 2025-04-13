import pool from '../config/database'; 

export async function calcularMediaNotasPorAluno(classId?: string, subject?: string) {
    const conditions = [];
    const values: any[] = [];
  
    if (classId) {
      values.push(classId);
      conditions.push(`a.class_id = $${values.length}`);
    }
  
    if (subject) {
      values.push(subject);
      conditions.push(`n.subject = $${values.length}`);
    }
  
    const whereClause = conditions.length ? `AND ${conditions.join(' AND ')}` : '';
  
    const query = `
      SELECT 
        a.id AS aluno_id,
        a.name,
        COALESCE(ROUND(AVG(n.grade), 2), 0) AS media_nota
      FROM Students a
      LEFT JOIN Grades n ON a.id = n.student_id
      WHERE n.teacher_id IS NOT NULL
      ${whereClause}
      GROUP BY a.id
      ORDER BY a.name;
    `;
  
    const result = await pool.query(query, values);
    return result.rows;
  }

export async function retornarDisciplinas() {
    const result = await pool.query(`
        SELECT DISTINCT subject FROM Grades;
    `);
    return result.rows;
}

