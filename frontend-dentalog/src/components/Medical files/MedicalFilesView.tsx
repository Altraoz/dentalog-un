import React, { useEffect, useState } from "react";
import { PatientCard } from "./Card";

import { Plus, Search } from "lucide-react";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { mockServices } from "../../data/mockData";
import { CreateEvolution } from "./CreateEvolution";
import { getPatients } from "../../api/patients";
import { useAuth } from "../../contexts/AuthContext";
import { CircularProgress } from "@mui/material";
import type { Patient } from "../../types";
// import "./EvolutionsView.scss";
// import type { Patient } from "../../types";

// import { CreateEvolution } from "./CreateEvolution";

// const patient = { id: 17, name: "Juanito Arevalo", age: 10, gender: "Hombre" };

export const MedicalFilesView = () => {
  // const patientId = patient ? patient.id : null;
  // const [formData, setFormData] = useState({
  //   appoinment: "",
  //   clinical_case: "",
  //   type: "",
  //   percente_advance: "",
  //   title: "",
  //   description: "",
  // });

  const [patient, setPatient] = useState<{
    id: number;
    name: string;
    gender: string;
    age: string;
    avatarUrl: string;
  }>();
  const { user } = useAuth();

  const [patients, setPatients] = useState<Patient[]>([]);

  const [buttonVariable, setButtonVariable] = useState(true);
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const data = {
  //     appoinment: formData.appoinment,
  //     clinical_case: formData.clinical_case,
  //     type: formData.type,
  //     percente_advance: formData.percente_advance,
  //     title: formData.title,
  //     description: formData.description,
  //   };

  // console.log("Form submitted with data:", data);
  // console.log("Patient ID:", patientId);

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
  // };

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
  const [waitingResponse, setWaitingResponse] = useState<boolean>(false);

  useEffect(() => {
    const fetchPatients = async () => {
      setWaitingResponse(true);

      if (!user) {
        console.error("User is not authenticated.");
        return;
      }
      const response = await getPatients(user?.token);
      if (response?.status == 200) {
        setWaitingResponse(false);
        setPatients(response.data.results);
        console.log("setting patients", response);

        setPatients(response.data.results);
      } else {
        console.log("f trayendo pacientes");
      }
    };

    fetchPatients();
  }, []);

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

  const calculateAge = (birthDate: string) => {
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
    return age;
  };

  const HandleClick = (patient: Patient) => {
    setPatient({
      id: patient.id,
      name: `${patient.first_name} ${patient.last_name}`,
      gender: patient.gender,
      age: `${calculateAge(patient.birth_date)}`,
      avatarUrl: `${
        patient.profile_photo_url ||
        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436200.jpg"
      }`,
    });
  };

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
            <div
              className="patient-grid"
              style={
                waitingResponse
                  ? {
                      minHeight: "50vh",
                      gridTemplateColumns: "repeat(1, 1fr)",
                      placeItems: "center",
                    }
                  : {}
              }
            >
              {waitingResponse ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress sx={{ color: "##2563eb" }} />
                  <p>Cargando pacientes...</p>
                </div>
              ) : (
                <>
                  {" "}
                  {patients.map((patient: Patient) => (
                    <PatientCard
                      key={patient.id}
                      avatarUrl={
                        patient.profile_photo_url ||
                        "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436200.jpg"
                      }
                      name={`${patient.first_name} ${patient.last_name}`}
                      sex={patient.gender}
                      age={`${calculateAge("2019-05-12T05:00:00Z")} años`}
                      bloodType={patient.blood_type}
                      dni={String(patient.dni)}
                      handleNavigate={() => {
                        HandleClick(patient);
                        setButtonVariable(false);
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          ) : (
            <CreateEvolution
              patient={{
                id: patient!.id,
                name: patient!.name,
                gender: patient!.gender,
                age: patient!.age,
                avatarUrl: patient!.avatarUrl,
              }}
              onBack={() => setButtonVariable(true)}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

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

{
  /* <PatientCard
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
              /> */
}
