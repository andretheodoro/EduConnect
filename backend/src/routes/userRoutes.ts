import express from "express";
import {
  createUser,
  getUserProfile,
  listUsers,
  getUsuarioById
} from "../controllers/userController";

const router = express.Router();

router.post("/register", createUser);
router.get("/profile/:userId", getUserProfile);

// Listar todos os usuários
router.get("/users", listUsers);
router.get('/users/:id', getUsuarioById);

export default router;
