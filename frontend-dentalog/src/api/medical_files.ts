import api from "./authentication";
import Cookies from "js-cookie";

export interface EvolutionPayload {
  name: string;
  details: string;
  patient: string,
  image_url: string;
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

export async function createMedicalFile(
  e: React.FormEvent<HTMLFormElement>,
  userToken: string,
  data: EvolutionPayload
) {
  e.preventDefault();
  const url = "/clinical/medical_files/";
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

export async function uploadImage(
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
