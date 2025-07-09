import React, { useEffect, useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { getProceduresByCase } from '../../../api/procedures';

interface NewActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProcedureId?: string;
  caseId?: string;
  onActivityCreated?: (activityName: string) => void;
}

export const NewActivityModal: React.FC<NewActivityModalProps> = ({
  isOpen,
  onClose,
  selectedProcedureId,
  caseId,
  onActivityCreated,
}) => {
  const { user } = useAuth();
  const [procedures, setProcedures] = useState([]);
  const [formData, setFormData] = useState({
    procedureId: selectedProcedureId || '',
    name: '',
  });

  useEffect(() => {
    if (!user || selectedProcedureId || !caseId) return;

    const fetchProcedures = async () => {
      const res = await getProceduresByCase(user.token, caseId);
      if (res?.status === 200) setProcedures(res.data.results);
    };

    fetchProcedures();
  }, [user, selectedProcedureId, caseId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onActivityCreated?.(formData.name);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Actividad">
      <form onSubmit={handleSubmit} className="modal-form">
        {/* Procedimiento */}
        {!selectedProcedureId && (
          <div className="form-group">
            <label className="form-label">Procedimiento</label>
            <select
              value={formData.procedureId}
              onChange={(e) => setFormData({ ...formData, procedureId: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Seleccionar procedimiento</option>
              {procedures.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Nombre de la actividad */}
        <div className="form-group">
          <label className="form-label">Nombre de la actividad</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Ej: Toma de impresión"
            required
          />
        </div>

        <div className="form-actions-right">
          <Button type="submit">Crear actividad</Button>
        </div>
      </form>
    </Modal>
  );
};
