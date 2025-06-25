import { Link } from 'react-router-dom';

export default function Options() {
    return (
        <>
            <Link to='/servicios' className='navbar__btn--option'>Servicios</Link>
            <Link to='/procedimientos' className='navbar__btn--option'>Procedimientos</Link>
            <Link to='/niños' className='navbar__btn--option'>Para los chiquis</Link>
            <Link to='/faq' className='navbar__btn--option'>FAQ</Link>
        </>
    );
}