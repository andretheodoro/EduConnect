// src/components/Layout.tsx
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import '../styles/layout.css';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="layout">
      {/* 👉 Aqui passamos a prop corretamente */}
      <Header toggleSidebar={toggleSidebar} />
      <div className="main-content">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="page-content">
          <Outlet />
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default Layout;
