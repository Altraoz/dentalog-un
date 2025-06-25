interface Service {
    img: string;
    title: string;
    description: string;
}

interface ServiceListProps {
    services: Service[]
}

const ServiceList = ({services}: ServiceListProps) => {
    return (
        <>
            {
            services.map((service, i) => {
                const isEven = i % 2 === 0;
                return (
                    <div key={i} className={ `service${ isEven ? ' reversed' : '' }` }>
                        <div className='service__imgContainer'>
                            <img 
                                src={service.img}
                                alt={service.title} />
                        </div>
                        <div className={ `service__content${ isEven ? ' reversed' : '' }` }>
                            <h2>{service.title}</h2>
                            <p>{service.description}</p>
                        </div>
                    </div>
                );
            })
            }
        </>
    );
}

export default ServiceList;