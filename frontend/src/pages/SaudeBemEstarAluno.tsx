import React, { useState } from 'react';
import '../styles/saudeBemEstarAluno.css';
import Notification from '../components/Notification';
import { useNotification } from '../hooks/useNotification';

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
//   'Bullying',
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
const {
    message,
    type,
    visible,
    showNotification,
    closeNotification
    } = useNotification();
    
  const [respostas, setRespostas] = useState<Resposta>({});

  const handleResposta = (topico: string, valor: number) => {
    setRespostas(prev => ({ ...prev, [topico]: valor }));
  };

  const handleSubmit = () => {
    console.log('Respostas enviadas:', respostas);
    //back-end
    showNotification('Questionário enviado com sucesso!', 'success');
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
