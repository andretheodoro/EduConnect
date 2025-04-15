import React, { useState } from 'react';
import '../styles/assistente.css';
import api from '../services/api';
import { Box, Button } from '@mui/material';
import { FiSend } from 'react-icons/fi';

const AssistenteVirtual: React.FC = () => {
  const [input, setInput] = useState('');
  const [resposta, setResposta] = useState('');
  const [carregando, setCarregando] = useState(false);

  const termosProibidos = [
    'palavrão1', 'palavrão2', 'violência', 'sexo', 'matar', 'ódio', 'estupro',
    'droga', 'arma', 'suicídio', 'terrorismo', 'racismo', 'assassinato'
  ];
  
  const contemTermosProibidos = (texto: string) => {
    const textoMinusculo = texto.toLowerCase();
    return termosProibidos.some((termo) => textoMinusculo.includes(termo));
  };

  const handleEnviar = async () => {
    if (!input.trim()) return;

    if (contemTermosProibidos(input)) {
      setResposta('❌ Sua mensagem contém termos impróprios. Reformule sua pergunta.');
      return;
    }

    setCarregando(true);
    setResposta('');

    try {
      const response = await api.post('/assistente', {
        pergunta: input, // Envia o texto para o back-end
      });

      const mensagem = response.data.resposta || 'Sem resposta.';

      setResposta(mensagem);
    } catch (error) {
      console.error('Erro ao chamar o back-end:', error);
      setResposta('Ocorreu um erro. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="assistente-container">
      <h2 className="assistente-title">🤖 Assistente Virtual</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua dúvida, sugestão ou atividade desejada..."
      />

      {/* <button className="enviar-button" onClick={handleEnviar}>
        Enviar
      </button> */}
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEnviar}
          sx={{ textTransform: 'none' }}
        >
          <FiSend style={{ marginRight: 8, marginTop: 2 }} />
          Enviar
        </Button>
      </Box>

      {resposta && (
        <div className="resposta-box">
          <strong>Resposta:</strong>
          <p>{resposta}</p>
        </div>
      )}

      {carregando && (
        <div className="overlay">
          <div className="loader"></div>
          <p>Processando resposta...</p>
        </div>
      )}
    </div>
  );
};

export default AssistenteVirtual;
