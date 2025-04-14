// src/components/Layout.tsx
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import SidebarStudent from './SidebarStudent';
import { Outlet } from 'react-router-dom';
import '../styles/layout.css';
import { useUsuario } from '../hooks/useUsuario';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const usuario = useUsuario();

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
