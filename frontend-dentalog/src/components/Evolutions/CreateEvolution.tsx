import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  IconButton,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import handleSubmit from "../../data/api";
import { DraggItem } from "./DraggItem";
import { useEffect, useState } from "react";
import { getAppointmentsByPatient } from "../../api/apointments";
import { useAuth } from "../../contexts/AuthContext";
import { getEvolutionTypes } from "../../api/evolutions";

interface NewEvolutionProps {
  handleBack: () => void;
  patient: { id: number; name: string; age: number; gender: string };
  onBack: () => void;
  //   isOpen: boolean;
  //   onClose: () => void;
  //   selectedCase: { id: number | undefined; initial_diagnosis: string };
  //   patientId?: number;
  //   NotificationTrigger: (message: string) => void;
  //   onProcedureCreated: (newProcedure: { id: number; name: string }) => void;
}

export const NewProcedureModal: React.FC<NewEvolutionProps> = ({
  patient,
  onBack,
}) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    appoinment: "",
    clinical_case: "",
    type: "",
    percente_advance: "",
    title: "",
    description: "",
  });
  // Opciones
  const [appointments, setAppointments] = useState<
    { id: number; attention_date: string; time: string }[]
  >([]);

  // {appointment.attention_date} {appointment.time}

  const [evolutionTypes, setEvolutionTypes] = useState<
    { id: number; name: string; description: string }[]
  >([]);

  // Petición GET patients
  useEffect(() => {
    if (!user) return;
    const fetchInitialData = async () => {
      const typesRes = await getEvolutionTypes(user.token);
      const appointmentsRes = await getAppointmentsByPatient(
        user.token,
        patient.id
      );
      if (typesRes?.status === 200) setEvolutionTypes(typesRes.data);
      if (appointmentsRes?.status === 200)
        setAppointments(appointmentsRes.data.results);
    };

    fetchInitialData();
  }, [user]);

  return (
    <form onSubmit={handleSubmit} className="modal-form">
      <div className="form-grid-two">
        <div className="form-grid side-a">
          <div className="patient-row">
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={() => onBack()}
            >
              <ArrowLeft />
            </IconButton>
            <div className="patient-info flex">
              <div className="patient-avatar">
                <img
                  src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-cabello-largo_23-2149436197.jpg"
                  alt="sdfasdf"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className="patient-details">
                <span className="patient-name">{patient.name}</span>
                <p className="patient-age">
                  {patient.age} - {patient.gender}
                </p>
              </div>
            </div>
          </div>
          <div className="form-grid-two">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Cita</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.appoinment}
                label="Cita"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    appoinment: e.target.value as "Masculino" | "Femenino",
                  })
                }
              >
                {appointments.map((appointment) => (
                  <MenuItem key={appointment.id} value={appointment.id}>
                    {appointment.attention_date} {appointment.time}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo de evolución
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.type}
                label="Tipo de evolución"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as "Masculino" | "Femenino",
                  })
                }
              >
                {evolutionTypes.map((evolutionType) => (
                  <MenuItem key={evolutionType.id} value={evolutionType.id}>
                    {evolutionType.name}
                  </MenuItem>
                ))}
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="form-grid-two">
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Nombre de la evolución"
                variant="outlined"
                value={formData.title}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    title: event.target.value,
                  })
                }
                required
              />
            </FormControl>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Avance (%)"
                variant="outlined"
                value={formData.percente_advance}
                type="number"
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    percente_advance: event.target.value,
                  })
                }
                required
              />
            </FormControl>
          </div>
          <div className="form-group">
            <FormControl fullWidth>
              <TextField
                label="Observaciones"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />
            </FormControl>
          </div>
        </div>
        <div className="side-b">
          <DraggItem
            patient={patient}
            setImagesInfo={(newImages) => {
              // Actualiza el listado de imágenes en formData
              setFormData((prev) => ({
                ...prev,
                images: newImages.map((img) => ({ id: img.id, url: img.url })),
              }));
            }}
          />
        </div>
      </div>
    </form>
  );
};
