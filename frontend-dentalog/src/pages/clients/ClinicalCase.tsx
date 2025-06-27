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
            <h2 className="patient-name">Juan</h2>
            <p className="patient-email">David</p>
            <div className="patient-appointments">
              <div>
                <strong>3</strong>
                <br />
                Pasadas
              </div>
              <div>
                <strong>1</strong>
                <br />
                Próximas
              </div>
            </div>
            {/* <button className="send-message">Enviar Mensaje</button> */}
          </div>

          <div className="patient-info">
            <div className="info-pair">
              <span>Nombre:</span> Juan David
            </div>
            <div className="info-pair">
              <span>Apellido:</span> Gomez
            </div>
            <div className="info-pair">
              <span>Fecha de nacimiento:</span> 15/08/2014
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
              <span>Dirección:</span> Calle 24 #12-1
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
                8:00 - 8:30 <span>28 /07 / 2025</span>
              </div>
              <div className="card neurologist">
                <img src="/tooth.png" alt="Dentist" />
                <div className="details">
                  <h3>Control de Crecimiento y Desarrollo</h3>
                  <p>Dr. Carlos Urresty</p>
                </div>
                <span className="clinic">Programada</span>
                <i className="icon-menu"></i>
              </div>
            </div>

            <div className="appointment">
              <div className="time">
                8:00 - 8:30 <span>20 /07 / 2025</span>
              </div>
              <div className="card neurologist">
                <img src="/tooth.png" alt="Dentist" />
                <div className="details">
                  <h3>Consulta General Pediátrica</h3>
                  <p>Dr. Carlos Urresty</p>
                </div>
                <span className="clinic">Realizada</span>
                <i className="icon-menu"></i>
              </div>
            </div>

            <div className="appointment">
              <div className="time">
                8:00 - 8:30 <span>15 /07 / 2025</span>
              </div>
              <div className="card neurologist">
                <img src="/tooth.png" alt="Dentist" />
                <div className="details">
                  <h3>Consulta de Urgencia Pediátrica</h3>
                  <p>Dr. Carlos Urresty</p>
                </div>
                <span className="clinic">Realizada</span>
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
