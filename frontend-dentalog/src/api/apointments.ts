import axios from "axios";
import Cookies from "js-cookie";
import { url_backend } from "./variables";
<<<<<<< Updated upstream
import type { PatientPayload, AppointmentTypePayload, ClinicalCasePayload, ProcedurePayload, ActivityPayload, AppointmentPayload } from "../types";
=======
import type {
  PatientPayload,
  AppointmentTypePayload,
  ClinicalCasePayload,
  ProcedurePayload,
} from "../types";
>>>>>>> Stashed changes
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

export async function createActivity(
  e: React.FormEvent<HTMLFormElement>,
  userToken: string,
  data: ActivityPayload) {

  e.preventDefault();
  const url = '/clinical/activities/';
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