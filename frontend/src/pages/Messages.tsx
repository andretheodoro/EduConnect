import React, { useState, useEffect } from 'react';
import { FiSend, FiInbox, FiEdit } from 'react-icons/fi';
import api from '../services/api';
import socket from '../services/socket';
import Button from '@mui/material/Button';
import MessageView from './MessageView';

import { Box, Typography, TextField, Paper, List, ListItem, ListItemText, ListItemButton, Autocomplete, Divider, ListItemIcon } from '@mui/material';
import { useNotification } from '../hooks/useNotification';




const userEmail = JSON.parse(localStorage.getItem('usuario') || '{}').email;

interface Message {
  title: string;
  content: string;
  senderId: string;
  sender: { email: string };
  recipients: User[];
  createdAt: string;
}

interface User {
  email: string;
}

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
    // Talvez seja necessário adicionar o socket na "home" ?
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
      api.get(`/messages/received/${userEmail}`)
        .then((res) => res.data)
        .then((data) => setReceivedMessages(data));
    }

    if (activeTab === 'sent') {
      api.get(`/messages/sent/${userEmail}`)
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .then((data) => setSentMessages(data));
    }
  }, [activeTab]);

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
    };

    const response = await api.post('/messages/send', newMessage, {
      // headers: {
      //   'Authorization': 'Bearer token_aqui', // Adicionar token
      //       },
    });

    if (response.status >= 200 && response.status < 300) {
      showNotification('Mensagem enviada', 'success', 8000);
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

              <Autocomplete
                multiple
                options={allUsers}
                getOptionLabel={(option) => option.email}
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
              <Button variant="contained" color="primary" onClick={handleSend}>Enviar</Button>
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
                    message={{
                      title: selectedMessage.title,
                      senderEmail: selectedMessage.sender.email,
                      recipients: selectedMessage.recipients.map(r => r.email),
                      createdAt: selectedMessage.createdAt,
                      content: selectedMessage.content,
                    }}
                    onBack={() => setSelectedMessage(null)}
                  />
                ) : (
                  <List>
                    {receivedMessages.map((msg, index) => (
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
                                  Para: {msg.recipients.map(r => r.email).join(', ')}
                                </Typography>
                                <br />
                                {msg.content.substring(0, 10) + (msg.content.length > 10 ? '...' : '')}
                                <br />
                                <em>{new Date(msg.createdAt).toLocaleString()}</em>
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
                    message={{
                      title: selectedMessage.title,
                      senderEmail: selectedMessage.sender.email,
                      recipients: selectedMessage.recipients.map(r => r.email),
                      createdAt: selectedMessage.createdAt,
                      content: selectedMessage.content,
                    }}
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
                                  Para: {msg.recipients.map(r => r.email).join(', ')}
                                </Typography>
                                <br />
                                {msg.content.substring(0, 10) + (msg.content.length > 10 ? '...' : '')}
                                <br />
                                <em>{new Date(msg.createdAt).toLocaleString()}</em>
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
