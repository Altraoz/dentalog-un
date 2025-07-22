import React, { useState } from "react";
import { PatientCard } from "./Card";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  IconButton,
  // CircularProgress,
} from "@mui/material";

import { Plus, Search, ArrowLeft } from "lucide-react";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { mockServices } from "../../data/mockData";
import "./EvolutionsView.scss";
import type { Patient } from "../../types";

import { DraggItem } from "./DraggItem";


interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

export const EvolutionsView: React.FC<PatientModalProps> = ({ patient }) => {
  const patientId = patient ? patient.id : null;
  const [formData, setFormData] = useState({
    appoinment: "",
    clinical_case: "",
    type: "",
    percente_advance: "",
    title: "",
    description: "",
  });

  const [buttonVariable, setButtonVariable] = useState(true);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      appoinment: formData.appoinment,
      clinical_case: formData.clinical_case,
      type: formData.type,
      percente_advance: formData.percente_advance,
      title: formData.title,
      description: formData.description,
    };

    console.log("Form submitted with data:", data);
    console.log("Patient ID:", patientId);

    // if (!user) {
    //   console.error("User is not authenticated.");
    //   return;
    // }

    // const response = patient ?  await createPatientAndUser(e, user.token, data): await updatePatientAndUser(e, user.token, data);
    // console.log(response);

    // if (response?.status == 201) {
    //   onClose();
    // }
    // console.log(response);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const categories = [
    { id: "all", name: "Todos los Servicios", count: mockServices.length },
    {
      id: "preventive",
      name: "Preventivos",
      count: mockServices.filter((s) => s.category === "preventive").length,
    },
    {
      id: "restorative",
      name: "Restaurativos",
      count: mockServices.filter((s) => s.category === "restorative").length,
    },
    {
      id: "orthodontic",
      name: "Ortodónticos",
      count: mockServices.filter((s) => s.category === "orthodontic").length,
    },
    {
      id: "surgical",
      name: "Quirúrgicos",
      count: mockServices.filter((s) => s.category === "surgical").length,
    },
  ];

  // const filteredServices = mockServices.filter((service) => {
  //   const matchesSearch =
  //     service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     service.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesCategory =
  //     selectedCategory === "all" || service.category === selectedCategory;
  //   return matchesSearch && matchesCategory;
  // });

  // const getCategoryColor = (category: string) => {
  //   switch (category) {
  //     case "preventive":
  //       return "category-preventive";
  //     case "restorative":
  //       return "category-restorative";
  //     case "orthodontic":
  //       return "category-orthodontic";
  //     case "surgical":
  //       return "category-surgical";
  //     default:
  //       return "category-default";
  //   }
  // };

  // const getCategoryName = (category: string) => {
  //   switch (category) {
  //     case "preventive":
  //       return "Preventivo";
  //     case "restorative":
  //       return "Restaurativo";
  //     case "orthodontic":
  //       return "Ortodóntico";
  //     case "surgical":
  //       return "Quirúrgico";
  //     default:
  //       return category;
  //   }
  // };

  return (
    <div className="service-catalog">
      <div className="header-container">
        <div>
          <h2 className="header-title">Crear evolución</h2>
          <p className="header-description">
            En esta sección puedes cargar las evoluciones relacionadas con
            pacientes
          </p>
          {/* <CircularProgress /> */}
        </div>
        <Button icon={Plus}>Nuevo Servicio</Button>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="search-input-container">
          <Input
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={setSearchTerm}
            icon={Search}
          />
        </div>
        <div className="categories-container">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-button ${
                selectedCategory === category.id ? "category-button-active" : ""
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      <div className="evolution-grid">
        <Card className="card-evolution">
          {buttonVariable ? (
            // <div className="services-grid">
            //   {filteredServices.map((service) => (
            //     <Card key={service.id} hover className="service-card">
            //       <div className="card-content">
            //         <div className="card-header">
            //           <div className="icon-container">
            //             <Stethoscope className="icon" />
            //           </div>
            //           <span
            //             className={`category-tag ${getCategoryColor(
            //               service.category
            //             )}`}
            //           >
            //             {getCategoryName(service.category)}
            //           </span>
            //         </div>

            //         <div className="card-body">
            //           <h3 className="service-title">{service.name}</h3>
            //           <p className="service-description">
            //             {service.description}
            //           </p>

            //           <div className="service-details">
            //             <div className="detail-item">
            //               <Clock className="detail-icon" />
            //               <span>{service.duration} minutos</span>
            //             </div>
            //             <div className="detail-item">
            //               <Users className="detail-icon" />
            //               <span>{service.ageRange}</span>
            //             </div>
            //             <div className="detail-item">
            //               <DollarSign className="detail-icon price-icon" />
            //               <span className="price">{service.price}</span>
            //             </div>
            //           </div>
            //         </div>

            //         <div className="card-footer">
            //           <div className="button-group">
            //             <Button variant="outline" className="action-button">
            //               Editar
            //             </Button>
            //             <Button className="action-button">
            //               Programar Cita
            //             </Button>
            //           </div>
            //         </div>
            //       </div>
            //     </Card>
            //   ))}
            // </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              <PatientCard
                avatarUrl="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-cabello-largo_23-2149436197.jpg"
                name="Sofía Ramírez"
                sex="Female"
                age={7}
                bloodType="O+"
                dni="101234567"
                handleNavigate={() => setButtonVariable(false)}
              />
              <PatientCard
                avatarUrl="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436200.jpg"
                name="Mateo López"
                sex="Male"
                age={8}
                bloodType="A-"
                dni="102345678"
                handleNavigate={() => setButtonVariable(false)}
              />
              <PatientCard
                avatarUrl="https://img.freepik.com/psd-gratis/render-3d-personaje-avatar_23-2150611716.jpg"
                name="Camila Torres"
                sex="Female"
                age={6}
                bloodType="B+"
                dni="103456789"
                handleNavigate={() => setButtonVariable(false)}
              />
              <PatientCard
                avatarUrl="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671124.jpg?uid=R135249106&ga=GA1.1.1493531008.1748991659&semt=ais_hybrid&w=740"
                name="Samuel Gómez"
                sex="Male"
                age={9}
                bloodType="AB+"
                dni="104567890"
                handleNavigate={() => setButtonVariable(false)}
              />
              <PatientCard
                avatarUrl="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671138.jpg?uid=R135249106&ga=GA1.1.1493531008.1748991659&semt=ais_hybrid&w=740"
                name="Valentina Ríos"
                sex="Female"
                age={5}
                bloodType="O-"
                dni="105678901"
                handleNavigate={() => setButtonVariable(false)}
              />
              <PatientCard
                avatarUrl="https://img.freepik.com/psd-gratis/representacion-3d-avatar_23-2150833580.jpg?uid=R135249106&ga=GA1.1.1493531008.1748991659&semt=ais_hybrid&w=740"
                name="Tomás Herrera"
                sex="Male"
                age={7}
                bloodType="A+"
                dni="106789012"
                handleNavigate={() => setButtonVariable(false)}
              />
            </div>
          ) : (
            // {filteredServices.length === 0 && (
            //   <Card className="empty-state">
            //     <div className="empty-state-content">
            //       <Stethoscope className="empty-state-icon" />
            //       <p className="empty-state-text">No se encontraron servicios</p>
            //       <p className="empty-state-subtext">
            //         {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay servicios en esta categoría'}
            //       </p>
            //     </div>
            //   </Card>
            // )}

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid-two">
                <div className="form-grid side-a">
                  <div className="patient-row">
                    <IconButton
                      color="primary"
                      aria-label="add to shopping cart"
                      onClick={() => setButtonVariable(true)}
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
                        <span className="patient-name">Sofiía Rodriguez</span>
                        <p className="patient-age">7 años - Female</p>
                      </div>
                    </div>
                  </div>
                  <div className="form-grid-two">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Cita
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.appoinment}
                        label="Cita"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            appoinment: e.target.value as
                              | "Masculino"
                              | "Femenino",
                          })
                        }
                      >
                        <MenuItem value="Masculino">Masculino</MenuItem>
                        <MenuItem value="Femenino">Femenino</MenuItem>
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
                    {/* <Input
                    label="Titulo de la evolución"
                    value={formData.title}
                    onChange={(value) =>
                      setFormData({ ...formData, title: value })
                    }
                    icon={LetterText}
                    required
                  /> */}

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
                    {/* <Input
                    label="Avance (%)"
                    value={formData.percente_advance}
                    onChange={(value) =>
                      setFormData({ ...formData, percente_advance: value })
                    }
                    icon={ChartNoAxesCombined}
                    required
                  /> */}
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
                    {/* 
                  <label className="form-label form-label-alert">
                    <AlignLeft className="icon" />
                    Descripción de la evolución
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={2}
                    className="form-textarea"
                    placeholder="Alergias conocidas (medicamentos, alimentos, materiales)..."
                  /> */}
                  </div>
                </div>
                <div className="side-b">
                  <DraggItem />
                </div>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};
