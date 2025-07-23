import api from "./authentication";
import Cookies from "js-cookie";

export interface EvolutionPayload {
  appointment: string;
  clinical_case: string;
  type: string;
  percente_advance: string;
  title: string;
  description: string;
  images: number[]; // ✅ aquí sí usamos `number[]` correctamente
}

// {
//   "appointment": 45,
//   "type": 1,
//   "percent_advance": 40.0,
//   "description": "El paciente mantiene los mismos hábitos de higiene oral.",
//   "title": "Seguimiento de higiene",
//   "clinical_case": 10,
//   "image_ids": [11, 12,13]
// }

export async function getEvolutionsByPatient(token: string, patientId: string) {
  console.log(token, patientId);
}

export async function getEvolutionTypes(userToken: string) {
  const url = "/clinical/evolution_types/";
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al traer tipo de evoluciones", error);
    return null;
  }
}

export async function createEvolution(
  e: React.FormEvent<HTMLFormElement>,
  userToken: string,
  data: EvolutionPayload
) {
  e.preventDefault();
  const url = "/clinical/evolutions/";
  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await api.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken || "",
        Authorization: `Token ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al crear tipo de cita", error);
    return null;
  }
}
