import React, { useEffect, useState } from "react";
import { Calendar, Plus, Clock, User, Phone } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { getAppointments, getAppointmentsType, getActivities } from "../../api/apointments";
import { getPatients } from "../../api/patients";
import { AppointmentModal } from "./AppointmentModal";
import type { Appointment } from "../../types";
import "./AppointmentCalendar.css";
import { useAuth } from "../../contexts/AuthContext";
import { AppointmentEditModal } from "./AppointmentEditModal";


export const AppointmentCalendar: React.FC = () => {
  function getDateTimeZone(timeZone: string, date = new Date()): string {
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatter.format(date);
  }
  const [selectedDate, setSelectedDate] = useState(getDateTimeZone("America/Bogota"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [appointmentTypes, setAppointmentTypes] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsResponse = await getAppointments(user!.token);
        if (!appointmentsResponse) return null;

        const patientResponse = await getPatients(user!.token);
        const patients = patientResponse?.data.results;

        const appointmentTypeResponse = await getAppointmentsType(user!.token);
        const appointmentTypes = appointmentTypeResponse?.data;

        const activitiesResponse = await getActivities(user!.token);
        const activities = activitiesResponse?.data;

        const enrichedAppointments = appointmentsResponse.data.map((appointment: any) => {
          const patient = patients.find((p: any) => p.id === appointment.patient);
          const patientName = patient.first_name + " " + patient.last_name;

          const appointmentType = appointmentTypes.find((type: any) => type.id === appointment.type);
          const appointmentTypeName = appointmentType.name;

          const appointmentActivities = appointment.activities.map((actv: any) => {
            const activity = activities.find((act: any) => act.id === actv.activity);
            return activity.name;
          });

          console.log({
            ...appointment,
            patientName,
            typeName: appointmentTypeName,
            activities: appointmentActivities
          })

          return {
            ...appointment,
            patientName,
            typeName: appointmentTypeName,
            activities: appointmentActivities
          };
        });

        setAppointments(enrichedAppointments);
        setPatients(patients);
        setAppointmentTypes(appointmentTypes);
      } catch (err) {
        console.error(err)
      }
    };

    fetchAppointments();
  }, [user]);

  const filterAppointments = () => {
  return appointments.filter((appointment) => {
    const appointmentDate = appointment.attention_date.split("T")[0];
    
    return appointmentDate === selectedDate;
  });
};

  const dailyAppointments = filterAppointments();

  const handleNewAppointment = () => {
    setSelectedAppointment(null);
    setIsModalOpen(true);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "programada":
        return "appointment-scheduled";
      case "atendida":
        return "appointment-completed";
      case "cancelada":
        return "appointment-cancelled";
      case "no asistió":
        return "appointment-cancelled";
      case "reprogramada":
        return "appointment-scheduled";
      default:
        return "appointment-default";
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Generate next 7 days for quick selection
  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: getDateTimeZone("America/Bogota", date),
      display: date.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      isToday: i === 0,
    };
  });

  return (
    <div className="appointment-calendar">
      <div className="calendar-header">
        <div>
          <h2 className="calendar-title">Agenda de Citas</h2>
          <p className="calendar-subtitle">
            Gestiona las citas de tus pacientes
          </p>
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
                  className={`date-button ${
                    selectedDate === day.date ? "active" : ""
                  } ${day.isToday ? "today" : ""}`}
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
                Citas del{" "}
                {(() => {
                  const [year, month, day] = selectedDate
                    .split("-")
                    .map(Number);
                  const localDate = new Date(year, month - 1, day);
                  return localDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                })()}
              </h3>
              <span className="appointments-count">
                {dailyAppointments.length} citas programadas
              </span>
            </div>

            <div className="appointments-container">
              {dailyAppointments.length > 0 ? (
                dailyAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    onClick={() => handleAppointmentClick(appointment)}
                    className={`appointment-card ${getStatusColor(appointment.status)}`}
                  >
                    <div className="appointment-content">
                      <div className="appointment-details">
                        <div className="appointment-info">
                          <div className="patient-avatar">
                            {appointment.patientName.split(' ').reduce((acc, curr) => acc + curr.charAt(0), '')}
                          </div>
                          <div>
                            <h4 className="patient-name">
                              {appointment.patientName}
                            </h4>
                            <p className="service-name">{appointment.typeName}</p>
                            {appointment.activities.map((activity) => <li>{activity}</li>)}
                          </div>
                        </div>

                        <div className="appointment-meta">
                          <div className="meta-item">
                            <Clock className="meta-icon" />
                            {appointment.time.slice(0,5)}
                          </div>
                          <div className="meta-item">
                            <User className="meta-icon" />
                            Luisa
                          </div>
                        </div>
                      </div>

                      <div className="appointment-actions">
                        <span
                          className={`status-tag status-${appointment.status}`}
                        >
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
                  <p className="no-appointments-text">
                    No hay citas programadas para este día
                  </p>
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
      <AppointmentEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        appointment={selectedAppointment}
      />

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppointment}
        selectedDate={selectedDate}
      />
    </div>
  );
};
