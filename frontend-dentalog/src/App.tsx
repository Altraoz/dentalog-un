import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FAQPage from "./pages/statics/FAQPage";
import MainPage from "./pages/statics/MainPage";
import UnderConstruction from "./components/statics/UnderConstruction/UnderConstruction";
import Servicios from "./pages/statics/Servicios";

import AppPanel from "./pages/AppPanel";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/app/*" element={<AppPanel />} />
          <Route path="/faq" element={<FAQPage />} /> {/* <-- aquí */}
          <Route path="/servicios" element={<Servicios />} />
          <Route path="*" element={<UnderConstruction />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
