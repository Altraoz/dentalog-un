import { Link } from 'react-router-dom';
import aboutUsImage from '/images/landpage/About_Us.png';
import './AboutUs.css';

export default function AboutUs() {
    return (
        <>
            <section className='aboutUs'>
                <div className='weAreTheBest'>
                    <div className='weAreTheBest__info' >
                        <div className='weAreTheBest__forYou'>
                            <i className='fa-solid fa-hand-holding-heart' style={ {color: '#008fff'} } />
                            <span>Cuidado dental especializado solo para ti</span>
                        </div>
                        <h2>La <span>mejor experiencia dental</span> para los chiquis</h2>
                        <p> En nuestra clínica, cada zoonrisa es una gran aventura.<br/>
                            Nos especializamos en brindar una atención cálida, divertida y profesional para los más pequeños del hogar. Con amor y paciencia, transformamos la visita al dentista en una experiencia alegre, libre de temores y llena de zoonrisas.<br/><br/>
                            Porque creemos que una infancia con salud oral es el primer paso para un futuro brillante.
                        </p>
                        <div className='weAreTheBest__info--btns'>
                            <Link to='/servicios' className='exploreOurServices'>Explora nuestros servicios</Link>
                            <button className='videoAboutUs__btn'><i className='fa-solid fa-circle-play' style={ {color: '#008fff'} }></i>Ver video</button>
                        </div>
                    </div>
                    <div className='weAreTheBest__photo'>
                        <div className='weAreTheBest__imageContainer'>
                            <img />
                        </div>
                    </div>
                </div>
                <div className='scheduleAppointment'>
                    <button className='scheduleAppointment__btn'>Agenda una cita</button>
                </div>
                <div className='infoAboutUs'>
                    <div className='infoAboutUs__imgContainer'>
                        <img src={ aboutUsImage } className='infoAboutUs__img'/>
                    </div>
                    <div className='infoAboutUs__info'>
                        <h3>Sobre nosotros</h3>
                        <h2><span>6 Años de Experiencia</span> en el Cuidado Dental de los Chiquis</h2>
                        <p>Este es el lugar donde el cariño se une al conocimiento para brindar a los chiquis una atención segura, confiable y siempre con una sonrisa.</p>
                        <h4>Por qué elegirnos?</h4>
                        <p> 
                            <i className="fas fa-tooth" style={ {color: '#000'} }/> Nuestro espacio ofrece un ambiente lúdico para que los pequeños entren en confianza<br/><br/>
                            <i className="fas fa-tooth" style={ {color: '#000'} }/> Contamos con personal altamente capacitado y en constante actualización<br/><br/>
                            <i className="fas fa-tooth" style={ {color: '#000'} }/> Brindamos una experiencia única y personalizada para cada paciente<br/><br/>
                            <i className="fas fa-tooth" style={ {color: '#000'} }/> Ofrecemos unos altos estandares de calidad en cada tratamiento<br/><br/>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}