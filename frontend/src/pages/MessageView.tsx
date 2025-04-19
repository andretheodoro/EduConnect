import React, { useEffect } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IMessage from '../models/IMessage';
import { markMessageAsRead } from '../services/message';


interface MessageViewProps {
  message: IMessage;
  setReceivedMessages: React.Dispatch<React.SetStateAction<IMessage[]>> | null;
  onBack: () => void;
}

export default function MessageView({ message, setReceivedMessages, onBack }: MessageViewProps) {
  // mark as read
  console.log("message", message);
  useEffect(() => {
    const markAsRead = async () => {
      if (!setReceivedMessages) return;
      if (message.id === undefined) return;

      try {
        const userId = JSON.parse(localStorage.getItem('usuario') || '{}').id;
        if (!message.isRead) {
          const response = await markMessageAsRead(message.id, userId);
          if (response.status >= 200 && response.status < 300) {
            console.log("marcada como lida:", message.id);
            setReceivedMessages((prev) =>
              prev.map((msg) => msg.id === message.id ? { ...msg, isRead: true } : msg)
            );
          } else {
            console.error("Erro ao marcar mensagem como lida:", response);
          }
        }
      } catch (error) {
        console.error("Erro ao marcar mensagem como lida:", error);
      }
    };

    markAsRead();
  }, [message]);

  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Box>
          <Typography variant="body2" color="text.secondary">
            <strong>De:</strong> {message.sender ? message.sender.email : 'Desconhecido'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Para:</strong> {(message.recipients ?? []).map(user => user.email).join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Data:</strong> {message.createdAt ? new Date(message.createdAt).toLocaleString() : 'Data indisponível'}
          </Typography>
        </Box>

        <Button
          variant="contained" color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          size="medium"
          sx={{ height: "", mt: { xs: 1, sm: 0 } }}
        >
          Voltar
        </Button>
      </Box>

      {/* Conteúdo */}
      <Typography variant="h5" color="text.primary" mt={2} gutterBottom>
        <strong>{message.title}</strong>
      </Typography>

      <Typography
        variant="body1"
        color="text.primary"
        sx={{ whiteSpace: "pre-line" }} // Preserva quebras de linha e espaços adicionais
      >
        {message.content}
      </Typography>
    </Box>
  );
}
