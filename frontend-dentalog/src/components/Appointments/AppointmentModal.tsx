import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Appointment } from '../../types';
import { mockServices } from '../../data/mockData';
import { getPatients } from '../../api/patients';
import './AppointmentModal.css';
import { useAuth } from '../../contexts/AuthContext';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  selectedDate: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  appointment,
  selectedDate,
}) => {
  const [formData, setFormData] = useState({
    patientId: '',
    appointmentType: '',
    date: selectedDate,
    time: '',
    caseId: '',
    procedureId: '',
    doctorId: '1',
    notes: '',
    activities: ['Actividad por realizar 1'],
  });

  const handleCheckboxChange = (activity: string) => {
    const updated = formData.activities.includes(activity)
      ? formData.activities.filter(a => a !== activity)
      : [...formData.activities, activity];
    setFormData({ ...formData, activities: updated });
  };

  useEffect(() => {
    if (appointment) {
      setFormData({
        patientId: appointment.patientId,
        date: appointment.date,
        time: appointment.time,
        procedureId: appointment.serviceId,
        doctorId: appointment.doctorId,
        notes: appointment.notes || '',
        appointmentType: '',
        caseId: '',
        activities: [],
      });
    } else {
      setFormData({
        patientId: '',
        appointmentType: '',
        date: selectedDate,
        time: '',
        procedureId: '',
        doctorId: '1',
        notes: '',
        caseId: '',
        activities: [],
      });
    }
  }, [appointment, selectedDate]);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }
    return slots;
  };

  const { user } = useAuth();

  const [patients, setPatients] = useState([]);
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [cases, setCases] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [activities, setActivities] = useState([]);


  // Petición GET patients
  useEffect(() => {
    if (!user) return;
    
    const fetchInitialData = async () => {
      const [patientRes, typesRes] = await Promise.all([
        getPatients(user.token),
      ]);

      if (patientRes.status === 200) setPatients(patientRes.data.results);
    };

    fetchInitialData();
  }, [user]);



  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Cita" size="lg">
      <form onSubmit={(e) => { e.preventDefault(); console.log(formData); onClose(); }} className="modal-form">
        <div className="form-grid-two">
          {/* Paciente */}
          <div className="form-group">
            <label className="form-label">Paciente</label>
            <select
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value, caseId: '', procedureId: '', activities: [] })}
              className="form-select"
            >
              <option value="">Seleccionar paciente</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>{ patient.first_name } { patient.last_name }</option>
              ))}
            </select>
          </div>

          {/* Tipo de cita */}
          <div className="form-group">
            <label className="form-label">Tipo de cita</label>
            <div className="flex-between">
              <select
                value={formData.appointmentType}
                onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                className="form-select"
              >
                <option value="">Seleccionar tipo de cita</option>
                <option value="Control">Control</option>
                <option value="Evaluación">Evaluación</option>
              </select>
              <span className="form-link">+ Crear nuevo</span>
            </div>
          </div>

          {/* Fecha */}
          <div className="form-group">
            <label className="form-label">Seleccionar fecha</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(value) => setFormData({ ...formData, date: value })}
              icon={Calendar}
            />
          </div>

          {/* Hora */}
          <div className="form-group">
            <label className="form-label">Seleccionar horario</label>
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="form-select"
              required>
              <option value="">Seleccionar hora</option>
              {generateTimeSlots().map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          {/* Caso clínico */}
          <div className="form-group">
            <label className="form-label">Caso clínico</label>
            <div className="flex-between">
              <select
                value={formData.caseId}
                onChange={(e) => setFormData({ ...formData, caseId: e.target.value })}
                className="form-select"
              >
                <option value="">Seleccionar caso</option>
                <option value="1">Caso 1</option>
                <option value="2">Caso 2</option>
              </select>
              <span className="form-link">+ Crear nuevo</span>
            </div>
          </div>

          {/* Procedimiento */}
          <div className="form-group">
            <label className="form-label">Procedimiento</label>
            <div className="flex-between">
              <select
                value={formData.procedureId}
                onChange={(e) => setFormData({ ...formData, procedureId: e.target.value })}
                className="form-select"
              >
                <option value="">Seleccionar procedimiento</option>
                {mockServices.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
              <span className="form-link">+ Crear nuevo</span>
            </div>
          </div>
        </div>

        {/* Actividades */}
        <div className="form-group">
          <label className="form-label">Seleccionar actividades a realizar en esta consulta</label>
          <div className="checkbox-group">
            <label><input type="checkbox" checked={formData.activities.includes('Actividad por realizar 1')} onChange={() => handleCheckboxChange('Actividad por realizar 1')} /> Actividad por realizar 1</label>
            <label><input type="checkbox" checked={formData.activities.includes('Actividad por realizar 2')} onChange={() => handleCheckboxChange('Actividad por realizar 2')} /> Actividad por realizar 2</label>
          </div>
          <span className="form-link">+ Añadir actividad</span>
        </div>

        {/* Botón */}
        <div className="form-actions-right">
          <Button type="submit">Crear</Button>
        </div>
      </form>
    </Modal>
  );
};