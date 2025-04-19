import api from "../services/api";
import IMessage from "../models/IMessage";


/**
 * Envia uma nova mensagem
 * @param newMessage Mensagem a ser enviada
 */
export const sendMessage = async (newMessage: IMessage) => {
  try {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    const userId = user.email;

    if (!userId) {
      throw new Error("Usuário não autenticado.");
    }

    const messageToSend = {
      ...newMessage,
      senderId: userId,
      isRead: false,
    };

    console.log("Enviando mensagem:", messageToSend);

    const reponse = await api.post('/messages/send', messageToSend);
    return reponse;

  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw error; // Repropaga o erro caso queira lidar com ele em outro lugar
  }
};

/**
 * Busca mensagens enviadas pelo usuário
 */
export const fetchSentMessages = async (
  userEmail: string,
  setSentMessages: (messages: IMessage[]) => void
) => {
  try {
    const response = await api.get<IMessage[]>(`/messages/sent/${userEmail}`);
    console.log("Mensagens enviadas:", response.data);
    setSentMessages(response.data);
  } catch (err) {
    console.error("Erro ao buscar mensagens enviadas:", err);
  }
};

/**
 * Busca mensagens recebidas pelo usuário
 */
export const fetchReceivedMessages = async (
  userEmail: string,
  setReceivedMessages: (messages: IMessage[]) => void
) => {
  try {
    const response = await api.get<IMessage[]>(`/messages/received/${userEmail}`);
    console.log("Mensagens recebidas:", response.data);

    if (response.data.length > 0) {
      // set propriety isRead when ready[] contains userid
      const userId = JSON.parse(localStorage.getItem('usuario') || '{}').id;
      response.data.forEach((message) => {
        message.isRead = message.readBy.includes(userId);
      });
    }
    setReceivedMessages(response.data);
    console.log("AAAA recebidas:", response.data);
  } catch (err) {
    console.error("Erro ao buscar mensagens recebidas:", err);
  }
};



export const markMessageAsRead = async (messageId: string, userId: string) => {
  const res = await api.patch(`/messages/mark-as-read/${messageId}`, { userId }, { headers: { 'Content-Type': 'application/json' } });
  return res;
};


export const unmarkMessageAsRead = async (messageId: string, userId: string) => {
  const res = await api.patch(`/messages/unmark-as-read/${messageId}`, { userId }, { headers: { 'Content-Type': 'application/json' } });
  return res;
};
