import React, { useEffect, useState } from "react";
import { Modal } from "../../ui/Modal";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { getPatients } from "../../../api/patients";
import { useAuth } from "../../../contexts/AuthContext";
import { createClinicalCase } from "../../../api/apointments";
import Alert from "@mui/material/Alert";
import { CircularProgress } from "@mui/material";

interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPatientId?: number;
  onCaseCreated: (newCase: { id: number; initial_diagnosis: string }) => void;
  NotificationTrigger: (message: string) => void;
}

export const NewClinicalCaseModal: React.FC<NewCaseModalProps> = ({
  isOpen,
  onClose,
  selectedPatientId,
  onCaseCreated,
  NotificationTrigger,
}) => {
  const { user } = useAuth();

  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success"
  );
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [displayAlert, setDisplayAlert] = useState<number>(0);

  interface Patient {
    id: string | number;
    first_name: string;
    last_name: string;
    // Add other fields if needed
  }

  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState({
    patientId: selectedPatientId || "",
    diagnosis: "",
    summary: "",
    treatmentPlan: "",
  });

  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);

  useEffect(() => {
    if (!user || selectedPatientId) return;

    const fetchPatients = async () => {
      const res = await getPatients(user.token);
      if (res?.status === 200) setPatients(res.data.results);
    };

    fetchPatients();
  }, [user, selectedPatientId]);

  const handleResponse = (response: {
    status: number;
    data: { initial_diagnosis: string; id: number };
  }) => {
    if (response.status === 201) {
      setWaitingResponse(false);
      NotificationTrigger("🟢 Caso clínico creado exitosamente");
      setAlertSeverity("success");
      setAlertMessage("Tipo de cita creado exitosamente");
      setDisplayAlert(1);
      onCaseCreated?.({
        initial_diagnosis: response.data.initial_diagnosis ?? "",
        id: response.data.id ?? 0,
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
    const newCase = {
      patient: 3,
      summary: formData.summary,
      initial_diagnosis: formData.diagnosis,
      treatment_plan: formData.treatmentPlan,
    };
    console.log("New case data:", newCase);
    const response = await createClinicalCase(e, user!.token, newCase);
    if (response) {
      handleResponse(response);
    }
    // Aquí puedes incluir el POST si tienes un endpoint
    // onCaseCreated?.(newCase);
    // onClose();
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
              onChange={(e) =>
                setFormData({ ...formData, patientId: e.target.value })
              }
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
            onChange={(e) =>
              setFormData({ ...formData, diagnosis: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
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
            onChange={(value) =>
              setFormData({ ...formData, treatmentPlan: value })
            }
            placeholder="Ej: Ortodoncia por 6 meses"
            required
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
                <>Crear caso clínico</>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
