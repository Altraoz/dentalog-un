import React, { useState, useEffect } from "react";
import {
  User,
  Baby,
  VenusAndMars,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle,
  HeartPulse,
} from "lucide-react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { Patient } from "../../types";
import "./PatientModal.scss";
// import axios from "axios";
// import Cookies from "js-cookie";
import { createPatientAndUser, updatePatientAndUser } from "../../api/patients";

import { useAuth } from "../../contexts/AuthContext";

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  onClose,
  patient,
}) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    gender: "",
    blood_type: "",
    allergies: "",
    profile_photo_url: "",
    address: "",
    responsable_user: {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
    },
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        first_name: patient.first_name,
        last_name: patient.last_name,
        birth_date: patient.birth_date,
        gender: patient.gender,
        blood_type: patient.blood_type,
        allergies: patient.allergies ? patient.allergies.join(", ") : "",
        profile_photo_url: patient.profile_photo_url,
        address: patient.address,
        responsable_user: {
          first_name: patient.responsable_user?.first_name || "",
          last_name: patient.responsable_user?.last_name || "",
          phone_number: patient.responsable_user?.phone_number || "",
          email: patient.responsable_user?.email || "",
        },
      });
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        birth_date: "",
        gender: "",
        blood_type: "",
        allergies: "",
        profile_photo_url: "",
        address: "",
        responsable_user: {
          first_name: "",
          last_name: "",
          phone_number: "",
          email: "",
        },
      });
    }
  }, [patient]);

  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(user?.token);

    // const data = {
    //   first_name: "Juan",
    //   last_name: "Pérez",
    //   birth_date: "2015-06-25T00:00:00Z",
    //   gender: "Masculino",
    //   blood_type: "A+",
    //   address: "Calle 123 #45-67",
    //   profile_photo_url:
    //     "https://img.freepik.com/psd-gratis/3d-ilustracion-persona_23-2149436179.jpg", //dejar por defecto
    //   dni: 1006999239,
    //   responsable_user_data: {
    //     email: "user1@gmail.com",
    //     password: "pass12345",
    //     first_name: "Luis",
    //     last_name: "Pérez",
    //     phone_number: "3178127431",
    //     role: 2,
    //     is_active: "True",
    //   },
    // };
    // console.log("Saving patient:", data);

    const data = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      birth_date: formData.birth_date,
      gender: formData.gender,
      blood_type: formData.blood_type,
      address: formData.address,
      profile_photo_url:
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona_23-2149436179.jpg", //dejar por defecto
      dni: 1006999239,
      responsable_user_data: {
        email: formData.responsable_user.email,
        password: "generic_password",
        first_name: formData.responsable_user.first_name,
        last_name: formData.responsable_user.last_name,
        phone_number: formData.responsable_user.phone_number,
        role: 2,
        is_active: "True",
      },
    };

    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    const response = patient
      ? await createPatientAndUser(e, user.token, data)
      : await updatePatientAndUser(e, user.token, data);
    console.log(response);

    if (response?.status == 201) {
      onClose();
    }

    // let response = await axios.post(
    //   "http://django-env.eba-3ppwu5a9.us-west-2.elasticbeanstalk.com/auth/register/",
    //   // "http://127.0.0.1:8000/auth/login/",
    //   {
    //     email: formData.responsable_user.email,
    //     password: "sancocho trifasico",
    //     first_name: formData.responsable_user.first_name,
    //     last_name: formData.responsable_user.last_name,
    //     phone_number: formData.responsable_user.phone_number,
    //     role: 1, //ESTABLECER EN BACKEND QUE SI NO SE PASA ROL ENTONCES ES user
    //     is_active: "True", //ESTE TAMBIEN
    //   },

    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-CSRFToken": csrftoken,
    //     },
    //     withCredentials: true, // Importante si tu backend requiere cookies
    //   }
    // );

    // console.log(response);
    // let id_user = null;

    // if (response.status == 200) {
    //   id_user = response.data.user.id_user;
    // }

    // response = await axios.post(
    //   "http://django-env.eba-3ppwu5a9.us-west-2.elasticbeanstalk.com/auth/patients/",
    //   // "http://127.0.0.1:8000/auth/login/",
    //   {
    //     first_name: formData.first_name,
    //     last_name: formData.last_name,
    //     birth_date: formData.birth_date,
    //     responsable_user: id_user ? id_user : 1,
    //     gender: formData.gender,
    //     blood_type: formData.blood_type,
    //     insurance_provider: "uwu",
    //     address: formData.address,
    //     profile_photo_url: formData.profile_photo_url,
    //   },

    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-CSRFToken": csrftoken,
    //       Authorization: `Token ${user?.token}`,
    //     },
    //     withCredentials: true, // Importante si tu backend requiere cookies
    //   }
    // );

    console.log(response);

    // onClose();
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return "";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return `${age} años`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        patient
          ? `${patient.first_name} ${patient.last_name}`
          : "Nuevo Paciente"
      }
      size="lg"
    >
      <form onSubmit={handleSubmit} className="modal-form">
        <div className="form-grid-two">
          <Input
            label="Nombre"
            value={formData.first_name}
            onChange={(value) =>
              setFormData({ ...formData, first_name: value })
            }
            icon={Baby}
            required
          />
          <Input
            label="Apellido"
            value={formData.last_name}
            onChange={(value) => setFormData({ ...formData, last_name: value })}
            required
          />
        </div>

        <div className="form-grid-three">
          <Input
            label="Fecha de Nacimiento"
            type="date"
            value={formData.birth_date}
            onChange={(value) =>
              setFormData({ ...formData, birth_date: value })
            }
            icon={Calendar}
            required
          />
          <div className="form-group">
            <label className="form-label">
              Género <span className="required">*</span>
            </label>

            <div className="select-wrapper">
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    gender: e.target.value as "Masculino" | "Femenino",
                  })
                }
                className="form-selects"
              >
                {/* añadir los options de la base de datos*/}
                <option value="" disabled></option>
                <option value="Masculino">Niño</option>
                <option value="Femenino">Niña</option>
              </select>{" "}
              <div className="select-icon">
                <VenusAndMars className="icon" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">
              Tipo de sangre <span className="required">*</span>
            </label>
            <div className="select-wrapper">
              <select
                value={formData.blood_type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    blood_type: e.target.value as
                      | "O+"
                      | "O-"
                      | "A+"
                      | "A-"
                      | "B+"
                      | "B-"
                      | "AB+"
                      | "AB-",
                  })
                }
                className="form-selects"
              >
                <option value="" disabled></option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>{" "}
              <div className="select-icon">
                <HeartPulse className="icon" />
              </div>
            </div>
          </div>
          {formData.birth_date && (
            <div className="form-group">
              <label className="form-label">Edad</label>
              <div className="age-display">
                {calculateAge(formData.birth_date)}
              </div>
            </div>
          )}
        </div>

        <div className="form-grid-two">
          <Input
            label="Nombre del responsable"
            type="text"
            value={formData.responsable_user.first_name}
            onChange={(value) =>
              setFormData({
                ...formData,
                responsable_user: {
                  ...formData.responsable_user,
                  first_name: value,
                },
              })
            }
            icon={User}
            required
          />
          <Input
            label="Apellido del responsable"
            type="text"
            value={formData.responsable_user.last_name}
            onChange={(value) =>
              setFormData({
                ...formData,
                responsable_user: {
                  ...formData.responsable_user,
                  last_name: value,
                },
              })
            }
            required
          />
        </div>

        <div className="form-grid-two">
          <Input
            label="Teléfono"
            type="tel"
            value={formData.responsable_user.phone_number}
            onChange={(value) =>
              setFormData({
                ...formData,
                responsable_user: {
                  ...formData.responsable_user,
                  phone_number: value,
                },
              })
            }
            icon={Phone}
            required
          />
          <Input
            label="Correo electrónico"
            type="email"
            value={formData.responsable_user.email}
            onChange={(value) =>
              setFormData({
                ...formData,
                responsable_user: {
                  ...formData.responsable_user,
                  email: value,
                },
              })
            }
            icon={Mail}
            required
          />
        </div>

        <div className="form-grid">
          {/* <Input
            label="Teléfono del Tutor"
            type="tel"
            value={formData.parentPhone}
            onChange={(value) =>
              setFormData({ ...formData, parentPhone: value })
            }
            icon={Phone}
            required
          /> */}
          <Input
            label="Dirección"
            value={formData.address}
            onChange={(value) => setFormData({ ...formData, address: value })}
            icon={MapPin}
            required
          />
        </div>

        {/* <div className="form-group">
          <label className="form-label">Historial Médico</label>
          <textarea
            value={formData.medicalHistory}
            onChange={(e) =>
              setFormData({ ...formData, medicalHistory: e.target.value })
            }
            rows={3}
            className="form-textarea"
            placeholder="Condiciones médicas relevantes, medicamentos, cirugías previas..."
          />
        </div> */}

        <div className="form-group">
          <label className="form-label form-label-alert">
            <AlertTriangle className="alert-icon" />
            Alergias
          </label>
          <textarea
            value={formData.allergies}
            onChange={(e) =>
              setFormData({ ...formData, allergies: e.target.value })
            }
            rows={2}
            className="form-textarea"
            placeholder="Alergias conocidas (medicamentos, alimentos, materiales)..."
          />
        </div>

        <div className="form-actions">
          <Button type="submit" className="submit-button">
            {patient ? "Actualizar Paciente" : "Crear Paciente"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
};
