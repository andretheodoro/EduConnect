import React, { useEffect, useState } from 'react';
import '../styles/perfil.css';
import fotoPerfil from '../assets/user-1.png';
import api from '../services/api';
import { useUsuario } from '../hooks/useUsuario';

interface Usuario {
  name: string;
  type: string;
  email: string;
  education_level: string;
  teaching_area: string;
  teaching_segment: string;
}

const Perfil: React.FC = () => {
  const usuarioLogado = useUsuario();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const response = await api.get(`/users/${usuarioLogado?.id}`);
        setUsuario(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    };

    if (usuarioLogado?.id) {
      carregarUsuario();
    }
  }, [usuarioLogado]);

  if (!usuario) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <img src={fotoPerfil} alt="Foto do perfil" className="perfil-foto" />
        <h2>{usuario.name}</h2>
        <p><strong>Tipo:</strong> {usuario.type === "P" ? "Professor" : "Aluno"}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Área de Atuação:</strong> {usuario.teaching_area}</p>
        <p><strong>Segmento:</strong> {usuario.teaching_segment}</p>
        <p><strong>Nível de Educação:</strong> {usuario.education_level}</p>
      </div>
    </div>
  );
};

export default Perfil;
