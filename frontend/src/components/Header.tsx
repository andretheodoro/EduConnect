import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import '../styles/header.css';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePerfilClick = () => {
    navigate('/perfil');
  };

  return (
    <header className="header">
      <button className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className="logo-container">
        <span className="logo">EduConnect</span>
        <span className="slogan">Conectando mentes, desenvolvendo futuros</span>
      </div>
      <div className="header-actions">
        <FaUserCircle className="icon" title="Perfil" onClick={handlePerfilClick} />
        <FaSignOutAlt className="icon" title="Sair" onClick={handleLogout} />
      </div>
    </header>
  );
};

export default Header;
