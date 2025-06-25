import React from 'react';
import { Clock, User, Phone } from 'lucide-react';
import { Card } from '../ui/Card';
import { mockAppointments } from '../../data/mockData';
import './UpcomingAppointments.css';

export const UpcomingAppointments: React.FC = () => {
  const todayAppointments = mockAppointments.filter(
    appointment => appointment.date === '2024-12-20'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'status-scheduled';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Programada';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <Card>
      <div className="appointments-header">
        <h3 className="appointments-title">Citas de Hoy</h3>
        <div className="appointments-count">
          <Clock className="appointments-count-icon" />
          {todayAppointments.length} citas programadas
        </div>
      </div>

      <div className="appointments-list">
        {todayAppointments.map((appointment) => (
          <div key={appointment.id} className="appointment-item">
            <div className="appointment-avatar">
              <div className="avatar-circle">
                {appointment.patientName.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            
            <div className="appointment-details">
              <div className="appointment-info">
                <p className="appointment-patient-name">{appointment.patientName}</p>
                <span className={`appointment-status ${getStatusColor(appointment.status)}`}>
                  {getStatusText(appointment.status)}
                </span>
              </div>
              <p className="appointment-service">{appointment.serviceName}</p>
              <div className="appointment-meta">
                <div className="appointment-time">
                  <Clock className="meta-icon" />
                  {appointment.time} ({appointment.duration} min)
                </div>
                <div className="appointment-doctor">
                  <User className="meta-icon" />
                  {appointment.doctorName}
                </div>
              </div>
            </div>

            <div className="appointment-actions">
              <button className="appointment-call-button">
                <Phone className="call-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};