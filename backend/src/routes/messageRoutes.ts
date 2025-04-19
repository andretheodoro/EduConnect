import { Router } from "express";
import {
  sendMessage,
  listSentMessages,
  listReceivedMessages,
  markAsRead,
  unmarkAsRead,
  // sendMessageWithSocket,
} from "../controllers/messageController";

const router = Router();

// Enviar mensagem
router.post("/send", sendMessage);

// Listar mensagens enviadas
router.get("/sent/:userId", listSentMessages);

// Listar mensagens recebidas
router.get("/received/:userId", listReceivedMessages);

// Marcar mensagem como lida
router.patch("/mark-as-read/:id", markAsRead);

// Desmarcar mensagem como lida (opcional, se necessário)
router.patch("/unmark-as-read/:id", unmarkAsRead);

// Enviar mensagem com WebSocket
// router.post("/send-socket", sendMessageWithSocket);

export default router;
