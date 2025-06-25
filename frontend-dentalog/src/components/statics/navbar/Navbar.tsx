import { Link } from 'react-router-dom';
import ZDLogo from '../../../public/images/landpage/ZD Logo.png';
import Options from './Options';
import './Navbar.css';

export default function Navbar() {

    return (
        <>
            <nav className='navbar'>
                <Link to='/'>
                    <img className='navbar__logo' src={ ZDLogo } />
                </Link>
                <div className='navbar__options'>
                    <Options />
                </div>
                <Link to='/app/' className='navbar__btn--login'>Iniciar Sesión</Link>
            </nav>
        </>
    )
}