import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FAQPage from "./pages/statics/FAQPage";
import MainPage from "./pages/statics/MainPage";

import AppPanel from "./pages/AppPanel";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/app/*" element={<AppPanel />} />
          <Route path="/faq" element={<FAQPage />} /> {/* <-- aquí */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
