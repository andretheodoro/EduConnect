import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


interface Message {
  title: string;
  senderEmail: string;
  recipients: string[];
  createdAt: string | Date;
  content: string;
}

interface MessageViewProps {
  message: Message;
  onBack: () => void;
}

export default function MessageView({ message, onBack }: MessageViewProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Box>
          <Typography variant="body2" color="text.secondary">
            <strong>De:</strong> {message.senderEmail}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Para:</strong> {message.recipients.join(', ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Data:</strong> {new Date(message.createdAt).toLocaleString()}
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

      <Typography variant="body1" color="text.primary">
        {message.content}
      </Typography>
    </Box>
  );
}
