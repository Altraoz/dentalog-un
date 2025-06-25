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
    labels: ['8:00', '11:00', '14:00', '17:00', '20:00', '23:00'],
    datasets: [
      {
        label: 'Presión',
        data: [110, 130, 120, 150, 135, 125],
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
      y: { min: 80, max: 160, ticks: { stepSize: 20 } },
      x: { ticks: { color: '#999' } },
    },
  }

  // Datos actividad semanal
  const activityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          <h3>Blood pressure</h3>
          <div className="dropdown">Today</div>
        </div>
        <Line data={bloodPressureData} options={bloodPressureOptions} />
      </div>

      <div className="chart-card activity">
        <div className="chart-header">
          <h3>Your activity</h3>
          <div className="dropdown">Week</div>
        </div>
        <Bar data={activityData} options={activityOptions} />
      </div>
    </div>
  )
}
