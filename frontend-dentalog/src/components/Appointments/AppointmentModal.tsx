import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { AppointmentPayload } from "../../types";
import { getPatients } from "../../api/patients";
import "./AppointmentModal.css";
import { useAuth } from "../../contexts/AuthContext";
import { NewAppointmentTypeModal } from "./Modals/NewAppointmentTypeModal";
import { NewClinicalCaseModal } from "./Modals/NewClinicalCaseModal";
import { NewProcedureModal } from "./Modals/NewProcedureModal";
import {
  getAppointmentsType,
  getPatientClinicalCases,
  getCaseProcedures,
  getProcedureActivities,
  createAppointment
} from "../../api/apointments";
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import ActivitiesList from "./ActivitiesListinAppointment";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentPayload | null;
  selectedDate: string;
}

export interface Activity {
  id: number;
  name: string;
  is_done: boolean;
  list_index: number;
  to_do: boolean;
}

interface FormData {
  patient: { id: number | undefined; first_name: string; last_name: string };
  appointmentType: { id: number | undefined; name: string };
  date: string;
  time: string;
  case: { id: number | undefined; initial_diagnosis: string };
  procedure: { id: number | undefined; name: string };
  activities: Activity[];
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  // appointment,
  selectedDate,
}) => {
  const [formData, setFormData] = useState<FormData>({
    patient: { id: undefined, first_name: "", last_name: "" },
    appointmentType: { id: undefined, name: "" },
    date: selectedDate,
    time: "",
    case: { id: undefined, initial_diagnosis: "" }, // ← aquí
    procedure: { id: undefined, name: "" },
    activities: [],
  });

  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

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

  const handlePatientSelection = async (patient_id: number) => {
    if (!user) return;
    const casesRes = await getPatientClinicalCases(user.token, patient_id);
    if (casesRes?.status === 200) setCases(casesRes.data);
    console.log("Cases for patient:", casesRes?.data);
  };

  const handleClinicalCaseSelection = async (case_id: number) => {
    if (!user) return;
    const proceduresRes = await getCaseProcedures(user.token, case_id);
    if (proceduresRes?.status === 200) setProcedures(proceduresRes.data);
    console.log("Procedures for case:", proceduresRes?.data);
  };

  const handleProcedureSelection = async (procedure_id: number) => {
    if (!user) return;
    const activitiesRes = await getProcedureActivities(
      user.token,
      procedure_id
    );

    if (activitiesRes?.status === 200) {
      const processedActivities = activitiesRes.data.activities.filter(
        (activity: Activity) => activity.is_done === false
      );
      setInitialActivities(processedActivities);
    }
  };
  const { user } = useAuth();

  // Opciones
  const [patients, setPatients] = useState<
    { id: number; first_name: string; last_name: string }[]
  >([]);
  const [appointmentTypes, setAppointmentTypes] = useState<
    { id: number; name: string }[]
  >([]);
  const [cases, setCases] = useState<
    { id: number; initial_diagnosis: string }[]
  >([]);
  const [procedures, setProcedures] = useState<{ id: number; name: string }[]>(
    []
  );
  const [activities, setActivities] = useState<{ id: number; name: string }[]>(
    []
  );
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);

  const [initialActivities, setInitialActivities] = useState<Activity[]>([]);

  // Modales
  const [isAppointmentTypeModalOpen, setIsAppointmentTypeModalOpen] =
    useState(false);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [isProcedureModalOpen, setIsProcedureModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // Petición GET patients
  useEffect(() => {
    if (!user) return;
    const fetchInitialData = async () => {
      const typesRes = await getAppointmentsType(user.token);
      const patientsRes = await getPatients(user.token);
      if (typesRes?.status === 200) setAppointmentTypes(typesRes.data);
      if (patientsRes?.status === 200) setPatients(patientsRes.data.results);
    };

    fetchInitialData();
  }, [user]);

  const [open, setOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const NotificationTrigger = (message: string) => {
    setNotificationMessage(message);
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedActivities = initialActivities
    .filter((activity) => activity.to_do)
    .map((activity) => ({ activity: activity.id }));

    const appointmentPayload = {
    patient: formData.patient.id, 
    attention_date: formData.date, 
    type: formData.appointmentType.id, 
    time: formData.time,
    clinical_case: formData.case.id,
    procedure: formData.procedure.id,
    status: "programada",
    activities: selectedActivities,
  };

  try {
    const response = await createAppointment(user!.token, appointmentPayload);

    if (response?.status === 201) {
      console.log(response);
    }
  } catch (err) {
    console.error('Error al crear cita:', err);
  }
};


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Cita" size="lg">
      <form
        onSubmit={handleSubmit}
        className="modal-form"
      >
        <div className="form-grid-two">
          {/* Paciente */}
          <div className="form-group">
            <label className="form-label">Paciente</label>
            <select
              value={formData.patient.id}
              onChange={(e) => {
                const selectedPatient = patients.find(
                  (patient) => patient.id === Number(e.target.value)
                );
                setFormData({
                  ...formData,
                  patient: selectedPatient
                    ? {
                        id: selectedPatient.id,
                        first_name: selectedPatient.first_name,
                        last_name: selectedPatient.last_name,
                      }
                    : { id: undefined, first_name: "", last_name: "" },
                });
                if (selectedPatient) {
                  handlePatientSelection(selectedPatient.id);
                }
              }}
              className="form-select"
            >
              <option value="">Seleccionar paciente</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.first_name} {patient.last_name}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo de cita */}
          <div className="form-group">
            <label className="form-label">Tipo de cita</label>
            <div className="flex-between">
              <select
                value={formData.appointmentType.id}
                onChange={(e) => {
                  const selectedType = appointmentTypes.find(
                    (type) => type.id === Number(e.target.value)
                  );
                  setFormData({
                    ...formData,
                    appointmentType: selectedType
                      ? { id: selectedType.id, name: selectedType.name }
                      : { id: undefined, name: "" },
                  });
                }}
                className="form-select"
              >
                <option value="">Seleccionar tipo de cita</option>
                {/* <option value="Control">Control</option>
                <option value="Evaluación">Evaluación</option> */}
                {appointmentTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <span
                className="form-link"
                onClick={() => {
                  setIsAppointmentTypeModalOpen(true);
                }}
              >
                + Crear nuevo
              </span>
            </div>
          </div>

          {/* Fecha */}
          <div className="form-group">
            <label className="form-label">Seleccionar fecha</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(value) => setFormData({ ...formData, date: value })}
              icon={Calendar}
            />
          </div>

          {/* Hora */}
          <div className="form-group">
            <label className="form-label">Seleccionar horario</label>
            <select
              value={formData.time}
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

          {/* Caso clínico */}
          <div className="form-group">
            <label className="form-label">Caso clínico</label>
            <div className="flex-between">
              <select
                value={formData.case.id}
                onChange={(e) => {
                  const selectedCase = cases.find(
                    (clinicalCase) => clinicalCase.id === Number(e.target.value)
                  );
                  setFormData({
                    ...formData,
                    case: selectedCase
                      ? {
                          id: selectedCase.id,
                          initial_diagnosis: selectedCase.initial_diagnosis,
                        }
                      : { id: undefined, initial_diagnosis: "" },
                  });
                  if (selectedCase) {
                    handleClinicalCaseSelection(selectedCase.id);
                  }
                }}
                className="form-select"
              >
                <option value="">Seleccionar caso clínico</option>
                {cases.map((clinicalCase) => (
                  <option key={clinicalCase.id} value={clinicalCase.id}>
                    {clinicalCase.initial_diagnosis}
                  </option>
                ))}
              </select>
              {/* <select
                value={formData.case}
                onChange={(e) =>
                  setFormData({ ...formData, caseId: e.target.value })
                }
                className="form-select"
              >
                <option value="">Seleccionar caso</option>
                <option value="1">Caso 1</option>
                <option value="2">Caso 2</option>
              </select> */}
              <span
                className="form-link"
                onClick={() => setIsCaseModalOpen(true)}
              >
                + Crear nuevo
              </span>
            </div>
          </div>

          {/* Procedimiento */}
          <div className="form-group">
            <label className="form-label">Procedimiento</label>
            <div className="flex-between">
              <select
                value={formData.procedure.id}
                onChange={(e) => {
                  const procedureSelected = procedures.find(
                    (procedure) => procedure.id === Number(e.target.value)
                  );
                  setFormData({
                    ...formData,
                    procedure: procedureSelected
                      ? {
                          id: procedureSelected.id,
                          name: procedureSelected.name,
                        }
                      : { id: undefined, name: "" },
                  });
                  if (procedureSelected) {
                    handleProcedureSelection(procedureSelected.id);
                  }
                }}
                className="form-select"
              >
                <option value="">Seleccionar procedimiento</option>
                {procedures.map((procedure) => (
                  <option key={procedure.id} value={procedure.id}>
                    {procedure.name}
                  </option>
                ))}
              </select>
              <span
                className="form-link"
                onClick={() => setIsProcedureModalOpen(true)}
              >
                + Crear nuevo
              </span>
            </div>
          </div>
        </div>

        {/* Actividades */}
        <div className="form-group">
          <label className="form-label">
            Seleccione las actividades que se realizarán en la cita
          </label>

          <ActivitiesList
            initialItems={initialActivities}
            setInitialActivities={setInitialActivities}
            isCreatingAppointment={isCreatingAppointment}
            formData={formData}
          />
        </div>

        {/* Botón */}
        <div className="form-actions-right">
          <Button type="submit">Crear</Button>
        </div>
      </form>
      {isAppointmentTypeModalOpen && (
        <NewAppointmentTypeModal
          isOpen={isAppointmentTypeModalOpen}
          onClose={() => setIsAppointmentTypeModalOpen(false)}
          onTypeCreated={(newType) => {
            // Actualizar lista cuando usemos datos del back
            setAppointmentTypes((prev) => [...prev, newType]);
            setFormData({
              ...formData,
              appointmentType: { id: newType.id, name: newType.name },
            });
          }}
          NotificationTrigger={NotificationTrigger}
        />
      )}

      {isCaseModalOpen && (
        <NewClinicalCaseModal
          isOpen={isCaseModalOpen}
          onClose={() => setIsCaseModalOpen(false)}
          selectedPatientId={formData.patient.id}
          NotificationTrigger={NotificationTrigger}
          onCaseCreated={(newCase) => {
            setCases((prev) => [...prev, newCase]);
            setFormData({
              ...formData,
              case: {
                id: newCase.id,
                initial_diagnosis: newCase.initial_diagnosis,
              },
            });
          }}
        />
      )}
      <NewProcedureModal
        isOpen={isProcedureModalOpen}
        onClose={() => setIsProcedureModalOpen(false)}
        NotificationTrigger={NotificationTrigger}
        selectedCase={formData.case}
        patientId={formData.patient.id}
        onProcedureCreated={(newProcedure) => {
          setProcedures((prev) => [...prev, newProcedure]);
          setFormData({
            ...formData,
            procedure: { id: newProcedure.id, name: newProcedure.name },
          });
        }}
      />
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          icon={false}
          sx={{
            backgroundColor: "#ffffff",
            color: "#000000",
            borderRadius: "8px",
          }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Modal>
  );
};