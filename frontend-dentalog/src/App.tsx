import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import FAQPage from './Pages/FAQPage';


export default function App() {
    return  (
        <Router>
            <Routes>
                <Route path='/' element={ <MainPage />}></Route>
                <Route path='/FAQ' element={ <FAQPage />}></Route>
                <Route path='/app' element={ <FAQPage />}></Route>


            </Routes>
        </Router>
    );
}