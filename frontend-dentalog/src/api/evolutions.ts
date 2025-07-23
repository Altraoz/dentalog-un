import { getAppointments } from "./apointments";
import api from "./authentication";

export async function getEvolutionsByPatient(userToken: string, patientId: string) {
  const url = `/clinical/evolutions/?patient=${patientId}`;
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `Token ${userToken}`
      }
    });
    if (response.status !== 200) return [];

    const appointmentsResponse = await getAppointments(userToken);
    const evolutions = response.data;
    if (!appointmentsResponse || !appointmentsResponse.data) {
      console.error("Error al obtener citas");
      return [];
    };

    const appointments = appointmentsResponse.data;

    const enrichedEvolutions = await Promise.all(
      evolutions.map(async (evolution: any) => {
        const appointment = appointments.find(
          (appointment: any) => appointment.id === evolution.appointment
        );

        if (appointment) {
          const imageUrls = evolution.images.map((image: any) => image.image_url);
          return {
            title: evolution.title,
            appointmentDate: appointment.attention_date.split('T')[0],
            imageUrls: imageUrls,
            observations: evolution.description,
          };
        } else return null;
      })
    );

    const sortedEvos = enrichedEvolutions
      .filter((evolution) => evolution !== null)
      .sort((a, b) => {
        if (a && b) {
          return new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime();
        }
        return 0;
      });
    return sortedEvos;
  } catch (err) {
    console.error(err);
    return null;
  }
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
