import { Link } from "react-router-dom";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <>
      <section className="aboutUs">
        <div className="weAreTheBest">
          <div className="weAreTheBest__info">
            <div className="weAreTheBest__forYou">
              <i
                className="fa-regular fa-face-smile"
                style={{ color: "#74C0FC" }}
              />
              <span>Cuidado dental de primera solo para ti</span>
            </div>
            <h2>
              La <span>mejor experiencia dental</span> para los chiquis
            </h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
              soluta vero id similique tenetur iusto consequatur sapiente,
              totam, quos deserunt sunt maxime veniam illo iste mollitia
              accusamus porro, quis magnam.
            </p>
            <div className="weAreTheBest__info--btns">
              <Link to="/servicios" className="exploreOurServices">
                Explora nuestros servicios
              </Link>
              <button className="videoAboutUs__btn">
                <i
                  className="fa-solid fa-circle-play"
                  style={{ color: "#008fff" }}
                ></i>
                Ver video
              </button>
            </div>
          </div>
        </div>
        <div className="infoAboutUs"></div>
      </section>
    </>
  );
}
