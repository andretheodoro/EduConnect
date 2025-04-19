import { PrismaClient, UserType } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const passwordDefault = await bcrypt.hash(
    process.env.PASSWORD_USER_DEFAULT as string,
    10
  );

  const usersToSeed = [
    { name: "Aluno", email: "aluno@fiap.com", type: UserType.A },
    { name: "Admin", email: "admin@fiap.com", type: UserType.P },
    { name: "André", email: "andre@fiap.com", type: UserType.P },
    { name: "Tiago", email: "tiago@fiap.com", type: UserType.P },

    // Adicionais
    { name: "João da Silva", email: "joao@escola.com", type: UserType.A },
    { name: "Maria Oliveira", email: "maria@escola.com", type: UserType.P },
    { name: "Carlos Andrade", email: "carlos@escola.com", type: UserType.A },
    { name: "Fernanda Lima", email: "fernanda@escola.com", type: UserType.A },
    { name: "Luciana Souza", email: "luciana@escola.com", type: UserType.P },
    { name: "Ana Beatriz", email: "ana@escola.com", type: UserType.A },
    { name: "Lucas Fernandes", email: "lucas@escola.com", type: UserType.A },
    { name: "Julia Almeida", email: "julia@escola.com", type: UserType.A },
    { name: "Roberta Nunes", email: "roberta@escola.com", type: UserType.P },
    { name: "Eduardo Matos", email: "eduardo@escola.com", type: UserType.P },
    { name: "Camila Ribeiro", email: "camila@escola.com", type: UserType.P },
  ];

  for (const user of usersToSeed) {
    const existingUser = await prisma.users.findUnique({
      where: { email: user.email },
    });
    if (!existingUser) {
      await prisma.users.create({
        data: {
          id: uuidv4(),
          name: user.name,
          email: user.email,
          password: passwordDefault,
          type: user.type,
          education_level:
            user.type === "P" ? "Coordenação Pedagógica" : "Ensino Regular",
          teaching_area: "Geral",
          teaching_segment:
            user.type === "P" ? "Mestrado em Educação" : "Ensino Fundamental",
        },
      });
    }
  }

  const allUsers = await prisma.users.findMany();
  const getUserId = (name: string) =>
    allUsers.find((u) => u.name === name)?.id || "";

  // Turmas
  const classNames = ["Turma 1", "Turma 2", "Turma 3"];
  for (const name of classNames) {
    const exists = await prisma.classes.findFirst({ where: { name } });
    if (!exists) {
      await prisma.classes.create({ data: { name } });
    }
  }

  const allClasses = await prisma.classes.findMany();
  const getClassId = (name: string) =>
    allClasses.find((c) => c.name === name)?.id || 0;

  // Professores
  const teacherNames = [
    "Maria Oliveira",
    "Luciana Souza",
    "Roberta Nunes",
    "Eduardo Matos",
    "Camila Ribeiro",
  ];
  for (const name of teacherNames) {
    const exists = await prisma.teachers.findFirst({ where: { name } });
    if (!exists) {
      await prisma.teachers.create({
        data: {
          name,
          email: allUsers.find((u) => u.name === name)?.email || "",
          user_id: getUserId(name),
          created_at: new Date(),
        },
      });
    }
  }

  const allTeachers = await prisma.teachers.findMany();
  const getTeacherId = (name: string) =>
    allTeachers.find((t) => t.name === name)?.id || 0;

  // Alunos
  const studentData = [
    { name: "João da Silva", email: "joao@escola.com", birth: "2008-03-15", turma: "Turma 1" },
    { name: "Carlos Andrade", email: "carlos@escola.com", birth: "2009-06-21", turma: "Turma 1" },
    { name: "Fernanda Lima", email: "fernanda@escola.com", birth: "2007-11-05", turma: "Turma 1" },
    { name: "Ana Beatriz", email: "ana@escola.com", birth: "2009-03-15", turma: "Turma 1" },
    { name: "Lucas Fernandes", email: "lucas@escola.com", birth: "2008-06-21", turma: "Turma 1" },
    { name: "Julia Almeida", email: "julia@escola.com", birth: "2010-11-05", turma: "Turma 2" },
    {name:"Aluno",email:"aluno@fiap.com",birth:"2008-03-15",turma:"Turma 1"},
  ];

  for (const student of studentData) {
    const exists = await prisma.students.findFirst({
      where: { email: student.email },
    });
    if (!exists) {
      await prisma.students.create({
        data: {
          name: student.name,
          email: student.email,
          birth_date: new Date(student.birth),
          user_id: getUserId(student.name),
          class_id: getClassId(student.turma),
          created_at: new Date(),
        },
      });
    }
  }

  const allStudents = await prisma.students.findMany();
  const getStudentId = (name: string) =>
    allStudents.find((s) => s.name === name)?.id || 0;

  // Notas
  const grades = [
    { aluno: "Ana Beatriz", materia: "Matemática", nota: 8.5, data: "2025-03-10", prof: "Roberta Nunes" },
    { aluno: "Ana Beatriz", materia: "Português", nota: 7.0, data: "2025-03-12", prof: "Eduardo Matos" },
    { aluno: "Lucas Fernandes", materia: "Matemática", nota: 6.8, data: "2025-03-10", prof: "Roberta Nunes" },
    { aluno: "Lucas Fernandes", materia: "Português", nota: 9.1, data: "2025-03-12", prof: "Eduardo Matos" },
    { aluno: "Julia Almeida", materia: "Matemática", nota: 9.3, data: "2025-03-10", prof: "Roberta Nunes" },
    { aluno: "Julia Almeida", materia: "Ciências", nota: 7.6, data: "2025-03-12", prof: "Camila Ribeiro" },
    { aluno: "João da Silva", materia: "Matemática", nota: 8.0, data: "2025-03-10", prof: "Roberta Nunes" },
    { aluno: "Carlos Andrade", materia: "Português", nota: 7.5, data: "2025-03-12", prof: "Eduardo Matos" },
    { aluno: "Fernanda Lima", materia: "Ciências", nota: 9.0, data: "2025-03-10", prof: "Camila Ribeiro" },
    { aluno: "Aluno", materia: "Matemática", nota: 8.0, data: "2025-03-10", prof: "Roberta Nunes" },
    { aluno: "Aluno", materia: "Português", nota: 7.5, data: "2025-03-12", prof: "Eduardo Matos" },
    { aluno: "Aluno", materia: "Ciências", nota: 9.0, data: "2025-03-10", prof: "Camila Ribeiro" },
  ];

  for (const g of grades) {
    const exists = await prisma.grades.findFirst({
      where: {
        student_id: getStudentId(g.aluno),
        subject: g.materia,
        evaluation_date: new Date(g.data),
      },
    });
    if (!exists) {
      await prisma.grades.create({
        data: {
          student_id: getStudentId(g.aluno),
          subject: g.materia,
          grade: g.nota,
          evaluation_date: new Date(g.data),
          teacher_id: getTeacherId(g.prof),
        },
      });
    }
  }

  // Frequência
  const presencas = [
    { aluno: "Ana Beatriz", data: "2025-03-10", presente: true, materia: "Matemática", prof: "Roberta Nunes" },
    { aluno: "Ana Beatriz", data: "2025-03-11", presente: false, materia: "Português", prof: "Eduardo Matos" },
    { aluno: "Lucas Fernandes", data: "2025-03-10", presente: true, materia: "Matemática", prof: "Roberta Nunes" },
    { aluno: "Lucas Fernandes", data: "2025-03-11", presente: true, materia: "Português", prof: "Eduardo Matos" },
    { aluno: "Julia Almeida", data: "2025-03-10", presente: false, materia: "Matemática", prof: "Roberta Nunes" },
    { aluno: "Julia Almeida", data: "2025-03-11", presente: true, materia: "Ciências", prof: "Camila Ribeiro" },    
    { aluno: "João da Silva", data: "2025-03-10", presente: true, materia: "Matemática", prof: "Roberta Nunes" },
    { aluno: "Carlos Andrade", data: "2025-03-11", presente: false, materia: "Português", prof: "Eduardo Matos" },
    { aluno: "Fernanda Lima", data: "2025-03-10", presente: true, materia: "Ciências", prof: "Camila Ribeiro" },
    { aluno: "Aluno", data: "2025-03-10", presente: true, materia: "Matemática", prof: "Roberta Nunes" },
    { aluno: "Aluno", data: "2025-03-11", presente: false, materia: "Português", prof: "Eduardo Matos" },
    { aluno: "Aluno", data: "2025-03-10", presente: true, materia: "Ciências", prof: "Camila Ribeiro" },
  ];

  for (const p of presencas) {
    const exists = await prisma.attendance.findFirst({
      where: {
        student_id: getStudentId(p.aluno),
        date: new Date(p.data),
        subject: p.materia,
      },
    });
    if (!exists) {
      await prisma.attendance.create({
        data: {
          student_id: getStudentId(p.aluno),
          date: new Date(p.data),
          present: p.presente,
          subject: p.materia,
          teacher_id: getTeacherId(p.prof),
        },
      });
    }
  }

  // Eventos
  const eventos = [
    { data: "2025-04-10", hora: "10:00:00", desc: "Reunião Pedagógica", user: "Roberta Nunes" },
    { data: "2025-04-15", hora: "08:30:00", desc: "Apresentação de Trabalhos", user: "Camila Ribeiro" },
    { data: "2025-04-22", hora: "14:00:00", desc: "Conselho de Classe", user: "Eduardo Matos" },
    
  ];

  for (const e of eventos) {
    const exists = await prisma.events.findFirst({
      where: {
        description: e.desc,
        date: new Date(e.data),
      },
    });
    if (!exists) {
      await prisma.events.create({
        data: {
          id: uuidv4(),
          date: new Date(`${e.data}T${e.hora}`), 
          time: new Date(`${e.data}T${e.hora}`), 
          description: e.desc,
          user_id: getUserId(e.user),
        },
      });      
    }
  }

  console.log("Seed executado com sucesso");
}

main()
  .catch((e) => {
    console.error("Erro ao executar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
