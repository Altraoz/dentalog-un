import axios from "axios";
import Cookies from "js-cookie";
import { url_backend } from "./variables";
import type {
  PatientPayload,
  AppointmentTypePayload,
  ClinicalCasePayload,
  ProcedurePayload,
  ActivityPayload,
  AppointmentPayload,
} from "../types";
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

export async function createAppointmentType(
  e: React.FormEvent<HTMLFormElement>,
  userToken: string,
  data: AppointmentTypePayload
) {
  e.preventDefault();
  const url = "/clinical/appointment_types/";
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

export async function createClinicalCase(
  e: React.FormEvent<HTMLFormElement>,
  userToken: string,
  data: ClinicalCasePayload
) {
  e.preventDefault();
  const url = "/clinical/cases/";
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
    console.error("Error al crear caso clínico", error);
    return null;
  }
}

export async function createProcedure(
  e: React.FormEvent<HTMLFormElement>,
  userToken: string,
  data: ProcedurePayload
) {
  e.preventDefault();
  const url = "/clinical/procedures_in_appointment/";
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
    console.error("Error al crear caso clínico", error);
    return null;
  }
}
export async function getAppointments(userToken: string) {
  const url = "/clinical/appointments/";
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al traer citas:", error);
    return null;
  }
}

export async function getAppointmentsByPatient(
  userToken: string,
  patient_id: number
) {
  const url = `/clinical/appointments/?patient=${patient_id}`;
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al traer citas:", error);
    return null;
  }
}

export async function getAppointmentsType(userToken: string) {
  const url = "/clinical/appointment_types/";
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al traer citas:", error);
    return null;
  }
}

export async function getPatientClinicalCases(
  userToken: string,
  patient_id: number
) {
  const url = `/clinical/cases/search/?patient=${patient_id}`;
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al traer casos clínicos:", error);
    return null;
  }
}

export async function getCaseProcedures(userToken: string, case_id: number) {
  const url = `/clinical/procedures/?clinical_case=${case_id}`;
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al traer procedimientos:", error);
    return null;
  }
}

export async function getProcedureActivities(
  userToken: string,
  procedure: number
) {
  const url = `/clinical/procedures_in_appointment/${procedure}/`;
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al traer procedimientos:", error);
    return null;
  }
}

export async function createActivity(userToken: string, data: ActivityPayload) {
  const url = "/clinical/activities/";
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
    console.error("Error al crear actividad", error);
    return null;
  }
}

export async function deleteActivity(userToken: string, id: number) {
  const url = `/clinical/activities/${id}/`;
  const csrftoken = Cookies.get("csrftoken");

  try {
    const response = await api.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken || "",
        Authorization: `Token ${userToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error al crear actividad", error);
    return null;
  }
}

export async function createAppointment(
  userToken: string,
  data: AppointmentPayload
) {
  const url = "/clinical/appointments/";
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
    console.error("Error al crear la cita:", error);
    return null;
  }
}

export async function getActivities(userToken: string) {
  const url = '/clinical/activities/'
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Token ${userToken}`
      }
    });
    return response;
  } catch (err) {
    console.error('Error al traer actividades');
    return null;
  }
}

export async function updateAppointment(userToken: string, appointmentID: number, data: any) {
  const url = `/clinical/appointments/${appointmentID}/`; // Endpoint para actualizar la cita
  const csrftoken = Cookies.get("csrftoken");

  try {
    // Realizamos la solicitud PATCH para actualizar la cita
    const response = await api.patch(url, data, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken || "",
        Authorization: `Token ${userToken}`, // Token de autenticación
      },
    });

    if (response.status === 200) {
      return response.data; // Si la respuesta es exitosa, devolvemos los datos actualizados
    } else {
      console.error("Error al actualizar la cita:", response.status);
      return null;
    }
  } catch (err) {
    console.error("Error en la solicitud de actualización:", err);
    return null; // Si ocurre un error, devolvemos null
  }
}