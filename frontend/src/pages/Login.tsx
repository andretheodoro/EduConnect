import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import api from '../services/api';
import Notification from '../components/Notification';
import { useNotification } from '../hooks/useNotification';
import { unlockNotificationSound } from '../components/MessageNotifier';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const {
    message,
    type,
    visible,
    showNotification,
    closeNotification
  } = useNotification();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    unlockNotificationSound(); // Liberar o autoplay para as notificações

    if (!validateEmail(email)) {
      setEmailError('Por favor, insira um email válido.');
      return;
    }

    setEmailError('');

    try {
      const response = await api.post('/login', {
        email,
        password: senha,
      });

      const { token, usuario } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      
      showNotification('Login realizado com sucesso!', 'success');

      setTimeout(() => {
        if (usuario.tipo === "P"){
          navigate('/homeProfessor');
        }
        else{
          navigate('/homeAluno');
        }
      }, 1000);
    } catch (error: any) {
      showNotification('Email ou senha inválidos!', 'error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>EduConnect</h2>
        <p className="subtitle">Conectando mentes, desenvolvendo futuros</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>
          {emailError && <p className="input-error">{emailError}</p>}

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>

      {visible && (
        <Notification message={message} type={type} onClose={closeNotification} />
      )}
    </div>
  );
};

export default Login;
