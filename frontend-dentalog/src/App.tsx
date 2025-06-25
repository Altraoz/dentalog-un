import React from "react";
import "./App.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoginForm } from "./components/Auth/LoginForm";
import { Sidebar } from "./components/Layout/Sidebar";
import { DashboardStats } from "./components/Dashboard/DashboardStats";
import { UpcomingAppointments } from "./components/Dashboard/UpcomingAppointments";
import { PatientList } from "./components/Patients/PatientList";
import { AppointmentCalendar } from "./components/Appointments/AppointmentCalendar";
import { ServiceCatalog } from "./components/Services/ServiceCatalog";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FAQPage from "./pages/statics/FAQPage";
import MainPage from "./pages/statics/MainPage";

const Dashboard = () => (
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
          <p>
            No olvides actualizar los historiales médicos después de cada
            consulta
          </p>
        </div>
      </div>
    </div>
  </div>
);

const AppLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div className="main-padding">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="appointments" element={<AppointmentCalendar />} />
            <Route path="services" element={<ServiceCatalog />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <LoginForm />;

  return <AppLayout />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/app/*" element={<AppContent />} />
          <Route path="/faq" element={<FAQPage />} /> {/* <-- aquí */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
