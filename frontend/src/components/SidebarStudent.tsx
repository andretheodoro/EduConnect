import React, { useEffect } from 'react';
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
import { fetchReceivedMessages } from '../services/message';

interface SidebarStudentProps {
  isOpen: boolean;
  toggleSidebarStudent: () => void;
}

const SidebarStudent: React.FC<SidebarStudentProps> = ({ isOpen }) => {
  const navigate = useNavigate();
  const userEmail = JSON.parse(localStorage.getItem('usuario') || '{}').email;
  const [receivedMessages, setReceivedMessages] = React.useState<any[]>([]); // Adjust the type as necessary
  const [hasUnreadMessages, setHasUnreadMessages] = React.useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      await fetchReceivedMessages(userEmail, setReceivedMessages);
    };

    loadMessages();
  }, [userEmail]);


  useEffect(() => {
    setHasUnreadMessages(receivedMessages.some((message) => !message.isRead));
  }, [receivedMessages]);


  return (
    <div className={`SidebarStudent ${isOpen ? 'open' : 'closed'}`}>
      <ul className="menu">
        <li onClick={() => navigate('/homeAluno')}>
          <FaHome /> {isOpen && 'Início'}
        </li>
        <li onClick={() => navigate('/feed')}>
          <FaNewspaper /> {isOpen && 'Feed'}
        </li>
        <li onClick={() => navigate('/biblioteca')}>
          <FaBook /> {isOpen && 'Biblioteca Digital'}
        </li>
        <li onClick={() => navigate('/notas-frequencia-aluno')}>
          <FaChartBar /> {isOpen && 'Frequências e Notas'}
        </li>
        <li onClick={() => navigate('/messages')} style={{ position: 'relative' }}>
          <FaComments className={hasUnreadMessages ? "pulsing-icon" : ""} /> {isOpen && 'Mensagens'}
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
