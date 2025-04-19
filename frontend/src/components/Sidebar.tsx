import React, { useEffect } from 'react';
import {
  FaHome,
  FaBook,
  FaComments,
  FaRobot,
  FaCalendarAlt,
  FaHeart,
  FaChartBar,
  FaVideo,
  FaNewspaper,
} from 'react-icons/fa';
import '../styles/sidebar.css';
import { useNavigate } from 'react-router-dom';
import { fetchReceivedMessages } from '../services/message'; // Adjust the import path as necessary
import IMessage from '../models/IMessage';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
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
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <ul className="menu">
        <li onClick={() => navigate('/homeProfessor')}>
          <FaHome /> {isOpen && 'Início'}
        </li>
        <li onClick={() => navigate('/feed')}>
          <FaNewspaper /> {isOpen && 'Feed'}
        </li>
        <li onClick={() => navigate('/upload')}>
          <FaBook /> {isOpen && 'Biblioteca Digital'}
        </li>
        <li onClick={() => navigate('/notas-frequencias')}>
          <FaChartBar /> {isOpen && 'Frequências e Notas'}
        </li>
        <li onClick={() => navigate('/messages')} style={{ position: 'relative' }}>
          <FaComments className={hasUnreadMessages ? "pulsing-icon" : ""} /> {isOpen && 'Mensagens'}
        </li>
        <li onClick={() => navigate('/assistente')}>
          <FaRobot /> {isOpen && 'Assistente Virtual'}
        </li>
        <li onClick={() => navigate('/calendario')}>
          <FaCalendarAlt /> {isOpen && 'Calendário Escolar'}
        </li>
        <li onClick={() => navigate('/saude-bemestar')}>
          <FaHeart /> {isOpen && 'Bem-estar'}
        </li>
        <li onClick={() => navigate('/videoconferencia')}>
          <FaVideo /> {isOpen && 'Videoconferência (ATPC)'}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
