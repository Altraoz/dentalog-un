import React, { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Sidebar } from './components/Layout/Sidebar';
import { DashboardStats } from './components/Dashboard/DashboardStats';
import { UpcomingAppointments } from './components/Dashboard/UpcomingAppointments';
import { PatientList } from './components/Patients/PatientList';
import { AppointmentCalendar } from './components/Appointments/AppointmentCalendar';
import { ServiceCatalog } from './components/Services/ServiceCatalog';


const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="section-space">
            <div className="dashboard-header">
              <h1>Dashboard</h1>
              <p>Resumen general de tu clínica odontopediátrica</p>
            </div>
            <DashboardStats />
            <div className="two-column section-space">
              <UpcomingAppointments />
              <div className="section-space">
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
      case 'patients':
        return <PatientList />;
      case 'appointments':
        return <AppointmentCalendar />;
      case 'services':
        return <ServiceCatalog />;
      default:
        return <div>Sección no encontrada</div>;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="main-content">
        <div className="main-padding">{renderContent()}</div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
