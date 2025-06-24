// import { Link } from "react-router-dom";
import "./FAQ.scss";

export default function FAQ() {
  return (
    <>
      <section className="faq-main-container">
        <article className="land-section">
          <div className="content-side">
            <div className="first-info">
              <p className="subtitle">Sección</p>
              <h1 className="title">PREGUNTAS FRECUENTES</h1>
              <p className="description-dark">
                En esta sección encontrarás respuestas a las preguntas más
                frecuentes que tienen padres y cuidadores sobre nuestros
                servicios, tratamientos y la experiencia de los niños en Zafari
                Dental. Queremos que te sientas informado, tranquilo y
                acompañado en cada paso.
              </p>
              <p className="description-light">
                En esta sección encontrarás respuestas a las preguntas más
                frecuentes que tienen padres y cuidadores sobre nuestros
                servicios, tratamientos y la experiencia de los niños en Zafari
                Dental. Queremos que te sientas informado, tranquilo y
                acompañado en cada paso.
              </p>
            </div>
            <div className="second-info">
              <div className="img-container">
                <img src="" alt="tooth-img" />
              </div>
              <div className="text-container">
                <p>
                  En esta sección encontrarás respuestas a las preguntas más
                  frecuentes que tienen padres y cuidadores sobre nuestros
                  servicios.
                </p>
                <div className="buttons-container">
                  <div className="button">
                    <p className="text-button">Pagos</p>
                  </div>
                  <div className="button">
                    <p className="text-button">Cuidados dentales</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="image-side">
            <img src="/images/FAQ/land.jpg" alt="tooth-img" />
          </div>
        </article>
        <article className="appointments-section">
          <div className="title-section">
            <p className="subtitle">¿tienes preguntas sobre</p>
            <h2 className="title">SOBRE CITAS?</h2>
          </div>
          <div className="info-section">
            <div className="questions-container">
              <h3 className="title-container">¿Cómo puedo agendar una cita?</h3>
              <p className="description-container">
                Puedes agendar una cita a través de nuestra página web, por
                teléfono o visitando nuestra clínica. Te recomendamos que
                reserves con anticipación para asegurar tu horario preferido.
              </p>
            </div>
            <div className="divider"></div>

            <div className="questions-container">
              <h3 className="title-container">
                ¿Qué pasa si necesito reprogramar?
              </h3>
              <p className="description-container">
                Si necesitas reprogramar tu cita, por favor contáctanos con al
                menos 24 horas de anticipación. Haremos todo lo posible para
                acomodar tu nueva solicitud.
              </p>
            </div>
            <div className="divider"></div>

            <div className="questions-container">
              <h3 className="title-container">
                ¿Atienden urgencias odontológicas?
              </h3>
              <p className="description-container">
                Sí, atendemos urgencias odontológicas. Si tu hijo tiene un
                problema dental urgente, por favor contáctanos de inmediato y
                haremos lo posible para atenderlo lo antes posible.
              </p>
            </div>
          </div>
        </article>
        <article className="first_date_section">
          <div>
            <p>¿tienes preguntas sobre</p>
            <h2>LA PRIMERA VISITA?</h2>
          </div>
          <div className="questions-container">
            <div className="item-container">
              <p className="subtitle">[1]</p>
              <p className="title">¿Qué debo esperar en la primera visita?</p>
              <p className="description">
                En la primera visita, realizaremos un examen completo de la boca
                de tu hijo y discutiremos cualquier preocupación que puedas
                tener. También tomaremos radiografías si es necesario.
              </p>
            </div>
            <div className="item-container">
              <p className="subtitle">[2]</p>
              <p className="title">¿Qué esperar en la primera cita?</p>
              <p className="description">
                En la primera cita, realizaremos un examen completo de la boca
                de tu hijo y discutiremos cualquier preocupación que puedas
                tener. También tomaremos radiografías si es necesario.
              </p>
            </div>
            <div className="item-container">
              <p className="subtitle">[3]</p>
              <p className="title">
                ¿Mi hijo puede venir aunque aún no tenga molestias?
              </p>
              <p className="description">
                Sí, es recomendable que tu hijo venga a la consulta incluso si
                no presenta molestias. La detección temprana de problemas
                dentales es clave para un tratamiento exitoso.
              </p>
            </div>
            <div className="item-container">
              <p className="subtitle">[4]</p>
              <p className="title">
                ¿Cómo puedo preparar a mi hijo para su primera visita al
                odontólogo?
              </p>
              <p className="description">
                Puedes preparar a tu hijo hablando positivamente sobre la
                visita, explicándole que el odontólogo es un amigo que cuida de
                sus dientes. También es útil practicar en casa con un cepillo de
                dientes y hablar sobre lo que sucederá durante la cita.
              </p>
            </div>
          </div>
        </article>
        <article className="dental_care_section">
          <div className="title-section">
            <p className="subtitle">¿tienes preguntas sobre</p>
            <h2 className="title">EL CUIDADO DENTAL EN CASA?</h2>
            <p>
              Aquí encontrarás información sobre cómo cuidar los dientes de tu
              hijo en casa, desde la higiene dental diaria hasta consejos para
              una alimentación saludable.
            </p>
          </div>
          <div className="info-section">
            <div className="questions-container">
              <h3 className="title-container">
                ¿Cada cuánto tiempo debe cepillarse un niño?
              </h3>
              <p className="description-container">
                Los niños deben cepillarse los dientes al menos dos veces al
                día, preferiblemente por la mañana y antes de acostarse. Es
                importante que utilicen un cepillo de dientes adecuado para su
                edad y una cantidad pequeña de pasta dental con flúor.
              </p>
            </div>
            <div className="divider"></div>

            <div className="questions-container">
              <h3 className="title-container">
                ¿Cómo prevenir las caries en los niños?
              </h3>
              <p className="description-container">
                Para prevenir las caries, es fundamental que los niños mantengan
                una buena higiene dental, cepillándose los dientes al menos dos
                veces al día, usando hilo dental y evitando el consumo excesivo
                de azúcares. También es recomendable llevar a cabo revisiones
                dentales regulares.
              </p>
            </div>
            <div className="divider"></div>

            <div className="questions-container">
              <h3 className="title-container">
                ¿Qué tipo de cepillo y crema recomiendan?
              </h3>
              <p className="description-container">
                Recomendamos un cepillo de dientes suave y de tamaño adecuado
                para la boca del niño. La pasta dental debe contener flúor y ser
                adecuada para su edad. Para niños menores de 3 años, se
                recomienda una cantidad del tamaño de un grano de arroz.
              </p>
            </div>
          </div>
        </article>
        <article className="plataform_sections">
          <div>
            <div>
              <p className="subtitle">¿tienes preguntas sobre</p>
              <h2 className="title">LA PLATAFORMA DE ZAFARI DENTAL?</h2>
            </div>
            <div>
              <p className="description">
                Aquí encontrarás información sobre cómo utilizar nuestra
                plataforma, desde la creación de una cuenta hasta la gestión de
                citas y pagos.
              </p>
            </div>
          </div>
          <div className="items-container">
            <div className="item">
              <div className="img-container">
                <img src="" alt="" />
              </div>
              <div className="text-container">
                <h3 className="title">
                  ¿Cómo puedo crear una cuenta en Zafari Dental?
                </h3>
                <p className="description">
                  Para crear una cuenta en Zafari Dental, visita nuestro sitio
                  web y haz clic en "Registrarse". Completa el formulario con
                  tus datos y sigue las instrucciones para verificar tu cuenta.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="img-container">
                <img src="" alt="" />
              </div>
              <div className="text-container">
                <h3 className="title">
                  ¿Cómo puedo gestionar mis citas en Zafari Dental?
                </h3>
                <p className="description">
                  Puedes gestionar tus citas a través de nuestra plataforma en
                  línea. Inicia sesión en tu cuenta, ve a la sección de citas y
                  podrás agendar, reprogramar o cancelar tus citas según sea
                  necesario.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="img-container">
                <img src="" alt="" />
              </div>
              <div className="text-container">
                <h3 className="title">
                  ¿ómo puedo ver la evolución de mi hijo en la plataforma?
                </h3>
                <p className="description">
                  Para ver la evolución de tu hijo en la plataforma, inicia
                  sesión en tu cuenta y dirígete a la sección de "Evolución".
                  Allí podrás acceder a informes y gráficos que muestran el
                  progreso de su salud dental a lo largo del tiempo.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="img-container">
                <img src="" alt="" />
              </div>
              <div className="text-container">
                <h3 className="title">
                  Puedo chatear con el odontólogo a través de la plataforma?
                </h3>
                <p className="description">
                  Sí, puedes chatear con el odontólogo a través de la
                  plataforma. Inicia sesión en tu cuenta y dirígete a la sección
                  de "Chat". Allí podrás comunicarte directamente con el
                  odontólogo para resolver tus dudas o inquietudes.
                </p>
              </div>
            </div>
          </div>
        </article>

        <div className="final_section">
          <article className="first-side">
            <h2>¿QUÉ HACE ESPECIAL A ZAFARI PARA LOS NIÑOS?</h2>
            <p>
              En Zafari Dental, nos especializamos en brindar atención dental
              adaptada a las necesidades de los niños. Nuestro equipo de
              odontólogos pediátricos está altamente capacitado para tratar a
              los más pequeños en un ambiente amigable y seguro.
            </p>
            <div className="image-container">
              <img src="" alt="special-zafari" />
            </div>
          </article>
          <article className="second-side">
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <h2>¿DONDE ESTAMOS UBICADOS?</h2>
              <p>
                Estamos ubicados en el corazón de la ciudad, en una zona de
                fácil acceso para todas las familias. Visítanos en nuestra
                clínica para recibir la mejor atención dental para tus hijos.
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
