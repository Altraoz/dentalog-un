import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Calendar, AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Patient } from '../../types';
import './PatientModal.css';

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  onClose,
  patient,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    birthDate: '',
    gender: 'male' as 'male' | 'female',
    phone: '',
    parentName: '',
    parentPhone: '',
    address: '',
    medicalHistory: '',
    allergies: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        lastName: patient.lastName,
        birthDate: patient.birthDate,
        gender: patient.gender,
        phone: patient.phone,
        parentName: patient.parentName,
        parentPhone: patient.parentPhone,
        address: patient.address,
        medicalHistory: patient.medicalHistory.join(', '),
        allergies: patient.allergies.join(', '),
      });
    } else {
      setFormData({
        name: '',
        lastName: '',
        birthDate: '',
        gender: 'male',
        phone: '',
        parentName: '',
        parentPhone: '',
        address: '',
        medicalHistory: '',
        allergies: '',
      });
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the patient data
    console.log('Saving patient:', formData);
    onClose();
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} años`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={patient ? `${patient.name} ${patient.lastName}` : 'Nuevo Paciente'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-grid">
          <Input
            label="Nombre"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            icon={User}
            required
          />
          <Input
            label="Apellido"
            value={formData.lastName}
            onChange={(value) => setFormData({ ...formData, lastName: value })}
            required
          />
        </div>

        <div className="form-grid form-grid-three">
          <Input
            label="Fecha de Nacimiento"
            type="date"
            value={formData.birthDate}
            onChange={(value) => setFormData({ ...formData, birthDate: value })}
            icon={Calendar}
            required
          />
          <div className="form-group">
            <label className="form-label">
              Género <span className="required">*</span>
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
              className="form-select"
            >
              <option value="male">Niño</option>
              <option value="female">Niña</option>
            </select>
          </div>
          {formData.birthDate && (
            <div className="form-group">
              <label className="form-label">Edad</label>
              <div className="age-display">
                {calculateAge(formData.birthDate)}
              </div>
            </div>
          )}
        </div>

        <div className="form-grid">
          <Input
            label="Teléfono del Paciente"
            type="tel"
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
            icon={Phone}
          />
          <Input
            label="Nombre del Tutor"
            value={formData.parentName}
            onChange={(value) => setFormData({ ...formData, parentName: value })}
            icon={User}
            required
          />
        </div>

        <div className="form-grid">
          <Input
            label="Teléfono del Tutor"
            type="tel"
            value={formData.parentPhone}
            onChange={(value) => setFormData({ ...formData, parentPhone: value })}
            icon={Phone}
            required
          />
          <Input
            label="Dirección"
            value={formData.address}
            onChange={(value) => setFormData({ ...formData, address: value })}
            icon={MapPin}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Historial Médico
          </label>
          <textarea
            value={formData.medicalHistory}
            onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
            rows={3}
            className="form-textarea"
            placeholder="Condiciones médicas relevantes, medicamentos, cirugías previas..."
          />
        </div>

        <div className="form-group">
          <label className="form-label form-label-alert">
            <AlertTriangle className="alert-icon" />
            Alergias
          </label>
          <textarea
            value={formData.allergies}
            onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
            rows={2}
            className="form-textarea"
            placeholder="Alergias conocidas (medicamentos, alimentos, materiales)..."
          />
        </div>

        <div className="form-actions">
          <Button type="submit" className="submit-button">
            {patient ? 'Actualizar Paciente' : 'Crear Paciente'}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};