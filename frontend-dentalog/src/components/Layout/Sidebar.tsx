import React from "react";
import {
  Home,
  Users,
  Calendar,
  Stethoscope,
  LogOut,
  Smile,
  FolderClock,
  ClipboardPlus,
  // LineChart,
} from "lucide-react";
import icon from "../../public/logo.png";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom"; // cambia a NavLink
import "./Sidebar.css";

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const menuDoctorItems = [
    { path: "/app/dashboard", label: "Dashboard", icon: Home },
    { path: "/app/patients", label: "Pacientes", icon: Users },
    { path: "/app/appointments", label: "Citas", icon: Calendar },
    // { path: "/app/services", label: "Servicios", icon: Stethoscope },
    { path: "/app/evolutions", label: "Evoluciones", icon: Stethoscope },
    {
      path: "/app/medical_files",
      label: "Archivos médicos",
      icon: ClipboardPlus,
    },
  ];

  const menuAdminItems = [
    { path: "/app/dashboard", label: "Dashboard", icon: Home },
    { path: "/app/patients", label: "Pacientes", icon: Users },
    { path: "/app/appointments", label: "Citas", icon: Calendar },
    // { path: "/app/services", label: "Servicios", icon: Stethoscope },
    { path: "/app/evolutions", label: "Evoluciones", icon: Stethoscope },
    {
      path: "/app/medical_files",
      label: "Archivos médicos",
      icon: ClipboardPlus,
    },
  ];

  const menuUserItems = [
    { path: "/app/dashboard", label: "Dashboard", icon: Home },
    { path: "/app/history", label: "Historia", icon: FolderClock },
    {
      path: "/app/child-content",
      label: "Contenido para chiquis",
      icon: Smile,
    },
    // {
    //   path: "/app/educational",
    //   label: "Progreso de evoluciones",
    //   icon: LineChart,
    // },
  ];

  let menuItems = menuUserItems;
  if (Number(user?.role) === 1) menuItems = menuUserItems;
  else if (Number(user?.role) === 2) menuItems = menuDoctorItems;
  else if (Number(user?.role) === 3) menuItems = menuAdminItems;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <div className="logo-wrapper">
            <img src={icon} alt="Logo" className="logo" />
          </div>
          <div>
            <h1 className="sidebar-title">Zafari Dental</h1>
            <p className="sidebar-subtitle">
              Dentalog Clínica Odontopediátrica
            </p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `sidebar-button ${isActive ? "active" : ""}`
                }
              >
                <Icon className="sidebar-icon" />
                <span className="sidebar-button-text">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">{user?.name.charAt(0)}</div>
          <div className="user-info">
            <p className="user-name">{user?.name}</p>
          </div>
        </div>
        <button onClick={logout} className="logout-button">
          <LogOut className="logout-icon" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
