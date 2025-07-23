import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardStats } from "../../components/Dashboard/DashboardStats";
import { UpcomingAppointments } from "../../components/Dashboard/UpcomingAppointments";
import { PatientList } from "../../components/Patients/PatientList";
import { AppointmentCalendar } from "../../components/Appointments/AppointmentCalendar";
import { ServiceCatalog } from "../../components/Services/ServiceCatalog";
import { EvolutionsView } from "../../components/Evolutions/EvolutionsView";
import { MedicalFilesView } from "../../components/Medical files/MedicalFilesView";

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

function DentistView() {
  return (
    <div className="main-padding">
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="patients" element={<PatientList />} />
        <Route path="appointments" element={<AppointmentCalendar />} />
        <Route path="services" element={<ServiceCatalog />} />
        <Route path="evolutions" element={<EvolutionsView />} />
        <Route path="medical_files" element={<MedicalFilesView />} />
        <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
      </Routes>
    </div>
  );
}

export default DentistView;
