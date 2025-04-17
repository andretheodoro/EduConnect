import React, { useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import '../styles/uploadBiblioteca.css';
import api from '../services/api';
import Notification from '../components/Notification';
import { useNotification } from '../hooks/useNotification';
import { Box, Button } from '@mui/material';
import { FiSend } from 'react-icons/fi';

const UploadBiblioteca: React.FC = () => {
  const [titulo, setTitulo] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [capa, setCapa] = useState<File | null>(null);
  const [previewCapa, setPreviewCapa] = useState<string | null>(null);

  const {
    message,
    type,
    visible,
    showNotification,
    closeNotification
  } = useNotification();

  const handleCapaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCapa(file);
      setPreviewCapa(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !arquivo || !capa) {
      showNotification('Preencha todos os campos!', 'info');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('arquivo', arquivo);
    formData.append('capa', capa);

    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'professor-id': '1', 
        }
      });

      console.log(response.data);
      showNotification('Upload realizado com sucesso!', 'success');

      setTitulo('');
      setArquivo(null);
      setCapa(null);
    } catch (error) {
      console.error(error);
      showNotification('Erro ao enviar o material.', 'error');
    }
  };

  return (
    <div className="upload-container">
      <h2><FaFileUpload /> Upload de Material Didático</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Título do Material</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Prova de Ciências - 1º Trimestre"
          />
        </div>

        <div className="form-group">
          <label>Imagem da Capa</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCapaChange}
          />
          {previewCapa && (
            <div className="capa-preview">
              <img src={previewCapa} alt="Prévia da capa" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Anexo (PDF ou imagem)</label>
          <input
            type="file"
            accept=".pdf, image/*"
            onChange={(e) => setArquivo(e.target.files?.[0] || null)}
          />
        </div>



        {/* <button type="submit">Enviar Material</button> */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            type='submit'
            sx={{ textTransform: 'none' }}
          >
            <FiSend style={{ marginRight: 8, marginTop: 2 }} />
            Enviar Material
          </Button>
        </Box>
      </form>

      {visible && (
        <Notification message={message} type={type} onClose={closeNotification} />
      )}
    </div>
  );
};

export default UploadBiblioteca;
