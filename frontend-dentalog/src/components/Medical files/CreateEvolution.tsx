import {
  FormControl,
  TextField,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { DraggItem } from "./DraggItem";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { createMedicalFile } from "../../api/medical_files";
import "./CreateEvolution.scss";
// import { CreateEvolutionTypeModal } from "./Create/CreateEvolutionTypeModal";
interface NewEvolutionProps {
  patient: {
    id: number;
    name: string;
    gender: string;
    age: string;
    avatarUrl: string;
  };
  onBack: () => void;
  //   isOpen: boolean;
  //   onClose: () => void;
  //   selectedCase: { id: number | undefined; initial_diagnosis: string };
  //   patientId?: number;
  //   NotificationTrigger: (message: string) => void;
  //   onProcedureCreated: (newProcedure: { id: number; name: string }) => void;
}
interface FormData {
  name: string;
  details: string;
  patient: string;
  image_url: string;
}
export const CreateEvolution: React.FC<NewEvolutionProps> = ({
  patient,
  onBack,
}) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    details: "",
    patient: "",
    image_url: "",
  });

  // const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
  //   "success"
  // );
  // const [alertMessage, setAlertMessage] = useState<string>("");
  // const [displayAlert, setDisplayAlert] = useState<number>(0);
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);

  if (!user) {
    console.error("Usuario no autenticado");
    return;
  }

  const handleResponse = (response: {
    status: number;
    data: { name: string; id: number };
  }) => {
    if (response.status === 201) {
      setWaitingResponse(false);
      onBack();
      // NotificationTrigger("🟢 Cita creada exitosamente");
      // onTypeCreated?.({
      //   name: response.data.name ?? "",
      //   id: response.data.id ?? 0,
      // });
      // onClose();
    } else {
      // setAlertSeverity("error");
      // setAlertMessage("Error al crear el tipo de cita");
      // setDisplayAlert(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      patient: String(patient.id),
    });
    setWaitingResponse(true);
    const newType: FormData = {
      ...formData,
      patient: String(patient.id), // ✅ agrega el patient directamente aquí
    };
    console.log(newType);
    const response = await createMedicalFile(e, user.token, newType);
    if (response) {
      handleResponse(response);
    }
  };

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
                  src={patient.avatarUrl}
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
          <div className="form-grid">
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Nombre de la imagen"
                variant="outlined"
                value={formData.name}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    name: event.target.value,
                  })
                }
                required
              />
            </FormControl>
          </div>
          <div className="form-group">
            <FormControl fullWidth>
              <TextField
                label="Descripcion de la imagen"
                multiline
                rows={4}
                value={formData.details}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    details: e.target.value,
                  })
                }
              />
            </FormControl>
          </div>
          <div className="form-grid-two">
            <Button type="submit" variant="outlined" disabled={waitingResponse}>
              {waitingResponse ? (
                <CircularProgress sx={{ color: "#1976D2" }} />
              ) : (
                <>Crear archivo médico</>
              )}
            </Button>
          </div>
        </div>
        <div className="side-b">
          <DraggItem
            patient={patient}
            setImagesInfo={(newImage) => {
              const imageId = newImage;
              setFormData((prev) => ({
                ...prev,
                image_url: imageId, // agrega el nuevo ID al array existente
              }));
            }}
          />
        </div>
      </div>
    </form>
  );
};
