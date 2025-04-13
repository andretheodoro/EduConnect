import React, { useEffect } from 'react';
import socket from '../services/socket'; // Certifique-se de que seu socket está configurado corretamente
import { useNotification } from '../hooks/useNotification';
import Notification from '../components/Notification';

interface Message {
  title: string;
  content: string;
  senderId: string;
  dateSent: string;
}

// Liberar o autoplay para as notificações
const notificationSound = new Audio('/sounds/notification.mp3');
// Por padrão, volume normal
notificationSound.volume = 1.0;

export const unlockNotificationSound = () => {
  notificationSound.volume = 0.0;
  notificationSound.play().catch(err => {
    console.warn("Erro ao desbloquear o som:", err);
  });
  
  // Depois de tocar no volume zero, volta ao volume normal
  setTimeout(() => {
    notificationSound.pause();
    notificationSound.currentTime = 0;
    notificationSound.volume = 1.0;
  }, 200);
};

export const playNotificationSound = () => {
  notificationSound.play().catch(err => {
    console.warn("Erro ao tocar som de notificação:", err);
  });
};


const MessageNotifier: React.FC = () => {

  const {
    message,
    type,
    visible,
    showNotification,
    closeNotification
  } = useNotification();

  useEffect(() => {
    // socket.on('new_message', (message: Message) => {
    //   console.log("🔔 Nova mensagem recebida:", message);
    //   showNotification("🔔 Nova mensagem recebida:", 'info');
    // });
    if (!socket.connected) {
      console.log('[Socket] AAA Não conectado. Conectando...');
      socket.connect();
      console.log("socket ", socket);
    }

    socket.on('connect', () => {
      console.log('[Socket] AAA ✅ Conectado com sucesso. ID:', socket.id);
    });

    socket.on('new_message', (message: Message) => {
      console.log(`🔔 Nova mensagem recebida de: ${message.senderId}`, message);
      const notificationText = `🔔 Nova mensagem de: ${message.senderId}`;
      showNotification(notificationText, 'info', 8000);

      playNotificationSound(); // agora permitido

    });

    return () => {
      socket.off('new_message');
    };
  }, [showNotification]);

  return visible ? (
    <Notification message={message} type={type} onClose={closeNotification} />
  ) : null;

};

export default MessageNotifier;
