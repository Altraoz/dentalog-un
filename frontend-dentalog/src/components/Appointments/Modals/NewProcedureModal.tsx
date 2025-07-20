import React, { useState, useEffect } from "react";
import { Modal } from "../../ui/Modal";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useAuth } from "../../../contexts/AuthContext";
import { createProcedure } from "../../../api/apointments";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";
import { Calendar } from "lucide-react";
import Switch from "@mui/material/Switch";
import ActivitiesList, { type Activity } from "../DraggableList";

interface NewProcedureModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCase: { id: number | undefined; initial_diagnosis: string };
  patientId?: number;
  NotificationTrigger: (message: string) => void;
  onProcedureCreated: (newProcedure: { id: number; name: string }) => void;
}

export const NewProcedureModal: React.FC<NewProcedureModalProps> = ({
  isOpen,
  onClose,
  selectedCase,
  // patientId,
  onProcedureCreated,
  NotificationTrigger,
}) => {
  const { user } = useAuth();
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [displayAlert, setDisplayAlert] = useState<number>(0);
  // const [cases, setCases] = useState<{ id: number; title: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    startDate: String(Date.now()) as string,
    clinical_case: selectedCase.id,
    description: "",
    activations: "",
    isFrequent: false,
    activities: [] as Activity[],
  });

  const [initialActivities, setInitialActivities] = useState<Activity[]>([]);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);

  const handleResponse = (response: {
    status: number;
    name?: string;
    id?: number;
  }) => {
    if (response.status === 201) {
      setWaitingResponse(false);
      NotificationTrigger("🟢 Caso clínico creado exitosamente");
      setAlertSeverity("success");
      setAlertMessage("Tipo de cita creado exitosamente");
      setDisplayAlert(1);
      onProcedureCreated?.({
        name: response.name ?? "",
        id: response.id ?? 0,
      });
      onClose();
    } else {
      setAlertSeverity("error");
      setAlertMessage("Error al crear el tipo de cita");
      setDisplayAlert(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWaitingResponse(true);
    const newProcedure = {
      name: formData.name,
      start_date: formData.startDate,
      clinical_case: formData.clinical_case,
      description: formData.description,
      activations: formData.activations,
      is_frecuent: formData.isFrequent,
      activities: initialActivities,
    };
    console.log("New case data:", newProcedure);
    console.log(initialActivities);
    const response = await createProcedure(e, user!.token, newProcedure);
    if (response) {
      handleResponse(response);
      onProcedureCreated({ name: newProcedure.name, id: response.data.id });
      onClose();
    }
  };

  useEffect(() => {
    if (selectedCase.id !== undefined) {
      setFormData((prev) => ({
        ...prev,
        clinical_case: selectedCase.id!,
      }));
    }
  }, [selectedCase.id]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Procedimiento">
      <form onSubmit={handleSubmit} className="modal-form">
        {/* Nombre */}
        <div className="form-group">
          <label className="form-label">Caso clinico</label>
          <Input
            type="text"
            value={selectedCase.initial_diagnosis}
            onChange={(value) => setFormData({ ...formData, name: value })}
            required
            disabled
          />
        </div>

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
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="form-textarea"
            rows={3}
            required
          />
        </div>

        <div className="form-grid-two">
          {/* Fecha */}
          <div className="form-group">
            <label className="form-label">Fecha de inicio</label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(value) =>
                setFormData({ ...formData, startDate: value })
              }
              icon={Calendar}
            />
          </div>
          <div
            className="form-group"
            style={{ flexDirection: "row-reverse", alignItems: "center" }}
          >
            <label className="form-label">Es procedimiento frecuente</label>
            <Switch
              checked={formData.isFrequent}
              onChange={(e) =>
                setFormData({ ...formData, isFrequent: e.target.checked })
              }
            />
          </div>
        </div>

        {/* Activaciones */}
        <div className="form-group">
          <label className="form-label">Activación</label>
          <textarea
            value={formData.activations}
            onChange={(e) =>
              setFormData({ ...formData, activations: e.target.value })
            }
            className="form-textarea"
            placeholder="Indicaciones que el paciente pueda necesitar"
            rows={2}
          />
        </div>

        {/* Actividades asociadas */}
        <div className="form-group">
          <p>
            Añade las actividades a realizar ne este procedimiento, marca las
            completadas
          </p>
          <ActivitiesList
            initialItems={initialActivities}
            setInitialActivities={setInitialActivities}
          />
        </div>

        <div className="form-actions-right">
          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <Alert
              variant="outlined"
              severity={alertSeverity}
              style={{ flex: 1, opacity: displayAlert }}
            >
              {alertMessage}
            </Alert>
            <Button type="submit" disabled={waitingResponse}>
              {waitingResponse ? (
                <CircularProgress sx={{ color: "#ffffffff" }} />
              ) : (
                <>Crear procedimiento</>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
