import { Routes, Route, Navigate } from "react-router-dom";
import ClinicalCase from "./ClinicalCase";
function ClientView() {
  return (
            <div className="main-padding">
          <Routes>
            <Route path="dashboard" element={<ClinicalCase />} />
            {/* <Route path="patients" element={<PatientList />} />
            <Route path="appointments" element={<AppointmentCalendar />} />
            <Route path="services" element={<ServiceCatalog />} />
            <Route path="users" element={<ClinicalCase />} /> */}

            {/* <Route path="*" element={<Navigate to="dashboard" replace />} /> */}
            <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
          </Routes>
        </div>
  );
}

export default ClientView;