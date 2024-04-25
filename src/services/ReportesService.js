const URL_acceso = "http://localhost:8084/pruebaTesis/";
//const URL_acceso = "https://hatunsoft.uta.edu.ec/back_encuestas/";

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
