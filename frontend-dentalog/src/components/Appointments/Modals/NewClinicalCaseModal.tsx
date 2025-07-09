import React, { useEffect, useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { getPatients } from '../../../api/patients';
import { useAuth } from '../../../contexts/AuthContext';

interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPatientId?: string;
  onCaseCreated?: (newCase: any) => void;
}

export const NewClinicalCaseModal: React.FC<NewCaseModalProps> = ({
  isOpen,
  onClose,
  selectedPatientId,
  onCaseCreated,
}) => {
  const { user } = useAuth();
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientId: selectedPatientId || '',
    diagnosis: '',
    summary: '',
    treatmentPlan: '',
  });

  useEffect(() => {
    if (!user || selectedPatientId) return;

    const fetchPatients = async () => {
      const res = await getPatients(user.token);
      if (res?.status === 200) setPatients(res.data.results);
    };

    fetchPatients();
  }, [user, selectedPatientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCase = { ...formData };

    // Aquí puedes incluir el POST si tienes un endpoint
    onCaseCreated?.(newCase);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Caso Clínico">
      <form onSubmit={handleSubmit} className="modal-form">
        {/* Paciente */}
        {!selectedPatientId && (
          <div className="form-group">
            <label className="form-label">Paciente</label>
            <select
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Seleccionar paciente</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.first_name} {p.last_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Diagnóstico inicial */}
        <div className="form-group">
          <label className="form-label">Diagnóstico inicial</label>
          <textarea
            value={formData.diagnosis}
            onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
            className="form-textarea"
            placeholder="Describe el diagnóstico inicial del paciente"
            rows={5}
            required
          />
        </div>

        {/* Resumen del caso */}
        <div className="form-group">
          <label className="form-label">Resumen del caso</label>
          <textarea
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            className="form-textarea"
            placeholder="Resumen clínico y observaciones"
            rows={5}
            required
          />
        </div>

        {/* Plan de tratamiento */}
        <div className="form-group">
          <label className="form-label">Plan de tratamiento</label>
          <Input
            type="text"
            value={formData.treatmentPlan}
            onChange={(value) => setFormData({ ...formData, treatmentPlan: value })}
            placeholder="Ej: Ortodoncia por 6 meses"
            required
          />
        </div>

        <div className="form-actions-right">
          <Button type="submit">Crear caso</Button>
        </div>
      </form>
    </Modal>
  );
};
