import React from 'react';
import { Home, Users, Calendar, Stethoscope, LogOut } from 'lucide-react';
import icon from '../../public/logo.png';
import { useAuth } from '../../contexts/AuthContext';
import { NavLink } from 'react-router-dom'; // cambia a NavLink
import './Sidebar.css';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/app/dashboard', label: 'Dashboard', icon: Home },
    { path: '/app/patients', label: 'Pacientes', icon: Users },
    { path: '/app/appointments', label: 'Citas', icon: Calendar },
    { path: '/app/services', label: 'Servicios', icon: Stethoscope },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <div className="logo-wrapper">
            <img src={icon} alt="Logo" className="logo" />
          </div>
          <div>
            <h1 className="sidebar-title">Zafari Dental</h1>
            <p className="sidebar-subtitle">Dentalog Clínica Odontopediátrica</p>
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
                  `sidebar-button ${isActive ? 'active' : ''}`
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
            <p className="user-role">{user?.role}</p>
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
