import { Link } from 'react-router-dom';
import { useState } from 'react';
import ZDLogo from '../../assets/ZD Logo.png';
import useOutsideInteraction from '../hooks/useOutsideInteraction';
import hamburguerBtn from '../../assets/BtnHamburguer.png'
import Options from './Options';
import './Navbar.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useOutsideInteraction<HTMLDivElement>(
        isMenuOpen,
        () => setIsMenuOpen(false)
    );

    return (
        <>
            <nav className='navbar'>
                <Link to='/'>
                    <img className='navbar__logo' src={ ZDLogo } />
                </Link>
                <div className='navbar__options--desktop'>
                    <Options />
                </div>
                <img 
                    className='navbar__btn--burger'
                    src={ hamburguerBtn }
                    onClick={ () => setIsMenuOpen(!isMenuOpen) } />
                <div ref={ menuRef } className={ `navbar__options--mobile ${isMenuOpen ? 'open': ''}` }>
                    <Options />
                </div>
            </nav>
        </>
    )
}