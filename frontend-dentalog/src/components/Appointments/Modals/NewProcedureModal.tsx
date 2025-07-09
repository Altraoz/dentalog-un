import React, { useEffect, useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { getCasesByPatient } from '../../../api/cases';
import { useAuth } from '../../../contexts/AuthContext';
import { NewActivityModal } from './NewActivityModal';

interface NewProcedureModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCaseId?: string;
  patientId?: string;
  onProcedureCreated?: (newProcedure: any) => void;
}

export const NewProcedureModal: React.FC<NewProcedureModalProps> = ({
  isOpen,
  onClose,
  selectedCaseId,
  patientId,
  onProcedureCreated,
}) => {
  const { user } = useAuth();
  const [cases, setCases] = useState([]);
  const [formData, setFormData] = useState({
    caseId: selectedCaseId || '',
    name: '',
    description: '',
    activations: '',
    activities: [] as string[],
  });

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // Traer casos clínicos si no hay uno seleccionado
  useEffect(() => {
    if (!user || selectedCaseId || !patientId) return;

    const fetchCases = async () => {
      const res = await getCasesByPatient(user.token, patientId);
      if (res?.status === 200) setCases(res.data.results);
    };

    fetchCases();
  }, [user, selectedCaseId, patientId]);

  const handleAddActivity = (activityName: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: [...prev.activities, activityName],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProcedure = { ...formData };
    // Aquí va el POST si tienes endpoint
    onProcedureCreated?.(newProcedure);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Procedimiento">
      <form onSubmit={handleSubmit} className="modal-form">
        {/* Caso clínico */}
        {!selectedCaseId && (
          <div className="form-group">
            <label className="form-label">Caso clínico</label>
            <select
              value={formData.caseId}
              onChange={(e) => setFormData({ ...formData, caseId: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Seleccionar caso</option>
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Nombre */}
        <div className="form-group">
          <label className="form-label">Nombre del procedimiento</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            required
          />
        </div>

        {/* Descripción */}
        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-textarea"
            rows={3}
            required
          />
        </div>

        {/* Activaciones */}
        <div className="form-group">
          <label className="form-label">Activación</label>
          <textarea
            value={formData.activations}
            onChange={(e) => setFormData({ ...formData, activations: e.target.value })}
            className="form-textarea"
            placeholder='Indicaciones que el paciente pueda necesitar'
            rows={2}
          />
        </div>

        {/* Actividades asociadas */}
        <div className="form-group">
          <label className="form-label">Actividades asociadas</label>
          <ul className="form-list">
            {formData.activities.map((a, idx) => (
              <li key={idx}>• {a}</li>
            ))}
          </ul>
          <span className="form-link" onClick={() => setIsActivityModalOpen(true)}>
            + Añadir actividad
          </span>
        </div>

        <div className="form-actions-right">
          <Button type="submit">Crear procedimiento</Button>
        </div>
      </form>

      {/* Modal para crear nueva actividad */}
      <NewActivityModal
        isOpen={isActivityModalOpen}
        onClose={() => setIsActivityModalOpen(false)}
        onActivityCreated={(activityName) => {
          handleAddActivity(activityName);
        }}
      />
    </Modal>
  );
};
