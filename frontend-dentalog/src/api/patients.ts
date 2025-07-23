import axios from "axios";
import Cookies from "js-cookie";
import { url_backend } from "./variables";
import type { PatientPayload } from "../types";
import api from "./authentication";

export async function createPatientAndUser(
  e: React.FormEvent<HTMLFormElement>,
  userToken: string,
  data: PatientPayload
) {
  e.preventDefault();
  const backendUrl = url_backend + "/auth/patients/";
  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await axios.post(backendUrl, data, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken || "",
        Authorization: `Token ${userToken}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error al crear pacientes", error);
    return null;
  }
}

export async function updatePatientAndUser(
  e: React.FormEvent<HTMLFormElement>,
  userToken: string,
  data: PatientPayload
) {
  e.preventDefault();
  const backendUrl = url_backend + "/auth/patients/";
  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await axios.post(backendUrl, data, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken || "",
        Authorization: `Token ${userToken}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error al crear pacientes", error);
    return null;
  }
}

export async function getPatients(userToken: string) {
  const url = "/auth/patients/";
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al traer pacientes:", error);
    return null;
  }
}

export async function getPatientsByResponsible(userToken: string, userID: number) {
  const url = `/auth/patients/?responsable_user=${userID}`;
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Token ${userToken}`
      }
  });
  console.log('Respuesta', response)
  return response;
  } catch (err) {
    console.error('Error al traer pacientes:', err);
    return null;
  }
}