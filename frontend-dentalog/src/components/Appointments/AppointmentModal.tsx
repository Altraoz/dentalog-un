import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Appointment } from '../../types';
import { mockPatients, mockServices } from '../../data/mockData';
import './AppointmentModal.css';

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
    date: selectedDate,
    time: '',
    serviceId: '',
    doctorId: '1',
    notes: '',
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        patientId: appointment.patientId,
        date: appointment.date,
        time: appointment.time,
        serviceId: appointment.serviceId,
        doctorId: appointment.doctorId,
        notes: appointment.notes || '',
      });
    } else {
      setFormData({
        patientId: '',
        date: selectedDate,
        time: '',
        serviceId: '',
        doctorId: '1',
        notes: '',
      });
    }
  }, [appointment, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving appointment:', formData);
    onClose();
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const selectedService = mockServices.find(s => s.id === formData.serviceId);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={appointment ? 'Editar Cita' : 'Nueva Cita'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">
              Paciente <span className="required">*</span>
            </label>
            <select
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Seleccionar paciente</option>
              {mockPatients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} {patient.lastName} - {patient.age} años
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              Servicio <span className="required">*</span>
            </label>
            <select
              value={formData.serviceId}
              onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Seleccionar servicio</option>
              {mockServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - {service.duration} min - S/{service.price}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-grid">
          <Input
            label="Fecha"
            type="date"
            value={formData.date}
            onChange={(value) => setFormData({ ...formData, date: value })}
            icon={Calendar}
            required
          />

          <div className="form-group">
            <label className="form-label">
              Hora <span className="required">*</span>
            </label>
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Seleccionar hora</option>
              {generateTimeSlots().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedService && (
          <div className="service-details">
            <h4 className="service-details-title">Detalles del Servicio</h4>
            <div className="service-details-grid">
              <div>
                <span className="service-details-label">Duración:</span>
                <p className="service-details-value">{selectedService.duration} minutos</p>
              </div>
              <div>
                <span className="service-details-label">Precio:</span>
                <p className="service-details-value">S/{selectedService.price}</p>
              </div>
              <div>
                <span className="service-details-label">Rango de Edad:</span>
                <p className="service-details-value">{selectedService.ageRange}</p>
              </div>
            </div>
            <div className="service-description">
              <span className="service-details-label">Descripción:</span>
              <p className="service-details-value">{selectedService.description}</p>
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="form-label">
            Notas Adicionales
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            className="form-textarea"
            placeholder="Información adicional sobre la cita..."
          />
        </div>

        <div className="form-actions">
          <Button type="submit" className="submit-button">
            {appointment ? 'Actualizar Cita' : 'Programar Cita'}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};