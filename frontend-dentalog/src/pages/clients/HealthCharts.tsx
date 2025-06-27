import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import './HealthCharts.scss'

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
)

export default function HealthCharts() {
  // Datos presión sanguínea
  const bloodPressureData = {
    labels: ['10/05', '20/05', '30/05', '10/06', '22/06', '25/06'],
    datasets: [
      {
        label: 'Presión',
        data: [7, 2, 3, 1, 4, 1],
        borderColor: '#f28e2c',
        backgroundColor: 'rgba(242, 142, 44, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#f28e2c',
      },
    ],
  }

  const bloodPressureOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 0, max: 10, ticks: { stepSize: 20 } },
      x: { ticks: { color: '#999' } },
    },
  }

  // Datos actividad semanal
  const activityData = {
    labels: ['Evolution 1', 'Evolution 2', 'Evolution 3 ', 'Evolution 4', 'Evolution 5', 'Evolution 6', 'Evolution 7'],
    datasets: [
      {
        label: 'Actividad',
        data: [60, 30, 85, 55, 65, 45, 50],
        backgroundColor: (ctx: import('chart.js').ScriptableContext<'bar'>) =>
          ctx.dataIndex === 2 ? '#f28e2c' : '#d3d3d3',
        borderRadius: 10,
      },
    ],
  }

  const activityOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        max: 100,
        ticks: {
          stepSize: 20,
          callback: function (tickValue: string | number) {
            return `${tickValue}%`
          },
        },
      },
    },
  }

  return (
    <div className="charts-container">
      <div className="chart-card blood-pressure">
        <div className="chart-header">
          <h3>Actividades odontológicas totales</h3>
          <div className="dropdown">Today</div>
        </div>
        <Line data={bloodPressureData} options={bloodPressureOptions} />
      </div>

      <div className="chart-card activity">
        <div className="chart-header">
          <h3>Avance de en evoluciones</h3>
          <div className="dropdown">Week</div>
        </div>
        <Bar data={activityData} options={activityOptions} />
      </div>
    </div>
  )
}
