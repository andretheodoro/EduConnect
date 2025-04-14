import pool from '../config/database'; 

export const salvarRespostas = async (usuarioId: string, respostas: object) => {
  const studentQuery = `
  SELECT id FROM students WHERE user_id = $1`;
  const studentResult = await pool.query(studentQuery, [usuarioId]);

  if (studentResult.rowCount === 0) {
    throw new Error('Estudante não encontrado para o user_id fornecido.');
  }

  const studentId = studentResult.rows[0].id;
  const insertQuery = `
    INSERT INTO well_being_surveys (user_id, responses)
    VALUES ($1, $2)
  `;
  await pool.query(insertQuery, [studentId, respostas]);
};

export const getEstatisticas = async () => {
  const result = await pool.query('SELECT responses FROM well_being_surveys');

  const respostas = result.rows.map(row => row.responses);
  const estatisticas: any = {};

  respostas.forEach((resposta: any) => {
    Object.entries(resposta).forEach(([topico, valor]) => {
      const num = Number(valor);
      if (!estatisticas[topico]) estatisticas[topico] = { positivo: 0, neutro: 0, negativo: 0 };

      if (num >= 4) estatisticas[topico].positivo += 1;
      else if (num === 3) estatisticas[topico].neutro += 1;
      else estatisticas[topico].negativo += 1;
    });
  });

  return estatisticas;
};

export const getAlunosEmAlerta = async () => {
    const result = await pool.query(`
      SELECT s.name AS aluno_nome, w.responses
      FROM well_being_surveys w
      JOIN (
        SELECT user_id, MAX(submitted_at) as ultima_resposta
        FROM well_being_surveys
        GROUP BY user_id
      ) ultimas ON w.user_id = ultimas.user_id AND w.submitted_at = ultimas.ultima_resposta
      JOIN Students s ON s.id = w.user_id
    `);
  
    const alunos = result.rows.map((row) => {
      const respostas = row.responses;
      let score = 0;
      const topicos: { [key: string]: string } = {};
  
      for (const [topico, valor] of Object.entries(respostas)) {
        let nivel: string;
        const num = Number(valor);
  
        if (num >= 4) {
          nivel = 'positivo';
          score += 1;
        } else if (num === 3) {
          nivel = 'neutro';
        } else {
          nivel = 'negativo';
          score -= 1;
        }
  
        topicos[topico] = nivel;
      }
  
      let status: 'OK' | 'Alerta' | 'Crítico' = 'OK';
      if (score <= -2) status = 'Crítico';
      else if (score < 0) status = 'Alerta';
  
      return {
        aluno: row.aluno_nome,
        respostas: topicos,
        score,
        status
      };
    });
  
    return alunos;
  };

  export const getRespostasAluno = async (usuarioId: string) => {
    const studentQuery = `
      SELECT id FROM students WHERE user_id = $1
    `;
    const studentResult = await pool.query(studentQuery, [usuarioId]);
  
    if (studentResult.rowCount === 0) {
      throw new Error('Estudante não encontrado para o user_id fornecido.');
    }
  
    const studentId = studentResult.rows[0].id;
    const query = `
      SELECT responses
      FROM well_being_surveys
      WHERE user_id = $1
      ORDER BY submitted_at DESC
      LIMIT 1
    `;
    
    const result = await pool.query(query, [studentId]);
  
    if (result.rowCount === 0) {
      return null;
    }
  
    return result.rows[0].responses;
  };
  