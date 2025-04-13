import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import '../styles/header.css';

import logoFull from '../assets/logo-full.png'; // Logo grande
import logoMini from '../assets/logo-mini.png'; // Logo mini

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
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
      <div className="logo-wrapper">
        <img
          src={isSidebarOpen ? logoFull : logoMini}
          alt="Logo"
          className={isSidebarOpen ? "logo-img" : "logo-mini-img"}
        />
      </div>

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
