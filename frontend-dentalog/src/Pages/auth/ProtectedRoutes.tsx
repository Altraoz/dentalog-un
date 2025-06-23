import { Outlet, Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("Token");

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
