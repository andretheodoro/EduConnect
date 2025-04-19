import { Request, Response, RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const sendMessage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { senderId, recipientIds, title, content } = req.body;

  try {
    const existingRecipients = await prisma.messagesUser.findMany({
      where: {
        email: { in: recipientIds },
      },
    });
    const existingIds = existingRecipients.map((r) => r.email);
    const missingIds = recipientIds.filter(
      (email: string) => !existingIds.includes(email)
    );

    // Cria os destinatários não localizados
    const newRecipients = await Promise.all(
      missingIds.map(async (email: string) => {
        let sender = await prisma.messagesUser.findUnique({
          where: { email: senderId },
        });

        if (!sender) {
          prisma.messagesUser.create({
            data: { email: email } as any, //
          })
        }
      }
      )
    );

    const allRecipients = [...existingRecipients, ...newRecipients];

    let sender = await prisma.messagesUser.findUnique({
      where: { email: senderId },
    });

    if (!sender) {
      sender = await prisma.messagesUser.create({
        data: { email: senderId } as any, //
      });
    }

    // const allRecipients = await prisma.messagesUser.findUnique({
    //   where: { email: senderId },
    // });

    const message = await prisma.messages.create({
      data: {
        title,
        content,
        sender: { connect: { email: sender.email } },
        recipients: {
          connect: allRecipients.map((recipient) => ({
            email: recipient.email,
          })),
        },
      },
      include: {
        sender: true,
        recipients: true,
      },
    });

    if (req.app.get("io")) {
      const io = req.app.get("io");
      recipientIds.forEach((id: string) => {
        io.to(id).emit("new_message", message);
      });
    }

    res.status(201).json(message);
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    res.status(500).json({ error: "Erro interno ao enviar a mensagem." });
  }
};

export const listSentMessages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;
  const existing = await prisma.messagesUser.findMany({
    where: {
      email: { in: [userId] },
    },
  });

  if (existing.length === 0) {
    res.json([]);
    return;
  }

  const messages = await prisma.messages.findMany({
    where: { senderId: existing[0].id },
    include: { sender: true, recipients: true },
    orderBy: { createdAt: "desc" },
  });

  res.json(messages);
};

export const listReceivedMessages: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.params;
  const existingRecipients = await prisma.messagesUser.findMany({
    where: {
      email: { in: [userId] },
    },
  });

  if (existingRecipients.length === 0) {
    res.json([]);
    return;
  }
  const messages = await prisma.messages.findMany({
    where: { recipients: { some: { id: existingRecipients[0].id } } },
    include: { sender: true, recipients: true },
    orderBy: { createdAt: "desc" },
  });

  messages.forEach((message) => {
    message.readBy = message.readBy || [];
    message.readBy = message.readBy.map((id) => id.toString());
  });


  res.json(messages);
};

export const markAsRead: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { userId } = req.body;

  const message = await prisma.messages.update({
    where: { id },
    data: { readBy: { push: userId } },
  });

  res.status(200).json(message);
};


export const unmarkAsRead: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    // Verifica se a mensagem existe
    const message = await prisma.messages.findUnique({ where: { id } });
    if (!message) {
      res.status(404).json({ error: "Mensagem não encontrada." });
      return;
    }

    // Remove o userId da lista readBy
    const updatedMessage = await prisma.messages.update({
      where: { id },
      data: {
        readBy: {
          set: message.readBy.filter((existingUserId: string) => existingUserId !== userId),
        },
      },
    });

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error("Erro ao desmarcar como lida:", error);
    res.status(500).json({ error: "Erro ao desmarcar a mensagem como lida." });
  }
};
