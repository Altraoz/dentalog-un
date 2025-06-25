import React, { useState } from 'react';
import { Search, Plus, User, Phone, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { mockPatients } from '../../data/mockData';
import { PatientModal } from './PatientModal';
import { Patient } from '../../types';
import './PatientList.css';

export const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = mockPatients.filter(patient =>
    `${patient.name} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleNewPatient = () => {
    setSelectedPatient(null);
    setIsModalOpen(true);
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="patient-list">
      <div className="patient-list-header">
        <div>
          <h2 className="patient-list-title">Gestión de Pacientes</h2>
          <p className="patient-list-subtitle">Administra la información de tus pacientes pediátricos</p>
        </div>
        <Button onClick={handleNewPatient} icon={Plus}>
          Nuevo Paciente
        </Button>
      </div>

      <Card>
        <div className="patient-search">
          <Input
            placeholder="Buscar pacientes por nombre o tutor..."
            value={searchTerm}
            onChange={setSearchTerm}
            icon={Search}
          />
        </div>

        <div className="patient-grid">
          {filteredPatients.map((patient) => (
            <div
              key={patient.id}
              onClick={() => handlePatientClick(patient)}
              className="patient-card"
            >
              <div className="patient-card-content">
                <div className="patient-avatar">
                  {patient.name.charAt(0)}{patient.lastName.charAt(0)}
                </div>
                
                <div className="patient-details">
                  <h3 className="patient-name">
                    {patient.name} {patient.lastName}
                  </h3>
                  <p className="patient-info">
                    {calculateAge(patient.birthDate)} años • {patient.gender === 'male' ? 'Niño' : 'Niña'}
                  </p>
                  
                  <div className="patient-meta">
                    <div className="meta-item">
                      <User className="meta-icon" />
                      <span>{patient.parentName}</span>
                    </div>
                    <div className="meta-item">
                      <Phone className="meta-icon" />
                      <span>{patient.parentPhone}</span>
                    </div>
                    <div className="meta-item">
                      <Calendar className="meta-icon" />
                      <span>Registrado: {new Date(patient.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {patient.allergies.length > 0 && patient.allergies[0] !== 'Ninguna conocida' && (
                <div className="patient-allergies">
                  <span className="allergy-tag">
                    ⚠️ Alergias
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="no-patients">
            <User className="no-patients-icon" />
            <p className="no-patients-text">No se encontraron pacientes</p>
            <p className="no-patients-subtext">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Agrega tu primer paciente'}
            </p>
          </div>
        )}
      </Card>

      <PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patient={selectedPatient}
      />
    </div>
  );
};