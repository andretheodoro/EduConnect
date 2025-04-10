// src/components/Sidebar.tsx
import React from 'react';
import {
  FaHome,
  FaUser,
  FaBook,
  FaComments,
  FaRobot,
  FaCalendarAlt,
  FaHeart,
  FaChartBar,
  FaVideo,
  FaNewspaper
} from 'react-icons/fa';
import '../styles/sidebarStudent.css';
import { useNavigate } from 'react-router-dom';

interface SidebarStudentProps {
  isOpen: boolean;
  toggleSidebarStudent: () => void;
}

const SidebarStudent: React.FC<SidebarStudentProps> = ({ isOpen }) => {
  const navigate = useNavigate(); 

  return (
    <div className={`SidebarStudent ${isOpen ? 'open' : 'closed'}`}>
      <ul className="menu">
      <li onClick={() => navigate('/')}>
          <FaHome /> {isOpen && 'Início'}
        </li>
        <li onClick={() => navigate('/feed')}>
          <FaNewspaper /> {isOpen && 'Feed'}
        </li>
        <li onClick={() => navigate('/biblioteca')}>
          <FaBook /> {isOpen && 'Biblioteca Digital'}
        </li>
        <li onClick={() => navigate('/notas-frequencias')}>
          <FaChartBar /> {isOpen && 'Frequências e Notas'}
        </li>
        <li onClick={() => navigate('/mensagens')}>
          <FaComments /> {isOpen && 'Mensagens'}
        </li>
        <li onClick={() => navigate('/calendario')}>
          <FaCalendarAlt /> {isOpen && 'Calendário Escolar'}
        </li>
        <li onClick={() => navigate('/saude-bemestar-aluno')}>
          <FaHeart /> {isOpen && 'Bem-estar'}
        </li>
      </ul>
    </div>
  );
};

export default SidebarStudent;
