import React, { useState, useEffect } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { getAppointmentsType, updateAppointment } from "../../api/apointments"; // Función para actualizar la cita
import { getActivities } from "../../api/apointments";
import type { Activity } from "./DraggableList";
import ActivitiesList from "./ActivitiesListinAppointment";
import { useAuth } from "../../contexts/AuthContext";

interface AppointmentEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: any;
}

export const AppointmentEditModal: React.FC<AppointmentEditModalProps> = ({
    isOpen,
    onClose,
    appointment
}) => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        patientName: "",
        typeName: "",
        date: "",
        time: "",
        status: "programada",
        procedure: { id: undefined},
        activities: [] as Activity[],
    });

  const [appointmentTypes, setAppointmentTypes] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isStatusChanged, setIsStatusChanged] = useState(false);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        slots.push(
          `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`
        );
      }
    }
    return slots;
  };

  useEffect(() => {
    if (appointment) {
      setFormData({
        patientName: appointment.patientName,
        typeName: appointment.typeName,
        date: appointment.attention_date.split("T")[0],
        time: appointment.time,
        status: appointment.status,
        activities: [], // Cambiar por las actividades
        procedure: {id: appointment.procedure}
      });
    }
    

    const fetchData = async () => {
      try {
        const appointmentTypeResponse = await getAppointmentsType(user!.token);
        setAppointmentTypes(appointmentTypeResponse?.data || []);
        
        const activitiesResponse = await getActivities(user!.token);
        setActivities(activitiesResponse?.data || []);
      } catch (err) {
        console.error("Error fetching data for edit modal:", err);
      }
    };

    fetchData();

  }, [appointment, user]);

  useEffect(() => {
    if (appointment) {
      const originalDate = appointment.attention_date.split("T")[0];
      const originalTime = appointment.time;
      if (formData.date !== originalDate || formData.time !== originalTime) {
        setIsStatusChanged(true);
      } else setIsStatusChanged(false);
    }
  }, [formData.date, formData.time, appointment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleActivitiesChange = (selectedActivities: Activity[]) => {
    setFormData({
      ...formData,
      activities: selectedActivities,
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSaving(true);

        const updatedStatus = isStatusChanged ? "reprogramada" : formData.status;
        
        const updatedAppointment = {
            patient: appointment.patient,
            attention_date: formData.date,
            time: formData.time,
            status: updatedStatus,
            clinical_case: appointment.clinical_case,
            procedure: appointment.procedure,
            activities: formData.activities.map((activity) => ({ activity: activity.id }))
        };
        console.log(updatedAppointment)

        try {
            const response = await updateAppointment(user!.token, appointment.id, updatedAppointment);

            if (response) {
            setIsSaving(false);
            onClose();
            } else {
            console.error("Error al actualizar la cita");
            setIsSaving(false);
            }
        } catch (err) {
            console.error("Error al actualizar la cita:", err);
            setIsSaving(false);
        }
    };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Cita" size="lg">
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-grid-two">
            {/* Paciente (no se puede modificar) */}
            <div><span className="patient-name">{formData.patientName}</span></div>
        </div>
        <div className="form-grid-two">
          {/* Tipo de cita */}
          <div className="form-group">
            <label className="form-label">Tipo de cita</label>
            <select
              name="typeName"
              value={formData.typeName}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Seleccionar tipo de cita</option>
              {appointmentTypes.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div className="form-group">
            <label className="form-label">Seleccionar fecha</label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Hora */}
          <div className="form-group">
            <label className="form-label">Seleccionar horario</label>
            <select
              value={formData.time.slice(0, 5)}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
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

          {/* Estado */}
          <div className="form-group">
            <label className="form-label">Estado</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="programada">Programada</option>
              <option value="atendida">Atendida</option>
              <option value="cancelada">Cancelada</option>
              <option value="no asistió">No asistió</option>
              <option value="reprogramada">Reprogramada</option>
            </select>
          </div>
        </div>

        {/* Actividades */}
        <div className="form-group">
          <label className="form-label">Actividades</label>
          <ActivitiesList
            initialItems={formData.activities}
            setInitialActivities={handleActivitiesChange}
            isCreatingAppointment={true}
            formData={formData}
          />
        </div>

        {/* Botones de acción */}
        <div className="form-actions-right">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
