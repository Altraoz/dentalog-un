import React, { useState } from 'react';
import { Calendar, Plus, Clock, User, Phone } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { mockAppointments } from '../../data/mockData';
import { AppointmentModal } from './AppointmentModal';
import { Appointment } from '../../types';
import './AppointmentCalendar.css';

export const AppointmentCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2024-12-20');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const dailyAppointments = mockAppointments.filter(
    appointment => appointment.date === selectedDate
  );

  const handleNewAppointment = () => {
    setSelectedAppointment(null);
    setIsModalOpen(true);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'appointment-scheduled';
      case 'completed': return 'appointment-completed';
      case 'cancelled': return 'appointment-cancelled';
      default: return 'appointment-default';
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

  // Generate next 7 days for quick selection
  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      display: date.toLocaleDateString('es-ES', { 
        weekday: 'short', 
        day: 'numeric',
        month: 'short' 
      }),
      isToday: i === 0,
    };
  });

  return (
    <div className="appointment-calendar">
      <div className="calendar-header">
        <div>
          <h2 className="calendar-title">Agenda de Citas</h2>
          <p className="calendar-subtitle">Gestiona las citas de tus pacientes</p>
        </div>
        <Button onClick={handleNewAppointment} icon={Plus}>
          Nueva Cita
        </Button>
      </div>

      <div className="calendar-grid">
        {/* Quick Date Selector */}
        <div className="date-selector">
          <Card padding="sm">
            <div className="date-buttons">
              {nextDays.map((day) => (
                <button
                  key={day.date}
                  onClick={() => setSelectedDate(day.date)}
                  className={`date-button ${selectedDate === day.date ? 'active' : ''} ${day.isToday ? 'today' : ''}`}
                >
                  <div className="date-text">
                    <div className="capitalize">{day.display}</div>
                    {day.isToday && <div className="today-label">Hoy</div>}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Appointments List */}
        <div className="appointments-list">
          <Card>
            <div className="appointments-header">
              <h3 className="appointments-title">
                <Calendar className="title-icon" />
                Citas del {new Date(selectedDate).toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <span className="appointments-count">
                {dailyAppointments.length} citas programadas
              </span>
            </div>

            <div className="appointments-container">
              {dailyAppointments.length > 0 ? (
                dailyAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      onClick={() => handleAppointmentClick(appointment)}
                      className={`appointment-card ${getStatusColor(appointment.status)}`}
                    >
                      <div className="appointment-content">
                        <div className="appointment-details">
                          <div className="appointment-info">
                            <div className="patient-avatar">
                              {appointment.patientName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="patient-name">{appointment.patientName}</h4>
                              <p className="service-name">{appointment.serviceName}</p>
                            </div>
                          </div>
                          
                          <div className="appointment-meta">
                            <div className="meta-item">
                              <Clock className="meta-icon" />
                              {appointment.time} - {appointment.duration} min
                            </div>
                            <div className="meta-item">
                              <User className="meta-icon" />
                              {appointment.doctorName}
                            </div>
                          </div>
                        </div>

                        <div className="appointment-actions">
                          <span className={`status-tag status-${appointment.status}`}>
                            {getStatusText(appointment.status)}
                          </span>
                          <button className="call-button">
                            <Phone className="call-icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="no-appointments">
                  <Calendar className="no-appointments-icon" />
                  <p className="no-appointments-text">No hay citas programadas para este día</p>
                  <Button 
                    variant="outline" 
                    onClick={handleNewAppointment}
                    className="no-appointments-button"
                    size="sm"
                  >
                    Programar Primera Cita
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppointment}
        selectedDate={selectedDate}
      />
    </div>
  );
};