import { Link } from 'react-router-dom';

interface ServiceCardProps {
    img: string,
    title: string
    description: string
}

export default function ServiceCard({img, title, description}: ServiceCardProps) {
    return (
        <>
            <div className='serviceCard'>
                <img src={ img } />
                <h4>{ title }</h4>
                <p>{ description }</p>
                <Link to='/servicios' className='serviceCard__btn'>Conocer más</Link>
            </div>
        </>
    );
}