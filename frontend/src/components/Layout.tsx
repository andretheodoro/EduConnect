// src/components/Layout.tsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import SidebarStudent from './SidebarStudent';
import { Outlet } from 'react-router-dom';
import '../styles/layout.css';
import { useUsuario } from '../hooks/useUsuario';
import { useNavigate, useLocation  } from 'react-router-dom';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const usuario = useUsuario();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
    if (usuario?.tipo === "P") {
      navigate('/homeProfessor');
    } else if (usuario?.tipo === "A") {
      navigate('/homeAluno');
    }
  }
  }, [usuario, navigate]);
 
  return (
    <div className="layout">
      {/* 👉 Aqui passamos a prop corretamente */}
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />
      <div className="main-content">
        {usuario?.tipo === 'P' ? <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> : <SidebarStudent isOpen={sidebarOpen} toggleSidebarStudent={toggleSidebar} />}
        {/* <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
        <div className="page-content"
          style={{
            marginLeft: sidebarOpen ? 240 : 70, // ou o valor da largura da sidebar
            transition: 'margin-left 0.3s ease',
            width: `calc(100% - ${sidebarOpen ? 290 : 120}px)`,
          }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
