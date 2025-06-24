import React from 'react';
import { Home, Users, Calendar, Stethoscope, LogOut } from 'lucide-react';
import icon from '../../public/logo.png';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.css';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'patients', label: 'Pacientes', icon: Users },
    { id: 'appointments', label: 'Citas', icon: Calendar },
    { id: 'services', label: 'Servicios', icon: Stethoscope },
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
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`sidebar-button ${isActive ? 'active' : ''}`}
                >
                  <Icon className={`sidebar-icon ${isActive ? 'active' : ''}`} />
                  <span className="sidebar-button-text">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">
            {user?.name.charAt(0)}
          </div>
          <div className="user-info">
            <p className="user-name">{user?.name}</p>
            <p className="user-role">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="logout-button"
        >
          <LogOut className="logout-icon" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};