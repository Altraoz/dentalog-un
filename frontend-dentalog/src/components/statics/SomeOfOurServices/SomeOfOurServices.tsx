import { Link } from 'react-router-dom';
import ServiceCard from './ServiceCard';

import './SomeOfOurServices.css';

export default function SomeOfOurServices() {
    const someServices = [
        {
            service: '',
            title: 'Diagnóstico integral',
            description: 'Ayuda a valorar cómo se encuentra la salud bucal y el desarrollo óseo de tu hijo con un diagnóstico completo.'
        }
    ]

    return (
        <>
            <section className='someOfOurServices'>
                <div className='meetSomeOfOurServices'>
                    <Link to='servicios' className='link' id='meetSomeOfOurServices__btn'>Conoce algunos de nuestros servicios</Link>
                </div>
                <div className='services'>
                </div>
            </section>
        </>
    );
}

/*
Diagnóstico dental, funcional y óseo
Promoción y prevención de enfermedades orales
Tratamiento de odontopediatría, restauraciones, endodoncia, extracciones
Cirugías, frenotomía labial y lingual, ventanas quirúrgicas
Urgencias, traumas, dolor dental, fracturas dentales
Atención de pacientes en condiciones especiales
Ortopedia maxilar, se realiza correción de hábitos, posición dental y reorientación de crecimiento óseo
Procedimientos bajo sedación
*/