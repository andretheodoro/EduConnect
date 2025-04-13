import express, { Request, Response } from "express";

// Extend the Request interface to include the 'io' property
declare global {
  namespace Express {
    interface Request {
      io?: Server;
    }
  }
}
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes";
import assistenteRoutes from "./routes/assistenteRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());

// Rotas
app.use("/api", authRoutes);
app.use("/api", assistenteRoutes);
app.use("/api", uploadRoutes);

app.use("/api", userRoutes);

// Arquivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rota principal
app.get("/", (_: Request, res: Response) => {
  res.send("EduConnect API rodando com sucesso!");
});

// #region socket - messagens
// Usar as rotas de mensagem
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // libere de acordo com sua origem
    methods: ["GET", "POST"],
  },
});

app.use(
  "/api/messages",
  (req, res, next) => {
    req.io = io; // Passando 'io' para as rotas
    next();
  },
  messageRoutes
);

// Conexão do WebSocket
// No servidor - socket.io
const userSockets: Record<string, string> = {}; // { email: socket.id }

io.on("connection", (socket) => {
  const { email } = socket.handshake.query;
  if (email) {
    if (typeof email === "string") {
      userSockets[email] = socket.id;
    }
    console.log(`websocket conectado: ${email}`);
  }

  socket.on("sendMessage", (data) => {
    const { recipientIds } = data;

    recipientIds.forEach((recipientEmail: string) => {
      const socketId = userSockets[recipientEmail];
      if (socketId) {
        io.to(socketId).emit("new_message", data);
      }
    });
  });

  socket.on("disconnect", () => {
    for (const [email, id] of Object.entries(userSockets)) {
      if (id === socket.id) {
        delete userSockets[email];
        break;
      }
    }
  });
});

// #endregion socket - messagens

// Inicia servidor
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
