interface Service {
    img: string;
    title: string;
    description: string;
}

interface ServiceListProps {
    services: Service[]
}

const ServiceList = ({services}: ServiceListProps) => {
    const slugify = (str: string) =>
        str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '')


    return (
        <>
            {
                services.map((service, i) => {
                    const isEven = i % 2 === 0;
                    const classSuff = slugify(service.title);
                return (
                    <div key={i} className={ `service${ !isEven ? ' reversed' : '' }` }>
                        <div className={ `service__imgContainer service_${classSuff}` }>
                            <img 
                                src={service.img}
                                alt={service.title} />
                        </div>
                        <div className={ `service__content${ !isEven ? ' reversed' : '' } service_${classSuff}` }>
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