// Dashboard.tsx
import React from 'react';
import './Dashboard.css';

import { DashboardStats } from '../components/Dashboard/DashboardStats';
import { UpcomingAppointments } from '../components/Dashboard/UpcomingAppointments';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Resumen general de tu clínica odontopediátrica</p>
      </div>

      <DashboardStats />

      <div className="dashboard-grid">
        <UpcomingAppointments />

        <div className="dashboard-right">
          <div className="welcome-box">
            <h3>Bienvenido a Dentalog</h3>
            <p>Sistema integral para la gestión de tu clínica odontopediátrica</p>
          </div>

          <div className="reminder-box">
            <h3>Recordatorio</h3>
            <p>No olvides actualizar los historiales médicos después de cada consulta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
