// src/routes/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  tipoUsuario?: "P" | "A"; // novo parâmetro opcional
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, tipoUsuario }) => {
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  if (!token || !usuario) {
    return <Navigate to="/login" replace />;
  }

  if (tipoUsuario && usuario.tipo !== tipoUsuario) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
