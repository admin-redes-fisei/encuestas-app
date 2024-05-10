//const URL_acceso = "http://localhost:8084/pruebaTesis/encuestas_services/";
const URL_acceso = "https://hatunsoft.uta.edu.ec/encuestas/encuestas_back/";

export async function obtenerPreguntas(for_alias) {
  try {
    console.log(for_alias);
    const response = await fetch(
      `${URL_acceso}formulario.php?alias=${for_alias}`,
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

export async function enviarRespuestas(respuestas) {
  fetch(`${URL_acceso}respuestas.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(respuestas),
  })
    .then((response) => response.json())
    .then((data) => {})
    .catch((error) => {
      console.error("Error al enviar la respuesta:", error);
    });
};
