import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';

export default function App() {
    return  (
        <Router>
            <Routes>
                <Route path='/' element={ <MainPage />}></Route>
            </Routes>
        </Router>
    );
}