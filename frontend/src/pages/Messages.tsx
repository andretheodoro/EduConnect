import React, { useState, useEffect } from 'react';
import { FiSend, FiInbox, FiEdit, FiCheckCircle, FiMail } from 'react-icons/fi';
import api from '../services/api';
import socket from '../services/socket';
import Button from '@mui/material/Button';
import MessageView from './MessageView';

import { Box, Typography, TextField, Paper, List, ListItem, ListItemText, ListItemButton, Autocomplete, Divider, ListItemIcon, IconButton, Tooltip } from '@mui/material';
import Notification from '../components/Notification'; // Adjust the path as needed
import { useNotification } from '../hooks/useNotification';
import User from '../models/IUser';
import Message from '../models/IMessage';
import { fetchReceivedMessages, fetchSentMessages, markMessageAsRead, sendMessage, unmarkMessageAsRead } from '../services/message';
import IMessage from '../models/IMessage';

const userEmail = JSON.parse(localStorage.getItem('usuario') || '{}').email;

const MessageForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'send' | 'inbox' | 'sent'>('send');
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [recipients, setRecipients] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [sentMessages, setSentMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (!socket.connected) {
      console.log('[Socket] BBB Não conectado. Conectando...');
      socket.connect();
      console.log("socket aaa", socket);
    }

    socket.on('connect', () => {
      console.log("Socket conectado no cliente! ID:", socket.id);
    });

    socket.on('new_message', (message) => {
      console.log('Mensagem recebida via socket:', message);
      setReceivedMessages((prev) => [message, ...prev]);
    });

    return () => {
      socket.off('connect');
      socket.off('new_message');
    };
  }, []);

  useEffect(() => {
    api.get('/users')
      .then((res) => {
        const filteredRecipients = res.data.filter((user: User) => user.email !== userEmail);
        setAllUsers(filteredRecipients);
      })
      .catch((error) => {
        console.error('Erro ao buscar usuários:', error);
      });

    if (activeTab === 'inbox') {
      fetchReceivedMessages(userEmail, setReceivedMessages);
      console.log("receivedMessages", receivedMessages);
    }

    if (activeTab === 'sent') {
      fetchSentMessages(userEmail, setSentMessages);
    }
  }, [activeTab]);

  const handleToggleRead = async (message: IMessage) => {
    try {
      const userId = JSON.parse(localStorage.getItem('usuario') || '{}').id;
      if (message.id !== undefined) {
        if (!message.isRead) {
          const response = await markMessageAsRead(String(message.id), userId);

          if (response.status >= 200 && response.status < 300) {
            console.log("marcada como lida:", message.id);
            setReceivedMessages((prev) =>
              prev.map((msg) => msg.id === message.id ? { ...msg, isRead: true } : msg)
            );
          } else {
            console.error("Erro ao marcar mensagem como lida:", response);
          }
        } else {
          const response = await unmarkMessageAsRead(message.id, userId);

          if (response.status >= 200 && response.status < 300) {
            console.log("marcada como não lida:", message.id);
            setReceivedMessages((prev) =>
              prev.map((msg) => msg.id === message.id ? { ...msg, isRead: false } : msg)
            );
          } else {
            console.error("Erro ao marcar mensagem como não lida:", response);
          }
        }
      }

    } catch (error) {
      console.error("Erro ao atualizar status de leitura:", error);
    }
  };

  const {
    message: messageNotification,
    type,
    visible,
    showNotification,
    closeNotification
  } = useNotification();

  const handleSend = async () => {
    const newMessage = {
      title,
      content: message,
      senderId: userEmail,
      recipientIds: recipients.map((user) => user.email),
      dateSent: new Date().toISOString(),
      readBy: [],
      isRead: false
    } as IMessage;

    const response = await sendMessage(newMessage);

    console.log('Resposta do envio:', response);
    if (response.status >= 200 && response.status < 300) {
      console.log('Mensagem enviada com sucesso!');

      try {

        showNotification('Mensagem enviada', 'success', 8000);
      } catch (error) { console.error("Erro ao mostrar notificação:", error); }

      socket.emit('sendMessage', newMessage);

      setTitle('');
      setMessage('');
      setRecipients([]);
    } else {
      alert('Erro ao enviar a mensagem');
    }
  };

  return (
    <Box display="flex" p="1rem">
      {/* Menu lateral */}
      < Paper elevation={2} sx={{ width: 250, height: 608, p: 2 }}>
        {visible && (
          <Notification message={messageNotification} type={type} onClose={closeNotification} />
        )}
        <Typography variant="h6" gutterBottom>Mensagens</Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton selected={activeTab === 'send'} onClick={() => setActiveTab('send')}>
              <ListItemIcon>
                <FiEdit /> {/* ou FiPlus */}
              </ListItemIcon>
              <ListItemText primary="Nova" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton selected={activeTab === 'inbox'} onClick={() => setActiveTab('inbox')}>
              <ListItemIcon>
                <FiInbox />
              </ListItemIcon>
              <ListItemText primary="Recebidas" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton selected={activeTab === 'sent'} onClick={() => setActiveTab('sent')}>
              <ListItemIcon>
                <FiSend />
              </ListItemIcon>
              <ListItemText primary="Enviadas" />
            </ListItemButton>
          </ListItem>
        </List>

      </Paper >

      {/* Conteúdo */}
      < Box flex={1} pl={1} >
        {activeTab === 'send' ? (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Nova Mensagem</Typography>
            <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1 }}>
              <Typography variant="body1" color="text.primary" sx={{ whiteSpace: 'nowrap' }}>
                De:
              </Typography>
              <TextField
                value={userEmail}
                disabled
                size="small"
                sx={{ flex: 1 }}
              />
            </Box>
            <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1, width: '100%' }}>
              <Typography
                variant="body1"
                color="text.primary"
                sx={{ minWidth: 50, whiteSpace: 'nowrap' }}
              >
                Para:
              </Typography>

              <Autocomplete<User, true, false, false>
                multiple
                options={allUsers}
                getOptionLabel={(option) => option?.email || ''}
                value={recipients}
                onChange={(_, newValue) => setRecipients(newValue)}
                sx={{ flex: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Destinatários"
                    margin="normal"
                    size="small"
                  />
                )}
              />
            </Box>
            <TextField
              label="Título"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />

            <TextField
              label="Conteúdo"
              multiline
              rows={2}
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              margin="normal"
            />



            <Box mt={2} display="flex" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSend}
                sx={{ textTransform: 'none' }}
              >
                <FiSend style={{ marginRight: 8, marginTop: 2 }} />
                Enviar
              </Button>

              <Button variant="outlined" onClick={() => { setTitle(''); setMessage(''); setRecipients([]); }}>Limpar</Button>
            </Box>
          </Paper>
        ) : activeTab === 'inbox' ? (

          <Paper elevation={3} sx={{ p: 3 }}>
            {!selectedMessage ? (
              <Typography variant="h5" gutterBottom>Mensagens Recebidas</Typography>
            ) : null}

            {
              receivedMessages.length === 0 ? (
                <Typography>Nenhuma mensagem recebida.</Typography>
              ) : (
                selectedMessage ? (
                  <MessageView
                    // message={{
                    //   title: selectedMessage.title,
                    //   senderEmail: selectedMessage.sender.email,
                    //   recipients: selectedMessage.recipients.map(r => ({ email: r.email })),
                    //   createdAt: selectedMessage.createdAt,
                    //   content: selectedMessage.content,
                    // }}
                    message={selectedMessage}
                    setReceivedMessages={setReceivedMessages}
                    onBack={() => setSelectedMessage(null)}
                  />
                ) : (
                  // add border left when isread false

                  <List>
                    {receivedMessages.map((msg, index) => (
                      <React.Fragment key={index}>
                        <ListItem
                          alignItems="flex-start"
                          onClick={() => setSelectedMessage(msg)}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: 'action.hover',
                            },
                            borderLeft: msg.isRead ? 'none' : '4px solid #1976d2',
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" fontWeight="bold">
                                {msg.title}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography component="span" variant="body2" color="text.primary">
                                  De: {msg.sender?.email}
                                </Typography>
                                <br />
                                {msg.content.substring(0, 25) + (msg.content.length > 25 ? '...' : '')}
                                <br />
                                <em>{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Data não disponível'}</em>
                              </>
                            }
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation(); // Previne a propagação do clique para o ListItem
                              handleToggleRead(msg); // Chama a função para marcar/desmarcar como lida
                            }}
                            title={msg.isRead ? "Desmarcar como lida" : "Marcar como lida"}
                            sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}
                          >
                            {msg.isRead ? <FiInbox size={18} /> : <FiMail size={18} />}
                          </Button>
                        </ListItem>

                        <Divider component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                )
              )
            }
          </Paper>

        ) : (

          <Paper elevation={3} sx={{ p: 3 }}>
            {!selectedMessage ? (
              <Typography variant="h5" gutterBottom>Mensagens Enviadas</Typography>
            ) : null}

            {
              sentMessages.length === 0 ? (
                <Typography>Nenhuma mensagem enviada.</Typography>
              ) : (
                selectedMessage ? (
                  <MessageView
                    // message={{
                    //   title: selectedMessage.title,
                    //   senderEmail: selectedMessage.sender.email,
                    //   recipients: selectedMessage.recipients.map(r => r.email),
                    //   createdAt: selectedMessage.createdAt,
                    //   content: selectedMessage.content,
                    // }}
                    message={selectedMessage}
                    setReceivedMessages={null}
                    onBack={() => setSelectedMessage(null)}
                  />
                ) : (
                  <List>
                    {sentMessages.map((msg, index) => (
                      <React.Fragment key={index}>
                        <ListItem
                          alignItems="flex-start"
                          onClick={() => setSelectedMessage(msg)}
                          sx={{
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: 'action.hover', // muda fundo no hover
                            },
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" fontWeight="bold">
                                {msg.title}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography component="span" variant="body2" color="text.primary">
                                  Para: {(msg.recipients ?? []).map(r => r.email).join(', ')}
                                </Typography>
                                <br />
                                {msg.content.substring(0, 25) + (msg.content.length > 25 ? '...' : '')}
                                <br />
                                <em>{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Data não disponível'}</em>
                              </>
                            }
                          />
                        </ListItem>
                        <Divider component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                )
              )
            }
          </Paper>

        )}
      </Box >
    </Box >
  );
};

export default MessageForm;
