// import React, { useState } from "react";
// import { Modal } from "../../ui/Modal";
// import { Input } from "../../ui/Input";
// import { Button } from "../../ui/Button";
// import { createAppointmentType } from "../../../api/apointments";
// import { useAuth } from "../../../contexts/AuthContext";
// import Alert from "@mui/material/Alert";
// import { CircularProgress } from "@mui/material";

// interface NewAppointmentTypeModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   NotificationTrigger: (message: string) => void;
// }

// export const CreateEvolutionTypeModal: React.FC<
//   NewAppointmentTypeModalProps
// > = ({ isOpen, onClose, onTypeCreated, NotificationTrigger }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });
//   const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
//     "success"
//   );
//   const [alertMessage, setAlertMessage] = useState<string>("");
//   const [displayAlert, setDisplayAlert] = useState<number>(0);
//   const [waitingResponse, setWaitingResponse] = useState<boolean>(false);

//   const { user } = useAuth();
//   if (!user) {
//     console.error("Usuario no autenticado");
//     return;
//   }

//   const handleResponse = (response: {
//     status: number;
//     data: { name: string; id: number };
//   }) => {
//     if (response.status === 201) {
//       setWaitingResponse(false);
//       NotificationTrigger("🟢 Cita creada exitosamente");
//       onTypeCreated?.({
//         name: response.data.name ?? "",
//         id: response.data.id ?? 0,
//       });
//       onClose();
//     } else {
//       setAlertSeverity("error");
//       setAlertMessage("Error al crear el tipo de cita");
//       setDisplayAlert(1);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setWaitingResponse(true);
//     const newType = { ...formData };
//     const response = await createAppointmentType(e, user.token, newType);
//     if (response) {
//       handleResponse(response);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Tipo de Cita">
//       <form onSubmit={handleSubmit} className="modal-form">
//         <div className="form-group">
//           <label className="form-label">Nombre</label>
//           <Input
//             type="text"
//             value={formData.name}
//             onChange={(value) => setFormData({ ...formData, name: value })}
//             placeholder="Ej: Evaluación"
//             required
//             disabled={waitingResponse}
//           />
//         </div>

//         <div className="form-group">
//           <label className="form-label">Descripción</label>
//           <textarea
//             value={formData.description}
//             disabled={waitingResponse}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//             className="form-textarea"
//             placeholder="Breve descripción del tipo de cita"
//             rows={3}
//           />
//         </div>

//         <div className="form-actions-right">
//           <div style={{ display: "flex", gap: "10px", width: "100%" }}>
//             <Alert
//               variant="outlined"
//               severity={alertSeverity}
//               style={{ flex: 1, opacity: displayAlert }}
//             >
//               {alertMessage}
//             </Alert>
//             <Button type="submit" disabled={waitingResponse}>
//               {waitingResponse ? (
//                 <CircularProgress sx={{ color: "#ffffffff" }} />
//               ) : (
//                 <>Crear tipo</>
//               )}
//             </Button>
//           </div>
//         </div>
//       </form>
//     </Modal>
//   );
// };
