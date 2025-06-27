import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { LoginForm } from "../components/Auth/LoginForm";
import { Sidebar } from "../components/Layout/Sidebar";
import ClientView from "./clients/ClientView";
import DentistView from "./dentist/DentistView";

const RenderView: React.FC = () => {
  const { user } = useAuth();

  console.log(user?.role);

  switch (Number(user?.role)) {
    case 1:
      return <DentistView />;
    case 21:
      return <DentistView />;
    case 22:
      return <ClientView />;
    case 3:
    default:
      return <ClientView />;
  }
};

const AppLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        {/* <ClientView /> */}
        {/* <DentistView /> */}
        <RenderView />
      </main>
    </div>
  );
};

const AppPanel: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <LoginForm />;

  return <AppLayout />;
};

export default AppPanel;
