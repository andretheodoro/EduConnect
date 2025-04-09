import React from 'react';
import '../styles/perfil.css';
import fotoPerfil from '../assets/user.png'; // imagem padrão

const Perfil: React.FC = () => {
  const usuario = {
    nome: 'Maria da Silva',
    tipo: 'Professora',
    email: 'maria.silva@educonnect.com',
    areaAtuacao: 'Educação Infantil',
    disciplinas: ['Português', 'Matemática'],
    experiencia: '10 anos de sala de aula',
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <img src={fotoPerfil} alt="Foto do perfil" className="perfil-foto" />
        <h2>{usuario.nome}</h2>
        <p><strong>Tipo:</strong> {usuario.tipo}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Área de Atuação:</strong> {usuario.areaAtuacao}</p>
        <p><strong>Disciplinas:</strong> {usuario.disciplinas.join(', ')}</p>
        <p><strong>Experiência:</strong> {usuario.experiencia}</p>
      </div>
    </div>
  );
};

export default Perfil;
