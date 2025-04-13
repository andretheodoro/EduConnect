import express from "express";
import {
  createUser,
  getUserProfile,
  listUsers,
} from "../controllers/userController";

const router = express.Router();

router.post("/register", createUser);
router.get("/profile/:userId", getUserProfile);

// Listar todos os usuários
router.get("/users", listUsers);

export default router;
