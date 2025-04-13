import React, { useState } from 'react';
import '../styles/saudeBemEstarAluno.css';
import Notification from '../components/Notification';
import { useNotification } from '../hooks/useNotification';
import api from '../services/api'; 
import { useUsuario } from '../hooks/useUsuario';

interface Resposta {
  [topico: string]: number;
}

const topicos = [
  'Família',
  'Amigos',
  'Escola',
  'Felicidade',
  'Sono',
  'Alimentação',
  'Ansiedade',
  'Autoestima'
];

const emoticons = [
  { emoji: '😢', valor: 1 },
  { emoji: '🙁', valor: 2 },
  { emoji: '😐', valor: 3 },
  { emoji: '🙂', valor: 4 },
  { emoji: '😄', valor: 5 }
];

const SaudeBemEstar: React.FC = () => {
  const { message, type, visible, showNotification, closeNotification } = useNotification();
  const [respostas, setRespostas] = useState<Resposta>({});
  const usuario = useUsuario();

  const handleResposta = (topico: string, valor: number) => {
    setRespostas(prev => ({ ...prev, [topico]: valor }));
  };

  const handleSubmit = async () => {
    try {
      
      const usuarioId = usuario?.id || 0;

      await api.post('/bem-estar/respostas', {
        usuarioId,
        respostas
      });

      showNotification('Questionário enviado com sucesso!', 'success');
      setRespostas({});
    } catch (error) {
      showNotification('Erro ao enviar questionário', 'error');
      console.error(error);
    }
  };

  return (
    <div className="saude-container">
      <h2>Como você está se sentindo?</h2>
      <p>Responda de forma sincera clicando no emoticon que melhor representa como você se sente:</p>

      {topicos.map(topico => (
        <div key={topico} className="topico">
          <h4>{topico}</h4>
          <div className="emoticons">
            {emoticons.map(({ emoji, valor }) => (
              <span
                key={valor}
                className={`emoticon ${respostas[topico] === valor ? 'selecionado' : ''}`}
                onClick={() => handleResposta(topico, valor)}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      ))}

      <button className="enviar" onClick={handleSubmit}>Enviar</button>

      {visible && (
        <Notification message={message} type={type} onClose={closeNotification} />
      )}
    </div>
  );
};

export default SaudeBemEstar;
