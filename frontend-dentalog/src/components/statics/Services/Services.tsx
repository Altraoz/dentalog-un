import service1 from '/images/landpage/Service_1.png';
import service2 from '/images/landpage/Service_2.png';
import service3 from '/images/landpage/Service_3.png';
import service4 from '/images/landpage/Service_4.png';
import service5 from '/images/landpage/Service_5.png';
import service6 from '/images/landpage/Service_6.png';
import service7 from '/images/landpage/Service_7.png';
import service8 from '/images/landpage/Service_8.png';
import ServiceList from './ServiceList';

export default function Services() {
    const services = [
        {
            img: service1,
            title: 'Diagnóstico integral infantil',
            description:
            'Evaluación completa del estado dental, funcional y óseo del niño para detectar a tiempo problemas en los dientes, huesos faciales o funciones como masticación y respiración. Ideal como primer paso para cualquier tratamiento odontopediátrico.'
        },
        {
            img: service2,
            title: 'Cuidado preventivo infantil',
            description:
            'Servicio enfocado en evitar enfermedades bucales mediante educación, control de hábitos, aplicación de flúor, sellantes y seguimiento personalizado. Promueve una salud bucal duradera desde temprana edad.'
        },
        {
            img: service3,
            title: 'Tratamientos dentales infantiles',
            description:
            'Intervenciones clínicas como restauraciones, endodoncia o extracciones para tratar caries, infecciones y otros problemas dentales. Siempre adaptados a la edad y necesidades del niño para asegurar una experiencia positiva y efectiva.'
        },
        {
            img: service4,
            title: 'Cirugías orales infantiles',
            description:
            'Procedimientos quirúrgicos menores como frenotomías o ventanas quirúrgicas, que corrigen alteraciones anatómicas o ayudan en tratamientos ortodónticos. Realizados en un entorno seguro y adaptado para niños.'
        },
        {
            img: service5,
            title: 'Urgencias dentales infantiles',
            description:
            'Atención inmediata para casos de dolor agudo, traumatismos, fracturas dentales o infecciones. Evaluación rápida y tratamiento seguro para aliviar síntomas y proteger la salud bucal del niño.'
        },
        {
            img: service6,
            title: 'Atención odontológica especial',
            description:
            'Servicio especializado en el manejo de niños con condiciones como TDAH, TEA, síndromes genéticos o dificultades sensoriales. Consultas adaptadas, estrategias de manejo conductual y personal capacitado para brindar atención segura y empática.'
        },
        {
            img: service7,
            title: 'Odontología con sedación infantil',
            description:
            'Uso de técnicas de sedación como óxido nitroso para realizar tratamientos de forma tranquila y sin ansiedad. Ideal para pacientes nerviosos, con necesidades especiales o que requieren procedimientos complejos.'
        },
        {
            img: service8,
            title: 'Ortopedia infantil y corrección de hábitos',
            description:
            'Guía del crecimiento facial y desarrollo dental mediante aparatos ortopédicos y corrección de hábitos orales nocivos. Previene malformaciones y favorece una estructura bucal armónica desde temprana edad.'
        }
    ];

    
    return (
        <>
            <ServiceList services={services}/>
        </>
    );
}