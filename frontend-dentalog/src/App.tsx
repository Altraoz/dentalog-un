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
import UnderConstruction from "./components/statics/UnderConstruction/UnderConstruction";

import AppPanel from "./pages/AppPanel";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/app/*" element={<AppPanel />} />
          <Route path="/faq" element={<FAQPage />} /> {/* <-- aquí */}
          <Route path="*" element={<UnderConstruction />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
