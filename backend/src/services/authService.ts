import pool from "../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (email: string, password: string) => {
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (user.rowCount === 0) {
    throw new Error("Usuário não encontrado");
  }

  const usuario = user.rows[0];

  const validPassword = await bcrypt.compare(password, usuario.password);

  if (!validPassword) {
    throw new Error("Senha incorreta");
  }

  let perfilId: number | null = null;

  console.log(usuario.tipo_usuario)

  if (usuario.type === 'A') {
    const alunoResult = await pool.query(`SELECT id FROM students WHERE user_id = $1`, [usuario.id]);
    if (alunoResult.rowCount !== null && alunoResult.rowCount > 0) {
      perfilId = alunoResult.rows[0].id;
    }
  } else if (usuario.type === 'P') {
    const professorResult = await pool.query(`SELECT id FROM teachers WHERE user_id = $1`, [usuario.id]);
    if (professorResult.rowCount !== null && professorResult.rowCount > 0) {
      perfilId = professorResult.rows[0].id;
    }
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, tipo: usuario.tipo_usuario }, // já envia tipo no payload também
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.name,
      email: usuario.email,
      tipo: usuario.type,
      idPerfilUsuario: perfilId,
    },
  };
};
