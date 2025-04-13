import { Request, Response } from "express";
import pool from "../config/database";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  const users = await prisma.users.findMany();
  res.json(users);
};
