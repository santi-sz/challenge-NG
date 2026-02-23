const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

// Datos del candidato usando su email
export async function getCandidateByEmail(email) {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      // Caso típico: no existe un candidato para ese email
      throw new Error('No se encontró un email asociado');
    }

    const errorText = await response.text().catch(() => 'Error desconocido');
    throw new Error(`Error al obtener candidato: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// Lista de posiciones disponibles o abiertas
export async function getJobsList() {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Error desconocido');
    throw new Error(`Error al obtener posiciones: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// Envía la postulación de un candidato a una posición específica
export async function applyToJob({ uuid, candidateId, applicationId, jobId, repoUrl }) {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uuid,
      candidateId,
      applicationId,
      jobId,
      repoUrl,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Error desconocido');
    throw new Error(`Error al enviar la postulación: ${response.status} - ${errorText}`);
  }

  return response.json(); // se espera { ok: true }
}
