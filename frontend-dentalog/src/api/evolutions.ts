import api from "./authentication";

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
