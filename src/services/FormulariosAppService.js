const URL_acceso = "http://localhost:8084/pruebaTesis/encuestas_services/";
//const URL_acceso = "https://hatunsoft.uta.edu.ec/encuestas/encuestas_back/";

export async function listarFormularios() {
  try {
    const respuesta = await fetch(`${URL_acceso}listarFormularios.php`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!respuesta.ok) {
      throw new Error("Error al obtener las carreras");
    }

    const resultado = await respuesta.json();

    return resultado;
  } catch (error) {
    console.error("Error al obtener las carreras:", error);
  }
}
