// import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import HealthCharts from "./HealthCharts";
import ChatCard from "./ChatCard";
import "./ClinicalCase.scss";
import { useAuth } from "../../contexts/AuthContext";

ChartJS.register(ArcElement, Tooltip);

export default function ClinicalCase() {
  const { user } = useAuth();

  const data = {
    labels: ["Preventivos", "Quirúrgicos", "Diagnóstico"],
    datasets: [
      {
        data: [4, 3, 1],
        backgroundColor: ["#ff7d4d", "#a689f7", "#7ad39b"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="clinical-case">
      <div className="section-space">
        <div className="patient-card">
          <div className="patient-left">
            <img
              className="patient-photo"
              src="https://img.freepik.com/psd-gratis/representacion-3d-avatar_23-2150833580.jpg"
              alt="Patient Photo"
            />
            <h2 className="patient-name">{user?.name}</h2>
            <p className="patient-email">{user?.email}</p>
            <div className="patient-appointments">
              <div>
                <strong>5</strong>
                <br />
                Pasadas
              </div>
              <div>
                <strong>2</strong>
                <br />
                Próximas
              </div>
            </div>
            <button className="send-message">Enviar Mensaje</button>
          </div>

          <div className="patient-info">
            <div className="info-pair">
              <span>Nombre:</span> {user?.first_name}
            </div>
            <div className="info-pair">
              <span>Apellido:</span> {user?.last_login}
            </div>
            <div className="info-pair">
              <span>Fecha de nacimiento:</span> 15/08/1990
            </div>
            <div className="info-pair">
              <span>Número de documento:</span> 123456789
            </div>
            <div className="info-pair">
              <span>Género:</span> Masculino
            </div>
            <div className="info-pair">
              <span>Tipo de sangre:</span> O+
            </div>
            <div className="info-pair">
              <span>Dirección:</span> Calle Falsa 123
            </div>
            <div className="info-pair">
              <span>Responsable:</span> María Gómez
            </div>
          </div>
        </div>
        <div className="appointment-history">
          <div className="header">
            <h2>
              <i className="icon-user"></i> HISTORIAL DE CITAS
            </h2>
            <div className="icons">
              <i className="icon-bell"></i>
              <i className="icon-settings"></i>
            </div>
          </div>

          <div className="appointment-list">
            <div className="appointment">
              <div className="time">
                8:00 - 8:30 <span>AM</span>
              </div>
              <div className="card dentist">
                <img src="icon-dentist.png" alt="Dentist" />
                <div className="details">
                  <h3>Dentist</h3>
                  <p>Dr. Dianne Fisher</p>
                </div>
                <span className="clinic">CityMed Clinic</span>
                <i className="icon-menu"></i>
              </div>
            </div>

            <div className="appointment">
              <div className="time">
                9:00 - 9:30 <span>AM</span>
              </div>
              <div className="card neurologist">
                <img src="icon-neuro.png" alt="Neurologist" />
                <div className="details">
                  <h3>Neurologist</h3>
                  <p>Dr. Paul Collins</p>
                </div>
                <span className="clinic">Huston Hospital</span>
                <i className="icon-menu"></i>
              </div>
            </div>

            <div className="appointment">
              <div className="time">
                18:00 - 18:30 <span>PM</span>
              </div>
              <div className="card xray">
                <img src="icon-xray.png" alt="X-Ray" />
                <div className="details">
                  <h3>Digital X-Ray</h3>
                  <p>Dr. Betty Woods</p>
                </div>
                <span className="clinic">CityMed Clinic</span>
                <i className="icon-menu"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-b">
        <div className="right-panel">
          <div className="chart-container">
            <div className="chart-wrapper">
              <Doughnut data={data} options={options} />
              <div className="chart-center-text">
                <h2>8</h2>
                <p>Procedimientos</p>
              </div>
            </div>
            <div className="legend">
              <div className="legend-item">
                <div
                  className="legend-color"
                  style={{ background: "#ff7d4d" }}
                ></div>
                Procedimientos preventivos
              </div>
              <div className="legend-item">
                <div
                  className="legend-color"
                  style={{ background: "#a689f7" }}
                ></div>
                Procedimientos quirúrgicos
              </div>
              <div className="legend-item">
                <div
                  className="legend-color"
                  style={{ background: "#7ad39b" }}
                ></div>
                Procedimientos de diagnóstico
              </div>
            </div>
          </div>
          <HealthCharts />
        </div>

        <div className="chat">
          <ChatCard />
        </div>
      </section>
    </div>
  );
}
