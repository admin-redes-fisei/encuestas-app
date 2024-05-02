const URL_acceso = "http://localhost:8084/pruebaTesis/encuetas_back/";
//const URL_acceso = "https://hatunsoft.uta.edu.ec/encuestas/encuestas_back";

export async function obtenerFormularios() {
  try {
    const response = await fetch(`${URL_acceso}obtenerFormularios.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
