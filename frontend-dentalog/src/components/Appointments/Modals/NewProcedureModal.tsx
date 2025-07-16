import React, { useState, useEffect } from "react";
import { Modal } from "../../ui/Modal";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
// import { getCasesByPatient } from "../../../api/cases";
import { useAuth } from "../../../contexts/AuthContext";
import { NewActivityModal } from "./NewActivityModal";
import { createProcedure } from "../../../api/apointments";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";

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
    startDate: Date.now(),
    clinical_case: selectedCase.id,
    description: "",
    activations: "",
    isFrequent: false,
    activities: [] as string[],
  });

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // Traer casos clínicos si no hay uno seleccionado
  // useEffect(() => {
  //   if (!user || selectedCase || !patientId) return;

  //   const fetchCases = async () => {
  //     const res = await getCasesByPatient(user.token, String(patientId));
  //     if (res?.status === 200) setCases(res.data.results);
  //   };

  //   fetchCases();
  // }, [user, selectedCase, patientId]);

  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
  const handleAddActivity = (activityName: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: [...prev.activities, activityName],
    }));
  };

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
      activities: formData.activities,
    };
    console.log("New case data:", newProcedure);
    const response = await createProcedure(e, user!.token, newProcedure);
    if (response) {
      handleResponse(response);
      onProcedureCreated({ name: newProcedure.name, id: response.data.id });
      onClose();
    }
    // Aquí puedes incluir el POST si tienes un endpoint
    // onCaseCreated?.(newCase);
    // onClose();
  };

  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Procedimiento">
      <form onSubmit={handleSubmit} className="modal-form">
        {/* Caso clínico */}
        {/* {!selectedCase && (
          <div className="form-group">
            <label className="form-label">Caso clínico</label>
            <select
              disabled
              value={formData.clinical_case}
              onChange={(e) =>
                setFormData({ ...formData, clinical_case: e.target.value })
              }
              className="form-select"
              required
            >
              <option value="">Seleccionar caso</option>
              <option value={selectedCase.id}>
                {selectedCase.initial_diagnosis}
              </option>
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        )} */}
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
          <label className="form-label">Actividades asociadas</label>
          <ul className="form-list">
            {formData.activities.map((a, idx) => (
              <li key={idx}>• {a}</li>
            ))}
          </ul>
          <span
            className="form-link"
            onClick={() => setIsActivityModalOpen(true)}
          >
            + Añadir actividad
          </span>
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
