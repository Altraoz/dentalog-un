/* Datos dummy, luego se mejorará la petición :) */

export async function getCasesByPatient(token: string, patientId: string) {
  // Simulamos un pequeño delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Lista de casos clínicos de prueba
  return {
    status: 200,
    data: {
      results: [
        { id: '101', title: 'Caso ortodoncia inicial' },
        { id: '102', title: 'Evaluación post-tratamiento' },
      ],
    },
  };
}
