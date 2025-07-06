import axios from "axios";
import Cookies from "js-cookie";
import { url_backend } from "./variables";
import type { PatientPayload } from "../types";

export async function createPatientAndUser(
  e: React.FormEvent<HTMLFormElement>,
  userToken: string,
  data: PatientPayload
) {
  e.preventDefault();
  const backendUrl = url_backend + "/auth/patients/";
  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await axios.post(
      backendUrl,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken || "",
          Authorization: `Token ${userToken}`,
        },
        withCredentials: true,
      }
    );
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
    const response = await axios.post(
      backendUrl,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken || "",
          Authorization: `Token ${userToken}`,
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error al crear pacientes", error);
    return null;
  }
}


export async function getPatientsByName(userToken: string, filter: string) {
  const backendUrl = `${url_backend}/auth/patients/?q=${filter}`;
  try {
    const response = await axios.get(backendUrl, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error al traer pacientes:", error);
    return null;
  }
}


export async function getClinicCaseById(userToken: string, user_id: string) {
  const url = `${url_backend}/clinical/cases/search/?patient=${user_id}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error al consultar casos clínicos:", error);
    return null;
  }
}
