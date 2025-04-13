// src/services/socket.ts
import { io } from 'socket.io-client';

const userEmail = JSON.parse(localStorage.getItem('usuario') || '{}').email;
console.log('userEmail', userEmail);
const socket = io('http://localhost:3000', {
  transports: ['websocket'],
  query: { email: userEmail },
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5, // tenta reconectar até 5 vezes
  reconnectionDelay: 2000, // espera 2 segundos entre tentativas
});

export default socket;
