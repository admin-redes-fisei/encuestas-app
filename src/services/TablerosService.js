const URL_acceso = "http://localhost:8084/pruebaTesis/encuestas_services/";
//const URL_acceso = "https://hatunsoft.uta.edu.ec/encuestas/encuestas_back/";

export async function obtenerConteoDatos(for_id) {
  try {
    const response = await fetch(
      `${URL_acceso}conteoDatas.php?id=${for_id}`,
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

export async function obtenerConteoDatosFiltrados(parametros) {
  parametros.valores_filtro = Array.isArray(parametros.valores_filtro)
    ? parametros.valores_filtro
    : [parametros.valores_filtro];

  // Generar la cadena de consulta manualmente
  const queryString = `id=${encodeURIComponent(
    parametros.id
  )}&${parametros.valores_filtro
    .map((value) => `valores_filtro[]=${encodeURIComponent(value)}`)
    .join("&")}`;

  try {
    const response = await fetch(
      `${URL_acceso}conteoDatas.php?${queryString}`,
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

export async function obtenerCodeTablero(for_id) {
  try {
    const response = await fetch(
      `${URL_acceso}obtenerCodeTablero.php?formulario_id=${for_id}`,
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

export async function agregarTablero(data) {
  try {
    const respuesta = await fetch(`${URL_acceso}agregarCodeTablero.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!respuesta.ok) {
      throw new Error(`Error al agregar el tablero: ${respuesta.statusText}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}
