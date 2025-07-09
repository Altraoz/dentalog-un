import React, { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

interface NewAppointmentTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTypeCreated?: (newType: { name: string; description: string }) => void;
}

export const NewAppointmentTypeModal: React.FC<NewAppointmentTypeModalProps> = ({
  isOpen,
  onClose,
  onTypeCreated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newType = { ...formData };
    // Aquí va la petición POST
    onTypeCreated?.(newType);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Tipo de Cita">
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <Input
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Ej: Evaluación"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-textarea"
            placeholder="Breve descripción del tipo de cita"
            rows={3}
          />
        </div>

        <div className="form-actions-right">
          <Button type="submit">Crear tipo</Button>
        </div>
      </form>
    </Modal>
  );
};
