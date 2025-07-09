/* Datos dummy, luego se mejorará la petición :) */

export async function getProceduresByCase(token: string, caseId: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    status: 200,
    data: {
      results: [
        { id: 'p101', name: 'Colocación de brackets' },
        { id: 'p102', name: 'Evaluación inicial' },
      ],
    },
  };
}
