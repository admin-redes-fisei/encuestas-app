//const URL_acceso = "http://localhost:8084/pruebaTesis/encuestas_services/";
const URL_acceso = "https://hatunsoft.uta.edu.ec/encuestas/encuestas_back/";

export async function obtenerFormularios(facultad_id) {
  try {
    const response = await fetch(
      `${URL_acceso}obtenerFormularios.php?facultad_id=${facultad_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al obtener las preguntas:", error);
  }
}

export async function obtenerConteoRespuestas(for_id) {
  try {
    const response = await fetch(
      `${URL_acceso}conteoRespuestas.php?id=${for_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al obtener las preguntas:", error);
  }
}

export async function obtenerDataset(for_id) {
  try {
    const response = await fetch(
      `${URL_acceso}obtenerDataset.php?formulario_id=${for_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al obtener las respuestas:", error);
  }
}
