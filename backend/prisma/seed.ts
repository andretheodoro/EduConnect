import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"; // Importa bcryptjs para hash de senhas

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  const userCount = await prisma.users.findMany();

  const passwordDefault = await bcrypt.hash(
    process.env.PASSWORD_USER_DEFAULT as string,
    10
  );

  if (userCount.filter((user) => user.email === "admin@fiap.com").length === 0)
    await prisma.users.create({
      data: {
        name: "Admin",
        email: "admin@fiap.com",
        password: passwordDefault,
        type: "A",
      },
    });

  if (userCount.filter((user) => user.email === "andre@fiap.com").length === 0)
    await prisma.users.create({
      data: {
        name: "André",
        email: "andre@fiap.com",
        password: passwordDefault,
        type: "P",
      },
    });

  if (userCount.filter((user) => user.email === "tiago@fiap.com").length === 0)
    await prisma.users.create({
      data: {
        name: "Tiago",
        email: "tiago@fiap.com",
        password: passwordDefault,
        type: "P",
      },
    });

  console.log("Seed Executado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
