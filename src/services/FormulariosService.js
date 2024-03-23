const URL_acceso = "http://localhost:8084/pruebaTesis/";

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
